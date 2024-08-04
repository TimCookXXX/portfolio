/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useCallback } from "react";
import styles from "./intro.module.css";

const Intro: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const [showPreview, setShowPreview] = useState(false);
  const [displayedText, setDisplayedText] = useState("");
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isZooming, setIsZooming] = useState(false);

  const steps = [
    "C:\\>_",
    "C:\\>LOAD PORTFOLIO.EXE",
    "Loading components...",
    "Initializing Miami Vice mode...",
    "Preparing to launch...",
    "Welcome to Tim's Rad Portfolio!",
  ];

  useEffect(() => {
    const hasSeenPreview = sessionStorage.getItem("hasSeenPreview");
    if (!hasSeenPreview) {
      setShowPreview(true);
      sessionStorage.setItem("hasSeenPreview", "true");
    } else {
      onComplete();
    }
  }, [onComplete]);

  const typeNextChar = useCallback(() => {
    if (currentStepIndex < steps.length) {
      const currentStep = steps[currentStepIndex];
      if (currentCharIndex < currentStep.length) {
        setDisplayedText((prev) => prev + currentStep[currentCharIndex]);
        setCurrentCharIndex((prev) => prev + 1);
      } else {
        setDisplayedText((prev) => prev + "\n");
        setCurrentStepIndex((prev) => prev + 1);
        setCurrentCharIndex(0);
      }
    } else {
      setIsLoading(true);
      setTimeout(() => {
        setIsZooming(true);
        setTimeout(() => {
          setShowPreview(false);
          onComplete();
        }, 2000);
      }, 2000);
    }
  }, [currentStepIndex, currentCharIndex, steps, onComplete]);

  useEffect(() => {
    if (showPreview) {
      const timer = setTimeout(typeNextChar, Math.random() * 80 + 40);
      return () => clearTimeout(timer);
    }
  }, [showPreview, typeNextChar]);

  if (!showPreview) return null;

  return (
    <div className={`${styles.overlay} ${isZooming ? styles.zoomIn : ""}`}>
      <div className={`${styles.frame} ${isZooming ? styles.frameZoom : ""}`}>
        <div
          className={`${styles.screen} ${isZooming ? styles.screenZoom : ""}`}
        >
          <div className={styles.scanline}></div>
          <div className={styles.content}>
            {displayedText.split("\n").map((line, index) => (
              <p key={index} className={styles.line}>
                {line}
              </p>
            ))}
            {isLoading && <div className={styles.loader}>Loading...</div>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Intro;
