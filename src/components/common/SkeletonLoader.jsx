import React from 'react';

// Skeleton loader component for displaying placeholder content while loading
export default function SkeletonLoader({ type, count = 1 }) {
  // Generate multiple skeleton items based on count
  const renderMultiple = (renderFn) => {
    return Array.from({ length: count }, (_, index) => (
      <div key={index} className="animate-pulse">
        {renderFn()}
      </div>
    ));
  };

  // Card skeleton for featured builds or product cards
  const renderCard = () => (
    <div className="bg-white rounded-lg shadow-md overflow-hidden h-full">
      <div className="h-48 md:h-56 bg-gray-200"></div>
      <div className="p-4">
        <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
        <div className="h-3 bg-gray-200 rounded w-full mb-2"></div>
        <div className="h-3 bg-gray-200 rounded w-2/3"></div>
        <div className="flex justify-between items-center mt-4">
          <div className="flex space-x-1">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="w-4 h-4 bg-gray-200 rounded-full"></div>
            ))}
          </div>
          <div className="h-3 bg-gray-200 rounded w-16"></div>
        </div>
      </div>
    </div>
  );

  // Text skeleton for paragraphs
  const renderText = () => (
    <div>
      <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
      <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
      <div className="h-4 bg-gray-200 rounded w-2/3"></div>
    </div>
  );

  // Button skeleton
  const renderButton = () => (
    <div className="h-10 bg-gray-200 rounded w-32"></div>
  );

  // Carousel skeleton with multiple cards
  const renderCarousel = () => (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {Array.from({ length: count }, (_, index) => (
        <div key={index} className="animate-pulse">
          {renderCard()}
        </div>
      ))}
    </div>
  );

  // Return the appropriate skeleton based on type
  switch (type) {
    case 'card':
      return renderMultiple(renderCard);
    case 'text':
      return renderMultiple(renderText);
    case 'button':
      return renderMultiple(renderButton);
    case 'carousel':
      return renderCarousel();
    default:
      return renderMultiple(renderCard);
  }
}
