// Custom hook for handling swipe gestures in React components
import { useState, useEffect } from "react";

const useSwipe = (
  element,
  { onSwipeLeft, onSwipeRight, threshold = 50 } = {}
) => {
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

  // The required distance between touchStart and touchEnd to be detected as a swipe
  const minSwipeDistance = threshold;

  useEffect(() => {
    const target = element?.current || window;

    const handleTouchStart = (e) => {
      setTouchEnd(null); // Reset touch end on new touch start
      setTouchStart(e.targetTouches[0].clientX);
    };

    const handleTouchMove = (e) => {
      setTouchEnd(e.targetTouches[0].clientX);
    };

    const handleTouchEnd = () => {
      if (!touchStart || !touchEnd) return;

      const distance = touchStart - touchEnd;
      const isLeftSwipe = distance > minSwipeDistance;
      const isRightSwipe = distance < -minSwipeDistance;

      if (isLeftSwipe && onSwipeLeft) {
        onSwipeLeft();
      }

      if (isRightSwipe && onSwipeRight) {
        onSwipeRight();
      }
    };

    target.addEventListener("touchstart", handleTouchStart);
    target.addEventListener("touchmove", handleTouchMove);
    target.addEventListener("touchend", handleTouchEnd);

    return () => {
      // Clean up event listeners
      target.removeEventListener("touchstart", handleTouchStart);
      target.removeEventListener("touchmove", handleTouchMove);
      target.removeEventListener("touchend", handleTouchEnd);
    };
  }, [
    element,
    onSwipeLeft,
    onSwipeRight,
    touchStart,
    touchEnd,
    minSwipeDistance,
  ]);

  return {
    touchStart,
    touchEnd,
  };
};

export default useSwipe;
