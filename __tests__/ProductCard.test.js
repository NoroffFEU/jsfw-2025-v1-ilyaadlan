// ProductCard Component Tests
// Tests product rendering and discount display
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import ProductCard from '../components/ProductCard';


describe('ProductCard', () => {
  it('renders product title and price', () => {
    const product = {
      image: '',
      title: 'Test Product',
      price: 100,
      discountedPrice: 80,
      discount: 20,
      rating: 4.5,
    };
    render(<ProductCard product={product} />);
    expect(screen.getByText('Test Product')).toBeInTheDocument();
    expect(screen.getByText('$100')).toBeInTheDocument();
    expect(screen.getByText('$80')).toBeInTheDocument();
    expect(screen.getByText('-20%')).toBeInTheDocument();
    expect(screen.getByText(/Rating/)).toBeInTheDocument();
  });
});
