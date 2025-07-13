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

  const football = document.querySelector('.football-animate');
  const setG = document.querySelector('.setG');
  const imageContent7 = document.querySelector('.imageContent7');
  
  if (football && setG && imageContent7) {
   
    setTimeout(() => {
      const setGRect = setG.getBoundingClientRect();
      const imageRect = imageContent7.getBoundingClientRect();
      
     
      const startX = 0;
      const startY = 0;
      const centerX = imageRect.width /2; 
      const centerY = imageRect.height / 3;
      const endX = 0;
      const endY = setGRect.height; 
      
    
      const path = [
        { x: startX, y: startY },
        { x: centerX, y: centerY },
        { x: centerX - 40, y: centerY },
        { x: centerX - 100, y: centerY - 50 },
        { x: endX, y: endY }, 
      ];
      
      gsap.to(football, {
        motionPath: {
          path: path,
          curviness: 1.8,
          autoRotate: true,
          alignOrigin: [0.5, 0.5]
        },
        duration: 2,
        ease: "power1.inout",
        scrollTrigger: {
          trigger: ".setG",
          start: "top center",
          toggleActions: "play none none none",
          markers: false
        }
      });
    }, 100);
  }



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
 
