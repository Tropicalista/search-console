(()=>{"use strict";var e={n:t=>{var o=t&&t.__esModule?()=>t.default:()=>t;return e.d(o,{a:o}),o},d:(t,o)=>{for(var n in o)e.o(o,n)&&!e.o(t,n)&&Object.defineProperty(t,n,{enumerable:!0,get:o[n]})},o:(e,t)=>Object.prototype.hasOwnProperty.call(e,t)};const t=window.wp.date,o=window.wp.apiFetch;var n=e.n(o);let a="";const s={siteUrl:"",rowLimit:null,searchType:"web",startDate:(0,t.dateI18n)("Y-m-d",(new Date).setDate((new Date).getDate()-29)),endDate:(0,t.dateI18n)("Y-m-d",(new Date).setDate((new Date).getDate()-1)),dimensions:["page"]},r=[];function c(){gapi.client.load("searchconsole","v1").then((()=>{gapi.auth.setToken(a),gapi.client.webmasters.searchanalytics.query(s).then((function(e){e.result.rows.forEach((function(e){r.indexOf(e.keys[0])>-1&&jQuery('span[data-url="'+e.keys[0]+'"]').html("<b>Clicks:</b> "+e.clicks+"<br><b>Position:</b> "+Math.round(100*e.position)/100+"<br><b>CTR:</b> "+Math.round(1e4*e.ctr)/100+"%<br><b>Impressions:</b> "+e.impressions)}))})).catch((e=>{401===e.status&&n()({path:"/searchconsole/v1/refresh",method:"POST"}).then((e=>{gapi.auth.setToken(e)})).catch((e=>{console.log(e)})).finally((()=>console.log("refreshed")))}))}))}jQuery(document).ready((function(){jQuery(".gsc-url").each((function(e){r.push(jQuery(this).data("url"))}))})),window.onGoogleScriptLoad=()=>{window.gapi,n()({path:"/searchconsole/v1/settings/"}).then((e=>{a=e.token,s.siteUrl=e.site,gapi.load("client",c)})).catch((e=>console.log(e.responseText)))},function(){const e="google-js",t=document.getElementsByTagName("script")[0];if(document.getElementById(e))return;const o=document.createElement("script");o.id=e,o.src="https://apis.google.com/js/platform.js",o.onload=window.onGoogleScriptLoad,t.parentNode.insertBefore(o,t)}()})();