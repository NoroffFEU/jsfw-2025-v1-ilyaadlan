
// Checkout Success Page
// Displays confirmation and clears cart
import { useEffect } from 'react';

export default function CheckoutSuccess({ showToast }) {
  useEffect(() => {
    localStorage.removeItem('cart');
    window.dispatchEvent(new Event('storage'));
    showToast('Checkout complete!', 'success');
  }, [showToast]);

  return (
    <main className="min-h-screen bg-white">
      <div className="container mx-auto py-8 text-center">
        <h1 className="text-2xl font-bold mb-4">Checkout Successful!</h1>
        <p className="mb-4">Thank you for your purchase. Your order has been placed.</p>
      </div>
    </main>
  );
}
