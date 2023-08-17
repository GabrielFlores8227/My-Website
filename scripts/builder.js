import * as modules from './modules.js';

(async () => {
	let req = await (await fetch('/builder/builder.json')).json();

	const userLanguage = navigator.language;
	const lang = window.document.documentElement.lang;

	if (userLanguage !== lang && req[userLanguage]) {
		window.location.href = '/pt-BR';
	} else {
		req = req[lang];
	}

	modules.buildHeader(req.header);
	modules.buildMain(req.main);
	modules.buildFooter(req.footer);
})();
