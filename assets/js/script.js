  document.addEventListener('DOMContentLoaded', function() {
  const loadingScreen = document.getElementById('loadingScreen');
  
  setTimeout(function() {
    document.body.classList.add('loaded');
    loadingScreen.style.opacity = '0';
    setTimeout(function() {
      loadingScreen.remove();
    }, 500);
  }, 3000);
});


const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
    }
  });
}, {
  threshold: 0.2,
});

document.querySelectorAll(".fade-in").forEach(el => observer.observe(el));
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('show');
});

const navLinkItems = document.querySelectorAll('.nav-links a');
navLinkItems.forEach(link => {
  link.addEventListener('click', () => {
    if (navLinks.classList.contains('show')) {
      navLinks.classList.remove('show');
    }
  });
});

document.addEventListener('click', (event) => {
  if (
    navLinks.classList.contains('show') &&
    !navLinks.contains(event.target) &&
    !hamburger.contains(event.target)
  ) {
    navLinks.classList.remove('show');
  }
});

window.addEventListener('scroll', () => {
  if (navLinks.classList.contains('show')) {
    navLinks.classList.remove('show');
  }
});



window.onload = function () {
  gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

  gsap.from(".quote-icon-left", {
    x: -200,
    y: -100,
    opacity: 0,
    duration: 1.5,
    ease: "power3.out",
    scrollTrigger: {
      trigger: ".textContent",
      start: "top center",
      toggleActions: "play none none none",
      // markers: true
    }
  });

    gsap.from(".quote-icon-right", {
    y: 100,
    opacity: 0,
    scale: 0.5,
    duration: 1.5,
    ease: "power3.out",
    scrollTrigger: {
      trigger: ".textContent",
      start: "top center",
      toggleActions: "play none none none",
      // markers: true
    }
  });


    gsap.from(".Quote-icon-left", {
    x: -200,
    y: -100,
    opacity: 0,
    scale: 0.5,
    duration: 1.5,
    ease: "power3.out",
    scrollTrigger: {
      trigger: ".textkontent",
      start: "top center",
      toggleActions: "play none none none",
      // markers: true
    }
  });

    gsap.from(".Quote-icon-right", {
      x:100,
      y: 100,
    opacity: 0,
    scale: 0.5,
    duration: 1.5,
    ease: "power3.out",
    scrollTrigger: {
      trigger: ".textkontent",
      start: "top center",
      toggleActions: "play none none none",
      // markers: true
    }
  });

}



