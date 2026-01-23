Promise.all([
  fetch("./data/artists.json").then(r => r.json()),
  fetch("./data/releases.json").then(r => r.json())
]).then(([artists, releases]) => {
  const params = new URLSearchParams(window.location.search)
  const artistId = params.get("id")

  console.log("artistId:", artistId)

  const artist = artists.find(a => a.id === artistId)
  if (!artist) {
    document.getElementById("artist").innerHTML = "<p>Artist not found</p>"
    return
  }

  document.body.dataset.theme = artist.theme || "default"

  const artistReleases = releases.filter(r => r.artist_id === artist.id)

  document.getElementById("artist").innerHTML = `
    <img src="${artist.image}" class="artist-image">

    <h1>${artist.name}</h1>
    <p>${artist.bio}</p>

    <h2>Releases</h2>
    <ul>
      ${artistReleases.map(r => `
        <li>
          <a href="./release.html?id=${r.id}">
            ${r.title}
          </a>
        </li>
      `).join("")}
    </ul>
  `
}).catch(err => {
  console.error(err)
  document.getElementById("artist").innerHTML = "<p>Error loading artist</p>"
})
