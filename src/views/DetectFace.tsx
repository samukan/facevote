import Camera from '@/components/Camera';
import { useFaceDetection } from '@/hooks/FaceHooks';
import { useStore } from '@/stores/DBStore';
import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router';

const DetectFace: React.FC = () => {
  const navigate = useNavigate();
  const videoRef = useRef<HTMLVideoElement>(null);
  const { detectionResult, getDescriptors, matchFace } = useFaceDetection();
  const { faces, addFaces, getAllFaces } = useStore();

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout> | null = null;
    const detectFace = async () => {
      try {
        const labeledFace = await getDescriptors(
          videoRef as React.RefObject<HTMLVideoElement>,
        ); // Start detecting faces

        // faces to DB
        if (labeledFace) {
          if (faces.length === 0) {
            navigate('/detected', {
              state: { descriptors: [labeledFace.toJSON()] },
            });
          }
          const match = await matchFace(labeledFace.descriptors[0], faces);
          console.log('match', match);
        }

        timer = setTimeout(detectFace, 100); // Schedule the next detection
      } catch (error) {
        console.error('Error during face detection:', error);
      }
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

  return (
    <div className="relative">
      <Camera ref={videoRef} width={800} height={480} />
      {detectionResult?.detection && (
        <div
          style={{
            position: 'absolute',
            top: detectionResult.detection.box.y,
            left: detectionResult.detection.box.x,
            width: detectionResult.detection.box.width,
            height: detectionResult.detection.box.height,
            border: '2px solid #ef4444',
            borderRadius: 12,
            boxShadow:
              '0 0 0 2px rgba(239, 68, 68, 0.25), 0 10px 30px rgba(0, 0, 0, 0.35)',
            pointerEvents: 'none',
          }}
        ></div>
      )}
    </div>
  );
};

export default DetectFace;
