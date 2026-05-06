"use client";

import usePostForm from "@/app/hooks/usePostForm";
import { usePostStore } from "@/app/stores/usePostStore";
import { Post } from "@/app/types/types";

export default function PostsForm({ updateData }: { updateData?: Post }) {
  const { isPending, handleSubmit } = usePostForm(updateData);
  const closeForm = usePostStore((store) => store.closeForm);

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="p-4 flex flex-col gap-5 rounded-2xl shadow-xl bg-white"
      >
        <h2 className="text-xl font-bold text-green-700 tracking-tighter">
          포스트 {updateData ? "수정" : "추가"}
        </h2>
        <input
          type="text"
          name="title"
          defaultValue={updateData?.title}
          placeholder="제목"
          maxLength={50}
          required
          className="px-2 py-4 border-b"
        />
        <textarea
          name="content"
          defaultValue={updateData?.content}
          placeholder="내용을 입력하세요."
          maxLength={200}
          required
          className="px-2 py-4 border-b resize-none"
        />
        <div className="self-end">
          <button
            type="submit"
            disabled={isPending}
            className="p-4 cursor-pointer text-xl font-bold text-green-700 rounded-2xl hover:shadow-md transition"
          >
            {isPending ? "저장중..." : "저장하기"}
          </button>
          {updateData && (
            <button
              onClick={closeForm}
              className="p-4 cursor-pointer text-xl font-bold text-green-700 rounded-2xl hover:shadow-md transition"
            >
              취소
            </button>
          )}
        </div>
      </form>
    </>
  );
}
