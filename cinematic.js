'use strict';
// Optional motion never changes routes, input values or savings calculations.
(() => {
 const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
 const progress = document.createElement('div');
 progress.className = 'reading-progress'; progress.setAttribute('aria-hidden','true');
 document.body.prepend(progress);
 let pending = false;
 const update = () => {const total=document.documentElement.scrollHeight-window.innerHeight;progress.style.width=(total>0?Math.min(100,Math.max(0,window.scrollY/total*100)):0)+'%';pending=false;};
 window.addEventListener('scroll',()=>{if(!pending&&!reduced.matches){pending=true;requestAnimationFrame(update);}},{passive:true});
 window.addEventListener('resize',update); update();
 if(!reduced.matches&&'IntersectionObserver' in window){
  const nodes=[...document.querySelectorAll('#memberView > section, .journey')];
  const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('in-view');observer.unobserve(entry.target);}}),{threshold:0.06});
  nodes.forEach(node=>{node.classList.add('reveal');observer.observe(node);});
  document.documentElement.classList.add('motion-ready');
  document.getElementById('printPlan').addEventListener('click',()=>nodes.forEach(n=>n.classList.add('in-view')));
  window.addEventListener('beforeprint',()=>nodes.forEach(n=>n.classList.add('in-view')));
  reduced.addEventListener('change',()=>{if(reduced.matches){nodes.forEach(n=>n.classList.add('in-view'));observer.disconnect();}});
 }
})();
