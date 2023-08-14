export function buildHeader(header) {
	const sectionsTemplate = window.document.querySelector(
		'template[sections-template]',
	);

	header.sections.forEach((section, index) => {
		const usableTemplate = sectionsTemplate.content.cloneNode(true).children[0];

		const a = usableTemplate.querySelector('a');

		a.innerText = `${index + 1}. ${section.name}`;
		a.setAttribute('href', section.to);

		sectionsTemplate.parentNode.append(usableTemplate);
	});
}
