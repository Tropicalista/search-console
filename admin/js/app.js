(function(e){function t(t){for(var n,r,o=t[0],l=t[1],c=t[2],d=0,m=[];d<o.length;d++)r=o[d],i[r]&&m.push(i[r][0]),i[r]=0;for(n in l)Object.prototype.hasOwnProperty.call(l,n)&&(e[n]=l[n]);u&&u(t);while(m.length)m.shift()();return s.push.apply(s,c||[]),a()}function a(){for(var e,t=0;t<s.length;t++){for(var a=s[t],n=!0,o=1;o<a.length;o++){var l=a[o];0!==i[l]&&(n=!1)}n&&(s.splice(t--,1),e=r(r.s=a[0]))}return e}var n={},i={app:0},s=[];function r(t){if(n[t])return n[t].exports;var a=n[t]={i:t,l:!1,exports:{}};return e[t].call(a.exports,a,a.exports,r),a.l=!0,a.exports}r.m=e,r.c=n,r.d=function(e,t,a){r.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:a})},r.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.t=function(e,t){if(1&t&&(e=r(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var a=Object.create(null);if(r.r(a),Object.defineProperty(a,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var n in e)r.d(a,n,function(t){return e[t]}.bind(null,n));return a},r.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="/";var o=window["webpackJsonp"]=window["webpackJsonp"]||[],l=o.push.bind(o);o.push=t,o=o.slice();for(var c=0;c<o.length;c++)t(o[c]);var u=l;s.push([0,"chunk-vendors"]),a()})({0:function(e,t,a){e.exports=a("56d7")},"034f":function(e,t,a){"use strict";var n=a("04f5"),i=a.n(n);i.a},"04f5":function(e,t,a){},"0e31":function(e,t,a){"use strict";var n=a("36ed"),i=a.n(n);i.a},2080:function(e,t,a){"use strict";var n=a("423c"),i=a.n(n);i.a},"36ed":function(e,t,a){},"423c":function(e,t,a){},"4be8":function(e,t,a){"use strict";var n=a("fc4e"),i=a.n(n);i.a},"56d7":function(e,t,a){"use strict";a.r(t);a("cadf"),a("551c"),a("097d");var n=a("2b0e"),i=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{attrs:{id:"app"}},[a("div",{staticClass:"container",attrs:{id:"nav"}},[a("router-link",{attrs:{to:"/"}},[e._v("Home")]),e._v(" |\n    "),a("router-link",{attrs:{to:"/sitemap"}},[e._v("Sitemap")]),e._v(" | \n    "),a("router-link",{attrs:{to:"/urlErrors"}},[e._v("Url crawl errors")])],1),a("router-view")],1)},s=[],r=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"ui fluid container"},[a("div",{staticClass:"container"},[a("GChart",{ref:"chart",attrs:{type:"LineChart",data:e.chartData,options:e.chartOptions,events:e.chartEvents}})],1),a("div",{staticClass:"filter-bar ui basic segment grid"},[a("filter-bar"),a("div",{staticClass:"ui form"},[a("div",{staticClass:"inline field"},[a("select",{directives:[{name:"model",rawName:"v-model",value:e.perPage,expression:"perPage"}],staticClass:"three wide column",on:{change:[function(t){var a=Array.prototype.filter.call(t.target.options,function(e){return e.selected}).map(function(e){var t="_value"in e?e._value:e.value;return t});e.perPage=t.target.multiple?a:a[0]},e.doFilter]}},[a("option",{domProps:{value:10}},[e._v("10")]),a("option",{domProps:{value:25}},[e._v("25")]),a("option",{domProps:{value:50}},[e._v("50")]),a("option",{domProps:{value:100}},[e._v("100")])])])]),a("date-range-picker",{attrs:{startDate:e.startDate,endDate:e.endDate,ranges:e.ranges},on:{update:e.setDate}})],1),a("div",{staticClass:"filter-bar ui basic segment grid"},[a("custom-filters")],1),a("div",{staticClass:"ui divider"}),a("Menu"),a("vuetable",{ref:"vuetable",attrs:{"api-mode":!1,fields:e.fields,"data-total":e.dataCount,"data-manager":e.dataManager,"pagination-path":"pagination","per-page":e.perPage},on:{"vuetable:cell-clicked":e.onCellClicked,"vuetable:pagination-data":e.onPaginationData}}),a("div",{staticClass:"ui divider"}),a("vuetable-pagination",{ref:"pagination",staticClass:"pull-right",on:{"vuetable-pagination:change-page":e.onChangePage}}),a("div",{staticClass:"clear"})],1)},o=[],l=(a("20d6"),a("ac6a"),a("386d"),a("3b2b"),a("62b4")),c={abw:"Aruba",afg:"Afghanistan",ago:"Angola",aia:"Anguilla",ala:"Åland Islands",alb:"Albania",and:"Andorra",are:"United Arab Emirates (the)",arg:"Argentina",arm:"Armenia",asm:"American Samoa",ata:"Antarctica",atf:"French Southern Territories (the)",atg:"Antigua and Barbuda",aus:"Australia",aut:"Austria",aze:"Azerbaijan",bdi:"Burundi",bel:"Belgium",ben:"Benin",bes:"Bonaire, Sint Eustatius and Saba",bfa:"Burkina Faso",bgd:"Bangladesh",bgr:"Bulgaria",bhr:"Bahrain",bhs:"Bahamas (the)",bih:"Bosnia and Herzegovina",blm:"Saint Barthélemy",blr:"Belarus",blz:"Belize",bmu:"Bermuda",bol:"Bolivia (Plurinational State of)",bra:"Brazil",brb:"Barbados",brn:"Brunei Darussalam",btn:"Bhutan",bvt:"Bouvet Island",bwa:"Botswana",caf:"Central African Republic (the)",can:"Canada",cck:"Cocos (Keeling) Islands (the)",che:"Switzerland",chl:"Chile",chn:"China",civ:"Côte d'Ivoire",cmr:"Cameroon",cod:"Congo (the Democratic Republic of the)",cog:"Congo (the)",cok:"Cook Islands (the)",col:"Colombia",com:"Comoros (the)",cpv:"Cabo Verde",cri:"Costa Rica",cub:"Cuba",cuw:"Curaçao",cxr:"Christmas Island",cym:"Cayman Islands (the)",cyp:"Cyprus",cze:"Czechia",deu:"Germany",dji:"Djibouti",dma:"Dominica",dnk:"Denmark",dom:"Dominican Republic (the)",dza:"Algeria",ecu:"Ecuador",egy:"Egypt",eri:"Eritrea",esh:"Western Sahara*",esp:"Spain",est:"Estonia",eth:"Ethiopia",fin:"Finland",fji:"Fiji",flk:"Falkland Islands (the) [Malvinas]",fra:"France",fro:"Faroe Islands (the)",fsm:"Micronesia (Federated States of)",gab:"Gabon",gbr:"United Kingdom of Great Britain and Northern Ireland (the)",geo:"Georgia",ggy:"Guernsey",gha:"Ghana",gib:"Gibraltar",gin:"Guinea",glp:"Guadeloupe",gmb:"Gambia (the)",gnb:"Guinea-Bissau",gnq:"Equatorial Guinea",grc:"Greece",grd:"Grenada",grl:"Greenland",gtm:"Guatemala",guf:"French Guiana",gum:"Guam",guy:"Guyana",hkg:"Hong Kong",hmd:"Heard Island and McDonald Islands",hnd:"Honduras",hrv:"Croatia",hti:"Haiti",hun:"Hungary",idn:"Indonesia",imn:"Isle of Man",ind:"India",iot:"British Indian Ocean Territory (the)",irl:"Ireland",irn:"Iran (Islamic Republic of)",irq:"Iraq",isl:"Iceland",isr:"Israel",ita:"Italy",jam:"Jamaica",jey:"Jersey",jor:"Jordan",jpn:"Japan",kaz:"Kazakhstan",ken:"Kenya",kgz:"Kyrgyzstan",khm:"Cambodia",kir:"Kiribati",kna:"Saint Kitts and Nevis",kor:"Korea (the Republic of)",kwt:"Kuwait",lao:"Lao People's Democratic Republic (the)",lbn:"Lebanon",lbr:"Liberia",lby:"Libya",lca:"Saint Lucia",lie:"Liechtenstein",lka:"Sri Lanka",lso:"Lesotho",ltu:"Lithuania",lux:"Luxembourg",lva:"Latvia",mac:"Macao",maf:"Saint Martin (French part)",mar:"Morocco",mco:"Monaco",mda:"Moldova (the Republic of)",mdg:"Madagascar",mdv:"Maldives",mex:"Mexico",mhl:"Marshall Islands (the)",mkd:"Macedonia (the former Yugoslav Republic of)",mli:"Mali",mlt:"Malta",mmr:"Myanmar",mne:"Montenegro",mng:"Mongolia",mnp:"Northern Mariana Islands (the)",moz:"Mozambique",mrt:"Mauritania",msr:"Montserrat",mtq:"Martinique",mus:"Mauritius",mwi:"Malawi",mys:"Malaysia",myt:"Mayotte",nam:"Namibia",ncl:"New Caledonia",ner:"Niger (the)",nfk:"Norfolk Island",nga:"Nigeria",nic:"Nicaragua",niu:"Niue",nld:"Netherlands (the)",nor:"Norway",npl:"Nepal",nru:"Nauru",nzl:"New Zealand",omn:"Oman",pak:"Pakistan",pan:"Panama",pcn:"Pitcairn",per:"Peru",phl:"Philippines (the)",plw:"Palau",png:"Papua New Guinea",pol:"Poland",pri:"Puerto Rico",prk:"Korea (the Democratic People's Republic of)",prt:"Portugal",pry:"Paraguay",pse:"Palestine, State of",pyf:"French Polynesia",qat:"Qatar",reu:"Réunion",rou:"Romania",rus:"Russian Federation (the)",rwa:"Rwanda",sau:"Saudi Arabia",sdn:"Sudan (the)",sen:"Senegal",sgp:"Singapore",sgs:"South Georgia and the South Sandwich Islands",shn:"Saint Helena, Ascension and Tristan da Cunha",sjm:"Svalbard and Jan Mayen",slb:"Solomon Islands",sle:"Sierra Leone",slv:"El Salvador",smr:"San Marino",som:"Somalia",spm:"Saint Pierre and Miquelon",srb:"Serbia",ssd:"South Sudan",stp:"Sao Tome and Principe",sur:"Suriname",svk:"Slovakia",svn:"Slovenia",swe:"Sweden",swz:"Swaziland",sxm:"Sint Maarten (Dutch part)",syc:"Seychelles",syr:"Syrian Arab Republic",tca:"Turks and Caicos Islands (the)",tcd:"Chad",tgo:"Togo",tha:"Thailand",tjk:"Tajikistan",tkl:"Tokelau",tkm:"Turkmenistan",tls:"Timor-Leste",ton:"Tonga",tto:"Trinidad and Tobago",tun:"Tunisia",tur:"Turkey",tuv:"Tuvalu",twn:"Taiwan (Province of China)",tza:"Tanzania, United Republic of",uga:"Uganda",ukr:"Ukraine",umi:"United States Minor Outlying Islands (the)",ury:"Uruguay",usa:"United States of America (the)",uzb:"Uzbekistan",vat:"Holy See (the)",vct:"Saint Vincent and the Grenadines",ven:"Venezuela (Bolivarian Republic of)",vgb:"Virgin Islands (British)",vir:"Virgin Islands (U.S.)",vnm:"Viet Nam",vut:"Vanuatu",wlf:"Wallis and Futuna",wsm:"Samoa",yem:"Yemen",zaf:"South Africa",zmb:"Zambia",zwe:"Zimbabwe"},u=[{name:"keys",sortField:"keys",titleClass:"eight wide",callback:"keyFormat"},{name:"clicks",titleClass:"two wide",sortField:"clicks"},{name:"impressions",titleClass:"two wide",sortField:"impressions"},{name:"ctr",titleClass:"two wide",sortField:"ctr",callback:"ctrFormat"},{name:"position",titleClass:"two wide",sortField:"position"}],d={width:"100%",height:"400",focusTarget:"category",chartArea:{width:"100%",height:"80%"},hAxis:{gridlines:{count:0,minSpacing:150},minorGridlines:{count:0},showTextEvery:2,format:"MMM dd"},vAxis:{gridlines:{count:0,minSpacing:100},minorGridlines:{count:2},showTextEvery:2},vAxes:{0:{direction:-1,maxValue:1,textPosition:"none"},1:{textPosition:"none"},2:{textPosition:"none"},3:{textPosition:"none"}},series:{0:{type:"line",targetAxisIndex:1,tooltip:!0},1:{type:"line",targetAxisIndex:2,tooltip:!0},2:{type:"line",targetAxisIndex:3,tooltip:!0},3:{type:"line",targetAxisIndex:0,tooltip:!0},4:{type:"line",targetAxisIndex:0,tooltip:!0}}},m=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"filter-bar"},[a("div",{staticClass:"ui form"},[a("div",{staticClass:"inline field"},[a("label",[e._v("Search for:")]),a("div",{staticClass:"ui right action left icon input"},[a("i",{directives:[{name:"show",rawName:"v-show",value:e.searchFor.length,expression:"searchFor.length"}],staticClass:"link close icon",on:{click:function(t){return t.preventDefault(),e.resetFilter(t)}}}),a("input",{directives:[{name:"model",rawName:"v-model",value:e.searchFor,expression:"searchFor"}],staticClass:"three wide column",attrs:{type:"text",placeholder:"keyword"},domProps:{value:e.searchFor},on:{keyup:function(t){return"button"in t||!e._k(t.keyCode,"enter",13,t.key,"Enter")?(t.preventDefault(),e.doFilter(t)):null},input:function(t){t.target.composing||(e.searchFor=t.target.value)}}}),a("button",{staticClass:"ui primary button",on:{click:function(t){return t.preventDefault(),e.doFilter(t)}}},[e._v("Go")])])])])])},h=[],p={data:function(){return{searchFor:""}},methods:{doFilter:function(){this.$events.fire("filter-set",this.searchFor)},resetFilter:function(){this.searchFor="",this.$events.fire("filter-reset")}}},f=p,v=(a("0e31"),a("2877")),g=Object(v["a"])(f,m,h,!1,null,null,null);g.options.__file="FilterBar.vue";var b=g.exports,y=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"filter-bar"},[a("a",{staticClass:"ui large label transition visible",on:{click:function(t){e.showModalForm("searchType")}}},[e._v("Search type:"+e._s(e.searchType)),a("i",{staticClass:"search icon"})]),e._l(e.filters,function(t){return a("a",{staticClass:"ui large label transition visible"},[a("span",{on:{click:function(a){e.showModalForm(t,!0)}}},[e._v(e._s(t.dimension)+":"+e._s(t.expression))]),a("i",{staticClass:"delete icon",on:{click:function(a){e.resetFilter(t)}}})])}),a("div",{directives:[{name:"on-clickaway",rawName:"v-on-clickaway",value:e.away,expression:"away"}],staticClass:"ui dropdown primary button",class:{active:e.isActive,visible:e.isActive},on:{click:e.openDropDown}},[a("div",{staticClass:"text"},[e._v("New")]),a("i",{staticClass:"dropdown icon"}),a("div",{staticClass:"menu ",class:{transition:e.isActive,visible:e.isActive}},e._l(e.options,function(t){return a("div",{staticClass:"item",on:{click:function(a){e.showModalForm(t.value)}}},[a("a",[e._v(e._s(t.text))])])}))]),e.showModal?a("mymodal",{on:{close:function(t){e.showModal=!1},clickAwayModal:function(t){e.showModal=!1}}},[a("h3",{attrs:{slot:"header"},slot:"header"},[e._v("Select a filter")]),a("template",{slot:"body"},[a(e.modalType,{ref:"myform",tag:"component"})],1),a("template",{slot:"footer"},[a("div",{staticClass:"button button-primary modal-default-button",on:{click:function(t){e.sendValue()}}},[e._v("\n          Ok\n        ")]),a("div",{staticClass:"button button-secondary modal-default-button",on:{click:function(t){e.showModal=!1}}},[e._v("\n          Cancel\n        ")])])],2):e._e()],2)},w=[],C=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("transition",{attrs:{name:"modal"}},[a("div",{staticClass:"modal-mask"},[a("div",{staticClass:"modal-wrapper"},[a("div",{directives:[{name:"on-clickaway",rawName:"v-on-clickaway",value:e.clickAway,expression:"clickAway"}],staticClass:"modal-container"},[a("div",{staticClass:"modal-header"},[e._t("header",[e._v("\n            default header\n          ")])],2),a("div",{staticClass:"modal-body"},[e._t("body",[e._v("\n            default body\n          ")])],2),a("div",{staticClass:"modal-footer"},[e._t("footer",[e._v("\n            default footer\n            "),a("button",{staticClass:"button button-primary modal-default-button",on:{click:function(t){e.$emit("close")}}},[e._v("\n              OK\n            ")])])],2)])])])])},k=[],x=a("c7db"),D={directives:{onClickaway:x["directive"]},data:function(){return{showModal:!1}},mounted:function(){},created:function(){},methods:{clickAway:function(){this.$emit("clickAwayModal")}}},F=D,S=(a("4be8"),Object(v["a"])(F,C,k,!1,null,null,null));S.options.__file="MyModal.vue";var M=S.exports,T=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("form",{staticClass:"ui form",attrs:{method:"post",id:"theform",action:""}},[a("div",{staticClass:"field"},[a("div",{staticClass:"ui radio checkbox"},[a("input",{directives:[{name:"model",rawName:"v-model",value:e.searchType,expression:"searchType"}],attrs:{type:"radio",value:"web"},domProps:{checked:e._q(e.searchType,"web")},on:{change:function(t){e.searchType="web"}}}),a("label",[e._v("Web")])])]),a("div",{staticClass:"field"},[a("div",{staticClass:"ui radio checkbox"},[a("input",{directives:[{name:"model",rawName:"v-model",value:e.searchType,expression:"searchType"}],attrs:{type:"radio",value:"image"},domProps:{checked:e._q(e.searchType,"image")},on:{change:function(t){e.searchType="image"}}}),a("label",[e._v("Image")])])]),a("div",{staticClass:"field"},[a("div",{staticClass:"ui radio checkbox"},[a("input",{directives:[{name:"model",rawName:"v-model",value:e.searchType,expression:"searchType"}],attrs:{type:"radio",value:"video"},domProps:{checked:e._q(e.searchType,"video")},on:{change:function(t){e.searchType="video"}}}),a("label",[e._v("Video")])])])])},$=[],P={data:function(){return{searchType:this.$parent.$parent.searchType}}},A=P,O=Object(v["a"])(A,T,$,!1,null,null,null);O.options.__file="SearchType.vue";var E=O.exports,I=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("form",{staticClass:"ui form",attrs:{method:"post",id:"theform",action:""}},[a("div",{staticClass:"inline field"},[a("div",{staticClass:"ui radio checkbox"},[a("input",{directives:[{name:"model",rawName:"v-model",value:e.device,expression:"device"}],attrs:{type:"radio",value:"desktop"},domProps:{checked:e._q(e.device,"desktop")},on:{change:[function(t){e.device="desktop"},function(t){e.setFilter(e.device)}]}}),a("label",[e._v("Desktop")])])]),a("div",{staticClass:"inline field"},[a("div",{staticClass:"ui radio checkbox"},[a("input",{directives:[{name:"model",rawName:"v-model",value:e.device,expression:"device"}],attrs:{type:"radio",value:"mobile"},domProps:{checked:e._q(e.device,"mobile")},on:{change:[function(t){e.device="mobile"},function(t){e.setFilter(e.device)}]}}),a("label",[e._v("Mobile")])])]),a("div",{staticClass:"inline field"},[a("div",{staticClass:"ui radio checkbox"},[a("input",{directives:[{name:"model",rawName:"v-model",value:e.device,expression:"device"}],attrs:{type:"radio",value:"tablet"},domProps:{checked:e._q(e.device,"tablet")},on:{change:[function(t){e.device="tablet"},function(t){e.setFilter(e.device)}]}}),a("label",[e._v("Tablet")])])])])},j=[],N={data:function(){return{device:null,filter:null}},methods:{setFilter:function(e){this.filter={dimension:"device",operator:"equals",expression:e}}}},L=N,q=Object(v["a"])(L,I,j,!1,null,null,null);q.options.__file="DeviceForm.vue";var R=q.exports,B=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("form",{attrs:{method:"post",id:"theform",action:""}},e._l(e.countries,function(t){return a("div",{staticClass:"inline field"},[a("div",{staticClass:"ui radio checkbox"},[a("input",{directives:[{name:"model",rawName:"v-model",value:e.country,expression:"country"}],attrs:{type:"radio"},domProps:{value:t.value,checked:e._q(e.country,t.value)},on:{change:[function(a){e.country=t.value},function(t){e.setFilter(e.country)}]}}),a("label",[e._v(e._s(t.text))])])])}))},z=[],G={data:function(){return{countries:[],country:null,filter:null}},mounted:function(){var e=this;gapi.client.webmasters.searchanalytics.query({siteUrl:site,rowLimit:null,searchType:this.$parent.$parent.$parent.searchType,startDate:this.$parent.$parent.$parent.startDate,endDate:this.$parent.$parent.$parent.endDate,dimensions:["country"]}).then(function(t){for(var a=0;a<t.result.rows.length;a++){var n={};n.text=c[t.result.rows[a].keys[0]],n.value=t.result.rows[a].keys[0],e.countries.push(n)}})},methods:{setFilter:function(e){this.filter={dimension:"country",operator:"equals",expression:e}}}},U=G,Y=Object(v["a"])(U,B,z,!1,null,null,null);Y.options.__file="CountryForm.vue";var V=Y.exports,K=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("form",{attrs:{method:"post",id:"theform",action:""}},[a("div",{staticClass:"ui form"},[a("div",{staticClass:"inline field"},[a("select",{directives:[{name:"model",rawName:"v-model",value:e.filter.operator,expression:"filter.operator"}],staticClass:"three wide column",on:{change:function(t){var a=Array.prototype.filter.call(t.target.options,function(e){return e.selected}).map(function(e){var t="_value"in e?e._value:e.value;return t});e.$set(e.filter,"operator",t.target.multiple?a:a[0])}}},[a("option",{attrs:{value:"contains"}},[e._v("Queries containing")]),a("option",{attrs:{value:"not contains"}},[e._v("Queries not containing")]),a("option",{attrs:{value:"exactly"}},[e._v("Query is exactly")])])]),a("div",{staticClass:"inline field"},[a("div",{staticClass:"ui input"},[a("input",{directives:[{name:"model",rawName:"v-model",value:e.filter.expression,expression:"filter.expression"}],attrs:{type:"text",placeholder:"keyword"},domProps:{value:e.filter.expression},on:{input:function(t){t.target.composing||e.$set(e.filter,"expression",t.target.value)}}})])])])])},H=[],J={data:function(){return{isActive:!1,filter:{operator:"contains",dimension:"query"}}}},Q=J,W=Object(v["a"])(Q,K,H,!1,null,null,null);W.options.__file="QueryForm.vue";var Z=W.exports,X=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("form",{staticClass:"ui form",attrs:{method:"post",id:"theform",action:""}},[a("div",{staticClass:"inline field"},[a("select",{directives:[{name:"model",rawName:"v-model",value:e.filter.operator,expression:"filter.operator"}],staticClass:"three wide column",on:{change:function(t){var a=Array.prototype.filter.call(t.target.options,function(e){return e.selected}).map(function(e){var t="_value"in e?e._value:e.value;return t});e.$set(e.filter,"operator",t.target.multiple?a:a[0])}}},[a("option",{attrs:{value:"contains"}},[e._v("URLs containing")]),a("option",{attrs:{value:"notContains"}},[e._v("URLs not containing")]),a("option",{attrs:{value:"equals"}},[e._v("URL is exactly")])])]),a("div",{staticClass:"inline field"},[a("div",{staticClass:"ui input"},[a("input",{directives:[{name:"model",rawName:"v-model",value:e.filter.expression,expression:"filter.expression"}],attrs:{type:"text",placeholder:"http://www.example.com/foo"},domProps:{value:e.filter.expression},on:{input:function(t){t.target.composing||e.$set(e.filter,"expression",t.target.value)}}})])])])},ee=[],te={data:function(){return{isActive:!1,filter:{operator:"contains",dimension:"page"}}}},ae=te,ne=Object(v["a"])(ae,X,ee,!1,null,null,null);ne.options.__file="PageForm.vue";var ie=ne.exports,se={mixins:[x["mixin"]],data:function(){return{isActive:!1,drop:"",showModal:!1,showCloseIcon:!1,closeOnClickAway:!0,modalType:"",options:[{value:"queryForm",text:"Query"},{value:"pageForm",text:"Page"},{value:"countryForm",text:"Country"},{value:"deviceForm",text:"Device"}],filters:this.$parent.filters,searchType:this.$parent.searchType}},methods:{showModalForm:function(e,t){t&&(e=e.dimension+"Form"),this.modalType=e,this.showModal=!0},sendValue:function(){"searchType"==this.$refs.myform.$options._componentTag?(this.searchType=this.$refs.myform.searchType,this.$events.fire("change-searchType",this.$refs.myform.searchType)):this.$events.fire("add-filter",this.$refs.myform.filter),this.showModal=!1},resetFilter:function(e){var t=this.filters.indexOf(e);this.filters.splice(t,1),this.$events.fire("remove-filter",e)},openDropDown:function(){this.isActive=!this.isActive},away:function(){this.isActive=!1}},components:{mymodal:M,countryForm:V,deviceForm:R,pageForm:ie,queryForm:Z,searchType:E}},re=se,oe=(a("c869"),Object(v["a"])(re,y,w,!1,null,null,null));oe.options.__file="CustomFilters.vue";var le=oe.exports,ce=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"ui secondary pointing menu"},[a("a",{staticClass:"item ",class:{active:"query"==e.active},on:{click:function(t){e.doFilter("query")}}},[e._v("Query\n  ")]),a("a",{staticClass:"item ",class:{active:"page"==e.active},on:{click:function(t){e.doFilter("page")}}},[e._v("Pages\n  ")]),a("a",{staticClass:"item ",class:{active:"country"==e.active},on:{click:function(t){e.doFilter("country")}}},[e._v("Countries\n  ")]),a("a",{staticClass:"item ",class:{active:"device"==e.active},on:{click:function(t){e.doFilter("device")}}},[e._v("Devices\n  ")])])},ue=[],de={data:function(){return{dimension:this.$parent.dimension,active:this.$parent.dimension}},methods:{doFilter:function(e){this.$events.fire("set-dimension",e),this.isActive(e)},isActive:function(e){this.active=e}}},me=de,he=Object(v["a"])(me,ce,ue,!1,null,null,null);he.options.__file="Menu.vue";var pe=he.exports,fe=a("aa3a"),ve=a.n(fe);n["default"].use(ve.a);var ge={name:"Home",data:function(){var e=this;return{chartEvents:{select:function(t){var a=e.$refs.chart.chartObject,n=a.getSelection()[0].column;if(n){var i=a.getSelection(),s=i[0].column-1;d.series[s].tooltip=!d.series[s].tooltip,0==d.series[s].lineWidth?(d.series[s].lineWidth=2,d.series[s].areaOpacity=.3):(d.series[s].lineWidth=0,d.series[s].areaOpacity=0),a.draw(e.chartData,d)}}},dimension:"query",showModal:!1,localData:[],chartData:null,perPage:10,dataCount:0,chartOptions:{},filters:[],startDate:moment(new Date).add(-30,"days").format("YYYY-MM-DD"),endDate:moment(new Date).format("YYYY-MM-DD"),ranges:{"Last Week":[moment().startOf("week").subtract(6,"days"),moment().startOf("week")],"Last 28 Days":[moment().subtract(27,"days"),moment()],"Last Month":[moment().subtract(1,"month").startOf("month"),moment().subtract(1,"month").endOf("month")],"Last 3 Months":[moment().subtract(3,"month").startOf("month"),moment().subtract(1,"month").endOf("month")],"Last 6 Months":[moment().subtract(6,"month").startOf("month"),moment().subtract(1,"month").endOf("month")],"Last 12 Months":[moment().subtract(12,"month").startOf("month"),moment().subtract(1,"month").endOf("month")],"Last 16 Months":[moment().subtract(16,"month").startOf("month"),moment().subtract(1,"month").endOf("month")]},searchFor:"",searchType:"web",modalType:"",fields:u,columns:["clicks","ctr","impressions","keys","position"]}},created:function(){this.getData()},mounted:function(){var e=this;this.$events.$on("set-dimension",function(t){return e.setDimension(t)}),this.$events.$on("remove-filter",function(t){return e.removeFilter(t)}),this.$events.$on("add-filter",function(t){return e.setFilter(t)}),this.$events.$on("change-searchType",function(t){return e.setSearchType(t)}),this.$events.$on("filter-set",function(t){return e.onFilterSet(t)}),this.$events.$on("filter-reset",function(t){return e.onFilterReset()}),this.$refs.vuetable.setData(this.localData)},watch:{localData:function(e,t){this.$refs.vuetable.refresh()}},methods:{getData:function(){this.getChartData(),this.getTableData()},keyFormat:function(e){return e[0]},ctrFormat:function(e){return(100*e).toFixed(2)+"%"},onPaginationData:function(e){this.$refs.pagination.setPaginationData(e)},onChangePage:function(e){this.$refs.vuetable.changePage(e)},dataManager:function(e,t){var a=this.localData;if(this.searchFor){var n=new RegExp(this.searchFor,"i");a=_.filter(a,function(e){return e.keys[0].search(n)>=0})}return e.length>0&&(a=_.orderBy(a,e[0].sortField,e[0].direction)),t=a?this.$refs.vuetable.makePagination(a.length):"",{pagination:t,data:_.slice(a,t.from-1,t.to)}},doFilter:function(){var e=this;n["default"].nextTick(function(){return e.$refs.vuetable.refresh()})},onCellClicked:function(e){"country"==this.dimension&&(e.keys[0]=_.findKey(c,function(t){return-1!==t.indexOf(e.keys[0])})),this.filters.push({dimension:this.dimension,operator:"equals",expression:e.keys[0]}),this.getData()},resetFilter:function(){this.searchFor="",this.$refs.vuetable.refresh()},setDate:function(e){this.startDate=moment(e.startDate).format("YYYY-MM-DD"),this.endDate=moment(e.endDate).format("YYYY-MM-DD"),this.getData()},formatData:function(e){var t=new google.visualization.DataTable;return t.addColumn("date","Keys"),t.addColumn("number","Clicks"),t.addColumn("number","Impressions"),t.addColumn("number","CTR"),t.addColumn("number","Position"),_.forEach(e,function(e){t.addRow([moment(e.keys[0]).toDate(),e.clicks,e.impressions,100*e.ctr,parseFloat(e.position)])}),t},getTableData:function(){var e=this;gapi.client.webmasters.searchanalytics.query({siteUrl:site,fields:"rows",rowLimit:null,searchType:this.searchType,startDate:this.startDate,endDate:this.endDate,dimensions:[this.dimension],dimensionFilterGroups:[{filters:this.filters}]}).then(function(t){e.chartOptions=d,"country"==e.dimension&&_.forEach(t.result.rows,function(e){e.keys[0]=c[e.keys[0]]}),e.localData=t.result.rows}).then(null,function(e){console.log(e)})},getChartData:function(){var e=this;gapi.client.webmasters.searchanalytics.query({siteUrl:site,rowLimit:null,searchType:this.searchType,startDate:this.startDate,endDate:this.endDate,dimensions:["date"],dimensionFilterGroups:[{filters:this.filters}]}).then(function(t){e.chartOptions=d,e.chartData=e.formatData(t.result.rows)}).then(null,function(e){console.log(e)})},setSearchType:function(e){this.searchType=e,this.getData()},onFilterSet:function(e){this.searchFor=e,this.doFilter()},onFilterReset:function(){this.searchFor="",this.doFilter()},setFilter:function(e){var t=_.findIndex(this.filters,{dimension:e.dimension});t?this.filters.push(e):this.filters.splice(t,1,e),this.getData()},removeFilter:function(e){_.remove(this.filters,e),this.getData()},setDimension:function(e){this.dimension=e,this.getTableData()}},components:{DateRangePicker:l["a"],Menu:pe,CustomFilters:le,FilterBar:b}},be=ge,ye=(a("2080"),Object(v["a"])(be,r,o,!1,null,null,null));ye.options.__file="MyVueTable.vue";var _e=ye.exports,we={name:"app",components:{MyVueTable:_e}},Ce=we,ke=(a("034f"),Object(v["a"])(Ce,i,s,!1,null,null,null));ke.options.__file="App.vue";var xe=ke.exports,De=a("c3d0"),Fe=a("3568"),Se=a("7129"),Me=a("cb43"),Te=a("8c4f"),$e=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("MyVueTable")},Pe=[],Ae={name:"app",components:{MyVueTable:_e}},Oe=Ae,Ee=Object(v["a"])(Oe,$e,Pe,!1,null,null,null);Ee.options.__file="Home.vue";var Ie=Ee.exports,je=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"about"},[a("h1",[e._v("Sitemap for "+e._s(e.site))]),a("h2",[e._v("Submitted sitemaps")]),a("table",{staticClass:"ui celled table"},[e._m(0),a("tbody",e._l(e.sitemap,function(t){return a("tr",[a("td",{attrs:{"data-label":"Name"}},[e.sitemap[0].isSitemapsIndex?a("span",[a("a",{attrs:{href:"#/sitemapDetails/"+encodeURIComponent(e.sitemapPath)}},[e._v(e._s(e.sitemapPath))])]):a("span",[e._v("\n\t      \t"+e._s(encodeURIComponent(e.sitemapPath))+"\n\t      \t")])]),a("td",[e._v(e._s(t.lastSubmitted))]),a("td",[e._v(e._s(t.lastDownloaded))]),a("td",[e._v(e._s(t.errors))]),a("td",[e._v(e._s(t.contents[0].submitted))])])}))])])},Ne=[function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("thead",[a("tr",[a("th",[e._v("Sitemap")]),a("th",[e._v("Submitted")]),a("th",[e._v("Last read")]),a("th",[e._v("Status")]),a("th",[e._v("Discovered urls")])])])}],Le=(a("a481"),{name:"Sitemap",data:function(){return{sitemap:[],sitemapPath:null,site:site}},created:function(){this.getData()},mounted:function(){},methods:{getData:function(){var e=this;gapi.client.webmasters.sitemaps.list({siteUrl:site}).then(function(t){e.sitemap=t.result.sitemap,e.sitemap[0].isSitemapsIndex&&(e.sitemapPath=e.sitemap[0].path.replace(site,""))}).then(null,function(e){console.log(e)})}},components:{}}),qe=Le,Re=Object(v["a"])(qe,je,Ne,!1,null,null,null);Re.options.__file="Sitemap.vue";var Be=Re.exports,ze=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"about"},[a("h1",[e._v("Sitemap for "+e._s(e.site))]),a("h2",[e._v("Sitemaps read")]),a("table",{staticClass:"ui celled table"},[e._m(0),a("tbody",e._l(e.sitemaps,function(t){return a("tr",[a("td",{attrs:{"data-label":"Name"}},[e._v(e._s(t.path))]),a("td",{attrs:{"data-label":"Age"}},[e._v(e._s(t.lastDownloaded))]),a("td",{attrs:{"data-label":"Job"}},[e._v(e._s(t.errors))]),a("td",{attrs:{"data-label":"Job"}},[e._v(e._s(t.contents[0].submitted))])])}))])])},Ge=[function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("thead",[a("tr",[a("th",[e._v("Sitemap")]),a("th",[e._v("Last read")]),a("th",[e._v("Status")]),a("th",[e._v("Discovered urls")])])])}],Ue={name:"SitemapDetails",data:function(){return{sitemaps:[],site:site}},created:function(){console.log(99),this.getSitemaps()},mounted:function(){},methods:{getSitemaps:function(){var e=this;console.log(site),console.log(this.$route),gapi.client.webmasters.sitemaps.list({siteUrl:site,sitemapIndex:site+this.$route.params.sitemap}).then(function(t){console.log(t),e.sitemaps=t.result.sitemap}).then(null,function(e){console.log(e)})}},components:{}},Ye=Ue,Ve=Object(v["a"])(Ye,ze,Ge,!1,null,null,null);Ve.options.__file="SitemapDetails.vue";var Ke=Ve.exports,He=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"about"},[a("h1",[e._v("Errors for "+e._s(e.site))]),a("table",{staticClass:"ui celled table"},[e._m(0),a("tbody",e._l(e.errors,function(t){return a("tr",{attrs:{if:t.entries[0].count}},[a("td",[a("a",{attrs:{href:"#/errorDetails/"+t.category+"/"+t.platform}},[e._v(e._s(t.platform))])]),a("td",[e._v(e._s(t.category))]),a("td",[e._v(e._s(t.entries[0].count))])])}))])])},Je=[function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("thead",[a("tr",[a("th",[e._v("Platform")]),a("th",[e._v("Category")]),a("th",[e._v("Count")])])])}],Qe={name:"Coverage",data:function(){return{errors:[],site:site}},created:function(){this.getData()},mounted:function(){},methods:{getData:function(){var e=this;gapi.client.webmasters.urlcrawlerrorscounts.query({siteUrl:site}).then(function(t){e.errors=t.result.countPerTypes,console.log(t)}).then(null,function(e){console.log(e)})}},components:{}},We=Qe,Ze=Object(v["a"])(We,He,Je,!1,null,null,null);Ze.options.__file="Errors.vue";var Xe=Ze.exports,et=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"about"},[a("h1",[e._v("Errors for "+e._s(e.site))]),a("table",{staticClass:"ui celled table"},[e._m(0),a("tbody",e._l(e.errors,function(t){return a("tr",[a("td",[e._v(e._s(e.site)+e._s(t.pageUrl)+" "),a("a",{attrs:{target:"_blank",href:e.site+t.pageUrl}},[a("span",{staticClass:"dashicons dashicons-external"})])]),a("td",[e._v(e._s(t.first_detected))]),a("td",[e._v(e._s(t.last_crawled))]),a("td",[e._v(e._s(t.responseCode))])])}))])])},tt=[function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("thead",[a("tr",[a("th",[e._v("Page url")]),a("th",[e._v("First detected")]),a("th",[e._v("Last crawled")]),a("th",[e._v("Response code")])])])}],at={name:"ErrorDetails",data:function(){return{errors:[],site:site}},created:function(){this.getData()},mounted:function(){},methods:{getData:function(){var e=this;gapi.client.webmasters.urlcrawlerrorssamples.list({siteUrl:site,category:this.$route.params.category,platform:this.$route.params.platform}).then(function(t){e.errors=t.result.urlCrawlErrorSample}).then(null,function(e){console.log(e)})}},components:{}},nt=at,it=Object(v["a"])(nt,et,tt,!1,null,null,null);it.options.__file="ErrorDetails.vue";var st=it.exports;n["default"].use(Te["a"]);var rt=new Te["a"]({routes:[{path:"/",name:"home",component:Ie},{path:"/sitemap",name:"sitemap",component:Be},{path:"/sitemapDetails/:sitemap",name:"details",component:Ke},{path:"/urlErrors",name:"urlErrors",component:Xe},{path:"/errorDetails/:category/:platform",name:"errorDetails",component:st}]});window._=window.lodash=a("2ef0"),window.moment=a("c32d"),window.axios=a("bc3a"),window.baseUrl=window.axios.defaults.baseURL=document.head.querySelector('meta[name="search-console-baseurl"]').content;var ot=window.navigator.userLanguage||window.navigator.language;moment.locale(ot),n["default"].use(Me["default"]),n["default"].component("vuetable",De["a"]),n["default"].component("vuetable-pagination",Fe["a"]),n["default"].component("vuetable-pagination-dropdown",Se["a"]),n["default"].config.productionTip=!1,gapi.load("client",function(){gapi.auth.setToken({access_token:access_token}),gapi.client.load("webmasters","v3").then(function(){axios.get("api/token").then(function(e){gapi.client.setToken({access_token:e.data}),new n["default"]({router:rt,render:function(e){return e(xe)}}).$mount("#app")})})})},acf8:function(e,t,a){},c32d:function(e,t){e.exports=moment},c869:function(e,t,a){"use strict";var n=a("acf8"),i=a.n(n);i.a},fc4e:function(e,t,a){}});