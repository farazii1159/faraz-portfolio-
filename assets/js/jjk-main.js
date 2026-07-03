/* ===== MENU SHOW ===== */
const showMenu = (toggleId, navId) => {
  const toggle = document.getElementById(toggleId),
    nav    = document.getElementById(navId);
  if (toggle && nav) {
    toggle.addEventListener("click", () => nav.classList.toggle("show"));
  }
};
showMenu("nav-toggle", "nav-menu");

/* ===== REMOVE MENU ON NAV LINK CLICK ===== */
const navLink = document.querySelectorAll(".nav__link");
function linkAction() {
  document.getElementById("nav-menu").classList.remove("show");
}
navLink.forEach((n) => n.addEventListener("click", linkAction));

/* ===== STICKY NAVBAR ===== */
const header = document.querySelector(".l-header");
function scrollHeader() {
  header.classList.toggle("scroll-header", window.scrollY >= 80);
}
window.addEventListener("scroll", scrollHeader);

/* ===== SCROLL SECTIONS ACTIVE LINK ===== */
const sections = document.querySelectorAll("section[id]");
function scrollActive() {
  const scrollY = window.pageYOffset;
  
  // 1. Check if user has hit the absolute bottom of the page
  const totalPageHeight = document.documentElement.scrollHeight;
  const scrollPosition = window.innerHeight + window.pageYOffset;
  const isAtBottom = (totalPageHeight - scrollPosition) <= 10; 

  sections.forEach((current) => {
    const sectionHeight = current.offsetHeight;
    const sectionTop    = current.offsetTop - 150; // Raised buffer to fix header overlaps
    const sectionId     = current.getAttribute("id");
    const link = document.querySelector(".nav__menu a[href*=" + sectionId + "]");
    
    if (!link) return;

    // 2. Force Contact section active when user bottoms out
    if (isAtBottom && sectionId === "contact") {
      link.classList.add("active");
    } 
    // 3. Clear certificates (and others) out of the way when at bottom
    else if (isAtBottom && sectionId !== "contact") {
      link.classList.remove("active");
    } 
    // 4. Default tracking for all other standard scrolls
    else {
      link.classList.toggle("active", scrollY > sectionTop && scrollY <= sectionTop + sectionHeight);
    }
  });
}
window.addEventListener("scroll", scrollActive);

/* ===== SCROLL REVEAL =====
 * NOTE: `reset` is intentionally false. With reset:true, elements get
 * re-hidden every time they leave the viewport, which makes projects /
 * certificates appear to "vanish" while scrolling. We want them to fade
 * in once and stay visible.
 */
const sr = ScrollReveal({
  origin:   "top",
  distance: "30px",
  duration: 900,
  reset:    false,
});
sr.reveal(
  `.home__data, .home__img,
   .about__img, .about__text, .about__subtitle,
   .skills__container, .projects__container,
   .certificates__container, .contact__form`,
  { interval: 200 }
);

/* ===== SIX EYES PARTICLES (blue/white cursed energy) ===== */
(function initParticles() {
  const canvas = document.getElementById("particles-canvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");

  let W = (canvas.width  = window.innerWidth);
  let H = (canvas.height = window.innerHeight);

  window.addEventListener("resize", () => {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
  });

  /* Mix of electric-blue and ice-white particles for Six Eyes aesthetic */
  const COLORS = [
    [59, 130, 246],   /* electric blue */
    [99,  102, 241],  /* indigo */
    [147, 197, 253],  /* light blue */
    [224, 231, 255],  /* near-white */
  ];

  const particles = Array.from({ length: 35 }, () => {
    const c = COLORS[Math.floor(Math.random() * COLORS.length)];
    return {
      x:       Math.random() * (typeof W !== "undefined" ? W : window.innerWidth),
      y:       Math.random() * (typeof H !== "undefined" ? H : window.innerHeight),
      r:       Math.random() * 1.8 + 0.3,
      speedY:  -(Math.random() * 0.45 + 0.08),
      speedX:  (Math.random() - 0.5) * 0.12,
      opacity: Math.random() * 0.5 + 0.1,
      fadeDir: Math.random() > 0.5 ? 1 : -1,
      color:   c,
    };
  });

  function draw() {
    ctx.clearRect(0, 0, W, H);
    for (const p of particles) {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${p.color[0]}, ${p.color[1]}, ${p.color[2]}, ${p.opacity})`;
      ctx.fill();

      p.y += p.speedY;
      p.x += p.speedX;
      p.opacity += 0.003 * p.fadeDir;

      if (p.opacity > 0.65 || p.opacity < 0.05) p.fadeDir *= -1;
      if (p.y < -5) { p.y = H + 5; p.x = Math.random() * W; }
    }
    requestAnimationFrame(draw);
  }
  draw();
})();

/* Reviews/comments form handling removed: no review UI exists in the HTML,
 * and GitHub Pages is a static host that cannot POST to a CSV file anyway.
 * If you want a working contact form, wire it up to a service like Formspree,
 * Web3Forms, or Netlify Forms (the latter requires migrating away from GH Pages). */
