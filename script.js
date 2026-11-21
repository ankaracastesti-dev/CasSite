// Psk. Dan. Samet Ağcaer – sitenin küçük etkileşimleri

// 1) Telefonda menüyü açıp kapatma
const toggle = document.querySelector(".menu-toggle");
const nav = document.getElementById("site-nav");

toggle.addEventListener("click", () => {
  const open = toggle.getAttribute("aria-expanded") === "true";
  toggle.setAttribute("aria-expanded", String(!open));
  nav.classList.toggle("is-open", !open);
});

// Menüden bir bağlantıya basılınca menüyü kapat
nav.addEventListener("click", (e) => {
  if (e.target.closest("a")) {
    toggle.setAttribute("aria-expanded", "false");
    nav.classList.remove("is-open");
  }
});

// 2) Sayfa kaydırılınca üst menünün altına ince çizgi
const header = document.querySelector(".site-header");
const onScroll = () => header.classList.toggle("is-scrolled", window.scrollY > 8);
onScroll();
window.addEventListener("scroll", onScroll, { passive: true });

// 3) Telefonda alttaki WhatsApp düğmesi: giriş bölümü geçilince görünür,
//    İletişim bölümüne gelince gizlenir (orada zaten büyük düğme var)
const waBar = document.querySelector(".wa-bar");
const hero = document.getElementById("giris");
const contact = document.getElementById("iletisim");

if (waBar && "IntersectionObserver" in window) {
  let heroVisible = true;
  let contactVisible = false;
  const update = () => waBar.classList.toggle("is-visible", !heroVisible && !contactVisible);

  new IntersectionObserver(([entry]) => {
    heroVisible = entry.isIntersecting;
    update();
  }, { threshold: 0.15 }).observe(hero);

  new IntersectionObserver(([entry]) => {
    contactVisible = entry.isIntersecting;
    update();
  }, { threshold: 0.1 }).observe(contact);
} else if (waBar) {
  waBar.classList.add("is-visible");
}

// 4) Alt bilgideki yılı otomatik güncelle
document.getElementById("yil").textContent = new Date().getFullYear();
