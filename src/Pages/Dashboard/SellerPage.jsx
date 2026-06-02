import { useState } from 'react'
import { useAuth } from '../../context/AuthContext'

const INITIAL = {
  businessName: '',
  businessType: '',
  phone: '',
  email: '',
  address: '',
  description: '',
  agree: false,
}

function SellerPage() {
  const { currentUser } = useAuth()
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
    if (!form.businessName.trim())   e.businessName = 'Business name is required.'
    if (!form.businessType)          e.businessType = 'Please select a business type.'
    if (!form.phone.trim())          e.phone = 'Phone number is required.'
    else if (!/^\d{7,15}$/.test(form.phone.replace(/\s|-/g, ''))) e.phone = 'Enter a valid phone number.'
    if (!form.email.trim())          e.email = 'Email is required.'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Enter a valid email address.'
    if (!form.address.trim())        e.address = 'Address is required.'
    if (!form.description.trim())    e.description = 'Please describe your business.'
    else if (form.description.trim().length < 20) e.description = 'Description must be at least 20 characters.'
    if (!form.agree)                 e.agree = 'You must agree to the terms.'
    return e
  }

  function handleSubmit(e) {
    e.preventDefault()
    const e2 = validate()
    if (Object.keys(e2).length > 0) { setErrors(e2); return }
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="seller-success">
        <span>✅</span>
        <h3>Request Submitted!</h3>
        <p>Thank you, <strong>{currentUser?.firstName}</strong>! Your seller request has been sent to the admin for review. We'll notify you once it's approved.</p>
        <button className="seller-back-btn" onClick={() => { setForm(INITIAL); setSubmitted(false) }}>
          Submit Another Request
        </button>
      </div>
    )
  }

  return (
    <div className="seller-page">
      <div className="seller-header">
        <h2>Become a Seller 🏪</h2>
        <p>Fill in your business details below and submit your request. Our admin team will review and get back to you.</p>
      </div>

      <form className="seller-form" onSubmit={handleSubmit} noValidate>
        <div className="seller-form-grid">

          {/* Business Name */}
          <div className="seller-field">
            <label htmlFor="businessName">Business Name *</label>
            <input
              id="businessName"
              type="text"
              placeholder="e.g. Happy Paws Store"
              value={form.businessName}
              onChange={handleChange}
              className={errors.businessName ? 'input-error' : ''}
            />
            {errors.businessName && <span className="field-error">{errors.businessName}</span>}
          </div>

          {/* Business Type */}
          <div className="seller-field">
            <label htmlFor="businessType">Business Type *</label>
            <select
              id="businessType"
              value={form.businessType}
              onChange={handleChange}
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

          {/* Phone */}
          <div className="seller-field">
            <label htmlFor="phone">Phone Number *</label>
            <input
              id="phone"
              type="tel"
              placeholder="e.g. 0123456789"
              value={form.phone}
              onChange={handleChange}
              className={errors.phone ? 'input-error' : ''}
            />
            {errors.phone && <span className="field-error">{errors.phone}</span>}
          </div>

          {/* Email */}
          <div className="seller-field">
            <label htmlFor="email">Business Email *</label>
            <input
              id="email"
              type="email"
              placeholder="business@example.com"
              value={form.email}
              onChange={handleChange}
              className={errors.email ? 'input-error' : ''}
            />
            {errors.email && <span className="field-error">{errors.email}</span>}
          </div>

          {/* Address */}
          <div className="seller-field seller-field-full">
            <label htmlFor="address">Business Address *</label>
            <input
              id="address"
              type="text"
              placeholder="Street, City, State, ZIP"
              value={form.address}
              onChange={handleChange}
              className={errors.address ? 'input-error' : ''}
            />
            {errors.address && <span className="field-error">{errors.address}</span>}
          </div>

          {/* Description */}
          <div className="seller-field seller-field-full">
            <label htmlFor="description">Business Description * <span className="field-hint">(min. 20 characters)</span></label>
            <textarea
              id="description"
              rows="4"
              placeholder="Describe your business, the products or services you offer..."
              value={form.description}
              onChange={handleChange}
              className={errors.description ? 'input-error' : ''}
            />
            <span className="field-char-count">{form.description.length} chars</span>
            {errors.description && <span className="field-error">{errors.description}</span>}
          </div>

          {/* Agree */}
          <div className="seller-field seller-field-full">
            <label className="seller-checkbox-label">
              <input
                id="agree"
                type="checkbox"
                checked={form.agree}
                onChange={handleChange}
              />
              I agree to the Pet Store Seller Terms and Conditions
            </label>
            {errors.agree && <span className="field-error">{errors.agree}</span>}
          </div>
        </div>

        <button type="submit" className="seller-submit-btn">Submit Request →</button>
      </form>
    </div>
  )
}

export default SellerPage
