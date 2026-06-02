function About() {
  return (
    <div>
      {/* Page Hero */}
      <div className="page-hero">
        <div className="page-hero-inner">
          <p className="eyebrow">Our Story</p>
          <h1>About Pet Store</h1>
          <p>
            Founded in 2020, Pet Store is your one-stop destination for everything your pet needs.
            We believe every pet deserves the best — from premium nutrition to cozy accessories.
          </p>
        </div>
      </div>

      {/* Values */}
      <section className="page-section">
        <p className="section-label">Core Values</p>
        <h2 className="section-title">What We Stand For</h2>
        <div className="about-values-grid">
          <div className="value-card">
            <div className="value-icon">🐾</div>
            <h3>Our Mission</h3>
            <p>To provide high-quality products and expert care advice for pet owners everywhere, making pet care simpler and more joyful.</p>
          </div>
          <div className="value-card">
            <div className="value-icon">💚</div>
            <h3>Animal Welfare</h3>
            <p>We care deeply about animal welfare and sustainability. Every purchase supports rescue shelters and humane practices.</p>
          </div>
          <div className="value-card">
            <div className="value-icon">🏆</div>
            <h3>Our Promise</h3>
            <p>100% satisfaction guaranteed on every order, backed by our dedicated support team available around the clock.</p>
          </div>
        </div>

        {/* Stats */}
        <div className="stats-row">
          <div className="stat-block">
            <div className="stat-block-num">2,400+</div>
            <div className="stat-block-label">Happy Customers</div>
          </div>
          <div className="stat-block">
            <div className="stat-block-num">500+</div>
            <div className="stat-block-label">Products</div>
          </div>
          <div className="stat-block">
            <div className="stat-block-num">120+</div>
            <div className="stat-block-label">Pets Adopted</div>
          </div>
          <div className="stat-block">
            <div className="stat-block-num">6</div>
            <div className="stat-block-label">Years of Service</div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default About
