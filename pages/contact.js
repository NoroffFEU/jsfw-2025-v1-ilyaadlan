// Contact page for my shop project
// Lets users send a message. I used Bootstrap card for layout.
import { useState } from 'react';

export default function Contact({ showToast }) {
  const [form, setForm] = useState({
    name: '',
    subject: '',
    email: '',
    message: ''
  });
  const [errors, setErrors] = useState({});

  // Check form fields
  const validate = () => {
    const errs = {};
    if (form.name.length < 3) errs.name = 'Full Name must be at least 3 characters.';
    if (form.subject.length < 3) errs.subject = 'Subject must be at least 3 characters.';
    if (!/^\S+@\S+\.\S+$/.test(form.email)) errs.email = 'Email must be valid.';
    if (form.message.length < 10) errs.message = 'Message must be at least 10 characters.';
    return errs;
  };

  // Update form when typing
  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // When form is submitted
  const handleSubmit = e => {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length > 0) {
  showToast('Please check your input.', 'error');
      return;
    }
  showToast('Message sent!', 'success');
    setForm({ name: '', subject: '', email: '', message: '' });
    setErrors({});
  };

  return (
    <main className="bg-dark min-vh-100 text-light">
  <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-lg-7">
            <div className="card shadow-lg border-0 rounded-4 p-4 p-md-5 bg-secondary bg-opacity-75 position-relative text-light">
              <h1 className="h2 fw-bold text-primary mb-4 d-flex align-items-center gap-2">
                <span style={{ fontSize: '1.7rem' }}>❄️</span>
                Contact Us
              </h1>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label fw-semibold text-secondary">
                    <i className="bi bi-person-circle me-2"></i>Full Name
                  </label>
                  <input name="name" value={form.name} onChange={handleChange} className="form-control form-control-lg rounded-3" placeholder="Your full name" />
                  {errors.name && <div className="text-danger small mt-1">{errors.name}</div>}
                </div>
                <div className="mb-3">
                  <label className="form-label fw-semibold text-secondary">
                    <i className="bi bi-chat-left-text me-2"></i>Subject
                  </label>
                  <input name="subject" value={form.subject} onChange={handleChange} className="form-control form-control-lg rounded-3" placeholder="Subject" />
                  {errors.subject && <div className="text-danger small mt-1">{errors.subject}</div>}
                </div>
                <div className="mb-3">
                  <label className="form-label fw-semibold text-secondary">
                    <i className="bi bi-envelope-at me-2"></i>Email
                  </label>
                  <input name="email" value={form.email} onChange={handleChange} className="form-control form-control-lg rounded-3" placeholder="Email address" />
                  {errors.email && <div className="text-danger small mt-1">{errors.email}</div>}
                </div>
                <div className="mb-3">
                  <label className="form-label fw-semibold text-secondary">
                    <i className="bi bi-pencil-square me-2"></i>Message
                  </label>
                  <textarea name="message" value={form.message} onChange={handleChange} className="form-control form-control-lg rounded-3" rows={4} placeholder="Type your message here..." />
                  {errors.message && <div className="text-danger small mt-1">{errors.message}</div>}
                </div>
                <button type="submit" className="btn btn-primary btn-lg w-100 mt-3 shadow-sm" style={{ background: 'linear-gradient(90deg, #1976d2 60%, #64b5f6 100%)', border: 'none' }}>
                  <i className="bi bi-send me-2"></i>Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
