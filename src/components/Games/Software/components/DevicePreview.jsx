import React, { useMemo } from 'react';
import styles from './DevicePreview.module.css';

function buildDoc(htmlContent, cssContent, zoom) {
  const inv = (100 / zoom).toFixed(4);
  return `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Preview</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }

    html, body {
      width: 100%;
      height: 100%;
      overflow: hidden;
    }

    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      background: white;
      position: relative;
    }

    .scale-stage {
      position: absolute;
      top: 0;
      left: 0;
      width: ${inv}%;
      height: ${inv}%;
      transform: scale(${zoom});
      transform-origin: 0 0;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 14px;
    }

    .container {
      width: 100%;
      max-width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
    }

    ${cssContent}
  </style>
</head>
<body>
  <div class="scale-stage">
    <div class="container">
      ${htmlContent}
    </div>
  </div>
</body>
</html>`;
}

export function DevicePreview({
  css,
  html,
  deviceType,
  expectedResult,
  showExpected
}) {
  const isCompact = showExpected && !!expectedResult;
  const zoom = isCompact
    ? (deviceType === 'web' ? 0.55 : 0.7)
    : 1;

  const currentDoc = useMemo(
    () => buildDoc(html || '', css || '', zoom),
    [html, css, zoom]
  );

  const expectedDoc = useMemo(
    () => (showExpected && expectedResult
      ? buildDoc(html || '', expectedResult.css || '', zoom)
      : ''),
    [html, expectedResult, showExpected, zoom]
  );

  return (
    <div className={styles.devicePreview}>
      <div className={styles.header}>
        <h3 className={styles.title}>
          {deviceType === 'web' ? '🖥️ Vista Web' : '📱 Vista Móvil'}
        </h3>
        {showExpected && expectedResult && (
          <span className={styles.comparison}>
            Resultado vs Esperado
          </span>
        )}
      </div>

      <div
        className={`${styles.previewContainer} ${
          showExpected && expectedResult ? styles.comparison : ''
        } ${deviceType === 'mobile' ? styles.mobileMode : styles.webMode}`}
      >
        <div className={styles.previewWrapper}>
          <div className={styles.previewLabel}>Tu resultado</div>
          <div className={`${styles.deviceFrame} ${styles[deviceType]}`}>
            <div className={styles.deviceScreen}>
              <iframe
                key={`current-${deviceType}-${isCompact}`}
                srcDoc={currentDoc}
                className={styles.previewFrame}
                title="Vista previa actual"
                sandbox="allow-same-origin"
                scrolling="no"
              />
            </div>
            {deviceType === 'mobile' && (
              <div className={styles.deviceControls}>
                <div className={styles.homeButton}></div>
              </div>
            )}
          </div>
        </div>

        {showExpected && expectedResult && (
          <div className={styles.previewWrapper}>
            <div className={styles.previewLabel}>Resultado esperado</div>
            <div className={`${styles.deviceFrame} ${styles[deviceType]} ${styles.expected}`}>
              <div className={styles.deviceScreen}>
                <iframe
                  key={`expected-${deviceType}-${isCompact}`}
                  srcDoc={expectedDoc}
                  className={styles.previewFrame}
                  title="Vista previa esperada"
                  sandbox="allow-same-origin"
                  scrolling="no"
                />
              </div>
              {deviceType === 'mobile' && (
                <div className={styles.deviceControls}>
                  <div className={styles.homeButton}></div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {expectedResult?.description && (
        <div className={styles.objectiveDescription}>
          <div className={styles.objectiveHeader}>
            <span className={styles.objectiveIcon}>🎯</span>
            <span className={styles.objectiveTitle}>Objetivo:</span>
          </div>
          <p className={styles.objectiveText}>
            {expectedResult.description}
          </p>
        </div>
      )}
    </div>
  );
}
