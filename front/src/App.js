import React, { useRef, useState, useCallback } from 'react';
import './styles/globals.css';
import styles from './App.module.css';

import Navbar   from './components/Navbar';
import Hero     from './components/Hero';
import Upload   from './components/Upload';
import Result   from './components/Result';
import History  from './components/History';
import About    from './components/About';
import { usePredict } from './hooks/usePredict';
import { PawPrint, Heart } from "lucide-react";

export default function App() {
  const demoRef = useRef(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const { result, isLoading, error, predict, reset } = usePredict();
  const [history, setHistory] = useState([]);
  const [uploadError, setUploadError] = useState(null);

  const scrollToDemo = () => {
    demoRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleImageSelect = useCallback((file) => {
    setSelectedImage(file);
    setUploadError(null);
    reset();
  }, [reset]);

  const handlePredict = async () => {
    if (!selectedImage) {
      setUploadError('Please select an image before predicting.');
      return;
    }
    setUploadError(null);

    await predict(selectedImage);

    setHistory(prev => {
      if (!result && !isLoading) return prev;
      return prev;
    });
  };

  React.useEffect(() => {
    if (result && selectedImage) {
      const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      const previewUrl = URL.createObjectURL(selectedImage);
      setHistory(prev => [
        { id: Date.now(), ...result, previewUrl, timestamp },
        ...prev.slice(0, 11),
      ]);
    }
  }, [result]);

  const handleReset = () => {
    setSelectedImage(null);
    setUploadError(null);
    reset();
  };

  return (
    <div className={styles.app}>
      <Navbar />

      {/* ── Hero ── */}
      <Hero onCtaClick={scrollToDemo} />

      {/* ── Demo section ── */}
      <section className={styles.demo} id="demo" ref={demoRef}>
        <div className={styles.demoInner}>

          {/* Section label */}
          <div className={styles.demoLabel}>
            <span className={styles.labelDot} />
            <span>Live demo</span>
          </div>

          {/* Two-column grid: Upload | Result */}
          <div className={styles.demoGrid}>

            {/* Left: upload + predict button */}
            <div className={styles.demoLeft}>
              <Upload
                onImageSelect={handleImageSelect}
                error={uploadError || error}
                selectedImage={selectedImage}
                isLoading={isLoading}
              />

              <button
                className={styles.predictBtn}
                onClick={handlePredict}
                disabled={isLoading || !selectedImage}
              >
                {isLoading ? (
                  <>
                    <SpinIcon />
                    Analyzing...
                  </>
                ) : (
                  <>
                    <BrainIcon />
                    Run prediction
                  </>
                )}
              </button>
            </div>

            {/* Right: result panel */}
            <div className={styles.demoRight}>
              <Result
                result={result}
                isLoading={isLoading}
                onReset={handleReset}
              />
            </div>
          </div>

          {/* History */}
          <History
            history={history}
            onClear={() => setHistory([])}
          />
        </div>
      </section>

      {/* About section */}
      <About />

      {/* Footer */}
      <footer className={styles.footer}>
        <span className={styles.footerLogo}><PawPrint size={18} /> PawSight</span>
        <span className={styles.footerMeta}>Built by Ibtihel with <Heart size={18} /> </span>
        <span className={styles.footerYear}>© {new Date().getFullYear()}</span>
      </footer>
    </div>
  );
}

/*Icons*/
function BrainIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96-.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 4.44-1.66z"/>
      <path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96-.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-4.44-1.66z"/>
    </svg>
  );
}

function SpinIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <path d="M21 12a9 9 0 1 1-6.219-8.56" style={{ animation: 'spin 0.8s linear infinite', transformOrigin: 'center', display: 'block' }}/>
    </svg>
  );
}
