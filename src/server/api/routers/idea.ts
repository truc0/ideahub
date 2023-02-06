import {
  createTRPCRouter,
  protectedProcedure,
} from "../trpc";

export const ideaRouter = createTRPCRouter({
  index: protectedProcedure
    .query(({ ctx }) => {
      return ctx.prisma.idea.findMany({
        where: {
          ownerId: ctx.session.user.id,
        }
      })
    })
})