/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
function e(){for(var e=0,t=0,n=arguments.length;t<n;t++)e+=arguments[t].length;var r=Array(e),o=0;for(t=0;t<n;t++)for(var u=arguments[t],i=0,a=u.length;i<a;i++,o++)r[o]=u[i];return r}var t="undefined"!=typeof crypto&&crypto.getRandomValues&&crypto.getRandomValues.bind(crypto)||"undefined"!=typeof msCrypto&&"function"==typeof msCrypto.getRandomValues&&msCrypto.getRandomValues.bind(msCrypto),n=new Uint8Array(16);function r(){if(!t)throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");return t(n)}for(var o=[],u=0;u<256;++u)o[u]=(u+256).toString(16).substr(1);function i(e,t,n){var u=t&&n||0;"string"==typeof e&&(t="binary"===e?new Array(16):null,e=null);var i=(e=e||{}).random||(e.rng||r)();if(i[6]=15&i[6]|64,i[8]=63&i[8]|128,t)for(var a=0;a<16;++a)t[u+a]=i[a];return t||function(e,t){var n=t||0,r=o;return[r[e[n++]],r[e[n++]],r[e[n++]],r[e[n++]],"-",r[e[n++]],r[e[n++]],"-",r[e[n++]],r[e[n++]],"-",r[e[n++]],r[e[n++]],"-",r[e[n++]],r[e[n++]],r[e[n++]],r[e[n++]],r[e[n++]],r[e[n++]]].join("")}(i)}var a=Object.prototype.hasOwnProperty,c=function(e){return null==e},s=Array.isArray,f=/[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g;function l(e,t){if(s(e))return e;if(t&&(n=t,r=e,a.call(n,r)))return[e];var n,r,o=[];return e.replace(f,(function(e,t,n,r){return o.push(n?r.replace(/\\(\\)?/g,"$1"):t||e),r})),o}function g(e,t){var n,r=l(t,e);for(n=r.shift();!c(n);){if(null==(e=e[n]))return;n=r.shift()}return e}var p=new Map;function d(e){if(!function(e){if(e){var t=e.tagName;return 0===t.indexOf("UNI-")||"BODY"===t}return!1}(e))throw Error("no such element");var t,n,r={elementId:(t=e,n=t._id,n||(n=i(),t._id=n,p.set(n,{id:n,element:t})),n),tagName:e.tagName.toLocaleLowerCase().replace("uni-","")},o=e.__vue__;return o&&(o.$parent&&o.$parent.$el===e&&(o=o.$parent),o&&!o.$options.isReserved&&(r.nodeId=function(e){return e._uid}(o))),"video"===r.tagName&&(r.videoId=r.nodeId),r}var m={input:{input:function(e,t){var n=e.__vue__;n.valueSync=t,n.$triggerInput({},{value:t})}},textarea:{input:function(e,t){var n=e.__vue__;n.valueSync=t,n.$triggerInput({},{value:t})}},"scroll-view":{scrollTo:function(e,t,n){var r=e.__vue__.$refs.main;r.scrollLeft=t,r.scrollTop=n},scrollTop:function(e){return e.__vue__.$refs.main.scrollTop},scrollLeft:function(e){return e.__vue__.$refs.main.scrollLeft},scrollWidth:function(e){return e.__vue__.$refs.main.scrollWidth},scrollHeight:function(e){return e.__vue__.$refs.main.scrollHeight}},swiper:{swipeTo:function(e,t){e.__vue__.current=t}},"movable-view":{moveTo:function(e,t,n){e.__vue__._animationTo(t,n)}},switch:{tap:function(e){e.click()}},slider:{slideTo:function(e,t){var n=e.__vue__,r=n.$refs["uni-slider"],o=r.offsetWidth,u=r.getBoundingClientRect().left;n.value=t,n._onClick({x:(t-n.min)*o/(n.max-n.min)+u})}}};function v(e){var t,n=e.map((function(e){return function(e){if(document.createTouch)return document.createTouch(window,e.target,e.identifier,e.pageX,e.pageY,e.screenX,e.screenY);return new Touch(e)}(e)}));return document.createTouchList?(t=document).createTouchList.apply(t,n):n}var h={getWindow:function(e){return window},getDocument:function(e){return document},getEl:function(e){var t=p.get(e);if(!t)throw Error("element destroyed");return t.element},getOffset:function(e){var t=e.getBoundingClientRect();return Promise.resolve({left:t.left+window.pageXOffset,top:t.top+window.pageYOffset})},querySelector:function(e,t){return"page"===t&&(t="body"),Promise.resolve(d(e.querySelector(t)))},querySelectorAll:function(e,t){var n=[],r=document.querySelectorAll(t);return[].forEach.call(r,(function(e){try{n.push(d(e))}catch(e){}})),Promise.resolve({elements:n})},queryProperties:function(e,t){return Promise.resolve({properties:t.map((function(t){var n=g(e,t);return"document.documentElement.scrollTop"===t&&0===n&&(n=g(e,"document.body.scrollTop")),n}))})},queryAttributes:function(e,t){return Promise.resolve({attributes:t.map((function(t){return String(e.getAttribute(t))}))})},queryStyles:function(e,t){var n=getComputedStyle(e);return Promise.resolve({styles:t.map((function(e){return n[e]}))})},queryHTML:function(e,t){return Promise.resolve({html:(n="outer"===t?e.outerHTML:e.innerHTML,n.replace(/\n/g,"").replace(/(<uni-text[^>]*>)(<span[^>]*>[^<]*<\/span>)(.*?<\/uni-text>)/g,"$1$3").replace(/<\/?[^>]*>/g,(function(e){return-1<e.indexOf("<body")?"<page>":"</body>"===e?"</page>":0!==e.indexOf("<uni-")&&0!==e.indexOf("</uni-")?"":e.replace(/uni-/g,"").replace(/ role=""/g,"").replace(/ aria-label=""/g,"")})))});var n},dispatchTapEvent:function(e){return e.click(),Promise.resolve()},dispatchLongpressEvent:function(e){return Promise.resolve()},dispatchTouchEvent:function(e,t,n){n||(n={}),n.touches||(n.touches=[]),n.changedTouches||(n.changedTouches=[]),n.touches.length||n.touches.push({identifier:Date.now(),target:e});var r=v(n.touches),o=v(n.changedTouches),u=v([]);return e.dispatchEvent(new TouchEvent(t,{cancelable:!0,bubbles:!0,touches:r,targetTouches:u,changedTouches:o})),Promise.resolve()},callFunction:function(t,n,r){var o=g(m,n);return o?Promise.resolve({result:o.apply(null,e([t],r))}):Promise.reject(Error(n+" not exists"))},triggerEvent:function(e,t,n){var r=e.__vue__;return r.$trigger&&r.$trigger(t,{},n),Promise.resolve()}};var _,y=Object.assign({},function(e){return{"Page.getElement":function(t){return e.querySelector(e.getDocument(t.pageId),t.selector)},"Page.getElements":function(t){return e.querySelectorAll(e.getDocument(t.pageId),t.selector)},"Page.getWindowProperties":function(t){return e.queryProperties(e.getWindow(t.pageId),t.names)}}}(h),function(e){var t=function(t){return e.getEl(t.elementId,t.pageId)};return{"Element.getElement":function(n){return e.querySelector(t(n),n.selector)},"Element.getElements":function(n){return e.querySelectorAll(t(n),n.selector)},"Element.getDOMProperties":function(n){return e.queryProperties(t(n),n.names)},"Element.getProperties":function(n){var r=t(n),o=r.__vue__||r.attr||{};return e.queryProperties(o,n.names)},"Element.getOffset":function(n){return e.getOffset(t(n))},"Element.getAttributes":function(n){return e.queryAttributes(t(n),n.names)},"Element.getStyles":function(n){return e.queryStyles(t(n),n.names)},"Element.getHTML":function(n){return e.queryHTML(t(n),n.type)},"Element.tap":function(n){return e.dispatchTapEvent(t(n))},"Element.longpress":function(n){return e.dispatchLongpressEvent(t(n))},"Element.touchstart":function(n){return e.dispatchTouchEvent(t(n),"touchstart",n)},"Element.touchmove":function(n){return e.dispatchTouchEvent(t(n),"touchmove",n)},"Element.touchend":function(n){return e.dispatchTouchEvent(t(n),"touchend",n)},"Element.callFunction":function(n){return e.callFunction(t(n),n.functionName,n.args)},"Element.triggerEvent":function(n){return e.triggerEvent(t(n),n.type,n.detail)}}}(h));function E(e){return UniViewJSBridge.publishHandler("onAutoMessageReceive",e)}function T(e){return e.__wxWebviewId__?e.__wxWebviewId__:e.privateProperties?e.privateProperties.slaveId:e.$page?e.$page.id:void 0}function S(e){return e.route||e.uri}function w(e){return e.options||e.$page&&e.$page.options||{}}function P(e){return{id:T(e),path:S(e),query:w(e)}}function O(e){var t=function(e){return getCurrentPages().find((function(t){return T(t)===e}))}(e);return t&&t.$vm}function b(e,t){var n;return e&&(!function(e,t){return e._uid===t}(e,t)?e.$children.find((function(e){return n=b(e,t)})):n=e),n}function I(e,t){var n=O(e);return n&&b(n,t)}function M(e,t){var n;return e&&(n=t?g(e.$data,t):Object.assign({},e.$data)),Promise.resolve({data:n})}function C(e,t){return e&&Object.keys(t).forEach((function(n){e[n]=t[n]})),Promise.resolve()}function $(e,t,n){return new Promise((function(r,o){if(!e)return o(_.VM_NOT_EXISTS);if(!e[t])return o(_.VM_NOT_EXISTS);var u,i=e[t].apply(e,n);!(u=i)||"object"!=typeof u&&"function"!=typeof u||"function"!=typeof u.then?r({result:i}):i.then((function(e){r({result:e})}))}))}UniViewJSBridge.subscribe("sendAutoMessage",(function(e){var t=e.id,n=e.method,r=e.params,o={id:t},u=y[n];if(!u)return o.error={message:n+" unimplemented"},E(o);try{u(r).then((function(e){e&&(o.result=e)})).catch((function(e){o.error={message:e.message}})).finally((function(){E(o)}))}catch(e){o.error={message:e.message},E(o)}})),function(e){e.VM_NOT_EXISTS="VM_NOT_EXISTS",e.METHOD_NOT_EXISTS="METHOD_NOT_EXISTS"}(_||(_={}));var A=["stopRecord","getRecorderManager","pauseVoice","stopVoice","pauseBackgroundAudio","stopBackgroundAudio","getBackgroundAudioManager","createAudioContext","createInnerAudioContext","createVideoContext","createCameraContext","createMapContext","canIUse","startAccelerometer","stopAccelerometer","startCompass","stopCompass","hideToast","hideLoading","showNavigationBarLoading","hideNavigationBarLoading","navigateBack","createAnimation","pageScrollTo","createSelectorQuery","createCanvasContext","createContext","drawCanvas","hideKeyboard","stopPullDownRefresh","arrayBufferToBase64","base64ToArrayBuffer"],x={},N=/Sync$/,q=/^on|^off/;function B(e){return N.test(e)||-1!==A.indexOf(e)}var D={getPageStack:function(){return Promise.resolve({pageStack:getCurrentPages().map((function(e){return P(e)}))})},getCurrentPage:function(){var e=getCurrentPages(),t=e.length;return new Promise((function(n,r){t?n(P(e[t-1])):r(Error("getCurrentPages().length=0"))}))},callUniMethod:function(e){var t=e.method,n=e.args;return new Promise((function(e,r){if(!uni[t])return r(Error("uni."+t+" not exists"));if(B(t))return e({result:uni[t].apply(uni,n)});var o=[Object.assign({},n[0]||{},{success:function(n){setTimeout((function(){e({result:n})}),"pageScrollTo"===t?350:0)},fail:function(e){r(Error(e.errMsg.replace(t+":fail ","")))}})];uni[t].apply(uni,o)}))},mockUniMethod:function(e){var t=e.method;if(!uni[t])throw Error("uni."+t+" not exists");if(!function(e){return!q.test(e)}(t))throw Error("You can't mock uni."+t);var n,r=e.result,o=e.functionDeclaration;return c(r)&&c(o)?(x[t]&&(uni[t]=x[t],delete x[t]),Promise.resolve()):(n=c(o)?B(t)?function(){return r}:function(e){setTimeout((function(){r.errMsg&&-1!==r.errMsg.indexOf(":fail")?e.fail&&e.fail(r):e.success&&e.success(r),e.complete&&e.complete(r)}),4)}:function(){for(var t=[],r=0;r<arguments.length;r++)t[r]=arguments[r];return new Function("return "+o)().apply(n,t.concat(e.args))},n.origin=x[t]||uni[t],x[t]||(x[t]=uni[t]),uni[t]=n,Promise.resolve())},captureScreenshot:function(){return new Promise((function(e,t){var n=getCurrentPages(),r=n.length;if(r){var o=n[r-1];if(o){var u=o.$getAppWebview(),i=new plus.nativeObj.Bitmap("captureScreenshot","captureScreenshot.png");u.draw(i,(function(t){var n=i.toBase64Data().replace("data:image/png;base64,","");i.clear(),e({data:n})}),(function(e){t(Error("captureScreenshot fail: "+e.message))}),{drawContent:!0})}}else t(Error("getCurrentPage fail."))}))}},L={getData:function(e){return M(O(e.pageId),e.path)},setData:function(e){return C(O(e.pageId),e.data)},callMethod:function(e){var t,n=((t={})[_.VM_NOT_EXISTS]="Page["+e.pageId+"] not exists",t[_.METHOD_NOT_EXISTS]="page."+e.method+" not exists",t);return new Promise((function(t,r){$(O(e.pageId),e.method,e.args).then((function(e){return t(e)})).catch((function(e){r(Error(n[e]))}))}))}};function V(e){return e.nodeId||e.elementId}var k={getData:function(e){return M(I(e.pageId,V(e)),e.path)},setData:function(e){return C(I(e.pageId,V(e)),e.data)},callMethod:function(e){var t,n=V(e),r=((t={})[_.VM_NOT_EXISTS]="Component["+e.pageId+":"+n+"] not exists",t[_.METHOD_NOT_EXISTS]="component."+e.method+" not exists",t);return new Promise((function(t,o){$(I(e.pageId,n),e.method,e.args).then((function(e){return t(e)})).catch((function(e){o(Error(r[e]))}))}))}},R={};Object.keys(D).forEach((function(e){R["App."+e]=D[e]})),Object.keys(L).forEach((function(e){R["Page."+e]=L[e]})),Object.keys(k).forEach((function(e){R["Element."+e]=k[e]}));var j,H,X=process.env.UNI_AUTOMATOR_WS_ENDPOINT;function U(e){H.send({data:JSON.stringify(e)})}function W(e){var t=JSON.parse(e.data),n=t.id,r=t.method,o=t.params,u={id:n},i=R[r];if(!i){if(j){var a=j(n,r,o,u);if(!0===a)return;i=a}if(!i)return u.error={message:r+" unimplemented"},U(u)}try{i(o).then((function(e){e&&(u.result=e)})).catch((function(e){u.error={message:e.message}})).finally((function(){U(u)}))}catch(e){u.error={message:e.message},U(u)}}j=function(e,t,n,r){var o=n.pageId,u=function(e){var t=getCurrentPages();if(!e)return t[t.length-1];return t.find((function(t){return t.$page.id===e}))}(o);return u?(u.$page.meta.isNVue,UniServiceJSBridge.publishHandler("sendAutoMessage",{id:e,method:t,params:n},o),!0):(r.error={message:"page["+o+"] not exists"},U(r),!0)},UniServiceJSBridge.subscribe("onAutoMessageReceive",(function(e){U(e)})),setTimeout((function(){var e;void 0===e&&(e={}),(H=uni.connectSocket({url:X,complete:function(){}})).onMessage(W),H.onOpen((function(t){e.success&&e.success(),console.log("已开启自动化测试...")})),H.onError((function(e){console.log("automator.onError",e)})),H.onClose((function(){e.fail&&e.fail({errMsg:"$$initRuntimeAutomator:fail"}),console.log("automator.onClose")}))}),500);
