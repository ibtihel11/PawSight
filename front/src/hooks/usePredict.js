import { useState, useCallback } from 'react';

/* ─── usePredict ─────────────────────────────────────────────────────────── */
/**
 * Hook that manages prediction state and communicates with the Flask backend.
 *
 * Backend contract:
 *   POST /predict
 *   Body: FormData { image: File }
 *   Response: { prediction: "Cat" | "Dog", confidence: 0.0–1.0 }
 */
export function usePredict() {
  const [result, setResult]     = useState(null);
  const [isLoading, setLoading] = useState(false);
  const [error, setError]       = useState(null);

  const predict = useCallback(async (imageFile) => {
    if (!imageFile) {
      setError('Please select an image first.');
      return;
    }

    setLoading(true);
    setResult(null);
    setError(null);

    /* Build multipart form */
    const formData = new FormData();
    formData.append('image', imageFile);

    try {
      const response = await fetch('http://127.0.0.1:5000/predict', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const msg = await response.text();
        throw new Error(msg || `Server error: ${response.status}`);
      }

      const data = await response.json();

      /* Validate shape */
      if (!data.prediction || data.confidence === undefined) {
        throw new Error('Unexpected response format from server.');
      }

      setResult({
        prediction: data.prediction,
        confidence: data.confidence,
      });

    } catch (err) {
      console.error('[usePredict]', err);
      setError(err.message || 'Something went wrong. Is the Flask server running?');
    } finally {
      setLoading(false);
    }
  }, []);

  const reset = useCallback(() => {
    setResult(null);
    setError(null);
    setLoading(false);
  }, []);

  return { result, isLoading, error, predict, reset };
}
