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

	drawerButton.addEventListener('click', () => {
		const state = drawer.classList.contains('--on');

		if (state) {
			drawer.classList.remove('--on');
		} else {
			drawer.classList.add('--on');
		}
	});

	drawerButton.addEventListener('focusout', () => {
		drawer.classList.remove('--on');
	});
}

export function buildMain(main) {
	buildMainSection1(main['section-1']);
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
