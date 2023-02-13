import { useEffect, useRef, useState } from 'react';

const useDraw = (onDraw: ({ ctx, currentPoint, prevPoint }: Draw) => void) => {
  const [mouseDown, setMouseDown] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const prevPoint = useRef<null | Point>(null);

  const onMouseDown = (e: MouseEvent) => {
    setMouseDown(true);
  };

  const onMouseUp = () => {
    setMouseDown(false);
    prevPoint.current = null;
  };

  const clear = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Handlers
    const handler = (e: MouseEvent) => {
      if (!mouseDown) return;

      const currentPoint = computePointInCanvas(e);

      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      onDraw({ ctx, currentPoint, prevPoint: prevPoint.current });
      prevPoint.current = currentPoint;
    };

    const computePointInCanvas = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();

      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      return { x, y };
    };

    // Add event listeners
    canvas.addEventListener('mousemove', handler);
    window.addEventListener('mouseup', onMouseUp);

    return () => {
      // Remove event listeners
      canvas.removeEventListener('mousemove', handler);
      window.removeEventListener('mouseup', onMouseUp);
    };
  }, [mouseDown, onDraw]);

  return { canvasRef, onMouseDown, clear };
};

export { useDraw };
