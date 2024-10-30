import { useEffect, useRef } from 'react';

export const useRenderCount = (name: string) => {
  const renderCount = useRef(0);

  useEffect(() => {
    renderCount.current += 1;
    window.console.log(`${name} rendered, count: ${renderCount.current}`);
  });
};
