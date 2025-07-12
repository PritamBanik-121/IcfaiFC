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
//made the nav bar collapsed after clicking outside

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
      const centerX = imageRect.width + 18; 
      const centerY = imageRect.height / 4;
      const endX = 0;
      const endY = setGRect.height; 
      
    
      const path = [
        { x: startX, y: startY },
        { x: centerX, y: centerY },
        { x: centerX - 40, y: centerY }, // Bounce up after hitting imageRect
        { x: centerX - 100, y: centerY - 50 }, // Continue upward trajectory
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