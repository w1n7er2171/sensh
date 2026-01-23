const params = new URLSearchParams(window.location.search)
const artistId = params.get("id")

Promise.all([
  fetch("./data/artists.json").then(r => r.json()),
  fetch("./data/releases.json").then(r => r.json())
]).then(([artists, releases]) => {

  const artist = artists.find(a => a.id === artistId)
  if (!artist) return

  document.body.dataset.theme = artist.theme || "default"

  const artistReleases = releases
    .filter(r => r.artist_id === artist.id)
    .sort((a, b) => new Date(b.release_date) - new Date(a.release_date))

  const types = [...new Set(artistReleases.map(r => r.type))]

  document.getElementById("artist").innerHTML = `
    <img src="${artist.image}" class="artist-image">

    <h1>${artist.name}</h1>
    <p>${artist.bio}</p>

    <div class="release-filters">
      <button data-filter="all">All</button>
      ${types.map(t => `
        <button data-filter="${t}">${t}</button>
      `).join("")}
    </div>

    <div class="release-grid" id="releaseGrid">
      ${renderReleases(artistReleases)}
    </div>
  `

  // filter logic
  document.querySelectorAll("[data-filter]").forEach(btn => {
    btn.addEventListener("click", () => {
      const type = btn.dataset.filter
      const filtered = type === "all"
        ? artistReleases
        : artistReleases.filter(r => r.type === type)

      document.getElementById("releaseGrid").innerHTML =
        renderReleases(filtered)
    })
  })
})

function renderReleases(releases) {
  return releases.map(r => `
    <a class="release-card" href="./release.html?id=${r.id}">
      <img src="${r.cover}" alt="${r.title}">
      <strong>${r.title}</strong>
      <div class="release-meta">
        <span class="release-type">${r.type}</span><br>
        <time>${r.release_date}</time>
      </div>
    </a>
  `).join("")
}
