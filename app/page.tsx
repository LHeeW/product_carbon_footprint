import { Suspense } from "react";
import ChartsContainer from "./components/charts/charts-container";
import ChartsSkeleton from "./ui/skeleton/charts-skeleton";
import Header from "./components/header";
import TableContainer from "./components/tables/table-container";
import TableSkeleton from "./ui/skeleton/table-skeleton";
import PostsContainer from "./components/posts/posts-container";

export default function Home() {
  return (
    <>
      <Header />
      <main className="p-6 grid grid-cols-[1.5fr_1fr] grid-rows-[auto_1fr] items-start gap-6">
        <Suspense fallback={<ChartsSkeleton />}>
          <ChartsContainer />
        </Suspense>
        <div className="row-span-2">
          <Suspense fallback={<TableSkeleton />}>
            <TableContainer />
          </Suspense>
        </div>
        <PostsContainer />
      </main>
    </>
  );
}
