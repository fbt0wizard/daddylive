import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

interface SkeletonLoaderProps {
  count?: number;
}

const SkeletonLoader = ({ count = 8 }: SkeletonLoaderProps) => {
  return (
    <div className="w-full h-full bg-background p-4">
      {/* Header Skeleton */}
      <div className="mb-6">
        <Skeleton className="h-10 w-48 mb-4" />
        <div className="flex items-center justify-between">
          <Skeleton className="h-8 w-64" />
          <Skeleton className="h-8 w-32" />
        </div>
      </div>

      {/* Filter Bar Skeleton */}
      <div className="flex flex-wrap gap-2 mb-6">
        <Skeleton className="h-10 w-28" />
        <Skeleton className="h-10 w-28" />
        <Skeleton className="h-10 w-28" />
        <Skeleton className="h-10 w-40" />
      </div>

      {/* Program Grid Skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {Array(count)
          .fill(0)
          .map((_, index) => (
            <div key={index} className="border rounded-lg p-4 bg-card">
              <div className="flex items-center mb-3">
                <Skeleton className="h-12 w-12 rounded-full" />
                <div className="ml-3 flex-1">
                  <Skeleton className="h-4 w-3/4 mb-2" />
                  <Skeleton className="h-3 w-1/2" />
                </div>
              </div>
              <Skeleton className="h-24 w-full mb-3" />
              <div className="flex justify-between items-center">
                <Skeleton className="h-4 w-1/3" />
                <Skeleton className="h-6 w-20 rounded-full" />
              </div>
            </div>
          ))}
      </div>

      {/* Pagination Skeleton */}
      <div className="mt-8 flex justify-center">
        <div className="flex gap-2">
          <Skeleton className="h-10 w-10 rounded-md" />
          <Skeleton className="h-10 w-10 rounded-md" />
          <Skeleton className="h-10 w-10 rounded-md" />
          <Skeleton className="h-10 w-10 rounded-md" />
        </div>
      </div>
    </div>
  );
};

export default SkeletonLoader;
