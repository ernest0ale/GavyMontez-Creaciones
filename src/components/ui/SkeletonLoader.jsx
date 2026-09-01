// components/ui/SkeletonLoader.jsx
'use client';

export default function SkeletonLoader({ count = 8, columns = 4 }) {
  const getGridColumns = () => {
    switch (columns) {
      case 1:
        return 'grid-cols-1';
      case 2:
        return 'grid-cols-1 sm:grid-cols-2';
      case 3:
        return 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3';
      case 4:
      default:
        return 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4';
    }
  };

  return (
    <div className={`grid ${getGridColumns()} gap-6 md:gap-8`}>
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className="skeleton-card"
        >
          <div className="skeleton-image" />
          <div className="p-5 space-y-3">
            <div className="skeleton-text" />
            <div className="skeleton-text" />
            <div className="skeleton-text short" />
          </div>
          <div className="px-5 pb-5 pt-2 flex items-center justify-between border-t border-[var(--border)]">
            <div className="skeleton-text h-6 w-20 rounded bg-[var(--hero-bg)]" />
            <div className="skeleton-text h-8 w-24 rounded-full bg-[var(--hero-bg)]" />
          </div>
        </div>
      ))}
    </div>
  );
}