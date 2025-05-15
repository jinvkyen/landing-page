// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, TextPlugin);

document.addEventListener("DOMContentLoaded", function () {
  // Initial animations
  const tl = gsap.timeline();
  // Corners animation
  tl.to(
    ".corner",
    {
      duration: 25,
      opacity: 10,
      stagger: 0.25,
      ease: "power3.out",
    },
    0.15
  );

  const heroTitle = document.querySelector(".title-text");
  const heroText = heroTitle.textContent;
  heroTitle.innerHTML = "";

  for (let i = 0; i < heroText.length; i++) {
    const span = document.createElement("span");
    span.textContent = heroText[i] === " " ? "\u00A0" : heroText[i];
    span.style.display = "inline-block";
    span.style.opacity = "0";
    span.style.transform = "translateY(50px)";
    heroTitle.appendChild(span);
  }

  gsap.to(".title-text, span", {
    duration: 0.8,
    opacity: 1,
    y: 0,
    stagger: 0.05,
    ease: "back.out(1.5)",
    delay: 0.5,
  });

  tl.to(
    ".intro p",
    {
      duration: 1,
      opacity: 1,
      y: 0,
      ease: "power2.out",
    },
    1.5
  );

  tl.to(
    "nav",
    {
      duration: 1,
      opacity: 1,
      ease: "power1.inOut",
    },
    2
  );

  tl.to(
    ".scroll-indicator",
    {
      duration: 1,
      opacity: 1,
      ease: "power1.inOut",
    },
    2.5
  );

  ScrollTrigger.create({
    start: "top -10%",
    end: 99999,
    toggleClass: { className: "scrolled", targets: "nav" },
  });


// Navigation scroll animation
  const navLinks = document.querySelectorAll(".nav-link");
  navLinks.forEach((link) => {
    const linkTo = link.getAttribute("href");
    ScrollTrigger.create({
      trigger: linkTo,
      start: "top center",
      end: "bottom center",
      onEnter: () => activateNavLink(link),
      onEnterBack: () => activateNavLink(link),
    });
  });

  function activateNavLink(link) {
    navLinks.forEach((l) => l.classList.remove("active"));
    link.classList.add("active");
    gsap.to(link, {
      color: "var(--text-color)",
      duration: 0.3,
    });
  }

  gsap.to(".background-video", {
    yPercent: 20,
    ease: "none",
    scrollTrigger: {
      trigger: ".hero",
      start: "top top",
      end: "bottom top",
      scrub: true,
    },
  });

  gsap.utils.toArray(".section").forEach((section, i) => {
    const sectionTitle = section.querySelector("h2");

    const sectionTL = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top 80%",
        end: "center center",
        toggleActions: "play none none reverse",
      },
    });

    sectionTL.fromTo(
      sectionTitle,
      {
        opacity: 0,
        y: 50,
      },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power3.out",
      }
    );
  });

  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("href");
      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        gsap.to(window, {
          duration: 1,
          scrollTo: {
            y: targetElement,
            offsetY: 0,
          },
          ease: "power3.inOut",
        });
      }


    });
  });
});
ScrollTrigger.create({
  trigger: ".hero",
  start: "top top",
  end: "bottom top",
  toggleClass: { targets: "#mainNav", className: "sticky" },
  markers: false,
});

// Observer for look animations
const lookObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if(entry.isIntersecting) {
      entry.target.classList.add('active');
    } else {
      entry.target.classList.remove('active');
    }
  });
}, {
  threshold: 0.5
});

document.querySelectorAll('.look').forEach(look => {
  lookObserver.observe(look);
});

// Observer sections for animations
const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if(entry.isIntersecting) {
      entry.target.classList.add('active');
    } else {
      entry.target.classList.remove('active');
    }
  });
}, {
  threshold: 0.5
});

document.querySelectorAll('.section').forEach(section => {
  sectionObserver.observe(section);
});

// animate the corners
document.querySelectorAll('.corner').forEach((corner, index) => {
  setTimeout(() => {
    corner.style.opacity = 1;
  }, 2000 + (index * 200)
  );
});