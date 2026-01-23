fetch("/data/orange_room.json")
  .then(r => r.json())
  .then(data => {
    const el = document.getElementById("or")
    el.innerHTML = `
      <h1>Orange Room</h1>
      ${data.map(s => `
        <div class="session">
          <h2>${s.title}</h2>
          <p>${s.description}</p>
          ${s.video ? `<a href="${s.video}">Watch</a>` : ""}
        </div>
      `).join("")}
    `
  })
