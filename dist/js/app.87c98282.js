(function(t){function e(e){for(var a,r,s=e[0],c=e[1],l=e[2],d=0,p=[];d<s.length;d++)r=s[d],Object.prototype.hasOwnProperty.call(o,r)&&o[r]&&p.push(o[r][0]),o[r]=0;for(a in c)Object.prototype.hasOwnProperty.call(c,a)&&(t[a]=c[a]);u&&u(e);while(p.length)p.shift()();return i.push.apply(i,l||[]),n()}function n(){for(var t,e=0;e<i.length;e++){for(var n=i[e],a=!0,r=1;r<n.length;r++){var c=n[r];0!==o[c]&&(a=!1)}a&&(i.splice(e--,1),t=s(s.s=n[0]))}return t}var a={},o={app:0},i=[];function r(t){return s.p+"js/"+({"chunk-firestore":"chunk-firestore"}[t]||t)+"."+{"chunk-firestore":"a388e6f1"}[t]+".js"}function s(e){if(a[e])return a[e].exports;var n=a[e]={i:e,l:!1,exports:{}};return t[e].call(n.exports,n,n.exports,s),n.l=!0,n.exports}s.e=function(t){var e=[],n=o[t];if(0!==n)if(n)e.push(n[2]);else{var a=new Promise((function(e,a){n=o[t]=[e,a]}));e.push(n[2]=a);var i,c=document.createElement("script");c.charset="utf-8",c.timeout=120,s.nc&&c.setAttribute("nonce",s.nc),c.src=r(t);var l=new Error;i=function(e){c.onerror=c.onload=null,clearTimeout(d);var n=o[t];if(0!==n){if(n){var a=e&&("load"===e.type?"missing":e.type),i=e&&e.target&&e.target.src;l.message="Loading chunk "+t+" failed.\n("+a+": "+i+")",l.name="ChunkLoadError",l.type=a,l.request=i,n[1](l)}o[t]=void 0}};var d=setTimeout((function(){i({type:"timeout",target:c})}),12e4);c.onerror=c.onload=i,document.head.appendChild(c)}return Promise.all(e)},s.m=t,s.c=a,s.d=function(t,e,n){s.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},s.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},s.t=function(t,e){if(1&e&&(t=s(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(s.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var a in t)s.d(n,a,function(e){return t[e]}.bind(null,a));return n},s.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return s.d(e,"a",e),e},s.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},s.p="",s.oe=function(t){throw console.error(t),t};var c=window["webpackJsonp"]=window["webpackJsonp"]||[],l=c.push.bind(c);c.push=e,c=c.slice();for(var d=0;d<c.length;d++)e(c[d]);var u=l;i.push([0,"chunk-vendors"]),n()})({0:function(t,e,n){t.exports=n("56d7")},"0d29":function(t,e,n){"use strict";var a=n("e3e8"),o=n.n(a);o.a},"13e3":function(t,e,n){},"22bc":function(t,e,n){"use strict";var a=n("8f9e"),o=n.n(a);o.a},3704:function(t,e,n){},"56d7":function(t,e,n){"use strict";n.r(e);var a=n("2b0e"),o=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-app",{staticStyle:{"background-color":"#e0e0e0"}},[n("router-view",{staticStyle:{"min-height":"100%"}}),n("v-snackbar",{model:{value:t.loadingBar,callback:function(e){t.loadingBar=e},expression:"loadingBar"}},[n("v-progress-linear",{attrs:{indeterminate:"",color:"#fafafa"}})],1)],1)},i=[],r=n("2f62"),s={name:"App",data:()=>({loadingBar:!1}),computed:{...Object(r["e"])("authentication",["user"]),...Object(r["e"])("projects",{projects:"items"}),...Object(r["e"])("projects",["creationgPending","updatePending","deletionPending"]),projectsLoading(){return this.creationPending||this.deletionPending.length>0||this.updatePending.length>0}},watch:{user:{handler(t,e){!t||e&&e.id===t.id?this.setProjects(null):this.loadProjects()},immediate:!0},projectsLoading(t){this.loadingBar=t}},methods:{...Object(r["b"])("projects",{loadProjects:"getAll"}),...Object(r["d"])("projects",{setProjects:"set",sortProjects:"sort"})}},c=s,l=(n("5c0b"),n("2877")),d=n("6544"),u=n.n(d),p=n("7496"),g=n("8e36"),h=n("2db4"),m=Object(l["a"])(c,o,i,!1,null,null,null),v=m.exports;u()(m,{VApp:p["a"],VProgressLinear:g["a"],VSnackbar:h["a"]});var f=n("8c4f"),b=()=>({items:null,current:void 0,nameToCreate:"",deletionPending:[],creationPending:!1,updatePending:[],collectionName:null,color:"grey"}),y=()=>({set:(t,e)=>{t.items=e},setCurrent:(t,e)=>{t.current=e},setName:(t,e)=>{t.collectionName=e},setColor:(t,e)=>{t.color=e},add:(t,e)=>{t.items?t.items.push(e):t.items=e},update:(t,e)=>{if(t.items&&t.items.length>0){const n=t.items.findIndex(t=>t.id===e.id);if(n>-1){const a=[...t.items];a[n]=e,t.items=a}}t.current&&t.current.id===e.id&&(t.current=e)},removeById:(t,e)=>{const n=t.items.findIndex(t=>t.id===e);t.items.splice(n,1)},addUpdatePending:(t,e)=>t.updatePending.push(e),removeUpdatePending:(t,e)=>{t.updatePending=t.updatePending.filter(t=>t!==e)},addDeletionPending:(t,e)=>t.deletionPending.push(e),removeDeletionPending:(t,e)=>{t.deletionPending=t.deletionPending.filter(t=>t!==e)},setCreationPending:(t,e)=>{t.creationPending=e}}),w=({loadCollectionDB:t})=>({getAll:async({rootState:e,commit:n})=>{const a=t({rootState:e}),o=await a.readAll();n("set",o)},read:async({rootState:e,commit:n},a)=>{n("setCreationPending",!0);const o=t({rootState:e}),i=await o.read(a);n("setCurrent",i),n("setCreationPending",!1)},create:async({rootState:e,commit:n},a)=>{const o=t({rootState:e});n("setCreationPending",!0);const i=await o.create(a);n("add",i),n("setCurrent",i),n("setCreationPending",!1)},rename:async({rootState:e,state:n,commit:a},{name:o})=>{if(!o||"string"!==typeof o)throw Error("Name is not a string");const i=o.match(/[\w\s]/g);if(i.length>11)throw Error("Name too long");const r={name:i.join(""),color:n.color},s=t({rootState:e});await s.updateMeta(r),a("setName",o)},readMeta:async({rootState:e,commit:n})=>{const a=t({rootState:e}),o=await a.getMeta();o&&(o.name&&n("setName",o.name),o.color&&n("setColor",o.color))},update:async({rootState:e,commit:n},a)=>{const o=t({rootState:e});n("addUpdatePending",a.id);const i=await o.update(a);n("update",i),n("removeUpdatePending",a.id)},delete:async({rootState:e,commit:n,getters:a},o)=>{if(a.isDeletionPending(o))return;const i=t({rootState:e});n("addDeletionPending",o),await i.remove(o),n("removeById",o),n("removeDeletionPending",o)}}),P=()=>({isDeletionPending:t=>e=>t.deletionPending.includes(e),getById:t=>e=>t.items.find(t=>t.id===e),syncPending:t=>()=>t.creationPending||t.deletionPending.length>0||t.updatePending.length>0}),_=t=>({state:b(),mutations:y(),actions:w(t),getters:P()}),j=n("59ca"),C=n.n(j);let x=null;var T=()=>(null==x&&(x=n.e("chunk-firestore").then(n.bind(null,"e71f")).then(()=>(C.a.firestore().settings({}),C.a.firestore().enablePersistence({synchronizeTabs:!0}),C.a.firestore()))),x);const k=t=>{const e={};return Object.keys(t).filter(e=>t[e]instanceof Object).forEach(n=>{if(t[n]instanceof C.a.firestore.Timestamp){const a=t[n].toDate();e[n]=a}else k(t[n])}),{...t,...e}};var S=t=>{const e=async(e,n=null)=>{const a=(await T()).collection(t),o=C.a.firestore.FieldValue.serverTimestamp(),i={...e,createTimestamp:o,updateTimestamp:o},r=null==n?a.add(i).then(t=>t.id):a.doc(n).set(i).then(()=>n),s=await r;return{id:s,...e,createTimestamp:new Date,updateTimestamp:new Date}},n=async()=>{const e=await(await T()).collection(t).doc("meta").get(),n=e.exists?e.data():null;return n},a=async e=>{await(await T()).collection(t).doc("meta").set(e)},o=async e=>{const n=await(await T()).collection(t).doc(e).get(),a=n.exists?n.data():null;return null==a?null:(k(a),{id:e,...a})},i=async(e=null)=>{const n=(await T()).collection(t);let a=n;e&&e.forEach(t=>{a=a.where(...t)});const o=t=>t.docs.map(t=>k({id:t.id,...t.data()}));return o(await a.get()).filter(({id:t})=>"meta"!==t)},r=async e=>{const{id:n}=e,a={...e};delete a.id;const o=C.a.firestore.FieldValue.serverTimestamp();return await(await T()).collection(t).doc(n).update({...a,updateTimestamp:o}),{id:n,...a,updateTimestamp:new Date}},s=async e=>(await T()).collection(t).doc(e).delete();return{create:e,getMeta:n,updateMeta:a,read:o,readAll:i,update:r,remove:s}},O=t=>S(`users/${t}/projects`);const V=({rootState:t})=>{const e=t.authentication.user.id;return O(e)};var A={loadCollectionDB:V};const D=(t,e)=>{const n=new Date(t.updateTimestamp),a=new Date(e.updateTimestamp);return a-n},{state:E,mutations:N,getters:B,actions:U}=_(A),$={...N,sort:t=>{t.items.sort(D)}},I={...U,getAll:async t=>{await U.getAll(t),t.commit("sort")},create:async(t,e)=>{await U.create(t,e),t.commit("sort")},update:async(t,e)=>{await U.update(t,e),t.commit("sort")}};var L={namespaced:!0,state:E,mutations:$,getters:B,actions:I},M=(t,e)=>{const n="users/"+t,a="projects/"+e;return S(`${n}/${a}/lists`)};const F=({rootState:t})=>{const e=t.authentication.user.id,n=t.projects.current.id;return M(e,n)};var R={loadCollectionDB:F};const{state:H,mutations:z,getters:q,actions:W}=_(R);H.collectionName="Projects";var J={namespaced:!0,state:H,mutations:z,getters:q,actions:W},K={namespaced:!0,state:{appTitle:Object({NODE_ENV:"production",VUE_APP_FBKEY:"AIzaSyBLyOTwd14zij08LAEIsq3ByrhDgarrBLU",VUE_APP_FBDOMAIN:"task-man-3c2c7.firebaseapp.com",VUE_APP_FBDBURL:"https://task-man-3c2c7.firebaseio.com",VUE_APP_FBPID:"task-man-3c2c7",VUE_APP_FBBUCKET:"task-man-3c2c7.appspot.com",VUE_APP_FBMSID:"690064923228",VUE_APP_APPID:"1:690064923228:web:0bbf2461221e7e68e92499",BASE_URL:""}).VUE_APP_TITLE,appShortTitle:Object({NODE_ENV:"production",VUE_APP_FBKEY:"AIzaSyBLyOTwd14zij08LAEIsq3ByrhDgarrBLU",VUE_APP_FBDOMAIN:"task-man-3c2c7.firebaseapp.com",VUE_APP_FBDBURL:"https://task-man-3c2c7.firebaseio.com",VUE_APP_FBPID:"task-man-3c2c7",VUE_APP_FBBUCKET:"task-man-3c2c7.appspot.com",VUE_APP_FBMSID:"690064923228",VUE_APP_APPID:"1:690064923228:web:0bbf2461221e7e68e92499",BASE_URL:""}).VUE_APP_SHORT_TITLE,networkOnLine:!0,SWRegistrationForNewContent:null,showAddToHomeScreenModalForApple:!1,refreshingApp:!1},mutations:{setNetworkOnline:(t,e)=>{t.networkOnLine=e},setSWRegistrationForNewContent:(t,e)=>{t.SWRegistrationForNewContent=e},setShowAddToHomeScreenModalForApple:(t,e)=>{t.showAddToHomeScreenModalForApple=e},setRefreshingApp:(t,e)=>{t.refreshingApp=e}},actions:{closeAddToHomeScreenModalForApple:async({commit:t})=>{localStorage.setItem("addToHomeIosPromptLastDate",Date.now()),t("setShowAddToHomeScreenModalForApple",!1)},serviceWorkerSkipWaiting({state:t,commit:e}){null!=t.SWRegistrationForNewContent&&(e("setRefreshingApp",!0),t.SWRegistrationForNewContent.waiting.postMessage("skipWaiting"))}},getter:{newContentAvailable:t=>!(null==t.SWRegistrationForNewContent)}},X=()=>S("users");const Y=async t=>{const e=t.providerData[0],{displayName:n,photoURL:a,email:o}=e,i=X(),r={displayName:n,photoURL:a,email:o};return i.create(r,t.uid)};var G={login:async({commit:t},e)=>{const n=await X().read(e.uid),a=null==n?await Y(e):n;t("setUser",a)},logout:({commit:t})=>{t("setUser",null)}},Q={namespaced:!0,state:{user:void 0},mutations:{setUser:(t,e)=>{t.user=e}},actions:G,getters:{isUserLoggedIn:t=>!(null==t.user)}},Z={namespaced:!0,state:{source:null,target:null,dragOn:!1},mutations:{dragStart:(t,e)=>{t.source=e,t.dragOn=!0},dragOver:(t,e)=>{t.target=e},dragEnd:t=>{t.dragOn=!1,t.source=null,t.target=null}}};a["a"].use(r["a"]);var tt=new r["a"].Store({strict:!1,modules:{app:K,authentication:Q,projects:L,notes:J,draggable:Z}}),et=function(){var t=this,e=t.$createElement,n=t._self._c||e;return t.project?n("div",[n("v-navigation-drawer",{attrs:{dark:"",color:"#424242",app:""},model:{value:t.drawerOn,callback:function(e){t.drawerOn=e},expression:"drawerOn"}},[n("v-sheet",{staticClass:"ttl",staticStyle:{color:"#fafafa","font-size":"30px",padding:"15px 16px 16px 24px"},attrs:{tile:"",color:"#212121"}},[t._v("\n      Task-Man\n    ")]),n("div",{staticClass:"menu-group"},[t.$vuetify.breakpoint.smAndDown?n("v-btn-toggle",{attrs:{color:"#fafafa"},model:{value:t.sortToggle,callback:function(e){t.sortToggle=e},expression:"sortToggle"}},[n("v-btn",{staticClass:"ttl",attrs:{height:"36"},on:{click:function(e){t.sortToggle=0}}},[t._v("Date")]),n("v-btn",{staticClass:"ttl",attrs:{height:"36"},on:{click:function(e){t.sortToggle=1}}},[t._v("Priority")])],1):t._e()],1),n("div",{staticClass:"menu-group"},[n("div",{staticClass:"ttl title"},[t._v("Projects Controls")]),n("v-btn",{staticClass:"ttl",attrs:{text:"",color:"#dcedc8"},on:{click:t.newProj}},[t._v("new project")]),n("v-btn",{staticClass:"ttl",attrs:{text:"",color:"#fafafa"},on:{click:function(e){return t.$router.push("/projects")}}},[t._v("Browser")])],1),n("div",{staticClass:"menu-group"},[n("div",{staticClass:"ttl title"},[t._v("Recent Projects")]),t._l(t.recents,(function(e,a){return n("div",{key:a,staticClass:"body"},[n("div",{staticClass:"ttl",staticStyle:{"margin-top":"8px"}},[t._v("\n          "+t._s(e.title)+"\n          "),n("v-btn",{attrs:{small:"",icon:"",color:"#eeeeee",to:"/project/"+e.id}},[n("v-icon",[t._v("edit")])],1)],1),n("div",[t._v("\n          "+t._s(t.showDate(e.updateTimestamp))+"\n        ")])])}))],2)],1),n("v-app-bar",{staticStyle:{padding:"4px 16px 8px"},attrs:{height:"76px",color:"#eeeeee",app:""}},[n("v-app-bar-nav-icon",{attrs:{color:"#212121"},on:{click:function(e){t.drawerOn=!t.drawerOn}}}),n("v-toolbar-title",{staticStyle:{"font-size":"24px",color:"#212121","padding-left":"8px"}},[t.editTitle?t._e():n("span",{staticClass:"ttl",on:{click:function(e){t.editTitle=!0}}},[t._v("\n        "+t._s(t.project.title)+"\n      ")]),t.editTitle?n("v-text-field",{staticClass:"ttl",staticStyle:{"font-size":"18px","margin-top":"12px"},attrs:{disabled:t.loading,autofocus:""},on:{blur:t.saveTitle,keydown:t.keyDownHandl},model:{value:t.newTitle,callback:function(e){t.newTitle=e},expression:"newTitle"}}):t._e()],1),n("v-spacer"),t.$vuetify.breakpoint.mdAndUp?n("span",{staticClass:"body label",attrs:{mdAndUp:"true"}},[t._v("Sort By")]):t._e(),t.$vuetify.breakpoint.mdAndUp?n("v-btn-toggle",{attrs:{color:"#212121"},model:{value:t.sortToggle,callback:function(e){t.sortToggle=e},expression:"sortToggle"}},[n("v-btn",{staticClass:"ttl",attrs:{height:"36",disabled:t.loading},on:{click:function(e){t.sortToggle=0}}},[t._v("Date")]),n("v-btn",{staticClass:"ttl",attrs:{height:"36",disabled:t.loading},on:{click:function(e){t.sortToggle=1}}},[t._v("Priority")])],1):t._e()],1),n("v-content",{staticStyle:{background:"#e0e0e0",overflow:"auto","min-height":"100%"},attrs:{app:""}},[n("v-container",{staticStyle:{padding:"16px 24px 24px"},attrs:{fluid:""}},[n("div",{staticClass:"lists",style:"width: "+360*t.project.lists.length+"px;"},t._l(t.lists,(function(e,a){return n("list",{key:a,attrs:{notes:e,sort:t.sortToggle,index:a}})})),1)])],1)],1):t._e()},nt=[],at=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"list-container"},[n("v-slide-x-transition",{attrs:{"hide-on-leave":""}},[t.editTitle?t._e():n("span",{staticClass:"ttl list-title",on:{click:function(e){t.editTitle=!0}}},[t._v("\n      "+t._s(t.listTitle||"No Title")+"\n    ")]),t.editTitle?n("v-textarea",{staticClass:"ttl",staticStyle:{"margin-left":"24px","font-size":"24px",width:"200px"},attrs:{autofocus:"","row-height":"36","auto-grow":"",rows:"1",flat:"",disabled:t.loading},on:{blur:t.saveTitle,keydown:t.keyDownHandl},model:{value:t.newTitle,callback:function(e){t.newTitle=e},expression:"newTitle"}}):t._e()],1),n("div",{staticClass:"note-list"},[t.dragSource&&t.dragSource.listIndex!==t.index?n("div",{staticClass:"drag-target",class:{targeted:t.dragTarget===t.index},on:{dragenter:function(e){return t.dragOver(t.index)},dragover:function(t){t.preventDefault()},dragleave:function(e){return t.dragOver(null)},drop:t.dropHandle}}):t._e(),n("v-btn",{staticStyle:{top:"-18px",right:"-2px"},attrs:{fab:"",absolute:"",color:"#fafafa",small:"",elevation:"3",width:"36",height:"36",disabled:t.loading},on:{click:function(e){return t.newNote()}}},[n("v-icon",{attrs:{color:"#616161"}},[t._v("add")])],1),t._l(t.groups,(function(e,a){return n("div",{key:a,staticClass:"group"},t._l(e,(function(e,a){return n("note",{key:a,attrs:{note:e},on:{"finish-note":function(n){return t.$emit("note-done",e)},"rewind-note":function(n){return t.$emit("note-rewind",e)},"new-update":function(e){return t.$emit("new-update")}}})})),1)}))],2)],1)},ot=[],it=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-scroll-x-transition",{attrs:{"hide-on-leave":""}},[t.edit?t._e():n("v-card",{staticClass:"body",class:{dragging:t.dragOn&&t.dragSource.id===t.note.id},staticStyle:{width:"320px","margin-right":"16px","margin-bottom":"4px",position:"relative"},attrs:{loading:t.loading,color:t.colors[t.note.color],elevation:t.hover||t.dragging?4:0,tile:"",draggable:"true"},on:{click:function(e){t.edit=!0},dragstart:t.downHandler,dragend:t.dragEnd,mouseenter:function(e){!t.dragOn&&(t.hover=!0)},mouseleave:function(e){!t.dragOn&&(t.hover=!1)}}},[t.soon?n("div",{class:"due-soon d"+t.daysLeft}):t._e(),n("div",{staticClass:"note",style:"padding-left: "+(t.soon?8:0)+"px;"},[null!==t.note.due?n("span",{staticClass:"due-days"},[t._v("Due in "+t._s(t.daysLeft)+" days")]):t._e(),n("span",{staticClass:"note-title ttl"},[t._v(t._s(t.note.title))]),n("span",{staticClass:"note-body"},[t._v(t._s(t.note.body))])]),n("div",{staticStyle:{clear:"both"}})]),t.edit?n("note-form",{attrs:{note:t.note},on:{"edit-done":function(e){t.edit=!1}}}):t._e()],1)},rt=[],st=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-container",{staticStyle:{width:"100%",padding:"0",margin:"8px 0 32px"}},[n("v-card",{staticClass:"body",staticStyle:{width:"320px",padding:"16px"},style:"background-color: "+t.background+"; transition: background .5s;",attrs:{tile:"",elevation:"2",loading:t.loading}},[n("v-form",{attrs:{disabled:t.loading},on:{submit:t.save}},[n("v-row",{staticStyle:{"margin-bottom":"-4px"},attrs:{"no-gutters":""}},[n("v-col",[n("v-textarea",{staticClass:"ttl",staticStyle:{"font-size":"18px"},attrs:{label:"Title","auto-grow":"",rows:"1"},model:{value:t.noteCopy.title,callback:function(e){t.$set(t.noteCopy,"title",e)},expression:"noteCopy.title"}})],1)],1),n("v-row",{staticStyle:{"margin-bottom":"-4px"},attrs:{"no-gutters":""}},[n("v-col",[n("v-textarea",{staticStyle:{"font-size":"18px"},attrs:{autofocus:"","auto-grow":"",label:"Body",rows:"1"},model:{value:t.noteCopy.body,callback:function(e){t.$set(t.noteCopy,"body",e)},expression:"noteCopy.body"}})],1)],1),n("v-row",{staticStyle:{"margin-bottom":"-24px"},attrs:{"no-gutters":""}},[n("v-col",[n("div",{staticClass:"label"},[t._v("Priority")]),n("div",{staticClass:"colors"},[n("span",{staticClass:"c0",class:{selected:0===t.noteCopy.color},on:{click:function(e){t.noteCopy.color=0}}}),n("span",{staticClass:"c1",class:{selected:1===t.noteCopy.color},on:{click:function(e){t.noteCopy.color=1}}}),n("span",{staticClass:"c2",class:{selected:2===t.noteCopy.color},on:{click:function(e){t.noteCopy.color=2}}}),n("span",{staticClass:"c3",class:{selected:3===t.noteCopy.color},on:{click:function(e){t.noteCopy.color=3}}}),n("span",{staticClass:"c4",class:{selected:4===t.noteCopy.color},on:{click:function(e){t.noteCopy.color=4}}})])]),n("v-col",[n("v-menu",{attrs:{"close-on-content-click":!1,transition:"scale-transition","offset-y":""},scopedSlots:t._u([{key:"activator",fn:function(e){var a=e.on;return[n("v-text-field",t._g({staticStyle:{width:"100%",color:"#424242"},attrs:{label:"Deadline",readonly:"",clearable:"","prepend-icon":"event"},model:{value:t.noteCopy.due,callback:function(e){t.$set(t.noteCopy,"due",e)},expression:"noteCopy.due"}},a))]}}]),model:{value:t.dateMenu,callback:function(e){t.dateMenu=e},expression:"dateMenu"}},[n("v-date-picker",{staticClass:"ttl",attrs:{"no-title":"",scrollable:""},on:{input:function(e){t.dateMenu=!1}},model:{value:t.noteCopy.due,callback:function(e){t.$set(t.noteCopy,"due",e)},expression:"noteCopy.due"}})],1)],1)],1),n("v-row",{staticStyle:{"padding-bottom":"12px"},attrs:{"no-gutters":""}},[n("v-col",{attrs:{cols:"auto"}},[n("v-btn",{staticClass:"ttl",attrs:{text:"",color:"#b71c1c",disabled:t.loading},on:{click:function(e){return t.delNote(t.note.id)}}},[n("v-icon",[t._v("delete")]),t._v("del\n          ")],1)],1),n("v-spacer"),n("v-col",{attrs:{cols:"auto"}},[t.noteCopy.listIndex>0?n("v-btn",{staticClass:"ttl",attrs:{text:"",color:"#424242",disabled:t.loading},on:{click:t.rewind}},[t._v("\n            re"),n("v-icon",[t._v("chevron_left")])],1):t._e(),n("v-btn",{staticClass:"ttl",attrs:{text:"",color:"#424242",disabled:t.loading},on:{click:t.finished}},[t._v("\n            Fin"),n("v-icon",[t._v("double_arrow")])],1)],1)],1),n("v-btn",{staticStyle:{left:"140px"},attrs:{fab:"",absolute:"",color:"#fafafa",small:"",disabled:t.loading},on:{click:t.save}},[n("v-icon",{attrs:{color:"#616161"}},[t._v("done")])],1)],1)],1)],1)},ct=[],lt={name:"NoteForm",props:["note"],data(){return{dateMenu:!1,colors:["#eeeeee","#b2ebf2","#dcedc8","#fff9c4","#ffe0b2"],noteCopy:Object.assign({},this.note)}},computed:{...Object(r["e"])("notes",["creationgPending","updatePending","deletionPending"]),loading(){return this.creationPending||this.deletionPending.length>0||this.updatePending.length>0},dueDate(){return this.noteCopy.due?this.noteCopy.due:"None"},background(){return this.colors[this.noteCopy.color]},isChange(){return Object.keys(this.note).some(t=>this.note[t]!==this.noteCopy[t])}},methods:{...Object(r["b"])("notes",{update:"update",delNote:"delete"}),async rewind(){this.noteCopy.listIndex>0&&(this.noteCopy.listIndex-=1,await this.update({...this.noteCopy})),this.$emit("edit-done")},async finished(){this.noteCopy.due=null,this.noteCopy.listIndex+=1,await this.update({...this.noteCopy}),this.$emit("edit-done")},async save(){this.isChange&&await this.update({...this.noteCopy}),this.$emit("edit-done")}}},dt=lt,ut=(n("22bc"),n("8336")),pt=n("b0af"),gt=n("62ad"),ht=n("a523"),mt=n("2e4b"),vt=n("4bd4"),ft=n("132d"),bt=n("e449"),yt=n("0fd9"),wt=n("2fa4"),Pt=n("8654"),_t=n("a844"),jt=Object(l["a"])(dt,st,ct,!1,null,"56b41fc2",null),Ct=jt.exports;u()(jt,{VBtn:ut["a"],VCard:pt["a"],VCol:gt["a"],VContainer:ht["a"],VDatePicker:mt["a"],VForm:vt["a"],VIcon:ft["a"],VMenu:bt["a"],VRow:yt["a"],VSpacer:wt["a"],VTextField:Pt["a"],VTextarea:_t["a"]});var xt={name:"Note",components:{NoteForm:Ct},props:["note"],data(){return{colors:["#eeeeee","#b2ebf2","#dcedc8","#fff9c4","#ffe0b2"],edit:!1,hover:!1}},computed:{...Object(r["e"])("draggable",{dragOn:"dragOn",dragSource:"source",dragTarget:"target"}),...Object(r["e"])("notes",["creationgPending","updatePending","deletionPending"]),loading(){return this.creationPending||this.deletionPending.length>0||this.updatePending.length>0},daysLeft(){if(null===this.note.due)return 999;const t=new Date,e=new Date(this.note.due),n=Math.ceil((e.getTime()-t.getTime())/864e5);return n>0?n:0},soon(){return this.daysLeft<6},dragging(){return this.dragOn&&this.dragSource.id===this.note.id}},beforeDestroy(){document.removeEventListener("dragend",this.endHandler)},methods:{...Object(r["d"])("draggable",["dragStart","dragEnd"]),...Object(r["b"])("notes",{updateNote:"update"}),downHandler(t){if(!this.dragOn){t.dataTransfer.setData("text/plain",null);const{id:e,listIndex:n}=this.note;this.dragStart({id:e,listIndex:n}),document.addEventListener("dragend",this.endHandler)}},endHandler(){document.removeEventListener("dragend",this.endHandler),this.dragEnd()}}},Tt=xt,kt=(n("613b"),n("0789")),St=Object(l["a"])(Tt,it,rt,!1,null,"ff031a60",null),Ot=St.exports;u()(St,{VCard:pt["a"],VScrollXTransition:kt["b"]});var Vt=(t=0)=>({listIndex:t,title:"New Task",body:"",color:0,due:null});const At=(t,e)=>{const n=null!==t.due?new Date(t.due):1/0,a=null!==e.due?new Date(e.due):1/0;return n-a};var Dt={name:"List",props:["notes","index","sort"],data(){return{editTitle:!1,newTitle:"",tempNote:null}},components:{Note:Ot},computed:{...Object(r["e"])("projects",{project:"current"}),...Object(r["e"])("projects",["creationgPending","updatePending","deletionPending"]),...Object(r["e"])("draggable",{dragSource:"source",dragTarget:"target"}),...Object(r["c"])("notes",{getNote:"getById"}),loading(){return this.creationPending||this.deletionPending.length>0||this.updatePending.length>0},listTitle(){return this.project.lists[this.index]},displayNotes(){return this.tempNote?[...this.notes,this.tempNote]:this.notes},groups(){const t=[...this.displayNotes].sort(At);let e=[];if(0===this.sort&&(e=[t]),1===this.sort){const n=[];[4,3,2,1,0].forEach(e=>{const a=t.filter(t=>t.color===e);a.length>0&&n.push(a)}),e=n}return e}},watch:{listTitle:{handler(t){this.newTitle=t},immediate:!0},dragTarget(t){null!==t&&t===this.index?this.tempNote=this.getNote(this.dragSource.id):this.tempNote=null}},methods:{...Object(r["b"])("projects",{updateProject:"update"}),...Object(r["b"])("notes",{createNote:"create",updateNote:"update"}),...Object(r["d"])("draggable",["dragOver","dragEnd"]),keyDownHandl(t){13===t.keyCode&&this.saveTitle()},async dropHandle(t){t.preventDefault();const e=this.getNote(this.dragSource.id),n={...e};n.listIndex=this.index,await this.updateNote(n),this.dragEnd()},saveTitle(){if(this.newTitle&&this.newTitle!==this.listTitle){const t={...this.project},e={...t.lists};e[this.index]=this.newTitle,t.lists=e,this.updateProject(t)}this.editTitle=!1},newNote(){const t=Vt(this.index);this.createNote(t)},deleteNote(t){this.list.delNote(t),this.$emit("note-del")}}},Et=Dt,Nt=(n("7eba"),Object(l["a"])(Et,at,ot,!1,null,"08ab9196",null)),Bt=Nt.exports;u()(Nt,{VBtn:ut["a"],VIcon:ft["a"],VSlideXTransition:kt["c"],VTextarea:_t["a"]});var Ut=()=>({title:"New Project",lists:{}}),$t={name:"Project",components:{List:Bt},data(){return{drawerOn:null,recents:[],sortToggle:0,editTitle:!1,newTitle:"",lastUpate:0}},computed:{...Object(r["e"])("projects",{project:"current",projects:"items"}),...Object(r["e"])("projects",["creationgPending","updatePending","deletionPending"]),...Object(r["e"])("notes",{notes:"items"}),loading(){return this.creationPending||this.deletionPending.length>0||this.updatePending.length>0},lists(){if(!this.notes||0===this.notes.length)return[[]];const t=Math.max(...this.notes.map(t=>t.listIndex)),e=new Array(t);for(let n=0;n<=t;n+=1)e[n]=[];return this.notes.forEach(t=>{e[t.listIndex].push(t)}),e}},watch:{sortToggle(t){if(0===t||1===t){const e={...this.project};e.sortPref=t,this.updateProject(e)}},$route:{async handler(t){const e=t.params.pid;e&&(this.project&&e===this.project.id||await this.readProject(e),this.newTitle=this.project.title,this.project.sortPref&&(this.sortToggle=this.project.sortPref))},immediate:!0},project:{handler(){this.loadNotes()},immediate:!0},projects:{handler(t){t&&(this.recents=t.length>3?t.slice(0,3):t)},immediate:!0},notes(t,e){const n=new Date;e&&n-this.lastUpate>6e4&&(this.lastUpate=n,this.updateProject({...this.project}))}},methods:{...Object(r["b"])("projects",{createProject:"create",readProject:"read",updateProject:"update"}),...Object(r["b"])("notes",{loadNotes:"getAll"}),async newProj(){await this.createProject(Ut());const t="/project/"+this.project.id;this.$router.push({path:t})},keyDownHandl(t){13===t.keyCode&&this.saveTitle()},saveTitle(){if(this.newTitle!==this.project.title){const t={...this.project};t.title=this.newTitle,this.updateProject(t)}this.editTitle=!1},showDate(t){const e=new Date(t),n="Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec".split(" ");return`${n[e.getMonth()]} ${e.getDate()}`}}},It=$t,Lt=(n("0d29"),n("40dc")),Mt=n("5bc1"),Ft=n("a609"),Rt=n("a75b"),Ht=n("f774"),zt=n("8dd9"),qt=n("2a7f"),Wt=Object(l["a"])(It,et,nt,!1,null,"5d54ecbc",null),Jt=Wt.exports;u()(Wt,{VAppBar:Lt["a"],VAppBarNavIcon:Mt["a"],VBtn:ut["a"],VBtnToggle:Ft["a"],VContainer:ht["a"],VContent:Rt["a"],VIcon:ft["a"],VNavigationDrawer:Ht["a"],VSheet:zt["a"],VSpacer:wt["a"],VTextField:Pt["a"],VToolbarTitle:qt["a"]});var Kt=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("v-content",[n("div",{staticClass:"recents"},[n("section",[n("div",{staticClass:"section-title ttl"},[t._v("Account")]),n("v-hover",{scopedSlots:t._u([{key:"default",fn:function(e){var a=e.hover;return[n("v-card",{staticClass:"sheet",attrs:{color:"rgba(0,0,0,0)",elevation:a?3:0,tile:""}},[n("p",{staticStyle:{"text-align":"center"}},[n("v-avatar",{staticStyle:{margin:"8px auto"},attrs:{size:"72"}},[n("img",{attrs:{src:t.user.photoURL}})])],1),n("footer",{staticClass:"body",class:{active:a},staticStyle:{"background-color":"#fafafa"}},[t._v("\n              "+t._s(t.user.displayName)+"\n              "),a?n("v-btn",{staticClass:"ttl",attrs:{color:"#c62828",text:""},on:{click:t.logout}},[t._v("\n                logout\n              ")]):t._e()],1)])]}}])}),n("div",{staticStyle:{clear:"both"}})],1)]),n("div",[n("section",[n("div",{staticClass:"section-title ttl"},[t._v("All Projects")]),n("v-hover",{scopedSlots:t._u([{key:"default",fn:function(e){var a=e.hover;return[n("v-sheet",{staticClass:"sheet",attrs:{color:a?"#fafafa":"#e0e0e0",elevation:a?3:0,tile:""},on:{click:t.newProject}},[n("p",{staticStyle:{"text-align":"center"}},[n("v-icon",{staticStyle:{"font-size":"72px",margin:"8px auto"},attrs:{color:"#212121"}},[t._v("\n                add\n              ")])],1),n("footer",{staticClass:"body",staticStyle:{"background-color":"#dcedc8"}},[t._v("\n              New Project\n            ")])])]}}])}),t._l(t.projects,(function(e){return n("v-hover",{key:e.id,scopedSlots:t._u([{key:"default",fn:function(a){var o=a.hover;return[n("v-sheet",{staticClass:"sheet",attrs:{color:o?"#fafafa":"#eeeeee",elevation:o?3:0,tile:""}},[n("footer",{staticClass:"body",class:{active:o},style:"background-color: "+t.time2color(e.updateTimestamp)},[t._v("\n              "+t._s(t.showDate(e.updateTimestamp))+"\n              "),o?n("v-btn",{staticClass:"ttl",attrs:{color:"#212121",text:""},on:{click:function(n){return t.readProject(e.id)}}},[t._v("open")]):t._e(),o?n("v-btn",{staticClass:"ttl",attrs:{color:"#c62828",text:""},on:{click:function(n){t.deleteConfirms[e.id]=!0}}},[t._v("delete")]):t._e()],1),n("div",{staticClass:"ttl title"},[t._v(t._s(e.title))]),n("v-dialog",{attrs:{"max-width":"480"},model:{value:t.deleteConfirms[e.id],callback:function(n){t.$set(t.deleteConfirms,e.id,n)},expression:"deleteConfirms[proj.id]"}},[n("v-card",[n("v-card-title",{staticClass:"red lighten-3",attrs:{"primary-title":""}},[t._v("\n                  Press to confirm\n                ")]),n("v-card-text",{staticClass:"mt-2"},[t._v("\n                  "+t._s(e.title)+" will be erased permanently.\n                ")]),n("v-card-actions",[n("v-btn",{attrs:{text:"",color:"red darken-2"},on:{click:function(n){return t.deleteProject(e.id)}}},[t._v("\n                    confirm\n                  ")])],1)],1)],1)],1)]}}],null,!0)})})),n("div",{staticStyle:{clear:"both"}})],2)])])],1)},Xt=[],Yt={name:"Browser",data(){return{recents:[],deleteConfirms:{}}},computed:{...Object(r["e"])("projects",{projects:"items",current:"current"}),...Object(r["e"])("authentication",["user"])},watch:{current(t){t&&this.$router.push("/project/"+t.id)}},methods:{...Object(r["b"])("projects",{createProject:"create",readProject:"read",readAll:"getAll",deleteProject:"delete"}),async newProject(){const t=Ut();this.createProject(t)},dueTasks(t){const e=[];return t.lists.forEach(t=>{t.notes.forEach(t=>{const n=t.due?new Date(t.due):null;n&&n-Date.now()<432e6&&e.push({title:t.title,due:t.due})})}),e},showDate(t){const e=new Date(t),n="Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec".split(" ");return`${n[e.getMonth()]} ${e.getDate()}`},time2color(t){const e=["#ffe0b2","#fff9c4","#dcedc8","#b2ebf2","#eeeeee"],n=new Date(t),a=Date.now(),o=Math.floor((a-n)/2592e5);return o<4?e[o]:e[4]},async logout(){await C.a.auth().signOut(),this.$router.push("/")}},mounted(){document.title="Taskman",this.projects||this.readAll()}},Gt=Yt,Qt=(n("d21d"),n("8212")),Zt=n("99d9"),te=n("169a"),ee=n("ce87"),ne=Object(l["a"])(Gt,Kt,Xt,!1,null,"2ce3e3a1",null),ae=ne.exports;u()(ne,{VAvatar:Qt["a"],VBtn:ut["a"],VCard:pt["a"],VCardActions:Zt["a"],VCardText:Zt["b"],VCardTitle:Zt["c"],VContent:Rt["a"],VDialog:te["a"],VHover:ee["a"],VIcon:ft["a"],VSheet:zt["a"]});var oe=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-content",[n("v-container",{attrs:{"fill-height":""}},[n("v-row",{attrs:{"align-content":"center",justify:"center"}},[n("v-col",[t._v("\n        Home page placeholder.\n      ")])],1),n("v-row",[n("v-col",[n("v-btn",{attrs:{to:"/login"}},[t._v("Signup")])],1)],1)],1)],1)},ie=[],re={name:"Home",computed:{...Object(r["e"])("authentication",["user"])},watch:{user:{handler(t){t&&this.$router.push({path:"/projects"})},immediate:!0}}},se=re,ce=Object(l["a"])(se,oe,ie,!1,null,null,null),le=ce.exports;u()(ce,{VBtn:ut["a"],VCol:gt["a"],VContainer:ht["a"],VContent:Rt["a"],VRow:yt["a"]});var de=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("h1",{staticClass:"loading-title"},[t._v("\n  Loading...\n")])},ue=[],pe={computed:Object(r["e"])("authentication",["user"]),watch:{user:{handler(t){if(void 0===t)return;this.$route.query.redirectUrl===this.$route.path&&this.$router.push("/");const e=null==t?"/login?redirectUrl="+this.$route.query.redirectUrl:this.$route.query.redirectUrl;this.$router.push(e)},immediate:!0}}},ge=pe,he=(n("795f"),Object(l["a"])(ge,de,ue,!1,null,"2edea673",null)),me=he.exports,ve=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-container",{attrs:{"fill-height":""}},[n("v-row",{staticStyle:{height:"100%"},attrs:{"align-content":"center",justify:"center"}},[n("v-col",{staticClass:"text-center",attrs:{cols:"12"}},[n("v-card",{staticStyle:{margin:"0 auto"},attrs:{"max-width":"480"}},[n("v-toolbar",{attrs:{color:"primary",dark:"",flat:""}},[n("v-toolbar-title",[t._v("\n            Please Sign In\n          ")])],1),n("v-card-text",{staticClass:"py-4 pb-8"},[n("v-alert",{directives:[{name:"show",rawName:"v-show",value:void 0===t.user,expression:"user === undefined"}],attrs:{color:"info"}},[t._v("\n            Authenticating...\n          ")]),n("v-alert",{directives:[{name:"show",rawName:"v-show",value:!t.networkOnLine,expression:"!networkOnLine"}],attrs:{"data-test":"offline-instruction",color:"error"}},[t._v("\n            Please check your connection, login feature is not available\n            offline.\n          ")]),n("v-alert",{directives:[{name:"show",rawName:"v-show",value:t.loginError,expression:"loginError"}],attrs:{color:"error"}},[t._v(t._s(t.loginError))]),n("v-btn",{attrs:{light:"",disabled:void 0===t.user||!!t.user||!t.networkOnLine,"data-test":"login-btn",large:""},on:{click:t.login}},[n("v-icon",[t._v("mdi-google")]),n("span",{staticClass:"px-2"},[t._v("Sign in with google")])],1),n("v-spacer")],1)],1)],1)],1)],1)},fe=[],be={data:()=>({loginError:null}),head(){return{title:{inner:"Login"},meta:[{name:"description",content:"Sign in or sign up to "+this.appTitle,id:"desc"}]}},computed:{...Object(r["e"])("authentication",["user"]),...Object(r["e"])("app",["networkOnLine","appTitle"])},watch:{user:{handler(t){if(null!=t){const t=null==this.$route.query.redirectUrl?"/projects":this.$route.query.redirectUrl;this.$router.push(t)}},immediate:!0}},methods:{...Object(r["d"])("authentication",["setUser"]),async login(){this.loginError=null;const t=new C.a.auth.GoogleAuthProvider;this.setUser(void 0);try{this.$vuetify.mobile?await C.a.auth().signInWithRedirect(t):await C.a.auth().signInWithPopup(t)}catch(e){this.loginError=e,this.setUser(null)}}}},ye=be,we=n("0798"),Pe=n("71d9"),_e=Object(l["a"])(ye,ve,fe,!1,null,null,null),je=_e.exports;u()(_e,{VAlert:we["a"],VBtn:ut["a"],VCard:pt["a"],VCardText:Zt["b"],VCol:gt["a"],VContainer:ht["a"],VIcon:ft["a"],VRow:yt["a"],VSpacer:wt["a"],VToolbar:Pe["a"],VToolbarTitle:qt["a"]}),a["a"].use(f["a"]);const Ce=new f["a"]({mode:"history",base:"",routes:[{path:"/",name:"home",component:le,meta:{authNotRequired:!0},beforeEnter:(t,e,n)=>{null!==tt.state.authentication.user?n("/projects"):n()}},{path:"/check-login",name:"check-login",component:me,meta:{authNotRequired:!0}},{path:"/login",component:je,meta:{authNotRequired:!0}},{path:"/projects",component:ae},{path:"/project/:pid",name:"project",component:Jt}]});Ce.beforeEach((t,e,n)=>{if(t.meta&&t.meta.authNotRequired||null!=tt.state.authentication.user)n();else{const e=null===tt.state.authentication.user?"/login":"/check-login";n(`${e}?redirectUrl=${t.path}`)}});var xe=Ce,Te=n("f309");a["a"].use(Te["a"]);var ke=new Te["a"]({theme:{themes:{light:{primary:"#212121",secondary:"#424242",accent:"#616161",error:"#c62828",info:"#dcedc8",success:"#b2ebf2",warning:"#b71c1c"}}},icons:{iconfont:"md"}});n("ea7b");const Se={apiKey:"AIzaSyBLyOTwd14zij08LAEIsq3ByrhDgarrBLU",authDomain:"task-man-3c2c7.firebaseapp.com",databaseURL:"https://task-man-3c2c7.firebaseio.com",projectId:"task-man-3c2c7",storageBucket:"task-man-3c2c7.appspot.com",messagingSenderId:"690064923228",appId:"1:690064923228:web:0bbf2461221e7e68e92499"};C.a.initializeApp(Se),C.a.auth().onAuthStateChanged(t=>{const e=null==t?"logout":"login";tt.dispatch("authentication/"+e,t)}),a["a"].config.productionTip=!1,new a["a"]({router:xe,store:tt,vuetify:ke,render:t=>t(v),created(){if(sessionStorage.redirect){const{redirect:t}=sessionStorage;delete sessionStorage.redirect,this.$router.push(t)}}}).$mount("#app")},"5c0b":function(t,e,n){"use strict";var a=n("13e3"),o=n.n(a);o.a},"613b":function(t,e,n){"use strict";var a=n("abcf"),o=n.n(a);o.a},"795f":function(t,e,n){"use strict";var a=n("3704"),o=n.n(a);o.a},"7eba":function(t,e,n){"use strict";var a=n("8421"),o=n.n(a);o.a},8421:function(t,e,n){},"8f9e":function(t,e,n){},ab05:function(t,e,n){},abcf:function(t,e,n){},d21d:function(t,e,n){"use strict";var a=n("ab05"),o=n.n(a);o.a},e3e8:function(t,e,n){}});
//# sourceMappingURL=app.87c98282.js.map