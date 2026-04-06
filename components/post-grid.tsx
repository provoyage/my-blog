import { PostCard } from "@/components/post-card";
import type { Post } from "@/lib/posts";

type PostGridProps = {
  posts: Post[];
  gridClassName?: string;
  emptyTitle?: string;
  emptyDescription?: string;
};

export function PostGrid({
  posts,
  gridClassName = "grid gap-6 md:grid-cols-2 xl:grid-cols-4",
  emptyTitle = "記事を準備中です",
  emptyDescription = "Sanity に記事を追加すると、このエリアにカードが自動で表示されます。",
}: PostGridProps) {
  if (posts.length === 0) {
    return (
      <div className="glass-panel rounded-[2rem] p-6 sm:p-8">
        <div className="flex h-full min-h-40 flex-col items-start justify-center rounded-[1.5rem] border border-dashed border-slate-200 bg-white/70 p-5 text-left sm:min-h-56 sm:p-6">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-500">
            Empty State
          </p>
          <h3 className="mt-3 break-words font-serif text-2xl tracking-[-0.03em] text-slate-950 sm:text-3xl">
            {emptyTitle}
          </h3>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-600">{emptyDescription}</p>
        </div>
      </div>
    );
  }

  return (
    <div className={gridClassName}>
      {posts.map((post) => (
        <PostCard key={post.slug} post={post} />
      ))}
    </div>
  );
}
