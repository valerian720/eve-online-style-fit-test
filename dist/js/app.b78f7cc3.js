(function(){"use strict";var e={5663:function(e,s,t){var r=t(9242),o=t(3396);function n(e,s){const t=(0,o.up)("router-link"),r=(0,o.up)("router-view");return(0,o.wg)(),(0,o.iD)(o.HY,null,[(0,o._)("nav",null,[(0,o.Wm)(t,{to:"/"},{default:(0,o.w5)((()=>[(0,o.Uk)("Home")])),_:1}),(0,o.Uk)(" | ")]),(0,o.Wm)(r)],64)}var l=t(89);const i={},c=(0,l.Z)(i,[["render",n]]);var a=c,d=t(5431);(0,d.z)("/eve-online-style-fit-test/service-worker.js",{ready(){console.log("App is being served from cache by a service worker.\nFor more details, visit https://goo.gl/AFskqB")},registered(){console.log("Service worker has been registered.")},cached(){console.log("Content has been cached for offline use.")},updatefound(){console.log("New content is downloading.")},updated(){console.log("New content is available; please refresh.")},offline(){console.log("No internet connection found. App is running in offline mode.")},error(e){console.error("Error during service worker registration:",e)}});var u=t(2483);const p={class:"home"};function h(e,s,t,r,n,l){const i=(0,o.up)("FitComponent");return(0,o.wg)(),(0,o.iD)("div",p,[(0,o.Wm)(i,{msg:"Welcome to Your Vue.js App"})])}var m=t(7139);const g={class:""},f=(0,o._)("div",{class:"px-3 py-3 pt-md-5 pb-md-4 mx-auto text-center"},[(0,o._)("h1",{class:"display-4"},"Баллансировка"),(0,o._)("p",{class:"lead"}," Выберите в левой колонке пункты в слоты что бы в правой колонке появился итоговый балланс корабля ")],-1),v={class:"row m-5 p-1"},w={class:"col m-1 p-1"},y={class:"card mb-4 box-shadow"},S=(0,o._)("div",{class:"card-header"},[(0,o._)("h4",{class:"my-0 font-weight-normal"},"Корабль")],-1),b={class:"card-body"},P=(0,o._)("option",{selected:"",value:null},"Выберите корабль",-1),_=["value"],k={key:0,class:"card mb-4 box-shadow"},U=(0,o._)("div",{class:"card-header"},[(0,o._)("h4",{class:"my-0 font-weight-normal"}," Слоты корабля (выбор модулей) ")],-1),C={class:"card-body"},T={class:"h4"},x=["onUpdate:modelValue"],D=(0,o._)("option",{selected:"",value:{}},"Пустой модуль",-1),z=["value"],j={class:"col m-1 p-1"},A={class:"card mb-4 box-shadow"},O=(0,o._)("div",{class:"card-header"},[(0,o._)("h4",{class:"my-0 font-weight-normal"},"Итоговый баланс")],-1),E={class:"card-body"},M={key:0,class:"list-unstyled mt-3 mb-4"},H={key:1,class:"row m-1 p-1"},B={key:0,class:"card mb-4 box-shadow"},F=(0,o._)("div",{class:"card-header"},[(0,o._)("h4",{class:"my-0 font-weight-normal"},"Итог")],-1),V={class:"card-body"},Y={class:"row m-1 p-1"},I={class:"row m-1 p-1"};function N(e,s,t,n,l,i){return(0,o.wg)(),(0,o.iD)("div",g,[f,(0,o._)("div",v,[(0,o._)("div",w,[(0,o._)("div",y,[S,(0,o._)("div",b,[(0,o.wy)((0,o._)("select",{class:"form-select","onUpdate:modelValue":s[0]||(s[0]=e=>l.selectedShip=e),"aria-label":"Default select example"},[P,((0,o.wg)(!0),(0,o.iD)(o.HY,null,(0,o.Ko)(l.ships,((e,s)=>((0,o.wg)(),(0,o.iD)("option",{value:e,key:s},(0,m.zw)(i.splitCamelCase(e.name)),9,_)))),128))],512),[[r.bM,l.selectedShip]])])]),null!=l.selectedShip?((0,o.wg)(),(0,o.iD)("div",k,[U,(0,o._)("div",C,[((0,o.wg)(!0),(0,o.iD)(o.HY,null,(0,o.Ko)(l.selectedShip.slots,((e,t)=>((0,o.wg)(),(0,o.iD)("div",{class:"row m-1 p-1",key:t},[(0,o._)("p",T,"слот "+(0,m.zw)(i.romanize(t+1)),1),((0,o.wg)(!0),(0,o.iD)(o.HY,null,(0,o.Ko)(i.range(e),(e=>(0,o.wy)(((0,o.wg)(),(0,o.iD)("select",{class:"form-select mb-2","aria-label":"Default select example",key:e,onChange:s[1]||(s[1]=e=>i.calcSelectedProcessedShip()),"onUpdate:modelValue":s=>l.selectedShip.usedSlots[i.summUpToIndex(l.selectedShip.slots,t)+e]=s},[D,((0,o.wg)(!0),(0,o.iD)(o.HY,null,(0,o.Ko)(l.modules.filter((e=>e.slot==t+1)),((e,s)=>((0,o.wg)(),(0,o.iD)("option",{value:e,key:s},(0,m.zw)(i.splitCamelCase(e.name))+" ("+(0,m.zw)(i.moduleToString(e))+") ",9,z)))),128))],40,x)),[[r.bM,l.selectedShip.usedSlots[i.summUpToIndex(l.selectedShip.slots,t)+e]]]))),128))])))),128)),(0,o._)("button",{type:"button",class:"btn btn-primary p-1 m-1",onClick:s[2]||(s[2]=e=>i.resetActiveModules())}," Сброс ")])])):(0,o.kq)("",!0)]),(0,o._)("div",j,[(0,o._)("div",A,[O,(0,o._)("div",E,[null!=l.selectedShip?((0,o.wg)(),(0,o.iD)("ul",M,[(0,o._)("li",null,"Название: "+(0,m.zw)(i.splitCamelCase(l.selectedShip.name)),1),(0,o._)("li",{class:(0,m.C_)({"text-danger":l.selectedProcessedShip.damage<0})}," урон: "+(0,m.zw)(l.selectedProcessedShip.damage),3),(0,o._)("li",{class:(0,m.C_)({"text-danger":l.selectedProcessedShip.shield<0})}," прочность щита: "+(0,m.zw)(l.selectedProcessedShip.shield),3),(0,o._)("li",{class:(0,m.C_)({"text-danger":l.selectedProcessedShip.armor<0})}," прочность брони: "+(0,m.zw)(l.selectedProcessedShip.armor),3),(0,o._)("li",{class:(0,m.C_)({"text-danger":l.selectedProcessedShip.hull<0})}," прочность корпуса: "+(0,m.zw)(l.selectedProcessedShip.hull),3),(0,o._)("li",{class:(0,m.C_)({"text-danger":l.selectedProcessedShip.EnergyCreatingPerTick-l.selectedProcessedShip.energyUsingPerTick<0})}," скорость генерирования энергии: "+(0,m.zw)(l.selectedProcessedShip.EnergyCreatingPerTick)+" / "+(0,m.zw)(l.selectedProcessedShip.EnergyCreatingPerTick-l.selectedProcessedShip.energyUsingPerTick),3),(0,o._)("li",{class:(0,m.C_)({"text-danger":l.selectedProcessedShip.reactor-l.selectedProcessedShip.reactorUsed<0})}," объем реактора: "+(0,m.zw)(l.selectedProcessedShip.reactor)+" / "+(0,m.zw)(l.selectedProcessedShip.reactor-l.selectedProcessedShip.reactorUsed),3),(0,o._)("li",{class:(0,m.C_)({"text-danger":l.selectedProcessedShip.cpu-l.selectedProcessedShip.cpuUsed<0})}," объем CPU: "+(0,m.zw)(l.selectedProcessedShip.cpu)+" / "+(0,m.zw)(l.selectedProcessedShip.cpu-l.selectedProcessedShip.cpuUsed),3)])):((0,o.wg)(),(0,o.iD)("div",H,"Неизвестно"))])]),null!=l.selectedShip?((0,o.wg)(),(0,o.iD)("div",B,[F,(0,o._)("div",V,[(0,o._)("div",Y," Корабль: "+(0,m.zw)(i.splitCamelCase(l.selectedShip.name)),1),(0,o._)("div",I," Модули: "+(0,m.zw)(l.selectedShip.usedSlots.map((e=>i.splitCamelCase(e.name))).filter((e=>null!=e)).join(", ")),1)])])):(0,o.kq)("",!0)])])])}t(7658);var L={name:"FitComponent",props:{msg:String},data(){return{translations:{damage:"урон",shield:"щит",armor:"броня",hull:"корпус",energyUsingPerTick:"энергия затраченная каждый тик",cpuUsed:"использование CPU",reactorUsed:"использование реактора"},shipsDefaults:{name:"ShipDefaults",damage:0,shield:0,armor:0,hull:0,energyUsingPerTick:0,cpuUsed:0,reactorUsed:0,EnergyCreatingPerTick:10,reactor:100,cpu:100,slots:[3,3,2]},modulesDefaults:{name:"ModuleDefaults",damage:0,shield:0,armor:0,hull:0,energyUsingPerTick:1,cpuUsed:10,reactorUsed:10,slot:1},modules:[],ships:[],selectedShip:null,selectedProcessedShip:{}}},created(){this.populate()},watch:{selectedShip(e){this.selectedProcessedShip={...e}}},methods:{calcSelectedProcessedShip(){this.selectedProcessedShip={...this.selectedShip};for(const e in this.selectedProcessedShip.usedSlots){const s=this.selectedProcessedShip.usedSlots[e];if(s!={})for(const e in s)e in this.selectedProcessedShip&&(this.selectedProcessedShip[e]+=s[e])}},splitCamelCase(e){var s=null;return null!=e&&(s=e.replace(/([A-Z])/g," $1").toLowerCase()),s},range(e,s=0){return[...Array(e).keys()].map((e=>e+s))},romanize(e){var s,t={M:1e3,CM:900,D:500,CD:400,C:100,XC:90,L:50,XL:40,X:10,IX:9,V:5,IV:4,I:1},r="";for(s in t)while(e>=t[s])r+=s,e-=t[s];return r},moduleToString(e,s=["name","slot"]){var t=[];for(const r in e)s.includes(r)||0!==e[r]&&t.push(`${this.translate(r)}: ${e[r]}`);return t.join(", ")},summUpToIndex(e,s){return e.reduce(((e,t,r)=>r<s?e+t:e),0)},translate(e){return this.translations[e]},resetActiveModules(){this.selectedShip.usedSlots=new Array(this.selectedShip.slots.reduce(((e,s)=>e+s),0)).fill({}),this.selectedProcessedShip={...this.selectedShip}},populate(){this.modules=[{name:"ShieldBoost",damage:0,shield:100,armor:0,hull:0,energyUsingPerTick:4,cpuUsed:20,reactorUsed:30,slot:2},{name:"ArmorBoost",damage:0,shield:0,armor:120,hull:0,energyUsingPerTick:3,cpuUsed:20,reactorUsed:3,slot:2},{name:"HullBoost",damage:0,shield:0,armor:0,hull:50,energyUsingPerTick:1,cpuUsed:15,reactorUsed:2,slot:3},{name:"ReactorBoost",damage:0,shield:0,armor:0,hull:0,energyUsingPerTick:-10,cpuUsed:20,reactorUsed:3,slot:3},{name:"CoilGun",damage:12,shield:0,armor:0,hull:0,energyUsingPerTick:4,cpuUsed:30,reactorUsed:30,slot:1}],this.ships=[{name:"YellowBeast",damage:0,shield:200,armor:30,hull:100,energyUsingPerTick:0,cpuUsed:0,reactorUsed:0,EnergyCreatingPerTick:10,reactor:100,cpu:100,slots:[6,3,2]},{name:"Runner",damage:0,shield:30,armor:200,hull:400,energyUsingPerTick:0,cpuUsed:0,reactorUsed:0,EnergyCreatingPerTick:20,reactor:30,cpu:30,slots:[1,2,2]}],this.ships.map((e=>{e.usedSlots=new Array(e.slots.reduce(((e,s)=>e+s),0)).fill({})}))}}};const q=(0,l.Z)(L,[["render",N]]);var K=q,W={name:"HomeView",components:{FitComponent:K}};const X=(0,l.Z)(W,[["render",h]]);var Z=X;const $=[{path:"/",name:"home",component:Z},{path:"/about",name:"about",component:()=>t.e(443).then(t.bind(t,7381))}],R=(0,u.p7)({history:(0,u.PO)("/eve-online-style-fit-test/"),routes:$});var G=R,J=t(65),Q=(0,J.MT)({state:{},getters:{},mutations:{},actions:{},modules:{}});t(2166);(0,r.ri)(a).use(Q).use(G).mount("#app")}},s={};function t(r){var o=s[r];if(void 0!==o)return o.exports;var n=s[r]={exports:{}};return e[r](n,n.exports,t),n.exports}t.m=e,function(){var e=[];t.O=function(s,r,o,n){if(!r){var l=1/0;for(d=0;d<e.length;d++){r=e[d][0],o=e[d][1],n=e[d][2];for(var i=!0,c=0;c<r.length;c++)(!1&n||l>=n)&&Object.keys(t.O).every((function(e){return t.O[e](r[c])}))?r.splice(c--,1):(i=!1,n<l&&(l=n));if(i){e.splice(d--,1);var a=o();void 0!==a&&(s=a)}}return s}n=n||0;for(var d=e.length;d>0&&e[d-1][2]>n;d--)e[d]=e[d-1];e[d]=[r,o,n]}}(),function(){t.n=function(e){var s=e&&e.__esModule?function(){return e["default"]}:function(){return e};return t.d(s,{a:s}),s}}(),function(){t.d=function(e,s){for(var r in s)t.o(s,r)&&!t.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:s[r]})}}(),function(){t.f={},t.e=function(e){return Promise.all(Object.keys(t.f).reduce((function(s,r){return t.f[r](e,s),s}),[]))}}(),function(){t.u=function(e){return"js/about.9df68b91.js"}}(),function(){t.miniCssF=function(e){}}(),function(){t.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"===typeof window)return window}}()}(),function(){t.o=function(e,s){return Object.prototype.hasOwnProperty.call(e,s)}}(),function(){var e={},s="eve-online-style-fit-test:";t.l=function(r,o,n,l){if(e[r])e[r].push(o);else{var i,c;if(void 0!==n)for(var a=document.getElementsByTagName("script"),d=0;d<a.length;d++){var u=a[d];if(u.getAttribute("src")==r||u.getAttribute("data-webpack")==s+n){i=u;break}}i||(c=!0,i=document.createElement("script"),i.charset="utf-8",i.timeout=120,t.nc&&i.setAttribute("nonce",t.nc),i.setAttribute("data-webpack",s+n),i.src=r),e[r]=[o];var p=function(s,t){i.onerror=i.onload=null,clearTimeout(h);var o=e[r];if(delete e[r],i.parentNode&&i.parentNode.removeChild(i),o&&o.forEach((function(e){return e(t)})),s)return s(t)},h=setTimeout(p.bind(null,void 0,{type:"timeout",target:i}),12e4);i.onerror=p.bind(null,i.onerror),i.onload=p.bind(null,i.onload),c&&document.head.appendChild(i)}}}(),function(){t.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})}}(),function(){t.p="/eve-online-style-fit-test/"}(),function(){var e={143:0};t.f.j=function(s,r){var o=t.o(e,s)?e[s]:void 0;if(0!==o)if(o)r.push(o[2]);else{var n=new Promise((function(t,r){o=e[s]=[t,r]}));r.push(o[2]=n);var l=t.p+t.u(s),i=new Error,c=function(r){if(t.o(e,s)&&(o=e[s],0!==o&&(e[s]=void 0),o)){var n=r&&("load"===r.type?"missing":r.type),l=r&&r.target&&r.target.src;i.message="Loading chunk "+s+" failed.\n("+n+": "+l+")",i.name="ChunkLoadError",i.type=n,i.request=l,o[1](i)}};t.l(l,c,"chunk-"+s,s)}},t.O.j=function(s){return 0===e[s]};var s=function(s,r){var o,n,l=r[0],i=r[1],c=r[2],a=0;if(l.some((function(s){return 0!==e[s]}))){for(o in i)t.o(i,o)&&(t.m[o]=i[o]);if(c)var d=c(t)}for(s&&s(r);a<l.length;a++)n=l[a],t.o(e,n)&&e[n]&&e[n][0](),e[n]=0;return t.O(d)},r=self["webpackChunkeve_online_style_fit_test"]=self["webpackChunkeve_online_style_fit_test"]||[];r.forEach(s.bind(null,0)),r.push=s.bind(null,r.push.bind(r))}();var r=t.O(void 0,[998],(function(){return t(5663)}));r=t.O(r)})();
//# sourceMappingURL=app.b78f7cc3.js.map