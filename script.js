(function(){
  const stored = localStorage.getItem("tamashaContent");
  let data = window.TAMASHA_CONTENT;
  if (stored) { try { data = JSON.parse(stored); } catch(e){} }

  const b = data.business;
  const phoneDigits = b.phone.replace(/\D/g,"");
  const waText = encodeURIComponent("Hello Tamasha Adventure & Safaris, I would like to book an upcoming trip. Please share the available seats and booking details.");
  const wa = "https://wa.me/" + phoneDigits + "?text=" + waText;

  document.getElementById("heroWhatsApp").href = wa;
  document.getElementById("bookingWhatsApp").href = wa;
  document.getElementById("ctaWhatsApp").href = wa;
  document.getElementById("deposit").textContent = b.bookingDeposit;
  document.getElementById("till").textContent = b.till;
  document.getElementById("paymentNote").textContent = b.paymentNote;
  document.getElementById("phoneLink").textContent = b.phone;
  document.getElementById("phoneLink").href = "tel:" + phoneDigits;
  document.getElementById("tiktokLink").textContent = "TikTok: " + b.tiktok;
  document.getElementById("tiktokLink").href = "https://www.tiktok.com/@" + b.tiktok.replace(/^@/,"");
  document.getElementById("year").textContent = new Date().getFullYear();

  const trips = data.trips || [];
  if(trips[0]) document.getElementById("heroTrip").textContent = trips[0].title + " — " + trips[0].date;

  const grid = document.getElementById("tripGrid");
  grid.innerHTML = trips.map(t => `
    <article class="trip-card">
      <div class="trip-image">
        <img src="${t.image}" alt="${t.title}">
        <div class="trip-date">${t.date}</div>
      </div>
      <div class="trip-body">
        <p class="eyebrow">UPCOMING TRIP</p>
        <h3>${t.title}</h3>
        <p>${t.intro}</p>
        <div class="trip-price">${t.price}</div>
        <div class="trip-cols">
          <div><h4>Inclusive</h4><ul>${(t.included||[]).map(x=>`<li>${x}</li>`).join("")}</ul></div>
          <div><h4>Optional extras</h4><ul>${(t.extras||[]).length ? t.extras.map(x=>`<li>${x}</li>`).join("") : "<li>Contact us for trip options.</li>"}</ul></div>
        </div>
        <div class="trip-actions">
          <a class="btn btn-primary" href="${wa}">Book this trip</a>
        </div>
      </div>
    </article>`).join("");
})();