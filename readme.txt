=== Search Console ===
Contributors: tropicalista
Donate link: https://www.formello.net
Tags: search console, google search console, search console widget, search console metatag
Requires at least: 5.6
Requires PHP: 5.6
Tested up to: 6.6
Stable tag: 3.0.5
License: GPLv2 or later
License URI: http://www.gnu.org/licenses/gpl-2.0.html

View all your Search Console data inside WordPress dashboard.

== Description ==

This plugin display your Search Console analytics data in the WordPress dashboard and adds the verification code of **Google Search Console**, to your site. You can see **Clicks**, **Posistions**, **CTR** and **Impressions**.

A nice full-width dashboard is provided out of the box. 

[youtube https://www.youtube.com/watch?v=r-BxQ_82sdM&t=]

== Features == 

 - Easily insert **Google Search Console metatag** to verify site ownership
 - Wordpress widget chart (**position|clicks|impressions|CTR**)
 - Filter date (14|30|60 days and custom dates)
 - Beautiful full width chart on admin page (**position|clicks|impressions|CTR**)
 - Table with all your keywords (**position|clicks|impressions|CTR**)
 - Add metabox on pages/posts to show performance
 - Full report with all data
 - Filter by page
 - Filter by query
 - Filter by country
 - Filter by device
 - Full report with all sitemap
 - Full report with all site errors
 - Superfast

**CONTRIBUTE**

Search Console is open source and you can [contribute here](https://github.com/Tropicalista/search-console).

## Privacy Policy 
Search Console uses [Appsero](https://appsero.com) SDK to collect some telemetry data upon user's confirmation. This helps us to troubleshoot problems faster & make product improvements.

Appsero SDK **does not gather any data by default.** The SDK only starts gathering basic telemetry data **when a user allows it via the admin notice**. We collect the data to ensure a great user experience for all our users. 

Integrating Appsero SDK **DOES NOT IMMEDIATELY** start gathering data, **without confirmation from users in any case.**

Learn more about how [Appsero collects and uses this data](https://appsero.com/privacy-policy/).

== WHAT’S NEXT ==

If you like this plugin, then consider checking out our other projects:

* [Formello](https://wordpress.org/plugins/formello): a form builder to collect leads, newsletter signup, contact form and more.
* [Popper](https://wordpress.org/plugins/popper): a popup builder to increase leads with exit intent.
* [Mortgage Calculator](https://wordpress.org/plugins/mortgage): a mortgage calculator block for Gutenberg.
* [Pdf Embed](https://wordpress.org/plugins/pdf-embed): a simple block for Gutenberg to embed a PDF using official Adobe Embed API.

== Screenshots ==

1. A beautiful dashboard widget
2. A beautiful chart to display all your Search Console analytics data
3. Automatic generation of metatag
4. Full-width dashboard chart

== Installation ==

There's two ways to install Search Console.

1. Go to "Plugins > Add New" in your Dashboard and search for: Search Console. Then activate the plugin through the 'Plugins' screen in WordPress
2. Download the .zip from WordPress.org, and upload the folder to the `/wp-content/plugins/` directory via FTP.

In most cases, #1 will work fine and is way easier.

== Frequently Asked Questions ==

= Why I get de-authorised every 1 or 2 weeks? =

This is because your Google Cloud project is still in the "Testing" publishing status. Make sure to set it to "Production". For more details
go to [documentation](https://www.francescopepe.com/docs/search-console).

= Will this slow down my site? =
No. This plugin is mostly JavaScript. No data will be download nto database. All data are fetched at the moment using Google API.

= Who will have access to my data? =
No data will be shared to anyone. Only authorized account will see your data. 


== Changelog ==

= 3.0.5 =
* WP 6.6 compatibility

= 3.0.4 =
* Fix url in settings tip

= 3.0.3 =
* Small fix

= 3.0.2 =
* Fix positions series on chart

= 3.0.1 =
* Fix chart ticks

= 3.0 =
* Better widget
* Added widget on post type screen

= 2.9.8 =
* Fix multiple filters
* Small css adjustment

= 2.9.7 =
* Fix filters

= 2.9.6 =
* Added previous comparison on post/page table

= 2.9.5 =
* Better handling of table data
* Aded link to docs

= 2.9.4 =
* Fix dashboard widget
* FIx table response

= 2.9.3 =
* Updated appsero

= 2.9.2 =
* Fixed dashboard widget
* Fixed data not showing on table
* Added email status to button
* Fixed error on token not refreshing

= 2.9.1 =
* Better handling refresh token
* Handling errors
* Show saving message
* Switch to wordpress dataviews table

= 2.9.0 =
* WP 6.5 release

= 2.8.9 =
* fix API

= 2.8.8 =
* Fix token not refreshing

= 2.8.7 =
* Fix settings not always loaded

= 2.8.6 =
* Fix translations

= 2.8.5 =
* Fix wrong defaults settings

= 2.8.4 =
* Fix post table

= 2.8.3 =
* Fix refresh token
* Fix dashboard widget

= 2.8.2 =
* Fix missing capability

= 2.7.3 =
* Fix refresh token on table

= 2.7.2 =
* Added Formello install button

= 2.7.1 =
* Fix date dropdown
* Added 1 month option

= 2.7.0 =
* Fix settings page

= 2.6.8 =
* Fix gapi script loading

= 2.6.7 =
* Fix wrong token refreshing

= 2.6.6 =
* Added appsero

= 2.6.5 =
* Fix gapi load auth

= 2.6.4 =
* Fix gapi load client

= 2.6.3 =
* Fix option name mistyping
* Fix refresh token on table
* Added option to choose where to display
* Added footer

= 2.6.2 =
* Fix site selection

= 2.6.1 =
* Add options removal on uninstall
* Widget as react component

= 2.6.0 =
* Fix link on settings
* Swithed to new GIS service by Google
* Simplify code
* Refactor dashboard and settings to stay in sync with official components

= 2.5.1 =
* Fix link on settings
* Added message on dashboard if not authenticated

= 2.5.0 =
* Fix deletion of old tokenr

= 2.4.9 =
* Update auth method to comply to Google deprecation notice of OOB
* Added custom permission
* Simplify code and added react router

= 2.4.8 =
* FIx readme

= 2.4.7 =
* Sanitize all

= 2.4.6 =
* Security check scanned and fixed

= 2.4.5 =
* Fixed all problem

= 2.4.4 =
* Code beautified

= 2.4.3 =
* Missing translations

= 2.4.2 =
* Missing translations

= 2.4.1 =
* Fix languages

= 2.4.0 =
* Fix api url changes

= 2.3.8 =
* Added translations

* Fix bug on site selection
* Add support for woocommerce produtct table

= 2.3.7 =

* Fix bug on site selection
* Add support for woocommerce produtct table

= 2.3.0 =

* Removed external dependencies
* Code reduction
* new version based on react
* Fix bugs

= 2.2.7 =

Fix bugs

= 2.2.6 =

Small fixes table

= 2.2.5 =

A dependency was not scoped correctly

= 2.2.4 =

Added a scope to dependencies to prevent conflict with other plugins

= 2.2.3 =

* Changed the callback url to prevent conflict with other plugins
* fixed wrong description on advanced settings

= 2.0.0 =

* Better mobile support
* Better integration of auth flow
* More lightweight, more speed

= 1.1.1 =

* Added metabox on posts and pages
* Added data on posts and pages table

= 1.1.0 =

* Added widget
* Small fixes

= 1.0.0 =
* Initial release