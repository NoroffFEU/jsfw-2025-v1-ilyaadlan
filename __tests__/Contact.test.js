import '@testing-library/jest-dom';

// Contact Page Tests
// Tests form validation and submission
import { render, screen, fireEvent } from '@testing-library/react';
import Contact from '../pages/contact';

describe('Contact', () => {
  it('shows validation errors for invalid input', () => {
    render(<Contact showToast={() => {}} />);
    fireEvent.change(screen.getByLabelText(/Full Name/i), { target: { value: 'Jo' } });
    fireEvent.change(screen.getByLabelText(/Subject/i), { target: { value: 'Hi' } });
    fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'invalid' } });
    fireEvent.change(screen.getByLabelText(/Message/i), { target: { value: 'short' } });
    fireEvent.click(screen.getByText('Send Message'));
    expect(screen.getByText(/Full Name must be at least 3 characters/i)).toBeInTheDocument();
    expect(screen.getByText(/Subject must be at least 3 characters/i)).toBeInTheDocument();
    expect(screen.getByText(/Email must be valid/i)).toBeInTheDocument();
    expect(screen.getByText(/Message must be at least 10 characters/i)).toBeInTheDocument();
  });

  it('shows success toast for valid input', () => {
    const showToast = jest.fn();
    render(<Contact showToast={showToast} />);
    fireEvent.change(screen.getByLabelText(/Full Name/i), { target: { value: 'John Doe' } });
    fireEvent.change(screen.getByLabelText(/Subject/i), { target: { value: 'Hello' } });
    fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'john@example.com' } });
    fireEvent.change(screen.getByLabelText(/Message/i), { target: { value: 'This is a valid message.' } });
    fireEvent.click(screen.getByText('Send Message'));
    expect(showToast).toHaveBeenCalledWith('Message sent successfully!', 'success');
  });
});