document.addEventListener('DOMContentLoaded', function() {
  const carousel = document.getElementById('carousel');
  const items = carousel.querySelectorAll('.carousel-item');
  const dots = document.querySelectorAll('.dot');
  let currentIndex = 0;
  let autoScrollInterval;
  let isScrolling = false;
  let touchStartX = 0;
  let touchEndX = 0;
  
  // Initialize the carousel
  function initCarousel() {
    updateActiveSlide(currentIndex);
    startAutoScroll();
    
    // Dot navigation
    dots.forEach((dot, index) => {
      dot.addEventListener('click', () => {
        goToSlide(index);
      });
    });
    
    // Pause on interaction
    carousel.addEventListener('mouseenter', pauseAutoScroll);
    carousel.addEventListener('touchstart', handleTouchStart);
    carousel.addEventListener('touchend', handleTouchEnd);
    carousel.addEventListener('mouseleave', resumeAutoScroll);
  }
  
  // Touch event handlers
  function handleTouchStart(e) {
    pauseAutoScroll();
    touchStartX = e.changedTouches[0].screenX;
  }
  
  function handleTouchEnd(e) {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
    resumeAutoScroll();
  }
  
  function handleSwipe() {
    const threshold = 50; // Minimum swipe distance to trigger slide change
    
    if (touchEndX < touchStartX - threshold) {
      // Swipe left - next slide
      nextSlide();
    } else if (touchEndX > touchStartX + threshold) {
      // Swipe right - previous slide
      prevSlide();
    }
  }
  
  // Move to previous slide
  function prevSlide() {
    const prevIndex = (currentIndex - 1 + items.length) % items.length;
    goToSlide(prevIndex);
  }
  
  // Update active slide and dots
  function updateActiveSlide(index) {
    items.forEach((item, i) => {
      item.classList.remove('active', 'blur-left', 'blur-right');
      
      if (i === index) {
        item.classList.add('active');
      } else if (i === index - 1 || (index === 0 && i === items.length - 1)) {
        item.classList.add('blur-left');
      } else if (i === index + 1 || (index === items.length - 1 && i === 0)) {
        item.classList.add('blur-right');
      }
    });
    
    dots.forEach((dot, i) => {
      dot.classList.toggle('active', i === index);
    });
  }
  
  // Scroll to specific slide
  function goToSlide(index) {
    if (isScrolling) return;
    
    currentIndex = index;
    isScrolling = true;
    
    const item = items[index];
    const container = carousel;
    const itemWidth = item.offsetWidth;
    const containerWidth = container.offsetWidth;
    const scrollLeft = item.offsetLeft - (containerWidth - itemWidth) / 2;
    
    container.scrollTo({
      left: scrollLeft,
      behavior: 'smooth'
    });
    
    updateActiveSlide(currentIndex);
    
    // Reset scrolling flag after animation completes
    setTimeout(() => {
      isScrolling = false;
    }, 1000);
  }
  
  // Move to next slide
  function nextSlide() {
    const nextIndex = (currentIndex + 1) % items.length;
    goToSlide(nextIndex);
  }
  
  // Start auto-scroll
  function startAutoScroll() {
    autoScrollInterval = setInterval(nextSlide, 3000);
  }
  
  // Pause auto-scroll
  function pauseAutoScroll() {
    clearInterval(autoScrollInterval);
  }
  
  // Resume auto-scroll
  function resumeAutoScroll() {
    pauseAutoScroll();
    startAutoScroll();
  }
  
  // Initialize responsive images
  function initResponsiveImages() {
    const squadImages = document.querySelectorAll('.carousel-item img');
    const isMobile = window.innerWidth <= 768;
    
    squadImages.forEach(img => {
      const newSrc = isMobile ? img.dataset.mobileSrc : img.dataset.desktopSrc;
      if (newSrc && img.src !== newSrc) {
        img.src = newSrc;
      }
    });
  }
  
  // Initialize everything
  initCarousel();
  initResponsiveImages();
  
  // Handle window resize
  window.addEventListener('resize', function() {
    initResponsiveImages();
  });
});








gsap.registerPlugin(ScrollTrigger);

function animateJerseyShine() {
    document.querySelectorAll('.jersey-shine .shine-overlay').forEach((shine, idx) => {
      gsap.set(shine, { opacity: 0.65, x: '-140%' });
      gsap.to(shine, {
        x: '120%',
        duration: 3.5,
        ease: 'power2.inOut',
        repeat: -1,
        delay: idx * 0.5,
        opacity: 0.85,
        onStart: () => gsap.set(shine, { opacity: 0.85 }),
        onRepeat: () => gsap.set(shine, { opacity: 0.85, x: '-140%' })
      });
    });
  }
  
  function animateJerseyScrollIn() {
    document.querySelectorAll('.jersey-card').forEach(card => {
      card.style.opacity = '0';
      card.style.transform = 'translateY(60px) scale(0.92) rotateY(25deg)';
    });
    gsap.to('.jersey-card', {
      opacity: 1,
      y: 0,
      scale: 1,
      rotateY: 0,
      duration: 1.3,
      ease: 'power2.out', 
      stagger: 0.18,
      scrollTrigger: {
        trigger: '.jersey-section',
        start: 'top 80%',
        once: true
      },
      onStart: () => { console.log('Jersey 3D bounce scroll animation triggered'); }
    });
  }
  
  function addJerseyCardHoverEffect() {
    document.querySelectorAll('.jersey-card').forEach(card => {
      card.addEventListener('mouseenter', () => {
        gsap.to(card, {
          scale: 1.05,
          duration: 0.3,
          ease: 'power2.out',
          zIndex: 10,
          boxShadow: '0 20px 60px 0 rgba(2,62,138,0.25), 0 8px 20px rgba(0,0,0,0.18)'
        });
      });
      card.addEventListener('mouseleave', () => {
        gsap.to(card, {
          scale: 1,
          duration: 0.3,
          ease: 'power2.out',
          zIndex: 2,
          boxShadow: '0 16px 40px 0 rgba(2,62,138,0.25)'
        });
      });
    });
  }
  
  document.addEventListener('DOMContentLoaded', () => {
    animateJerseyShine();
    animateJerseyScrollIn();
    addJerseyCardHoverEffect();
  });