// ========================================
// OPTIMIZED: Consolidated all initialization code
// ========================================

// Cache DOM elements for better performance
let navbar, navMenu, navToggle, navLinks;

// Throttle function for performance optimization
function throttle(func, limit) {
  let inThrottle;
  return function(...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

// ========================================
// Smooth Scroll Handler (Consolidated)
// ========================================
function handleSmoothScroll(e) {
  const href = this.getAttribute('href');
  
  if (href && href.startsWith('#')) {
    e.preventDefault();
    const targetSection = document.querySelector(href);
    
    if (targetSection) {
      const navHeight = 80;
      const elementPosition = targetSection.offsetTop;
      const offsetPosition = elementPosition - navHeight - 20;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      
      // Close mobile menu if open
      if (navMenu && navToggle) {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
      }
    }
  }
}

// ========================================
// Mobile Navigation Toggle
// ========================================
function initMobileNav() {
  if (!navToggle || !navMenu) return;

  navToggle.addEventListener("click", () => {
    navToggle.classList.toggle("active");
    navMenu.classList.toggle("active");
  });

  // Close menu when clicking on a link
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      navToggle.classList.remove("active");
      navMenu.classList.remove("active");
    });
  });

  // Close menu when clicking outside
  document.addEventListener("click", (event) => {
    const isClickInsideNav = navMenu.contains(event.target) || navToggle.contains(event.target);
    if (!isClickInsideNav && navMenu.classList.contains("active")) {
      navToggle.classList.remove("active");
      navMenu.classList.remove("active");
    }
  });
}

// ========================================
// Navbar Background on Scroll (Optimized with throttle)
// ========================================
const handleNavbarScroll = throttle(() => {
  if (!navbar) return;
  
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
}, 100);

// ========================================
// Parallax Effect (Optimized with requestAnimationFrame)
// ========================================
let mouseX = 0.5, mouseY = 0.5;

function updateParallax() {
  const shapes = document.querySelectorAll(".shape");
  shapes.forEach((shape, index) => {
    const speed = (index + 1) * 20;
    const x = (mouseX - 0.5) * speed;
    const y = (mouseY - 0.5) * speed;
    shape.style.transform = `translate(${x}px, ${y}px)`;
  });
}

const handleMouseMove = throttle((e) => {
  mouseX = e.clientX / window.innerWidth;
  mouseY = e.clientY / window.innerHeight;
  requestAnimationFrame(updateParallax);
}, 50);

// ========================================
// Intersection Observer for Animations
// ========================================
function initIntersectionObserver() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -100px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, observerOptions);

  const animatedElements = document.querySelectorAll(".hero-content > *");
  animatedElements.forEach((el) => observer.observe(el));
}

// ========================================
// Profile Image Error Handling
// ========================================
function initProfileImageHandler() {
  const profileImage = document.querySelector(".profile-image");
  if (profileImage) {
    profileImage.addEventListener("error", function () {
      this.style.display = "none";
      const wrapper = this.parentElement;
      const placeholder = document.createElement("div");
      placeholder.className = "profile-placeholder";
      placeholder.textContent = "AK";
      wrapper.appendChild(placeholder);
    });
  }
}

// ========================================
// Dynamic Text Typing Effect (Optimized)
// ========================================
function typeWriter(element, text, speed = 100) {
  if (!element) return;
  
  let i = 0;
  element.textContent = "";

  function type() {
    if (i < text.length) {
      element.textContent += text.charAt(i);
      i++;
      setTimeout(type, speed);
    }
  }

  type();
}

// ========================================
// Main Initialization (Single DOMContentLoaded)
// ========================================
document.addEventListener("DOMContentLoaded", () => {
  // Cache all DOM elements
  navbar = document.querySelector(".navbar");
  navMenu = document.querySelector(".nav-menu");
  navToggle = document.querySelector(".nav-toggle");
  navLinks = document.querySelectorAll(".nav-link");
  
  // Initialize smooth scroll for all anchor links
  const scrollLinks = document.querySelectorAll('a[href^="#"]');
  scrollLinks.forEach(link => link.addEventListener('click', handleSmoothScroll));
  
  // Initialize mobile navigation
  initMobileNav();
  
  // Initialize intersection observer for animations
  initIntersectionObserver();
  
  // Initialize profile image error handler
  initProfileImageHandler();
  
  // Add scroll event listener with throttling
  window.addEventListener("scroll", handleNavbarScroll, { passive: true });
  
  // Add mousemove event listener with throttling
  window.addEventListener("mousemove", handleMouseMove, { passive: true });
});

// ========================================
// Page Load Handler
// ========================================
window.addEventListener("load", () => {
  document.body.classList.add('loaded');
});
