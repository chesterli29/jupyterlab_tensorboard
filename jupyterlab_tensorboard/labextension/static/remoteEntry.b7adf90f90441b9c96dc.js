var _JUPYTERLAB;(()=>{"use strict";var e,r,t,n,o,a,i,u,l,s,d,f,p,c,h,v,b,g,y,m,w,j={},S={};function E(e){if(S[e])return S[e].exports;var r=S[e]={id:e,exports:{}};return j[e](r,r.exports,E),r.exports}E.m=j,E.n=e=>{var r=e&&e.__esModule?()=>e.default:()=>e;return E.d(r,{a:r}),r},E.d=(e,r)=>{for(var t in r)E.o(r,t)&&!E.o(e,t)&&Object.defineProperty(e,t,{enumerable:!0,get:r[t]})},E.f={},E.e=e=>Promise.all(Object.keys(E.f).reduce(((r,t)=>(E.f[t](e,r),r)),[])),E.u=e=>e+"."+{69:"756605c6194a9be8150a",534:"da449b2dcdd8e93b4ec5"}[e]+".js?v="+{69:"756605c6194a9be8150a",534:"da449b2dcdd8e93b4ec5"}[e],E.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"==typeof window)return window}}(),E.o=(e,r)=>Object.prototype.hasOwnProperty.call(e,r),e={},r="jupyterlab_tensorboard:",E.l=(t,n,o,a)=>{if(e[t])e[t].push(n);else{var i,u;if(void 0!==o)for(var l=document.getElementsByTagName("script"),s=0;s<l.length;s++){var d=l[s];if(d.getAttribute("src")==t||d.getAttribute("data-webpack")==r+o){i=d;break}}i||(u=!0,(i=document.createElement("script")).charset="utf-8",i.timeout=120,E.nc&&i.setAttribute("nonce",E.nc),i.setAttribute("data-webpack",r+o),i.src=t),e[t]=[n];var f=(r,n)=>{i.onerror=i.onload=null,clearTimeout(p);var o=e[t];if(delete e[t],i.parentNode&&i.parentNode.removeChild(i),o&&o.forEach((e=>e(n))),r)return r(n)},p=setTimeout(f.bind(null,void 0,{type:"timeout",target:i}),12e4);i.onerror=f.bind(null,i.onerror),i.onload=f.bind(null,i.onload),u&&document.head.appendChild(i)}},E.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},(()=>{E.S={};var e={},r={};E.I=(t,n)=>{n||(n=[]);var o=r[t];if(o||(o=r[t]={}),!(n.indexOf(o)>=0)){if(n.push(o),e[t])return e[t];E.o(E.S,t)||(E.S[t]={});var a=E.S[t],i="jupyterlab_tensorboard",u=[];switch(t){case"default":((e,r,t,n)=>{var o=a[e]=a[e]||{},u=o[r];(!u||!u.loaded&&(1!=!u.eager?n:i>u.from))&&(o[r]={get:()=>E.e(69).then((()=>()=>E(69))),from:i,eager:!1})})("jupyterlab_tensorboard","0.2.1")}return e[t]=u.length?Promise.all(u).then((()=>e[t]=1)):1}}})(),(()=>{var e;E.g.importScripts&&(e=E.g.location+"");var r=E.g.document;if(!e&&r&&(r.currentScript&&(e=r.currentScript.src),!e)){var t=r.getElementsByTagName("script");t.length&&(e=t[t.length-1].src)}if(!e)throw new Error("Automatic publicPath is not supported in this browser");e=e.replace(/#.*$/,"").replace(/\?.*$/,"").replace(/\/[^\/]+$/,"/"),E.p=e})(),t=e=>{var r=e=>e.split(".").map((e=>+e==e?+e:e)),t=/^([^-+]+)?(?:-([^+]+))?(?:\+(.+))?$/.exec(e),n=t[1]?r(t[1]):[];return t[2]&&(n.length++,n.push.apply(n,r(t[2]))),t[3]&&(n.push([]),n.push.apply(n,r(t[3]))),n},n=(e,r)=>{e=t(e),r=t(r);for(var n=0;;){if(n>=e.length)return n<r.length&&"u"!=(typeof r[n])[0];var o=e[n],a=(typeof o)[0];if(n>=r.length)return"u"==a;var i=r[n],u=(typeof i)[0];if(a!=u)return"o"==a&&"n"==u||"s"==u||"u"==a;if("o"!=a&&"u"!=a&&o!=i)return o<i;n++}},o=e=>{if(1===e.length)return"*";if(0 in e){var r="",t=e[0];r+=0==t?">=":-1==t?"<":1==t?"^":2==t?"~":t>0?"=":"!=";for(var n=1,a=1;a<e.length;a++)n--,r+="u"==(typeof(u=e[a]))[0]?"-":(n>0?".":"")+(n=2,u);return r}var i=[];for(a=1;a<e.length;a++){var u=e[a];i.push(0===u?"not("+l()+")":1===u?"("+l()+" || "+l()+")":2===u?i.pop()+" "+i.pop():o(u))}return l();function l(){return i.pop().replace(/^\((.+)\)$/,"$1")}},a=(e,r)=>{if(0 in e){r=t(r);var n=e[0],o=n<0;o&&(n=-n-1);for(var i=0,u=1,l=!0;;u++,i++){var s,d,f=u<e.length?(typeof e[u])[0]:"";if(i>=r.length||"o"==(d=(typeof(s=r[i]))[0]))return!l||("u"==f?u>n&&!o:""==f!=o);if("u"==d){if(!l||"u"!=f)return!1}else if(l)if(f==d)if(u<=n){if(s!=e[u])return!1}else{if(o?s>e[u]:s<e[u])return!1;s!=e[u]&&(l=!1)}else if("s"!=f&&"n"!=f){if(o||u<=n)return!1;l=!1,u--}else{if(u<=n||d<f!=o)return!1;l=!1}else"s"!=f&&"n"!=f&&(l=!1,u--)}}var p=[],c=p.pop.bind(p);for(i=1;i<e.length;i++){var h=e[i];p.push(1==h?c()|c():2==h?c()&c():h?a(h,r):!c())}return!!c()},i=(e,r)=>{var t=E.S[e];if(!t||!E.o(t,r))throw new Error("Shared module "+r+" doesn't exist in shared scope "+e);return t},u=(e,r)=>{var t=e[r];return(r=Object.keys(t).reduce(((e,r)=>!e||n(e,r)?r:e),0))&&t[r]},l=(e,r)=>{var t=e[r];return Object.keys(t).reduce(((e,r)=>!e||!t[e].loaded&&n(e,r)?r:e),0)},s=(e,r,t)=>"Unsatisfied version "+r+" of shared singleton module "+e+" (required "+o(t)+")",d=(e,r,t,n)=>{var o=l(e,t);return a(n,o)||"undefined"!=typeof console&&console.warn&&console.warn(s(t,o,n)),h(e[t][o])},f=(e,r,t)=>{var o=e[r];return(r=Object.keys(o).reduce(((e,r)=>!a(t,r)||e&&!n(e,r)?e:r),0))&&o[r]},p=(e,r,t,n)=>{var a=e[t];return"No satisfying version ("+o(n)+") of shared module "+t+" found in shared scope "+r+".\nAvailable versions: "+Object.keys(a).map((e=>e+" from "+a[e].from)).join(", ")},c=(e,r,t,n)=>{"undefined"!=typeof console&&console.warn&&console.warn(p(e,r,t,n))},h=e=>(e.loaded=1,e.get()),b=(v=e=>function(r,t,n,o){var a=E.I(r);return a&&a.then?a.then(e.bind(e,r,E.S[r],t,n,o)):e(r,E.S[r],t,n,o)})(((e,r,t,n)=>(i(e,t),h(f(r,t,n)||c(r,e,t,n)||u(r,t))))),g=v(((e,r,t,n)=>(i(e,t),d(r,0,t,n)))),y={},m={1:()=>b("default","@jupyterlab/running",[1,3,0,4]),168:()=>g("default","@lumino/signaling",[1,1,4,3]),337:()=>g("default","@jupyterlab/services",[1,6,0,4]),343:()=>g("default","@jupyterlab/apputils",[1,3,0,4]),510:()=>g("default","@lumino/widgets",[1,1,16,1]),629:()=>g("default","@jupyterlab/coreutils",[1,5,0,2]),698:()=>g("default","@jupyterlab/launcher",[1,3,0,4]),794:()=>g("default","@jupyterlab/filebrowser",[1,3,0,5]),797:()=>g("default","@lumino/coreutils",[1,1,5,3]),802:()=>g("default","@jupyterlab/ui-components",[1,3,0,3]),850:()=>g("default","@lumino/algorithm",[1,1,3,3]),992:()=>g("default","@jupyterlab/mainmenu",[1,3,0,4])},w={69:[1,168,337,343,510,629,698,794,797,802,850,992]},E.f.consumes=(e,r)=>{E.o(w,e)&&w[e].forEach((e=>{if(E.o(y,e))return r.push(y[e]);var t=r=>{y[e]=0,j[e]=t=>{delete S[e],t.exports=r()}},n=r=>{delete y[e],j[e]=t=>{throw delete S[e],r}};try{var o=m[e]();o.then?r.push(y[e]=o.then(t).catch(n)):t(o)}catch(e){n(e)}}))},(()=>{var e={441:0};E.f.j=(r,t)=>{var n=E.o(e,r)?e[r]:void 0;if(0!==n)if(n)t.push(n[2]);else{var o=new Promise(((t,o)=>{n=e[r]=[t,o]}));t.push(n[2]=o);var a=E.p+E.u(r),i=new Error;E.l(a,(t=>{if(E.o(e,r)&&(0!==(n=e[r])&&(e[r]=void 0),n)){var o=t&&("load"===t.type?"missing":t.type),a=t&&t.target&&t.target.src;i.message="Loading chunk "+r+" failed.\n("+o+": "+a+")",i.name="ChunkLoadError",i.type=o,i.request=a,n[1](i)}}),"chunk-"+r,r)}};var r=(r,t)=>{for(var n,o,[a,i,u]=t,l=0,s=[];l<a.length;l++)o=a[l],E.o(e,o)&&e[o]&&s.push(e[o][0]),e[o]=0;for(n in i)E.o(i,n)&&(E.m[n]=i[n]);for(u&&u(E),r&&r(t);s.length;)s.shift()()},t=self.webpackChunkjupyterlab_tensorboard=self.webpackChunkjupyterlab_tensorboard||[];t.forEach(r.bind(null,0)),t.push=r.bind(null,t.push.bind(t))})();var k={};(()=>{var e=k,r={"./index":()=>E.e(69).then((()=>()=>E(69))),"./extension":()=>E.e(69).then((()=>()=>E(69))),"./style":()=>E.e(534).then((()=>()=>E(534)))},t=(e,t)=>(E.R=t,t=E.o(r,e)?r[e]():Promise.resolve().then((()=>{throw new Error('Module "'+e+'" does not exist in container.')})),E.R=void 0,t),n=(e,r)=>{if(E.S){var t=E.S.default,n="default";if(t&&t!==e)throw new Error("Container initialization failed as it has already been initialized with a different share scope");return E.S[n]=e,E.I(n,r)}};E.d(e,{get:()=>t,init:()=>n})})(),(_JUPYTERLAB=void 0===_JUPYTERLAB?{}:_JUPYTERLAB).jupyterlab_tensorboard=k})();