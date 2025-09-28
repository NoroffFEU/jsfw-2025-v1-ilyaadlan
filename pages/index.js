// Homepage for my shop project
// Shows products, search, and sort. I used Bootstrap grid for layout.
import { useEffect, useState } from 'react';
import { fetchProducts } from '../services/api';
import ProductCard from '../components/ProductCard';
import SearchBar from '../components/SearchBar';

export default function Home({ showToast }) {
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Get products when page loads
  useEffect(() => {
    setLoading(true);
    fetchProducts()
      .then((data) => {
        setProducts(data);
        setFiltered(data);
        setLoading(false);
      })
      .catch(() => {
        setError('Could not load products. Try again.');
        setLoading(false);
      });
  }, []);

  // Filter and sort products
  useEffect(() => {
    let searchStr = typeof search === 'string' ? search : '';
    let result = products.filter((p) =>
      typeof p.title === 'string' && p.title.toLowerCase().includes(searchStr.toLowerCase())
    );
    if (sort === 'price') {
      result = result.sort((a, b) => a.price - b.price);
    } else if (sort === 'name') {
      result = result.sort((a, b) => a.title.localeCompare(b.title));
    }
    setFiltered(result);
    if (search && result.length === 0) {
      showToast('No products found', 'error');
    }
  }, [search, sort, products, showToast]);

  if (loading) return <div className="container mx-auto py-12 text-center text-blue-700 text-xl">Loading...</div>;
  if (error) return (
    <div className="container mx-auto py-12 text-blue-900 text-center">
      <p className="mb-4 text-lg">{error}</p>
      <button onClick={() => window.location.reload()} className="mt-4 px-4 py-2 bg-gradient-to-r from-blue-700 to-blue-400 text-white rounded shadow">Reload</button>
    </div>
  );

  return (
  <main className="bg-dark min-vh-100 text-light">
    <div className="container py-5">
      <h1 className="display-4 text-center text-light mb-5"><span role="img" aria-label="snowflake">❄️</span> Winter Shop</h1>
      <div className="d-flex align-items-center justify-content-between mb-4" style={{ gap: '2rem' }}>
        <div>
          <SearchBar value={search} onChange={e => setSearch(e.target.value)} />
        </div>
        <div className="d-flex align-items-center">
          <span className="text-light me-2">Sort by:</span>
          <select value={sort} onChange={e => setSort(e.target.value)} className="form-select w-auto">
            <option value="">None</option>
            <option value="price">Price</option>
            <option value="name">Name</option>
          </select>
        </div>
      </div>
      <div className="row g-4">
        {filtered.length === 0 && (
          <div className="col-12 text-center text-light py-5 h4">No products found.</div>
        )}
        {filtered.map(product => (
          <div className="col-12 col-sm-10 col-md-6 col-lg-4 d-flex justify-content-center mb-4" key={product.id}>
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </div>
  </main>
  );
}
