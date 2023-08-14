import * as modules from './modules.js';

(async () => {
	let req = await (await fetch('/builder/builder.json')).json();

	const userLanguage = navigator.language;

	if (req[userLanguage]) {
		window.document.documentElement.lang = userLanguage;

		req = req[userLanguage];
	} else {
		req = req.en;
	}

	modules.buildHeader(req.header);
})();
