import React from 'react';
import styles from './Hero.module.css';

export default function Hero({ onCtaClick }) {
  return (
    <section className={styles.hero} id="home">

      {/* Background glow orbs */}
      <div className={styles.orb1} aria-hidden="true" />
      <div className={styles.orb2} aria-hidden="true" />

      {/* Tag pill */}
      <div className={styles.pill}>
        <span className={styles.pillDot} />
        <span>Powered by TensorFlow + Keras</span>
      </div>

      {/* Headline */}
      <h1 className={styles.heading}>
        <span className={styles.headingLight}>Identify any</span>
        <em className={styles.headingAccent}> Cat or Dog </em>
        <span className={styles.headingLight}>instantly.</span>
      </h1>

      {/* Subtext */}
      <p className={styles.sub}>
        A deep learning classifier trained on 25,000 images.<br />
        Upload a photo and get a prediction with confidence in seconds.
      </p>

      {/* CTA buttons */}
      <div className={styles.actions}>
        <button className={styles.ctaPrimary} onClick={onCtaClick}>
          <UploadIcon />
          Try it now
        </button>
        <a href="#about" className={styles.ctaSecondary}>
          How it works
          <ArrowIcon />
        </a>
      </div>

      {/* Stat bar */}
      <div className={styles.stats}>
        <div className={styles.stat}>
          <span className={styles.statVal}>95.4%</span>
          <span className={styles.statLabel}>Accuracy</span>
        </div>
        <div className={styles.statDivider} />
        <div className={styles.stat}>
          <span className={styles.statVal}>25K</span>
          <span className={styles.statLabel}>Training images</span>
        </div>
        <div className={styles.statDivider} />
        <div className={styles.stat}>
          <span className={styles.statVal}>&lt;1s</span>
          <span className={styles.statLabel}>Inference time</span>
        </div>
      </div>

      {/* Floating pet icons */}
      <div className={styles.floatWrap} aria-hidden="true">
        {['🐱','🐶','🐾','🐱','🐶'].map((e, i) => (
          <span key={i} className={styles.floatIcon} style={{ '--i': i }}>{e}</span>
        ))}
      </div>
    </section>
  );
}

function UploadIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
      <polyline points="17 8 12 3 7 8"/>
      <line x1="12" y1="3" x2="12" y2="15"/>
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="5" y1="12" x2="19" y2="12"/>
      <polyline points="12 5 19 12 12 19"/>
    </svg>
  );
}
