export const loadGoogleScript = () => {
	
	// Loads the Google JavaScript Library
	(function () {
			const id = 'google-js';
			const src = 'https://apis.google.com/js/platform.js';
			
			// We have at least one script 
			const firstJs = document.getElementsByTagName('script')[0];
			
			// Prevent script from loading twice
			if (document.getElementById(id)) { return; }
			const js = document.createElement('script');
			js.id = id;
			js.src = src;
			js.onload = window.onGoogleScriptLoad;
			firstJs.parentNode.insertBefore(js, firstJs);
	}());    
			
}