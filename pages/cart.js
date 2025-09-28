// Shopping Cart Page
// Shows items in cart, lets you change quantity or remove. I used Bootstrap table for layout.
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

export default function Cart({ showToast }) {
  const [cart, setCart] = useState([]);
  const [quantities, setQuantities] = useState({});
  const router = useRouter();

  // Get cart from localStorage
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('cart') || '[]');
    setCart(stored);
    const qtys = {};
    stored.forEach(item => {
      qtys[item.id] = qtys[item.id] ? qtys[item.id] + 1 : 1;
    });
    setQuantities(qtys);
  }, []);

  // Change quantity for a cart item
  const updateQuantity = (id, qty) => {
    setQuantities(q => ({ ...q, [id]: qty }));
  };

  // Remove item from cart
  const removeItem = (id) => {
    const newCart = cart.filter(item => item.id !== id);
    setCart(newCart);
    localStorage.setItem('cart', JSON.stringify(newCart));
    showToast('Item removed from cart', 'error');
    window.dispatchEvent(new Event('storage'));
    const newQuantities = { ...quantities };
    delete newQuantities[id];
    setQuantities(newQuantities);
  };

  // Calculate total price
  const getTotal = () => {
    return cart.reduce((sum, item) => {
      const price = item.discountedPrice || item.price;
      return sum + price * (quantities[item.id] || 1);
    }, 0);
  };

  // Checkout: clear cart and go to success page
  const handleCheckout = () => {
    localStorage.removeItem('cart');
    showToast('Checkout successful!', 'success');
    window.dispatchEvent(new Event('storage'));
    router.push('/checkout-success');
  };

  if (cart.length === 0) {
    return (
      <main className="bg-dark min-vh-100 text-light">
        <div className="container py-8">
          <h1 className="h2 fw-bold mb-4 text-primary">Shopping Cart</h1>
          <p>Your cart is empty.</p>
        </div>
      </main>
    );
  }

  // Group items by id for quantity
  const grouped = {};
  cart.forEach(item => {
    if (!grouped[item.id]) grouped[item.id] = { ...item, quantity: 0 };
    grouped[item.id].quantity += 1;
  });

  return (
    <main className="bg-dark min-vh-100 text-light">
      <div className="container py-5">
        <h1 className="h2 fw-bold mb-4 text-primary">Shopping Cart</h1>
        <div className="table-responsive mb-4">
          <table className="table align-middle table-bordered bg-secondary bg-opacity-75 text-light shadow-sm">
            <thead className="table-light">
              <tr>
                <th scope="col">Image</th>
                <th scope="col">Product</th>
                <th scope="col">Price</th>
                <th scope="col">Quantity</th>
                <th scope="col">Remove</th>
              </tr>
            </thead>
            <tbody>
              {Object.values(grouped).map(item => (
                <tr key={item.id}>
                  <td>
                    <img src={item.image || item.imageUrl || '/placeholder.png'} alt={item.title} className="rounded-3 border shadow-sm" style={{ width: '60px', height: '60px', objectFit: 'cover', background: '#e3f0ff' }} />
                  </td>
                  <td className="fw-semibold text-dark">{item.title}</td>
                  <td className="fw-bold text-primary">${item.discountedPrice || item.price}</td>
                  <td>
                    <input
                      type="number"
                      min="1"
                      value={quantities[item.id] || item.quantity}
                      onChange={e => updateQuantity(item.id, Number(e.target.value))}
                      className="form-control w-auto d-inline-block text-center"
                      style={{ maxWidth: '70px' }}
                    />
                  </td>
                  <td>
                    <button onClick={() => removeItem(item.id)} className="btn btn-outline-danger btn-sm px-3 py-1 fw-bold">
                      <i className="bi bi-trash me-1"></i>Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="text-end mb-4 fs-5 fw-bold text-success">Total: ${getTotal().toFixed(2)}</div>
        <div className="d-flex justify-content-end">
          <button onClick={handleCheckout} className="btn btn-lg btn-success px-5 py-2 fw-bold shadow">
            <i className="bi bi-bag-check me-2"></i>Checkout
          </button>
        </div>
      </div>
    </main>
  );
}
