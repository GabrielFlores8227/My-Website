window.document
  .querySelector('.NMCWMikyCrQzEtWAkqMn')
  .addEventListener('click', () => handle_drawer());

window.document
  .querySelector('.NMCWMikyCrQzEtWAkqMn')
  .addEventListener('focusout', () => {
    setTimeout(() => handle_drawer(), 120);
  });

window.document.querySelectorAll('.KgUFYMMHupyPyeEHgsae').forEach((element) => {
  element.addEventListener('click', () => {
    setTimeout(
      () =>
        window.scrollTo({
          left: 0,
          top: getOffset(
            window.document.querySelector('#' + element.getAttribute('for')),
          ).top,
          behavior: 'smooth',
        }),
      120,
    );
  });
});

window.document.querySelectorAll('.XgKBAqyBanoXzVrJKUcX').forEach((element) => {
  element.addEventListener('click', (e) => {
    const div = e.target.parentElement.children[2];
    const div_height = div.clientHeight;
    const text_height = div.querySelector('p').clientHeight;

    if (div_height === 50) {
      div.style.height = `${text_height}px`;
      e.srcElement.innerText = 'Mostrar menos -';
    } else {
      div.style.height = '50px';
      e.srcElement.innerText = 'Mostrar mais +';
    }
  });

  element.addEventListener('focusout', (e) => {
    const div = e.target.parentElement.children[2];
    const div_height = div.clientHeight;

    if (div_height !== 50) {
      setTimeout(() => {
        div.style.height = '50px';
        e.srcElement.innerText = 'Mostrar mais +';
      }, 320);
    }
  });
});

let $ = false;
function handle_drawer() {
  window.document
    .querySelector('.XfGANijfYvPogncCmjqi')
    .classList.add(`XfGANijfYvPogncCmjqi--${!$}`);
  window.document
    .querySelector('.XfGANijfYvPogncCmjqi')
    .classList.remove(`XfGANijfYvPogncCmjqi--${$}`);
  window.document
    .querySelector('.NMCWMikyCrQzEtWAkqMn')
    .classList.add(`NMCWMikyCrQzEtWAkqMn--${!$}`);
  window.document
    .querySelector('.NMCWMikyCrQzEtWAkqMn')
    .classList.remove(`NMCWMikyCrQzEtWAkqMn--${$}`);
  $ = !$;
}

function getOffset(el) {
  const rect = el.getBoundingClientRect();
  return {
    left: rect.left + window.scrollX,
    top: rect.top + window.scrollY,
  };
}

const sliderContainer = document.querySelectorAll('.oVUOEDzpqKHyOQZHJZfP');
for (let c = 0; c < sliderContainer.length; c++) {
  let isDown = false;
  let startX;
  let position;
  let left;
  let scrollLeft;

  setInterval(() => {
    if (!isDown) {
      if (
        position >=
        sliderContainer[c].scrollWidth - sliderContainer[c].clientWidth
      )
        left = false;
      if (position <= 1) left = true;

      if (left) position = sliderContainer[c].scrollLeft + 1;
      else position = sliderContainer[c].scrollLeft - 1;

      sliderContainer[c].scrollTo(position, 0);
    }
  }, 10);
  sliderContainer[c].addEventListener('touchmove', () => {
    isDown = true;
  });
  sliderContainer[c].addEventListener('touchend', () => {
    isDown = false;
  });
  sliderContainer[c].addEventListener('mousedown', (e) => {
    isDown = true;
    sliderContainer[c].classList.add('active');
    startX = e.pageX - sliderContainer[c].offsetLeft;
    scrollLeft = sliderContainer[c].scrollLeft;
  });
  sliderContainer[c].addEventListener('mouseleave', () => {
    isDown = false;
    sliderContainer[c].classList.remove('active');
  });
  sliderContainer[c].addEventListener('mouseup', () => {
    isDown = false;
    sliderContainer[c].classList.remove('active');
  });
  sliderContainer[c].addEventListener('mousemove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - sliderContainer[c].offsetLeft;
    const walk = x - startX;
    sliderContainer[c].scrollLeft = scrollLeft - walk;
    position = sliderContainer[c].scrollLeft;
  });
}
