const now = new Date()

concerts.forEach(concert => {
  const concertDate = new Date(concert.datetime)
  const isPast = concertDate < now

  const el = document.createElement("div")
  el.className = "concert"
  if (isPast) el.classList.add("past")

  el.innerHTML = `
    <h3>${concert.title}</h3>
    <p>${concert.location}</p>
    <time>${concertDate.toLocaleString()}</time>
  `

  container.appendChild(el)
})
