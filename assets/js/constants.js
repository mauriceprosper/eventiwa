// Shared filter data used across every portal. Edit here, reflects everywhere.
const NIGERIAN_STATES = ["Abia","Adamawa","Akwa Ibom","Anambra","Bauchi","Bayelsa","Benue","Borno","Cross River","Delta","Ebonyi","Edo","Ekiti","Enugu","Gombe","Imo","Jigawa","Kaduna","Kano","Katsina","Kebbi","Kogi","Kwara","Lagos","Nasarawa","Niger","Ogun","Ondo","Osun","Oyo","Plateau","Rivers","Sokoto","Taraba","Yobe","Zamfara","FCT - Abuja"];
const BRAND_TYPES = ["Event planners","Decorators","Rentals","Florists","Media","Lighting","Carpentry","Logistics","Sound","Fabrics"];
const JOB_TYPES = ["Full-time","Part-time","Contract"];
const SHOP_CATEGORIES = ["Décor","Furniture","Lighting","Sound","Fabrics","Tableware","Staging"];
const LISTING_MODE = ["For sale","For rent"];

// Helper to fill a <select> with options
function fillSelect(id, items, placeholder){
  const el = document.getElementById(id);
  if(!el) return;
  let html = placeholder ? `<option value="">${placeholder}</option>` : "";
  items.forEach(i => html += `<option value="${i}">${i}</option>`);
  el.innerHTML = html;
}
function formatNaira(n){ return "₦" + Number(n).toLocaleString("en-NG"); }
