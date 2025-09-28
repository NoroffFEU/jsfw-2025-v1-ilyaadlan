// Header for my shop project
// Shows navigation links. Used Bootstrap for layout.
import Link from 'next/link';

export default function Header() {
  return (
  <header className="w-full shadow-lg py-4 px-6 border-bottom" style={{ background: 'linear-gradient(90deg, #e0f7fa 0%, #b3e5fc 100%)' }}>
      <div className="container-fluid">
        <div className="row align-items-center">
          <div className="col-12 col-md-6 offset-md-3 d-flex justify-content-center align-items-center gap-2 py-2">
            <span className="fs-2" aria-label="Snowflake" role="img">❄️</span>
            <span className="fw-bold fs-3 text-dark">Winter Shop</span>
          </div>
          <div className="col-12 col-md-3 d-flex justify-content-end align-items-center py-2">
            <nav className="d-flex gap-3">
              <Link href="/" passHref legacyBehavior>
                <a className="text-dark fw-medium px-3 text-decoration-none">Home</a>
              </Link>
              <Link href="/cart" passHref legacyBehavior>
                <a className="text-dark fw-medium px-3 text-decoration-none">Cart</a>
              </Link>
              <Link href="/contact" passHref legacyBehavior>
                <a className="text-dark fw-medium px-3 text-decoration-none">Contact</a>
              </Link>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
}
