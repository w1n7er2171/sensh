const params = new URLSearchParams(window.location.search)
const artistId = params.get("id")

Promise.all([
  fetch("/data/artists.json").then(r => r.json()),
  fetch("/data/releases.json").then(r => r.json())
]).then(([artists, releases]) => {
  const artist = artists.find(a => a.id === artistId)
  if (!artist) return

  document.body.dataset.theme = artist.theme || "default"

  const artistReleases = releases.filter(r => r.artist_id === artist.id)

  document.getElementById("artist").innerHTML = `
  <img src="${artist.image}" alt="${artist.name}" class="artist-image">

  <h1>${artist.name}</h1>
  <p>${artist.bio}</p>

  <h2>Releases</h2>
  <ul>
    ${artistReleases.map(r => `
      <li>
        <a href="/release.html?id=${r.id}">
          ${r.title} (${r.release_date})
        </a>
      </li>
    `).join("")}
  </ul>
`
