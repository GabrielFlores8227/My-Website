export function buildHeader(header) {
	window.document
		.querySelectorAll('template[sections-template]')
		.forEach((template) => {
			header.sections.forEach((section, index) => {
				const usableTemplate = template.content.cloneNode(true).children[0];

				if (section.special) {
					usableTemplate.classList.add('--special');

					const a = usableTemplate.querySelector('a');

					a.innerText = `${section.name}`;
					a.setAttribute('href', section.to);
					a.setAttribute('target', '_blank');

					template.parentNode.append(usableTemplate);

					return;
				}

				usableTemplate.classList.add('--default');

				const a = usableTemplate.querySelector('a');

				a.innerText = `${index + 1}. ${section.name}`;
				a.setAttribute('href', section.to);

				template.parentNode.append(usableTemplate);
			});
		});

	const drawerButton = window.document.querySelector(
		'button[header-drawer--on]',
	);
	const drawer = window.document.querySelector('div[header-drawer]');

	function openDrawer() {
		drawer.classList.add('--on');

		drawer.querySelectorAll('a').forEach((a) => {
			a.setAttribute('tabindex', '0');
		});
	}

	function closeDrawer() {
		drawer.classList.remove('--on');

		drawer.querySelectorAll('a').forEach((a) => {
			a.setAttribute('tabindex', '-1');
		});
	}

	drawerButton.addEventListener('click', () => {
		const state = drawer.classList.contains('--on');

		if (state) {
			closeDrawer();
		} else {
			openDrawer();
		}
	});

	drawer.addEventListener('click', () => {
		closeDrawer();
	});
}

export function buildMain(main) {
	buildMainSection1(main['section-1']);
	buildMainSection2(main['section-2']);
	buildMainSection3(main['section-3']);
	buildMainSection4(main['section-4']);
	buildMainSection5(main['section-5']);
}

function buildMainSection1(section1) {
	window.document.querySelector('p[text-1]').innerText = section1['text-1'];
	window.document.querySelector('h1[text-2]').innerText = section1['text-2'];
	window.document.querySelector('span[text-3]').innerText = section1['text-3'];

	const a = window.document.querySelector('a[phone]');
	a.innerHTML = a.innerHTML + section1['phone-message'];
	a.setAttribute(
		'href',
		`https://wa.me/${section1['phone-number']}?text=${section1['phone-message']}`,
	);
}

function buildMainSection2(section2) {
	const template = window.document.querySelector(
		'template[social-media-template]',
	);

	section2.forEach((item) => {
		const usableTemplate = template.content.cloneNode(true).children[0];

		usableTemplate.setAttribute('href', item.to);

		const img = usableTemplate.querySelector('img');
		img.setAttribute('src', item.image);
		img.setAttribute('alt', item.name);

		template.parentNode.append(usableTemplate);
	});
}

function buildMainSection3(section3) {
	const section3Selector = window.document.querySelector('div[section-3]');

	section3Selector.querySelector('h3').innerText = section3.title;
	section3Selector.querySelector('h2').innerText = section3.text;

	const template = window.document.querySelector('template[about-template]');

	section3.content.forEach((item, index) => {
		const usableTemplate = template.content.cloneNode(true).children[0];

		usableTemplate.setAttribute('about-item', '');

		const img = usableTemplate.querySelector('img');

		img.setAttribute('src', item.image);
		img.setAttribute('alt', item.title);

		usableTemplate.querySelector('h4').innerText = item.title;

		const p = usableTemplate.querySelector('p');

		p.innerText = item.text;

		const defaultHeight = '50px';

		const button = usableTemplate.querySelector('button');

		button.innerText = item.show;
		p.parentNode.style.height = defaultHeight;

		button.addEventListener('click', () => {
			template.parentNode
				.querySelectorAll('div[about-item]')
				.forEach((aboutItem, aboutItemIndex) => {
					if (index == aboutItemIndex) {
						return;
					}

					aboutItem.querySelector('div').style.height = defaultHeight;
					aboutItem.querySelector('button').innerText =
						section3.content[aboutItemIndex].show;
				});

			function changeHeight(height) {
				p.parentNode.style.height = height;
			}

			if (p.parentNode.style.height !== defaultHeight) {
				changeHeight(defaultHeight);
				button.innerText = item.show;
			} else {
				changeHeight(window.getComputedStyle(p).getPropertyValue('height'));
				button.innerText = item.hide;
			}
		});

		template.parentNode.append(usableTemplate);
	});
}

