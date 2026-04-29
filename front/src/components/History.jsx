import React from 'react';
import styles from './History.module.css';
import { Cat, Dog } from "lucide-react";

export default function History({ history, onClear }) {
  if (history.length === 0) return null;

  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <h3 className={styles.title}>Recent predictions</h3>
          <span className={styles.count}>{history.length}</span>
        </div>
        <button className={styles.clearBtn} onClick={onClear} title="Clear history">
          <TrashIcon />
          Clear
        </button>
      </div>

      <div className={styles.grid}>
        {history.map((item, i) => {
          const isCat = item.prediction.toLowerCase() === 'cat';
          const pct = Math.round(item.confidence * 100);
          return (
            <div
              key={item.id}
              className={`${styles.card} ${isCat ? styles.cardCat : styles.cardDog}`}
              style={{ animationDelay: `${i * 40}ms` }}
            >
              <div className={styles.cardImg}>
                <img src={item.previewUrl} alt={item.prediction} />
              </div>
              <div className={styles.cardBody}>
                <div className={styles.cardPrediction}>
                  <span className={styles.cardEmoji}>{isCat ? <Cat size={18} /> : <Dog size={18} />}</span>
                  <span className={`${styles.cardLabel} ${isCat ? styles.catLabel : styles.dogLabel}`}>
                    {item.prediction}
                  </span>
                </div>
                <div className={styles.cardMeta}>
                  <span className={styles.cardConf}>{pct}%</span>
                  <span className={styles.cardTime}>{item.timestamp}</span>
                </div>
                {/* Mini bar */}
                <div className={styles.miniBar}>
                  <div
                    className={`${styles.miniBarFill} ${isCat ? styles.barCat : styles.barDog}`}
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

function TrashIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14H6L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4h6v2"/>
    </svg>
  );
}
