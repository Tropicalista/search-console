(()=>{"use strict";let e="";const t={siteUrl:"",rowLimit:null,searchType:"web",startDate:moment().subtract(14,"days").format("YYYY-MM-DD"),endDate:moment().format("YYYY-MM-DD"),dimensions:["page"]},o=[];function n(){gapi.client.load("searchconsole","v1").then((()=>{gapi.auth.setToken({access_token:e}),gapi.client.webmasters.searchanalytics.query(t).then((function(e){e.result.rows.forEach((function(e){o.indexOf(e.keys[0])>-1&&jQuery('span[data-url="'+e.keys[0]+'"]').html("<b>Clicks:</b> "+e.clicks+"<br><b>Position:</b> "+Math.round(100*e.position)/100+"<br><b>CTR:</b> "+Math.round(1e4*e.ctr)/100+"%<br><b>Impressions:</b> "+e.impressions)}))})).then(null,(function(e){console.log(e)}))}))}jQuery(document).ready((function(){jQuery(".gsc-url").each((function(e){console.log(jQuery(this).data("url")),o.push(jQuery(this).data("url"))}))})),window.onGoogleScriptLoad=()=>{window.gapi,wp.apiRequest({path:"/searchconsole/v1/settings/"}).then((o=>{e=o.token,t.siteUrl=o.site,gapi.load("client",n)})).catch((e=>console.log(e.responseText)))},function(){const e="google-js",t=document.getElementsByTagName("script")[0];if(document.getElementById(e))return;const o=document.createElement("script");o.id=e,o.src="https://apis.google.com/js/platform.js",o.onload=window.onGoogleScriptLoad,t.parentNode.insertBefore(o,t)}()})();