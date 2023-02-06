import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";

import { api } from "../utils/api";
import { useMemo, useState } from "react";

const Home: NextPage = () => {
  const [ideaText, setIdeaText] = useState('')
  const [isMarkingDown, setIsMarkingDown] = useState(false)

  const isDisabled = useMemo(() => {
    return ideaText === '' || isMarkingDown
  }, [ideaText])

  const saveButtonHandler = () => {
    setIsMarkingDown(true)
    console.log(ideaText)
    setIsMarkingDown(false)
  }

  return (
    <>
      <Head>
        <title>IdeaHub</title>
        <meta name="description" content="Quickly mark your idea down" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="px-4 py-4 flex min-h-screen flex-col items-center bg-gradient-to-b">
        <div className="c-background -z-10">
          <div className="absolute top-0 left-0 w-full h-1/3 bg-yellow-400 -z-1"></div>
          <div className="absolute top-1/3 left-0 w-full h-2/3 bg-white"></div>
        </div>
        
        <header className="min-h-12 w-full mb-12 flex justify-around items-center">
          <div className="text-left left w-1/3"></div>
          <h1 className="text-center flex-1 text-xl text-white font-extrabold">Idea Hub</h1>

          <div className="text-right w-1/3">
            <AuthButton />
          </div>
        </header>

        <h1 className="text-4xl font-bold text-white">I have a great idea...</h1>

        <div className="w-full my-12">
          <textarea
            className={`w-full p-4 font-xl rounded-md shadow h-[24rem] ` + (isDisabled ? 'ring ring-red-300' : '')}
            placeholder="Say something great..."
            value={ideaText}
            onChange={e => setIdeaText(e.target.value)}
          ></textarea>
        </div>

        <button
          className="w-full p-4 rounded bg-yellow-400 text-white text-center text-xl
                    disabled:opacity-60 disabled:cursor-not-allowed"
          disabled={isDisabled}
          onClick={saveButtonHandler}
        >{isMarkingDown ? 'Marking down...' : 'Mark it down'}</button>
      </main>
    </>
  );
};

export default Home;

const AuthButton: React.FC = () => {
  const { data: sessionData } = useSession();

  const { data: secretMessage } = api.example.getSecretMessage.useQuery(
    undefined, // no input
    { enabled: sessionData?.user !== undefined },
  );

  return (
    <div className="">
      <button
        className="rounded-full bg-white/10 px-4 py-3 font-semibold text-white no-underline transition hover:bg-white/20"
        onClick={sessionData ? () => void signOut() : () => void signIn()}
      >
        {sessionData ? "Sign out" : "Sign in"}
      </button>
    </div>
  );
};
