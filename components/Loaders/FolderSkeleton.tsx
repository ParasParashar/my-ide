import { Skeleton } from "@/components/ui/skeleton";

export function FolderSkeleton() {
  return (
    <div className="flex items-center p-2 justify-between space-x-4 w-full">
      <div className=" gap-x-2 flex">
        <Skeleton className="h-5 w-5  opacity-5 rounded-full" />
        <Skeleton className="h-5 w-[100px] rounded-sm opacity-5" />
      </div>

      <div className="flex items-center gap-x-2">
        <Skeleton className="h-5 w-5 rounded-full opacity-5" />
        <Skeleton className="h-5 w-5 rounded-full opacity-5" />
        <Skeleton className="h-5 w-5 rounded-full opacity-5" />
      </div>
    </div>
  );
}
