"use client"
import Image from 'next/image';
import React, { useState, useEffect, useRef } from 'react';

const MovableZoomableImage = ({ imageURL, height = 100, width = 100 }) => {
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [lastMousePosition, setLastMousePosition] = useState({ x: 0, y: 0 });

  const imgRef = useRef(null);

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setLastMousePosition({ x: e.clientX, y: e.clientY });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    const dx = e.clientX - lastMousePosition.x;
    const dy = e.clientY - lastMousePosition.y;
    setPosition((prev) => ({
      x: prev.x + dx,
      y: prev.y + dy,
    }));
    setLastMousePosition({ x: e.clientX, y: e.clientY });
  };

  const zoomIn = () => {
    setScale((prev) => prev + 0.1);
  };

  const zoomOut = () => {
    setScale((prev) => Math.max(0.1, prev - 0.1));
  };

  useEffect(() => {
    const handleMouseUpWindow = () => setIsDragging(false);
    window.addEventListener('mouseup', handleMouseUpWindow);
    return () => {
      window.removeEventListener('mouseup', handleMouseUpWindow);
    };
  }, []);

  return (
    <div 
      style={{
        position: 'relative',
        width: `${width}%`,
        height: `${height}%`,
        overflow: 'hidden',
        border: '1px solid #ddd',
      }}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      <Image
        ref={imgRef}
        src={imageURL}
        alt="movable"
        width={500}
        height={500}
        onMouseDown={handleMouseDown}
        style={{
          position: 'absolute',
          top: position.y,
          left: position.x,
          transform: `scale(${scale})`,
          cursor: 'grab',
          userSelect: 'none',
          width: '100%',
          height: '100%',
          objectFit: 'contain'
        }}
      />
      <div style={{ position: 'absolute', top: 10, right: 10 }}>
        <button onClick={zoomIn} style={{ marginRight: '5px' }}>Zoom In</button>
        <button onClick={zoomOut}>Zoom Out</button>
      </div>
    </div>
  );
};

export default MovableZoomableImage;
