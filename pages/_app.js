import '../styles/globals.css';
import Header from '../components/Header';
import { useState } from 'react';
import Toast from '../components/Toast';

export default function App({ Component, pageProps }) {
  const [toast, setToast] = useState(null);
  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  // Provide showToast via pageProps for all pages
  return (
    <>
      <Header />
      {toast && <Toast message={toast.message} type={toast.type} />}
      <Component {...pageProps} showToast={showToast} />
    </>
  );
}
