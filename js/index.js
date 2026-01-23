Promise.all([
  fetch("/data/artists.json").then(r => r.json()),
  fetch("/data/releases.json").then(r => r.json()),
  fetch("/data/concerts.json").then(r => r.json())
]).then(([artists, releases, concerts]) => {

  /* ARTISTS */
  document.getElementById("artists").innerHTML =
    artists.map(a => `
      <a class="card artist-card" href="/artist.html?id=${a.id}">
        <img src="${a.image}" alt="${a.name}">
        <strong>${a.name}</strong>
        <p class="muted">${a.bio}</p>
      </a>
    `).join("")


  /* RELEASES (останні 4) */
  const latest = releases
    .sort((a, b) => new Date(b.release_date) - new Date(a.release_date))
    .slice(0, 4)

  document.getElementById("releases").innerHTML =
    latest.map(r => `
      <a class="card" href="/release.html?id=${r.id}">
        <strong>${r.title}</strong>
        <p class="muted">${r.release_date}</p>
      </a>
    `).join("")

  /* CONCERTS */
  const now = new Date()

  document.getElementById("concerts").innerHTML =
    concerts.map(c => {
      const past = new Date(c.datetime) < now
      return `
        <div class="card ${past ? "muted" : ""}">
          <strong>${c.title}</strong><br>
          <small>${new Date(c.datetime).toLocaleString()}</small>
        </div>
      `
    }).join("")
})
