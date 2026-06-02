import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const CATEGORIES = [
  { icon: '🐶', label: 'Dogs' },
  { icon: '🐱', label: 'Cats' },
  { icon: '🐠', label: 'Fish' },
  { icon: '🐦', label: 'Birds' },
  { icon: '🐹', label: 'Small Pets' },
  { icon: '🦎', label: 'Reptiles' },
]

function Adoption() {
  const { currentUser } = useAuth()
  const navigate = useNavigate()
  const [activeCategory, setActiveCategory] = useState('All')
  const [search, setSearch] = useState('')

  // Pets will be populated by admin; empty for now
  const pets = []

  const filtered = pets.filter(p => {
    const matchCat = activeCategory === 'All' || p.category === activeCategory
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase())
    return matchCat && matchSearch
  })

  function handleAdopt() {
    if (!currentUser) {
      navigate('/login')
    }
  }

  return (
    <div>
      {/* Page Hero */}
      <div className="page-hero">
        <div className="page-hero-inner" style={{ maxWidth: '100%' }}>
          <p className="eyebrow">Find Your Companion</p>
          <h1>Pet Adoption</h1>
          <p>Give a loving home to a pet in need. Browse hundreds of pets looking for their forever family.</p>
        </div>
      </div>

      <section className="page-section" style={{ maxWidth: '1200px' }}>
        {/* Search + Filter bar */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '16px', flexWrap: 'wrap', marginBottom: '24px' }}>
          <div className="adoption-search-bar">
            <span className="store-search-icon">🔍</span>
            <input
              className="store-search"
              placeholder="Search by name or breed..."
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
          {!currentUser && (
            <div className="adoption-login-hint">
              <span>🔒</span> <span><a href="/login">Sign in</a> to submit an adoption request</span>
            </div>
          )}
        </div>

        {/* Category chips */}
        <div className="store-section-title">Filter by Category</div>
        <div className="store-categories" style={{ marginBottom: '28px' }}>
          <div
            className={`store-cat-chip ${activeCategory === 'All' ? 'active' : ''}`}
            onClick={() => setActiveCategory('All')}
          >
            🐾 All
          </div>
          {CATEGORIES.map(c => (
            <div
              key={c.label}
              className={`store-cat-chip ${activeCategory === c.label ? 'active' : ''}`}
              onClick={() => setActiveCategory(c.label)}
            >
              {c.icon} {c.label}
            </div>
          ))}
        </div>

        {/* Results title */}
        <div className="store-section-title">
          {activeCategory === 'All' ? 'Available Pets' : activeCategory}
          <span className="store-count">{filtered.length} available</span>
        </div>

        {/* Grid */}
        {filtered.length === 0 ? (
          <div className="store-empty-state">
            <span>🐾</span>
            <h4>No pets listed yet</h4>
            <p>Check back soon — pets available for adoption will appear here.</p>
          </div>
        ) : (
          <div className="adoption-grid">
            {filtered.map(pet => (
              <div key={pet.id} className="adoption-card">
                <img src={pet.img} alt={pet.name} className="adoption-card-img" />
                <div className="adoption-card-info">
                  <span className="adoption-cat-tag">{pet.category}</span>
                  <h4>{pet.name}</h4>
                  <p>{pet.breed} · {pet.age}</p>
                  <button className="adoption-adopt-btn" onClick={handleAdopt}>
                    {currentUser ? 'Adopt Me 🐾' : 'Login to Adopt'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  )
}

export default Adoption
