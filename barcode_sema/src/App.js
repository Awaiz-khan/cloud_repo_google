import React from 'react';
import BarcodeScanner from "./pages/Scanner/BarcodeScanner.js"

function App() {
  const handleBarcodeDetected = (result) => {
    console.log('Barcode detected:', result);
  };
   return (
    <>
    <BarcodeScanner onBarcodeDetected={handleBarcodeDetected} />
    </>
  );
}

export default App;
