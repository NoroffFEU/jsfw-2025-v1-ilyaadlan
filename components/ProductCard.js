// ProductCard for my shop project
// Shows product info and price. Used Bootstrap card.
import Link from 'next/link';

export default function ProductCard({ product }) {
  // Get product image
  const imageSrc = product.image || product.imageUrl || (product.images && product.images[0]) || '/placeholder.png';
  return (
    <Link href={`/product/${product.id}`} className="block group" style={{ textDecoration: 'none' }}>
      <div className="card shadow-lg rounded-4 border-0 h-100 p-2 bg-white position-relative hover-shadow" style={{ width: '19rem', minHeight: '27rem', transition: 'transform 0.2s', cursor: 'pointer' }}
        onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.04)'}
        onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}>
        <div className="card-img-top d-flex justify-content-center align-items-center bg-light rounded-3 overflow-hidden" style={{ height: '180px' }}>
          <img src={imageSrc} alt={product.title} className="img-fluid" style={{ maxHeight: '160px', objectFit: 'cover' }} />
        </div>
        <div className="card-body text-center d-flex flex-column justify-content-between">
          <h5 className="card-title mb-0 fw-bold text-dark" style={{ textDecoration: 'none' }}>{product.title}</h5>
          <div className="mt-1 mb-2">
            {product.discount ? (
              <>
                <span className="text-muted" style={{ textDecoration: 'line-through', color: '#888' }}>${product.price}</span>
                <span className="fw-bold text-primary ms-2" style={{ textDecoration: 'none' }}>${product.discountedPrice}</span>
              </>
            ) : (
              <span className="fw-bold text-primary" style={{ textDecoration: 'none' }}>${product.price}</span>
            )}
          </div>
          <div className="text-secondary mb-2">Rating: {product.rating}</div>
        </div>
        <div className="position-absolute top-0 start-0 w-100 h-100 rounded-4" style={{ pointerEvents: 'none', transition: 'box-shadow 0.2s' }}></div>
      </div>
    </Link>
  );
}
