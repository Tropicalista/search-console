import { useEffect, useState, useRef } from '@wordpress/element';

export function useLoadGapi( options = {} ) {
	const { nonce, onScriptLoadSuccess, onScriptLoadError } = options;

	const [ scriptLoadedSuccessfully, setScriptLoadedSuccessfully ] =
		useState( false );

	const onScriptLoadSuccessRef = useRef( onScriptLoadSuccess );
	onScriptLoadSuccessRef.current = onScriptLoadSuccess;

	const onScriptLoadErrorRef = useRef( onScriptLoadError );
	onScriptLoadErrorRef.current = onScriptLoadError;

	useEffect( () => {
		const scriptTag = document.createElement( 'script' );
		scriptTag.src = 'https://apis.google.com/js/api.js';
		scriptTag.async = true;
		scriptTag.defer = true;
		scriptTag.nonce = nonce;
		scriptTag.onload = () => {
			setScriptLoadedSuccessfully( true );
			onScriptLoadSuccessRef.current?.();
		};
		scriptTag.onerror = () => {
			setScriptLoadedSuccessfully( false );
			onScriptLoadErrorRef.current?.();
		};

		document.body.appendChild( scriptTag );

		return () => {
			document.body.removeChild( scriptTag );
		};
	}, [ nonce ] );

	return scriptLoadedSuccessfully;
}
