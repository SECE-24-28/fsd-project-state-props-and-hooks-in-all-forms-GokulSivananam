function Contact() {
  return (
    <div>
      {/* Page Hero */}
      <div className="page-hero">
        <div className="page-hero-inner">
          <p className="eyebrow">Get In Touch</p>
          <h1>Contact Us</h1>
          <p>Have a question or need help? Fill out the form and our team will get back to you within 24 hours.</p>
        </div>
      </div>

      {/* Contact section */}
      <section className="contact-section">
        <div className="contact-grid">
          {/* Form */}
          <div className="contact-form-card">
            <h3>Send us a message</h3>
            <form className="contact-form" noValidate>
              <div>
                <label htmlFor="name">Full Name</label>
                <input type="text" id="name" placeholder="Your full name" />
              </div>
              <div>
                <label htmlFor="email">Email Address</label>
                <input type="email" id="email" placeholder="your@email.com" />
              </div>
              <div>
                <label htmlFor="subject">Subject</label>
                <input type="text" id="subject" placeholder="How can we help?" />
              </div>
              <div>
                <label htmlFor="message">Message</label>
                <textarea id="message" rows="5" placeholder="Tell us more..."></textarea>
              </div>
              <button type="submit" className="btn-primary" style={{ width: '100%' }}>
                Send Message →
              </button>
            </form>
          </div>

          {/* Info panel */}
          <div className="contact-info-panel">
            <div className="contact-info-card">
              <div className="contact-info-icon">📍</div>
              <div>
                <strong>Address</strong>
                <p>123 Pet Lane, Animal City, AC 45678</p>
              </div>
            </div>
            <div className="contact-info-card">
              <div className="contact-info-icon">📞</div>
              <div>
                <strong>Phone</strong>
                <p>+1 (555) 123-4567</p>
              </div>
            </div>
            <div className="contact-info-card">
              <div className="contact-info-icon">✉️</div>
              <div>
                <strong>Email</strong>
                <p>hello@petstore.com</p>
              </div>
            </div>
            <div className="contact-info-card">
              <div className="contact-info-icon">🕐</div>
              <div>
                <strong>Business Hours</strong>
                <p>Mon – Fri, 9 AM – 6 PM EST</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Contact
