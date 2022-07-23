const $=function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))o(i);new MutationObserver(i=>{for(const r of i)if(r.type==="childList")for(const n of r.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&o(n)}).observe(document,{childList:!0,subtree:!0});function s(i){const r={};return i.integrity&&(r.integrity=i.integrity),i.referrerpolicy&&(r.referrerPolicy=i.referrerpolicy),i.crossorigin==="use-credentials"?r.credentials="include":i.crossorigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function o(i){if(i.ep)return;i.ep=!0;const r=s(i);fetch(i.href,r)}};$();class v{constructor(e){this._children=[],this._attributes=new Map,this._tag=e}setAttribute(e,s){this._attributes.set(e,s)}append(e){this._children.push(e)}get tagName(){return this._tag}get attributes(){return this._attributes}get children(){return this._children}}const x=(t,e,...s)=>{const o=new v(t);if(e!==null){for(const i in e)if(e.hasOwnProperty(i)){const r=e[i];o.setAttribute(i,String(r))}}for(const i of s)o.append(i);return o},k=(t,...e)=>x("g",t,...e),S=(t,...e)=>x("text",t,...e),I=t=>x("polygon",t),O=(t,e)=>{const o=Math.sqrt(3)*25,i=2*25,r=(t.x+t.y%2/2)*o,n=t.y*i*.75,c=[];for(let a=0;a<6;a++){const l=(a*60-30)*Math.PI/180;c.push([r+25*Math.cos(l),n+25*Math.sin(l)])}return k({},I({points:c.map(a=>a.join(",")).join(" "),fill:`rgb(${t.x*t.y}, ${t.x*t.y}, ${t.x*t.y})`}),S({x:r,y:n,fill:"white","text-anchor":"middle","dominant-baseline":"middle",transform:`rotate(${-e.rotation*(180/Math.PI)})`,"transform-origin":`${r} ${n}`},`${t.x}, ${t.y}`))};class N{constructor(e,s){this.shape=o=>O(this,o),this.x=e,this.y=s}}const E=(t,e)=>{e.tagName,t.tagName;for(const[s,o]of e.attributes)t.getAttribute(s)!==o&&t.setAttribute(s,o);for(let s=0;s<e.children.length;s++){let o=t.children.item(s);const i=e.children[s];if(o===null)i instanceof v?(o=document.createElementNS("http://www.w3.org/2000/svg",i.tagName),t.appendChild(o)):t.textContent.length===0&&t.append(i);else if(typeof i=="string")throw new Error("Sad noises...");o&&typeof o!="string"&&typeof i!="string"&&E(o,i)}};class j{constructor(e,s){this._camera=e,this._updater=s,this._root=document.createElementNS("http://www.w3.org/2000/svg","g")}update(){const e=this._updater(this._camera);E(this._root,e)}get reference(){return this._root}}class z{constructor(e,s){this._renderables=new WeakMap,this._camera=s,e.style.perspective="1024px",this._root=document.createElementNS("http://www.w3.org/2000/svg","svg"),this._root.style.transformStyle="preserve-3d",this._root.setAttribute("xmlns","http://www.w3.org/2000/svg"),this._root.setAttribute("version","1.1"),this._root.setAttribute("width","100%"),this._root.setAttribute("height","100%"),this._root.setAttribute("transform",""),e.append(this._root),this._canvas=document.createElementNS("http://www.w3.org/2000/svg","g"),this._viewport=document.createElementNS("http://www.w3.org/2000/svg","g"),this._root.append(this._canvas),this._canvas.append(this._viewport)}render(e){if(!this._renderables.has(e)){const y=new j(this._camera,e.shape);this._renderables.set(e,y),this._viewport.append(y.reference)}const{x:s,y:o,z:i,a:r}=this._camera.perspective,{x:n,y:c}=this._camera.position,{tx:a,ty:l}=this._camera.projection,_=this._camera.zoom;this._root.style.transform=`rotate3d(-1, ${o}, 0, ${r}rad)`,this._canvas.setAttribute("transform",`translate(${a} ${l})`),this._viewport.setAttribute("transform-origin",`${n} ${c}`),this._viewport.setAttribute("transform",`scale(${_} ${_}) rotate(${this._camera.rotation*(180/Math.PI)})`),this._renderables.get(e).update()}}const P={},d=(t=0,e=0)=>({x:t,y:e}),L=(t,e,s=d())=>(s.x=t.x+e.x,s.y=t.y+e.y,s),f=(t,e,s=d())=>(s.x=t.x-e.x,s.y=t.y-e.y,s),Y=(t,e,s=d())=>(s.x=t.x*e.x,s.y=t.y*e.y,s),h=(t,e,s=d())=>(s.x=t.x*e,s.y=t.y*e,s),q={get:P,create:d,add:L,subtract:f,multiply:Y,scale:h},w=(t,[e,s])=>t<=e?e:t>=s?s:t;class C{constructor(e,s){this._state={isActive:!1,origin:{x:0,y:0},current:{x:0,y:0},keys:new Set},this._mousedown=o=>{this._state.isActive=!0,this._state.current=this._camera.position,this._state.origin=m({x:o.clientX,y:o.clientY},this._camera)},this._mouseup=o=>{this._state.isActive=!1},this._mousemove=o=>{if(this._state.isActive){const i=m({x:o.clientX,y:o.clientY},this._camera);if(this._state.keys.size===0){const r=1/this._camera.zoom,{x:n,y:c}=L(h(this._state.current,-1),h(f(i,this._state.origin),r));this._camera.set({x:n,y:c})}else if(this._state.keys.has("ShiftLeft")){const n=.01*i.x%(Math.PI*2);this._camera.rotate(n)}else if(this._state.keys.has("ControlLeft")){const n={x:o.movementX,y:o.movementY},{x:c,y:a}=h(n,.0025);this._camera.perspective.y=w(this._camera.perspective.y+c,[-.15,.15]),this._camera.perspective.a=w(this._camera.perspective.a+a,[-Math.PI/3,0])}}},this._wheel=o=>{if(this._state.keys.size===0){const r=this._camera.zoom-o.deltaY*.001,n=m({x:o.clientX,y:o.clientY},this._camera),{x:c,y:a}=f(h(this._camera.position,-1),h(n,(1-this._camera.zoom/r)*(1/r)*.75));this._camera.set({x:c,y:a,z:r})}else if(this._state.keys.has("ShiftLeft")){const r=this._camera.rotation+.01*o.deltaY;this._camera.rotate(r)}},this._keydown=o=>{this._state.keys.add(o.code)},this._keyup=o=>{this._state.keys.delete(o.code)},this._element=e,this._camera=s,this._element.addEventListener("mousedown",this._mousedown),this._element.addEventListener("mouseup",this._mouseup),this._element.addEventListener("mousemove",this._mousemove),this._element.addEventListener("wheel",this._wheel),window.addEventListener("keydown",this._keydown),window.addEventListener("keyup",this._keyup),this._state.current=this._camera.position}destroy(){this._element.removeEventListener("mousedown",this._mousedown),this._element.removeEventListener("mouseup",this._mouseup),this._element.removeEventListener("mousemove",this._mousemove),this._element.removeEventListener("wheel",this._wheel),window.removeEventListener("keydown",this._keydown),window.removeEventListener("keyup",this._keyup)}update(){}}const m=(t,e)=>f(t,h(e.dimensions,.5)),X={scale(t){const e=Math.sqrt(t.a**2+t.c**2),s=Math.sqrt(t.b**2+t.d**2);return{x:e,y:s}},translation(t){return{x:t.tx,y:t.ty}},rotation(t){return(Math.PI*1.5+Math.atan2(t.d,t.c))%(Math.PI*2)}},p=(t=0,e=0,s=0,o=0,i=0,r=0)=>({a:t,b:e,c:s,d:o,tx:i,ty:r}),R=()=>p(1,0,0,1,0,0),U=(t,e,s=p())=>(s.a=t.a*e,s.b=t.b*e,s.c=t.c*e,s.d=t.d*e,s.tx=t.tx,s.ty=t.ty,s),V=(t,e,s=p())=>(s.a=t.a,s.b=t.b,s.c=t.c,s.d=t.d,s.tx=t.a*e.x+t.c*e.y+t.tx,s.ty=t.b*e.x+t.d*e.y+t.ty,s),Z=(t,e,s=p())=>(s.a=t.a*Math.cos(e)+t.c*Math.sin(e),s.b=t.b*Math.cos(e)+t.d*Math.sin(e),s.c=t.a*-Math.sin(e)+t.c*Math.cos(e),s.d=t.b*-Math.sin(e)+t.d*Math.cos(e),s.tx=t.tx,s.ty=t.ty,s),u={get:X,create:p,identity:R,translate:V,scale:U,rotate:Z},g=class{constructor(t){this.projection=u.identity(),this.perspective={x:0,y:0,a:0},this._element=t}set({x:t=0,y:e=0,z:s=1}){const{get:o,scale:i,translate:r}=u,{x:n,y:c}=this.dimensions,{x:a,y:l}=o.translation(this.projection),_=t+n/2-a,b=e+c/2-l;this.projection=r(this.projection,{x:_,y:b});const y=w(s/this.zoom,[g.ZOOM_MINIMUM,g.ZOOM_MAXIMUM]);this.projection=i(this.projection,y)}rotate(t){const{rotate:e}=u,s=t-this.rotation;this.projection=e(this.projection,s)}get position(){const{subtract:t,scale:e}=q,{tx:s,ty:o}=this.projection;return t(e(this.dimensions,.5),{x:s,y:o})}get dimensions(){const{offsetWidth:t,offsetHeight:e}=this._element;return{x:t,y:e}}get zoom(){const{get:t}=u,{x:e,y:s}=t.scale(this.projection);return(e+s)/2}get rotation(){const{get:t}=u;return t.rotation(this.projection)}};let M=g;M.ZOOM_MAXIMUM=1.75;M.ZOOM_MINIMUM=.25;function D(t){console.log("Your version is:",{BASE_URL:"/honeycomb/",MODE:"production",DEV:!1,PROD:!0}.VITE_VERSION);const e=document.querySelector("#application");if(e){const s=new M(e),o=new C(e,s),i=new z(e,s),r=[];for(let c=0;c<25;c++)for(let a=0;a<25;a++)r.push(new N(a,c));const n=()=>{for(let c=0;c<25;c++)for(let a=0;a<25;a++)i.render(r[c*a]);o.update(),requestAnimationFrame(n)};n(),s.set({x:0,y:0})}}D();