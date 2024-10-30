import { useEffect, useRef } from 'react';

export const useRenderCount = (name: string, color: string) => {
  const renderCount = useRef(0);

  useEffect(() => {
    renderCount.current += 1;
    window.console.log(
      `%c${name} rendered, count: ${renderCount.current}`,
      `color: ${color}; font-weight: bold;`,
    );
  });
};
