import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useCompanyStore } from "../stores/useCompanyStore";
import { usePostMutation } from "./tanstacks/mutation/usePostMutation";
import { Post } from "../types/types";
import { companyKeys, postKeys } from "./tanstacks/query-keys";
import { fetchCompanies } from "../lib/api";
import { usePostStore } from "../stores/usePostStore";

export default function usePostForm(updateData?: Post) {
  const queryClient = useQueryClient();
  const selectedId = useCompanyStore((state) => state.selectedId);
  const closeForm = usePostStore((state) => state.closeForm);
  const { data: companies } = useQuery({
    queryKey: companyKeys.all,
    queryFn: fetchCompanies,
  });
  const { mutate, isPending } = usePostMutation({
    onSuccess: () => {
      alert(updateData ? "수정되었습니다." : "작성되었습니다.");
      queryClient.invalidateQueries({ queryKey: postKeys.all });
    },
  });

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = e.currentTarget;

    const formData = new FormData(data);

    const post = {
      title: formData.get("title") as string,
      content: formData.get("content") as string,
      resourceUid: selectedId || (companies ? companies[0].id : ""),
      dateTime: new Date().toISOString(),
      ...(updateData?.id && { id: updateData.id }),
    };

    const tryMutate = (post: Omit<Post, "id"> & { id?: string }) => {
      mutate(post, {
        onSuccess: () => {
          if (!updateData) data.reset();
          if (updateData) closeForm();
        },
        onError: (error) => {
          const retry = window.confirm(
            `오류가 발생했습니다: ${error.message}\n다시 시도하시겠습니까?`,
          );
          if (retry) {
            tryMutate(post);
          }
        },
      });
    };
    tryMutate(post);
  };

  return { isPending, handleSubmit };
}
