import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const INITIAL = {
  businessName: '',
  businessType: '',
  phone: '',
  email: '',
  address: '',
  description: '',
  agree: false,
}

function BecomeSeller() {
  const { currentUser } = useAuth()
  const navigate = useNavigate()
  const [form, setForm] = useState(INITIAL)
  const [errors, setErrors] = useState({})
  const [submitted, setSubmitted] = useState(false)

  function handleChange(e) {
    const { id, value, type, checked } = e.target
    setForm(prev => ({ ...prev, [id]: type === 'checkbox' ? checked : value }))
    setErrors(prev => ({ ...prev, [id]: '' }))
  }

  function validate() {
    const e = {}
    if (!form.businessName.trim())  e.businessName = 'Business name is required.'
    if (!form.businessType)         e.businessType = 'Please select a business type.'
    if (!form.phone.trim())         e.phone = 'Phone number is required.'
    else if (!/^\d{7,15}$/.test(form.phone.replace(/\s|-/g, ''))) e.phone = 'Enter a valid phone number.'
    if (!form.email.trim())         e.email = 'Email is required.'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Enter a valid email address.'
    if (!form.address.trim())       e.address = 'Address is required.'
    if (!form.description.trim())   e.description = 'Please describe your business.'
    else if (form.description.trim().length < 20) e.description = 'Description must be at least 20 characters.'
    if (!form.agree)                e.agree = 'You must agree to the terms.'
    return e
  }

  function handleSubmit(e) {
    e.preventDefault()
    if (!currentUser) { navigate('/login'); return }
    const errs = validate()
    if (Object.keys(errs).length > 0) { setErrors(errs); return }
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="page-section" style={{ maxWidth: '600px' }}>
        <div className="seller-success">
          <span>✅</span>
          <h3>Request Submitted!</h3>
          <p>
            Thank you, <strong>{currentUser?.firstName || 'there'}</strong>! Your seller request has been
            sent to the admin for review. We'll notify you once it's approved.
          </p>
          <button className="seller-back-btn" onClick={() => { setForm(INITIAL); setSubmitted(false) }}>
            Submit Another Request
          </button>
        </div>
      </div>
    )
  }

  return (
    <div>
      {/* Page Hero */}
      <div className="page-hero">
        <div className="page-hero-inner">
          <p className="eyebrow">Partner With Us</p>
          <h1>Become a Seller</h1>
          <p>List your pet products or services on Pet Store and reach thousands of pet lovers. Fill in your business details to get started.</p>
        </div>
      </div>

      <section className="page-section" style={{ maxWidth: '900px' }}>

        {/* Login prompt for guests */}
        {!currentUser && (
          <div className="seller-login-notice">
            <span>🔒</span>
            <div>
              <strong>Account required</strong>
              <p>You need to be signed in to submit a seller request. <a href="/login">Sign in</a> or <a href="/signin">create a free account</a>.</p>
            </div>
          </div>
        )}

        {/* Why become a seller */}
        <div className="seller-benefits">
          <div className="seller-benefit-item">
            <div className="value-icon">🛒</div>
            <h4>Reach Thousands</h4>
            <p>Access our growing base of pet lovers actively looking for quality products.</p>
          </div>
          <div className="seller-benefit-item">
            <div className="value-icon">📦</div>
            <h4>Easy Listings</h4>
            <p>Simple dashboard to manage your products, inventory and orders in one place.</p>
          </div>
          <div className="seller-benefit-item">
            <div className="value-icon">💳</div>
            <h4>Fast Payouts</h4>
            <p>Get paid quickly and securely with our trusted payment infrastructure.</p>
          </div>
        </div>

        {/* Form */}
        <form className="seller-form" onSubmit={handleSubmit} noValidate style={{ marginTop: '32px' }}>
          <div className="seller-form-grid">

            <div className="seller-field">
              <label htmlFor="businessName">Business Name *</label>
              <input
                id="businessName" type="text"
                placeholder="e.g. Happy Paws Store"
                value={form.businessName} onChange={handleChange}
                className={errors.businessName ? 'input-error' : ''}
              />
              {errors.businessName && <span className="field-error">{errors.businessName}</span>}
            </div>

            <div className="seller-field">
              <label htmlFor="businessType">Business Type *</label>
              <select
                id="businessType"
                value={form.businessType} onChange={handleChange}
                className={errors.businessType ? 'input-error' : ''}
              >
                <option value="">Select type...</option>
                <option value="Pet Food">Pet Food</option>
                <option value="Pet Accessories">Pet Accessories</option>
                <option value="Pet Adoption">Pet Adoption</option>
                <option value="Veterinary Products">Veterinary Products</option>
                <option value="Pet Grooming">Pet Grooming</option>
                <option value="Other">Other</option>
              </select>
              {errors.businessType && <span className="field-error">{errors.businessType}</span>}
            </div>

            <div className="seller-field">
              <label htmlFor="phone">Phone Number *</label>
              <input
                id="phone" type="tel"
                placeholder="e.g. 0123456789"
                value={form.phone} onChange={handleChange}
                className={errors.phone ? 'input-error' : ''}
              />
              {errors.phone && <span className="field-error">{errors.phone}</span>}
            </div>

            <div className="seller-field">
              <label htmlFor="email">Business Email *</label>
              <input
                id="email" type="email"
                placeholder="business@example.com"
                value={form.email} onChange={handleChange}
                className={errors.email ? 'input-error' : ''}
              />
              {errors.email && <span className="field-error">{errors.email}</span>}
            </div>

            <div className="seller-field seller-field-full">
              <label htmlFor="address">Business Address *</label>
              <input
                id="address" type="text"
                placeholder="Street, City, State, ZIP"
                value={form.address} onChange={handleChange}
                className={errors.address ? 'input-error' : ''}
              />
              {errors.address && <span className="field-error">{errors.address}</span>}
            </div>

            <div className="seller-field seller-field-full">
              <label htmlFor="description">
                Business Description * <span className="field-hint">(min. 20 characters)</span>
              </label>
              <textarea
                id="description" rows="4"
                placeholder="Describe your business, the products or services you offer..."
                value={form.description} onChange={handleChange}
                className={errors.description ? 'input-error' : ''}
              />
              <span className="field-char-count">{form.description.length} chars</span>
              {errors.description && <span className="field-error">{errors.description}</span>}
            </div>

            <div className="seller-field seller-field-full">
              <label className="seller-checkbox-label">
                <input id="agree" type="checkbox" checked={form.agree} onChange={handleChange} />
                I agree to the Pet Store Seller Terms and Conditions
              </label>
              {errors.agree && <span className="field-error">{errors.agree}</span>}
            </div>
          </div>

          <button type="submit" className="seller-submit-btn">
            {currentUser ? 'Submit Request →' : 'Sign in to Submit →'}
          </button>
        </form>
      </section>
    </div>
  )
}

export default BecomeSeller
