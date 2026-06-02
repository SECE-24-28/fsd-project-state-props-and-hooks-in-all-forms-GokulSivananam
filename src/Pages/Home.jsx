import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function Home() {
  const { currentUser } = useAuth()
  const navigate = useNavigate()

  function handleGetStarted() {
    if (!currentUser) { navigate('/login'); return }
    navigate(currentUser.role === 'admin' ? '/admin-dashboard' : '/user-dashboard')
  }

  return (
    <div className="home-page">

      {/* ── Hero ── */}
      <section className="hero-section">
        <div className="hero-inner">
          <div className="hero-copy">
            <div className="hero-badge">🐾 Welcome to Pet Store</div>
            <h1>Everything Your<br /><span>Pet Needs</span></h1>
            <p>Quality products, expert care, and endless love for your furry friends — all in one place.</p>
            <div className="hero-actions">
              <button className="btn-primary" onClick={handleGetStarted}>
                {currentUser ? 'Go to Dashboard' : 'Get Started'}
              </button>
              <button className="btn-secondary" onClick={() => navigate('/about')}>
                Learn More
              </button>
            </div>
          </div>

          <div className="hero-visual">
            <div className="hero-stat-row">
              <div className="hero-stat">
                <div className="hero-stat-num">2,400+</div>
                <div className="hero-stat-label">Happy Customers</div>
              </div>
              <div className="hero-stat">
                <div className="hero-stat-num">500+</div>
                <div className="hero-stat-label">Products Listed</div>
              </div>
              <div className="hero-stat">
                <div className="hero-stat-num">120+</div>
                <div className="hero-stat-label">Pets Adopted</div>
              </div>
              <div className="hero-stat">
                <div className="hero-stat-num">4.9★</div>
                <div className="hero-stat-label">Average Rating</div>
              </div>
            </div>
            <div className="hero-banner">
              <strong>🚚 Free delivery on orders over $49</strong>
              <p>Same-day dispatch on all in-stock items</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Features ── */}
      <section className="features-strip">
        <div className="features-inner">
          <p className="section-label">Why Choose Us</p>
          <h2 className="section-title">Built for Pet Lovers</h2>
          <div className="features-grid">
            <div className="feature-item">
              <div className="feature-icon-wrap">🏆</div>
              <h3>Premium Quality</h3>
              <p>Every product is carefully curated and tested — only the best for your pets.</p>
            </div>
            <div className="feature-item">
              <div className="feature-icon-wrap">🚚</div>
              <h3>Fast Delivery</h3>
              <p>Same-day dispatch on all in-stock items. Get your order in as little as 24 hours.</p>
            </div>
            <div className="feature-item">
              <div className="feature-icon-wrap">💬</div>
              <h3>24/7 Support</h3>
              <p>Our dedicated team is always here to help you and your pets, any time of day.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="cta-strip">
        <h2>Ready to find your perfect pet?</h2>
        <p>Browse hundreds of pets available for adoption near you.</p>
        <button className="btn-white" onClick={handleGetStarted}>
          {currentUser ? 'Browse Pets' : 'Get Started Free'}
        </button>
      </section>

      {/* ── Footer ── */}
      <footer className="home-footer">
        <p>© 2026 Pet Store. All rights reserved.</p>
        <div className="footer-links">
          <a href="#">Terms</a>
          <a href="#">Privacy</a>
          <a href="#">Support</a>
        </div>
      </footer>
    </div>
  )
}

export default Home
