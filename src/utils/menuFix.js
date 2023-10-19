/**
 * As we are using hash based navigation, hack fix
 * to highlight the current selected menu
 *
 * Requires jQuery
 *
 * @param  slug
 */
function menuFix( slug ) {
	const $ = jQuery;

	const menuRoot = $( '#toplevel_page_' + slug );
	const currentUrl = window.location.href;
	const currentPath = currentUrl.substr( currentUrl.indexOf( 'admin.php' ) );

	menuRoot.on( 'click', 'a', function ( e ) {
		e.preventDefault();
		const self = $( this );

		if ( ! e.target.href ) {
			e.target.href = 'admin.php?page=search-console';
		}

		window.dispatchEvent(
			new CustomEvent( 'changePage', { detail: e.target.href } )
		);

		$( 'ul.wp-submenu li', menuRoot ).removeClass( 'current' );

		if ( self.hasClass( 'wp-has-submenu' ) ) {
			$( 'li.wp-first-item', menuRoot ).addClass( 'current' );
		} else {
			self.parents( 'li' ).addClass( 'current' );
		}
	} );

	$( 'ul.wp-submenu a', menuRoot ).each( function ( index, el ) {
		if ( $( el ).attr( 'href' ) === currentPath ) {
			$( el ).parent().addClass( 'current' );
		}
	} );
}

export default menuFix;

( () => {
	const oldPushState = history.pushState;
	history.pushState = function pushState() {
		const ret = oldPushState.apply( this, arguments );
		window.dispatchEvent( new Event( 'pushstate' ) );
		window.dispatchEvent( new Event( 'locationchange' ) );
		return ret;
	};

	const oldReplaceState = history.replaceState;
	history.replaceState = function replaceState() {
		const ret = oldReplaceState.apply( this, arguments );
		window.dispatchEvent( new Event( 'replacestate' ) );
		window.dispatchEvent( new Event( 'locationchange' ) );
		return ret;
	};

	window.addEventListener( 'popstate', () => {
		window.dispatchEvent( new Event( 'locationchange' ) );
	} );
} )();
