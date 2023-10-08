import React, { useEffect, useState } from 'react';
import Quagga from 'quagga';
import './BarcodeScanner.css';

function BarcodeScanner({ onBarcodeDetected }) {
  const [scannedBarcode, setScannedBarcode] = useState(null);

  useEffect(() => {
    const getCameraConstraints = () => {
      // For mobile devices, make the camera scanner full width of the viewport
      if (window.innerWidth <= 767) {
        return {
          width: window.innerWidth, // Full width
          height: 480, // Adjust to your desired height
          facingMode: 'environment', // Use 'user' for the front camera
        };
      } else {
        // Default camera size for larger screens
        return {
          width: 640,
          height: 480,
          facingMode: 'environment', // Use 'user' for the front camera
        };
      }
    };

    const initializeQuagga = () => {
      const { width, height, facingMode } = getCameraConstraints();

      Quagga.init(
        {
          inputStream: {
            name: 'Live',
            type: 'LiveStream',
            target: document.querySelector('#barcode-scanner'),
            constraints: {
              width,
              height,
              facingMode,
            },
          },
          decoder: {
            readers: ['ean_reader'], // You can add more barcode types if needed
          },
        },
        (err) => {
          if (err) {
            console.error('Error initializing Quagga:', err);
            return;
          }
          Quagga.start();
        }
      );

      Quagga.onDetected(onBarcodeDetectedHandler);
    };

    const onBarcodeDetectedHandler = (result) => {
      setScannedBarcode(result.codeResult.code);
      onBarcodeDetected(result.codeResult.code);
    };

    initializeQuagga();

    return () => {
      Quagga.stop();
      Quagga.offDetected(onBarcodeDetectedHandler);
    };
  }, [onBarcodeDetected]);

  return (
    <div>
      <div id="barcode-scanner"></div>
      <div>
        <strong>Scanned Barcode:</strong> {scannedBarcode || 'No barcode scanned'}
      </div>
    </div>
  );
}

export default BarcodeScanner;
