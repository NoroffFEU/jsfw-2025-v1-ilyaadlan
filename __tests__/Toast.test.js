// Toast Component Tests
// Tests toast rendering for success and error messages
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Toast from '../components/Toast';

describe('Toast', () => {
  it('renders success message', () => {
    render(<Toast message="Success!" type="success" />);
    expect(screen.getByText('Success!')).toBeInTheDocument();
  });

  it('renders error message', () => {
    render(<Toast message="Error!" type="error" />);
    expect(screen.getByText('Error!')).toBeInTheDocument();
  });
});
