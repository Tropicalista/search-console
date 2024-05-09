(()=>{"use strict";var e={n:t=>{var o=t&&t.__esModule?()=>t.default:()=>t;return e.d(o,{a:o}),o},d:(t,o)=>{for(var r in o)e.o(o,r)&&!e.o(t,r)&&Object.defineProperty(t,r,{enumerable:!0,get:o[r]})},o:(e,t)=>Object.prototype.hasOwnProperty.call(e,t)};const t=window.React,o=window.wp.element,r=window.wp.i18n,n=window.wp.components,s=window.wp.url;function a(e){let{onLoad:o,onError:r,...n}=e;const[s,a]=function(e){let{chartVersion:o="current",chartPackages:r=["corechart","controls"],chartLanguage:n="en",mapsApiKey:s}=e;const[a,i]=(0,t.useState)(null),[l,c]=(0,t.useState)(!1);var h,d,p;return h="https://www.gstatic.com/charts/loader.js",d=()=>{const e=null===window||void 0===window?void 0:window.google;e&&(e.charts.load(o,{packages:r,language:n,mapsApiKey:s}),e.charts.setOnLoadCallback((()=>{i(e)})))},p=()=>{c(!0)},(0,t.useEffect)((()=>{if(!document)return;const e=document.querySelector('script[src="'.concat(h,'"]'));if(null==e?void 0:e.dataset.loaded)return void(null==d||d());const t=e||document.createElement("script");e||(t.src=h);const o=()=>{t.dataset.loaded="1",null==d||d()};return t.addEventListener("load",o),p&&t.addEventListener("error",p),e||document.head.append(t),()=>{t.removeEventListener("load",o),p&&t.removeEventListener("error",p)}}),[]),[a,l]}(n);return(0,t.useEffect)((()=>{s&&o&&o(s)}),[s]),(0,t.useEffect)((()=>{a&&r&&r()}),[a]),null}const i={legend_toggle:!1,options:{},legendToggle:!1,getChartWrapper:()=>{},spreadSheetQueryParameters:{headers:1,gid:1},rootProps:{},chartWrapperParams:{}};let l=0;const c=["#3366CC","#DC3912","#FF9900","#109618","#990099","#3B3EAC","#0099C6","#DD4477","#66AA00","#B82E2E","#316395","#994499","#22AA99","#AAAA11","#6633CC","#E67300","#8B0707","#329262","#5574A6","#3B3EAC"],{Provider:h,Consumer:d}=t.createContext(i),p=e=>{let{children:o,value:r}=e;return t.createElement(h,{value:r},o)},u=e=>{let{render:o}=e;return t.createElement(d,null,(e=>o(e)))};class g extends t.Component{componentDidMount(){this.draw(this.props),window.addEventListener("resize",this.onResize),(this.props.legend_toggle||this.props.legendToggle)&&this.listenToLegendToggle()}componentWillUnmount(){const{google:e,googleChartWrapper:t}=this.props;window.removeEventListener("resize",this.onResize),e.visualization.events.removeAllListeners(t),"Timeline"===t.getChartType()&&t.getChart()&&t.getChart().clearChart()}componentDidUpdate(){this.draw(this.props)}render(){return null}constructor(...e){super(...e),this.state={hiddenColumns:[]},this.listenToLegendToggle=()=>{const{google:e,googleChartWrapper:t}=this.props;e.visualization.events.addListener(t,"select",(()=>{const e=t.getChart().getSelection(),o=t.getDataTable();if(0===e.length||e[0].row||!o)return;const r=e[0].column,n=this.getColumnID(o,r);this.state.hiddenColumns.includes(n)?this.setState((e=>({...e,hiddenColumns:[...e.hiddenColumns.filter((e=>e!==n))]}))):this.setState((e=>({...e,hiddenColumns:[...e.hiddenColumns,n]})))}))},this.applyFormatters=(e,t)=>{const{google:o}=this.props;for(let r of t)switch(r.type){case"ArrowFormat":new o.visualization.ArrowFormat(r.options).format(e,r.column);break;case"BarFormat":new o.visualization.BarFormat(r.options).format(e,r.column);break;case"ColorFormat":{const t=new o.visualization.ColorFormat(r.options),{ranges:n}=r;for(let e of n)t.addRange(...e);t.format(e,r.column);break}case"DateFormat":new o.visualization.DateFormat(r.options).format(e,r.column);break;case"NumberFormat":new o.visualization.NumberFormat(r.options).format(e,r.column);break;case"PatternFormat":new o.visualization.PatternFormat(r.options).format(e,r.column)}},this.getColumnID=(e,t)=>e.getColumnId(t)||e.getColumnLabel(t),this.draw=async e=>{let{data:t,diffdata:o,rows:r,columns:n,options:s,legend_toggle:a,legendToggle:i,chartType:l,formatters:c,spreadSheetUrl:h,spreadSheetQueryParameters:d}=e;const{google:p,googleChartWrapper:u}=this.props;let g,m=null;if(o){const e=p.visualization.arrayToDataTable(o.old),t=p.visualization.arrayToDataTable(o.new);m=p.visualization[l].prototype.computeDiff(e,t)}g=null!==t?Array.isArray(t)?p.visualization.arrayToDataTable(t):new p.visualization.DataTable(t):r&&n?p.visualization.arrayToDataTable([n,...r]):h?await async function(e,t){let o=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};return new Promise(((r,n)=>{const s="".concat(o.headers?"headers=".concat(o.headers):"headers=0"),a="".concat(o.query?"&tq=".concat(encodeURIComponent(o.query)):""),i="".concat(o.gid?"&gid=".concat(o.gid):""),l="".concat(o.sheet?"&sheet=".concat(o.sheet):""),c="".concat(o.access_token?"&access_token=".concat(o.access_token):""),h="".concat(s).concat(i).concat(l).concat(a).concat(c),d="".concat(t,"/gviz/tq?").concat(h);new e.visualization.Query(d).send((e=>{e.isError()?n("Error in query:  ".concat(e.getMessage()," ").concat(e.getDetailedMessage())):r(e.getDataTable())}))}))}(p,h,d):p.visualization.arrayToDataTable([]);const f=g.getNumberOfColumns();for(let e=0;e<f;e+=1){const t=this.getColumnID(g,e);if(this.state.hiddenColumns.includes(t)){const t=g.getColumnLabel(e),o=g.getColumnId(e),r=g.getColumnType(e);g.removeColumn(e),g.addColumn({label:t,id:o,type:r})}}const v=u.getChart();"Timeline"===u.getChartType()&&v&&v.clearChart(),u.setChartType(l),u.setOptions(s||{}),u.setDataTable(g),u.draw(),null!==this.props.googleChartDashboard&&this.props.googleChartDashboard.draw(g),m&&(u.setDataTable(m),u.draw()),c&&(this.applyFormatters(g,c),u.setDataTable(g),u.draw()),!0!==i&&!0!==a||this.grayOutHiddenColumns({options:s})},this.grayOutHiddenColumns=e=>{let{options:t}=e;const{googleChartWrapper:o}=this.props,r=o.getDataTable();if(!r)return;const n=r.getNumberOfColumns();if(!1==this.state.hiddenColumns.length>0)return;const s=Array.from({length:n-1}).map(((e,o)=>{const n=this.getColumnID(r,o+1);return this.state.hiddenColumns.includes(n)?"#CCCCCC":t&&t.colors?t.colors[o]:c[o]}));o.setOptions({...t,colors:s}),o.draw()},this.onResize=()=>{const{googleChartWrapper:e}=this.props;e.draw()}}}class m extends t.Component{componentDidMount(){}componentWillUnmount(){}shouldComponentUpdate(){return!1}render(){const{google:e,googleChartWrapper:o,googleChartDashboard:r}=this.props;return t.createElement(u,{render:n=>t.createElement(g,Object.assign({},n,{google:e,googleChartWrapper:o,googleChartDashboard:r}))})}}class f extends t.Component{shouldComponentUpdate(){return!1}listenToEvents(e){let{chartEvents:t,google:o,googleChartWrapper:r}=e;if(t){o.visualization.events.removeAllListeners(r);for(let e of t){var n=this;const{eventName:t,callback:s}=e;o.visualization.events.addListener(r,t,(function(){for(var e=arguments.length,t=new Array(e),a=0;a<e;a++)t[a]=arguments[a];s({chartWrapper:r,props:n.props,google:o,eventArgs:t})}))}}}render(){const{google:e,googleChartWrapper:o}=this.props;return t.createElement(u,{render:t=>(this.listenToEvents({chartEvents:t.chartEvents||null,google:e,googleChartWrapper:o}),null)})}}let v=0;class C extends t.Component{componentDidMount(){const{options:e,google:t,chartType:o,chartWrapperParams:r,toolbarItems:n,getChartEditor:s,getChartWrapper:a}=this.props,i={chartType:o,options:e,containerId:this.getGraphID(),...r},l=new t.visualization.ChartWrapper(i);l.setOptions(e||{}),a&&a(l,t);const c=new t.visualization.Dashboard(this.dashboard_ref),h=this.addControls(l,c);n&&t.visualization.drawToolbar(this.toolbar_ref.current,n);let d=null;s&&(d=new t.visualization.ChartEditor,s({chartEditor:d,chartWrapper:l,google:t})),this.setState({googleChartEditor:d,googleChartControls:h,googleChartDashboard:c,googleChartWrapper:l,isReady:!0})}componentDidUpdate(){if(!this.state.googleChartWrapper)return;if(!this.state.googleChartDashboard)return;if(!this.state.googleChartControls)return;const{controls:e}=this.props;if(e)for(let t=0;t<e.length;t+=1){const{controlType:o,options:r,controlWrapperParams:n}=e[t];n&&"state"in n&&this.state.googleChartControls[t].control.setState(n.state),this.state.googleChartControls[t].control.setOptions(r),this.state.googleChartControls[t].control.setControlType(o)}}shouldComponentUpdate(e,t){return this.state.isReady!==t.isReady||e.controls!==this.props.controls}render(){const{width:e,height:o,options:r,style:n}=this.props,s={height:o||r&&r.height,width:e||r&&r.width,...n};return this.props.render?t.createElement("div",{ref:this.dashboard_ref,style:s},t.createElement("div",{ref:this.toolbar_ref,id:"toolbar"}),this.props.render({renderChart:this.renderChart,renderControl:this.renderControl,renderToolbar:this.renderToolBar})):t.createElement("div",{ref:this.dashboard_ref,style:s},this.renderControl((e=>{let{controlProp:t}=e;return"bottom"!==t.controlPosition})),this.renderChart(),this.renderControl((e=>{let{controlProp:t}=e;return"bottom"===t.controlPosition})),this.renderToolBar())}constructor(...e){var o;super(),o=this,this.state={googleChartWrapper:null,googleChartDashboard:null,googleChartControls:null,googleChartEditor:null,isReady:!1},this.graphID=null,this.dashboard_ref=t.createRef(),this.toolbar_ref=t.createRef(),this.getGraphID=()=>{const{graphID:e,graph_id:t}=this.props;let o;return e||t?o=e&&!t?e:t&&!e?t:e:this.graphID?o=this.graphID:(l+=1,o="reactgooglegraph-".concat(l)),this.graphID=o,this.graphID},this.getControlID=(e,t)=>{let o;return v+=1,o=void 0===e?"googlechart-control-".concat(t,"-").concat(v):e,o},this.addControls=(e,t)=>{const{google:o,controls:r}=this.props,n=r?r.map(((e,t)=>{const{controlID:r,controlType:n,options:s,controlWrapperParams:a}=e,i=this.getControlID(r,t);return{controlProp:e,control:new o.visualization.ControlWrapper({containerId:i,controlType:n,options:s,...a})}})):null;if(!n)return null;t.bind(n.map((e=>{let{control:t}=e;return t})),e);for(let t of n){const{control:r,controlProp:n}=t,{controlEvents:a=[]}=n;for(let t of a){var s=this;const{callback:n,eventName:a}=t;o.visualization.events.removeListener(r,a,n),o.visualization.events.addListener(r,a,(function(){for(var t=arguments.length,a=new Array(t),i=0;i<t;i++)a[i]=arguments[i];n({chartWrapper:e,controlWrapper:r,props:s.props,google:o,eventArgs:a})}))}}return n},this.renderChart=()=>{const{width:e,height:o,options:r,style:n,className:s,rootProps:a,google:i}=this.props,l={height:o||r&&r.height,width:e||r&&r.width,...n};return t.createElement("div",Object.assign({id:this.getGraphID(),style:l,className:s},a),this.state.isReady&&null!==this.state.googleChartWrapper?t.createElement(t.Fragment,null,t.createElement(m,{googleChartWrapper:this.state.googleChartWrapper,google:i,googleChartDashboard:this.state.googleChartDashboard}),t.createElement(f,{googleChartWrapper:this.state.googleChartWrapper,google:i})):null)},this.renderControl=function(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:e=>!0;return o.state.isReady&&null!==o.state.googleChartControls?t.createElement(t.Fragment,null,o.state.googleChartControls.filter((t=>{let{controlProp:o,control:r}=t;return e({control:r,controlProp:o})})).map((e=>{let{control:o,controlProp:r}=e;return t.createElement("div",{key:o.getContainerId(),id:o.getContainerId()})}))):null},this.renderToolBar=()=>this.props.toolbarItems?t.createElement("div",{ref:this.toolbar_ref}):null}}class y extends t.Component{render(){const{chartLanguage:e,chartPackages:o,chartVersion:r,mapsApiKey:n,loader:s,errorElement:i}=this.props;return t.createElement(p,{value:this.props},"ready"===this.state.loadingStatus&&null!==this.state.google?t.createElement(C,Object.assign({},this.props,{google:this.state.google})):"errored"===this.state.loadingStatus&&i?i:s,t.createElement(a,{chartLanguage:e,chartPackages:o,chartVersion:r,mapsApiKey:n,onLoad:this.onLoad,onError:this.onError}))}componentDidMount(){this._isMounted=!0}componentWillUnmount(){this._isMounted=!1}isFullyLoaded(e){const{controls:t,toolbarItems:o,getChartEditor:r}=this.props;return e&&e.visualization&&e.visualization.ChartWrapper&&e.visualization.Dashboard&&(!t||e.visualization.ChartWrapper)&&(!r||e.visualization.ChartEditor)&&(!o||e.visualization.drawToolbar)}constructor(...e){super(...e),this._isMounted=!1,this.state={loadingStatus:"loading",google:null},this.onLoad=e=>{if(this.props.onLoad&&this.props.onLoad(e),this.isFullyLoaded(e))this.onSuccess(e);else{const e=setInterval((()=>{const t=window.google;this._isMounted?t&&this.isFullyLoaded(t)&&(clearInterval(e),this.onSuccess(t)):clearInterval(e)}),1e3)}},this.onSuccess=e=>{this.setState({loadingStatus:"ready",google:e})},this.onError=()=>{this.setState({loadingStatus:"errored"})}}}var E;y.defaultProps=i,function(e){e.annotation="annotation",e.annotationText="annotationText",e.certainty="certainty",e.emphasis="emphasis",e.interval="interval",e.scope="scope",e.style="style",e.tooltip="tooltip",e.domain="domain"}(E||(E={}));const w={width:"100%",height:"400",colors:["#4285f4","#5e35b1","#00897b","#E8710A"],focusTarget:"category",chartArea:{width:"100%",height:"80%"},hAxis:{gridlines:{count:0,minSpacing:150},minorGridlines:{count:0},showTextEvery:1,format:"MMM dd"},vAxis:{gridlines:{count:0,minSpacing:100},minorGridlines:{count:1},showTextEvery:2},vAxes:{0:{title:"clicks"},1:{title:"impressions"},2:{format:"#%"},3:{direction:-1}},series:{0:{type:"line",targetAxisIndex:0,tooltip:!0},1:{type:"line",targetAxisIndex:1,tooltip:!0},2:{type:"line",targetAxisIndex:2,tooltip:!0},3:{type:"line",targetAxisIndex:3,tooltip:!0}}},T=window.wp.apiFetch;var D=e.n(T);const S=window.wp.date,b=window.wp.coreData,_=window.wp.data,A=window.wp.notices;function k(){return k=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var o=arguments[t];for(var r in o)Object.prototype.hasOwnProperty.call(o,r)&&(e[r]=o[r])}return e},k.apply(this,arguments)}var I;!function(e){e.Pop="POP",e.Push="PUSH",e.Replace="REPLACE"}(I||(I={}));var P="beforeunload";function x(e){e.preventDefault(),e.returnValue=""}function L(){var e=[];return{get length(){return e.length},push:function(t){return e.push(t),function(){e=e.filter((function(e){return e!==t}))}},call:function(t){e.forEach((function(e){return e&&e(t)}))}}}const F=function(e){void 0===e&&(e={});var t=e.window,o=void 0===t?document.defaultView:t,r=o.history;function n(){var e=o.location,t=e.pathname,n=e.search,s=e.hash,a=r.state||{};return[a.idx,{pathname:t,search:n,hash:s,state:a.usr||null,key:a.key||"default"}]}var s=null;o.addEventListener("popstate",(function(){if(s)d.call(s),s=null;else{var e=I.Pop,t=n(),o=t[0],r=t[1];if(d.length){if(null!=o){var a=l-o;a&&(s={action:e,location:r,retry:function(){v(-1*a)}},v(a))}}else f(e)}}));var a=I.Pop,i=n(),l=i[0],c=i[1],h=L(),d=L();function p(e){return"string"==typeof e?e:(o=(t=e).pathname,r=void 0===o?"/":o,n=t.search,s=void 0===n?"":n,a=t.hash,i=void 0===a?"":a,s&&"?"!==s&&(r+="?"===s.charAt(0)?s:"?"+s),i&&"#"!==i&&(r+="#"===i.charAt(0)?i:"#"+i),r);var t,o,r,n,s,a,i}function u(e,t){return void 0===t&&(t=null),k({pathname:c.pathname,hash:"",search:""},"string"==typeof e?function(e){var t={};if(e){var o=e.indexOf("#");o>=0&&(t.hash=e.substr(o),e=e.substr(0,o));var r=e.indexOf("?");r>=0&&(t.search=e.substr(r),e=e.substr(0,r)),e&&(t.pathname=e)}return t}(e):e,{state:t,key:Math.random().toString(36).substr(2,8)})}function g(e,t){return[{usr:e.state,key:e.key,idx:t},p(e)]}function m(e,t,o){return!d.length||(d.call({action:e,location:t,retry:o}),!1)}function f(e){a=e;var t=n();l=t[0],c=t[1],h.call({action:a,location:c})}function v(e){r.go(e)}return null==l&&(l=0,r.replaceState(k({},r.state,{idx:l}),"")),{get action(){return a},get location(){return c},createHref:p,push:function e(t,n){var s=I.Push,a=u(t,n);if(m(s,a,(function(){e(t,n)}))){var i=g(a,l+1),c=i[0],h=i[1];try{r.pushState(c,"",h)}catch(e){o.location.assign(h)}f(s)}},replace:function e(t,o){var n=I.Replace,s=u(t,o);if(m(n,s,(function(){e(t,o)}))){var a=g(s,l),i=a[0],c=a[1];r.replaceState(i,"",c),f(n)}},go:v,back:function(){v(-1)},forward:function(){v(1)},listen:function(e){return h.push(e)},block:function(e){var t=d.push(e);return 1===d.length&&o.addEventListener(P,x),function(){t(),d.length||o.removeEventListener(P,x)}}}}(),R=F.push,z=F.replace;F.push=function(e,t){const o=(0,s.getQueryArgs)(window.location.href),r=(0,s.removeQueryArgs)(window.location.href,...Object.keys(o)),n=(0,s.addQueryArgs)(r,e);return R.call(F,n,t)},F.replace=function(e,t){const o=(0,s.getQueryArgs)(window.location.href),r=(0,s.removeQueryArgs)(window.location.href,...Object.keys(o)),n=(0,s.addQueryArgs)(r,e);return z.call(F,n,t)},(0,o.createContext)();const O=(0,o.createContext)(),W=(0,o.createContext)(),M=function(e){const n={customDate:!1,type:"web",startDate:(0,S.dateI18n)("Y-m-d",(new Date).setDate((new Date).getDate()-29)),endDate:(0,S.dateI18n)("Y-m-d",(new Date).setDate((new Date).getDate()-1)),dimensions:["QUERY"],fields:"rows",dimensionFilterGroups:[]},[s,a]=(0,o.useState)(!1),[i,l]=(0,o.useState)(n),[c,h]=(0,o.useState)(!1),d=(0,o.useContext)(O),[p,u]=(0,b.useEntityProp)("root","site","search_console"),{saveEditedEntityRecord:g}=(0,_.useDispatch)(b.store),{createNotice:m}=(0,_.useDispatch)(A.store),{isSaving:f,hasEdits:v}=(0,_.useSelect)((e=>({isSaving:e(b.store).isSavingEntityRecord("root","site"),hasEdits:e(b.store).hasEditsForEntityRecord("root","site",void 0,"search_console")})),[]),C=()=>{D()({path:"/searchconsole/v1/refresh",method:"POST"}).then((e=>{u({...p,token:e}),window.gapi.client.setToken(e),E()})).catch((e=>{console.log(e),m("error","⚠️ "+e.message.error_description,{type:"snackbar",explicitDismiss:!0,actions:[{label:"Reauthenticate on settings page",onClick:()=>d.push({page:"search-console-settings"})}]})}))},y=(e,t)=>{u({...p,[e]:t})};(0,o.useEffect)((()=>{const e=document.createElement("script");return e.src="https://apis.google.com/js/api.js",e.async=!0,e.defer=!0,e.onload=async()=>await window.gapi.load("client",E),document.body.appendChild(e),()=>{document.body.removeChild(e)}}),[]);const E=()=>{window.gapi.client.setToken(window.search_console.token),window.gapi.client.load("searchconsole","v1").then((()=>{w()}))},w=()=>{a(!0)};return(0,t.createElement)(W.Provider,{value:{query:i,updateQuery:(e,t)=>{l({...i,[e]:t})},settings:p,updateSetting:y,setSettings:u,saveSettings:async()=>g("root","site").then((()=>{m("info","🎯 "+(0,r.__)("Settings saved.","formello"),{type:"snackbar"})})).catch((e=>{m("error","⚠️ "+e.message,{type:"snackbar",explicitDismiss:!0})})),isSaving:f,ready:s,refreshToken:C,revokeToken:()=>{D()({path:"/searchconsole/v1/revoke",method:"POST",data:{token:p.token.refresh_token}}).then((()=>{y("token",{access_token:"",expires_in:3600,id_token:"",refresh_token:"",scope:"",token_type:""}),h(!1)}))},email:c,hasEdits:v,showError:e=>{401!==e.status&&m("error","⚠️ "+e.result.error.message,{type:"snackbar",explicitDismiss:!0}),401===e.status&&C()}}},e.children)};function N({text:e}){return(0,t.createElement)("div",{className:"loading-settings"},(0,t.createElement)(n.Spinner,null),(0,t.createElement)("span",{className:"description"},e))}function U(){const{settings:e,query:s,showError:a}=(0,o.useContext)(W),[i,l]=(0,o.useState)(!1);(0,o.useEffect)((()=>{e.token.access_token&&c()}),[s,e.token]);const c=()=>{window.gapi?.client?.setToken(e.token),window.gapi?.client?.webmasters?.searchanalytics.query({...s,siteUrl:e.site,dimensions:["date"],fields:"rows"}).then((e=>{const t=e.result.rows,o=[];o.push([(0,r.__)("Keys","search-console"),(0,r.__)("Clicks","search-console"),(0,r.__)("Impressions","search-console"),"CTR",(0,r.__)("Position","search-console")]),t.forEach((e=>{o.push([window.moment(e.keys[0],"YYYY-MM-DD").toDate(),e.clicks,e.impressions,100*e.ctr,parseFloat(e.position)])})),l(o)})).catch((e=>{a(e)}))};return i?(0,t.createElement)("div",{className:"search-console-chart"},(0,t.createElement)(y,{chartType:"LineChart",loader:(0,t.createElement)(n.Spinner,null),data:i,options:w,legendToggle:!0})):(0,t.createElement)(N,{text:(0,r.__)("Fetching data…","search-console")})}const Q={settings:!1,sites:[{label:"Select a site",value:""}],customDate:!1,dimension:"query",searchType:"web",startDate:(0,S.dateI18n)("Y-m-d",(new Date).setDate((new Date).getDate()-29)),endDate:(0,S.dateI18n)("Y-m-d",(new Date).setDate((new Date).getDate()-1)),filters:[]},j={setSites:e=>({type:"SET_SITES",sites:e}),setSettings:e=>({type:"SET_SETTINGS",settings:e}),setSetting:(e,t)=>({type:"SET_SETTING",setting:e,value:t}),setSearchType:e=>({type:"SET_SEARCHTYPE",searchType:e}),setFilter:e=>({type:"SET_FILTER",filter:e}),setDimension:e=>({type:"SET_DIMENSION",dimension:e}),setCustomDate:e=>({type:"SET_CUSTOMDATE",val:e}),setStartDate:e=>({type:"SET_STARTDATE",date:e}),setEndDate:e=>({type:"SET_ENDDATE",date:e}),removeFilter:e=>({type:"REMOVE_FILTER",filter:e}),fetchFromAPI:e=>({type:"FETCH_FROM_API",path:e})},Y=(0,_.createReduxStore)("searchconsole",{reducer(e=Q,t){switch(t.type){case"SET_SETTINGS":return{...e,settings:t.settings};case"SET_SITES":return{...e,sites:t.sites};case"SET_SETTING":return{...e,settings:{...e.settings,[t.setting]:t.value}};case"SET_SEARCHTYPE":return{...e,searchType:t.searchType};case"SET_DIMENSION":return{...e,dimension:t.dimension};case"SET_CUSTOMDATE":return{...e,customDate:t.val};case"SET_STARTDATE":return{...e,startDate:t.date};case"SET_ENDDATE":return{...e,endDate:t.date};case"SET_FILTER":const o={dimension:t.filter.dimension,expression:t.filter.expression,operator:t.filter.operator},r=e.filters.filter((e=>e.dimension!==t.filter.dimension));return r.push(o),{...e,filters:r};case"REMOVE_FILTER":const n=e.filters.filter((e=>e.dimension!==t.filter.dimension));return{...e,filters:n}}return e},actions:j,selectors:{isReady(e){var t;return null!==(t=e.settings)&&void 0!==t&&t},getSettings(e){const{settings:t}=e;return t},getSites(e){const{sites:t}=e;return t},getSite(e){const{settings:t}=e;return t.site},getQuery(e){const{searchType:t,filters:o,dimension:r,startDate:n,endDate:s}=e;return{dimension:r,startDate:n,endDate:s,searchType:t,filters:o}},getFilterByDimension:(e,t)=>e.filters.length?e.filters.find((e=>e.dimension===t)):{dimension:"",expression:"",operator:""},getSearchType(e){const{searchType:t}=e;return t},getFilters(e){const{filters:t}=e;return t},getCustomDate(e){const{customDate:t}=e;return t}},controls:{FETCH_FROM_API:e=>D()({path:e.path})},resolvers:{*getSettings(){const e=yield j.fetchFromAPI("/searchconsole/v1/settings/");return j.setSettings(e)}}});(0,_.register)(Y);const B=()=>{const{settings:e,ready:a}=(0,o.useContext)(W);return a&&e?e?.site&&e?.credentials?.client_secret&&e?.credentials?.client_id&&e.token.refresh_token?(0,t.createElement)("div",null,(0,t.createElement)(U,null),(0,t.createElement)(o.RawHTML,null,(0,r.sprintf)(/* translators: Developer console url. */ /* translators: Developer console url. */
(0,r.__)('<p>More data on <a href="%s">Search Console dashboard</a>.</p>',"formello"),(0,s.addQueryArgs)("admin.php",{page:"search-console"})))):(0,t.createElement)(n.Notice,{status:"warning",isDismissible:!1},(0,t.createElement)(o.RawHTML,null,(0,r.sprintf)(/* translators: Search console settings url. */ /* translators: Search console settings url. */
(0,r.__)('<p>You need to authenticate and set a site on <a href="%s">settings page</a>.</p>',"formello"),(0,s.addQueryArgs)("admin.php",{page:"search-console-settings"})))):(0,t.createElement)(N,{text:(0,r.__)("Fetching data…","search-console")})},q=()=>(0,t.createElement)(M,null,(0,t.createElement)(B,null));window.addEventListener("DOMContentLoaded",(()=>{const e=document.getElementById("search-console-widget");(0,o.createRoot)(e).render((0,t.createElement)(q,null))}))})();