'use client';

import { useState } from 'react';
import Image, { type ImageProps } from 'next/image';

interface ImageWithSkeletonProps extends Omit<ImageProps, 'onLoad'> {
  wrapperClassName?: string;
}

/**
 * Image wrapper with a loading skeleton shimmer effect.
 * Shows a navy-800 shimmer until the image is fully loaded.
 */
export default function ImageWithSkeleton({
  wrapperClassName = '',
  className = '',
  alt,
  ...props
}: ImageWithSkeletonProps) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className={`relative overflow-hidden ${wrapperClassName}`}>
      {/* Skeleton shimmer */}
      {!loaded && (
        <div className="absolute inset-0 z-10 animate-pulse bg-navy-800" />
      )}
      <Image
        {...props}
        alt={alt}
        className={`transition-opacity duration-500 ${loaded ? 'opacity-100' : 'opacity-0'} ${className}`}
        onLoad={() => setLoaded(true)}
      />
    </div>
  );
}
