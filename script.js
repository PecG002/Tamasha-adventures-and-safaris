
(() => {
  const D = window.TAMASHA;
  const phone = D.business.phone.replace(/\D/g, "");
  const wa = (message) => `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;

  document.querySelectorAll("[data-wa]").forEach(el => {
    const custom = el.getAttribute("data-wa-message") ||
      "Hello Tamasha Adventure & Safaris, I would like to plan a trip. Please share the available options.";
    el.href = wa(custom);
  });

  document.querySelectorAll("[data-phone]").forEach(el => {
    el.textContent = D.business.displayPhone;
    el.href = `tel:${phone}`;
  });

  document.querySelectorAll("[data-till]").forEach(el => el.textContent = D.business.till);
  document.querySelectorAll("[data-year]").forEach(el => el.textContent = new Date().getFullYear());

  const header = document.querySelector(".site-header");
  const menu = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".nav-links");

  const setScrolled = () => header?.classList.toggle("scrolled", window.scrollY > 24);
  setScrolled();
  window.addEventListener("scroll", setScrolled, {passive:true});

  menu?.addEventListener("click", () => {
    nav.classList.toggle("open");
    document.body.classList.toggle("menu-open");
    menu.setAttribute("aria-expanded", nav.classList.contains("open"));
  });

  nav?.querySelectorAll("a").forEach(a => a.addEventListener("click", () => {
    nav.classList.remove("open");
    document.body.classList.remove("menu-open");
    menu?.setAttribute("aria-expanded", "false");
  }));

  const tripCard = (t) => `
    <article class="trip-card reveal">
      <div class="trip-image">
        <img src="${t.image}" alt="${t.title}" loading="lazy">
        <span class="trip-badge">${t.date}</span>
      </div>
      <div class="trip-body">
        <p class="eyebrow">Upcoming adventure</p>
        <h3>${t.title}</h3>
        <p class="trip-intro">${t.intro}</p>
        <div class="trip-price">${t.price}</div>
        <div class="trip-details">
          <div>
            <h4>Included</h4>
            <ul>${t.included.map(x => `<li>${x}</li>`).join("")}</ul>
          </div>
          <div>
            <h4>Optional extras</h4>
            <ul>${t.extras.length ? t.extras.map(x => `<li>${x}</li>`).join("") : "<li>Ask us about custom options.</li>"}</ul>
          </div>
        </div>
        <div class="trip-actions">
          <a class="btn btn-primary" data-wa
             data-wa-message="Hello Tamasha Adventure & Safaris. I want to book the ${t.title} trip on ${t.date}. Please share availability and booking details.">
             Book this trip
          </a>
          <a class="btn btn-outline-dark" href="contact.html">Ask a question</a>
        </div>
      </div>
    </article>`;

  const tripGrids = document.querySelectorAll("[data-trips]");
  tripGrids.forEach(grid => {
    grid.innerHTML = D.trips.map(tripCard).join("");
  });

  const benefits = document.querySelector("[data-benefits]");
  if (benefits) {
    benefits.innerHTML = D.privateBenefits.map(([title, text]) => `
      <div class="benefit reveal"><b>${title}</b><span>${text}</span></div>
    `).join("");
  }

  const upcoming = document.querySelector("[data-next-trip]");
  if (upcoming) {
    const t = D.trips[0];
    upcoming.innerHTML = `
      <span class="mini">Next adventure</span>
      <h3>${t.title}</h3>
      <div class="date">${t.date}</div>
      <div class="price">${t.price}</div>
      <a class="btn btn-primary" data-wa
         data-wa-message="Hello Tamasha Adventure & Safaris. I would like to book the ${t.title} trip on ${t.date}. Please share availability and booking details.">Reserve your place</a>`;
  }

  document.querySelectorAll(".faq button").forEach(btn => {
    btn.addEventListener("click", () => {
      const item = btn.closest(".faq");
      const open = item.classList.toggle("open");
      btn.setAttribute("aria-expanded", open);
      btn.querySelector("[data-plus]").textContent = open ? "−" : "+";
    });
  });

  const form = document.querySelector("#bookingForm");
  form?.addEventListener("submit", e => {
    e.preventDefault();
    const name = document.querySelector("#name")?.value.trim();
    const type = document.querySelector("#tripType")?.value;
    const destination = document.querySelector("#destination")?.value.trim();
    const dates = document.querySelector("#dates")?.value.trim();
    const group = document.querySelector("#groupSize")?.value.trim();
    const message = document.querySelector("#message")?.value.trim();

    const text = `Hello Tamasha Adventure & Safaris.

Name: ${name}
Trip type: ${type}
Destination / idea: ${destination}
Preferred dates: ${dates || "Not specified"}
Group size: ${group || "Not specified"}

Message:
${message || "I would like help planning this trip."}`;

    window.location.href = wa(text);
  });

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, {threshold:.08});

  document.querySelectorAll(".reveal").forEach(el => observer.observe(el));

  // Add the dynamic WhatsApp URLs after trip cards are created.
  document.querySelectorAll("[data-wa]").forEach(el => {
    if (!el.href || el.getAttribute("href") === location.href) {
      const custom = el.getAttribute("data-wa-message") ||
        "Hello Tamasha Adventure & Safaris, I would like to plan a trip. Please share the available options.";
      el.href = wa(custom);
    }
  });
})();
