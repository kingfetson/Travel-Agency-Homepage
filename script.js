// script.js
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", function(e) {
    e.preventDefault();const destinationGrid = document.getElementById("destinationGrid");

// Fetch top urban areas from Teleport API
async function loadDestinations() {
  try {
    const res = await fetch("https://api.teleport.org/api/urban_areas/");
    const data = await res.json();
    const cities = data._links["ua:item"].slice(0, 6); // Limit to 6 cities

    for (const city of cities) {
      const cityRes = await fetch(city.href + "images/");
      const cityData = await cityRes.json();
      const image = cityData.photos[0].image.web;

      const card = document.createElement("div");
      card.classList.add("destination-card");
      card.innerHTML = `
        <img src="${image}" alt="${city.name}">
        <h3>${city.name}</h3>
        <p>Click to see more details</p>
      `;
      destinationGrid.appendChild(card);
    }
  } catch (err) {
    console.error("Failed to load destinations:", err);
  }
}

document.addEventListener("DOMContentLoaded", loadDestinations);

// Scroll to Destinations on button click
document.getElementById("exploreBtn").addEventListener("click", () => {
  document.getElementById("destinations").scrollIntoView({ behavior: "smooth" });
});

    document.querySelector(this.getAttribute("href")).scrollIntoView({
      behavior: "smooth"
    });
  });
});
