import { useEffect, useState } from 'react';
import './App.css';

function App() {
  // 1. MOBILE MENU LOGIC (This makes the 3 lines work!)
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // 2. CONTACT FORM EMAIL LOGIC
  const [result, setResult] = useState("");

  const onSubmit = async (event) => {
    event.preventDefault();
    setResult("Sending...");
    
    const formData = new FormData(event.target);
    
    // 🛑 PASTE YOUR WEB3FORMS ACCESS KEY HERE 🛑
    formData.append("access_key", "cc0a174c-9f49-4e3f-906f-9ddbd8aba587");
    formData.append("subject", "New Lead from StoryHouse Website!");

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData
    });

    const data = await response.json();

    if (data.success) {
      setResult("Message Sent Successfully!");
      event.target.reset();
      setTimeout(() => setResult(""), 5000);
    } else {
      console.log("Error", data);
      setResult(data.message);
    }
  };

  useEffect(() => {
    // PRELOADER
    const preloader = document.querySelector('.preloader');
    const progressFill = document.querySelector('.progress-fill');
    let progress = 0;
    if (preloader && progressFill) {
      const interval = setInterval(() => {
        progress += Math.random() * 15;
        if (progress >= 100) {
          progress = 100;
          clearInterval(interval);
          setTimeout(() => {
            preloader.classList.add('loaded');
            document.body.style.overflow = 'visible';
          }, 500);
        }
        progressFill.style.width = `${progress}%`;
      }, 150);
      setTimeout(() => {
        preloader.classList.add('loaded');
        document.body.style.overflow = 'visible';
      }, 3000);
    }

    // CUSTOM CURSOR
    const cursor = document.querySelector('.cursor');
    const follower = document.querySelector('.cursor-follower');
    if (cursor && follower && !('ontouchstart' in window)) {
      let mouseX = 0, mouseY = 0, cursorX = 0, cursorY = 0, followerX = 0, followerY = 0;
      document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
      });
      const animateCursor = () => {
        cursorX += (mouseX - cursorX) * 0.2;
        cursorY += (mouseY - cursorY) * 0.2;
        cursor.style.left = `${cursorX}px`;
        cursor.style.top = `${cursorY}px`;
        followerX += (mouseX - followerX) * 0.1;
        followerY += (mouseY - followerY) * 0.1;
        follower.style.left = `${followerX}px`;
        follower.style.top = `${followerY}px`;
        requestAnimationFrame(animateCursor);
      };
      animateCursor();

      const interactiveElements = document.querySelectorAll('a, button, .work-item, .service-card, .nav-toggle');
      interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
          follower.classList.add('hover');
          cursor.style.transform = 'scale(1.5)';
        });
        el.addEventListener('mouseleave', () => {
          follower.classList.remove('hover');
          cursor.style.transform = 'scale(1)';
        });
      });
    }

    // HEADER SCROLL
    const header = document.querySelector('.header');
    const handleScroll = () => {
      if (window.scrollY > 100) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    };
    window.addEventListener('scroll', handleScroll);

    // SCROLL ANIMATIONS
    const animatedElements = document.querySelectorAll('[data-animate]');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          const delay = entry.target.dataset.delay || index * 100;
          setTimeout(() => {
            entry.target.classList.add('animated');
          }, delay);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    
    animatedElements.forEach((el, index) => {
      el.dataset.delay = (index % 6) * 100;
      observer.observe(el);
    });

    // STATS COUNTER
    const stats = document.querySelectorAll('.stat-number');
    const countObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const target = entry.target;
          const countTo = parseInt(target.getAttribute('data-count'));
          let count = 0;
          const duration = 2000;
          const increment = countTo / (duration / 16); 
          
          const updateCount = () => {
            count += increment;
            if (count < countTo) {
              target.innerText = Math.floor(count);
              requestAnimationFrame(updateCount);
            } else {
              target.innerText = countTo;
            }
          };
          updateCount();
          countObserver.unobserve(target);
        }
      });
    }, { threshold: 0.5 });

    stats.forEach(stat => countObserver.observe(stat));

  }, []);

  return (
    <>
      <a href="#main-content" className="skip-link">Skip to main content</a>

      <div className="preloader">
        <div className="preloader-content">
          <div className="fox-logo">
            <img src="assets/images/Logo_Black_TP.webp" alt="Storyhouse Logo" className="preloader-img" />
          </div>
          <div className="progress-bar">
            <div className="progress-fill"></div>
          </div>
          <div className="loading-text">Loading...</div>
        </div>
      </div>

      <div className="cursor"></div>
      <div className="cursor-follower"></div>

      <header className="header">
        <nav className="navbar" role="navigation" aria-label="Main navigation">
          <div className="logo">
            <a href="#" aria-label="StoryHouse home">
              <img src="assets/images/Cropped_Logo_Black_TP.webp" alt="StoryHouse Logo" className="nav-logo-img" />
            </a>
          </div>
          
          {/* THE NEW REACT MOBILE MENU BUTTON */}
          <div 
            className={`nav-toggle ${isMenuOpen ? 'active' : ''}`} 
            id="navToggle" 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </div>
          
          <ul className={`nav-menu ${isMenuOpen ? 'active' : ''}`}>
            <li><a href="#home" className="nav-link active" onClick={() => setIsMenuOpen(false)}>Home</a></li>
            <li><a href="#about" className="nav-link" onClick={() => setIsMenuOpen(false)}>Who We Are</a></li>
            <li><a href="#services" className="nav-link" onClick={() => setIsMenuOpen(false)}>Services</a></li>
            <li><a href="#work" className="nav-link" onClick={() => setIsMenuOpen(false)}>Work</a></li>
            <li><a href="#process" className="nav-link" onClick={() => setIsMenuOpen(false)}>Process</a></li>
            <li><a href="#contact" className="nav-link" onClick={() => setIsMenuOpen(false)}>Connect</a></li>
          </ul>

          <div className="nav-social">
            <a href="https://www.linkedin.com/company/thestoryhousein/" target="_blank" rel="noreferrer" className="social-icon"><i className="fab fa-linkedin-in"></i></a>
          </div>
        </nav>
      </header>

      <main id="main-content">
        <section className="hero" id="home">
          <div className="hero-bg">
            <div className="gradient-overlay"></div>
            <div className="noise-overlay"></div>
          </div>
          <div className="hero-content">
            <div className="hero-text">
              <div className="hero-tagline">Creative Studio</div>
              
              {/* THE FIXED WORDS WITH HARD SPACES (&nbsp;) */}
              <h1 className="hero-title">
                <span className="line">
                  <span className="word" data-delay="0">We</span>
                  <span style={{ display: 'inline-block', width: '0.3em' }}></span>
                  <span className="word" data-delay="1">Create</span>
                </span>
                <span className="line">
                  <span className="word highlight" data-delay="2">Digital</span>
                  <span style={{ display: 'inline-block', width: '0.3em' }}></span>
                  <span className="word" data-delay="3">Stories</span>
                </span>
              </h1>
              
              <p className="hero-subtitle">
                <span className="subtitle-line">Turning brand storytelling into a</span>
                <span className="subtitle-line">predictable revenue engine</span>
                <span className="subtitle-line">for growing D2C brands.</span>
              </p>
              <div className="hero-cta-group">
                <a href="#work" className="cta-button">
                  <span className="btn-text">View Our Work</span>
                  <span className="btn-icon"><i className="fas fa-arrow-right"></i></span>
                </a>
                <a href="#contact" className="cta-button secondary">
                  <span className="btn-text">Get in Touch</span>
                </a>
              </div>
            </div>
            <div className="hero-visual">
              <div className="floating-shapes">
                <div className="shape shape-1"></div>
                <div className="shape shape-2"></div>
                <div className="shape shape-3"></div>
                <div className="shape shape-4"></div>
              </div>
              <div className="hero-image-box" style={{ border: '3px solid var(--accent-rose)' }}>
                <img src="assets/images/arooj_meeting_room.webp" alt="Creative video production" />
                <div className="hero-image-overlay"></div>
              </div>
              <div className="hero-image-box secondary">
                <img src="https://images.unsplash.com/photo-1542744094-3a31f272c490?w=600&q=100&auto=format" alt="Creative direction and storytelling" />
              </div>
            </div>
          </div>
          <div className="scroll-indicator">
            <div className="mouse">
              <div className="wheel"></div>
            </div>
            <span>Scroll Down</span>
          </div>
        </section>

        <section className="about" id="about">
          <div className="container">
            <div className="section-header">
              <span className="section-tag">Who We Are</span>
              <h2 className="section-title">
                <span className="title-line">Built for</span>
                <span className="title-line highlight">D2C Brands</span>
              </h2>
            </div>
            <div className="about-content">
              <div className="about-text">
                <p className="lead-text" data-animate="true">
                  StoryHouse is a Creative Ad & Brand Content Studio built to help modern D2C brands achieve 
                  <span className="text-highlight"> narrative clarity</span> and 
                  <span className="text-highlight"> paid growth</span>.
                </p>
                <p data-animate="true">
                  We design and produce structured ad creatives and storytelling systems. Modern D2C brands need more than just content—they need structured ad creatives that reduce fatigue, consistent brand storytelling across platforms, and launch campaigns with clear creative direction. We build systems that perform.
                </p>
                <div className="stats-grid" data-animate="true">
                  <div className="stat-item">
                    <span className="stat-number" data-count="50">0</span>
                    <span className="stat-label">Brand Campaigns</span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-number" data-count="20">0</span>
                    <span className="stat-label">D2C Partners</span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-number" data-count="4">0</span>
                    <span className="stat-label">Core Services</span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-number" data-count="100">0</span>
                    <span className="stat-label">Ad Variations Tested</span>
                  </div>
                </div>
              </div>
              <div className="about-image">
                <div className="image-wrapper" data-animate="true">
                  <video src="assets/videos/brand_campaign_shoot.mp4" className="about-img" autoPlay loop muted playsInline></video>
                  <div className="image-decoration"></div>
                </div>
              </div>
            </div>
          </div>
          <div className="parallax-bg">
            <div className="parallax-shape shape-circle"></div>
            <div className="parallax-shape shape-square"></div>
          </div>
        </section>

        <section className="clients">
          <div className="container">
            <div className="clients-header">
              <span className="section-tag">Brands We Have Worked For</span>
              <p>Trusted by India's fastest-growing modern brands</p>
            </div>
            <div className="clients-logos">
              <div className="client-logo" style={{ fontFamily: 'var(--font-mono)', fontSize: '1.2rem', fontWeight: 'bold', color: 'var(--light-gray)' }}>Purely Yours</div>
              <div className="client-logo" style={{ fontFamily: 'var(--font-mono)', fontSize: '1.2rem', fontWeight: 'bold', color: 'var(--light-gray)' }}>Pilgrim</div>
              <div className="client-logo" style={{ fontFamily: 'var(--font-mono)', fontSize: '1.2rem', fontWeight: 'bold', color: 'var(--light-gray)' }}>The Whole Truth</div>
              <div className="client-logo" style={{ fontFamily: 'var(--font-mono)', fontSize: '1.2rem', fontWeight: 'bold', color: 'var(--light-gray)' }}>Mokobara</div>
              <div className="client-logo" style={{ fontFamily: 'var(--font-mono)', fontSize: '1.2rem', fontWeight: 'bold', color: 'var(--light-gray)' }}>Snitch</div>
              <div className="client-logo" style={{ fontFamily: 'var(--font-mono)', fontSize: '1.2rem', fontWeight: 'bold', color: 'var(--light-gray)' }}>Kama Ayurveda</div>
            </div>
          </div>
        </section>

        <section className="services" id="services">
          <div className="container">
            <div className="section-header center">
              <span className="section-tag">What We Do</span>
              <h2 className="section-title">
                <span className="title-line">Our Core</span>
                <span className="title-line highlight">Service Pillars</span>
              </h2>
            </div>
            <div className="services-grid">
              <div className="service-card" data-animate="true">
                <div className="service-image">
                  <img src="assets/images/brand_ad_shoot.webp" loading="lazy" alt="Ad Creative Studio" />
                </div>
                <div className="service-icon"><i className="fas fa-video"></i></div>
                <h3 className="service-title">Ad Creative Studio</h3>
                <p className="service-desc">Creative systems designed for paid social performance. We build creative strategy, script banks, hook variations, and handle full creative production from model sourcing to post-production.</p>
                <a href="#contact" className="service-link">
                  <span>Learn More</span>
                  <i className="fas fa-arrow-right"></i>
                </a>
              </div>
              <div className="service-card" data-animate="true">
                <div className="service-image">
                  <img src="assets/images/home_shoot_.webp" loading="lazy" alt="Brand Content Retainer" />
                </div>
                <div className="service-icon"><i className="fas fa-mobile-alt"></i></div>
                <h3 className="service-title">Brand Content Retainer</h3>
                <p className="service-desc">A structured content system for consistent brand presence. We provide monthly content calendars, short-form video scripts, creative direction, and founder content strategies.</p>
                <a href="#contact" className="service-link">
                  <span>Learn More</span>
                  <i className="fas fa-arrow-right"></i>
                </a>
              </div>
              <div className="service-card" data-animate="true">
                <div className="service-image">
                  <img src="assets/images/IMG_9344.webp" loading="lazy" alt="Campaign & Launch Studio" />
                </div>
                <div className="service-icon"><i className="fas fa-bullhorn"></i></div>
                <h3 className="service-title">Campaign & Launch Studio</h3>
                <p className="service-desc">Narrative-driven campaigns designed for product launches & brand awareness. Includes messaging architecture, script & storyboard development, and optional full brand film production.</p>
                <a href="#contact" className="service-link">
                  <span>Learn More</span>
                  <i className="fas fa-arrow-right"></i>
                </a>
              </div>
              <div className="service-card" data-animate="true">
                <div className="service-image">
                  <img src="assets/images/shoot_at_studio.webp" alt="Technical Content Stack" />
                </div>
                <div className="service-icon"><i className="fas fa-laptop-code"></i></div>
                <h3 className="service-title">Technical Content Stack</h3>
                <p className="service-desc">Search and web content that strengthens brand visibility and discovery. Deliverables include SEO blogs, conversion-focused landing page copy, and LinkedIn profile management for founders.</p>
                <a href="#contact" className="service-link">
                  <span>Learn More</span>
                  <i className="fas fa-arrow-right"></i>
                </a>
              </div>
            </div>
          </div>
        </section>

        <section className="work" id="work">
          <div className="container">
            <div className="section-header">
              <span className="section-tag">Portfolio</span>
              <h2 className="section-title">
                <span className="title-line">Latest</span>
                <span className="title-line highlight">Campaigns</span>
              </h2>
            </div>
            <div className="work-grid">
              <div className="work-item large" data-animate="true">
                <div className="work-image">
                  <img src="assets/images/arooj_cafe_meeting.webp" alt="GoodEats Nutrition Campaign" />
                </div>
                <div className="work-overlay">
                  <div className="work-content">
                    <span className="work-category">Content & Web Strategy</span>
                    <h3 className="work-title">GoodEats Nutrition</h3>
                    <p className="work-desc">Developing structured social media concepts and comprehensive website positioning to strengthen digital growth.</p>
                    <a href="#contact" className="work-link">View Case Study <i className="fas fa-arrow-right"></i></a>
                  </div>
                </div>
              </div>
              <div className="work-item" data-animate="true">
                <div className="work-image">
                  <img src="assets/images/brand_product_shoot.webp" alt="Mokobara Brand Content" />
                </div>
                <div className="work-overlay">
                  <div className="work-content">
                    <span className="work-category">Brand Content</span>
                    <h3 className="work-title">Mokobara</h3>
                    <p className="work-desc">Consistent brand storytelling to elevate visual presence.</p>
                    <a href="#contact" className="work-link">View Case Study <i className="fas fa-arrow-right"></i></a>
                  </div>
                </div>
              </div>
              <div className="work-item" data-animate="true">
                <div className="work-image">
                  <img src="assets/images/brand_content_alignment.webp" alt="Purely Yours Ad Creative" />
                </div>
                <div className="work-overlay">
                  <div className="work-content">
                    <span className="work-category">Ad Creative</span>
                    <h3 className="work-title">Purely Yours</h3>
                    <p className="work-desc">Creative systems optimized for paid social performance.</p>
                    <a href="#contact" className="work-link">View Case Study <i className="fas fa-arrow-right"></i></a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="team">
          <div className="container">
            <div className="section-header center">
              <span className="section-tag">Leadership</span>
              <h2 className="section-title">
                <span className="title-line">Meet the</span>
                <span className="title-line highlight">Team</span>
              </h2>
            </div>
            <div className="team-grid">
              <div className="team-member" data-animate="true">
                <div className="member-image">
                  <img src="assets/images/Arooj Image.webp" alt="Arooj Zeba" />
                </div>
                <div className="member-info">
                  <h4 className="member-name">Arooj Zeba</h4>
                  <span className="member-role">Founder, StoryHouse</span>
                </div>
              </div>
              <div className="team-member" data-animate="true">
                <div className="member-image">
                  <img src="assets/images/Aafreen-Bhati-Creative-Director1.webp" alt="Creative Director" />
                </div>
                <div className="member-info">
                  <h4 className="member-name">Aafreen Bhati</h4>
                  <span className="member-role">Creative Director</span>
                </div>
              </div>
              <div className="team-member" data-animate="true">
                <div className="member-image">
                  <img src="assets/images/Rahul-Singh-Head-Production1.webp" alt="Production Head" />
                </div>
                <div className="member-info">
                  <h4 className="member-name">Rahul Singh</h4>
                  <span className="member-role">Head of Production</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="awards" id="process">
          <div className="container">
            <div className="section-header center">
              <span className="section-tag">How We Work</span>
              <h2 className="section-title">
                <span className="title-line">Our Creative</span>
                <span className="title-line highlight">Strategy Process</span>
              </h2>
              <p style={{ color: 'var(--light-gray)', marginTop: '1rem', maxWidth: '600px', marginInline: 'auto' }}>
                A research-led approach designed for brands operating in complex advertising environments.
              </p>
            </div>
            <div className="news-grid">
              <div className="news-card" data-animate="true">
                <div className="news-date">STEP 1</div>
                <h3 className="news-title">Brand & Market Discovery</h3>
                <p className="news-excerpt">Understanding the brand, audience, product ecosystem, and your specific growth goals.</p>
              </div>
              <div className="news-card" data-animate="true">
                <div className="news-date">STEP 2</div>
                <h3 className="news-title">Category & Platform Research</h3>
                <p className="news-excerpt">Deep research into the competitive landscape and specific platform policies.</p>
              </div>
              <div className="news-card" data-animate="true">
                <div className="news-date">STEP 3</div>
                <h3 className="news-title">Creative Strategy Blueprint</h3>
                <p className="news-excerpt">Designing a structured creative roadmap tailored to your brand's narrative.</p>
              </div>
              <div className="news-card" data-animate="true">
                <div className="news-date">STEP 4</div>
                <h3 className="news-title">Content & Ad Production</h3>
                <p className="news-excerpt">Execution of the defined creative system to produce ad-ready formats and content.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="contact" id="contact">
          <div className="container">
            <div className="contact-wrapper">
              <div className="contact-info">
                <div className="section-header">
                  <span className="section-tag">Get in Touch</span>
                  <h2 className="section-title">
                    <span className="title-line">Let's Build</span>
                    <span className="title-line highlight">Your System</span>
                  </h2>
                </div>
                <p className="contact-desc">Ready to build your brand's next creative system? Drop us a line and let's create something extraordinary together.</p>
                <div className="contact-details">
                  <div className="contact-item">
                    <i className="fas fa-envelope"></i>
                    <a href="mailto:hello@StoryHouseagency.in">hello@StoryHouseAgency.in</a>
                  </div>
                </div>
                <div className="social-links" style={{ marginTop: '2rem' }}>
                  <a href="https://www.linkedin.com/company/thestoryhousein/" target="_blank" rel="noreferrer" className="social-link"><i className="fab fa-linkedin-in"></i></a>
                </div>
              </div>
              <div className="contact-form-wrapper">
                <form className="contact-form" id="contactForm" onSubmit={onSubmit}>
                  <div className="form-row">
                    <div className="form-group">
                      <input type="text" id="name" name="name" required />
                      <label htmlFor="name">Your Name</label>
                      <span className="focus-border"></span>
                    </div>
                    <div className="form-group">
                      <input type="email" id="email" name="email" required />
                      <label htmlFor="email">Work Email</label>
                      <span className="focus-border"></span>
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <input type="text" id="company" name="company" required />
                      <label htmlFor="company">Company Name</label>
                      <span className="focus-border"></span>
                    </div>
                    <div className="form-group">
                      <input type="tel" id="phone" name="phone" />
                      <label htmlFor="phone">Phone (Optional)</label>
                      <span className="focus-border"></span>
                    </div>
                  </div>
                  <div className="form-group">
                    <select id="service" name="service" required defaultValue="">
                      <option value="" disabled></option>
                      <option value="ads">Ad Creative Studio</option>
                      <option value="retainer">Brand Content Retainer</option>
                      <option value="launch">Campaign & Launch Studio</option>
                      <option value="technical">Technical Content Stack</option>
                      <option value="other">Other</option>
                    </select>
                    <label htmlFor="service">What are you looking for?</label>
                    <span className="focus-border"></span>
                  </div>
                  <div className="form-group">
                    <textarea id="message" name="message" rows="4" required></textarea>
                    <label htmlFor="message">Tell us about your project</label>
                    <span className="focus-border"></span>
                  </div>
                  <button type="submit" className="submit-btn">
                    <span className="btn-text">Send Message</span>
                    <span className="btn-icon"><i className="fas fa-paper-plane"></i></span>
                  </button>

                  <span style={{ display: 'block', marginTop: '1rem', fontFamily: 'var(--font-mono)', color: 'var(--accent-rose)' }}>{result}</span>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-brand">
              <div className="footer-logo">
                <img src="assets/images/Cropped_Logo_Black_TP.webp" alt="StoryHouse Logo" className="nav-logo-img" />
              </div>
              <p className="footer-tagline">A Creative Ad & Brand Content Studio turning storytelling into a predictable revenue engine for D2C brands.</p>
            </div>
            <div className="footer-links">
              <div className="footer-column">
                <h4>Company</h4>
                <ul>
                  <li><a href="#home">Home</a></li>
                  <li><a href="#about">Who We Are</a></li>
                  <li><a href="#work">Our Work</a></li>
                  <li><a href="#contact">Contact</a></li>
                </ul>
              </div>
              <div className="footer-column">
                <h4>Services</h4>
                <ul>
                  <li><a href="#services">Ad Creative Studio</a></li>
                  <li><a href="#services">Content Retainer</a></li>
                  <li><a href="#services">Campaign Launch</a></li>
                  <li><a href="#services">Content Stack</a></li>
                </ul>
              </div>
              <div className="footer-column">
                <h4>Connect</h4>
                <ul>
                  <li><a href="https://www.linkedin.com/company/thestoryhousein/" target="_blank" rel="noreferrer">LinkedIn</a></li>
                </ul>
              </div>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; 2026 StoryHouse. All rights reserved.</p>
            <div className="footer-legal">
              <a href="/privacy.html" target="_blank" rel="noopener noreferrer">Privacy Policy</a>
              <a href="/terms.html" target="_blank" rel="noopener noreferrer">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}

export default App;