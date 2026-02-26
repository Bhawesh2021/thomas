import { useState, useEffect } from 'react'
import emailjs from '@emailjs/browser'

function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [currentSlide, setCurrentSlide] = useState(0)
  
  // Form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  })
  const [formStatus, setFormStatus] = useState('idle')
  const [formErrors, setFormErrors] = useState({})

  const validateForm = () => {
    const errors = {}
    if (!formData.name.trim()) {
      errors.name = 'Bitte geben Sie Ihren Namen ein'
    } else if (formData.name.trim().length < 2) {
      errors.name = 'Name muss mindestens 2 Zeichen haben'
    }
    if (!formData.email.trim()) {
      errors.email = 'Bitte geben Sie Ihre E-Mail-Adresse ein'
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(formData.email)) {
        errors.email = 'Bitte geben Sie eine gültige E-Mail-Adresse ein'
      }
    }
    if (formData.phone.trim()) {
      const phoneRegex = /^[\d\s\+\-\(\)]{7,}$/
      if (!phoneRegex.test(formData.phone)) {
        errors.phone = 'Bitte geben Sie eine gültige Telefonnummer ein'
      }
    }
    if (!formData.message.trim()) {
      errors.message = 'Bitte geben Sie eine Nachricht ein'
    } else if (formData.message.trim().length < 10) {
      errors.message = 'Nachricht muss mindestens 10 Zeichen haben'
    }
    return errors
  }

  const handleInputChange = (e) => {
    const { id, value } = e.target
    setFormData(prev => ({ ...prev, [id]: value }))
    if (formErrors[id]) {
      setFormErrors(prev => ({ ...prev, [id]: '' }))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const errors = validateForm()
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors)
      return
    }
    setFormStatus('loading')

    try {
      await emailjs.send(
        'service_h9drytl',
        'template_z02mf1x',
        {
          to_email: 'satyams0478@gmail.com',
          name: formData.name,
          from_email: formData.email,
          phone: formData.phone,
          message: formData.message
        },
        'BplNyD2b98NgGNDzl'
      )
      
      setFormStatus('success')
      setFormData({ name: '', email: '', phone: '', message: '' })
      setFormErrors({})
      
      // Reset success message after 5 seconds
      setTimeout(() => setFormStatus('idle'), 5000)
    } catch (error) {
      console.error('EmailJS Error:', error)
      setFormStatus('error')
      
      // Reset error message after 5 seconds
      setTimeout(() => setFormStatus('idle'), 5000)
    }
  }

  const carouselImages = [
    {
      image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1920&q=80',
      title: 'Professionelle Beratung für Ihr Unternehmen',
      subtitle: 'Willkommen bei HORNUNG BUSINESS & TAX CONSULTING'
    },
    {
      image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=1920&q=80',
      title: 'Kompetente Steuer- und Buchhaltungsdienstleistungen',
      subtitle: 'Vertrauen Sie auf unsere Expertise'
    },
    {
      image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1920&q=80',
      title: 'Ihr Partner für betriebswirtschaftliche Lösungen',
      subtitle: 'Persönlich - Kompetent - Zuverlässig'
    }
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselImages.length)
    }, 4000)
    return () => clearInterval(timer)
  }, [])

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen)
  }

  const scrollToSection = (id) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
    setMobileMenuOpen(false)
  }

  const services = [
    {
      icon: '📊',
      title: 'Steuererklärungen',
      description: 'Professionelle Vorbereitung und Einreichung Ihrer Steuererklärungen in Deutschland und der Schweiz.'
    },
    {
      icon: '💼',
      title: 'Steuerberatung',
      description: 'Umfassende steuerliche Beratung zur Optimierung Ihrer steuerlichen Situation.'
    },
    {
      icon: '📒',
      title: 'Buchhaltung',
      description: 'Kompetente Unterstützung bei der Finanzbuchhaltung.'
    },
    {
      icon: '🚀',
      title: 'Unternehmensgründung',
      description: 'Beratung und Unterstützung bei der Gründung Ihres Unternehmens.'
    },
    {
      icon: '🏦',
      title: 'Bankangelegenheiten',
      description: 'Unterstützung bei Bankangelegenheiten und Finanzierungsfragen.'
    },
    {
      icon: '⚖️',
      title: 'Rechtliche Unterstützung',
      description: 'Hilfe bei behördlichen Verfahren und gerichtlichen Dokumentationen.'
    }
  ]

  return (
    <div className="app">
      {/* Header */}
      <header className="header">
        <div className="container">
          <div className="header-inner">
            <a href="#" className="logo">
              <img src="/images/Logo in maroon.jpg.jpeg" alt="Logo" className="logo-image" />
              <span className="logo-text">HORNUNG BUSINESS & TAX CONSULTING</span>
            </a>
            
            <nav className={`nav ${mobileMenuOpen ? 'active' : ''}`}>
              <a href="#hero" className="nav-link" onClick={() => scrollToSection('hero')}>Home</a>
              <a href="#services" className="nav-link" onClick={() => scrollToSection('services')}>Leistungen</a>
              <a href="#approach" className="nav-link" onClick={() => scrollToSection('approach')}>Ansatz</a>
              <a href="#about" className="nav-link" onClick={() => scrollToSection('about')}>Über uns</a>
              <a href="#contact" className="nav-link" onClick={() => scrollToSection('contact')}>Kontakt</a>
            </nav>

            <button className="mobile-menu-btn" onClick={toggleMobileMenu}>
              <span></span>
              <span></span>
              <span></span>
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section with Carousel */}
      <section id="hero" className="hero-carousel">
        <div className="carousel-slides">
          {carouselImages.map((slide, index) => (
            <div 
              key={index}
              className={`carousel-slide ${index === currentSlide ? 'active' : ''}`}
              style={{ backgroundImage: `url(${slide.image})` }}
            >
              <div className="carousel-overlay"></div>
              <div className="container">
                <div className="carousel-content">
                  <span className="hero-badge">{slide.subtitle}</span>
                  <h1>{slide.title}</h1>
                  <p>Wir bieten Ihnen professionelle Unterstützung in allen steuerlichen, rechtlichen und betriebswirtschaftlichen Angelegenheiten.</p>
                  <div className="hero-buttons">
                    <a href="#contact" className="btn btn-primary" onClick={() => scrollToSection('contact')}>Kontakt aufnehmen</a>
                    <a href="#services" className="btn btn-secondary" onClick={() => scrollToSection('services')}>Unsere Leistungen</a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="carousel-dots">
          {carouselImages.map((_, index) => (
            <button
              key={index}
              className={`carousel-dot ${index === currentSlide ? 'active' : ''}`}
              onClick={() => setCurrentSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="services">
        <div className="container">
          <div className="section-header">
            <span className="section-label">Unsere Leistungen</span>
            <h2 className="section-title">Was wir für Sie tun können</h2>
            <p className="section-description">Wir bieten umfassende Dienstleistungen in den Bereichen Steuern, Recht und Betriebswirtschaft.</p>
          </div>
          
          <div className="services-grid">
            {services.map((service, index) => (
              <div className="service-card" key={index}>
                <div className="service-icon">{service.icon}</div>
                <h3>{service.title}</h3>
                <p>{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Approach Section */}
      <section id="approach" className="approach">
        <div className="container">
          <div className="section-header">
            <span className="section-label">Unser Ansatz </span>
            <h2 className="section-title">Ihr Erfolg ist unser Ziel</h2>
            <p className="section-description">Wir bieten persönliche, kundenorientierte Beratung mit Professionalismus und Effizienz.</p>
          </div>
          
          <div className="approach-content">
            <p className="approach-intro">Unsere Dienstleistungen stehen Ihnen zur Verfügung:</p>
            <ul className="approach-list">
              <li>
                <span className="approach-icon">📍</span>
                <span>Persönlich (Basel und Umgebung)</span>
              </li>
              <li>
                <span className="approach-icon">💻</span>
                <span>Digital (Online-Beratung in der gesamten Schweiz)</span>
              </li>
            </ul>
            <p className="approach-footer">
              Wir setzen uns für klare Guidance, professionelle Expertise und effiziente Abwicklung Ihrer Angelegenheiten ein.
            </p>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="about">
        <div className="container">
          <div className="about-grid">
            <div className="about-content">
              <h2>Über uns</h2>
              <p>Willkommen bei HORNUNG BUSINESS & TAX CONSULTING – Ihrem professionellen Beratungsunternehmen in Basel, Schweiz.</p>
              <p>Wir sind ein professionelles Beratungsunternehmen mit Sitz in Basel, Schweiz, gegründet von einem ausgebildeten Steuer- und Buchhaltungsspezialisten mit beruflicher Erfahrung in Deutschland und der Schweiz.</p>
              <p>Wir bieten zuverlässige, vertrauliche und lösungsorientierte Unterstützung für Privatpersonen und Unternehmen, die Unterstützung bei steuerlichen, rechtlichen und administrativen Angelegenheiten benötigen.</p>
              <ul className="about-features">
                <li>
                  <span className="check-icon">✓</span>
                  <span>Professionelle Steuerberatung</span>
                </li>
                <li>
                  <span className="check-icon">✓</span>
                  <span>Erfahrung in Deutschland und der Schweiz</span>
                </li>
                <li>
                  <span className="check-icon">✓</span>
                  <span>Vertrauensvolle Zusammenarbeit</span>
                </li>
                <li>
                  <span className="check-icon">✓</span>
                  <span>Persönliche und kundenorientierte Beratung</span>
                </li>
              </ul>
            </div>
            <div className="about-image">
              <img src="/images/thomas.jpeg" alt="Thomas" className="about-image-img" />
              <h3 className="about-person-name">Thomas Hornung</h3>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="contact">
        <div className="container">
          <div className="section-header">
            <span className="section-label">Kontakt</span>
            <h2 className="section-title">Nehmen Sie Kontakt mit uns auf</h2>
            <p className="section-description">Haben Sie Fragen zu unseren Leistungen oder möchten Sie einen persönlichen Termin vereinbaren? Wir freuen uns auf Ihre Kontaktaufnahme.</p>
          </div>

          <div className="contact-grid">
            <div className="contact-info">
              <h2>Kontaktieren Sie uns</h2>
              <p>Vereinbaren Sie noch heute einen Termin für eine kostenlose Erstberatung. Wir freuen uns auf Ihre Kontaktaufnahme.</p>
              
              <ul className="contact-details">
                <li className="contact-item">
                  <div className="contact-icon">📍</div>
                  <div>
                    <h4>Adresse</h4>
                    <p>Missionsstraße 24<br />4055 Basel, Schweiz</p>
                  </div>
                </li>
                <li className="contact-item">
                  <div className="contact-icon">📞</div>
                  <div>
                    <h4>Telefon</h4>
                    <p>+41 7844 47970</p>
                  </div>
                </li>
                <li className="contact-item">
                  <div className="contact-icon">✉️</div>
                  <div>
                    <h4>E-Mail</h4>
                    <p>Thomas@hornungconsulting.ch</p>
                  </div>
                </li>
              </ul>
            </div>

            <form className="contact-form" onSubmit={handleSubmit} noValidate>
              <div className="form-group">
                <label htmlFor="name">Name *</label>
                <input 
                  type="text" 
                  id="name" 
                  placeholder="Ihr Name" 
                  value={formData.name}
                  onChange={handleInputChange}
                  className={formErrors.name ? 'input-error' : ''}
                />
                {formErrors.name && <span className="error-text">{formErrors.name}</span>}
              </div>
              <div className="form-group">
                <label htmlFor="email">E-Mail *</label>
                <input 
                  type="email" 
                  id="email" 
                  placeholder="Ihre E-Mail-Adresse" 
                  value={formData.email}
                  onChange={handleInputChange}
                  className={formErrors.email ? 'input-error' : ''}
                />
                {formErrors.email && <span className="error-text">{formErrors.email}</span>}
              </div>
              <div className="form-group">
                <label htmlFor="phone">Telefon</label>
                <input 
                  type="tel" 
                  id="phone" 
                  placeholder="Ihre Telefonnummer" 
                  value={formData.phone}
                  onChange={handleInputChange}
                  className={formErrors.phone ? 'input-error' : ''}
                />
                {formErrors.phone && <span className="error-text">{formErrors.phone}</span>}
              </div>
              <div className="form-group">
                <label htmlFor="message">Nachricht *</label>
                <textarea 
                  id="message" 
                  placeholder="Ihre Nachricht an uns"
                  value={formData.message}
                  onChange={handleInputChange}
                  className={formErrors.message ? 'input-error' : ''}
                ></textarea>
                {formErrors.message && <span className="error-text">{formErrors.message}</span>}
              </div>
              
              {formStatus === 'success' && (
                <div className="form-message success">
                  Vielen Dank! Ihre Nachricht wurde erfolgreich gesendet.
                </div>
              )}
              
              {formStatus === 'error' && (
                <div className="form-message error">
                  Leider ist ein Fehler aufgetreten. Bitte versuchen Sie es erneut.
                </div>
              )}
              
              <button 
                type="submit" 
                className="btn btn-submit"
                disabled={formStatus === 'loading'}
              >
                {formStatus === 'loading' ? 'Wird gesendet...' : 'Nachricht senden'}
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-grid">
            <div className="footer-brand">
              <a href="#" className="logo">
                <img src="/images/Logo in maroon.jpg.jpeg" alt="Logo" className="logo-image" />
                <span className="logo-text">HORNUNG BUSINESS & TAX CONSULTING</span>
              </a>
              <p>Ihr professionelles Beratungsunternehmen für Steuer, Recht und Betriebswirtschaft in Basel.</p>
            </div>
            
            <div className="footer-column">
              <h4>Leistungen</h4>
              <ul className="footer-links">
                <li><a href="#services">Steuererklärungen</a></li>
                <li><a href="#services">Steuerberatung</a></li>
                <li><a href="#services">Buchhaltung</a></li>
                <li><a href="#services">Unternehmensgründung</a></li>
              </ul>
            </div>
            
            <div className="footer-column">
              <h4>Unternehmen</h4>
              <ul className="footer-links">
                <li><a href="#approach">Ansatz</a></li>
                <li><a href="#about">Über uns</a></li>
                <li><a href="#contact">Kontakt</a></li>
              </ul>
            </div>
            
            <div className="footer-column">
              <h4>Kontakt</h4>
              <ul className="footer-links">
                <li><a href="tel:+417844 47970">+41 7844 47970</a></li>
                <li><a href="mailto:Thomas@hornungconsulting.ch">Thomas@hornungconsulting.ch</a></li>
                <li>Missionsstraße 24</li>
                <li>4055 Basel, Schweiz</li>
              </ul>
            </div>
          </div>
          
          <div className="footer-bottom">
            <p>© 2026 HORNUNG BUSINESS & TAX CONSULTING. Alle Rechte vorbehalten.</p>
            <p className="footer-powered">Powered by Thetechlift and Trendzomedia</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
