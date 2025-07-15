document.addEventListener('DOMContentLoaded', function () {
  const loadingScreen = document.getElementById('loadingScreen');

  setTimeout(function () {
    document.body.classList.add('loaded');
    loadingScreen.style.opacity = '0';
    setTimeout(function () {
      loadingScreen.remove();
    }, 500);
  }, 2000);
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
    x: 100,
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



document.addEventListener('DOMContentLoaded', function () {
  const carousel = document.getElementById('carousel');
  const items = carousel.querySelectorAll('.carousel-item');
  const dots = document.querySelectorAll('.dot');
  let currentIndex = 0;
  let isUserScrolling = false;
  let autoScrollInterval;
  initResponsiveSquad();
  setupCarousel();

  function setupCarousel() {
    updateActiveSlide(currentIndex);
    dots.forEach((dot, i) => {
      dot.addEventListener('click', () => {
        currentIndex = i;
        scrollToIndex(currentIndex);
        resetAutoScroll();
      });
    });
    startAutoScroll();
    carousel.addEventListener('scroll', handleScroll);
  }

  function updateActiveSlide(index) {
    items.forEach((item, i) => {
      item.classList.remove('active', 'blur-left', 'blur-right');

      if (i === index) {
        item.classList.add('active');
      } else if (i === index - 1) {
        item.classList.add('blur-left');
      } else if (i === index + 1) {
        item.classList.add('blur-right');
      }
    });

    dots.forEach((dot, i) => {
      dot.classList.toggle('active', i === index);
    });
  }

  function scrollToIndex(index) {
    const itemWidth = items[0].offsetWidth + 20;
    carousel.scrollTo({
      left: itemWidth * index,
      behavior: 'smooth'
    });
    updateActiveSlide(index);
  }

  function handleScroll() {
    isUserScrolling = true;
    const scrollLeft = carousel.scrollLeft;
    const itemWidth = items[0].offsetWidth + 20;
    const index = Math.round(scrollLeft / itemWidth);

    if (index !== currentIndex) {
      currentIndex = index;
      updateActiveSlide(currentIndex);
    }

    clearTimeout(carousel._scrollTimeout);
    carousel._scrollTimeout = setTimeout(() => {
      isUserScrolling = false;
    }, 200);
  }

  function startAutoScroll() {
    autoScrollInterval = setInterval(() => {
      if (!isUserScrolling) {
        currentIndex = (currentIndex + 1) % items.length;
        scrollToIndex(currentIndex);
      }
    }, 3000);
  }

  function resetAutoScroll() {
    clearInterval(autoScrollInterval);
    startAutoScroll();
  }
  function updateSquadImages() {
    const squadImages = document.querySelectorAll('.carousel-item img');
    const isMobile = window.innerWidth <= 768;

    squadImages.forEach(img => {
      const newSrc = isMobile ? img.dataset.mobileSrc : img.dataset.desktopSrc;
      if (newSrc && img.src !== newSrc) {
        img.classList.add('loading');
        img.onload = () => img.classList.remove('loading');
        img.src = newSrc;
      }
    });
  }
  function initResponsiveSquad() {
    updateSquadImages();
    window.addEventListener('resize', function () {
      updateSquadImages();
      scrollToIndex(currentIndex);
    });
  }
});








function animateJerseyShine() {
  const shineElements = document.querySelectorAll('.jersey-shine .shine-overlay');
  if (!shineElements.length) {
    console.warn('No shine elements found');
    return;
  }

  shineElements.forEach((shine, idx) => {
    gsap.set(shine, { opacity: 0, x: '-140%' });
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
  const jerseyCards = document.querySelectorAll('.jersey-card');
  if (!jerseyCards.length) {
    console.warn('No jersey cards found');
    return;
  }

  // Reset initial state
  jerseyCards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(60px) scale(0.92) rotateY(25deg)';
  });

  // Check if device is mobile
  const isMobile = window.innerWidth <= 768;

  gsap.to('.jersey-card', {
    opacity: 1,
    y: 0,
    scale: 1,
    rotateY: 0,
    duration: isMobile ? 1.0 : 1.3,
    ease: 'power2.out',
    stagger: isMobile ? 0.12 : 0.18,
    scrollTrigger: {
      trigger: '.jersey-section',
      start: 'top 80%',
      once: true
    },
    onStart: () => {
      console.log('Jersey 3D bounce scroll animation triggered');
    }
  });
}

function addJerseyCardHoverEffect() {
  const jerseyCards = document.querySelectorAll('.jersey-card');
  if (!jerseyCards.length) return;

  // supports hover (not touch-only)
  const hasHover = window.matchMedia('(hover: hover)').matches;

  jerseyCards.forEach(card => {
    if (hasHover) {
      // Desktop hover effects
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
    } else {
      // Mobile touch effects
      card.addEventListener('touchstart', () => {
        gsap.to(card, {
          scale: 1.02,
          duration: 0.2,
          ease: 'power2.out'
        });
      });

      card.addEventListener('touchend', () => {
        gsap.to(card, {
          scale: 1,
          duration: 0.2,
          ease: 'power2.out'
        });
      });
    }
  });
}

//  DOMContentLoaded EVENT WITH THIS
document.addEventListener('DOMContentLoaded', () => {
  // Check if all required elements exist
  const requiredElements = [
    '.jersey-section',
    '.jersey-card',
    '.jersey-image-wrapper'
  ];

  const allElementsExist = requiredElements.every(selector =>
    document.querySelector(selector) !== null
  );

  if (!allElementsExist) {
    console.error('Some required jersey elements are missing from the DOM');
    return;
  }

  // Initialize animations
  animateJerseyShine();
  animateJerseyScrollIn();
  addJerseyCardHoverEffect();

  // Handle orientation change on mobile
  window.addEventListener('orientationchange', () => {
    setTimeout(() => {
      // Refresh ScrollTrigger after orientation change
      if (typeof ScrollTrigger !== 'undefined') {
        ScrollTrigger.refresh();
      }
    }, 100);
  });
});

// --- VIDEO CAROUSEL FIXED CODE ---
document.addEventListener('DOMContentLoaded', function () {
  // Video carousel variables
  let currentSlide = 0;
  const carouselTrack = document.getElementById('carouselTrack');
  const carouselDots = document.getElementById('carouselDots');
  const slides = carouselTrack ? carouselTrack.querySelectorAll('.carousel-slide') : [];
  const dots = carouselDots ? carouselDots.querySelectorAll('.dotts') : [];
  const prevBtn = document.querySelector('.carousel-nav.prev');
  const nextBtn = document.querySelector('.carousel-nav.next');
  let autoplayInterval = null;
  const autoplayDelay = 4000;

  if (carouselTrack && dots.length && prevBtn && nextBtn) {
    function updateCarousel() {
      // Move slides
      const translateX = -currentSlide * carouselTrack.parentElement.offsetWidth;
      gsap.set(carouselTrack, { x: translateX });
      // Update active slide
      slides.forEach((slide, idx) => {
        slide.classList.toggle('active', idx === currentSlide);
      });
      // Update dots
      dots.forEach((dot, idx) => {
        dot.classList.toggle('active', idx === currentSlide);
      });
    }
    function goToSlide(idx) {
      currentSlide = idx;
      updateCarousel();
    }
    function nextSlide() {
      currentSlide = (currentSlide + 1) % slides.length;
      updateCarousel();
    }
    function prevSlide() {
      currentSlide = (currentSlide - 1 + slides.length) % slides.length;
      updateCarousel();
    }
    function startAutoplay() {
      if (autoplayInterval) clearInterval(autoplayInterval);
      autoplayInterval = setInterval(nextSlide, autoplayDelay);
    }
    function stopAutoplay() {
      if (autoplayInterval) {
        clearInterval(autoplayInterval);
        autoplayInterval = null;
      }
    }
    // Dots click
    dots.forEach((dot, idx) => {
      dot.addEventListener('click', () => {
        goToSlide(idx);
        stopAutoplay();
        startAutoplay();
      });
    });
    // Prev/Next click
    prevBtn.addEventListener('click', () => {
      prevSlide();
      stopAutoplay();
      startAutoplay();
    });
    nextBtn.addEventListener('click', () => {
      nextSlide();
      stopAutoplay();
      startAutoplay();
    });
    // Autoplay pause on hover
    const carouselContainer = document.querySelector('.carousel-container');
    carouselContainer.addEventListener('mouseenter', stopAutoplay);
    carouselContainer.addEventListener('mouseleave', startAutoplay);
    // Responsive update
    window.addEventListener('resize', updateCarousel);
    // Init
    updateCarousel();
    startAutoplay();
  }
});