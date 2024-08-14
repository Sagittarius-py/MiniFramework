// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

(function (modules, entry, mainEntry, parcelRequireName, globalName) {
  /* eslint-disable no-undef */
  var globalObject =
    typeof globalThis !== 'undefined'
      ? globalThis
      : typeof self !== 'undefined'
      ? self
      : typeof window !== 'undefined'
      ? window
      : typeof global !== 'undefined'
      ? global
      : {};
  /* eslint-enable no-undef */

  // Save the require from previous bundle to this closure if any
  var previousRequire =
    typeof globalObject[parcelRequireName] === 'function' &&
    globalObject[parcelRequireName];

  var cache = previousRequire.cache || {};
  // Do not use `require` to prevent Webpack from trying to bundle this call
  var nodeRequire =
    typeof module !== 'undefined' &&
    typeof module.require === 'function' &&
    module.require.bind(module);

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire =
          typeof globalObject[parcelRequireName] === 'function' &&
          globalObject[parcelRequireName];
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error("Cannot find module '" + name + "'");
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = (cache[name] = new newRequire.Module(name));

      modules[name][0].call(
        module.exports,
        localRequire,
        module,
        module.exports,
        this
      );
    }

    return cache[name].exports;

    function localRequire(x) {
      var res = localRequire.resolve(x);
      return res === false ? {} : newRequire(res);
    }

    function resolve(x) {
      var id = modules[name][1][x];
      return id != null ? id : x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [
      function (require, module) {
        module.exports = exports;
      },
      {},
    ];
  };

  Object.defineProperty(newRequire, 'root', {
    get: function () {
      return globalObject[parcelRequireName];
    },
  });

  globalObject[parcelRequireName] = newRequire;

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (mainEntry) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(mainEntry);

    // CommonJS
    if (typeof exports === 'object' && typeof module !== 'undefined') {
      module.exports = mainExports;

      // RequireJS
    } else if (typeof define === 'function' && define.amd) {
      define(function () {
        return mainExports;
      });

      // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }
})({"gjUm6":[function(require,module,exports) {
var global = arguments[3];
var HMR_HOST = null;
var HMR_PORT = null;
var HMR_SECURE = false;
var HMR_ENV_HASH = "d6ea1d42532a7575";
var HMR_USE_SSE = false;
module.bundle.HMR_BUNDLE_ID = "022c1b16b4b6dfad";
"use strict";
/* global HMR_HOST, HMR_PORT, HMR_ENV_HASH, HMR_SECURE, HMR_USE_SSE, chrome, browser, __parcel__import__, __parcel__importScripts__, ServiceWorkerGlobalScope */ /*::
import type {
  HMRAsset,
  HMRMessage,
} from '@parcel/reporter-dev-server/src/HMRServer.js';
interface ParcelRequire {
  (string): mixed;
  cache: {|[string]: ParcelModule|};
  hotData: {|[string]: mixed|};
  Module: any;
  parent: ?ParcelRequire;
  isParcelRequire: true;
  modules: {|[string]: [Function, {|[string]: string|}]|};
  HMR_BUNDLE_ID: string;
  root: ParcelRequire;
}
interface ParcelModule {
  hot: {|
    data: mixed,
    accept(cb: (Function) => void): void,
    dispose(cb: (mixed) => void): void,
    // accept(deps: Array<string> | string, cb: (Function) => void): void,
    // decline(): void,
    _acceptCallbacks: Array<(Function) => void>,
    _disposeCallbacks: Array<(mixed) => void>,
  |};
}
interface ExtensionContext {
  runtime: {|
    reload(): void,
    getURL(url: string): string;
    getManifest(): {manifest_version: number, ...};
  |};
}
declare var module: {bundle: ParcelRequire, ...};
declare var HMR_HOST: string;
declare var HMR_PORT: string;
declare var HMR_ENV_HASH: string;
declare var HMR_SECURE: boolean;
declare var HMR_USE_SSE: boolean;
declare var chrome: ExtensionContext;
declare var browser: ExtensionContext;
declare var __parcel__import__: (string) => Promise<void>;
declare var __parcel__importScripts__: (string) => Promise<void>;
declare var globalThis: typeof self;
declare var ServiceWorkerGlobalScope: Object;
*/ var OVERLAY_ID = "__parcel__error__overlay__";
var OldModule = module.bundle.Module;
function Module(moduleName) {
    OldModule.call(this, moduleName);
    this.hot = {
        data: module.bundle.hotData[moduleName],
        _acceptCallbacks: [],
        _disposeCallbacks: [],
        accept: function(fn) {
            this._acceptCallbacks.push(fn || function() {});
        },
        dispose: function(fn) {
            this._disposeCallbacks.push(fn);
        }
    };
    module.bundle.hotData[moduleName] = undefined;
}
module.bundle.Module = Module;
module.bundle.hotData = {};
var checkedAssets /*: {|[string]: boolean|} */ , assetsToDispose /*: Array<[ParcelRequire, string]> */ , assetsToAccept /*: Array<[ParcelRequire, string]> */ ;
function getHostname() {
    return HMR_HOST || (location.protocol.indexOf("http") === 0 ? location.hostname : "localhost");
}
function getPort() {
    return HMR_PORT || location.port;
}
// eslint-disable-next-line no-redeclare
var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== "undefined") {
    var hostname = getHostname();
    var port = getPort();
    var protocol = HMR_SECURE || location.protocol == "https:" && ![
        "localhost",
        "127.0.0.1",
        "0.0.0.0"
    ].includes(hostname) ? "wss" : "ws";
    var ws;
    if (HMR_USE_SSE) ws = new EventSource("/__parcel_hmr");
    else try {
        ws = new WebSocket(protocol + "://" + hostname + (port ? ":" + port : "") + "/");
    } catch (err) {
        if (err.message) console.error(err.message);
        ws = {};
    }
    // Web extension context
    var extCtx = typeof browser === "undefined" ? typeof chrome === "undefined" ? null : chrome : browser;
    // Safari doesn't support sourceURL in error stacks.
    // eval may also be disabled via CSP, so do a quick check.
    var supportsSourceURL = false;
    try {
        (0, eval)('throw new Error("test"); //# sourceURL=test.js');
    } catch (err) {
        supportsSourceURL = err.stack.includes("test.js");
    }
    // $FlowFixMe
    ws.onmessage = async function(event /*: {data: string, ...} */ ) {
        checkedAssets = {} /*: {|[string]: boolean|} */ ;
        assetsToAccept = [];
        assetsToDispose = [];
        var data /*: HMRMessage */  = JSON.parse(event.data);
        if (data.type === "update") {
            // Remove error overlay if there is one
            if (typeof document !== "undefined") removeErrorOverlay();
            let assets = data.assets.filter((asset)=>asset.envHash === HMR_ENV_HASH);
            // Handle HMR Update
            let handled = assets.every((asset)=>{
                return asset.type === "css" || asset.type === "js" && hmrAcceptCheck(module.bundle.root, asset.id, asset.depsByBundle);
            });
            if (handled) {
                console.clear();
                // Dispatch custom event so other runtimes (e.g React Refresh) are aware.
                if (typeof window !== "undefined" && typeof CustomEvent !== "undefined") window.dispatchEvent(new CustomEvent("parcelhmraccept"));
                await hmrApplyUpdates(assets);
                // Dispose all old assets.
                let processedAssets = {} /*: {|[string]: boolean|} */ ;
                for(let i = 0; i < assetsToDispose.length; i++){
                    let id = assetsToDispose[i][1];
                    if (!processedAssets[id]) {
                        hmrDispose(assetsToDispose[i][0], id);
                        processedAssets[id] = true;
                    }
                }
                // Run accept callbacks. This will also re-execute other disposed assets in topological order.
                processedAssets = {};
                for(let i = 0; i < assetsToAccept.length; i++){
                    let id = assetsToAccept[i][1];
                    if (!processedAssets[id]) {
                        hmrAccept(assetsToAccept[i][0], id);
                        processedAssets[id] = true;
                    }
                }
            } else fullReload();
        }
        if (data.type === "error") {
            // Log parcel errors to console
            for (let ansiDiagnostic of data.diagnostics.ansi){
                let stack = ansiDiagnostic.codeframe ? ansiDiagnostic.codeframe : ansiDiagnostic.stack;
                console.error("\uD83D\uDEA8 [parcel]: " + ansiDiagnostic.message + "\n" + stack + "\n\n" + ansiDiagnostic.hints.join("\n"));
            }
            if (typeof document !== "undefined") {
                // Render the fancy html overlay
                removeErrorOverlay();
                var overlay = createErrorOverlay(data.diagnostics.html);
                // $FlowFixMe
                document.body.appendChild(overlay);
            }
        }
    };
    if (ws instanceof WebSocket) {
        ws.onerror = function(e) {
            if (e.message) console.error(e.message);
        };
        ws.onclose = function() {
            console.warn("[parcel] \uD83D\uDEA8 Connection to the HMR server was lost");
        };
    }
}
function removeErrorOverlay() {
    var overlay = document.getElementById(OVERLAY_ID);
    if (overlay) {
        overlay.remove();
        console.log("[parcel] \u2728 Error resolved");
    }
}
function createErrorOverlay(diagnostics) {
    var overlay = document.createElement("div");
    overlay.id = OVERLAY_ID;
    let errorHTML = '<div style="background: black; opacity: 0.85; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; font-family: Menlo, Consolas, monospace; z-index: 9999;">';
    for (let diagnostic of diagnostics){
        let stack = diagnostic.frames.length ? diagnostic.frames.reduce((p, frame)=>{
            return `${p}
<a href="/__parcel_launch_editor?file=${encodeURIComponent(frame.location)}" style="text-decoration: underline; color: #888" onclick="fetch(this.href); return false">${frame.location}</a>
${frame.code}`;
        }, "") : diagnostic.stack;
        errorHTML += `
      <div>
        <div style="font-size: 18px; font-weight: bold; margin-top: 20px;">
          \u{1F6A8} ${diagnostic.message}
        </div>
        <pre>${stack}</pre>
        <div>
          ${diagnostic.hints.map((hint)=>"<div>\uD83D\uDCA1 " + hint + "</div>").join("")}
        </div>
        ${diagnostic.documentation ? `<div>\u{1F4DD} <a style="color: violet" href="${diagnostic.documentation}" target="_blank">Learn more</a></div>` : ""}
      </div>
    `;
    }
    errorHTML += "</div>";
    overlay.innerHTML = errorHTML;
    return overlay;
}
function fullReload() {
    if ("reload" in location) location.reload();
    else if (extCtx && extCtx.runtime && extCtx.runtime.reload) extCtx.runtime.reload();
}
function getParents(bundle, id) /*: Array<[ParcelRequire, string]> */ {
    var modules = bundle.modules;
    if (!modules) return [];
    var parents = [];
    var k, d, dep;
    for(k in modules)for(d in modules[k][1]){
        dep = modules[k][1][d];
        if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) parents.push([
            bundle,
            k
        ]);
    }
    if (bundle.parent) parents = parents.concat(getParents(bundle.parent, id));
    return parents;
}
function updateLink(link) {
    var href = link.getAttribute("href");
    if (!href) return;
    var newLink = link.cloneNode();
    newLink.onload = function() {
        if (link.parentNode !== null) // $FlowFixMe
        link.parentNode.removeChild(link);
    };
    newLink.setAttribute("href", // $FlowFixMe
    href.split("?")[0] + "?" + Date.now());
    // $FlowFixMe
    link.parentNode.insertBefore(newLink, link.nextSibling);
}
var cssTimeout = null;
function reloadCSS() {
    if (cssTimeout) return;
    cssTimeout = setTimeout(function() {
        var links = document.querySelectorAll('link[rel="stylesheet"]');
        for(var i = 0; i < links.length; i++){
            // $FlowFixMe[incompatible-type]
            var href /*: string */  = links[i].getAttribute("href");
            var hostname = getHostname();
            var servedFromHMRServer = hostname === "localhost" ? new RegExp("^(https?:\\/\\/(0.0.0.0|127.0.0.1)|localhost):" + getPort()).test(href) : href.indexOf(hostname + ":" + getPort());
            var absolute = /^https?:\/\//i.test(href) && href.indexOf(location.origin) !== 0 && !servedFromHMRServer;
            if (!absolute) updateLink(links[i]);
        }
        cssTimeout = null;
    }, 50);
}
function hmrDownload(asset) {
    if (asset.type === "js") {
        if (typeof document !== "undefined") {
            let script = document.createElement("script");
            script.src = asset.url + "?t=" + Date.now();
            if (asset.outputFormat === "esmodule") script.type = "module";
            return new Promise((resolve, reject)=>{
                var _document$head;
                script.onload = ()=>resolve(script);
                script.onerror = reject;
                (_document$head = document.head) === null || _document$head === void 0 || _document$head.appendChild(script);
            });
        } else if (typeof importScripts === "function") {
            // Worker scripts
            if (asset.outputFormat === "esmodule") return import(asset.url + "?t=" + Date.now());
            else return new Promise((resolve, reject)=>{
                try {
                    importScripts(asset.url + "?t=" + Date.now());
                    resolve();
                } catch (err) {
                    reject(err);
                }
            });
        }
    }
}
async function hmrApplyUpdates(assets) {
    global.parcelHotUpdate = Object.create(null);
    let scriptsToRemove;
    try {
        // If sourceURL comments aren't supported in eval, we need to load
        // the update from the dev server over HTTP so that stack traces
        // are correct in errors/logs. This is much slower than eval, so
        // we only do it if needed (currently just Safari).
        // https://bugs.webkit.org/show_bug.cgi?id=137297
        // This path is also taken if a CSP disallows eval.
        if (!supportsSourceURL) {
            let promises = assets.map((asset)=>{
                var _hmrDownload;
                return (_hmrDownload = hmrDownload(asset)) === null || _hmrDownload === void 0 ? void 0 : _hmrDownload.catch((err)=>{
                    // Web extension fix
                    if (extCtx && extCtx.runtime && extCtx.runtime.getManifest().manifest_version == 3 && typeof ServiceWorkerGlobalScope != "undefined" && global instanceof ServiceWorkerGlobalScope) {
                        extCtx.runtime.reload();
                        return;
                    }
                    throw err;
                });
            });
            scriptsToRemove = await Promise.all(promises);
        }
        assets.forEach(function(asset) {
            hmrApply(module.bundle.root, asset);
        });
    } finally{
        delete global.parcelHotUpdate;
        if (scriptsToRemove) scriptsToRemove.forEach((script)=>{
            if (script) {
                var _document$head2;
                (_document$head2 = document.head) === null || _document$head2 === void 0 || _document$head2.removeChild(script);
            }
        });
    }
}
function hmrApply(bundle /*: ParcelRequire */ , asset /*:  HMRAsset */ ) {
    var modules = bundle.modules;
    if (!modules) return;
    if (asset.type === "css") reloadCSS();
    else if (asset.type === "js") {
        let deps = asset.depsByBundle[bundle.HMR_BUNDLE_ID];
        if (deps) {
            if (modules[asset.id]) {
                // Remove dependencies that are removed and will become orphaned.
                // This is necessary so that if the asset is added back again, the cache is gone, and we prevent a full page reload.
                let oldDeps = modules[asset.id][1];
                for(let dep in oldDeps)if (!deps[dep] || deps[dep] !== oldDeps[dep]) {
                    let id = oldDeps[dep];
                    let parents = getParents(module.bundle.root, id);
                    if (parents.length === 1) hmrDelete(module.bundle.root, id);
                }
            }
            if (supportsSourceURL) // Global eval. We would use `new Function` here but browser
            // support for source maps is better with eval.
            (0, eval)(asset.output);
            // $FlowFixMe
            let fn = global.parcelHotUpdate[asset.id];
            modules[asset.id] = [
                fn,
                deps
            ];
        } else if (bundle.parent) hmrApply(bundle.parent, asset);
    }
}
function hmrDelete(bundle, id) {
    let modules = bundle.modules;
    if (!modules) return;
    if (modules[id]) {
        // Collect dependencies that will become orphaned when this module is deleted.
        let deps = modules[id][1];
        let orphans = [];
        for(let dep in deps){
            let parents = getParents(module.bundle.root, deps[dep]);
            if (parents.length === 1) orphans.push(deps[dep]);
        }
        // Delete the module. This must be done before deleting dependencies in case of circular dependencies.
        delete modules[id];
        delete bundle.cache[id];
        // Now delete the orphans.
        orphans.forEach((id)=>{
            hmrDelete(module.bundle.root, id);
        });
    } else if (bundle.parent) hmrDelete(bundle.parent, id);
}
function hmrAcceptCheck(bundle /*: ParcelRequire */ , id /*: string */ , depsByBundle /*: ?{ [string]: { [string]: string } }*/ ) {
    if (hmrAcceptCheckOne(bundle, id, depsByBundle)) return true;
    // Traverse parents breadth first. All possible ancestries must accept the HMR update, or we'll reload.
    let parents = getParents(module.bundle.root, id);
    let accepted = false;
    while(parents.length > 0){
        let v = parents.shift();
        let a = hmrAcceptCheckOne(v[0], v[1], null);
        if (a) // If this parent accepts, stop traversing upward, but still consider siblings.
        accepted = true;
        else {
            // Otherwise, queue the parents in the next level upward.
            let p = getParents(module.bundle.root, v[1]);
            if (p.length === 0) {
                // If there are no parents, then we've reached an entry without accepting. Reload.
                accepted = false;
                break;
            }
            parents.push(...p);
        }
    }
    return accepted;
}
function hmrAcceptCheckOne(bundle /*: ParcelRequire */ , id /*: string */ , depsByBundle /*: ?{ [string]: { [string]: string } }*/ ) {
    var modules = bundle.modules;
    if (!modules) return;
    if (depsByBundle && !depsByBundle[bundle.HMR_BUNDLE_ID]) {
        // If we reached the root bundle without finding where the asset should go,
        // there's nothing to do. Mark as "accepted" so we don't reload the page.
        if (!bundle.parent) return true;
        return hmrAcceptCheck(bundle.parent, id, depsByBundle);
    }
    if (checkedAssets[id]) return true;
    checkedAssets[id] = true;
    var cached = bundle.cache[id];
    assetsToDispose.push([
        bundle,
        id
    ]);
    if (!cached || cached.hot && cached.hot._acceptCallbacks.length) {
        assetsToAccept.push([
            bundle,
            id
        ]);
        return true;
    }
}
function hmrDispose(bundle /*: ParcelRequire */ , id /*: string */ ) {
    var cached = bundle.cache[id];
    bundle.hotData[id] = {};
    if (cached && cached.hot) cached.hot.data = bundle.hotData[id];
    if (cached && cached.hot && cached.hot._disposeCallbacks.length) cached.hot._disposeCallbacks.forEach(function(cb) {
        cb(bundle.hotData[id]);
    });
    delete bundle.cache[id];
}
function hmrAccept(bundle /*: ParcelRequire */ , id /*: string */ ) {
    // Execute the module.
    bundle(id);
    // Run the accept callbacks in the new version of the module.
    var cached = bundle.cache[id];
    if (cached && cached.hot && cached.hot._acceptCallbacks.length) cached.hot._acceptCallbacks.forEach(function(cb) {
        var assetsToAlsoAccept = cb(function() {
            return getParents(module.bundle.root, id);
        });
        if (assetsToAlsoAccept && assetsToAccept.length) {
            assetsToAlsoAccept.forEach(function(a) {
                hmrDispose(a[0], a[1]);
            });
            // $FlowFixMe[method-unbinding]
            assetsToAccept.push.apply(assetsToAccept, assetsToAlsoAccept);
        }
    });
}

},{}],"d8Dch":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
var _app = require("./App");
var _appDefault = parcelHelpers.interopDefault(_app);
var _miniFramework = require("../Modules/MiniFramework");
var _miniFrameworkDefault = parcelHelpers.interopDefault(_miniFramework);
var _styleCss = require("./style.css");
// Initialize and render the App component
(0, _miniFrameworkDefault.default).render((0, _appDefault.default)(), document.querySelector("#root"));

},{"./App":"e9Zfo","../Modules/MiniFramework":"j4fYt","./style.css":"bhJkM","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"e9Zfo":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "default", ()=>App);
var _miniFramework = require("../Modules/MiniFramework");
var _miniFrameworkDefault = parcelHelpers.interopDefault(_miniFramework);
var _image = require("./image");
var _imageDefault = parcelHelpers.interopDefault(_image);
var _state1 = require("./State1");
var _state1Default = parcelHelpers.interopDefault(_state1);
var _mapComp = require("./MapComp");
var _mapCompDefault = parcelHelpers.interopDefault(_mapComp);
var _effect = require("./Effect");
var _effectDefault = parcelHelpers.interopDefault(_effect);
var _context = require("./Context");
function App() {
    return (0, _miniFrameworkDefault.default).createElement((0, _context.MyContext).Provider, null, (0, _miniFrameworkDefault.default).createElement("div", null, (0, _miniFrameworkDefault.default).createElement("header", null, (0, _miniFrameworkDefault.default).createElement("h1", null, "Welcome to Mini.js")), (0, _miniFrameworkDefault.default).createElement("div", {
        id: "container"
    }, (0, _miniFrameworkDefault.default).createElement((0, _imageDefault.default), null), (0, _miniFrameworkDefault.default).createElement("hr", null), (0, _miniFrameworkDefault.default).createElement((0, _state1Default.default), null), (0, _miniFrameworkDefault.default).createElement("hr", null), (0, _miniFrameworkDefault.default).createElement((0, _mapCompDefault.default), null), (0, _miniFrameworkDefault.default).createElement("hr", null), (0, _miniFrameworkDefault.default).createElement((0, _effectDefault.default), null), (0, _miniFrameworkDefault.default).createElement("hr", null)), (0, _miniFrameworkDefault.default).createElement("footer", null)));
}

},{"../Modules/MiniFramework":"j4fYt","./image":"4f6qt","./State1":"2Eq2J","./MapComp":"9GO05","./Effect":"eRHMj","./Context":"knXGc","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"j4fYt":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
const MiniFramework = {
    currentComponent: null,
    // Aktualny komponent, który jest renderowany
    stateIndex: 0,
    // Indeks stanu dla hooków
    effectIndex: 0,
    // Indeks efektu dla hooków
    stateMap: new WeakMap(),
    // Mapa przechowująca stany komponentów
    effectMap: new WeakMap(),
    // Mapa przechowująca efekty komponentów
    componentMap: new WeakMap(),
    // Mapa przechowująca komponenty i ich odpowiadające im elementy DOM
    contextMap: new WeakMap(),
    // Mapy WeakMap do przechowywania wartości kontekstów
    // Funkcja do tworzenia elementu
    createElement: (tag, props, ...children)=>{
        if (typeof tag === "function" && !tag.isReactComponent) // Jeżeli tag jest funkcją i nie jest komponentem klasowym
        return {
            tag,
            props: {
                ...props,
                children
            }
        };
        if (tag.prototype && tag.isReactComponent) {
            // Jeżeli tag jest komponentem klasowym
            const componentInstance = new tag(props); // Tworzy instancję komponentu
            componentInstance.willInit(); // Metoda wywoływana przed montowaniem komponentu
            const componentElement = componentInstance.mount(); // Montuje komponent
            componentInstance.didInit(); // Metoda wywoływana po zamontowaniu komponentu
            return componentElement;
        }
        // Zwraca obiekt reprezentujący element DOM
        return {
            tag,
            props: {
                ...props,
                children
            }
        };
    },
    // Funkcja do renderowania elementu w kontenerze DOM
    render: function(frameworkEl, container, replace = false) {
        // Obsługa tablicy elementów
        if (Array.isArray(frameworkEl)) {
            if (replace) container.innerHTML = ""; // Opróżnia kontener, jeśli replace jest true
            frameworkEl.forEach((element)=>{
                this.render(element, container, false); // Rekurencyjnie renderuje każdy element z tablicy
            });
            return;
        }
        // Obsługa stringów i liczb
        if (typeof frameworkEl === "string" || typeof frameworkEl === "number") {
            if (replace) container.innerHTML = ""; // Opróżnia kontener, jeśli replace jest true
            container.appendChild(document.createTextNode(frameworkEl)); // Dodaje tekst do kontenera
            return;
        }
        // Obsługa komponentów funkcyjnych
        if (typeof frameworkEl.tag === "function") {
            this.currentComponent = frameworkEl; // Ustawia aktualny komponent
            this.stateIndex = 0; // Resetuje indeks stanu
            this.effectIndex = 0; // Resetuje indeks efektu
            const componentElement = frameworkEl.tag(frameworkEl.props); // Wywołuje funkcję komponentu
            this.currentComponent = null;
            const domNode = this.render(componentElement, container, replace); // Rekurencyjnie renderuje element
            this.componentMap.set(frameworkEl, domNode); // Mapuje komponent na element DOM
            return domNode;
        }
        // Tworzy rzeczywisty element DOM dla standardowych tagów
        const actualDOMElement = document.createElement(frameworkEl.tag);
        // Aplikuje atrybuty (props) do utworzonego elementu, z wyłączeniem dzieci
        Object.keys(frameworkEl?.props || {}).filter((key)=>key !== "children").forEach((property)=>{
            if (property.startsWith("on")) // Dodaje event listener, jeśli atrybut zaczyna się od "on"
            actualDOMElement.addEventListener(property.substring(2).toLowerCase(), frameworkEl.props[property]);
            else if (property === "className") // Obsługa klasy CSS
            actualDOMElement.className = frameworkEl.props[property];
            else // Inne atrybuty
            actualDOMElement[property] = frameworkEl.props[property];
        });
        // Rekurencyjnie renderuje dzieci
        frameworkEl?.props?.children?.forEach((child)=>{
            this.render(child, actualDOMElement);
        });
        // Zastępuje zawartość kontenera, jeśli replace jest true
        if (replace) container.innerHTML = "";
        container.appendChild(actualDOMElement);
        // Uruchamia efekty po renderowaniu
        this.runEffects(frameworkEl);
        return actualDOMElement; // Zwraca element DOM
    },
    // Hook useState
    useState: function(initialState) {
        const component = this.currentComponent; // Pobiera aktualny komponent
        if (!component) throw new Error("useState must be called within a component"); // Błąd, jeśli useState jest używany poza komponentem
        const stateIndex = this.stateIndex++; // Inkrementuje indeks stanu
        let componentState = this.stateMap.get(component) || []; // Pobiera stan komponentu
        if (!componentState[stateIndex]) componentState[stateIndex] = initialState; // Inicjalizuje stan, jeśli nie jest jeszcze ustawiony
        const setState = (newState)=>{
            const currentState = componentState[stateIndex]; // Bieżący stan
            const updatedState = typeof newState === "function" ? newState(currentState) : newState; // Nowy stan
            if (updatedState !== currentState) {
                componentState[stateIndex] = updatedState; // Aktualizuje stan, jeśli się zmienił
                MiniFramework.update(component); // Aktualizuje komponent
            }
        };
        this.stateMap.set(component, componentState); // Aktualizuje mapę stanów
        return [
            componentState[stateIndex],
            setState
        ]; // Zwraca stan i funkcję do jego aktualizacji
    },
    // Hook useEffect
    useEffect: function(effect, deps) {
        const component = this.currentComponent; // Pobiera aktualny komponent
        if (!component) throw new Error("useEffect must be called within a component"); // Błąd, jeśli useEffect jest używany poza komponentem
        const effectIndex = this.effectIndex++; // Inkrementuje indeks efektu
        let componentEffects = this.effectMap.get(component) || []; // Pobiera efekty komponentu
        const prevEffect = componentEffects[effectIndex]; // Poprzedni efekt
        // Sprawdza, czy zależności się zmieniły
        const hasChanged = !prevEffect || !deps || deps.some((dep, i)=>dep !== prevEffect.deps[i]);
        if (hasChanged) {
            if (prevEffect && prevEffect.cleanup) prevEffect.cleanup(); // Wywołuje funkcję czyszczącą poprzedniego efektu
            const cleanup = effect(); // Uruchamia nowy efekt
            componentEffects[effectIndex] = {
                deps,
                cleanup
            }; // Zapisuje nowy efekt
        }
        this.effectMap.set(component, componentEffects); // Aktualizuje mapę efektów
    },
    // Uruchamianie efektów po renderowaniu komponentu
    runEffects: function(component) {
        const componentEffects = this.effectMap.get(component) || []; // Pobiera efekty komponentu
        componentEffects.forEach((effect)=>{
            if (effect.cleanup) effect.cleanup(); // Wywołuje funkcję czyszczącą efektu, jeśli istnieje
            effect.cleanup = effect.effect(); // Uruchamia efekt i zapisuje funkcję czyszczącą
        });
    },
    // Aktualizacja komponentu
    update: function(component) {
        const domNode = this.componentMap.get(component); // Pobiera element DOM powiązany z komponentem
        if (domNode) this.render(component, domNode, true); // Renderuje komponent ponownie, zastępując jego zawartość
    },
    createContext: function(defaultValue) {
        const context = {
            defaultValue,
            state: defaultValue,
            subscribers: new Set()
        };
        function Provider({ value, children }) {
            context.state = value !== undefined ? value : context.defaultValue;
            context.subscribers.forEach((callback)=>callback(context.state));
            return children;
        }
        function useContext() {
            const [value, setValue] = MiniFramework.useState(context.state);
            MiniFramework.useEffect(()=>{
                const updateValue = (newValue)=>setValue(newValue);
                context.subscribers.add(updateValue);
                return ()=>context.subscribers.delete(updateValue);
            }, []);
            return value;
        }
        return {
            Provider,
            useContext
        };
    }
};
// Klasa bazowa dla komponentów
class MiniComponent {
    constructor(props){
        this.props = props; // Przypisanie właściwości (props) do instancji komponentu
        this.state = {}; // Inicjalizacja stanu komponentu jako pustego obiektu
        this.willInit(); // Wywołanie metody willInit (przed montowaniem komponentu)
        this.mount(); // Wywołanie metody mount (montowanie komponentu)
        this.didInit(); // Wywołanie metody didInit (po zamontowaniu komponentu)
    }
    willInit() {}
    didInit() {}
    didUpdate() {}
    mainDiv() {
        this.name = this.constructor.name; // Przypisuje nazwę klasy do zmiennej name
        return `${this.constructor.name}`; // Zwraca nazwę klasy jako string
    }
    // Ustawia nowy stan komponentu
    setState(partialState) {
        this.state = {
            ...this.state,
            ...partialState
        }; // Aktualizuje stan komponentu
        MiniFramework.update(this); // Aktualizuje komponent w DOM
    }
    // Metoda montująca, musi być zaimplementowana przez podklasę
    mount() {
        throw new Error("Component subclass must implement mount method."); // Rzuca błąd, jeśli metoda nie została zaimplementowana
    }
    // Oznacza, że jest to komponent kompatybilny z Reactem
    static isReactComponent = true;
}
// Dodanie klasy MiniComponent do MiniFramework jako jego składnik
MiniFramework.Component = MiniComponent;
exports.default = MiniFramework;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"gkKU3":[function(require,module,exports) {
exports.interopDefault = function(a) {
    return a && a.__esModule ? a : {
        default: a
    };
};
exports.defineInteropFlag = function(a) {
    Object.defineProperty(a, "__esModule", {
        value: true
    });
};
exports.exportAll = function(source, dest) {
    Object.keys(source).forEach(function(key) {
        if (key === "default" || key === "__esModule" || Object.prototype.hasOwnProperty.call(dest, key)) return;
        Object.defineProperty(dest, key, {
            enumerable: true,
            get: function() {
                return source[key];
            }
        });
    });
    return dest;
};
exports.export = function(dest, destName, get) {
    Object.defineProperty(dest, destName, {
        enumerable: true,
        get: get
    });
};

},{}],"4f6qt":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _miniFramework = require("../Modules/MiniFramework");
var _miniFrameworkDefault = parcelHelpers.interopDefault(_miniFramework);
var _1Jpg = require("./1.jpg");
var _1JpgDefault = parcelHelpers.interopDefault(_1Jpg);
const ImageComp = ()=>{
    return (0, _miniFrameworkDefault.default).createElement("div", null, (0, _miniFrameworkDefault.default).createElement("img", {
        name: "image",
        id: "image",
        src: (0, _1JpgDefault.default),
        alt: "fireSpot"
    }), (0, _miniFrameworkDefault.default).createElement("br", null), (0, _miniFrameworkDefault.default).createElement("label", {
        for: "image",
        style: "color: white"
    }, "Importowane zdj\u0119cie w jsx"));
};
exports.default = ImageComp;

},{"../Modules/MiniFramework":"j4fYt","./1.jpg":"4ibEP","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"4ibEP":[function(require,module,exports) {
module.exports = require("bcfd47919a7e1b9").getBundleURL("byUka") + "1.e6545fd6.jpg" + "?" + Date.now();

},{"bcfd47919a7e1b9":"lgJ39"}],"lgJ39":[function(require,module,exports) {
"use strict";
var bundleURL = {};
function getBundleURLCached(id) {
    var value = bundleURL[id];
    if (!value) {
        value = getBundleURL();
        bundleURL[id] = value;
    }
    return value;
}
function getBundleURL() {
    try {
        throw new Error();
    } catch (err) {
        var matches = ("" + err.stack).match(/(https?|file|ftp|(chrome|moz|safari-web)-extension):\/\/[^)\n]+/g);
        if (matches) // The first two stack frames will be this function and getBundleURLCached.
        // Use the 3rd one, which will be a runtime in the original bundle.
        return getBaseURL(matches[2]);
    }
    return "/";
}
function getBaseURL(url) {
    return ("" + url).replace(/^((?:https?|file|ftp|(chrome|moz|safari-web)-extension):\/\/.+)\/[^/]+$/, "$1") + "/";
}
// TODO: Replace uses with `new URL(url).origin` when ie11 is no longer supported.
function getOrigin(url) {
    var matches = ("" + url).match(/(https?|file|ftp|(chrome|moz|safari-web)-extension):\/\/[^/]+/);
    if (!matches) throw new Error("Origin not found");
    return matches[0];
}
exports.getBundleURL = getBundleURLCached;
exports.getBaseURL = getBaseURL;
exports.getOrigin = getOrigin;

},{}],"2Eq2J":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _miniFramework = require("../Modules/MiniFramework");
var _miniFrameworkDefault = parcelHelpers.interopDefault(_miniFramework);
const State1 = (props)=>{
    const [state, setState] = (0, _miniFrameworkDefault.default).useState({
        count: 0
    });
    const increment = ()=>{
        console.log(state);
        setState((prevState)=>({
                count: prevState.count + 1
            }));
    };
    return (0, _miniFrameworkDefault.default).createElement("div", null, (0, _miniFrameworkDefault.default).createElement("p", null, "Count: ", state.count), (0, _miniFrameworkDefault.default).createElement("button", {
        onClick: ()=>increment()
    }, "Increment"), (0, _miniFrameworkDefault.default).createElement("p", {
        style: "color: white"
    }, "Zmiana stanu i dynamiczne renderowanie w komponentach funkcyjnych"));
};
exports.default = State1;

},{"../Modules/MiniFramework":"j4fYt","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"9GO05":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _miniFramework = require("../Modules/MiniFramework");
var _miniFrameworkDefault = parcelHelpers.interopDefault(_miniFramework);
const MapComp = ()=>{
    const exampleStrings = [
        "Hello, world!",
        "JavaScript is awesome.",
        "Let's learn to code.",
        "Arrays can hold multiple values.",
        "This is a string example.",
        "Have a great day!",
        "Coding is fun!",
        "Happy coding!",
        "OpenAI creates amazing tools.",
        "ChatGPT is here to help."
    ];
    return (0, _miniFrameworkDefault.default).createElement("div", null, exampleStrings.map((elem)=>{
        return (0, _miniFrameworkDefault.default).createElement("p", {
            style: ""
        }, elem);
    }), (0, _miniFrameworkDefault.default).createElement("p", {
        style: "color: white"
    }, "Generowanie dynamicznych list znacznik\xf3w"));
};
exports.default = MapComp;

},{"../Modules/MiniFramework":"j4fYt","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"eRHMj":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _miniFramework = require("../Modules/MiniFramework");
var _miniFrameworkDefault = parcelHelpers.interopDefault(_miniFramework);
const Effect = ()=>{
    const [count, setCount] = (0, _miniFrameworkDefault.default).useState({
        count: 0
    });
    (0, _miniFrameworkDefault.default).useEffect(()=>{
        console.log("Component mounted or updated!");
        // Cleanup logic when the component unmounts or before the next effect
        return ()=>{
            console.log("Cleanup on unmount or update");
        };
    }, [
        count
    ]);
    return (0, _miniFrameworkDefault.default).createElement("div", null, (0, _miniFrameworkDefault.default).createElement("p", null, "Count: ", count.count), (0, _miniFrameworkDefault.default).createElement("button", {
        onClick: ()=>setCount((prevState)=>({
                    count: prevState.count + 1
                }))
    }, "Increment"), (0, _miniFrameworkDefault.default).createElement("p", {
        style: "color: white"
    }, "useEffect, metoda cyklu \u017Cycia komponentu "));
};
exports.default = Effect;

},{"../Modules/MiniFramework":"j4fYt","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"knXGc":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "MyContext", ()=>MyContext);
var _miniFramework = require("../Modules/MiniFramework");
var _miniFrameworkDefault = parcelHelpers.interopDefault(_miniFramework);
const MyContext = (0, _miniFrameworkDefault.default).createContext("cok");

},{"../Modules/MiniFramework":"j4fYt","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"bhJkM":[function() {},{}]},["gjUm6","d8Dch"], "d8Dch", "parcelRequire94c2")

//# sourceMappingURL=index.b4b6dfad.js.map
