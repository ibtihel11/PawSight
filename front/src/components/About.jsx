import React from 'react';
import styles from './About.module.css';
  
export default function About() {
  const steps = [
    {
      num: '01',
      icon: '',
      title: 'Image ingestion',
      desc: 'Your image is resized to 224×224px and normalized to match ImageNet preprocessing used during training.',
    },
    {
      num: '02',
      icon: '',
      title: 'Feature extraction',
      desc: 'Pre-trained on 1.2M images, extracts deep visual features from convolutional layers.',
    },
    {
      num: '03',
      icon: '',
      title: 'Classification',
      desc: 'A fine-tuned sigmoid output layer collapses features to a single probability: cat or dog.',
    },
    {
      num: '04',
      icon: '',
      title: 'Confidence score',
      desc: 'The raw sigmoid output is your confidence. Values near 0.5 indicate an ambiguous result.',
    },
  ];

  const tech = [
    { name: 'TensorFlow 2.x', tag: 'ML framework' },
    { name: 'Keras', tag: 'Model API' },
    { name: 'Flask', tag: 'Backend API' },
    { name: 'React 18', tag: 'Frontend' },
    { name: 'Kaggle Dataset', tag: '25,000 images' },
  ];

  return (
    <section className={styles.section} id="about">
      <div className={styles.container}>

        {/* Header */}
        <div className={styles.header}>
          <span className={styles.headerTag}>Under the hood</span>
          <h2 className={styles.heading}>How it works</h2>
          <p className={styles.subheading}>
            A transfer-learning pipeline that repurposes ImageNet knowledge<br />
            to solve binary pet classification with 95%+ accuracy.
          </p>
        </div>

        {/* Steps */}
        <div className={styles.steps}>
          {steps.map((s, i) => (
            <div key={i} className={styles.step}>
              <div className={styles.stepLeft}>
                <span className={styles.stepNum}>{s.num}</span>
                {i < steps.length - 1 && <div className={styles.stepLine} />}
              </div>
              <div className={styles.stepBody}>
                <div className={styles.stepIcon}>{s.icon}</div>
                <div>
                  <h3 className={styles.stepTitle}>{s.title}</h3>
                  <p className={styles.stepDesc}>{s.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Tech stack */}
        <div className={styles.techWrap}>
          <p className={styles.techHeader}>Built with</p>
          <div className={styles.techGrid}>
            {tech.map((t, i) => (
              <div key={i} className={styles.techCard}>
                <span className={styles.techName}>{t.name}</span>
                <span className={styles.techTag}>{t.tag}</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
