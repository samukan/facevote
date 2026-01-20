import { RefObject, useEffect, useState } from 'react';
import * as faceapi from 'face-api.js';

type DetectionResult = faceapi.WithFaceDescriptor<
  faceapi.WithFaceLandmarks<
    {
      detection: faceapi.FaceDetection;
    },
    faceapi.FaceLandmarks68
  >
>;

const useFaceDetection = () => {
  const [detectionResult, setDetectionResult] =
    useState<DetectionResult | null>(null);

  // Detect face from video frames
  const getDescriptors = async (videoRef: RefObject<HTMLVideoElement>) => {
    if (videoRef.current) {
      try {
        if (!videoRef.current) {
          return;
        }
        const result = await faceapi
          .detectSingleFace(
            videoRef.current,
            new faceapi.TinyFaceDetectorOptions(),
          )
          .withFaceLandmarks(true)
          .withFaceDescriptor();

        if (!result) {
          console.error('No face detected');
          return;
        }

        console.log('result', result);

        setDetectionResult(result); // Update detection state

        return result;
      } catch (error) {
        console.error(error);
      }
    }
  };

  useEffect(() => {
    // Load the face detection models
    const loadModels = async () => {
      try {
        await faceapi.nets.tinyFaceDetector.loadFromUri('/models');
        await faceapi.nets.faceLandmark68TinyNet.loadFromUri('/models');
        await faceapi.nets.faceRecognitionNet.loadFromUri('/models');
        console.log('Models loaded');
      } catch (error) {
        console.error('Error loading models:', error);
      }
    };

    loadModels();
  }, []);

  return { detectionResult, getDescriptors };
};

export { useFaceDetection };
