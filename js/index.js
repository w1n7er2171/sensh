Promise.all([
  fetch("./data/artists.json").then(r => r.json()),
  fetch("./data/releases.json").then(r => r.json()),
  fetch("./data/concerts.json").then(r => r.json())
]).then(([artists, releases, concerts]) => {

  /* ARTISTS */
  document.getElementById("artists").innerHTML =
    artists.map(a => `
      <a class="card artist-card" href="./artist.html?id=${a.id}">
        <img src="${a.image}" alt="${a.name}">
        <strong>${a.name}</strong>
        <p class="muted">${a.bio}</p>
      </a>
    `).join("")


  /* LATEST RELEASES (5) */
  const latest = releases
    .sort((a, b) => new Date(b.release_date) - new Date(a.release_date))
    .slice(0, 5)

  document.getElementById("releases").innerHTML =
    latest.map(r => {
      const artist = artists.find(a => a.id === r.artist_id)
      return `
        <a class="card release-card" href="./release.html?id=${r.id}">
          <img src="${r.cover}" alt="${r.title}">
          <strong>${r.title}</strong>
          <div class="muted">
            ${artist?.name || ""} · ${r.type}<br>
            ${new Date(r.release_date).toLocaleDateString()}
          </div>
        </a>
      `
    }).join("")


  /* CONCERTS — only upcoming, sorted */
  const now = new Date()

  const upcomingConcerts = concerts
    .filter(c => new Date(c.datetime) >= now)
    .sort((a, b) => new Date(a.datetime) - new Date(b.datetime))

  document.getElementById("concerts").innerHTML =
    upcomingConcerts.map(c => `
      <div class="card">
        <strong>${c.title}</strong><br>
        <small>${new Date(c.datetime).toLocaleString()}</small>
      </div>
    `).join("")
})
