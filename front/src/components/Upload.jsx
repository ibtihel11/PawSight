import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import styles from './Upload.module.css';

export default function Upload({ onImageSelect, error, selectedImage, isLoading }) {
  const [dragActive, setDragActive] = useState(false);

  const onDrop = useCallback((accepted) => {
    if (accepted.length > 0) {
      onImageSelect(accepted[0]);
    }
  }, [onImageSelect]);

  const { getRootProps, getInputProps, isDragAccept, isDragReject } = useDropzone({
    onDrop,
    accept: { 'image/*': ['.jpg', '.jpeg', '.png', '.webp', '.gif'] },
    maxFiles: 1,
    maxSize: 10 * 1024 * 1024, // 10MB
    onDragEnter: () => setDragActive(true),
    onDragLeave: () => setDragActive(false),
    onDropAccepted: () => setDragActive(false),
    onDropRejected: () => setDragActive(false),
  });

  const zoneClass = [
    styles.dropZone,
    isDragAccept ? styles.accept : '',
    isDragReject ? styles.reject : '',
    dragActive ? styles.active : '',
  ].filter(Boolean).join(' ');

  return (
    <div className={styles.wrap}>
      {/* Section header */}
      <div className={styles.header}>
        <div className={styles.headerIcon}>
          <UploadCloudIcon />
        </div>
        <div>
          <h2 className={styles.title}>Upload an image</h2>
          <p className={styles.subtitle}>Drop a photo of any cat or dog and let the model decide</p>
        </div>
      </div>

      {/* Drop zone */}
      <div {...getRootProps()} className={zoneClass}>
        <input {...getInputProps()} aria-label="Upload image" />

        {selectedImage ? (
          /* ── Preview state ── */
          <div className={styles.previewWrap}>
            <img
              src={URL.createObjectURL(selectedImage)}
              alt="Selected"
              className={styles.previewImg}
            />
            <div className={styles.previewOverlay}>
              <span className={styles.previewHint}>
                <RefreshIcon /> Click or drop to change
              </span>
            </div>
            <div className={styles.previewInfo}>
              <FileIcon />
              <span>{selectedImage.name}</span>
              <span className={styles.previewSize}>{(selectedImage.size / 1024).toFixed(0)} KB</span>
            </div>
          </div>
        ) : (
          /* ── Empty state ── */
          <div className={styles.emptyState}>
            <div className={styles.uploadIconWrap}>
              <UploadCloudIcon size={28} />
            </div>
            <p className={styles.emptyTitle}>
              {isDragReject ? 'Invalid file type' : 'Drop your image here'}
            </p>
            <p className={styles.emptyHint}>
              or <span className={styles.browseLink}>browse files</span>
            </p>
            <div className={styles.filetypes}>
              {['JPG', 'PNG', 'WEBP', 'GIF'].map(t => (
                <span key={t} className={styles.filetag}>{t}</span>
              ))}
              <span className={styles.filetag}>max 10 MB</span>
            </div>
          </div>
        )}
      </div>

      {/* Error message */}
      {error && (
        <div className={styles.error} role="alert">
          <AlertIcon />
          {error}
        </div>
      )}
    </div>
  );
}

function UploadCloudIcon({ size = 20 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="16 16 12 12 8 16"/>
      <line x1="12" y1="12" x2="12" y2="21"/>
      <path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3"/>
    </svg>
  );
}

function RefreshIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="23 4 23 10 17 10"/><polyline points="1 20 1 14 7 14"/>
      <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/>
    </svg>
  );
}

function FileIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"/>
      <polyline points="13 2 13 9 20 9"/>
    </svg>
  );
}

function AlertIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
    </svg>
  );
}
