import { Post } from "@/app/types/types";
import {
  useSuspenseQuery,
  UseSuspenseQueryOptions,
} from "@tanstack/react-query";
import { postKeys } from "../query-keys";
import { fetchPosts } from "@/app/lib/api";

export const usePostQuery = <TData = Post[]>(
  options?: Omit<
    UseSuspenseQueryOptions<Post[], Error, TData>,
    "queryKey" | "queryFn"
  >,
) => {
  return useSuspenseQuery({
    queryKey: postKeys.all,
    queryFn: fetchPosts,
    ...options,
  });
};

export const usePostByIdQuery = <TData = Post[]>(
  id: string,
  options?: Omit<
    UseSuspenseQueryOptions<Post[], Error, TData>,
    "queryKey" | "queryFn"
  >,
) => {
  return useSuspenseQuery({
    queryKey: postKeys.all,
    queryFn: fetchPosts,
    select: (posts) => {
      if (!id) return [] as unknown as TData;
      const post = posts.filter((post) => post.resourceUid === id);
      return post;
    },
    ...options,
  });
};
