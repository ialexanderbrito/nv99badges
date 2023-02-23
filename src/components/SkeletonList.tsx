import { CardSkeleton } from './CardSkeleton';

export function SkeletonList() {
  return (
    <>
      {Array.from({ length: 2 }).map((_, index) => (
        <>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
            <CardSkeleton key={index} />
            <CardSkeleton key={index} />
            <CardSkeleton key={index} />
          </div>
        </>
      ))}
    </>
  );
}
