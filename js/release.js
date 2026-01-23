const params = new URLSearchParams(window.location.search)
const releaseId = params.get("id")

Promise.all([
  fetch("./data/releases.json").then(r => r.json()),
  fetch("./data/artists.json").then(r => r.json()),
  fetch("./data/orange_room.json").then(r => r.json())
]).then(([releases, artists, orangeRoom]) => {

  const release = releases.find(r => r.id === releaseId)
  if (!release) {
    document.getElementById("release").innerHTML = "<p>Release not found</p>"
    return
  }

  const artist = artists.find(a => a.id === release.artist_id)
  const orSession = orangeRoom.find(o => o.id === release.orange_room_id)

  document.getElementById("release").innerHTML = `
    <div class="release-layout">
      <img src="${release.cover}" class="release-cover">
  
      <div>
        <h1>${release.title}</h1>
  
        <p>
          by <a href="./artist.html?id=${artist.id}">${artist.name}</a><br>
          ${release.type} · ${release.release_date}
        </p>
  
        <div class="genres">
          ${release.genres.map(g => `<span>#${g}</span>`).join("")}
        </div>
  
        <p>${release.description}</p>
  
        ${release.comments?.map(c => `
          <div class="comment">
            <strong>${c.author}</strong><br>
            ${c.text}
          </div>
        `).join("") || ""}
  
        ${orSession ? `
          <p>
            <a href="./orange-room.html#${orSession.id}">
              → Orange Room session
            </a>
          </p>
        ` : ""}
  
        <p>
          ${release.links.spotify ? `<a href="${release.links.spotify}">Spotify</a>` : ""}
          ${release.links.bandcamp ? ` · <a href="${release.links.bandcamp}">Bandcamp</a>` : ""}
        </p>
      </div>
    </div>
  `
})
