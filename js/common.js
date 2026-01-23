// fade in
window.addEventListener("load", () => {
  document.body.classList.add("loaded")
})

// intercept navigation
document.addEventListener("click", e => {
  const link = e.target.closest("a[data-nav]")
  if (!link) return

  const href = link.getAttribute("href")
  if (!href || href.startsWith("#")) return

  e.preventDefault()

  document.body.classList.remove("loaded")
  document.body.classList.add("exiting")

  setTimeout(() => {
    window.location.href = href
  }, 400)
})
