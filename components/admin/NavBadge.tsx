export function NavBadge({ count }: { count: number }) {
  if (count <= 0) return null;

  return (
    <span className="relative ml-auto flex h-5 min-w-5 shrink-0 items-center justify-center">
      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-500 opacity-75" />
      <span className="relative flex h-5 min-w-5 items-center justify-center rounded-full bg-red-600 px-1 text-[10px] font-bold leading-none text-white">
        {count}
      </span>
    </span>
  );
}
