if(!self.define){let e,s={};const t=(t,n)=>(t=new URL(t+".js",n).href,s[t]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=t,e.onload=s,document.head.appendChild(e)}else e=t,importScripts(t),s()})).then((()=>{let e=s[t];if(!e)throw new Error(`Module ${t} didn’t register its module`);return e})));self.define=(n,i)=>{const l=e||("document"in self?document.currentScript.src:"")||location.href;if(s[l])return;let o={};const r=e=>t(e,l),c={module:{uri:l},exports:o,require:r};s[l]=Promise.all(n.map((e=>c[e]||r(e)))).then((e=>(i(...e),o)))}}define(["./workbox-db5fc017"],(function(e){"use strict";e.setCacheNameDetails({prefix:"eve-online-style-fit-test"}),self.addEventListener("message",(e=>{e.data&&"SKIP_WAITING"===e.data.type&&self.skipWaiting()})),e.precacheAndRoute([{url:"/eve-online-style-fit-test/css/app.06b7bc7e.css",revision:null},{url:"/eve-online-style-fit-test/css/chunk-vendors.de32ab32.css",revision:null},{url:"/eve-online-style-fit-test/index.html",revision:"919566e5d8d0f84edfa73e7cea70b0e3"},{url:"/eve-online-style-fit-test/js/about.d1cc1f1b.js",revision:null},{url:"/eve-online-style-fit-test/js/app.beea8dc0.js",revision:null},{url:"/eve-online-style-fit-test/js/chunk-vendors.afb2373c.js",revision:null},{url:"/eve-online-style-fit-test/manifest.json",revision:"e9f12dc82f6818fb093be972a0fd8c0c"},{url:"/eve-online-style-fit-test/robots.txt",revision:"b6216d61c03e6ce0c9aea6ca7808f7ca"}],{})}));
//# sourceMappingURL=service-worker.js.map