function buildMainSection4(section4) {
	const section4Selector = window.document.querySelector('div[section-4]');
	section4Selector.querySelector('h2').innerText = section4.text;
	section4Selector.querySelector('h3').innerText = section4.title;

	window.document
		.querySelectorAll('template[skill-template]')
		.forEach((template, index) => {
			if (index % 2 !== 0) {
				section4.content = section4.content.reverse();
			}

			for (let c = 0; c < 3; c++) {
				section4.content.forEach((item) => {
					const usableTemplate = template.content.cloneNode(true).children[0];

					const img = usableTemplate.querySelector('img');

					img.setAttribute('src', item);

					template.parentNode.append(usableTemplate);
				});
			}
		});

	window.document
		.querySelectorAll('div[slider-container]')
		.forEach((sliderContainer) => {
			let isDown = false;
			let startX;
			let position;
			let left;
			let scrollLeft;
			let pause;
			let timer;

			setInterval(() => {
				if (isDown) {
					clearTimeout(timer);

					pause = true;

					timer = setTimeout(() => {
						pause = false;
					}, 3500);
				}

				if (pause) {
					return;
				}

				if (
					position >=
					sliderContainer.scrollWidth - sliderContainer.clientWidth
				) {
					left = false;
				}

				if (position <= 1) left = true;

				if (left) position = sliderContainer.scrollLeft + 1;
				else position = sliderContainer.scrollLeft - 1;

				sliderContainer.scrollTo(position, 0);
			}, 10);

			sliderContainer.addEventListener('touchmove', () => {
				isDown = true;
			});
			sliderContainer.addEventListener('touchend', () => {
				isDown = false;
			});
			sliderContainer.addEventListener('mousedown', (e) => {
				isDown = true;
				sliderContainer.classList.add('active');
				startX = e.pageX - sliderContainer.offsetLeft;
				scrollLeft = sliderContainer.scrollLeft;
			});
			sliderContainer.addEventListener('mouseleave', () => {
				isDown = false;
				sliderContainer.classList.remove('active');
			});
			sliderContainer.addEventListener('mouseup', () => {
				isDown = false;
				sliderContainer.classList.remove('active');
			});
			sliderContainer.addEventListener('mousemove', (e) => {
				if (!isDown) return;
				e.preventDefault();
				const x = e.pageX - sliderContainer.offsetLeft;
				const walk = x - startX;
				sliderContainer.scrollLeft = scrollLeft - walk;
				position = sliderContainer.scrollLeft;
			});
		});
}

function buildMainSection5(section5) {
	const section5Selector = window.document.querySelector('div[section-5]');
	section5Selector.querySelector('h2').innerText = section5.text;
	section5Selector.querySelector('h3').innerText = section5.title;

	const template = window.document.querySelector(
		'template[certificate-template]',
	);

	section5.content.forEach((item) => {
		const usableTemplate = template.content.cloneNode(true).children[0];

		const companyImg = usableTemplate.querySelector('img[company-logo]');

		companyImg.setAttribute('src', item['company-image']);
		companyImg.setAttribute('alt', item['company-name']);

		usableTemplate.querySelector('p[company-name]').innerText =
			item['company-name'];
		usableTemplate.querySelector('p[company-url]').innerText =
			item['company-url'];

		const certificateImg = usableTemplate.querySelector('img[certificate]');

		certificateImg.setAttribute('src', item['certificate-image']);
		certificateImg.setAttribute('alt', `${item['company-name']} Certificate`);

		usableTemplate.querySelector('p[footer]').innerText = item.footer;

		template.parentNode.append(usableTemplate);
	});
}
