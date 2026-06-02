import { useState } from 'react'

const CATEGORIES = [
  { icon: '🐶', label: 'Dogs' },
  { icon: '🐱', label: 'Cats' },
  { icon: '🐠', label: 'Fish' },
  { icon: '🐦', label: 'Birds' },
  { icon: '🐹', label: 'Small Pets' },
  { icon: '🦎', label: 'Reptiles' },
]

function AdoptionPage() {
  const [activeCategory, setActiveCategory] = useState('All')
  const [search, setSearch] = useState('')

  // No pets data yet — admin will add them
  const pets = []

  const filtered = pets.filter(p => {
    const matchCat = activeCategory === 'All' || p.category === activeCategory
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase())
    return matchCat && matchSearch
  })

  return (
    <div className="adoption-page">
      {/* Hero */}
      <div className="adoption-hero">
        <div className="adoption-hero-text">
          <h2>Find Your Perfect Pet 🐾</h2>
          <p>Give a loving home to a pet in need. Browse available pets for adoption.</p>
        </div>
        <div className="adoption-search-wrap">
          <span>🔍</span>
          <input
            placeholder="Search by name or breed..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* Categories */}
      <div className="adoption-section">
        <h3 className="store-section-title">Filter by Category</h3>
        <div className="store-categories">
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
      </div>

      {/* Pets Grid */}
      <div className="adoption-section">
        <h3 className="store-section-title">
          {activeCategory === 'All' ? 'Available Pets' : activeCategory}
          <span className="store-count">{filtered.length} available</span>
        </h3>

        {filtered.length === 0 ? (
          <div className="store-empty-state">
            <span>🐾</span>
            <h4>No pets available yet</h4>
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
                  <button className="adoption-adopt-btn">Adopt Me 🐾</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default AdoptionPage
