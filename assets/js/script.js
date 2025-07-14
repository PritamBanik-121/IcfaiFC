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
    window.addEventListener('resize', function() {
      updateSquadImages();
      scrollToIndex(currentIndex);
    });
  }
});









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

   let currentSlide = 0;
    let totalSlides = 3;
    let autoplayInterval = null;
    const autoplayDelay = 3000;

    const carouselTrack = document.getElementById('carouselTrack');
    const carouselDots = document.getElementById('carouselDots');
    // Initialize carousel
    function initCarousel() {
        updateCarousel();
        initVideoAnimations();
        // Add keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') previousSlide();
            if (e.key === 'ArrowRight') nextSlide();
        });
        // Touch/swipe support
        let startX = 0;
        let startY = 0;
        const carousel = document.querySelector('.carousel-container');
        carousel.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
            startY = e.touches[0].clientY;
        });
        carousel.addEventListener('touchend', (e) => {
            const endX = e.changedTouches[0].clientX;
            const endY = e.changedTouches[0].clientY;
            const deltaX = endX - startX;
            const deltaY = endY - startY;
            if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 50) {
                if (deltaX > 0) {
                    previousSlide();
                } else {
                    nextSlide();
                }
            }
        });
        // Mouse wheel support
        let wheelTimeout = null;
        carousel.addEventListener('wheel', (e) => {
            e.preventDefault();
            if (wheelTimeout) return;
            if (e.deltaY > 0) {
                nextSlide(true);
            } else if (e.deltaY < 0) {
                previousSlide(true);
            }
            wheelTimeout = setTimeout(() => {
                wheelTimeout = null;
            }, 400); 
        });

        // Mouse drag-to-slide support
        let isDragging = false;
        let dragStartX = 0;
        let dragCurrentX = 0;
        let dragStartTranslate = 0;
        let hasDragged = false;
        let dragFrame = null;

        function onDragMove(e) {
            if (!isDragging) return;
            dragCurrentX = e.type.startsWith('touch') ? e.touches[0].clientX : e.clientX;
            if (Math.abs(dragCurrentX - dragStartX) > 5) hasDragged = true;
            if (dragFrame) cancelAnimationFrame(dragFrame);
            dragFrame = requestAnimationFrame(() => {
                const deltaX = dragCurrentX - dragStartX;
                const dragScale = 0.1; 
                const translateX = dragStartTranslate + deltaX * dragScale;
                gsap.set(carouselTrack, { x: translateX });
            });
        }

        function onDragEnd(e) {
            if (!isDragging) return;
            isDragging = false;
            carousel.style.cursor = 'grab';
            document.body.style.userSelect = '';
            document.removeEventListener('mousemove', onDragMove);
            document.removeEventListener('mouseup', onDragEnd);
            document.removeEventListener('mouseleave', onDragEnd);
            document.removeEventListener('touchmove', onDragMove);
            document.removeEventListener('touchend', onDragEnd);
            document.removeEventListener('touchcancel', onDragEnd);
            const deltaX = dragCurrentX - dragStartX;
            const threshold = Math.min(80, carousel.offsetWidth / 6);
            if (hasDragged && Math.abs(deltaX) > threshold) {
                if (deltaX < 0) {
                    nextSlide(true);
                } else {
                    previousSlide(true);
                }
            } else {
                gsap.to(carouselTrack, {
                    x: -currentSlide * carousel.offsetWidth,
                    duration: 0.45,
                    ease: 'power3.out'
                });
            }
            startAutoplay();
        }

        carousel.addEventListener('mousedown', (e) => {
            isDragging = true;
            dragStartX = e.clientX;
            dragCurrentX = e.clientX;
            dragStartTranslate = -currentSlide * carousel.offsetWidth;
            hasDragged = false;
            stopAutoplay();
            carousel.style.cursor = 'grabbing';
            document.body.style.userSelect = 'none';
            document.addEventListener('mousemove', onDragMove);
            document.addEventListener('mouseup', onDragEnd);
            document.addEventListener('mouseleave', onDragEnd);
        });
        carousel.addEventListener('touchstart', (e) => {
            isDragging = true;
            dragStartX = e.touches[0].clientX;
            dragCurrentX = e.touches[0].clientX;
            dragStartTranslate = -currentSlide * carousel.offsetWidth;
            hasDragged = false;
            stopAutoplay();
            carousel.style.cursor = 'grabbing';
            document.body.style.userSelect = 'none';
            document.addEventListener('touchmove', onDragMove, { passive: false });
            document.addEventListener('touchend', onDragEnd);
            document.addEventListener('touchcancel', onDragEnd);
        });

        // Autoplay
        startAutoplay();
        carousel.addEventListener('mouseenter', stopAutoplay);
        carousel.addEventListener('mouseleave', startAutoplay);

    }

    function updateCarousel(snap = false) {
        const translateX = -currentSlide * carouselTrack.parentElement.offsetWidth;
        if (snap) {
            gsap.to(carouselTrack, {
                x: translateX,
                duration: 0.45,
                ease: "power3.out"
            });
        } else {
            gsap.set(carouselTrack, { x: translateX });
        }
        document.querySelectorAll('.video-container').forEach((container, index) => {
            container.classList.toggle('active', index === currentSlide);
        });
        document.querySelectorAll('.dot').forEach((dot, index) => {
            dot.classList.toggle('active', index === currentSlide);
        });
    }

    // Navigation functions
    function nextSlide(snap = false) {
        currentSlide = (currentSlide + 1) % totalSlides;
        updateCarousel(snap);
    }
    function previousSlide(snap = false) {
        currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
        updateCarousel(snap);
    }
    function goToSlide(slideIndex) {
        currentSlide = slideIndex;
        updateCarousel(true);
    }
  
    // GSAP Animations
    function initVideoAnimations() {
        // Title animation
        gsap.fromTo('.video-section-title',
            {
                opacity: 0,
                y: -50,
                scale: 0.8,
                rotationX: 15
            },
            {
                opacity: 1,
                y: 0,
                scale: 1,
                rotationX: 0,
                duration: 1.2,
                ease: "back.out(1.7)"
            }
        );
        // Carousel container animation
        gsap.fromTo('.carousel-container',
            {
                opacity: 0,
                y: 50,
                scale: 0.9
            },
            {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: 1,
                ease: "power3.out",
                delay: 0.3,
                scrollTrigger: {
                    trigger: '.carousel-container',
                    start: 'top 85%',
                    end: 'bottom 15%',
                    toggleActions: 'play none none reverse'
                }
            }
        );
        // Controls animation
        gsap.fromTo('.carousel-dots',
            {
                opacity: 0,
                y: 30
            },
            {
                opacity: 1,
                y: 0,
                duration: 0.8,
                ease: "power2.out",
                stagger: 0.1,
                delay: 0.8,
                scrollTrigger: {
                    trigger: '.carousel-container',
                    start: 'top 85%',
                    end: 'bottom 15%',
                    toggleActions: 'play none none reverse'
                }
            }
        );
        // Background animation
       
        // Title glow effect
        gsap.to('.video-section-title', {
            textShadow: "0 0 30px rgba(102, 50, 247, 0.8), 0 0 60px rgba(75, 25, 239, 0.4)",
            duration: 2,
            ease: "power2.inOut",
            yoyo: true,
            repeat: -1,
            delay: 1
        });
    }

    // Initialize everything when DOM is loaded
    document.addEventListener('DOMContentLoaded', () => {
        initCarousel();
    });

    // Pause autoplay when page is not visible
    document.addEventListener('visibilitychange', () => {
    });
    