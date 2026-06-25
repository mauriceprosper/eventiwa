// Scroll-reveal + mobile nav. Loaded on every page.
document.addEventListener("DOMContentLoaded", () => {
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => { if(e.isIntersecting){ e.target.classList.add("in"); io.unobserve(e.target); }});
  }, { threshold: .12 });
  document.querySelectorAll(".reveal").forEach(el => io.observe(el));

  const burger = document.querySelector(".burger");
  const links = document.querySelector(".nav-links");
  if(burger && links){
    burger.addEventListener("click", () => {
      links.style.display = links.style.display === "flex" ? "none" : "flex";
    });
  }
});
