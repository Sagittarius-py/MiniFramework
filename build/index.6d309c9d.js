var e=globalThis,t={},n={},r=e.parcelRequire94c2;null==r&&((r=function(e){if(e in t)return t[e].exports;if(e in n){var r=n[e];delete n[e];var o={id:e,exports:{}};return t[e]=o,r.call(o.exports,o,o.exports),o.exports}var l=Error("Cannot find module '"+e+"'");throw l.code="MODULE_NOT_FOUND",l}).register=function(e,t){n[e]=t},e.parcelRequire94c2=r),(0,r.register)("27Lyk",function(e,t){Object.defineProperty(e.exports,"register",{get:()=>n,set:e=>n=e,enumerable:!0,configurable:!0});var n,r=new Map;n=function(e,t){for(var n=0;n<t.length-1;n+=2)r.set(t[n],{baseUrl:e,path:t[n+1]})}}),r("27Lyk").register(new URL("",import.meta.url).toString(),JSON.parse('["9TZ7I","index.6d309c9d.js","eeVe6","1.e0d42b70.jpg","kz2Nc","index.081ddeee.css"]'));const o={currentComponent:null,stateIndex:0,effectIndex:0,stateMap:new WeakMap,effectMap:new WeakMap,componentMap:new WeakMap,contextMap:new WeakMap,createElement:(e,t,...n)=>{if("function"==typeof e&&!e.isReactComponent)return{tag:e,props:{...t,children:n}};if(e.prototype&&e.isReactComponent){let n=new e(t);n.willInit();let r=n.mount();return n.didInit(),r}return{tag:e,props:{...t,children:n}}},createPortal:(e,t)=>((t||(t=document.getElementById("modal-root")),t)?o.render(e,t,!0):console.error("Target container for portal not found."),null),render:function(e,t,n=!1){if(e&&e.props?.isPortal){console.log(typeof e.tag),this.createPortal(e.content,e.targetContainer);return}if(Array.isArray(e)){n&&(t.innerHTML=""),e.forEach(e=>{this.render(e,t,!1)});return}if(e?.props?.isPortal){this.createPortal(e.content,e.targetContainer);return}if("string"==typeof e||"number"==typeof e){n&&(t.innerHTML=""),t.appendChild(document.createTextNode(e));return}if(e&&"function"==typeof e.tag){this.currentComponent=e,this.stateIndex=0,this.effectIndex=0;let r=e.tag(e.props);this.currentComponent=null;let o=this.render(r,t,n);return this.componentMap.set(e,o),o}if(n&&t.firstChild){let e=this.componentMap.get(t.firstChild);e&&this.cleanupEffects(e)}let r=document.createElement(e?.tag);return e?.props&&e?.props.className&&(r.className=e.props.className),Object.keys(e?.props||{}).filter(e=>"children"!==e).forEach(t=>{t.startsWith("on")?r.addEventListener(t.substring(2).toLowerCase(),e.props[t]):"className"===t?r.className=e.props[t]:r[t]=e.props[t]}),e?.props?.children?.forEach(e=>{this.render(e,r)}),n&&(t.innerHTML=""),t.appendChild(r),this.runEffects(e),r},useState:function(e){let t=this.currentComponent;if(!t)throw Error("useState must be called within a component");let n=this.stateIndex++,r=this.stateMap.get(t)||[];return r[n]||(r[n]=e),this.stateMap.set(t,r),[r[n],e=>{let l=r[n],a="function"==typeof e?e(l):e;a!==l&&(r[n]=a,o.update(t))}]},useEffect:function(e,t){let n=this.currentComponent;if(!n)throw Error("useEffect must be called within a component");let r=this.effectIndex++,o=this.effectMap.get(n)||[],l=o[r];if(!l||!t||t.some((e,t)=>e!==l.deps[t])){l&&l.cleanup&&l.cleanup();let n=e();o[r]={deps:t,cleanup:n}}this.effectMap.set(n,o)},runEffects:function(e){(this.effectMap.get(e)||[]).forEach(e=>{e.cleanup&&e.cleanup(),e.cleanup=e.effect()})},cleanupEffects:function(e){(this.effectMap.get(e)||[]).forEach(e=>{e.cleanup&&e.cleanup()}),this.effectMap.delete(e)},diff:function(e,t){if(!e||!t||typeof e!=typeof t)return!1;if("string"==typeof t||"number"==typeof t)return e===t;if(e.tag!==t.tag)return!1;let n=e.props||{},r=t.props||{},o=Object.keys(n),l=Object.keys(r);if(o.length!==l.length)return!1;for(let e of l)if("children"!==e&&n[e]!==r[e])return!1;return!0},update:function(e){let t=this.componentMap.get(e);this.currentComponent=e;let n=e.tag(e.props);if(e?.props?.isPortal&&this.createPortal(e.props.content,e.props.targetContainer),this.diff(t,n))this.runEffects(e);else{this.cleanupEffects(e);let n=this.render(e,t,!0);this.componentMap.set(e,n)}this.currentComponent=null},createContext:function(e){let t={defaultValue:e,state:e,subscribers:new Set};function n(e){t.state=e,t.subscribers.forEach(t=>t(e))}return{Provider:function({value:e,children:t}){return void 0!==e&&n(e),t},useContext:function(){let[e,n]=o.useState(t.state);return o.useEffect(()=>{let e=e=>n(e);return t.subscribers.add(e),()=>t.subscribers.delete(e)},[]),e},setContextValue:n}},useStyle:function(e){let t=this.currentComponent;if(!t)throw Error("useStyle must be called within a component");let n=`style-${t.tag.name}`,r=document.getElementById(n);r||((r=document.createElement("style")).id=n,document.head.appendChild(r));let o=`class-${t.tag.name}-${Math.random().toString(36).substr(2,5)}`,l=`
			.${o} {
				${Object.entries(e).map(([e,t])=>{let n=e.replace(/([a-z])([A-Z])/g,"$1-$2").toLowerCase();return`${n}: ${t};`}).join(" ")}
			}
		`;return r.appendChild(document.createTextNode(l)),o}};o.Component=class{constructor(e){this.props=e,this.state={},this.willInit(),this.mount(),this.didInit()}willInit(){}didInit(){}didUpdate(){}mainDiv(){return this.name=this.constructor.name,`${this.constructor.name}`}setState(e){this.state={...this.state,...e},o.update(this)}mount(){throw Error("Component subclass must implement mount method.")}static isReactComponent=!0};var l={};l=new URL("1.e0d42b70.jpg",import.meta.url).toString();const a=o.createContext("cok");o.render(o.createElement(a.Provider,{value:{count:0}},o.createElement("div",null,o.createElement("header",null,o.createElement("h1",null,"Welcome to Mini.js")),o.createElement("div",{id:"container"},o.createElement(()=>{var e;let t=a.useContext();return o.createElement("div",null,o.createElement("img",{name:"image",id:"image",src:(e=l)&&e.__esModule?e.default:e,alt:"fireSpot"}),o.createElement("br",null),o.createElement("label",{for:"image",style:"color: white"},"Importowane zdjęcie w jsx"),o.createElement("p",null,"Wartość contextu w innym componencie: ",t.count))},null),o.createElement("hr",null),o.createElement(e=>{let[t,n]=o.useState({count:0}),r=()=>{n(e=>({count:e.count+1}))};return o.createElement("div",null,o.createElement("p",null,"Count: ",t.count),o.createElement("button",{onClick:()=>{r(),console.log("cok")}},"Increment"),o.createElement("p",{style:"color: white"},"Zmiana stanu i dynamiczne renderowanie w komponentach funkcyjnych"))},null),o.createElement("hr",null),o.createElement(()=>o.createElement("div",null,["Hello, world!","JavaScript is awesome.","Let's learn to code.","Arrays can hold multiple values.","This is a string example.","Have a great day!","Coding is fun!","Happy coding!","OpenAI creates amazing tools.","ChatGPT is here to help."].map(e=>o.createElement("p",{style:""},e)),o.createElement("p",{style:"color: white"},"Generowanie dynamicznych list znaczników")),null),o.createElement("hr",null),o.createElement(()=>{let[e,t]=o.useState({count:0});return o.useEffect(()=>(console.log("Component mounted or updated!"),()=>{console.log("Cleanup on unmount or update")}),[e]),o.createElement("div",null,o.createElement("p",null,"Count: ",e.count),o.createElement("button",{onClick:()=>t(e=>({count:e.count+1}))},"Increment"),o.createElement("p",{style:"color: white"},"useEffect, metoda cyklu życia komponentu "))},null),o.createElement("hr",null),o.createElement(()=>{let e=a.useContext(),[t,n]=o.useState(e),r=()=>{n(e=>({count:e.count+1}))},l=()=>{a.setContextValue({count:t.count+1}),console.log(e)};return o.createElement("div",null,o.createElement("p",null,"Count: ",e.count),o.createElement("button",{onClick:()=>{r(),l()}},"Increment"),o.createElement("p",{style:{color:"white"}},"Contextowa zmiana stanu"))},null),o.createElement("hr",null),o.createElement(()=>{let e=o.useStyle({backgroundColor:"lightblue",padding:"10px",borderRadius:"5px",border:"1px solid black"});return o.createElement("div",null,o.createElement("div",{className:e},o.createElement("p",null,"This component is styled using CSS-in-JS!")),o.createElement("p",null,"Komponent stylowany za pomocą JS-CSS"))},null),o.createElement("hr",null),o.createElement(({children:e})=>o.createPortal(o.createElement("div",{style:{backgroundColor:"rgba(0,0,0,0.5)",padding:"20px",borderRadius:"10px",position:"absolute",width:"90vw",height:"90vh"},isPortal:!0,className:"modal"},"cok")),null)),o.createElement("footer",null))),document.querySelector("#root"));
//# sourceMappingURL=index.6d309c9d.js.map
