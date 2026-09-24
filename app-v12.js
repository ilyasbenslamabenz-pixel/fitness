(() => {
  const pages = ['dashboard','training','exercises','foodbox','progress','profile'];
  function mapSections(){
    const wrap=document.querySelector('.wrap'); if(!wrap) return;
    const secs=[...wrap.querySelectorAll(':scope > section')];
    secs.forEach((s)=>{
      const idMap={'today':'today','session':'session','progress':'progress','meals':'meals','profile':'profile'};
      const page=idMap[s.id];
      if(page){ s.dataset.page=page; s.classList.add('appPage'); }
    });
  }
  function showPage(id,btn,scroll=true){
    mapSections();
    document.querySelectorAll('section.appPage').forEach(s=>{
      s.style.display=(s.dataset.page===id || s.id===id)?'block':'none';
      s.classList.toggle('activePage',s.dataset.page===id || s.id===id);
    });
    document.querySelectorAll('.nav button').forEach(b=>b.classList.toggle('active',b===btn));
    localStorage.setItem('evoPage',id);
    if(scroll) window.scrollTo({top:0,behavior:'smooth'});
    if(id==='exercises') buildLibrary();
  }
  window.switchPage=showPage;
  function buildLibrary(){
    const root=document.getElementById('exerciseLibrary'); if(!root || root.dataset.ready==='1') return;
    const cards=[...document.querySelectorAll('section[data-page="session"] .exercise-card')];
    const seen=new Set();
    cards.forEach((card,i)=>{
      const h=card.querySelector('h3'),img=card.querySelector('.real-machine img');
      if(!h||!img) return;
      const name=h.textContent.trim(); if(seen.has(name)) return; seen.add(name);
      const c=document.createElement('div'); c.className='libCard'; c.dataset.name=name.toLowerCase();
      c.innerHTML='<img loading="lazy" src="'+img.src+'" alt="'+name+'"><div class="libBody"><b>'+name+'</b><span>Référence équipement · séance</span><button type="button">Voir dans le programme</button></div>';
      c.querySelector('button').onclick=()=>{showPage('session',document.querySelector('.nav button[data-page="session"]')); setTimeout(()=>card.scrollIntoView({behavior:'smooth',block:'start'}),80);};
      root.appendChild(c);
    });
    root.dataset.ready='1';
  }
  window.filterExercises=function(){
    const q=(document.getElementById('exerciseSearch')?.value||'').toLowerCase();
    document.querySelectorAll('.libCard').forEach(c=>c.style.display=c.dataset.name.includes(q)?'block':'none');
  };
  window.addEventListener('load',()=>{
    mapSections();
    const saved=localStorage.getItem('evoPage')||'today';
    const btn=document.querySelector('.nav button[data-page="'+saved+'"]')||document.querySelector('.nav button[data-page="today"]');
    showPage(btn?.dataset.page||'today',btn,false);
  });
})();