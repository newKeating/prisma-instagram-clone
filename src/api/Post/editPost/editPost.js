import { prisma } from "../../../../generated/prisma-client";

const DELETE = "DELETE";
const EDIT = "EDIT";

export default {
  Mutation: {
    editPost: async (_, args, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { id, caption, location, action } = args;
      const { user } = request;
      const postMatch = await prisma.$exists.post({
        id,
        user: { id: user.id }
      });
      if (postMatch) {
        if (action === EDIT) {
          return prisma.updatePost({
            where: { id },
            data: {
              caption,
              location
            }
          });
        } else if (action === DELETE) {
          prisma.deletePost({ id });
        }
      } else {
        throw Error("You have no authorization!");
      }
    }
  }
};
