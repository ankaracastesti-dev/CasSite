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

// 3) "CAS testi neye bakar?" sekmeleri
const tabs = Array.from(document.querySelectorAll('.pass-tabs [role="tab"]'));
const arms = Array.from(document.querySelectorAll(".pass-star .arm"));

function selectTab(tab, focus) {
  tabs.forEach((t) => {
    const selected = t === tab;
    t.setAttribute("aria-selected", String(selected));
    t.tabIndex = selected ? 0 : -1;
    document.getElementById(t.getAttribute("aria-controls")).hidden = !selected;
  });
  arms.forEach((arm) => arm.classList.toggle("is-active", arm.dataset.arm === tab.dataset.arm));
  if (focus) tab.focus();
}

tabs.forEach((tab, i) => {
  tab.addEventListener("click", () => selectTab(tab, false));
  // Klavye ile ok tuşlarıyla gezinme
  tab.addEventListener("keydown", (e) => {
    const keys = { ArrowDown: 1, ArrowRight: 1, ArrowUp: -1, ArrowLeft: -1 };
    if (e.key in keys) {
      e.preventDefault();
      selectTab(tabs[(i + keys[e.key] + tabs.length) % tabs.length], true);
    } else if (e.key === "Home") {
      e.preventDefault();
      selectTab(tabs[0], true);
    } else if (e.key === "End") {
      e.preventDefault();
      selectTab(tabs[tabs.length - 1], true);
    }
  });
});
if (tabs.length) selectTab(tabs[0], false);

// 4) Telefonda alttaki WhatsApp düğmesi: giriş bölümü geçilince görünür,
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

// 5) Alt bilgideki yılı otomatik güncelle
document.getElementById("yil").textContent = new Date().getFullYear();
