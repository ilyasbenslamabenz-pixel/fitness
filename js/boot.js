(function(){
  /* Filet de sécurité : les onglets restent utilisables même si le moteur principal
     rencontre une erreur avant d'avoir installé ses gestionnaires. */
  function simpleNav(id){
    var page=document.getElementById(id)||document.getElementById("today");
    document.querySelectorAll(".page").forEach(function(s){s.classList.toggle("on",s===page);});
    document.querySelectorAll(".nav button").forEach(function(b){b.classList.toggle("on",b.dataset.page===page.id);});
    try{window.scrollTo(0,0);}catch(e){}
  }
  function fallbackData(){
    if(window.EVO_BOOT_OK)return; /* le moteur principal a déjà pris le relais : ne pas écraser ses données */
    try{
      var p=JSON.parse(localStorage.getItem("evoFitV3")||"null")||{};
      var profile=p.profile||{start:103,target:85,cal:2400};
      var wh=Array.isArray(p.weightHistory)?p.weightHistory:[];
      var w=wh.length?Number(wh[wh.length-1].w):Number(profile.start||103);
      var set=function(id,v){var x=document.getElementById(id);if(x)x.textContent=v;};
      set("greetHello","Salut 👋");
      set("greetSub","Chargement…");
      set("sLost","0");
      set("sSessions",Array.isArray(p.sessions)?p.sessions.length:0);
      set("sPR","—");
      set("streakN","0");
    }catch(e){}
  }
  function installFallback(){
    fallbackData();
    document.querySelectorAll(".nav button[data-page]").forEach(function(b){
      if(b.dataset.fallbackBound)return;
      b.dataset.fallbackBound="1";
      function go(ev){if(ev)ev.preventDefault();simpleNav(b.dataset.page);}
      b.addEventListener("click",go);
      b.addEventListener("touchend",go,{passive:false});
    });
  }
  document.addEventListener("click",function(e){
    var b=e.target.closest(".nav button[data-page]");
    if(!b)return;
    if(document.body.getAttribute("data-evo-boot")!=="ok")simpleNav(b.dataset.page);
  });
  installFallback();
  setTimeout(function(){
    installFallback();
    if(!window.EVO_BOOT_OK)document.body.setAttribute("data-evo-fallback","active");
  },1800);
  window.addEventListener("error",function(e){
    if(!window.EVO_BOOT_OK){
      console.error("EVO runtime error:",e.error||e.message);
      installFallback();
    }
  });
  window.addEventListener("unhandledrejection",function(e){
    console.error("EVO promise error:",e.reason||e);
    try{
      var t=document.getElementById("toast");
      if(t){t.textContent="Un petit bug a été récupéré automatiquement.";t.hidden=false;setTimeout(function(){t.hidden=true;},2200);}
    }catch(err){}
  });
})();

if("serviceWorker" in navigator){
  function registerEvoSW(){
    navigator.serviceWorker.register("/fitness/sw.js?v=37",{updateViaCache:"none"}).catch(function(e){console.warn("SW:",e);});
  }
  if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",registerEvoSW);
  else registerEvoSW();
  window.addEventListener("load",registerEvoSW);
}
