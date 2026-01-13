import Camera from '@/components/Camera';
import { useEffect, useRef, useState } from 'react';

import * as faceapi from 'face-api.js';

const DetectFace = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [detection, setDetection] = useState<faceapi.FaceDetection | null>(
    null,
  );

  useEffect(() => {
    console.log('useEfekti');
    let timer: ReturnType<typeof setTimeout> | null = null;

    // Load the face detection models
    const loadModels = async () => {
      try {
        await faceapi.nets.tinyFaceDetector.loadFromUri('/models');
        console.log('Models loaded');
      } catch (error) {
        console.error('Error loading models:', error);
      }
    };

    // Detect face from video frames
    const detectFace = async () => {
      if (videoRef.current) {
        const result = await faceapi.detectSingleFace(
          videoRef.current,
          new faceapi.TinyFaceDetectorOptions(),
        );

        setDetection(result || null); // Update detection state
      }

      // Schedule the next detection
      timer = setTimeout(detectFace, 1000);
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

          detectFace(); // Start detecting faces
        }
      } catch (error) {
        console.error('Error initializing video feed:', error);
      }
    };

    loadModels().then(startDetection);

    // Cleanup on unmount
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, []);

  console.log('toimiiko', detection);

  return (
    <div>
      <Camera ref={videoRef} width={800} height={480} />
      {detection && (
        <div
          style={{
            position: 'absolute',
            top: detection.box.y,
            left: detection.box.x,
            width: detection.box.width,
            height: detection.box.height,
            border: '2px solid red',
            pointerEvents: 'none',
          }}
        ></div>
      )}
    </div>
  );
};

export default DetectFace;
