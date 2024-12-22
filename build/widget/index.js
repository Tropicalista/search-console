(()=>{"use strict";var e={n:t=>{var o=t&&t.__esModule?()=>t.default:()=>t;return e.d(o,{a:o}),o},d:(t,o)=>{for(var r in o)e.o(o,r)&&!e.o(t,r)&&Object.defineProperty(t,r,{enumerable:!0,get:o[r]})},o:(e,t)=>Object.prototype.hasOwnProperty.call(e,t)};const t=window.wp.element,o=window.wp.i18n,r=window.wp.components,n=window.wp.url,s=window.React;function a(e){let{onLoad:t,onError:o,...r}=e;const[n,a]=function(e){let{chartVersion:t="current",chartPackages:o=["corechart","controls"],chartLanguage:r="en",mapsApiKey:n}=e;const[a,i]=(0,s.useState)(null),[l,c]=(0,s.useState)(!1);var d,h,p;return d="https://www.gstatic.com/charts/loader.js",h=()=>{const e=null===window||void 0===window?void 0:window.google;e&&(e.charts.load(t,{packages:o,language:r,mapsApiKey:n}),e.charts.setOnLoadCallback((()=>{i(e)})))},p=()=>{c(!0)},(0,s.useEffect)((()=>{if(!document)return;const e=document.querySelector('script[src="'.concat(d,'"]'));if(null==e?void 0:e.dataset.loaded)return void(null==h||h());const t=e||document.createElement("script");e||(t.src=d);const o=()=>{t.dataset.loaded="1",null==h||h()};return t.addEventListener("load",o),p&&t.addEventListener("error",p),e||document.head.append(t),()=>{t.removeEventListener("load",o),p&&t.removeEventListener("error",p)}}),[]),[a,l]}(r);return(0,s.useEffect)((()=>{n&&t&&t(n)}),[n]),(0,s.useEffect)((()=>{a&&o&&o()}),[a]),null}const i={legend_toggle:!1,options:{},legendToggle:!1,getChartWrapper:()=>{},spreadSheetQueryParameters:{headers:1,gid:1},rootProps:{},chartWrapperParams:{}};let l=0;const c=["#3366CC","#DC3912","#FF9900","#109618","#990099","#3B3EAC","#0099C6","#DD4477","#66AA00","#B82E2E","#316395","#994499","#22AA99","#AAAA11","#6633CC","#E67300","#8B0707","#329262","#5574A6","#3B3EAC"],{Provider:d,Consumer:h}=s.createContext(i),p=e=>{let{children:t,value:o}=e;return s.createElement(d,{value:o},t)},u=e=>{let{render:t}=e;return s.createElement(h,null,(e=>t(e)))};class g extends s.Component{componentDidMount(){this.draw(this.props),window.addEventListener("resize",this.onResize),(this.props.legend_toggle||this.props.legendToggle)&&this.listenToLegendToggle()}componentWillUnmount(){const{google:e,googleChartWrapper:t}=this.props;window.removeEventListener("resize",this.onResize),e.visualization.events.removeAllListeners(t),"Timeline"===t.getChartType()&&t.getChart()&&t.getChart().clearChart()}componentDidUpdate(){this.draw(this.props)}render(){return null}constructor(...e){super(...e),this.state={hiddenColumns:[]},this.listenToLegendToggle=()=>{const{google:e,googleChartWrapper:t}=this.props;e.visualization.events.addListener(t,"select",(()=>{const e=t.getChart().getSelection(),o=t.getDataTable();if(0===e.length||e[0].row||!o)return;const r=e[0].column,n=this.getColumnID(o,r);this.state.hiddenColumns.includes(n)?this.setState((e=>({...e,hiddenColumns:[...e.hiddenColumns.filter((e=>e!==n))]}))):this.setState((e=>({...e,hiddenColumns:[...e.hiddenColumns,n]})))}))},this.applyFormatters=(e,t)=>{const{google:o}=this.props;for(let r of t)switch(r.type){case"ArrowFormat":new o.visualization.ArrowFormat(r.options).format(e,r.column);break;case"BarFormat":new o.visualization.BarFormat(r.options).format(e,r.column);break;case"ColorFormat":{const t=new o.visualization.ColorFormat(r.options),{ranges:n}=r;for(let e of n)t.addRange(...e);t.format(e,r.column);break}case"DateFormat":new o.visualization.DateFormat(r.options).format(e,r.column);break;case"NumberFormat":new o.visualization.NumberFormat(r.options).format(e,r.column);break;case"PatternFormat":new o.visualization.PatternFormat(r.options).format(e,r.column)}},this.getColumnID=(e,t)=>e.getColumnId(t)||e.getColumnLabel(t),this.draw=async e=>{let{data:t,diffdata:o,rows:r,columns:n,options:s,legend_toggle:a,legendToggle:i,chartType:l,formatters:c,spreadSheetUrl:d,spreadSheetQueryParameters:h}=e;const{google:p,googleChartWrapper:u}=this.props;let g,m=null;if(o){const e=p.visualization.arrayToDataTable(o.old),t=p.visualization.arrayToDataTable(o.new);m=p.visualization[l].prototype.computeDiff(e,t)}g=null!==t?Array.isArray(t)?p.visualization.arrayToDataTable(t):new p.visualization.DataTable(t):r&&n?p.visualization.arrayToDataTable([n,...r]):d?await async function(e,t){let o=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};return new Promise(((r,n)=>{const s="".concat(o.headers?"headers=".concat(o.headers):"headers=0"),a="".concat(o.query?"&tq=".concat(encodeURIComponent(o.query)):""),i="".concat(o.gid?"&gid=".concat(o.gid):""),l="".concat(o.sheet?"&sheet=".concat(o.sheet):""),c="".concat(o.access_token?"&access_token=".concat(o.access_token):""),d="".concat(s).concat(i).concat(l).concat(a).concat(c),h="".concat(t,"/gviz/tq?").concat(d);new e.visualization.Query(h).send((e=>{e.isError()?n("Error in query:  ".concat(e.getMessage()," ").concat(e.getDetailedMessage())):r(e.getDataTable())}))}))}(p,d,h):p.visualization.arrayToDataTable([]);const f=g.getNumberOfColumns();for(let e=0;e<f;e+=1){const t=this.getColumnID(g,e);if(this.state.hiddenColumns.includes(t)){const t=g.getColumnLabel(e),o=g.getColumnId(e),r=g.getColumnType(e);g.removeColumn(e),g.addColumn({label:t,id:o,type:r})}}const v=u.getChart();"Timeline"===u.getChartType()&&v&&v.clearChart(),u.setChartType(l),u.setOptions(s||{}),u.setDataTable(g),u.draw(),null!==this.props.googleChartDashboard&&this.props.googleChartDashboard.draw(g),m&&(u.setDataTable(m),u.draw()),c&&(this.applyFormatters(g,c),u.setDataTable(g),u.draw()),!0!==i&&!0!==a||this.grayOutHiddenColumns({options:s})},this.grayOutHiddenColumns=e=>{let{options:t}=e;const{googleChartWrapper:o}=this.props,r=o.getDataTable();if(!r)return;const n=r.getNumberOfColumns();if(!1==this.state.hiddenColumns.length>0)return;const s=Array.from({length:n-1}).map(((e,o)=>{const n=this.getColumnID(r,o+1);return this.state.hiddenColumns.includes(n)?"#CCCCCC":t&&t.colors?t.colors[o]:c[o]}));o.setOptions({...t,colors:s}),o.draw()},this.onResize=()=>{const{googleChartWrapper:e}=this.props;e.draw()}}}class m extends s.Component{componentDidMount(){}componentWillUnmount(){}shouldComponentUpdate(){return!1}render(){const{google:e,googleChartWrapper:t,googleChartDashboard:o}=this.props;return s.createElement(u,{render:r=>s.createElement(g,Object.assign({},r,{google:e,googleChartWrapper:t,googleChartDashboard:o}))})}}class f extends s.Component{shouldComponentUpdate(){return!1}listenToEvents(e){let{chartEvents:t,google:o,googleChartWrapper:r}=e;if(t){o.visualization.events.removeAllListeners(r);for(let e of t){var n=this;const{eventName:t,callback:s}=e;o.visualization.events.addListener(r,t,(function(){for(var e=arguments.length,t=new Array(e),a=0;a<e;a++)t[a]=arguments[a];s({chartWrapper:r,props:n.props,google:o,eventArgs:t})}))}}}render(){const{google:e,googleChartWrapper:t}=this.props;return s.createElement(u,{render:o=>(this.listenToEvents({chartEvents:o.chartEvents||null,google:e,googleChartWrapper:t}),null)})}}let v=0;class y extends s.Component{componentDidMount(){const{options:e,google:t,chartType:o,chartWrapperParams:r,toolbarItems:n,getChartEditor:s,getChartWrapper:a}=this.props,i={chartType:o,options:e,containerId:this.getGraphID(),...r},l=new t.visualization.ChartWrapper(i);l.setOptions(e||{}),a&&a(l,t);const c=new t.visualization.Dashboard(this.dashboard_ref),d=this.addControls(l,c);n&&t.visualization.drawToolbar(this.toolbar_ref.current,n);let h=null;s&&(h=new t.visualization.ChartEditor,s({chartEditor:h,chartWrapper:l,google:t})),this.setState({googleChartEditor:h,googleChartControls:d,googleChartDashboard:c,googleChartWrapper:l,isReady:!0})}componentDidUpdate(){if(!this.state.googleChartWrapper)return;if(!this.state.googleChartDashboard)return;if(!this.state.googleChartControls)return;const{controls:e}=this.props;if(e)for(let t=0;t<e.length;t+=1){const{controlType:o,options:r,controlWrapperParams:n}=e[t];n&&"state"in n&&this.state.googleChartControls[t].control.setState(n.state),this.state.googleChartControls[t].control.setOptions(r),this.state.googleChartControls[t].control.setControlType(o)}}shouldComponentUpdate(e,t){return this.state.isReady!==t.isReady||e.controls!==this.props.controls}render(){const{width:e,height:t,options:o,style:r}=this.props,n={height:t||o&&o.height,width:e||o&&o.width,...r};return this.props.render?s.createElement("div",{ref:this.dashboard_ref,style:n},s.createElement("div",{ref:this.toolbar_ref,id:"toolbar"}),this.props.render({renderChart:this.renderChart,renderControl:this.renderControl,renderToolbar:this.renderToolBar})):s.createElement("div",{ref:this.dashboard_ref,style:n},this.renderControl((e=>{let{controlProp:t}=e;return"bottom"!==t.controlPosition})),this.renderChart(),this.renderControl((e=>{let{controlProp:t}=e;return"bottom"===t.controlPosition})),this.renderToolBar())}constructor(...e){var t;super(),t=this,this.state={googleChartWrapper:null,googleChartDashboard:null,googleChartControls:null,googleChartEditor:null,isReady:!1},this.graphID=null,this.dashboard_ref=s.createRef(),this.toolbar_ref=s.createRef(),this.getGraphID=()=>{const{graphID:e,graph_id:t}=this.props;let o;return e||t?o=e&&!t?e:t&&!e?t:e:this.graphID?o=this.graphID:(l+=1,o="reactgooglegraph-".concat(l)),this.graphID=o,this.graphID},this.getControlID=(e,t)=>{let o;return v+=1,o=void 0===e?"googlechart-control-".concat(t,"-").concat(v):e,o},this.addControls=(e,t)=>{const{google:o,controls:r}=this.props,n=r?r.map(((e,t)=>{const{controlID:r,controlType:n,options:s,controlWrapperParams:a}=e,i=this.getControlID(r,t);return{controlProp:e,control:new o.visualization.ControlWrapper({containerId:i,controlType:n,options:s,...a})}})):null;if(!n)return null;t.bind(n.map((e=>{let{control:t}=e;return t})),e);for(let t of n){const{control:r,controlProp:n}=t,{controlEvents:a=[]}=n;for(let t of a){var s=this;const{callback:n,eventName:a}=t;o.visualization.events.removeListener(r,a,n),o.visualization.events.addListener(r,a,(function(){for(var t=arguments.length,a=new Array(t),i=0;i<t;i++)a[i]=arguments[i];n({chartWrapper:e,controlWrapper:r,props:s.props,google:o,eventArgs:a})}))}}return n},this.renderChart=()=>{const{width:e,height:t,options:o,style:r,className:n,rootProps:a,google:i}=this.props,l={height:t||o&&o.height,width:e||o&&o.width,...r};return s.createElement("div",Object.assign({id:this.getGraphID(),style:l,className:n},a),this.state.isReady&&null!==this.state.googleChartWrapper?s.createElement(s.Fragment,null,s.createElement(m,{googleChartWrapper:this.state.googleChartWrapper,google:i,googleChartDashboard:this.state.googleChartDashboard}),s.createElement(f,{googleChartWrapper:this.state.googleChartWrapper,google:i})):null)},this.renderControl=function(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:e=>!0;return t.state.isReady&&null!==t.state.googleChartControls?s.createElement(s.Fragment,null,t.state.googleChartControls.filter((t=>{let{controlProp:o,control:r}=t;return e({control:r,controlProp:o})})).map((e=>{let{control:t,controlProp:o}=e;return s.createElement("div",{key:t.getContainerId(),id:t.getContainerId()})}))):null},this.renderToolBar=()=>this.props.toolbarItems?s.createElement("div",{ref:this.toolbar_ref}):null}}class w extends s.Component{render(){const{chartLanguage:e,chartPackages:t,chartVersion:o,mapsApiKey:r,loader:n,errorElement:i}=this.props;return s.createElement(p,{value:this.props},"ready"===this.state.loadingStatus&&null!==this.state.google?s.createElement(y,Object.assign({},this.props,{google:this.state.google})):"errored"===this.state.loadingStatus&&i?i:n,s.createElement(a,{chartLanguage:e,chartPackages:t,chartVersion:o,mapsApiKey:r,onLoad:this.onLoad,onError:this.onError}))}componentDidMount(){this._isMounted=!0}componentWillUnmount(){this._isMounted=!1}isFullyLoaded(e){const{controls:t,toolbarItems:o,getChartEditor:r}=this.props;return e&&e.visualization&&e.visualization.ChartWrapper&&e.visualization.Dashboard&&(!t||e.visualization.ChartWrapper)&&(!r||e.visualization.ChartEditor)&&(!o||e.visualization.drawToolbar)}constructor(...e){super(...e),this._isMounted=!1,this.state={loadingStatus:"loading",google:null},this.onLoad=e=>{if(this.props.onLoad&&this.props.onLoad(e),this.isFullyLoaded(e))this.onSuccess(e);else{const e=setInterval((()=>{const t=window.google;this._isMounted?t&&this.isFullyLoaded(t)&&(clearInterval(e),this.onSuccess(t)):clearInterval(e)}),1e3)}},this.onSuccess=e=>{this.setState({loadingStatus:"ready",google:e})},this.onError=()=>{this.setState({loadingStatus:"errored"})}}}var C;w.defaultProps=i,function(e){e.annotation="annotation",e.annotationText="annotationText",e.certainty="certainty",e.emphasis="emphasis",e.interval="interval",e.scope="scope",e.style="style",e.tooltip="tooltip",e.domain="domain"}(C||(C={}));const D=window.wp.apiFetch;var E=e.n(D);const T=window.wp.date,b=window.wp.coreData,S=window.wp.data,_=window.wp.notices;function k(){return k=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var o=arguments[t];for(var r in o)({}).hasOwnProperty.call(o,r)&&(e[r]=o[r])}return e},k.apply(null,arguments)}var I;!function(e){e.Pop="POP",e.Push="PUSH",e.Replace="REPLACE"}(I||(I={}));var x="beforeunload";function A(e){e.preventDefault(),e.returnValue=""}function P(){var e=[];return{get length(){return e.length},push:function(t){return e.push(t),function(){e=e.filter((function(e){return e!==t}))}},call:function(t){e.forEach((function(e){return e&&e(t)}))}}}const L=function(e){void 0===e&&(e={});var t=e.window,o=void 0===t?document.defaultView:t,r=o.history;function n(){var e=o.location,t=e.pathname,n=e.search,s=e.hash,a=r.state||{};return[a.idx,{pathname:t,search:n,hash:s,state:a.usr||null,key:a.key||"default"}]}var s=null;o.addEventListener("popstate",(function(){if(s)h.call(s),s=null;else{var e=I.Pop,t=n(),o=t[0],r=t[1];if(h.length){if(null!=o){var a=l-o;a&&(s={action:e,location:r,retry:function(){v(-1*a)}},v(a))}}else f(e)}}));var a=I.Pop,i=n(),l=i[0],c=i[1],d=P(),h=P();function p(e){return"string"==typeof e?e:(o=(t=e).pathname,r=void 0===o?"/":o,n=t.search,s=void 0===n?"":n,a=t.hash,i=void 0===a?"":a,s&&"?"!==s&&(r+="?"===s.charAt(0)?s:"?"+s),i&&"#"!==i&&(r+="#"===i.charAt(0)?i:"#"+i),r);var t,o,r,n,s,a,i}function u(e,t){return void 0===t&&(t=null),k({pathname:c.pathname,hash:"",search:""},"string"==typeof e?function(e){var t={};if(e){var o=e.indexOf("#");o>=0&&(t.hash=e.substr(o),e=e.substr(0,o));var r=e.indexOf("?");r>=0&&(t.search=e.substr(r),e=e.substr(0,r)),e&&(t.pathname=e)}return t}(e):e,{state:t,key:Math.random().toString(36).substr(2,8)})}function g(e,t){return[{usr:e.state,key:e.key,idx:t},p(e)]}function m(e,t,o){return!h.length||(h.call({action:e,location:t,retry:o}),!1)}function f(e){a=e;var t=n();l=t[0],c=t[1],d.call({action:a,location:c})}function v(e){r.go(e)}return null==l&&(l=0,r.replaceState(k({},r.state,{idx:l}),"")),{get action(){return a},get location(){return c},createHref:p,push:function e(t,n){var s=I.Push,a=u(t,n);if(m(s,a,(function(){e(t,n)}))){var i=g(a,l+1),c=i[0],d=i[1];try{r.pushState(c,"",d)}catch(e){o.location.assign(d)}f(s)}},replace:function e(t,o){var n=I.Replace,s=u(t,o);if(m(n,s,(function(){e(t,o)}))){var a=g(s,l),i=a[0],c=a[1];r.replaceState(i,"",c),f(n)}},go:v,back:function(){v(-1)},forward:function(){v(1)},listen:function(e){return d.push(e)},block:function(e){var t=h.push(e);return 1===h.length&&o.addEventListener(x,A),function(){t(),h.length||o.removeEventListener(x,A)}}}}(),F=L.push,R=L.replace;L.push=function(e,t){const o=(0,n.getQueryArgs)(window.location.href),r=(0,n.removeQueryArgs)(window.location.href,...Object.keys(o)),s=(0,n.addQueryArgs)(r,e);return F.call(L,s,t)},L.replace=function(e,t){const o=(0,n.getQueryArgs)(window.location.href),r=(0,n.removeQueryArgs)(window.location.href,...Object.keys(o)),s=(0,n.addQueryArgs)(r,e);return R.call(L,s,t)};const z=window.ReactJSXRuntime,O=((0,t.createContext)(),(0,t.createContext)()),W=(0,t.createContext)(),j=function(e){const r={customDate:!1,type:"web",startDate:(0,T.dateI18n)("Y-m-d",(new Date).setDate((new Date).getDate()-29)),endDate:(0,T.dateI18n)("Y-m-d",(new Date).setDate((new Date).getDate()-1)),dimensions:["QUERY"],fields:"rows",dimensionFilterGroups:[]},[n,s]=(0,t.useState)(!1),[a,i]=(0,t.useState)(r),[l,c]=(0,t.useState)(!1),d=(0,t.useContext)(O),[h,p]=(0,b.useEntityProp)("root","site","search_console"),{saveEditedEntityRecord:u}=(0,S.useDispatch)(b.store),{createNotice:g}=(0,S.useDispatch)(_.store),{isSaving:m,hasEdits:f}=(0,S.useSelect)((e=>({isSaving:e(b.store).isSavingEntityRecord("root","site"),hasEdits:e(b.store).hasEditsForEntityRecord("root","site",void 0,"search_console")})),[]),v=()=>{E()({path:"/searchconsole/v1/refresh",method:"POST"}).then((e=>{p({...h,token:e}),window.gapi.client.setToken(e),w()})).catch((e=>{console.log(e),g("error","⚠️ "+e.message.error_description,{type:"snackbar",explicitDismiss:!0,actions:[{label:"Reauthenticate on settings page",onClick:()=>d.push({page:"search-console-settings"})}]})}))},y=(e,t)=>{p({...h,[e]:t})};(0,t.useEffect)((()=>{const e=document.createElement("script");return e.src="https://apis.google.com/js/api.js",e.async=!0,e.defer=!0,e.onload=async()=>await window.gapi.load("client",w),document.body.appendChild(e),()=>{document.body.removeChild(e)}}),[]);const w=()=>{window.gapi.client.setToken(window.search_console.token),window.gapi.client.load("searchconsole","v1").then((()=>{C()}))},C=()=>{s(!0)};return(0,z.jsx)(W.Provider,{value:{query:a,updateQuery:(e,t)=>{i({...a,[e]:t})},settings:h,updateSetting:y,setSettings:p,saveSettings:async()=>u("root","site").then((()=>{g("info","🎯 "+(0,o.__)("Settings saved.","formello"),{type:"snackbar"})})).catch((e=>{g("error","⚠️ "+e.message,{type:"snackbar",explicitDismiss:!0})})),isSaving:m,ready:n,refreshToken:v,revokeToken:()=>{E()({path:"/searchconsole/v1/revoke",method:"POST",data:{token:h.token.refresh_token}}).then((()=>{y("token",{access_token:"",expires_in:3600,id_token:"",refresh_token:"",scope:"",token_type:""}),c(!1)}))},email:l,hasEdits:f,showError:e=>{401!==e.status&&g("error","⚠️ "+e.result.error.message,{type:"snackbar",explicitDismiss:!0}),401===e.status&&v()}},children:e.children})},M={animation:{duration:500,easing:"out",startup:!0},tooltip:{isHtml:!0,showTitle:!0},chartArea:{width:"100%"},height:350,hAxis:{gridlines:{count:5,minSpacing:15},minorGridlines:{count:0},showTextEvery:1},vAxis:{textPosition:"none"},vAxes:{},series:{0:{color:"#4285f4",labelInLegend:"Last 28 days"},1:{color:"#4285f4",lineDashStyle:[2,2],labelInLegend:"Previous 28 days"}},legend:{position:"top",alignment:"start"},focusTarget:"category"};function N({url:e}){const{settings:n}=(0,t.useContext)(W),[s,a]=(0,t.useState)(M),[i,l]=(0,t.useState)(!1),[c,d]=(0,t.useState)(),[h,p]=(0,t.useState)("clicks"),u=window.gapi,g={siteUrl:n.site,searchType:"web",startDate:(0,T.dateI18n)("Y-m-d",(new Date).setDate((new Date).getDate()-28)),endDate:(0,T.dateI18n)("Y-m-d",(new Date).setDate((new Date).getDate())),dimensions:["date"],dimensionFilterGroups:{},dataState:"all"},m=(0,t.useCallback)((()=>{if(!c)return;const e=c.current,t=c.previous,o=[];o.push([{type:"number",label:"Day"},{type:"string",role:"tooltip",p:{html:!0}},{label:"Current",type:"number"},{label:"Previous",type:"number"}]);for(const r in t.rows)r>27||o.push([parseInt(r)+1,D(r,e.rows[r].keys[0],C(e.rows[r][h]),t.rows[r].keys[0],C(t.rows[r][h])),{v:e.rows[r][h],f:C(e.rows[r][h])},{v:t.rows[r][h],f:C(t.rows[r][h])}]);l(o)}),[c,h]);(0,t.useEffect)((()=>{n.token.access_token&&y()}),[]),(0,t.useEffect)((()=>{m()}),[c,m]);const f=()=>{E()({path:"/searchconsole/v1/refresh",method:"POST"}).then((e=>{window.gapi.client.setToken(e),y()}))},v=()=>e?[{filters:[{dimension:"page",expression:e,operator:"EQUALS"}]}]:null,y=()=>{const e=u.client.newBatch();e.add(window.gapi.client.webmasters.searchanalytics.query({...g,dimensionFilterGroups:v()}),{id:"current"}),e.add(window.gapi.client.webmasters.searchanalytics.query({...g,dimensionFilterGroups:v(),startDate:(0,T.dateI18n)("Y-m-d",(new Date).setDate((new Date).getDate()-56)),endDate:(0,T.dateI18n)("Y-m-d",(new Date).setDate((new Date).getDate()-28))}),{id:"previous"}),e.then((e=>{401===e.result.current.status&&f(),d({current:e.result.current.result,previous:e.result.previous.result})})).catch((e=>{401===e.status&&f()}))},C=e=>"ctr"===h?(100*e).toFixed(2)+"%":"position"===h?e.toFixed(2):e,D=(e,t,r,n,s)=>`<div style="padding: 1rem;"><b>${(0,o.__)("Day")+" "+(parseInt(e)+1)}</b><div style="display: flex; gap: 1rem;"><span>${t}</span><b>${r}</b></div><div style="display: flex; gap: 1rem;"><span>${n}</span><b>${s}</b></div></div>`,b=(e,t)=>{p(e),a({...s,vAxis:{direction:"position"===e?-1:1,format:"ctr"===e?"#,###%":"none"},series:{0:{color:t,labelInLegend:"Last 28 days"},1:{color:t,lineDashStyle:[3,3],labelInLegend:"Previous 28 days"}}})};return i?(0,z.jsxs)("div",{className:"search-console-chart",children:[(0,z.jsxs)(r.ButtonGroup,{children:[(0,z.jsx)(r.Button,{variant:"clicks"===h?"primary":"secondary",size:"small",onClick:()=>b("clicks","#4285f4"),children:(0,o.__)("Clicks","search-console")}),(0,z.jsx)(r.Button,{variant:"impressions"===h?"primary":"secondary",size:"small",onClick:()=>b("impressions","#5e35b1"),children:(0,o.__)("Impressions","search-console")}),(0,z.jsx)(r.Button,{variant:"ctr"===h?"primary":"secondary",size:"small",onClick:()=>b("ctr","#00897b"),children:(0,o.__)("CTR","search-console")}),(0,z.jsx)(r.Button,{variant:"position"===h?"primary":"secondary",size:"small",onClick:()=>b("position","#E8710A"),children:(0,o.__)("Position","search-console")})]}),(0,z.jsx)(w,{chartType:"LineChart",data:i,options:s,chartPackages:["corechart","controls","charteditor"]})]}):(0,z.jsx)(r.Spinner,{})}function B({text:e}){return(0,z.jsxs)("div",{className:"loading-settings",children:[(0,z.jsx)(r.Spinner,{}),(0,z.jsx)("span",{className:"description",children:e})]})}const U={settings:!1,sites:[{label:"Select a site",value:""}],customDate:!1,dimension:"query",searchType:"web",startDate:(0,T.dateI18n)("Y-m-d",(new Date).setDate((new Date).getDate()-29)),endDate:(0,T.dateI18n)("Y-m-d",(new Date).setDate((new Date).getDate()-1)),filters:[]},Q={setSites:e=>({type:"SET_SITES",sites:e}),setSettings:e=>({type:"SET_SETTINGS",settings:e}),setSetting:(e,t)=>({type:"SET_SETTING",setting:e,value:t}),setSearchType:e=>({type:"SET_SEARCHTYPE",searchType:e}),setFilter:e=>({type:"SET_FILTER",filter:e}),setDimension:e=>({type:"SET_DIMENSION",dimension:e}),setCustomDate:e=>({type:"SET_CUSTOMDATE",val:e}),setStartDate:e=>({type:"SET_STARTDATE",date:e}),setEndDate:e=>({type:"SET_ENDDATE",date:e}),removeFilter:e=>({type:"REMOVE_FILTER",filter:e}),fetchFromAPI:e=>({type:"FETCH_FROM_API",path:e})},G=(0,S.createReduxStore)("searchconsole",{reducer(e=U,t){switch(t.type){case"SET_SETTINGS":return{...e,settings:t.settings};case"SET_SITES":return{...e,sites:t.sites};case"SET_SETTING":return{...e,settings:{...e.settings,[t.setting]:t.value}};case"SET_SEARCHTYPE":return{...e,searchType:t.searchType};case"SET_DIMENSION":return{...e,dimension:t.dimension};case"SET_CUSTOMDATE":return{...e,customDate:t.val};case"SET_STARTDATE":return{...e,startDate:t.date};case"SET_ENDDATE":return{...e,endDate:t.date};case"SET_FILTER":const o={dimension:t.filter.dimension,expression:t.filter.expression,operator:t.filter.operator},r=e.filters.filter((e=>e.dimension!==t.filter.dimension));return r.push(o),{...e,filters:r};case"REMOVE_FILTER":const n=e.filters.filter((e=>e.dimension!==t.filter.dimension));return{...e,filters:n}}return e},actions:Q,selectors:{isReady(e){var t;return null!==(t=e.settings)&&void 0!==t&&t},getSettings(e){const{settings:t}=e;return t},getSites(e){const{sites:t}=e;return t},getSite(e){const{settings:t}=e;return t.site},getQuery(e){const{searchType:t,filters:o,dimension:r,startDate:n,endDate:s}=e;return{dimension:r,startDate:n,endDate:s,searchType:t,filters:o}},getFilterByDimension:(e,t)=>e.filters.length?e.filters.find((e=>e.dimension===t)):{dimension:"",expression:"",operator:""},getSearchType(e){const{searchType:t}=e;return t},getFilters(e){const{filters:t}=e;return t},getCustomDate(e){const{customDate:t}=e;return t}},controls:{FETCH_FROM_API:e=>E()({path:e.path})},resolvers:{*getSettings(){const e=yield Q.fetchFromAPI("/searchconsole/v1/settings/");return Q.setSettings(e)}}});(0,S.register)(G);const Y=()=>{const{settings:e,ready:s}=(0,t.useContext)(W);return s&&e?e?.site&&e?.credentials?.client_secret&&e?.credentials?.client_id&&e.token.refresh_token?(0,z.jsxs)("div",{children:[(0,z.jsx)(N,{}),(0,z.jsx)(t.RawHTML,{children:(0,o.sprintf)(/* translators: Developer console url. */ /* translators: Developer console url. */
(0,o.__)('More data on <a href="%s">Search Console dashboard</a>.',"formello"),(0,n.addQueryArgs)("admin.php",{page:"search-console"}))})]}):(0,z.jsx)(r.Notice,{status:"warning",isDismissible:!1,children:(0,z.jsx)(t.RawHTML,{children:(0,o.sprintf)(/* translators: Search console settings url. */ /* translators: Search console settings url. */
(0,o.__)('<p>You need to authenticate and set a site on <a href="%s">settings page</a>.</p>',"formello"),(0,n.addQueryArgs)("admin.php",{page:"search-console-settings"}))})}):(0,z.jsx)(B,{text:(0,o.__)("Fetching data…","search-console")})},H=()=>(0,z.jsx)(j,{children:(0,z.jsx)(Y,{})});window.addEventListener("DOMContentLoaded",(()=>{const e=document.getElementById("search-console-widget");(0,t.createRoot)(e).render((0,z.jsx)(H,{}))}))})();