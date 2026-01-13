import Camera from '@/components/Camera';
import { useRef } from 'react';

function DetectFace() {
  const videoRef = useRef<HTMLVideoElement>(null);
  return (
    <div>
      <Camera ref={videoRef} width={800} height={480} />
    </div>
  );
}

export default DetectFace;
