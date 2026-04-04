document.addEventListener('DOMContentLoaded', () => {
  // Mobile Navigation Toggle
  const navToggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');

  if (navToggle) {
    navToggle.addEventListener('click', () => {
      navToggle.classList.toggle('open');
      navLinks.classList.toggle('nav-open');
    });
  }

  // Active Navigation Link Highlighting
  const currentLocation = location.pathname;
  const navItems = document.querySelectorAll('.nav-links a');
  
  navItems.forEach(link => {
    // Check if the link's href matches the current path.
    // Allow for index.html mapping to root
    if (link.getAttribute('href') === currentLocation || 
        (currentLocation === '/' && link.getAttribute('href') === 'index.html') ||
        (currentLocation.endsWith(link.getAttribute('href')))) {
      link.classList.add('active');
    }
  });

  // Intersection Observer for Fade-in Animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target); // Run once
      }
    });
  }, observerOptions);

  const fadeElements = document.querySelectorAll('.fade-in');
  fadeElements.forEach(el => observer.observe(el));

  // Dynamic Typing Effect (Only run if the element exists, e.g. on index.html)
  const subtitleEl = document.querySelector('.hero-content .subtitle');
  if (subtitleEl) {
    const titles = ["CSE Student", "Web Developer", "IoT Programmer"];
    let titleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    
    function typeEffect() {
      const currentTitle = titles[titleIndex];
      
      if (isDeleting) {
        subtitleEl.textContent = currentTitle.substring(0, charIndex - 1);
        charIndex--;
      } else {
        subtitleEl.textContent = currentTitle.substring(0, charIndex + 1);
        charIndex++;
      }
      
      let typeSpeed = isDeleting ? 50 : 100;
      
      if (!isDeleting && charIndex === currentTitle.length) {
        typeSpeed = 2000; // Pause at end of word
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        titleIndex = (titleIndex + 1) % titles.length;
        typeSpeed = 500; // Pause before new word
      }
      
      setTimeout(typeEffect, typeSpeed);
    }
    
    // Start effect
    setTimeout(typeEffect, 1000);
  }
});
