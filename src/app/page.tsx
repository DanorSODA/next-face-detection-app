"use client";

import React, { useEffect, useRef, useState } from "react";
import * as faceapi from "face-api.js";
import styles from "./page.module.css";

export default function Home() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    // Set isClient to true after the component is mounted
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return;

    const startVideo = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: {} });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (error) {
        console.error("Error accessing webcam: ", error);
      }
    };

    const loadModels = async () => {
      const MODEL_URL = "/models";
      await faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL);
      await faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL);
      await faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL);
      await faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL);
    };

    const detectFaces = async () => {
      if (!videoRef.current || !canvasRef.current) return;

      const video = videoRef.current;
      const canvas = canvasRef.current;

      // Ensure video metadata is loaded before setting dimensions
      if (video.readyState !== 4) {
        video.addEventListener("loadedmetadata", () => {
          initializeCanvasAndDetection(video, canvas);
        });
      } else {
        initializeCanvasAndDetection(video, canvas);
      }
    };

    const initializeCanvasAndDetection = (
      video: HTMLVideoElement,
      canvas: HTMLCanvasElement
    ) => {
      const displaySize = {
        width: video.videoWidth,
        height: video.videoHeight,
      };

      // Set canvas dimensions to match video dimensions
      canvas.width = displaySize.width;
      canvas.height = displaySize.height;

      faceapi.matchDimensions(canvas, displaySize);

      setInterval(async () => {
        if (video.readyState === 4) {
          const detections = await faceapi
            .detectAllFaces(video, new faceapi.TinyFaceDetectorOptions())
            .withFaceLandmarks()
            .withFaceExpressions();

          const resizedDetections = faceapi.resizeResults(
            detections,
            displaySize
          );

          // Clear the canvas before drawing new detections
          const context = canvas.getContext("2d");
          if (context) {
            context.clearRect(0, 0, canvas.width, canvas.height);
            faceapi.draw.drawDetections(canvas, resizedDetections);
            faceapi.draw.drawFaceLandmarks(canvas, resizedDetections);
            faceapi.draw.drawFaceExpressions(canvas, resizedDetections);
          }
        }
      }, 100);
    };

    const setup = async () => {
      await loadModels();
      await startVideo();
      detectFaces();
    };

    setup();
  }, [isClient]);

  if (!isClient) {
    // Optionally render a loading state or empty div during SSR
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>AI Face Detection</h1>
      <div className={styles.videoWrapper}>
        <video ref={videoRef} autoPlay muted className={styles.video} />
        <canvas ref={canvasRef} className={styles.canvas} />
      </div>
    </div>
  );
}
