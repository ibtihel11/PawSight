import React, { useEffect, useState } from 'react';
import styles from './Result.module.css';
import { Brain, Cat, Dog } from "lucide-react";

export default function Result({ result, isLoading, onReset }) {
  const [barWidth, setBarWidth] = useState(0);

  /* Animate confidence bar after mount */
  useEffect(() => {
    if (result) {
      const t = setTimeout(() => setBarWidth(result.confidence * 100), 80);
      return () => clearTimeout(t);
    } else {
      setBarWidth(0);
    }
  }, [result]);

  const isCat = result?.prediction?.toLowerCase() === 'cat';
  const confidencePct = result ? Math.round(result.confidence * 100) : 0;
  const confidenceLabel =
    confidencePct >= 90 ? 'Very high confidence' :
    confidencePct >= 75 ? 'High confidence' :
    confidencePct >= 55 ? 'Moderate confidence' : 'Low confidence';

  return (
    <div className={styles.wrap}>
      {/* Section header */}
      <div className={styles.header}>
        <div className={`${styles.headerIcon} ${result ? (isCat ? styles.iconCat : styles.iconDog) : ''}`}>
          <SparkleIcon />
        </div>
        <div>
          <h2 className={styles.title}>Prediction</h2>
          <p className={styles.subtitle}>Model output and confidence score</p>
        </div>
      </div>

      {/* Result panel */}
      <div className={styles.panel}>
        {/* Loading state */}
        {isLoading && (
          <div className={styles.loadingState}>
            <div className={styles.spinner}>
              <div className={styles.spinnerRing} />
              <span className={styles.spinnerEmoji}><Brain size={20} /></span>
            </div>
            <p className={styles.loadingTitle}>Analyzing image...</p>
            <p className={styles.loadingHint}>Running inference through the neural network</p>
            <div className={styles.loadingBar}>
              <div className={styles.loadingBarFill} />
            </div>
          </div>
        )}

        {/* Empty state */}
        {!isLoading && !result && (
          <div className={styles.emptyState}>
            <div className={styles.emptyIconWrap}>
              <WaitIcon />
            </div>
            <p className={styles.emptyTitle}>Awaiting image</p>
            <p className={styles.emptyHint}>Upload a photo and click Predict to see results</p>
          </div>
        )}

        {/* Result state */}
        {!isLoading && result && (
          <div className={styles.resultContent}>
            {/* Big prediction */}
            <div className={styles.predictionRow}>
              <div className={`${styles.animalBadge} ${isCat ? styles.catBadge : styles.dogBadge}`}>
                <span className={styles.animalEmoji}>
                  {isCat ? <Cat size={18} /> : <Dog size={18} />}
                </span>
              </div>
              <div className={styles.predictionText}>
                <div className={`${styles.predictionLabel} ${isCat ? styles.catLabel : styles.dogLabel}`}>
                  {result.prediction}
                </div>
                <div className={styles.predictionSub}>Detected with {confidencePct}% confidence</div>
              </div>
            </div>

            {/* Confidence bar */}
            <div className={styles.confidenceSection}>
              <div className={styles.confidenceHeader}>
                <span className={styles.confidenceTitle}>Confidence score</span>
                <span className={`${styles.confidencePct} ${isCat ? styles.catPct : styles.dogPct}`}>
                  {confidencePct}%
                </span>
              </div>
              <div className={styles.barTrack}>
                <div
                  className={`${styles.barFill} ${isCat ? styles.barCat : styles.barDog}`}
                  style={{ width: `${barWidth}%` }}
                />
              </div>
              <div className={styles.confidenceFooter}>
                <span className={styles.confidenceLow}>0%</span>
                <span className={styles.confidenceLabel}>{confidenceLabel}</span>
                <span className={styles.confidenceHigh}>100%</span>
              </div>
            </div>

            {/* Both probabilities */}
            <div className={styles.probGrid}>
              <div className={`${styles.probCard} ${isCat ? styles.probActive : ''}`}>
                <span className={styles.probEmoji}>
                  <Cat size={18} />
                </span>
                <span className={styles.probName}>Cat</span>
                <span className={`${styles.probVal} ${styles.catPct}`}>
                  {isCat ? confidencePct : 100 - confidencePct}%
                </span>
              </div>
              <div className={`${styles.probCard} ${!isCat ? styles.probActive : ''}`}>
                <span className={styles.probEmoji}>
                  <Dog size={18} />
                </span>
                <span className={styles.probName}>Dog</span>
                <span className={`${styles.probVal} ${styles.dogPct}`}>
                  {!isCat ? confidencePct : 100 - confidencePct}%
                </span>
              </div>
            </div>

            {/* Reset button */}
            <button className={styles.resetBtn} onClick={onReset}>
              <RefreshIcon />
              Try another image
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function SparkleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2z"/>
    </svg>
  );
}

function WaitIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
    </svg>
  );
}

function RefreshIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="1 4 1 10 7 10"/>
      <path d="M3.51 15a9 9 0 1 0 .49-3"/>
    </svg>
  );
}
