import '@testing-library/jest-dom';

// Cart Page Tests
// Tests cart rendering, quantity adjustment, removal, and checkout
import { render, screen, fireEvent } from '@testing-library/react';
import Cart from '../pages/cart';

// Mock Next.js router if needed
jest.mock('next/router', () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

// Add the localStorage mock here
beforeEach(() => {
  jest.spyOn(global.localStorage, 'getItem').mockImplementation(() =>
    JSON.stringify([
      { id: '1', title: 'Test Product', price: 100, discountedPrice: 80 },
      { id: '1', title: 'Test Product', price: 100, discountedPrice: 80 },
      { id: '2', title: 'Another Product', price: 50 }
    ])
  );
});

beforeAll(() => {
  Object.defineProperty(global, 'localStorage', {
    value: {
      getItem: jest.fn(() => '[]'),
      setItem: jest.fn(),
      removeItem: jest.fn(),
      clear: jest.fn(),
    },
    writable: true,
  });
});

describe('Cart', () => {
  beforeEach(() => {
    localStorage.setItem('cart', JSON.stringify([
      { id: '1', title: 'Test Product', price: 100, discountedPrice: 80 },
      { id: '1', title: 'Test Product', price: 100, discountedPrice: 80 },
      { id: '2', title: 'Another Product', price: 50 }
    ]));
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('renders cart items and total', () => {
    render(<Cart showToast={() => {}} />);
    expect(screen.getByText('Test Product')).toBeInTheDocument();
    expect(screen.getByText('Another Product')).toBeInTheDocument();
  expect(screen.getByText('Total: $370.00')).toBeInTheDocument();
  });

  it('removes item from cart', () => {
    render(<Cart showToast={() => {}} />);
  fireEvent.click(screen.getAllByText('Remove')[0]);
  expect(screen.getAllByText('Test Product').length).toBe(1);
  });
});
