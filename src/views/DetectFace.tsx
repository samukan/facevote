import Camera from '@/components/Camera';
import { useFaceDetection } from '@/hooks/FaceHooks';
import { useStore } from '@/stores/DBStore';
import { useEffect, useRef } from 'react';

const DetectFace = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const { detectionResult, getDescriptors } = useFaceDetection();
  const { faces, addFaces, getAllFaces } = useStore();

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout> | null = null;
    const detectFace = async () => {
      try {
        const result = await getDescriptors(videoRef); // Start detecting faces

        // faces to DB
        if (result) {
          console.log('jaahs', result, faces.length);
          console.log('testi', getAllFaces());
          if (faces.length === 0) {
            addFaces(result.descriptor);
          }
        }

        timer = setTimeout(detectFace, 100); // Schedule the next detection
      } catch (error) {}
    };

    // Initialize the video feed and start detection
    const startDetection = async () => {
      try {
        if (videoRef.current) {
          // Wait for the video element to be ready
          await new Promise<void>((resolve) => {
            if (videoRef.current!.readyState >= 2) {
              console.log('first');
              resolve();
            } else {
              videoRef.current!.oncanplay = () => {
                console.log('secoind');
                resolve();
              };
            }
          });
          detectFace(); // Start the detection loop
        }
      } catch (error) {
        console.error('Error initializing video feed:', error);
      }
    };

    startDetection();

    // Cleanup on unmount
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, []);

  console.log('descriptors', detectionResult);

  return (
    <div>
      <Camera ref={videoRef} width={800} height={480} />
      {detectionResult?.detection && (
        <div
          style={{
            position: 'absolute',
            top: detectionResult.detection.box.y,
            left: detectionResult.detection.box.x,
            width: detectionResult.detection.box.width,
            height: detectionResult.detection.box.height,
            border: '2px solid red',
            pointerEvents: 'none',
          }}
        ></div>
      )}
    </div>
  );
};

export default DetectFace;
