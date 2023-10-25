import { useEffect, useState } from 'react';

const useWidth = () => {
  const [width, setWidth] = useState(window.innerWidth);
  useEffect(() => {
    const resizeListener = () => setWidth(window.innerWidth);
    window.addEventListener('resize', resizeListener);
    return () => removeEventListener('resize', resizeListener);
  });
  return width;
};

export default useWidth;
