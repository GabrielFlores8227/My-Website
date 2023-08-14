import * as modules from './modules.js';

(async () => {
	let req = await (await fetch('/builder/builder.json')).json();

	req = req.en;

	modules.buildHeader(req.header);
})();
