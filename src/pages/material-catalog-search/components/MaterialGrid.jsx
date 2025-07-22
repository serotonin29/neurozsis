import React from 'react';
import MaterialCard from './MaterialCard';

const MaterialGrid = ({ 
  materials, 
  isLoading, 
  onBookmark, 
  onPreview,
  className = '' 
}) => {
  // Loading skeleton component
  const SkeletonCard = () => (
    <div className="bg-card border border-border rounded-xl overflow-hidden animate-pulse">
      <div className="aspect-video bg-muted" />
      <div className="p-4 space-y-3">
        <div className="flex justify-between">
          <div className="h-4 bg-muted rounded w-20" />
          <div className="h-4 bg-muted rounded w-16" />
        </div>
        <div className="h-5 bg-muted rounded w-3/4" />
        <div className="space-y-2">
          <div className="h-3 bg-muted rounded w-full" />
          <div className="h-3 bg-muted rounded w-2/3" />
        </div>
        <div className="flex justify-between">
          <div className="h-3 bg-muted rounded w-24" />
          <div className="h-3 bg-muted rounded w-16" />
        </div>
        <div className="flex space-x-2">
          <div className="h-8 bg-muted rounded flex-1" />
          <div className="h-8 bg-muted rounded w-10" />
        </div>
      </div>
    </div>
  );

  if (isLoading) {
    return (
      <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ${className}`}>
        {Array.from({ length: 9 }).map((_, index) => (
          <SkeletonCard key={index} />
        ))}
      </div>
    );
  }

  if (!materials || materials.length === 0) {
    return (
      <div className={`flex flex-col items-center justify-center py-16 ${className}`}>
        <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mb-4">
          <svg viewBox="0 0 24 24" className="w-12 h-12 text-muted-foreground" fill="none" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h3 className="font-heading font-semibold text-lg text-foreground mb-2">
          Tidak ada materi ditemukan
        </h3>
        <p className="font-body text-sm text-muted-foreground text-center max-w-md">
          Coba ubah kata kunci pencarian atau filter yang digunakan untuk menemukan materi yang sesuai.
        </p>
      </div>
    );
  }

  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ${className}`}>
      {materials.map((material) => (
        <MaterialCard
          key={material.id}
          material={material}
          onBookmark={onBookmark}
          onPreview={onPreview}
        />
      ))}
    </div>
  );
};

export default MaterialGrid;