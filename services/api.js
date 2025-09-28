
// API service for product data
const BASE_URL = 'https://api.noroff.dev/api/v1/online-shop';


// Fetch all products
export async function fetchProducts() {
  const res = await fetch(BASE_URL);
  if (!res.ok) throw new Error('Failed to fetch products');
  return res.json();
}

// Fetch single product by id
export async function fetchProduct(id) {
  const res = await fetch(`${BASE_URL}/${id}`);
  if (!res.ok) throw new Error('Failed to fetch product');
  return res.json();
}
