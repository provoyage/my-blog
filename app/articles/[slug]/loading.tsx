export default function Loading() {
  return (
    <div className="mx-auto w-full max-w-6xl px-6 py-12 sm:px-8 lg:px-12 lg:py-16">
      <div className="glass-panel overflow-hidden rounded-[2.25rem]">
        <div className="h-[22rem] animate-pulse bg-stone-200/80 sm:h-[28rem]" />
        <div className="space-y-5 p-8 sm:p-10">
          <div className="h-3 w-40 animate-pulse rounded-full bg-stone-200/80" />
          <div className="h-10 w-4/5 animate-pulse rounded-2xl bg-stone-200/80" />
          <div className="h-4 w-full animate-pulse rounded-full bg-stone-200/70" />
          <div className="h-4 w-11/12 animate-pulse rounded-full bg-stone-200/70" />
          <div className="h-4 w-9/12 animate-pulse rounded-full bg-stone-200/70" />
        </div>
      </div>
    </div>
  );
}
