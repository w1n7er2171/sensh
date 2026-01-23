const params = new URLSearchParams(window.location.search)
const artistId = params.get("id")

Promise.all([
  fetch("./data/artists.json").then(r => r.json()),
  fetch("./data/releases.json").then(r => r.json()),
  fetch("./data/concerts.json").then(r => r.json())
]).then(([artists, releases, concerts]) => {

  const artist = artists.find(a => a.id === artistId)
  if (!artist) {
    document.getElementById("artist").innerHTML = "<p>Artist not found</p>"
    return
  }

  document.body.dataset.theme = artist.theme || "default"

  const now = new Date()

  const upcomingConcerts = concerts
    .filter(c =>
      Array.isArray(c.artist_ids) &&
      c.artist_ids.includes(artist.id) &&
      new Date(c.datetime) > now
    )
    .sort((a, b) => new Date(a.datetime) - new Date(b.datetime))
    .slice(0, 3)

  const artistReleases = releases
    .filter(r => r.artist_id === artist.id)
    .sort((a, b) => new Date(b.release_date) - new Date(a.release_date))

  document.getElementById("artist").innerHTML = `
    <img src="${artist.image}" class="artist-image">

    <h1>${artist.name}</h1>
    <p>${artist.bio}</p>

    ${upcomingConcerts.length ? `
      <h2>Upcoming concerts</h2>
      <ul>
        ${upcomingConcerts.map(c => `
          <li>
            ${new Date(c.datetime).toLocaleDateString()} — ${c.location}
          </li>
        `).join("")}
      </ul>
    ` : ""}

    <h2>Releases</h2>
    <div class="release-grid">
      ${artistReleases.map(r => `
        <a class="release-card" href="./release.html?id=${r.id}">
          <img src="${r.cover}">
          <strong>${r.title}</strong>
          <div class="release-meta">
            ${r.type}<br>${r.release_date}
          </div>
        </a>
      `).join("")}
    </div>
  `
}).catch(err => {
  console.error(err)
  document.getElementById("artist").innerHTML = "<p>Error loading artist</p>"
})
