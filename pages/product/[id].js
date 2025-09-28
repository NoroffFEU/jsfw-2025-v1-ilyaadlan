// Product Details Page
// Shows info for one product. I used Bootstrap grid for layout.
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { fetchProduct } from '../../services/api';

export default function ProductDetails({ showToast }) {
  const router = useRouter();
  const { id } = router.query;
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAdded, setShowAdded] = useState(false);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    fetchProduct(id)
      .then(setProduct)
      .catch(() => setError('Could not load product. Try again.'))
      .finally(() => setLoading(false));
  }, [id]);

  const addToCart = () => {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    localStorage.setItem('cart', JSON.stringify([...cart, product]));
    setShowAdded(true);
    setTimeout(() => setShowAdded(false), 2000);
    if (showToast) showToast('Added to cart!', 'success');
    window.dispatchEvent(new Event('storage'));
  };

  if (loading) {
    return <div className="container mx-auto py-12 text-center text-blue-700 text-xl">Loading...</div>;
  }
  if (error) {
    return (
      <div className="container mx-auto py-12 text-blue-900 text-center">
        <p className="mb-4 text-lg">{error}</p>
        <button onClick={() => window.location.reload()} className="mt-4 px-4 py-2 bg-gradient-to-r from-blue-700 to-blue-400 text-white rounded shadow">Reload</button>
      </div>
    );
  }

  if (!product) return null;
  const imageSrc = product.image || product.imageUrl || '/placeholder.png';

  return (
    <main className="bg-dark min-vh-100 text-light">
      <div className="container py-5 position-relative">
        {showAdded && (
          <div className="toast align-items-center text-white bg-success border-0 show position-absolute top-0 end-0 m-4" role="alert" aria-live="assertive" aria-atomic="true" style={{ zIndex: 9999, minWidth: '220px' }}>
            <div className="d-flex">
              <div className="toast-body">Added to cart!</div>
            </div>
          </div>
        )}
        <div className="row justify-content-center align-items-center g-5">
          <div className="col-md-5 text-center">
            <img src={imageSrc} alt={product.title} className="img-fluid rounded-4 shadow border border-2 border-primary-subtle mb-3" style={{ maxWidth: '260px', maxHeight: '260px', objectFit: 'cover', background: '#e3f0ff' }} />
          </div>
          <div className="col-md-7">
            <h1 className="h3 fw-bold text-primary mb-3 d-flex align-items-center gap-2">
              <span style={{ fontSize: '1.7rem' }}>❄️</span>
              {product.title}
            </h1>
            <p className="mb-3 text-secondary fs-5" style={{ minHeight: '48px' }}>{product.description}</p>
            <div className="mb-3">
              {product.discount ? (
                <>
                  <span className="text-decoration-line-through text-muted me-2">${product.price}</span>
                  <span className="fw-bold text-primary fs-4">${product.discountedPrice}</span>
                </>
              ) : (
                <span className="fw-bold text-primary fs-4">${product.price}</span>
              )}
            </div>
            <div className="mb-3 text-info">Rating: <span className="fw-semibold">{product.rating}</span></div>
            <button onClick={addToCart} className="btn btn-primary btn-lg px-4 py-2 shadow-sm" style={{ background: 'linear-gradient(90deg, #1976d2 60%, #64b5f6 100%)', border: 'none' }}>Add to Cart</button>
          </div>
        </div>
      </div>
    </main>
  );
}

