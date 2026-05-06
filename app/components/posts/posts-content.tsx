"use client";

import { useCompaniesQuery } from "@/app/hooks/tanstacks/query/useCompanyQuery";
import { usePostByIdQuery } from "@/app/hooks/tanstacks/query/usePostQuery";
import { useCompanyStore } from "@/app/stores/useCompanyStore";
import { dateFormmated } from "@/app/utils/date-format";
import PostsForm from "./posts-form";
import { usePostStore } from "@/app/stores/usePostStore";

export default function PostsContent() {
  const selectedId = useCompanyStore((state) => state.selectedId);
  const { updateId, openForm } = usePostStore();
  const { data: companies } = useCompaniesQuery();
  const { data: posts } = usePostByIdQuery(
    selectedId || companies[0]?.id || "",
  );

  if (!posts || posts.length === 0)
    return <div className="pl-3 text-slate-400">작성된 포스트가 없습니다.</div>;
  return (
    <div className="flex flex-col gap-6">
      {posts.map((post) => (
        <div key={post.id} className="p-4 bg-white shadow-xl rounded-2xl">
          <div className="flex justify-between">
            <span className="text-xl font-light tracking-tighter">
              {"<<"} {post.title} {">>"}
            </span>
            <div className="flex gap-4 items-center">
              <span className="text-slate-400">
                {dateFormmated(post.dateTime)}
              </span>
              <button
                onClick={() => openForm(post.id)}
                className="px-3 py-2 rounded-2xl hover:text-green-700 hover:text-bold hover:shadow-lg transition"
              >
                수정
              </button>
            </div>
          </div>
          <span className="text-lg">{post.content}</span>
          {updateId === post.id && <PostsForm updateData={post} />}
        </div>
      ))}
    </div>
  );
}
