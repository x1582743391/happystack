(()=>{"use strict";var t,e={7612:(t,e,n)=>{t.exports=n.p+"assets/canon.mp3"},8198:(t,e,n)=>{t.exports=n.p+"assets/down.mp3"},9580:(t,e,n)=>{t.exports=n.p+"assets/great.mp3"},7939:(t,e,n)=>{var o=n(6194);n(9601);class i{constructor(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0,e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0,n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:0;this.x=t,this.y=e,this.z=n}}class r{constructor(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0,e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0,n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:0,o=arguments.length>3&&void 0!==arguments[3]?arguments[3]:"x";this.x=t,this.y=e,this.z=n,this.color="#ffffff",this.dir=o}}var s,a,p,l,d,c,u,v,h=n(2212),y=(n(1539),n(9714),s=parseInt("f12711",16),a=parseInt("f5af19",16),p=parseInt((a-s)/1e4+""),l=0,function(){return"#"+Number(l++%1e4*p+s).toString(16)});function f(t){var e=arguments.length>1&&void 0!==arguments[1]&&arguments[1],n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:.3,o=arguments.length>3?arguments[3]:void 0,i=Math.random()+"",r=document.createElement("audio");r.id=i,r.src=t,r.loop=e,r.volume=n,r.preload="auto",r.autoplay=!0,r.addEventListener("ended",(function(){"function"==typeof o&&o.call(this)})),document.body.appendChild(r),r.play()}var w=new h.Pa4(0,4,0),g=0,b=document.querySelector("#webgl-output"),m=document.querySelector("#mask"),x=document.querySelector("#score"),O=document.querySelector(".btn"),j=document.querySelector("#gg"),S=0;b.addEventListener("mousedown",(t=>{1==(t=t||window.event).buttons&&d.stop()}),!1),m.addEventListener("mousedown",(t=>{if(1==(t=t||window.event).buttons&&0==g++){f(n(7612),!0,.8);var e=new i(0,0,0),o=new r(3,1,3,"z");M(e,o),m.style.display="none"}}),!1),O.addEventListener("mousedown",(t=>{1==(t=t||window.event).buttons&&(j.style.display="none",location.reload())}),!1);var C,z,M=(C=!1,z=[],function(t,e){e.color=y(),0==z.length&&z.push(E(t,e)),t.y=z[z.length-1].position.y+e.y;var r=0;C?(t.x=10,e.dir="x",r=-10):(t.z=-10,r=10,e.dir="z");var s=E(t,e),a=Math.abs(t[e.dir]-r)/.0064;!function(t,e,n,i){var r=arguments.length>4&&void 0!==arguments[4]?arguments[4]:0,s=arguments.length>5&&void 0!==arguments[5]?arguments[5]:4500;d=new o.kX(t).to({[n]:r},s),i=i||function(){},d.onComplete((()=>{F()})).onUpdate((()=>{e.position[n]=t[n]})).onStop((()=>{i()})),d.start()}(t,s,e.dir,(()=>{var r=function(t,e,o){var r=e.dir,s=o[o.length-2].position,a=e[r]/2,p=t[r]-s[r];if(p<0&&(a=-a),Math.abs(p)<.15){f(n(9580),!1,1,(function(){document.body.removeChild(this)}));var l=o[o.length-1];return l.position[e.dir]=s[e.dir],[new i(l.position.x,l.position.y,l.position.z),e]}if(c.remove(o.pop()),Math.abs(p)>=e[r])return!1;f(n(8198),!1,1,(function(){document.body.removeChild(this)}));var d=Object.assign({},t),u=t[r]+s[r];d[r]=u/2;var v=Object.assign({},e);v[r]=e[r]-Math.abs(p);var h=E(d,v);o.push(h);var y=Object.assign({},t);y[r]=u/2+a;var w=Object.assign({},e);w[r]=Math.abs(p);var g=E(y,w),b=Object.assign({},t);return b[r]=u/2-a,b.y-=e.y,I(w,g,p,b),[d,v]}(t,e,z);if(0!=r){if(M.apply(null,r),z[z.length-1].position.y-w.y>0){var s={y:0},p=u.position.y,l=w.y,d=v.position.y;new o.kX(s).to({y:e.y},a/4).onUpdate((()=>{u.position.y=p+s.y,w.y=l+s.y,v.position.y=d+s.y,u.lookAt(w)})).start()}S++,x.textContent=S+"分"}else F()}),r,a),z.push(s),C=!C});function k(t,e){var n=new h.DvJ(e.x,e.y,e.z),o=new h.YBo({color:e.color||"000000"}),i=new h.Kj0(n,o);return i.position.set(t.x,t.y,t.z),i.castShadow=!0,i}function E(t,e){var n=k(t,e);return c.add(n),n}var P,q,A,I=(P=[[],[]],q=[[],[]],A=(t,e,n,r)=>{var s=n>0?0:1,a=("x"==t.dir?P:q)[s],p=t.dir;r=null!=r?r:a.length-1;var l=a[r],d={y:e.position.y},u=l?l.position.y+t.y:0,v=Math.abs(d.y-u)/.0054,y=new o.kX(d).to({y:u},v);y.onComplete((()=>{if(0!=a.length){if(l){var o=function(t){var e=new h.Pa4;return(new h.ZzF).setFromObject(t).getSize(e),e}(l),s=e.position[p],d=l.position[p];if(n<0&&(s*=-1,d*=-1),s+t[p]/2<=d+o[p]/2)a[r+1]&&a.splice(r+1,1),a.splice(r+1,0,e);else if(Math.abs(e.position[p]-l.position[p])==t[p]+o[p])A(t,e,n,r-1);else{c.remove(e);var u=Object.assign({},t);u[p]=o[p];var v=new i(e.position.x,l.position.y+t.y,e.position.z);v[p]=l.position[p];var y=E(v,u);a[r+1]&&a.splice(r+1,1),a.splice(r+1,0,y);var f=n>0?1:-1,w=l.position[p],g=e.position[p],b=o[p],m=t[p],x=f*(g-w)+(m-b)/2,O=(w+g)/2+f*(b+m)/4,j=Object.assign({},t);j[p]=x;var S=new i(e.position.x,e.position.y,e.position.z);S[p]=O;var C=E(S,j);A(j,C,n,r-1)}}}else a.push(e)})).onUpdate((()=>{e.position.y=d.y})),y.start()},function(t,e,n,o){var i=Object.assign({},t);i.color="yellow";var r=k(o,i);((t,e,n)=>{("x"==t?P:q)[e>0?1:0].push(n)})(t.dir,n,r),A(t,e,n)});function F(){document.querySelector("#ggtext").textContent="最后得分："+S,j.style.display="flex"}window.focus();var L=new h.xsS,B=new h.cPb(10,window.innerWidth/window.innerHeight,.1,1e3),T=new h.CP7;T.setClearColor(new h.Ilk("0xffffff")),T.setClearAlpha(.1),T.setSize(window.innerWidth,window.innerHeight),T.shadowMap.enabled=!0,B.position.set(-60,50,60),B.lookAt(new h.Pa4(0,4,0));var U=new h.Mig(3487029);L.add(U);var X=new h.PMe(16777215);X.position.set(-10,20,-5),X.castShadow=!0,L.add(X),function(t,e,n){c=t,u=e,v=n}(L,B,X),document.getElementById("webgl-output").appendChild(T.domElement),function t(){requestAnimationFrame(t),o.ZP.update(),T.render(L,B),B.updateMatrix(),X.updateMatrix()}(),n(8198),n(7612),n(9580)}},n={};function o(t){var i=n[t];if(void 0!==i)return i.exports;var r=n[t]={exports:{}};return e[t](r,r.exports,o),r.exports}o.m=e,t=[],o.O=(e,n,i,r)=>{if(!n){var s=1/0;for(l=0;l<t.length;l++){for(var[n,i,r]=t[l],a=!0,p=0;p<n.length;p++)(!1&r||s>=r)&&Object.keys(o.O).every((t=>o.O[t](n[p])))?n.splice(p--,1):(a=!1,r<s&&(s=r));a&&(t.splice(l--,1),e=i())}return e}r=r||0;for(var l=t.length;l>0&&t[l-1][2]>r;l--)t[l]=t[l-1];t[l]=[n,i,r]},o.d=(t,e)=>{for(var n in e)o.o(e,n)&&!o.o(t,n)&&Object.defineProperty(t,n,{enumerable:!0,get:e[n]})},o.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(t){if("object"==typeof window)return window}}(),o.o=(t,e)=>Object.prototype.hasOwnProperty.call(t,e),(()=>{var t;o.g.importScripts&&(t=o.g.location+"");var e=o.g.document;if(!t&&e&&(e.currentScript&&(t=e.currentScript.src),!t)){var n=e.getElementsByTagName("script");n.length&&(t=n[n.length-1].src)}if(!t)throw new Error("Automatic publicPath is not supported in this browser");t=t.replace(/#.*$/,"").replace(/\?.*$/,"").replace(/\/[^\/]+$/,"/"),o.p=t+"../"})(),(()=>{var t={826:0};o.O.j=e=>0===t[e];var e=(e,n)=>{var i,r,[s,a,p]=n,l=0;for(i in a)o.o(a,i)&&(o.m[i]=a[i]);for(p&&p(o),e&&e(n);l<s.length;l++)r=s[l],o.o(t,r)&&t[r]&&t[r][0](),t[s[l]]=0;o.O()},n=self.webpackChunkpilehappy=self.webpackChunkpilehappy||[];n.forEach(e.bind(null,0)),n.push=e.bind(null,n.push.bind(n))})();var i=o.O(void 0,[17],(()=>o(7939)));i=o.O(i)})();