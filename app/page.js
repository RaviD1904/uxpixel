
import Image from 'next/image'

import MovableZoomableImage from "@/components/MovableZoomableImage";
import ImagePreview from "@/components/ImagePreview"

export default function Home() {
  return (
    <>
      <Image src="/preview.png" width={300} height={300}/>
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <ImagePreview />
    </div>
    </>
    
  );
}
