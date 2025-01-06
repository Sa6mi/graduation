import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

// Add Firefox detection
const isFirefox = navigator.userAgent.toLowerCase().indexOf('firefox') > -1;

if (isFirefox) {
  // Pre-warm WebGL context for Firefox
  const canvas = document.createElement('canvas');
  const gl = canvas.getContext('webgl2');
  if (gl) {
    gl.getExtension('EXT_texture_filter_anisotropic');
    gl.getExtension('OES_texture_float');
    gl.getExtension('WEBGL_compressed_texture_s3tc');
  }
}

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);