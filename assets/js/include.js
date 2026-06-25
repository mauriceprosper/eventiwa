// Optional: inject shared partials so you don't copy-paste nav/footer.
// Usage: <div data-include="/components/nav.html"></div>
// Note: requires serving over http (not file://) due to fetch/CORS.
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll("[data-include]").forEach(async (el) => {
    try {
      const res = await fetch(el.getAttribute("data-include"));
      el.outerHTML = await res.text();
    } catch (e) { console.warn("Include failed:", e); }
  });
});
