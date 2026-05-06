import { Suspense } from "react";
import PostsContent from "./posts-content";
import PostsForm from "./posts-form";
import PostsSkeleton from "@/app/ui/skeleton/posts-skeleton";

export default function PostsContainer() {
  return (
    <section className="flex flex-col gap-6">
      <PostsForm />
      <Suspense fallback={<PostsSkeleton />}>
        <PostsContent />
      </Suspense>
    </section>
  );
}
