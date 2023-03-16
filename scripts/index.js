let $ = false;
window.document.querySelector(".NMCWMikyCrQzEtWAkqMn").addEventListener("click", () => handle_drawer())

window.document.querySelectorAll(".HFEwvOOFtwYRNUjPhcUL").forEach(element => {
      element.addEventListener("click", () => handle_drawer())
})

function handle_drawer () {
      window.document.querySelector(".XfGANijfYvPogncCmjqi").classList.add(`XfGANijfYvPogncCmjqi--${!$}`)
      window.document.querySelector(".XfGANijfYvPogncCmjqi").classList.remove(`XfGANijfYvPogncCmjqi--${$}`)
      window.document.querySelector(".NMCWMikyCrQzEtWAkqMn").classList.add(`NMCWMikyCrQzEtWAkqMn--${!$}`)
      window.document.querySelector(".NMCWMikyCrQzEtWAkqMn").classList.remove(`NMCWMikyCrQzEtWAkqMn--${$}`)
      $ = !$
}

//-------------------------------------------------------------------------------------------------------------

window.document.querySelectorAll("[KgUFYMMHupyPyeEHgsae]").forEach(element => {
      element.addEventListener("click", () => {
            window.scrollTo({
                  left: 0,
                  top: getOffset(window.document.querySelector("#" + element.innerText.split(".")[1].trim())).top,
                  behavior: 'smooth'
            });            
      })
})

function getOffset(el) {
      const rect = el.getBoundingClientRect();
      return {
            left: rect.left + window.scrollX,
            top: rect.top + window.scrollY
      };
}

//-------------------------------------------------------------------------------------------------------------

window.document.querySelectorAll("div.PwzpkYWTkykFnpvFsTrt > button.XgKBAqyBanoXzVrJKUcX").forEach(element => {
      element.addEventListener("click", e => {
            const div_id = e.target.parentElement.children[2].id
            const div_height = window.document.querySelector(`#${div_id}`).clientHeight
            const text_height = window.document.querySelector(`#${div_id} p`).clientHeight
            if (div_height === 50) {
                  window.document.querySelector(`#${div_id}`).style.height = `${text_height}px`
                  e.srcElement.innerText = "Ler menos -"
            } else {
                  window.document.querySelector(`#${div_id}`).style.height = "50px"
                  e.srcElement.innerText = "Ler mais +"
            }
      })
})

//-------------------------------------------------------------------------------------------------------------

const slider = document.querySelectorAll(".oVUOEDzpqKHyOQZHJZfP");
for (let c = 0; c < slider.length; c++) {
      let isDown = false
      let startX
      let position
      let left
      let scrollLeft

      setInterval(() => {
            if (!isDown) {
                  if (position >= slider[c].scrollWidth - slider[c].clientWidth) left = false
                  if (position <= 1) left = true

                  if (left) position = slider[c].scrollLeft + 1
                  else position = slider[c].scrollLeft - 1

                  slider[c].scrollTo(position, 0)
            }
      }, 10)
      slider[c].addEventListener('touchmove', () => {
            isDown = true
      })
      slider[c].addEventListener('touchend', () => {
            isDown = false
      })
      slider[c].addEventListener('mousedown', (e) => {
            isDown = true
            slider[c].classList.add('active')
            startX = e.pageX - slider[c].offsetLeft
            scrollLeft = slider[c].scrollLeft
      })
      slider[c].addEventListener('mouseleave', () => {
            isDown = false
            slider[c].classList.remove('active')
      })
      slider[c].addEventListener('mouseup', () => {
            isDown = false
            slider[c].classList.remove('active')
      })
      slider[c].addEventListener('mousemove', (e) => {
            if(!isDown) return
            e.preventDefault()
            const x = e.pageX - slider[c].offsetLeft
            const walk = (x - startX)
            slider[c].scrollLeft = scrollLeft - walk
            position = slider[c].scrollLeft
      })
}

