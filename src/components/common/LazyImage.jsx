import React, { useState, useEffect } from 'react';

/**
 * LazyImage component that loads images only when they are in viewport
 * with a nice fade-in effect and placeholder support
 * 
 * @param {Object} props - Component properties
 * @param {string} props.src - Source URL of the image
 * @param {string} props.alt - Alt text for accessibility
 * @param {string} props.className - CSS class name for the image
 * @param {string} props.placeholderSrc - Optional placeholder image to show while loading
 * @param {string} props.fallbackSrc - Optional fallback image to show if loading fails
 * @param {Object} props.imgProps - Additional image props to pass to the img element
 * @returns {React.Component} - LazyImage component
 */
const LazyImage = ({
  src,
  alt,
  className = '',
  placeholderSrc = '',
  fallbackSrc = '',
  imgProps = {},
  ...props
}) => {
  const [imageSrc, setImageSrc] = useState(placeholderSrc || '');
  const [isLoaded, setIsLoaded] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    // Reset state when source changes
    if (src) {
      setIsLoaded(false);
      setIsError(false);
      setImageSrc(placeholderSrc || '');
      
      // Create an observer for lazy loading
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach(entry => {
            // If element is in viewport
            if (entry.isIntersecting) {
              // Load the image
              const img = new Image();
              img.src = src;
              
              img.onload = () => {
                setImageSrc(src);
                setIsLoaded(true);
                // Unobserve after loading
                observer.unobserve(entry.target);
              };
              
              img.onerror = () => {
                setIsError(true);
                setImageSrc(fallbackSrc || '');
                // Unobserve after error
                observer.unobserve(entry.target);
              };
            }
          });
        },
        {
          rootMargin: '200px', // Start loading when image is 200px from viewport
          threshold: 0
        }
      );
      
      // Get a reference to the DOM element
      const element = document.getElementById(`lazy-img-${props.id || Math.random().toString(36).substr(2, 9)}`);
      
      if (element) {
        observer.observe(element);
      }
      
      // Clean up observer on unmount
      return () => {
        if (element) {
          observer.unobserve(element);
        }
      };
    }
  }, [src, placeholderSrc, fallbackSrc, props.id]);

  const uniqueId = props.id || Math.random().toString(36).substr(2, 9);

  return (
    <div
      id={`lazy-img-${uniqueId}`}
      className={`relative overflow-hidden ${props.wrapperClassName || ''}`}
    >
      {/* Placeholder or loaded image */}
      <img
        src={imageSrc || 'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=='}
        alt={alt}
        className={`${className} transition-opacity duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
        {...imgProps}
      />

      {/* Loading skeleton */}
      {!isLoaded && !isError && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse" />
      )}

      {/* Error state */}
      {isError && !imageSrc && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 text-gray-500">
          <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>
      )}
    </div>
  );
};

export default LazyImage;
