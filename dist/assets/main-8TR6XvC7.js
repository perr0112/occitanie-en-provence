import{g as t,C as s}from"./CustomEase-CyiJXUgl.js";t.registerPlugin(s);s.create("primary-ease","0.62, 0.05, 0.01, 0.99");const a=1.2,i=document.querySelector(".body__btn"),c=()=>{const r=document.querySelectorAll(".animated-title");t.timeline({defaults:{duration:a,ease:"primary-ease"}}),r.forEach(e=>{e.innerHTML=e.innerHTML.split(/(<span[^>]*>.*?<\/span>|\s+)/g).map(o=>o.startsWith("<span")||o.trim()===""?o:`<span class="word">${o}</span>`).join("");const n=e.querySelectorAll(".word");t.fromTo(n,{opacity:0,y:20},{opacity:1,y:0,duration:1.2,ease:"primary-ease",stagger:{amount:.3,from:"random"},onComplete:()=>{t.to(document.documentElement,{"--opacity-after-circle":"1",duration:0,onComplete:()=>{setTimeout(()=>{t.to(".word",{y:-20,opacity:0,stagger:{amount:.3,from:"random"},onStart:()=>{document.documentElement.style.setProperty("--opacity-after-circle","0")},onComplete:()=>{l()}})},3e3)}})}})})},l=()=>{t.set(".v-1",{autoAlpha:0}),t.set(".v-1",{display:"none"});const r=document.querySelectorAll(".v-2 .animated-title");console.log(r),r.forEach(e=>{e.innerHTML=e.innerHTML.split(/(<span[^>]*>.*?<\/span>|\s+)/g).map(o=>o.startsWith("<span")||o.trim()===""?o:`<span class="word">${o}</span>`).join("");const n=e.querySelectorAll(".word");t.set(".word",{autoAlpha:0}),t.set(".v-2",{autoAlpha:1,display:"block"}),t.to(n,{autoAlpha:1,y:0,duration:a,ease:"primary-ease",stagger:{amount:.3,from:"random"}})})},d=()=>{const r=window.location.origin+"/map";console.log(r,window,window.location);const e=document.querySelector(".transition-experience"),n=t.timeline({defaults:{ease:"primary-ease",duration:a}});n.set("html",{cursor:"progress"}),n.to(e,{y:"-100%",onComplete:()=>{}})};document.addEventListener("DOMContentLoaded",c);i.addEventListener("click",d);
//# sourceMappingURL=main-8TR6XvC7.js.map
