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

		const defaultHeight = '70px';

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
