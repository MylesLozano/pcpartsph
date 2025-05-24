import { useEffect } from "react";

/**
 * A custom hook for preloading images to improve user experience
 *
 * @param {Array} imageSources - Array of image URLs to preload
 * @param {Function} onProgress - Optional callback that receives loading progress (0-100)
 * @param {Function} onComplete - Optional callback when all images are loaded
 */
function useImagePreloader(
  imageSources = [],
  onProgress = null,
  onComplete = null
) {
  useEffect(() => {
    if (!imageSources || imageSources.length === 0) return;

    // Filter out any null, undefined or empty strings
    const validSources = imageSources.filter((src) => src);
    if (validSources.length === 0) return;

    let loadedCount = 0;
    const totalImages = validSources.length;

    const preloadImage = (src) => {
      return new Promise((resolve) => {
        const img = new Image();

        img.onload = () => {
          loadedCount++;

          // Update progress if callback provided
          if (onProgress && typeof onProgress === "function") {
            const progressPercentage = Math.round(
              (loadedCount / totalImages) * 100
            );
            onProgress(progressPercentage);
          }

          resolve(src);
        };

        img.onerror = () => {
          // Count errors as loaded to continue progress
          loadedCount++;

          if (onProgress && typeof onProgress === "function") {
            const progressPercentage = Math.round(
              (loadedCount / totalImages) * 100
            );
            onProgress(progressPercentage);
          }

          // Resolve anyway to not break the chain
          resolve(null);
        };

        img.src = src;
      });
    };

    // Start preloading all images
    Promise.all(validSources.map((src) => preloadImage(src)))
      .then(() => {
        // All images loaded
        if (onComplete && typeof onComplete === "function") {
          onComplete();
        }
      })
      .catch((error) => {
        console.error("Error preloading images:", error);
        // Still call complete callback even if some images failed
        if (onComplete && typeof onComplete === "function") {
          onComplete();
        }
      });
  }, [imageSources, onProgress, onComplete]);
}

export default useImagePreloader;
