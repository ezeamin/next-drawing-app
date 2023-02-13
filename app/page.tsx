'use client';

import { useState } from 'react';
import { useDraw } from '@/hooks/useDraw';
import { ChromePicker } from 'react-color';

interface pageProps {}

const Home: pageProps = ({}) => {
  const { canvasRef, onMouseDown, clear } = useDraw(drawLine);

  const [color, setColor] = useState<string>('#000000');

  function drawLine({ prevPoint, currentPoint, ctx }: Draw) {
    const { x: currX, y: currY } = currentPoint;
    const lineWidth = 5;

    let startPoint = prevPoint ?? currentPoint;
    ctx.beginPath();
    ctx.lineWidth = lineWidth;
    ctx.strokeStyle = color;
    ctx.moveTo(startPoint.x, startPoint.y);
    ctx.lineTo(currX, currY);
    ctx.stroke();

    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(startPoint.x, startPoint.y, 2, 0, Math.PI * 2);
    ctx.fill();
  }

  return (
    <main className='w-screen h-screen bg-white flex justify-center items-center'>
      <div className='flex flex-col gap-10 pr-10'>
        <ChromePicker color={color} onChange={(e) => setColor(e.hex)} />
        <button
          type='button'
          onClick={clear}
          className='p-2 rounded-md border border-black'
        >
          Clear
        </button>
      </div>
      <canvas
        width={750}
        height={750}
        className='border border-black rounded-md'
        ref={canvasRef}
        onMouseDown={onMouseDown}
      />
    </main>
  );
};

export default Home;
