import { useEffect, useState } from 'react';

const AnalogClock = ({ shapeClass }) => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(intervalId);
  }, []);

  const hours = time.getHours() % 12;
  const minutes = time.getMinutes();
  const seconds = time.getSeconds();
  const hourRotation = (hours * 30) + (minutes / 2); // 360 / 12 = 30 degrees per hour
  const minuteRotation = (minutes * 6) + (seconds / 10); // 360 / 60 = 6 degrees per minute
  const secondRotation = seconds * 6; // 360 / 60 = 6 degrees per second

  return (
    <div className={`relative ${shapeClass} w-full h-full flex items-center justify-center`}>
      <div className="absolute w-1/2 h-1/2 border-2 border-black rounded-full"></div>
      <div
        className="absolute w-1 h-1/3 bg-black origin-bottom"
        style={{ transform: `rotate(${hourRotation}deg)` }}
      ></div>
      <div
        className="absolute w-1 h-1/2 bg-black origin-bottom"
        style={{ transform: `rotate(${minuteRotation}deg)` }}
      ></div>
      <div
        className="absolute w-1 h-1/2 bg-red-500 origin-bottom"
        style={{ transform: `rotate(${secondRotation}deg)` }}
      ></div>
      {[...Array(12)].map((_, i) => (
        <div
          key={i}
          className="absolute text-black"
          style={{
            transform: `rotate(${i * 30}deg) translate(0, -140%)`,
            transformOrigin: 'center center',
          }}
        >
          {i === 0 ? 12 : i}
        </div>
      ))}
    </div>
  );
};

export default AnalogClock;
