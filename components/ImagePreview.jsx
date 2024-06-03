"use client";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import AnalogClock from './AnalogClock';


const ImagePreview = () => {
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [lastMousePosition, setLastMousePosition] = useState({ x: 0, y: 0 });
  const [imageSrc, setImageSrc] = useState('/preview.png');
  const [shape, setShape] = useState('square');

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

  const handleTouchStart = (e) => {
    if (e.touches.length !== 1) return;
    const touch = e.touches[0];
    setIsDragging(true);
    setLastMousePosition({ x: touch.clientX, y: touch.clientY });
  };

  const handleTouchMove = (e) => {
    if (!isDragging || e.touches.length !== 1) return;
    const touch = e.touches[0];
    const dx = touch.clientX - lastMousePosition.x;
    const dy = touch.clientY - lastMousePosition.y;
    setPosition((prev) => ({
      x: prev.x + dx,
      y: prev.y + dy,
    }));
    setLastMousePosition({ x: touch.clientX, y: touch.clientY });
  };
  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  const zoomIn = () => {
    setScale((prev) => prev + 0.1);
  };

  const zoomOut = () => {
    setScale((prev) => Math.max(0.1, prev - 0.1));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      // const img = new Image();
      // img.onload = () => {
      //   // alert(`${img.width},${img.height}`)
      //   // console.log(img.width,img.height)
      //   // setImageSize({ width: img.width, height: img.height });
      //   setImageSrc(imageUrl);
      // };
      setImageSrc(imageUrl);
    }
  };

  const getShapeClass = () => {
    switch (shape) {
      case 'square':
        return '';
      case 'rounded-square':
        return 'rounded-lg';
      case 'circle':
        return 'w-96 h-96 rounded-full';
      case 'bean':
        return 'rounded-full h-64 w-80';
      default:
        return '';
    }
  };

  useEffect(() => {
    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("touchend", handleTouchEnd);
    window.addEventListener("touchmove", handleTouchMove);
    return () => {
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchend", handleTouchEnd);
      window.removeEventListener("touchmove", handleTouchMove);
    };
  }, [isDragging, lastMousePosition]);

  return (
    <div className="flex flex-col items-center mt-8">
      <div
        className={`relative w-full h-96 border border-gray-300 overflow-hidden mb-6 ${getShapeClass()}`}
        style={{
          // borderRadius: "10px",
          boxShadow:
            "rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px",
        }}
      >
        <div
          className="absolute inset-0 flex items-center justify-center" //if want lag in image add class transition-transform duration-200
          style={{
            transform: `scale(${scale}) translate(${position.x}px, ${position.y}px)`,
          }}
          onTouchStart={handleTouchStart}
          onMouseDown={handleMouseDown}
        >
          <Image
          src={imageSrc}
            // src="/preview.png"
            alt="Preview"
            layout="fill"
            objectFit="contain"
            // className={`object-contain w-full h-full ${getShapeClass()}`}
            draggable={false}
          />
          <AnalogClock shapeClass={getShapeClass()} />
          {/* <div className="absolute text-white text-3xl font-bold bg-black bg-opacity-50 px-4 py-2">
            PREVIEW
          </div> */}
        </div>
        {/* <div className="absolute top-2 left-1/2 transform -translate-x-1/2 bg-blue-800 text-white px-4 py-1 rounded-md">
          Width 12inch (30.48cm)
        </div> */}
        {/* <div className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-blue-800 text-white px-4 py-1 rounded-md rotate-90">
          Height 9inch (22.86cm)
        </div> */}
        {/* <button className="absolute bottom-4 right-4 bg-blue-800 text-white px-4 py-2 rounded-md">
          Size ?
        </button> */}
      </div>
      <div className="flex justify-center mb-6 space-x-4">
        <button
          onClick={zoomOut}
          className="bg-blue-500 text-white py-2 px-4 rounded-md"
        >
          -
        </button>
        <button
          onClick={zoomIn}
          className="bg-blue-500 text-white py-2 px-4 rounded-md"
        >
          +
        </button>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="hidden"
          id="file-input"
        />  
        <label
          htmlFor="file-input"
          className="bg-blue-500 text-white py-2 px-4 rounded-md cursor-pointer"
        >
          Select Photo
        </label>

        {/* <button className="bg-blue-500 text-white py-2 px-4 rounded-md">
          Select Photo
        </button> */}
        <button className="bg-blue-500 text-white py-2 px-4 rounded-md">
          Add Text
        </button>
        <button className="bg-blue-500 text-white py-2 px-4 rounded-md">
          How?
        </button>
      </div>
      <div className="text-sm">
        By uploading an image you agree to our{" "}
        <a href="#" className="text-blue-500">
          Terms of Service
        </a>
        .
      </div>
      <div className="flex justify-center mb-6 space-x-4">
        <button onClick={() => setShape('square')} className="bg-blue-500 text-white py-2 px-4 rounded-md">
          Square
        </button>
        <button onClick={() => setShape('rounded-square')} className="bg-blue-500 text-white py-2 px-4 rounded-md">
          Rounded Square
        </button>
        <button onClick={() => setShape('circle')} className="bg-blue-500 text-white py-2 px-4 rounded-md">
          Circle
        </button>
        <button onClick={() => setShape('bean')} className="bg-blue-500 text-white py-2 px-4 rounded-md">
          Bean
        </button>
      </div>
    </div>
  );
};

export default ImagePreview;
