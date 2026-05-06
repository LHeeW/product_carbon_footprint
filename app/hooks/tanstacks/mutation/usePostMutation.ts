import { createOrUpdatePost } from "@/app/lib/api";
import { Post } from "@/app/types/types";
import { useMutation, UseMutationOptions } from "@tanstack/react-query";

export const usePostMutation = (
  options?: UseMutationOptions<Post, Error, Omit<Post, "id"> & { id?: string }>,
) => {
  return useMutation({
    mutationFn: createOrUpdatePost,
    ...options,
  });
};
