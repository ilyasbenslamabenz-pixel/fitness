(function(){
"use strict";
var CFG={apiKey:"AIzaSyDgvRLAmyY86814Vuu_xqXb-TVJqUYeV2I",authDomain:"fitness-f423a.firebaseapp.com",projectId:"fitness-f423a",storageBucket:"fitness-f423a.firebasestorage.app",messagingSenderId:"186607401810",appId:"1:186607401810:web:309ca695d884a6ec96588b"};
var KEY="evoFitV3", OLDKEY="evoFitCoachV2", BACKUPKEY="evoFitV3_backup";
var START_DATE="2026-09-21";

/* programme perte de poids : pecs 2×/semaine (haut et intérieur), dos pour la posture,
   fessiers et gainage pour les hanches ; la graisse part via le déficit et le cardio */
var PROGRAM_VERSION=4;
var DEFAULT_PROGRAM=[
 {id:"push",name:"Pectoraux & épaules",short:"Pecs",icon:'<svg class="ic-s" aria-hidden="true"><use href="#i-flame_fill"/></svg>',focus:"Pecs (haut et intérieur) · épaules · triceps",ex:[
   {n:"Développé couché haltères",t:"4 × 8-10",w:true},
   {n:"Développé incliné haltères",t:"4 × 8-10",w:true},
   {n:"Écarté poulie",t:"3 × 12-15",w:true},
   {n:"Dips assistés",t:"3 × 8-12",w:true},
   {n:"Élévations latérales",t:"3 × 12-15",w:true},
   {n:"Extension triceps corde",t:"3 × 12-15",w:true}]},
 {id:"pull",name:"Dos & bras",short:"Bras",icon:'<svg class="ic-s" aria-hidden="true"><use href="#i-scope"/></svg>',focus:"Dos · biceps · triceps",ex:[
   {n:"Tirage vertical",t:"4 × 8-10",w:true},
   {n:"Rowing haltère",t:"3 × 10-12",w:true},
   {n:"Tirage horizontal poulie",t:"3 × 10-12",w:true},
   {n:"Curl biceps haltères",t:"3 × 10-12",w:true},
   {n:"Curl marteau haltères",t:"3 × 10-12",w:true},
   {n:"Extension triceps au-dessus de la tête",t:"3 × 12-15",w:true}]},
 {id:"legs",name:"Jambes & hanches",short:"Hanches",icon:'<svg class="ic-s" aria-hidden="true"><use href="#i-figure_walk"/></svg>',focus:"Fessiers · cuisses · gainage",ex:[
   {n:"Hip thrust machine",t:"4 × 10-12",w:true},
   {n:"Presse à cuisses",t:"3 × 10-12",w:true},
   {n:"Soulevé de terre roumain",t:"3 × 10-12",w:true},
   {n:"Fentes marchées haltères",t:"3 × 12 / jambe",w:true},
   {n:"Abducteurs machine",t:"3 × 15-20",w:true},
   {n:"Gainage",t:"3 × 45 s",w:false}]},
 {id:"full",name:"Pecs + cardio",short:"Pecs 2",icon:'<svg class="ic-s" aria-hidden="true"><use href="#i-bolt_fill"/></svg>',focus:"Pecs · haut du corps · cardio brûle-graisse",ex:[
   {n:"Chest press",t:"4 × 10-12",w:true},
   {n:"Pompes",t:"3 × max",w:false},
   {n:"Développé militaire machine",t:"3 × 10-12",w:true},
   {n:"Tirage vertical prise large",t:"3 × 10-12",w:true},
   {n:"Cardio fractionné (vélo ou rameur)",t:"20 min : 30 s vite / 90 s lent",w:false}]}
];

/* séance maison : force au poids du corps + cardio HIIT en alternance, sans matériel */
var HOME_PROGRAM=[
 {id:"home-fb1",cat:"maison",name:"Haut du corps & hanches",short:"Haut",icon:'<svg class="ic-s" aria-hidden="true"><use href="#i-house_fill"/></svg>',focus:"Pecs · fessiers · gainage",ex:[
   {n:"Pompes",t:"4 × 10-15",w:false},
   {n:"Pompes larges",t:"3 × 10-12",w:false},
   {n:"Hip thrust au sol",t:"4 × 15-20",w:false},
   {n:"Squats",t:"3 × 15-20",w:false},
   {n:"Gainage (planche)",t:"3 × 30-45 s",w:false}]},
 {id:"home-arms",cat:"maison",name:"Pecs & bras maison",short:"Bras",icon:'<svg class="ic-s" aria-hidden="true"><use href="#i-house_fill"/></svg>',focus:"Pecs · triceps · biceps (haltères ou bouteilles d'eau)",ex:[
   {n:"Pompes déclinées",t:"4 × 8-12",w:false},
   {n:"Pompes serrées",t:"4 × 8-12",w:false},
   {n:"Dips sur chaise",t:"4 × 10-15",w:false},
   {n:"Curl biceps haltères",t:"4 × 12-15",w:true},
   {n:"Pompes larges",t:"3 × 10-12",w:false},
   {n:"Gainage (planche)",t:"3 × 30-45 s",w:false}]},
 {id:"home-hiit1",cat:"maison",name:"HIIT cardio 1",short:"HIIT 1",icon:'<svg class="ic-s" aria-hidden="true"><use href="#i-bolt_fill"/></svg>',focus:"Cardio · circuit brûle-graisse",ex:[
   {n:"Jumping jacks",t:"4 × 30 s",w:false},
   {n:"Mountain climbers",t:"4 × 30 s",w:false},
   {n:"Burpees",t:"4 × 10",w:false},
   {n:"Squat jumps",t:"4 × 15",w:false},
   {n:"Corde à sauter (ou sur place)",t:"4 × 45 s",w:false}]},
 {id:"home-fb2",cat:"maison",name:"Pecs & jambes",short:"Jambes",icon:'<svg class="ic-s" aria-hidden="true"><use href="#i-house_fill"/></svg>',focus:"Pecs · triceps · jambes · taille",ex:[
   {n:"Pompes déclinées",t:"4 × 8-12",w:false},
   {n:"Dips sur chaise",t:"3 × 10-15",w:false},
   {n:"Fentes arrière",t:"3 × 12 / jambe",w:false},
   {n:"Squats sumo",t:"3 × 15",w:false},
   {n:"Gainage latéral",t:"3 × 20-30 s",w:false}]},
 {id:"home-hiit2",cat:"maison",name:"HIIT cardio 2",short:"HIIT 2",icon:'<svg class="ic-s" aria-hidden="true"><use href="#i-bolt_fill"/></svg>',focus:"Cardio · circuit brûle-graisse",ex:[
   {n:"High knees",t:"4 × 30 s",w:false},
   {n:"Burpees",t:"4 × 12",w:false},
   {n:"Jumping lunges",t:"4 × 12",w:false},
   {n:"Plank jacks",t:"4 × 30 s",w:false},
   {n:"Sprint sur place",t:"4 × 40 s",w:false}]}
];

/* photos de démonstration des exercices (img/exercises) : début et fin du mouvement,
   issues de Free Exercise DB (domaine public, github.com/yuhonas/free-exercise-db) */
var EX_PHOTOS={"Développé couché machine":["machine-bench-press-0","machine-bench-press-1"],"Pec deck (butterfly)":["butterfly-0","butterfly-1"],"Oiseau machine":["reverse-machine-flyes-0","reverse-machine-flyes-1"],"Tirage horizontal machine":["leverage-iso-row-0","leverage-iso-row-1"],"Tirage haut machine":["leverage-high-row-0","leverage-high-row-1"],"Tractions assistées":["band-assisted-pull-up-0","band-assisted-pull-up-1"],"Curl biceps machine":["machine-preacher-curls-0","machine-preacher-curls-1"],"Hack squat":["hack-squat-0","hack-squat-1"],"Leg extension":["leg-extensions-0","leg-extensions-1"],"Leg curl assis":["seated-leg-curl-0","seated-leg-curl-1"],"Leg curl allongé":["lying-leg-curls-0","lying-leg-curls-1"],"Adducteurs machine":["thigh-adductor-0","thigh-adductor-1"],"Mollets debout":["standing-calf-raises-0","standing-calf-raises-1"],"Mollets assis":["seated-calf-raise-0","seated-calf-raise-1"],"Crunch machine":["ab-crunch-machine-0","ab-crunch-machine-1"],"Extension lombaires":["hyperextensions-back-extensions-0","hyperextensions-back-extensions-1"],"Squat à la Smith machine":["smith-machine-squat-0","smith-machine-squat-1"],"Pull-over poulie":["straight-arm-pulldown-0","straight-arm-pulldown-1"],"Curl marteau poulie (corde)":["cable-hammer-curls-rope-attachment-0","cable-hammer-curls-rope-attachment-1"],"Crunch poulie":["cable-crunch-0","cable-crunch-1"],"Kickback fessier poulie":["one-legged-cable-kickback-0","one-legged-cable-kickback-1"],"Woodchop poulie":["standing-cable-wood-chop-0","standing-cable-wood-chop-1"],"Développé couché barre":["barbell-bench-press-medium-grip-0","barbell-bench-press-medium-grip-1"],"Écarté haltères":["dumbbell-flyes-0","dumbbell-flyes-1"],"Écarté incliné haltères":["incline-dumbbell-flyes-0","incline-dumbbell-flyes-1"],"Développé militaire haltères":["dumbbell-shoulder-press-0","dumbbell-shoulder-press-1"],"Rowing barre":["bent-over-barbell-row-0","bent-over-barbell-row-1"],"Barre au front":["ez-bar-skullcrusher-0","ez-bar-skullcrusher-1"],"Kickback triceps haltère":["tricep-dumbbell-kickback-0","tricep-dumbbell-kickback-1"],"Squat barre":["barbell-squat-0","barbell-squat-1"],"Goblet squat":["goblet-squat-0","goblet-squat-1"],"Soulevé de terre":["barbell-deadlift-0","barbell-deadlift-1"],"Hip thrust barre":["barbell-hip-thrust-0","barbell-hip-thrust-1"],"Tractions":["pullups-0","pullups-1"],"Dips aux barres":["dips-chest-version-0","dips-chest-version-1"],"Shrugs haltères":["dumbbell-shrug-0","dumbbell-shrug-1"],"Tapis de course":["running-treadmill-0","running-treadmill-1"],"Vélo":["bicycling-stationary-0","bicycling-stationary-1"],"Vélo couché":["recumbent-bike-0","recumbent-bike-1"],"Rameur":["rowing-stationary-0","rowing-stationary-1"],"Elliptique / AMT":["elliptical-trainer-0","elliptical-trainer-1"],"Stairmaster":["stairmaster-0","stairmaster-1"],"Battle rope":["battling-ropes-0","battling-ropes-1"],"Kettlebell swing":["one-arm-kettlebell-swings-0","one-arm-kettlebell-swings-1"],"Box jump":["front-box-jump-0","front-box-jump-1"],"Med ball slam":["overhead-slam-0","overhead-slam-1"],"Rowing TRX":["suspended-row-0","suspended-row-1"],"Pompes TRX":["suspended-push-up-0","suspended-push-up-1"],"Farmer walk":["farmers-walk-0","farmers-walk-1"],"Poussée de traîneau":["prowler-sprint-0","prowler-sprint-1"],"Étirement pectoraux":["dynamic-chest-stretch-0","dynamic-chest-stretch-1"],"Étirement ischios":["hamstring-stretch-0","hamstring-stretch-1"],"Étirement fléchisseurs de hanche":["kneeling-hip-flexor-0","kneeling-hip-flexor-1"],"Chat-vache":["cat-stretch-0","cat-stretch-1"],"Posture de l'enfant":["childs-pose-0","childs-pose-1"],"Curl marteau haltères":["hammer-curls-0","hammer-curls-1"],"Extension triceps au-dessus de la tête":["cable-rope-overhead-triceps-extension-0","cable-rope-overhead-triceps-extension-1"],"Pompes serrées":["pushups-close-and-wide-hand-positions-1","pushups-close-and-wide-hand-positions-0"],"Pompes":["pushups-1","pushups-0"],"Pompes larges":["pushups-1","pushups-0"],"Pompes déclinées":["decline-push-up-0","decline-push-up-1"],"Squats":["bodyweight-squat-0","bodyweight-squat-1"],"Squats sumo":["plie-dumbbell-squat-0","plie-dumbbell-squat-1"],"Squat jumps":["freehand-jump-squat-0","freehand-jump-squat-1"],"Fentes arrière":["crossover-reverse-lunge-0","crossover-reverse-lunge-1"],"Fentes marchées haltères":["dumbbell-lunges-0","dumbbell-lunges-1"],"Jumping lunges":["split-jump-0","split-jump-1"],"Gainage (planche)":["plank-1"],"Gainage":["plank-1"],"Gainage latéral":["side-bridge-0","side-bridge-1"],"Mountain climbers":["mountain-climbers-0","mountain-climbers-1"],"Plank jacks":["push-up-to-side-plank-0"],"Burpees":["freehand-jump-squat-0","pushups-1","freehand-jump-squat-1"],"Jumping jacks":["star-jump-0","star-jump-1"],"Corde à sauter (ou sur place)":["rope-jumping-0","rope-jumping-1"],"High knees":["fast-skipping-0","fast-skipping-1"],"Sprint sur place":["running-treadmill-0","running-treadmill-1"],"Dips sur chaise":["bench-dips-0","bench-dips-1"],"Hip thrust au sol":["butt-lift-bridge-0","butt-lift-bridge-1"],"Hip thrust machine":["barbell-hip-thrust-0","barbell-hip-thrust-1"],"Développé couché haltères":["dumbbell-bench-press-0","dumbbell-bench-press-1"],"Développé incliné haltères":["incline-dumbbell-press-0","incline-dumbbell-press-1"],"Curl biceps haltères":["dumbbell-bicep-curl-0","dumbbell-bicep-curl-1"],"Élévations latérales":["side-lateral-raise-0","side-lateral-raise-1"],"Soulevé de terre roumain":["stiff-legged-dumbbell-deadlift-0","stiff-legged-dumbbell-deadlift-1"],"Rowing haltère":["one-arm-dumbbell-row-0","one-arm-dumbbell-row-1"],"Écarté poulie":["cable-crossover-0","cable-crossover-1"],"Extension triceps corde":["triceps-pushdown-rope-attachment-0","triceps-pushdown-rope-attachment-1"],"Face pull":["face-pull-0","face-pull-1"],"Tirage vertical":["wide-grip-lat-pulldown-0","wide-grip-lat-pulldown-1"],"Tirage vertical prise large":["wide-grip-lat-pulldown-0","wide-grip-lat-pulldown-1"],"Tirage horizontal poulie":["seated-cable-rows-0","seated-cable-rows-1"],"Chest press":["leverage-chest-press-0","leverage-chest-press-1"],"Développé militaire machine":["machine-shoulder-military-press-0","machine-shoulder-military-press-1"],"Dips assistés":["dip-machine-0","dip-machine-1"],"Presse à cuisses":["leg-press-0","leg-press-1"],"Abducteurs machine":["thigh-abductor-0","thigh-abductor-1"],"Cardio fractionné (vélo ou rameur)":["bicycling-stationary-0","bicycling-stationary-1"]};
function exPhotos(n){return EX_PHOTOS[n]||null;}
/* catalogue des exercices, par zone d'une salle EVO (machines guidées Technogym, poulies,
   poids libres, cardio, playground, mobilité) + poids du corps : [nom, zone, muscles, séries, charge] */
var EX_ZONES={machine:"Machines",cable:"Poulies",free:"Poids libres",cardio:"Cardio",func:"Playground",body:"Poids du corps",mob:"Mobilité"};
var EX_CATALOG=[["Chest press","machine","Pecs · triceps","4 × 10-12",1],["Développé militaire machine","machine","Épaules · triceps","3 × 10-12",1],["Tirage vertical","machine","Dos · biceps","4 × 8-10",1],["Dips assistés","machine","Pecs (bas) · triceps","3 × 8-12",1],["Presse à cuisses","machine","Cuisses · fessiers","3 × 10-12",1],["Abducteurs machine","machine","Fessiers · hanches","3 × 15-20",1],["Hip thrust machine","machine","Fessiers","4 × 10-12",1],["Écarté poulie","cable","Pecs (intérieur)","3 × 12-15",1],["Extension triceps corde","cable","Triceps","3 × 12-15",1],["Extension triceps au-dessus de la tête","cable","Triceps","3 × 12-15",1],["Face pull","cable","Épaules arrière · posture","3 × 15",1],["Tirage horizontal poulie","cable","Dos · biceps","3 × 10-12",1],["Tirage vertical prise large","cable","Dos (largeur)","3 × 10-12",1],["Développé couché haltères","free","Pecs · triceps","4 × 8-10",1],["Développé incliné haltères","free","Pecs (haut)","4 × 8-10",1],["Élévations latérales","free","Épaules","3 × 12-15",1],["Rowing haltère","free","Dos","3 × 10-12",1],["Curl biceps haltères","free","Biceps","3 × 10-12",1],["Curl marteau haltères","free","Biceps · avant-bras","3 × 10-12",1],["Soulevé de terre roumain","free","Ischios · fessiers","3 × 10-12",1],["Fentes marchées haltères","free","Cuisses · fessiers","3 × 12 / jambe",1],["Cardio fractionné (vélo ou rameur)","cardio","Cardio brûle-graisse","20 min : 30 s vite / 90 s lent",0],["Pompes","body","Pecs · triceps","3 × max",0],["Pompes larges","body","Pecs","3 × 10-12",0],["Pompes déclinées","body","Pecs (haut)","3 × 8-12",0],["Pompes serrées","body","Triceps · pecs","3 × 8-12",0],["Dips sur chaise","body","Triceps","3 × 10-15",0],["Squats","body","Cuisses · fessiers","3 × 15-20",0],["Squats sumo","body","Fessiers · intérieur des cuisses","3 × 15",0],["Fentes arrière","body","Cuisses · fessiers","3 × 12 / jambe",0],["Hip thrust au sol","body","Fessiers","4 × 15-20",0],["Gainage (planche)","body","Abdos · gainage","3 × 30-45 s",0],["Gainage latéral","body","Obliques · taille","3 × 20-30 s",0],["Burpees","func","Corps entier · cardio","4 × 10",0],["Mountain climbers","func","Cardio · abdos","4 × 30 s",0],["Jumping jacks","func","Cardio","4 × 30 s",0],["Squat jumps","func","Jambes · cardio","4 × 15",0],["Corde à sauter (ou sur place)","func","Cardio","4 × 45 s",0],["Développé couché machine","machine","Pecs · triceps","3 × 10-12",1],["Pec deck (butterfly)","machine","Pecs (intérieur)","3 × 12-15",1],["Oiseau machine","machine","Épaules arrière · posture","3 × 12-15",1],["Tirage horizontal machine","machine","Dos · biceps","3 × 10-12",1],["Tirage haut machine","machine","Dos (largeur)","3 × 10-12",1],["Tractions assistées","machine","Dos · biceps","3 × 6-10",1],["Curl biceps machine","machine","Biceps","3 × 10-12",1],["Hack squat","machine","Cuisses · fessiers","3 × 10-12",1],["Leg extension","machine","Quadriceps","3 × 12-15",1],["Leg curl assis","machine","Ischios","3 × 12-15",1],["Leg curl allongé","machine","Ischios","3 × 12-15",1],["Adducteurs machine","machine","Intérieur des cuisses","3 × 15",1],["Mollets debout","machine","Mollets","3 × 15",1],["Mollets assis","machine","Mollets","3 × 15",1],["Crunch machine","machine","Abdos","3 × 15",1],["Extension lombaires","machine","Bas du dos · fessiers","3 × 12-15",0],["Squat à la Smith machine","machine","Cuisses · fessiers","3 × 10-12",1],["Pull-over poulie","cable","Dos · pecs","3 × 12-15",1],["Curl marteau poulie (corde)","cable","Biceps · avant-bras","3 × 12-15",1],["Crunch poulie","cable","Abdos","3 × 15",1],["Kickback fessier poulie","cable","Fessiers","3 × 15 / jambe",1],["Woodchop poulie","cable","Obliques · gainage","3 × 12 / côté",1],["Développé couché barre","free","Pecs · triceps","4 × 6-10",1],["Écarté haltères","free","Pecs","3 × 12",1],["Écarté incliné haltères","free","Pecs (haut)","3 × 12",1],["Développé militaire haltères","free","Épaules · triceps","3 × 8-12",1],["Rowing barre","free","Dos","3 × 8-10",1],["Barre au front","free","Triceps","3 × 10-12",1],["Kickback triceps haltère","free","Triceps","3 × 12-15",1],["Squat barre","free","Cuisses · fessiers","4 × 6-10",1],["Goblet squat","free","Cuisses · fessiers","3 × 10-12",1],["Soulevé de terre","free","Dos · fessiers · ischios","3 × 5-8",1],["Hip thrust barre","free","Fessiers","4 × 10-12",1],["Tractions","free","Dos · biceps","3 × max",0],["Dips aux barres","free","Pecs (bas) · triceps","3 × 8-12",0],["Shrugs haltères","free","Trapèzes","3 × 12-15",1],["Tapis de course","cardio","Cardio","20 min",0],["Vélo","cardio","Cardio · cuisses","20 min",0],["Vélo couché","cardio","Cardio (doux pour le dos)","20 min",0],["Rameur","cardio","Cardio · dos · jambes","15 min",0],["Elliptique / AMT","cardio","Cardio sans impact","20 min",0],["Stairmaster","cardio","Cardio · fessiers","15 min",0],["Air bike","cardio","Cardio fractionné","10 min",0],["SkiErg","cardio","Cardio · dos · bras","10 min",0],["Battle rope","func","Cardio · épaules","4 × 30 s",0],["Kettlebell swing","func","Fessiers · ischios · cardio","4 × 15",1],["Box jump","func","Jambes · explosivité","4 × 8",0],["Med ball slam","func","Corps entier · cardio","4 × 12",1],["Rowing TRX","func","Dos · biceps","3 × 12",0],["Pompes TRX","func","Pecs · gainage","3 × 10-12",0],["Farmer walk","func","Grip · gainage · trapèzes","4 × 30 s",1],["Poussée de traîneau","func","Jambes · cardio","4 × 20 m",1],["Étirement pectoraux","mob","Pecs · épaules","2 × 30 s",0],["Étirement ischios","mob","Arrière des cuisses","2 × 30 s",0],["Étirement fléchisseurs de hanche","mob","Hanches","2 × 30 s",0],["Chat-vache","mob","Dos","2 × 30 s",0],["Posture de l'enfant","mob","Dos · hanches","2 × 30 s",0]];
var pickMode="session",pickZone="all";
function openExPicker(mode){
  pickMode=mode||"session";pickZone="all";$("pickSearch").value="";
  renderExPicker();$("exPickModal").classList.add("on");
}
function closeExPicker(){$("exPickModal").classList.remove("on");}
function renderExPicker(){
  var q=normText($("pickSearch").value).trim();
  $("pickZones").innerHTML=[["all","Tout"]].concat(Object.keys(EX_ZONES).map(function(k){return [k,EX_ZONES[k]];})).map(function(z){
    return '<button class="pchip'+(z[0]===pickZone?" on":"")+'" data-act="pickZone" data-z="'+z[0]+'">'+z[1]+'</button>';
  }).join("");
  var list=EX_CATALOG.filter(function(x){
    if(pickZone!=="all"&&x[1]!==pickZone)return false;
    if(!q)return true;
    var hay=normText(x[0]+" "+x[2]+" "+EX_ZONES[x[1]]);
    return q.split(/\s+/).every(function(w){return hay.indexOf(w)>=0;});
  });
  $("pickList").innerHTML=list.length?list.map(function(x){
    var ph=exPhotos(x[0]),i=EX_CATALOG.indexOf(x);
    return '<button class="pick-row" data-act="pickEx" data-i="'+i+'">'
      +(ph?'<img class="exrow-art" src="'+photoUrl(ph[ph.length-1])+'" alt="" loading="lazy">':'<span class="exrow-art pick-noimg"><svg class="ic-s" aria-hidden="true"><use href="#i-dumbbell"/></svg></span>')
      +'<span class="pick-t"><b>'+esc(x[0])+'</b><small>'+esc(EX_ZONES[x[1]])+' · '+esc(x[2])+' · '+esc(x[3])+'</small></span>'
      +'<span class="pick-add"><svg class="ic-s" aria-hidden="true"><use href="#i-plus"/></svg></span></button>';
  }).join(""):'<div class="empty">Aucun exercice trouvé. Crée-le toi-même ci-dessous.</div>';
}
function pickExercise(i){
  var x=EX_CATALOG[i];if(!x)return;
  var ex={n:x[0],t:x[3],w:!!x[4]};
  if(pickMode==="edit"){
    edSyncFieldsFromDOM();
    if(editDayEx.some(function(e){return e.n.toLowerCase()===ex.n.toLowerCase();})){toast("Déjà dans ce jour");return;}
    editDayEx.push({n:ex.n,t:ex.t,w:ex.w,orig:null});renderEditDayList();closeExPicker();toast("« "+ex.n+" » ajouté au jour");
    return;
  }
  var p=state.program[state.selDay],extra=extraFor(p.id),ln=ex.n.toLowerCase();
  if(activeExercises(p).some(function(e){return e.n.toLowerCase()===ln;})){toast("Déjà dans la séance du jour");return;}
  extra.push({n:ex.n,t:ex.t,w:ex.w,extra:true});
  save();closeExPicker();renderSession();toast("« "+ex.n+" » ajouté à la séance d'aujourd'hui");
}
function photoUrl(slug){return "/fitness/img/exercises/"+slug+".jpg";}
/* ===== carte des muscles : silhouettes face/dos, muscles principaux en rouge, secondaires en rouge clair =====
   tracés issus de react-body-highlighter (MIT, © 2020 GV79, voir licenses/react-body-highlighter.txt) */
var BODY_MAP={"front":[["chest",["51.8 41.6 51 55.1 58 58 67.8 55.5 70.6 47.3 62 41.6","29.8 46.5 31.4 55.5 40.8 58 48.2 55.1 47.8 42 37.6 42"]],["obliques",["68.6 63.3 67.3 57.1 58.8 59.6 60 64.1 60.4 83.3 65.7 78.8 66.5 69.8","33.9 78.4 33.1 71.8 31 63.3 32.2 57.1 40.8 59.2 39.2 63.3 39.2 83.7"]],["abs",["56.3 59.2 58 64.1 58.4 78 58.4 92.7 56.3 98.4 55.1 104.1 51.4 107.8 51 84.5 50.6 67.3 51 57.1","43.7 58.8 48.6 57.1 49 67.3 48.6 84.5 48.2 107.3 44.5 103.7 40.8 91.4 40.8 78.4 41.2 64.5"]],["biceps",["16.7 68.2 18 71.4 22.9 66.1 29 53.9 27.8 49.4 20.4 55.9","71.4 49.4 70.2 54.7 76.3 66.1 81.6 71.8 82.9 69 78.8 55.5"]],["triceps",["69.4 55.5 69.4 61.6 75.9 72.7 77.6 70.2 75.5 67.3","22.4 69.4 29.8 55.5 29.8 60.8 22.9 73.1"]],["neck",["55.5 23.7 50.6 33.5 50.6 39.2 61.6 40 70.6 44.9 69.4 36.7 63.3 35.1 58.4 30.6","29 44.9 30.2 37.1 36.3 35.1 41.2 30.2 44.5 24.5 49 33.9 48.6 39.2 38 39.6"]],["front-deltoids",["78.4 53.1 79.6 47.8 79.2 41.2 75.9 38 71 36.3 72.2 42.9 71.4 47.3","28.2 47.3 21.2 53.1 20 47.8 20.4 40.8 24.5 37.1 28.6 37.1 26.9 43.3"]],["head",["42.4 2.9 40 11.8 42 19.6 46.1 23.3 49.8 25.3 54.7 22.4 57.6 19.2 59.2 10.2 57.1 2.4 49.8 0"]],["abductors",["52.7 110.2 54.3 124.9 60 110.2 62 100 64.9 94.3 60 92.7 56.7 104.5","47.8 110.6 44.9 125.3 42 115.9 40.4 113.1 39.6 107.3 38 102.4 34.7 93.9 39.6 92.2 41.6 99.2 43.7 105.3"]],["quadriceps",["34.7 98.8 37.1 108.2 37.1 127.8 34.3 137.1 31 132.7 29.4 120 28.2 111.4 29.4 100.8 32.2 94.7","63.3 105.7 64.5 100 66.9 94.7 70.2 101.2 71 111.8 68.2 133.1 65.3 137.6 62.4 128.6 62 111.4","38.8 129.4 38.4 112.2 41.2 118.4 44.5 129.4 42.9 135.1 40 146.1 36.3 146.5 35.5 140","59.6 145.7 55.5 129 60.8 113.9 61.2 130.2 64.1 139.6 62.9 146.5","32.7 138.4 26.5 145.7 25.7 136.7 25.7 127.3 26.9 114.3 29.4 133.5","71.8 113.1 73.9 124.1 73.9 140.4 72.7 145.7 66.5 138.4 70.2 133.5"]],["knees",["33.9 140 34.7 143.3 35.5 147.3 36.3 151 35.1 156.7 29.8 156.7 27.3 152.7 27.3 147.3 30.2 144.1","65.7 140 72.2 147.8 72.2 152.2 69.8 157.1 64.9 156.7 62.9 151"]],["calves",["71.4 160.4 73.5 153.5 76.7 161.2 79.6 167.8 78.4 187.8 79.6 195.5 74.7 195.5","24.9 194.7 27.8 164.9 28.2 160.4 26.1 154.3 24.9 157.6 22.4 161.6 20.8 167.8 22 188.2 20.8 195.5","72.7 195.1 69.8 159.2 65.3 158.4 64.1 162.4 64.1 165.3 65.7 177.1","35.5 158.4 35.9 162.4 35.9 166.9 35.1 172.2 35.1 176.7 32.2 182 30.6 187.3 26.9 194.7 27.3 187.8 28.2 180.4 28.6 175.5 29 169.8 29.8 164.1 30.2 158.8"]],["forearm",["6.1 88.6 10.2 75.1 14.7 70.2 16.3 74.3 19.2 73.5 4.5 97.6 0 100","84.5 69.8 83.3 73.5 80 73.1 95.1 98.4 100 100.4 93.5 89.4 89.8 76.3","77.6 72.2 77.6 77.6 80.4 84.1 85.3 89.8 92.2 101.2 94.7 99.6","6.9 101.2 13.5 90.6 18.8 84.1 21.6 77.1 21.2 71.8 4.9 98.8"]]],"back":[["head",["50.6 0 46 0.9 40.9 5.5 40.4 12.8 45.1 20 55.7 20 59.1 13.6 59.6 4.7 55.7 1.3"]],["trapezius",["44.7 21.7 47.7 21.7 47.2 38.3 47.7 64.7 38.3 53.2 35.3 40.9 31.1 36.6 39.1 33.2 43.8 27.2","52.3 21.7 55.7 21.7 56.6 27.2 60.9 32.8 68.9 36.6 64.7 40.4 61.7 53.2 52.3 64.7 53.2 38.3"]],["back-deltoids",["29.4 37 23 39.1 17.4 44.3 18.3 53.6 24.3 49.4 27.2 46.4","71.1 37 78.3 39.6 82.6 44.7 81.7 53.6 74.9 48.9 72.3 45.1"]],["upper-back",["31.1 38.7 28.1 48.9 28.5 55.3 34 75.3 47.2 71.1 47.2 66.4 36.6 54 33.6 41.3","68.9 38.7 71.9 49.4 71.5 56.2 66 75.3 52.8 71.1 52.8 66.4 63.4 54.5 66.4 41.7"]],["triceps",["26.8 49.8 17.9 55.7 14.5 72.3 16.6 81.7 21.7 63.8 26.8 55.7","73.6 50.2 82.1 55.7 86 73.2 83.4 82.1 77.9 63 73.2 55.7","26.8 58.3 26.8 68.5 23 75.3 19.1 77.4 22.6 65.5","72.8 58.3 77 64.7 80.4 77.4 76.6 75.3 72.8 68.9"]],["lower-back",["47.7 72.8 34.5 77 35.3 83.4 49.4 102.1 46.8 83","52.3 72.8 65.5 77 64.7 83.4 50.6 102.1 53.2 83.8"]],["forearm",["86.4 75.7 91.1 83.4 93.2 94 100 106.4 96.2 104.3 88.1 89.4 84.3 83.8","13.6 75.7 8.9 83.8 6.8 93.6 0 106.4 3.8 104.3 12.3 88.5 15.7 83","81.3 79.6 77.4 77.9 79.1 84.7 91.1 103.8 93.2 108.9 94.5 104.7","18.7 79.6 22.1 77.9 20.9 84.3 9.4 103 6.8 108.5 5.1 104.7"]],["gluteal",["44.7 99.6 30.2 108.5 29.8 118.7 31.5 126 47.2 121.3 49.4 114.9","55.3 99.1 51.1 114.5 52.3 120.9 68.1 126 69.8 119.1 69.4 108.5"]],["abductor",["48.1 123 44.7 123 41.3 125.5 45.1 144.3 48.5 135.7 48.9 129.4","51.9 122.6 55.7 123.4 59.1 126 54.9 144.3 51.9 136.2 51.1 129.4"]],["hamstring",["28.9 122.1 31.1 129.4 36.6 126 35.3 135.3 34.5 150.2 29.4 158.3 28.9 146.8 27.7 141.3 27.2 131.5","71.5 121.7 69.4 128.9 63.8 126 65.5 136.6 66.4 150.2 71.1 158.3 71.5 147.7 72.8 142.1 73.6 131.9","38.7 125.5 44.3 146 40.4 166.8 36.2 152.8 37 135.3","61.7 125.5 63.4 136.2 64.3 153.2 60 166.8 56.2 146.4"]],["knees",["34.5 153.2 31.1 159.1 33.6 166.4 37.4 162.6","66.4 153.6 63 163 66.8 166.4 69.4 159.1"]],["calves",["29.4 160.4 28.5 167.2 24.7 179.6 23.8 192.8 25.5 197 28.5 193.2 29.8 180 31.9 171.1 31.9 166.8","37.4 165.1 35.3 167.7 33.2 171.9 31.1 180.4 30.2 191.9 34 200 38.7 190.6 39.1 168.9","63 165.1 61.3 168.5 61.7 190.6 66.4 199.6 70.6 191.9 68.9 179.6 66.8 170.2","70.6 160.4 72.3 168.5 75.7 179.1 76.6 192.8 74.5 196.6 72.3 193.6 70.6 179.6 68.1 168.1"]],["left-soleus",["28.5 195.7 30.2 195.7 33.6 201.7 30.6 220 28.5 213.6 26.8 198.3"]],["right-soleus",["69.8 195.7 71.9 195.7 73.6 198.3 71.9 213.2 70.2 219.6 67.2 202.1"]]]};
var MUSCLE_TOK=[
  [/pecs/,["chest"]],[/^triceps/,["triceps"]],[/^biceps/,["biceps"]],[/^bras$/,["biceps","triceps"]],
  [/épaules arrière/,["back-deltoids"]],[/^épaules/,["front-deltoids","back-deltoids"]],
  [/bas du dos/,["lower-back"]],[/trapèzes/,["trapezius"]],[/^dos/,["upper-back"]],[/posture/,["upper-back","trapezius","back-deltoids"]],
  [/abdos/,["abs"]],[/obliques|taille/,["obliques"]],[/gainage/,["abs","obliques","lower-back"]],
  [/fessiers/,["gluteal"]],[/hanches/,["gluteal","abductor"]],[/intérieur des cuisses/,["abductors"]],
  [/ischios|arrière des cuisses/,["hamstring"]],[/quadriceps/,["quadriceps"]],[/^cuisses/,["quadriceps","hamstring"]],
  [/jambes/,["quadriceps","hamstring","gluteal","calves"]],[/mollets/,["calves","left-soleus","right-soleus"]],
  [/avant-bras|grip/,["forearm"]],[/corps entier/,["quadriceps","gluteal","chest","upper-back","front-deltoids","abs"]],
  [/explosivité/,["quadriceps","gluteal","calves"]],[/cardio/,["quadriceps","hamstring","calves"]]
];
/* exercice hors catalogue (programme perso) : on devine par le nom */
var MUSCLE_KW=[
  [/squat|presse|fente|lunge|leg ext|step/,"quadriceps · fessiers"],[/soulev|deadlift|hip thrust|pont|good morning/,"fessiers · ischios · bas du dos"],
  [/leg curl|ischio/,"ischios"],[/développé couché|pompe|chest|pec|dips|écarté|butterfly/,"pecs · triceps"],
  [/tirage|rowing|row|traction|pull/,"dos · biceps"],[/curl/,"biceps · avant-bras"],[/triceps|extension|barre au front/,"triceps"],
  [/militaire|élévation|épaule|shoulder|arnold/,"épaules · triceps"],[/oiseau|face pull/,"épaules arrière · trapèzes"],
  [/gainage|plank|planche|crunch|abdo|relevé|mountain/,"abdos · obliques"],[/mollet|calf/,"mollets"],
  [/high knees|sprint|jumping|burpee|jacks|corde|vélo|rameur|tapis|elliptique|course|marche/,"cardio · jambes"]
];
function exMuscles(n){
  var c=EX_CATALOG.find(function(x){return x[0].toLowerCase()===String(n).toLowerCase();}),txt=c?c[2]:"";
  if(!txt){var l=normText(n);for(var i=0;i<MUSCLE_KW.length;i++)if(MUSCLE_KW[i][0].test(l)||MUSCLE_KW[i][0].test(String(n).toLowerCase())){txt=MUSCLE_KW[i][1];break;}}
  if(!txt)return null;
  var prim=[],sec=[];
  txt.split(/·|,|\+|\//).map(function(t){return t.trim().toLowerCase();}).filter(Boolean).forEach(function(t,k){
    MUSCLE_TOK.forEach(function(r){if(r[0].test(t))r[1].forEach(function(m){if(k===0){if(prim.indexOf(m)<0)prim.push(m);}else if(prim.indexOf(m)<0&&sec.indexOf(m)<0)sec.push(m);});});
  });
  return prim.length||sec.length?{p:prim,s:sec}:null;
}
function muscleMapSVG(n){
  var mm=exMuscles(n);if(!mm)return "";
  function side(arr){return '<svg viewBox="0 0 100 200" aria-hidden="true">'+arr.map(function(g){
    var cls=mm.p.indexOf(g[0])>=0?"mp":(mm.s.indexOf(g[0])>=0?"ms":"");
    return g[1].map(function(pts){return '<polygon points="'+pts+'"'+(cls?' class="'+cls+'"':'')+'/>';}).join("");
  }).join("")+'</svg>';}
  return '<div class="mmap" role="img" aria-label="Muscles travaillés">'+side(BODY_MAP.front)+side(BODY_MAP.back)+'</div>';
}
var photoCycleT=null;
function stopPhotoCycle(){clearInterval(photoCycleT);photoCycleT=null;}
/* alterne les photos (début → fin du mouvement) en fondu, comme une démo animée */
function startPhotoCycle(box){
  stopPhotoCycle();
  var imgs=box.querySelectorAll("img");if(imgs.length<2)return;
  try{if(matchMedia("(prefers-reduced-motion: reduce)").matches)return;}catch(e){}
  var i=0;
  photoCycleT=setInterval(function(){
    if(!box.isConnected){stopPhotoCycle();return;}
    imgs[i].classList.remove("on");i=(i+1)%imgs.length;imgs[i].classList.add("on");
  },1300);
}

/* programme running progressif : 10 semaines, 3 séances identiques par semaine */
var RUNNING_PROGRAM=[
 {goal:"8 x (1 min course / 1 min 30 marche)"},
 {goal:"6 x (1 min 30 course / 1 min marche)"},
 {goal:"5 x (2 min course / 1 min marche)"},
 {goal:"4 x (3 min course / 1 min 30 marche)"},
 {goal:"3 x (5 min course / 2 min marche)"},
 {goal:"2 x (8 min course / 2 min marche)"},
 {goal:"20 min de course continue"},
 {goal:"25 min de course continue (≈ 4 km)"},
 {goal:"30 min de course continue (≈ 5 km)"},
 {goal:"35-40 min de course, viser 6-8 km"}
];

var MENU=[
 ["Lundi",[["Petit-déjeuner","Avoine 50 g + skyr 200 g + banane","≈ 400 kcal · 25 g prot."],["Déjeuner","Riz 70 g + crevettes 180 g (airfryer) + poivrons + curry","≈ 550 kcal · 42 g prot."],["Dîner","Pommes de terre 300 g crues (airfryer) + 3 œufs + haricots verts","≈ 560 kcal · 28 g prot."],["Collation","Skyr 150 g + pomme + shake whey 30 g","≈ 280 kcal · 40 g prot."]]],
 ["Mardi",[["Petit-déjeuner","2 œufs + pommes de terre 200 g crues (airfryer) + fruit","≈ 430 kcal · 20 g prot."],["Déjeuner","Riz 70 g + thon 120 g + courgette (airfryer) + tomate","≈ 520 kcal · 38 g prot."],["Dîner","Lentilles 220 g + riz 50 g + 2 œufs + légumes (airfryer)","≈ 620 kcal · 34 g prot."],["Collation","Fromage blanc 200 g + banane + shake whey 30 g","≈ 300 kcal · 42 g prot."]]],
 ["Mercredi",[["Petit-déjeuner","Avoine 50 g + lait + skyr 150 g + pomme","≈ 430 kcal · 28 g prot."],["Déjeuner","Pommes de terre 350 g crues (airfryer) + thon 120 g + crudités","≈ 500 kcal · 35 g prot."],["Dîner","Riz 70 g + tofu 200 g (airfryer) + pois chiches 100 g + sauce tomate","≈ 610 kcal · 31 g prot."],["Collation","Skyr 200 g + shake whey 30 g","≈ 250 kcal · 46 g prot."]]],
 ["Jeudi",[["Petit-déjeuner","3 œufs + banane + skyr 100 g","≈ 430 kcal · 32 g prot."],["Déjeuner","Riz 70 g + crevettes 180 g (airfryer) + courgettes + curry","≈ 540 kcal · 43 g prot."],["Dîner","Pommes de terre 300 g crues (airfryer) + lentilles 200 g + 2 œufs","≈ 610 kcal · 33 g prot."],["Collation","Fromage blanc 200 g + pomme + shake whey 30 g","≈ 290 kcal · 41 g prot."]]],
 ["Vendredi",[["Petit-déjeuner","Avoine 50 g + skyr 200 g + banane","≈ 400 kcal · 25 g prot."],["Déjeuner","Riz 70 g + thon 120 g + poivrons (airfryer) + tomate","≈ 530 kcal · 38 g prot."],["Dîner","Pommes de terre 300 g crues (airfryer) + 3 œufs + brocolis","≈ 560 kcal · 30 g prot."],["Collation","Skyr 150 g + fruit + shake whey 30 g","≈ 280 kcal · 40 g prot."]]],
 ["Samedi",[["Petit-déjeuner","2 œufs + avoine 40 g + banane","≈ 410 kcal · 21 g prot."],["Déjeuner","Riz 70 g + crevettes 180 g (airfryer) + lait de coco léger","≈ 590 kcal · 42 g prot."],["Dîner","Pois chiches 200 g croustillants (airfryer) + pommes de terre 250 g crues (airfryer) + 2 œufs","≈ 650 kcal · 30 g prot."],["Collation","Fromage blanc 200 g + pomme + shake whey 30 g","≈ 290 kcal · 41 g prot."]]],
 ["Dimanche",[["Petit-déjeuner","Avoine 50 g + lait + skyr 150 g + banane","≈ 450 kcal · 28 g prot."],["Déjeuner","Pommes de terre 350 g crues (airfryer) + thon 120 g + haricots verts","≈ 500 kcal · 37 g prot."],["Dîner","Riz 70 g + lentilles 200 g + 2 œufs + courgettes (airfryer)","≈ 620 kcal · 34 g prot."],["Collation","Skyr 150 g + fruit + shake whey 30 g","≈ 270 kcal · 40 g prot."]]]
];

/* liste de courses Migros par défaut : sans viande (œufs, laitiers, poisson), orientée protéines,
   alignée sur le menu de la semaine */
var DEFAULT_GROCERY={
 once:[
  {n:"Riz complet 1 kg",done:false},
  {n:"Lentilles vertes 500 g",done:false},
  {n:"Pois chiches en boîte ×4",done:false},
  {n:"Thon au naturel en boîte ×6",done:false},
  {n:"Flocons d'avoine 1 kg",done:false},
  {n:"Graines de chia 200 g",done:false},
  {n:"Graines de tournesol/courge 200 g",done:false},
  {n:"Huile de colza/tournesol 1 L",done:false},
  {n:"Beurre de cacahuète",done:false},
  {n:"Tomates pelées/passata ×4",done:false},
  {n:"Bouillon de légumes",done:false},
  {n:"Thé vert",done:false},
  {n:"Épices (piment, paprika fumé)",done:false},
  {n:"Whey protéine (native/standard)",done:false},
  {n:"Boisson protéinée UHT ×2",done:false}
 ],
 weekly:[
  {n:"Œufs (boîte de 12) ×2",done:false},
  {n:"Crevettes surgelées 500 g",done:false},
  {n:"Tofu nature 300 g ×2",done:false},
  {n:"Pommes de terre 2.5 kg",done:false},
  {n:"Lait écrémé 2 L",done:false},
  {n:"Skyr/yogourt protéiné 500 g ×2",done:false},
  {n:"Cottage cheese 250 g ×2",done:false},
  {n:"Quark maigre 500 g ×2",done:false},
  {n:"Fromage râpé allégé 150 g",done:false},
  {n:"Pain complet",done:false},
  {n:"Légumes verts à volume (brocoli, épinards, courgettes, ~2 kg)",done:false},
  {n:"Fruits à faible IG (pommes, baies, ~1 kg)",done:false}
 ]
};
var GROCERY_VERSION=6;
/* noms de tous les articles par défaut v1 (retirés ou renommés en v2) : jamais réinjectés
   comme "ajout personnel" lors de la migration, même s'ils n'ont plus de correspondance exacte
   dans DEFAULT_GROCERY */
var GROCERY_RETIRED_V1={
 "Riz M-Budget 1 kg":1,"Flocons d'avoine 1 kg":1,"Lentilles corail 500 g":1,"Lentilles vertes 500 g":1,
 "Pois chiches en boîte ×4":1,"Haricots rouges en boîte ×3":1,"Haricots noirs en boîte ×2":1,"Haricots blancs en boîte ×2":1,
 "Huile (tournesol/olive) 1 L":1,
 "Beurre de cacahuète":1,"Tomates pelées/passata ×4":1,"Bouillon de légumes":1,
 "Lait 2 L":1,"Skyr/yogourt protéiné 500 g ×2":1,"Fromage râpé 150 g":1,"Œufs (boîte de 12)":1,
 "Tofu nature 300 g ×2":1,"Cottage cheese 250 g":1,"Quark maigre 500 g":1,"Pain":1,"Beurre/margarine":1,
 "Légumes frais (~1.5 kg)":1,"Fruits (~1 kg)":1,"Poudre de protéine végétale":1
};
function migrateGrocerySection(defaultList,oldList){
  var doneByName={};
  (oldList||[]).forEach(function(x){doneByName[String(x.n).trim().toLowerCase()]=!!x.done;});
  var fresh=defaultList.map(function(x){
    var key=x.n.trim().toLowerCase();
    return {n:x.n,done:doneByName.hasOwnProperty(key)?doneByName[key]:false};
  });
  var newNames={};defaultList.forEach(function(x){newNames[x.n.trim().toLowerCase()]=1;});
  (oldList||[]).forEach(function(x){
    var key=String(x.n).trim().toLowerCase();
    if(newNames[key])return; /* déjà repris ci-dessus */
    if(GROCERY_RETIRED_V1[x.n])return; /* ancien article par défaut volontairement retiré */
    fresh.push({n:x.n,done:!!x.done}); /* ajout personnel de l'utilisateur : conservé */
  });
  return fresh;
}
function migrateGroceryList(old){
  return {
    once:migrateGrocerySection(DEFAULT_GROCERY.once,old&&old.once),
    weekly:migrateGrocerySection(DEFAULT_GROCERY.weekly,old&&old.weekly)
  };
}
/* base locale d'aliments bruts courants (kcal/protéines/glucides/lipides pour 100 g) —
   consultable instantanément sans réseau, complète OpenFoodFacts qui couvre mal le non-transformé */
var LOCAL_FOODS=[
 /* achats Coop (ticket du 26.09.26) : valeurs pour 100 g ou 100 ml, q = portion habituelle en g */
 {n:"Isey Skyr framboise-grenade sans lactose (pot 170 g)",kcal:76,p:9.5,c:4.4,f:2.2,q:170,o:3,b:1,a:"skyr isey emmi framboise grenade sans lactose lactose free pot yogourt yaourt"},
 {n:"Isey Skyr myrtille-framboise (pot 170 g)",kcal:80,p:9.6,c:10,f:0.2,q:170,o:3,b:1,a:"skyr isey emmi myrtille framboise pot yogourt yaourt"},
 {n:"Rama Cremefine 7 % (crème à cuisiner)",kcal:89,p:1.1,c:4.8,f:7.4,o:3,b:1,a:"creme cuisine cremefine rama sauce"},
 {n:"Gruyère AOP râpé (Coop)",kcal:396,p:27,c:0.4,f:32,q:30,o:3,b:1,a:"gruyere fromage rape coop"},
 {n:"Œuf entier cru (Prix Garantie, 1 œuf ≈ 55 g)",kcal:143,p:12.6,c:0.7,f:9.5,q:55,o:3,b:1,a:"oeuf oeufs œufs coop prix garantie omelette"},
 {n:"Banane bio Max Havelaar (1 banane ≈ 120 g)",kcal:89,p:1.1,c:20,f:0.3,q:120,o:3,b:1,a:"banane bananes bio max havelaar coop fruit"},
 {n:"Champignons de Paris frais (Prix Garantie)",kcal:22,p:3.1,c:0.5,f:0.3,o:3,b:1,a:"champignon champignons paris coop prix garantie"},
 {n:"familia High Protein Beeren (müesli, portion 50 g)",kcal:435,p:22,c:50,f:14,q:50,o:3,b:1,a:"familia muesli müesli protein proteine beeren baies fruits rouges cereales"},
 {n:"Truite (cuite)",kcal:168,p:24,c:0,f:7.5},
 {n:"Saumon (cuit)",kcal:208,p:20,c:0,f:13},
 {n:"Thon (au naturel, égoutté)",kcal:116,p:26,c:0,f:1},
 {n:"Thon (cru)",kcal:144,p:23,c:0,f:5},
 {n:"Cabillaud (cuit)",kcal:105,p:23,c:0,f:1},
 {n:"Crevettes (cuites)",kcal:99,p:24,c:0.2,f:0.3},
 {n:"Sardines (à l'huile, égouttées)",kcal:208,p:25,c:0,f:11},
 {n:"Perche du lac (cuite)",kcal:100,p:21,c:0,f:1.3},
 {n:"Filet de perche pané (cuit)",kcal:220,p:16,c:15,f:11},
 {n:"Pomme de terre (cuite, nature)",kcal:87,p:2,c:20,f:0.1},
 {n:"Pommes de terre crues (poids cru, sans huile)",kcal:77,p:2,c:17,f:0.1,o:3,a:"patate patates pdt cru crue crues airfryer airfrayer air fryer vapeur four"},
 {n:"Pommes de terre crues + 1 c. à café d'huile (poids cru, airfryer)",kcal:90,p:2,c:17,f:1.5,o:2,a:"patate patates pdt cru crue crues airfryer airfrayer air fryer huile"},
 {n:"Patate douce crue (poids cru)",kcal:86,p:1.6,c:20,f:0.1,a:"patate douce cru crue crues airfryer airfrayer"},
 {n:"Pommes de terre au airfryer (sans huile)",kcal:100,p:2.5,c:22,f:0.1,a:"patate patates pdt airfryer airfrayer air fryer friteuse sans huile quartiers"},
 {n:"Pommes de terre au airfryer (1 c. à café d'huile)",kcal:118,p:2.5,c:22,f:2,a:"patate patates pdt airfryer airfrayer air fryer friteuse huile quartiers rissolees"},
 {n:"Frites maison au airfryer",kcal:135,p:3,c:25,f:3,a:"patate patates frite airfryer airfrayer air fryer friteuse"},
 {n:"Patate douce au airfryer",kcal:110,p:2,c:25,f:0.3,a:"patate douce airfryer airfrayer air fryer friteuse"},
 {n:"Pomme de terre (frites au four)",kcal:165,p:3,c:26,f:5},
 {n:"Riz blanc (cuit)",kcal:130,p:2.7,c:28,f:0.3},
 {n:"Riz complet (cuit)",kcal:123,p:2.6,c:26,f:1},
 {n:"Pâtes (cuites)",kcal:131,p:5,c:25,f:1.1},
 {n:"Pain blanc",kcal:265,p:9,c:49,f:3.2},
 {n:"Pain complet",kcal:247,p:13,c:41,f:3.4},
 {n:"Quinoa (cuit)",kcal:120,p:4.4,c:21,f:1.9},
 {n:"Avoine (flocons, crus)",kcal:389,p:17,c:66,f:7},
 {n:"Semoule / couscous (cuit)",kcal:112,p:3.8,c:23,f:0.2},
 {n:"Lentilles (cuites)",kcal:116,p:9,c:20,f:0.4},
 {n:"Pois chiches (cuits)",kcal:164,p:9,c:27,f:2.6},
 {n:"Haricots rouges (cuits)",kcal:127,p:8.7,c:23,f:0.5},
 {n:"Tofu nature",kcal:76,p:8,c:1.9,f:4.8},
 {n:"Tofu fumé",kcal:150,p:16,c:1.5,f:9},
 {n:"Tempeh",kcal:192,p:20,c:7.6,f:11},
 {n:"Seitan",kcal:370,p:75,c:14,f:1.9},
 {n:"Edamame (cuits)",kcal:121,p:12,c:9,f:5},
 {n:"Protéines de soja texturées (sèches)",kcal:330,p:50,c:30,f:1},
 {n:"Haricots noirs (cuits)",kcal:132,p:8.9,c:24,f:0.5},
 {n:"Lentilles corail (cuites)",kcal:116,p:9,c:20,f:0.4},
 {n:"Brocoli (cuit)",kcal:35,p:2.4,c:7,f:0.4},
 {n:"Carotte (crue)",kcal:41,p:0.9,c:10,f:0.2},
 {n:"Courgette (cuite)",kcal:17,p:1.2,c:3.1,f:0.3},
 {n:"Tomate",kcal:18,p:0.9,c:3.9,f:0.2},
 {n:"Salade verte",kcal:15,p:1.4,c:2.9,f:0.2},
 {n:"Poivron",kcal:31,p:1,c:6,f:0.3},
 {n:"Oignon",kcal:40,p:1.1,c:9.3,f:0.1},
 {n:"Haricots verts (cuits)",kcal:35,p:1.8,c:7,f:0.2},
 {n:"Épinards (cuits)",kcal:23,p:2.9,c:3.8,f:0.4},
 {n:"Champignons de Paris",kcal:22,p:3.1,c:3.3,f:0.3},
 {n:"Concombre",kcal:15,p:0.7,c:3.6,f:0.1},
 {n:"Chou-fleur (cuit)",kcal:25,p:1.9,c:5,f:0.3},
 {n:"Petits pois (cuits)",kcal:81,p:5.4,c:14,f:0.4},
 {n:"Maïs (en grains)",kcal:96,p:3.4,c:19,f:1.5},
 {n:"Avocat",kcal:160,p:2,c:8.5,f:15},
 {n:"Pomme",kcal:52,p:0.3,c:14,f:0.2},
 {n:"Banane",kcal:89,p:1.1,c:23,f:0.3},
 {n:"Orange",kcal:47,p:0.9,c:12,f:0.1},
 {n:"Fraises",kcal:32,p:0.7,c:7.7,f:0.3},
 {n:"Raisin",kcal:69,p:0.7,c:18,f:0.2},
 {n:"Kiwi",kcal:61,p:1.1,c:15,f:0.5},
 {n:"Poire",kcal:57,p:0.4,c:15,f:0.1},
 {n:"Pastèque",kcal:30,p:0.6,c:8,f:0.2},
 {n:"Myrtilles",kcal:57,p:0.7,c:14,f:0.3},
 {n:"Ananas",kcal:50,p:0.5,c:13,f:0.1},
 {n:"Mangue",kcal:60,p:0.8,c:15,f:0.4},
 {n:"Lait entier",kcal:61,p:3.2,c:4.8,f:3.3},
 {n:"Lait écrémé",kcal:35,p:3.4,c:5,f:0.1},
 {n:"Yogourt nature",kcal:61,p:3.5,c:4.7,f:3.3},
 {n:"Skyr",kcal:63,p:11,c:4,f:0.2},
 {n:"Fromage blanc 20%",kcal:90,p:8,c:4,f:4.5},
 {n:"Œuf (cuit)",kcal:155,p:13,c:1.1,f:11},
 {n:"Blanc d'œuf",kcal:52,p:11,c:0.7,f:0.2},
 {n:"Quark / séré maigre",kcal:67,p:12,c:4,f:0.2},
 {n:"Whey protéine (poudre)",kcal:380,p:75,c:8,f:6},
 {n:"Emmental",kcal:380,p:28,c:0,f:30},
 {n:"Mozzarella",kcal:280,p:22,c:2.2,f:21},
 {n:"Feta",kcal:264,p:14,c:4,f:21},
 {n:"Gruyère",kcal:396,p:27,c:0.4,f:32},
 {n:"Cottage cheese",kcal:98,p:11,c:3.4,f:4.3},
 {n:"Amandes",kcal:579,p:21,c:22,f:50},
 {n:"Noix",kcal:654,p:15,c:14,f:65},
 {n:"Cacahuètes",kcal:567,p:26,c:16,f:49},
 {n:"Beurre de cacahuète",kcal:588,p:25,c:20,f:50},
 {n:"Huile d'olive",kcal:884,p:0,c:0,f:100},
 {n:"Beurre",kcal:717,p:0.9,c:0.1,f:81},
 {n:"Chocolat noir 70%",kcal:598,p:7.8,c:46,f:43},
 {n:"Miel",kcal:304,p:0.3,c:82,f:0},
 {n:"Confiture",kcal:250,p:0.3,c:62,f:0.1},
 {n:"Houmous",kcal:166,p:8,c:14,f:9.6}
];

var state={
  suggest:0, selDay:0, sessionCategory:"muscu",
  profile:{start:103,target:85,cal:2400,startDate:START_DATE},
  weightHistory:[{d:START_DATE,w:103}],
  bodyComp:[],
  program:JSON.parse(JSON.stringify(DEFAULT_PROGRAM.concat(HOME_PROGRAM))),
  runProg:{week:1,done:[false,false,false],weekStartDate:today()},
  session:{date:today(),marks:{},excluded:{},extra:{}},
  sessions:[],
  perf:{},
  meals:[], mealHistory:[], foodFavorites:[], lastDay:today(),
  runs:[], steps:[], energy:[], water:{date:today(),ml:0},
  macro:{carbs:265,protein:155,fat:80}, waterGoal:3,
  fast:{active:false,start:null,hours:16},
  groceryList:JSON.parse(JSON.stringify(DEFAULT_GROCERY)),
  selEx:null,
  customBarcodes:{},
  planSwap:{}, planDone:{}
};
var cloudUser=null, toastT=null, cloudBackupT=null, autoRestoreAttempted=false;
var restEnd=0, restBeeped=false, undoBuf=null, snackCb=null, snackT=null;
var editDayId=null, editDayEx=[];
var guidedFrom="session", guidedIndex=0, guidedOpen=false, guidedDayId=null, guidedStartTimes={};

/* helpers */
function today(){var d=new Date();return d.getFullYear()+"-"+pad(d.getMonth()+1)+"-"+pad(d.getDate());}
function pad(n){return String(n).padStart(2,"0");}
function fmtDate(s){return new Date(s+"T12:00:00").toLocaleDateString("fr-CH",{day:"numeric",month:"short"});}
function num(n){n=Number(n);return (Math.round(n*10)/10).toString();}
function fr(n){return num(n).replace(".",",");} /* affichage à la française : 2,8 kg */
function fnum(x,d){x=Number(String(x==null?"":x).replace(",","."));return isFinite(x)?x:(d||0);}
function esc(s){return String(s==null?"":s).replace(/[&<>"']/g,function(c){return {"&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;","'":"&#39;"}[c];});}
function lsGet(k){try{return localStorage.getItem(k);}catch(e){return null;}}
function lsSet(k,v){try{localStorage.setItem(k,v);}catch(e){}}
function lsDel(k){try{localStorage.removeItem(k);}catch(e){}}
function $(id){return document.getElementById(id);}
function toast(m){var el=$("toast");el.textContent=m;el.hidden=false;clearTimeout(toastT);toastT=setTimeout(function(){el.hidden=true;},2000);}

/* écriture qui dit si elle a réussi : lsSet avale les erreurs, dont « stockage plein » */
function lsTrySet(k,v){try{localStorage.setItem(k,v);return true;}catch(e){return false;}}
var storageWarnT=0;
function save(){
  var payload;try{payload=JSON.stringify(state);}catch(e){return;}
  var ok=lsTrySet(KEY,payload);
  /* stockage plein : on libère la copie de secours (identique) puis on réessaie */
  if(!ok){lsDel(BACKUPKEY);ok=lsTrySet(KEY,payload);}
  if(ok){if(!lsTrySet(BACKUPKEY,payload))lsDel(BACKUPKEY);}
  else if(Date.now()-storageWarnT>600000){
    storageWarnT=Date.now();
    snack("Mémoire de l'app pleine : ta dernière saisie n'est pas enregistrée sur le téléphone. Exporte tes données.","Exporter",exportData,12000);
  }
  cloudAutoBackup();
}
function isLocalStateEmpty(){
  return !state.sessions.length&&!state.meals.length&&!state.runs.length&&state.weightHistory.length<=1;
}
/* dernière sauvegarde (cloud ou export) : rappel si plus de 7 jours, les données ne vivent sinon que dans le téléphone */
function markBackup(){lsSet("evoLastBackup",String(Date.now()));}
function daysSinceBackup(){var t=Number(lsGet("evoLastBackup"))||0;return t?Math.floor((Date.now()-t)/864e5):null;}
function backupLabel(){var n=daysSinceBackup();return n==null?"jamais":(n===0?"aujourd'hui":(n===1?"hier":"il y a "+n+" jours"));}
function renderBackupNag(){
  var box=$("backupNag");if(!box)return;
  var n=daysSinceBackup(),snooze=Number(lsGet("evoNagSnooze"))||0,enough=state.sessions.length+state.weightHistory.length+state.meals.length>=5;
  if(!enough||(n!=null&&n<7)||Date.now()<snooze){box.innerHTML="";return;}
  box.innerHTML='<div class="backup-nag"><span>'+(n==null?"Tes données ne sont pas encore sauvegardées":"Dernière sauvegarde : "+backupLabel())+'</span>'
    +'<button data-act="exportNag">Exporter</button><button class="later" data-act="nagLater" aria-label="Plus tard">✕</button></div>';
}
function cloudAutoBackup(immediate){
  if(!cloudUser||!window.firebase)return;
  clearTimeout(cloudBackupT);
  var push=function(){firebase.firestore().collection("users").doc(cloudUser.uid).set({appData:state,updatedAt:Date.now()},{merge:true}).then(markBackup).catch(function(){});};
  if(immediate)push();else cloudBackupT=setTimeout(push,2500);
}
function load(){
  var raw=lsGet(KEY),loaded=false;
  if(raw){
    try{var p=JSON.parse(raw);if(p&&typeof p==="object"){merge(p);loaded=true;}}
    catch(e){}
  }
  if(!loaded){
    var backup=lsGet(BACKUPKEY);
    if(backup){
      try{var b=JSON.parse(backup);if(b&&typeof b==="object"){merge(b);loaded=true;lsSet(KEY,backup);}}
      catch(e){}
    }
  }
  if(!loaded){
    var old=lsGet(OLDKEY);
    if(old){try{var o=JSON.parse(old);
      if(o&&Array.isArray(o.weightHistory)&&o.weightHistory.length)state.weightHistory=o.weightHistory.slice();
      if(o&&o.profile)state.profile=Object.assign(state.profile,o.profile);
    }catch(e){}}
  }
}
function merge(p){
  state.profile=Object.assign(state.profile,p.profile||{});
  if(Array.isArray(p.weightHistory)&&p.weightHistory.length)state.weightHistory=p.weightHistory;
  if(Array.isArray(p.bodyComp))state.bodyComp=p.bodyComp;
  if(Array.isArray(p.program)&&p.program.length)state.program=p.program;
  if(Array.isArray(p.sessions))state.sessions=p.sessions;
  if(p.perf&&typeof p.perf==="object")state.perf=p.perf;
  if(Array.isArray(p.meals))state.meals=p.meals;
  if(Array.isArray(p.mealHistory))state.mealHistory=p.mealHistory;
  if(Array.isArray(p.foodFavorites))state.foodFavorites=p.foodFavorites;
  if(Array.isArray(p.runs))state.runs=p.runs;
  if(Array.isArray(p.steps))state.steps=p.steps;
  if(Array.isArray(p.energy))state.energy=p.energy;
  if(p.water&&typeof p.water==="object")state.water=p.water;
  if(p.macro&&typeof p.macro==="object")state.macro=Object.assign(state.macro,p.macro);
  if(isFinite(Number(p.waterGoal)))state.waterGoal=Number(p.waterGoal);
  if(p.fast&&typeof p.fast==="object")state.fast=Object.assign(state.fast,p.fast);
  if(p.groceryList&&typeof p.groceryList==="object"&&Array.isArray(p.groceryList.once)&&Array.isArray(p.groceryList.weekly))state.groceryList=p.groceryList;
  if(p.customBarcodes&&typeof p.customBarcodes==="object")state.customBarcodes=p.customBarcodes;
  if(typeof p.groceryVersion==="number")state.groceryVersion=p.groceryVersion;
  if(typeof p.programVersion==="number")state.programVersion=p.programVersion;
  if(typeof p.macroVersion==="number")state.macroVersion=p.macroVersion;
  if(p.planSwap&&typeof p.planSwap==="object")state.planSwap=p.planSwap;
  if(p.restPref&&typeof p.restPref==="object")state.restPref=p.restPref;
  if(Array.isArray(p.measures))state.measures=p.measures;
  if(Array.isArray(p.waterHistory))state.waterHistory=p.waterHistory;
  if(typeof p.soundOn==="boolean")state.soundOn=p.soundOn;
  if(p.planDone&&typeof p.planDone==="object")state.planDone=p.planDone;
  if(typeof p.suggest==="number")state.suggest=p.suggest;
  if(p.session&&typeof p.session==="object")state.session=p.session;
  if(p.lastDay)state.lastDay=p.lastDay;
  if(typeof p.sessionCategory==="string")state.sessionCategory=p.sessionCategory;
  if(typeof p.sessionAutoDay==="string")state.sessionAutoDay=p.sessionAutoDay;
  if(p.runProg&&typeof p.runProg==="object")state.runProg=p.runProg;
}
function normalizeState(){
  if(!/^\d{4}-\d{2}-\d{2}$/.test(state.profile.startDate||""))state.profile.startDate=START_DATE;
  if(!Array.isArray(state.weightHistory))state.weightHistory=[];
  state.weightHistory=state.weightHistory.filter(function(x){return x&&x.d&&isFinite(Number(x.w));}).map(function(x){return {d:x.d,w:Number(x.w)};}).sort(function(a,b){return a.d.localeCompare(b.d);});
  if(!state.weightHistory.length)state.weightHistory=[{d:state.profile.startDate,w:Number(state.profile.start||103)}];
  if(!Array.isArray(state.bodyComp))state.bodyComp=[];
  state.bodyComp=state.bodyComp.filter(function(x){return x&&x.d&&(isFinite(Number(x.fat))||isFinite(Number(x.muscle)));}).map(function(x){return {d:x.d,fat:isFinite(Number(x.fat))?Number(x.fat):null,muscle:isFinite(Number(x.muscle))?Number(x.muscle):null};}).sort(function(a,b){return a.d.localeCompare(b.d);});
  if(!Array.isArray(state.runs))state.runs=[];
  state.runs.forEach(function(r){if(!isFinite(Number(r.kcal))||r.kcal<=0)r.kcal=estimateRunKcal(Number(r.dist||0),Number(r.dur||0));});
  if(!Array.isArray(state.meals))state.meals=[];
  if(!Array.isArray(state.mealHistory))state.mealHistory=[];
  if(!Array.isArray(state.foodFavorites))state.foodFavorites=[];
  if(!state.macro)state.macro={carbs:265,protein:155,fat:80};
  state.macro={carbs:fnum(state.macro.carbs,265),protein:fnum(state.macro.protein,155),fat:fnum(state.macro.fat,80)};
  /* objectif protéines ramené à 155 g (alimentation sans viande, réaliste et suffisant pour
     garder le muscle en perte de poids) ; les 25 g retirés passent en glucides (même énergie) */
  if(state.macroVersion!==2){
    if(state.macro.protein>155){state.macro.carbs+=Math.round((state.macro.protein-155));state.macro.protein=155;}
    state.macroVersion=2;save();
  }
  state.waterGoal=Number(state.waterGoal||3);if(state.waterGoal<0.5||state.waterGoal>8)state.waterGoal=3;
  if(!state.fast)state.fast={active:false,start:null,hours:16};
  state.fast.hours=Number(state.fast.hours||16);
  if(!state.groceryList||!Array.isArray(state.groceryList.once)||!Array.isArray(state.groceryList.weekly))state.groceryList=JSON.parse(JSON.stringify(DEFAULT_GROCERY));
  if(state.groceryVersion!==GROCERY_VERSION){state.groceryList=migrateGroceryList(state.groceryList);state.groceryVersion=GROCERY_VERSION;save();}
  if(state.lastDay==null)state.lastDay=today();
  if(!Array.isArray(state.program)||!state.program.length)state.program=JSON.parse(JSON.stringify(DEFAULT_PROGRAM));
  if(!state.program.some(function(p){return p.cat==="maison";})){
    state.program=state.program.concat(JSON.parse(JSON.stringify(HOME_PROGRAM)));
  }
  /* les icônes des jours sont sauvegardées avec le programme : on reprend celles du code
     pour que les anciennes sauvegardes suivent les changements d'icônes */
  var defIcons={};DEFAULT_PROGRAM.concat(HOME_PROGRAM).forEach(function(d){defIcons[d.id]=d.icon;});
  state.program.forEach(function(p){if(defIcons[p.id])p.icon=defIcons[p.id];});
  /* nouvelle version du programme : les jours par défaut sont remplacés, les jours ajoutés
     par l'utilisateur sont conservés */
  if(state.programVersion!==PROGRAM_VERSION){
    var defDays={};DEFAULT_PROGRAM.concat(HOME_PROGRAM).forEach(function(d){defDays[d.id]=d;});
    state.program=state.program.map(function(p){return defDays[p.id]&&!p.edited?JSON.parse(JSON.stringify(defDays[p.id])):p;});
    var have={};state.program.forEach(function(p){have[p.id]=1;});
    DEFAULT_PROGRAM.concat(HOME_PROGRAM).forEach(function(d){if(!have[d.id])state.program.push(JSON.parse(JSON.stringify(d)));});
    state.programVersion=PROGRAM_VERSION;save();
  }
  if(["muscu","maison","running"].indexOf(state.sessionCategory)<0)state.sessionCategory="muscu";
  if(state.selDay>=state.program.length||state.selDay<0)state.selDay=0;
  if((state.program[state.selDay].cat||"muscu")!==state.sessionCategory&&state.sessionCategory!=="running"){
    var firstIdx=state.program.findIndex(function(p){return (p.cat||"muscu")===state.sessionCategory;});
    if(firstIdx>=0)state.selDay=firstIdx;
  }
  if(!state.runProg||typeof state.runProg!=="object")state.runProg={week:1,done:[false,false,false]};
  state.runProg.week=Math.max(1,Math.min(RUNNING_PROGRAM.length,Math.round(Number(state.runProg.week)||1)));
  if(!Array.isArray(state.runProg.done)||state.runProg.done.length!==3)state.runProg.done=[false,false,false];
  if(!/^\d{4}-\d{2}-\d{2}$/.test(state.runProg.weekStartDate||""))state.runProg.weekStartDate=today();
}
function ensureDay(){
  var d=today();
  if(state.lastDay!==d){
    if(state.meals.length)state.mealHistory.push({date:state.lastDay,meals:state.meals.slice()});
    state.lastDay=d;state.meals=[];state.session={date:d,marks:{},excluded:{},extra:{}};
    state.mealHistory=state.mealHistory.slice(-90);save();
  }
  if(state.session.date!==d){state.session={date:d,marks:{},excluded:{},extra:{}};}
  rollWater();
  if(!state.session.excluded)state.session.excluded={};
  if(!state.session.extra)state.session.extra={};
}
/* nouveau jour : l'eau de la veille part dans l'historique (7 jours affichés sur la page Eau), même si
   le changement de jour est détecté par la page Eau ou un ajout d'eau plutôt que par ensureDay() */
function rollWater(){
  var d=today(),w=state.water;
  if(w&&w.date===d)return false;
  if(w&&w.date&&w.date<d&&Number(w.ml)>0){
    if(!state.waterHistory)state.waterHistory=[];
    if(!state.waterHistory.some(function(x){return x.d===w.date;}))state.waterHistory.push({d:w.date,ml:Number(w.ml)});
    state.waterHistory.sort(function(a,b){return a.d.localeCompare(b.d);});
    state.waterHistory=state.waterHistory.slice(-60);
  }
  state.water={date:d,ml:0};
  return true;
}
/* l'app peut rester ouverte (ou en arrière-plan) après minuit : on bascule sur le nouveau
   jour dès qu'elle redevient visible, sauf pendant une séance guidée en cours */
function checkDayRollover(){
  if(guidedOpen||state.lastDay===today())return;
  ensureDay();save();renderAll();showPage(state.page||"today");
}
/* date locale (AAAA-MM-JJ) d'une séance : s.date est un horodatage ISO en UTC */
function localDay(iso){var d=new Date(iso);if(isNaN(d))return String(iso||"").slice(0,10);return d.getFullYear()+"-"+pad(d.getMonth()+1)+"-"+pad(d.getDate());}
/* jours avec un entraînement : séances (salle/maison) et courses */
function trainingDays(){
  var days={};
  state.sessions.forEach(function(s){if(s.date)days[localDay(s.date)]=true;});
  state.runs.forEach(function(r){if(r.d)days[r.d]=true;});
  for(var pd in (state.planDone||{}))if(state.planDone[pd])days[pd]=true;
  return days;
}
function marksFor(id){if(!state.session.marks[id])state.session.marks[id]={};return state.session.marks[id];}
function excludedFor(id){if(!state.session.excluded[id])state.session.excluded[id]=[];return state.session.excluded[id];}
function extraFor(id){if(!state.session.extra[id])state.session.extra[id]=[];return state.session.extra[id];}
function muscuProgram(){return state.program.filter(function(p){return (p.cat||"muscu")==="muscu";});}
function activeExercises(p){
  var exc=excludedFor(p.id),ex=p.ex.filter(function(e){return exc.indexOf(e.n)<0;});
  return ex.concat(extraFor(p.id));
}
function lastWeight(name){var a=state.perf[name];return a&&a.length?Number(a[a.length-1].w):0;}
function latestBody(){var a=state.weightHistory;return a.length?Number(a[a.length-1].w):Number(state.profile.start);}
/* dépense énergétique estimée (kcal = MET × poids(kg) × durée(h)), méthode standard Compendium of Physical Activities */
function estimateSessionKcal(cat,durMin){
  var met=cat==="maison"?6.8:5.0; /* séances maison = souvent circuit/HIIT, plus intense que la musculation classique en salle */
  return Math.max(1,Math.round(met*latestBody()*(durMin/60)));
}
function estimateRunKcal(distKm,durMin){
  var w=latestBody();
  if(distKm>0)return Math.max(1,Math.round(distKm*w*1.036)); /* coût énergétique de la course : ~1.036 kcal/kg/km, quasi indépendant de l'allure */
  if(durMin>0)return Math.max(1,Math.round(7*w*(durMin/60))); /* repli si distance inconnue : MET 7 (course modérée) */
  return 0;
}
/* ===== Coach Claude : discussion sur l'Accueil pour noter repas, eau, poids, pas =====
   Modèle léger (Haiku 4.5, ~0,1 centime par message). La clé API reste sur ce téléphone (evoClaudeKey),
   elle n'est ni exportée ni synchronisée. Le SDK officiel n'est chargé qu'au premier message. */
var CL_MODEL="claude-haiku-4-5",clBusy=false,clSdk=null,clPhoto=null; /* clPhoto = {b64, thumb} en attente d'envoi */
/* photo réduite à 1024 px max en JPEG : ~1 200 tokens (≈ 0,1 centime), largement assez pour reconnaître un plat ou lire une étiquette */
function clShrink(file,max,q){
  return new Promise(function(ok,ko){
    var url=URL.createObjectURL(file),img=new Image();
    img.onload=function(){
      var r=Math.min(1,max/Math.max(img.naturalWidth,img.naturalHeight)),c=document.createElement("canvas");
      c.width=Math.max(1,Math.round(img.naturalWidth*r));c.height=Math.max(1,Math.round(img.naturalHeight*r));
      c.getContext("2d").drawImage(img,0,0,c.width,c.height);URL.revokeObjectURL(url);ok(c.toDataURL("image/jpeg",q));
    };
    img.onerror=function(){URL.revokeObjectURL(url);ko(new Error("image"));};
    img.src=url;
  });
}
function clPickPhoto(file){
  if(!file)return;
  Promise.all([clShrink(file,1024,0.8),clShrink(file,240,0.6)]).then(function(a){
    clPhoto={b64:a[0].split(",")[1],thumb:a[1]};renderClPhoto();try{$("clInput").focus();}catch(e){}
  }).catch(function(){toast("Photo illisible, essaie une autre");});
}
function renderClPhoto(){
  var el=$("clPhotoPrev");if(!el)return;
  el.hidden=!clPhoto;clSyncSend();
  el.innerHTML=clPhoto?'<img src="'+clPhoto.thumb+'" alt=""><span></span><button data-act="clPhotoDel" aria-label="Retirer la photo"><svg class="ic-s" aria-hidden="true"><use href="#i-xmark"/></svg></button>':"";
}
function clKey(){return lsGet("evoClaudeKey")||"";}
function clHist(){try{var a=JSON.parse(lsGet("evoClaudeChat")||"[]");return Array.isArray(a)?a:[];}catch(e){return [];}}
function clSaveHist(a){lsSet("evoClaudeChat",JSON.stringify(a.slice(-40)));}
function clMonth(){return today().slice(0,7);}
function clCost(){try{var c=JSON.parse(lsGet("evoClaudeCost")||"{}");return c.m===clMonth()?Number(c.usd)||0:0;}catch(e){return 0;}}
function clAddCost(u){if(!u)return;var usd=clCost()+(Number(u.input_tokens||0)*1+Number(u.output_tokens||0)*5)/1e6;lsSet("evoClaudeCost",JSON.stringify({m:clMonth(),usd:usd}));}
var CL_TYPES=["Petit-déjeuner","Déjeuner","Dîner","Collation"];
var CL_TOOLS=[
  {name:"add_meal",description:"Ajoute un aliment ou un repas au journal du jour. Estime les valeurs nutritionnelles pour la quantité réellement mangée (pas pour 100 g). Un appel par aliment distinct.",
    input_schema:{type:"object",properties:{name:{type:"string",description:"Nom court en français, ex. « Skyr nature Migros »"},qty_g:{type:"number",description:"Quantité mangée en grammes"},kcal:{type:"number"},protein:{type:"number",description:"Protéines en g"},carbs:{type:"number",description:"Glucides en g"},fat:{type:"number",description:"Lipides en g"},type:{type:"string",enum:CL_TYPES,description:"Omettre pour choisir selon l'heure"}},required:["name","qty_g","kcal","protein","carbs","fat"]}},
  {name:"delete_last_meal",description:"Supprime le dernier aliment ajouté aujourd'hui (correction d'une erreur).",input_schema:{type:"object",properties:{}}},
  {name:"add_water",description:"Ajoute de l'eau bue (ou en retire avec une valeur négative).",input_schema:{type:"object",properties:{ml:{type:"number"}},required:["ml"]}},
  {name:"log_weight",description:"Enregistre la pesée du jour.",input_schema:{type:"object",properties:{kg:{type:"number"}},required:["kg"]}},
  {name:"log_steps",description:"Enregistre le nombre total de pas du jour (remplace la valeur existante).",input_schema:{type:"object",properties:{steps:{type:"integer"}},required:["steps"]}},
  {name:"log_measures",description:"Enregistre le tour de taille et/ou de hanches du jour, en cm.",input_schema:{type:"object",properties:{waist_cm:{type:"number"},hips_cm:{type:"number"}}}},
  {name:"get_day_summary",description:"Relit le bilan à jour de la journée (repas, totaux, eau, pas, poids).",input_schema:{type:"object",properties:{}}},
  {name:"get_history",description:"Historique sur N jours : poids et mensurations, séances, courses et marches, eau, pas, calories et protéines par jour, records de charge par exercice, jours du programme. À utiliser pour toute question sur la progression, les moyennes ou les records.",input_schema:{type:"object",properties:{days:{type:"integer",description:"Nombre de jours (7 à 180, 30 par défaut)"}}}},
  {name:"log_workout",description:"Enregistre une séance de musculation faite aujourd'hui avec les charges. Chaque exercice : nom, séries, répétitions, charge en kg (0 si poids du corps).",input_schema:{type:"object",properties:{name:{type:"string",description:"Nom de la séance, ex. « Pectoraux » ; reprends le nom d'un jour du programme s'il correspond"},duration_min:{type:"number"},exercises:{type:"array",items:{type:"object",properties:{name:{type:"string"},sets:{type:"integer"},reps:{type:"integer"},weight_kg:{type:"number"}},required:["name","sets","reps"]}}},required:["exercises"]}},
  {name:"log_run",description:"Enregistre une course ou une marche faite aujourd'hui.",input_schema:{type:"object",properties:{kind:{type:"string",enum:["run","walk"]},distance_km:{type:"number"},duration_min:{type:"number"},treadmill:{type:"boolean"}},required:["kind","distance_km","duration_min"]}},
  {name:"delete_meal",description:"Supprime un aliment précis du jour, par son numéro #n dans la liste des repas. Uniquement si l'utilisateur le demande clairement ; s'il y a un doute sur lequel, demande.",input_schema:{type:"object",properties:{index:{type:"integer",description:"Numéro #n"}},required:["index"]}},
  {name:"update_meal",description:"Corrige un aliment du jour (quantité, valeurs, repas, nom), par son numéro #n. Si seule la quantité change, donne aussi les kcal et macros recalculées.",input_schema:{type:"object",properties:{index:{type:"integer"},name:{type:"string"},qty_g:{type:"number"},kcal:{type:"number"},protein:{type:"number"},carbs:{type:"number"},fat:{type:"number"},type:{type:"string",enum:CL_TYPES}},required:["index"]}},
  {name:"add_grocery",description:"Ajoute des articles à la liste de courses (section « à acheter une fois »).",input_schema:{type:"object",properties:{items:{type:"array",items:{type:"string"}}},required:["items"]}}
];
function clSummary(){
  var td=today(),t={k:0,p:0,c:0,f:0};
  state.meals.forEach(function(m){t.k+=Number(m.kcal||0);t.p+=Number(m.protein||0);t.c+=Number(m.carbs||0);t.f+=Number(m.fat||0);});
  var wml=(state.water&&state.water.date===td)?Number(state.water.ml||0):0;
  var lines=state.meals.map(function(m,i){return "- #"+(i+1)+" "+(m.type||"")+" : "+m.name+(m.menu?"":" "+Math.round(m.qty||100)+" g")+" · "+Math.round(m.kcal||0)+" kcal · "+Math.round(m.protein||0)+" g prot.";});
  var pl=planFor(dowIdx());
  return "Date : "+td+" ("+new Date().toLocaleDateString("fr-CH",{weekday:"long"})+"), heure "+new Date().getHours()+" h\n"
    +"Repas du jour :\n"+(lines.join("\n")||"(aucun)")+"\n"
    +"Totaux : "+Math.round(t.k)+" / "+Number(state.profile.cal||2400)+" kcal · protéines "+Math.round(t.p)+" / "+fnum(state.macro.protein,155)+" g · glucides "+Math.round(t.c)+" / "+fnum(state.macro.carbs,0)+" g · lipides "+Math.round(t.f)+" / "+fnum(state.macro.fat,0)+" g\n"
    +"Reste : "+Math.max(0,Math.round(Number(state.profile.cal||2400)-t.k))+" kcal · "+Math.max(0,Math.round(fnum(state.macro.protein,155)-t.p))+" g de protéines\n"
    +"Eau bue : "+wml+" / "+Math.round(Number(state.waterGoal||3)*1000)+" ml (reste "+Math.max(0,Math.round(Number(state.waterGoal||3)*1000)-wml)+" ml) · Pas : "+stepsOn(td)+" · Dépense estimée : "+dayBurn(td).total+" kcal\n"
    +"Poids actuel : "+fr(latestBody())+" kg (départ "+fr(state.profile.start)+", objectif "+fr(state.profile.target)+")\n"
    +"Programme du jour : "+(pl.kind==="walk"?pl.walk.title:pl.p.name)+(planDoneOn(td)?" (fait)":"");
}
function clRunTool(name,inp){
  inp=inp||{};var td=today();
  switch(name){
    case "add_meal":
      var q=Number(inp.qty_g),k=Number(inp.kcal);
      if(!inp.name||!(q>0&&q<=5000)||!(k>=0&&k<=5000))return "Erreur : valeurs invalides, rien ajouté.";
      var ty=CL_TYPES.indexOf(inp.type)>=0?inp.type:defaultMealTypeByHour();
      addMealObj({name:String(inp.name).slice(0,60),qty:Math.round(q),kcal:Math.round(k),protein:Math.round(fnum(inp.protein,0)*10)/10,carbs:Math.round(fnum(inp.carbs,0)*10)/10,fat:Math.round(fnum(inp.fat,0)*10)/10,type:ty});
      return "Ajouté en "+ty+" (déjà compté dans ces totaux à jour, ne l'ajoute pas une 2e fois) :\n"+clSummary();
    case "delete_last_meal":
      if(!state.meals.length)return "Aucun repas à supprimer aujourd'hui.";
      var rm=state.meals.pop();save();renderMeals();renderToday();
      return "Supprimé : "+rm.name+". Totaux à jour (fais foi) :\n"+clSummary();
    case "add_water":
      var ml=Math.round(Number(inp.ml));if(!ml||Math.abs(ml)>5000)return "Erreur : quantité invalide.";
      addWater(ml);return "Eau enregistrée (+"+ml+" ml, déjà compté dans ces totaux à jour, ne l'ajoute pas une 2e fois) :\n"+clSummary();
    case "log_weight":
      var kg=Number(inp.kg);if(!(kg>=30&&kg<=350))return "Erreur : poids invalide.";
      kg=Math.round(kg*10)/10;var h=state.weightHistory,ix=h.findIndex(function(x){return x.d===td;});
      if(ix>=0)h[ix].w=kg;else h.push({d:td,w:kg});h.sort(function(a,b){return a.d.localeCompare(b.d);});
      save();renderToday();return "Pesée enregistrée : "+kg+" kg. Totaux à jour :\n"+clSummary();
    case "log_steps":
      var st=Math.round(Number(inp.steps));if(!(st>=0&&st<=100000))return "Erreur : nombre de pas invalide.";
      upsertV(state.steps,td,st);save();renderToday();return "Pas enregistrés : "+st+". Totaux à jour :\n"+clSummary();
    case "log_measures":
      function cmv(v){v=Number(v);return v>=40&&v<=220?Math.round(v*10)/10:null;}
      var wa=cmv(inp.waist_cm),hi=cmv(inp.hips_cm);if(wa==null&&hi==null)return "Erreur : mesures invalides (40–220 cm).";
      if(!state.measures)state.measures=[];
      var mi=state.measures.findIndex(function(x){return x.d===td;}),old=mi>=0?state.measures[mi]:{};
      var me={d:td,waist:wa!=null?wa:(old.waist!=null?old.waist:null),hips:hi!=null?hi:(old.hips!=null?old.hips:null)};
      if(mi>=0)state.measures[mi]=me;else state.measures.push(me);
      state.measures.sort(function(a,b){return a.d.localeCompare(b.d);});save();return "Mesures enregistrées.";
    case "get_day_summary": return clSummary();
    case "get_history": return clHistory(inp.days);
    case "log_workout":
      var exs=(Array.isArray(inp.exercises)?inp.exercises:[]).filter(function(e){return e&&e.name;}).slice(0,20);
      if(!exs.length)return "Erreur : aucun exercice.";
      var known=Object.keys(state.perf);state.program.forEach(function(q){q.ex.forEach(function(e){if(known.indexOf(e.n)<0)known.push(e.n);});});
      /* nom identique (sans tenir compte des majuscules ni des accents) sinon nouvel exercice : on ne fusionne jamais deux exercices proches */
      function fold(x){return String(x).toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"").replace(/\s+/g," ").trim();}
      function exName(n){n=String(n).trim().slice(0,50);var l=fold(n);return known.find(function(k){return fold(k)===l;})||n;}
      var nm=String(inp.name||"Séance").slice(0,40),nl=nm.toLowerCase();
      var day=state.program.find(function(q){var ql=q.name.toLowerCase();return ql===nl||ql.indexOf(nl)>=0||nl.indexOf(ql)>=0;});
      var logged=[];
      exs.forEach(function(e){
        var n=exName(e.name),sets=Math.max(1,Math.min(10,Math.round(Number(e.sets)||1))),reps=Math.max(1,Math.min(100,Math.round(Number(e.reps)||1))),w=Math.round((Number(e.weight_kg)||0)*10)/10;
        logged.push(n+" "+sets+"×"+reps+(w>0?" à "+w+" kg":""));
        if(!(w>0&&w<=500))return;
        if(!state.perf[n])state.perf[n]=[];
        var arr=state.perf[n],ix=arr.findIndex(function(x){return x.d===td;}),s0=[];for(var k=0;k<sets;k++)s0.push({w:w,r:reps});
        var entry={d:td,w:w,r:reps,s:s0};if(ix>=0)arr[ix]=entry;else arr.push(entry);
        arr.sort(function(a2,b2){return a2.d.localeCompare(b2.d);});
      });
      var ses={date:new Date().toISOString(),dayId:day?day.id:"coach",name:day?day.name:nm,done:exs.length,total:exs.length,src:"coach"};
      var dm=Number(inp.duration_min);if(dm>0&&dm<=300)ses.dur=Math.round(dm);
      state.sessions.unshift(ses);state.sessions=state.sessions.slice(0,200);
      save();renderAll();
      return "Séance enregistrée (« "+ses.name+" ») : "+logged.join(", ")+". Totaux à jour :\n"+clSummary();
    case "log_run":
      var km=Number(inp.distance_km),mn=Number(inp.duration_min);
      if(!(km>0&&km<=100)||!(mn>0&&mn<=600))return "Erreur : distance ou durée invalide.";
      var walk=inp.kind==="walk",run={id:"r"+Date.now()+Math.floor(Math.random()*1000),d:td,dist:Math.round(km*100)/100,dur:Math.round(mn*10)/10,src:"coach"};
      run.kcal=walk?estimateWalkDistKcal(km):estimateRunKcal(km,mn);
      if(walk)run.walk=true;if(inp.treadmill)run.tread=true;
      state.runs.push(run);if(!walk)autoTickRunProg(td);
      save();renderAll();
      return (walk?"Marche":"Course")+" enregistrée : "+run.dist+" km en "+run.dur+" min, ≈ "+run.kcal+" kcal. Totaux à jour :\n"+clSummary();
    case "delete_meal":
      var di=Math.round(Number(inp.index))-1;if(!(di>=0&&di<state.meals.length))return "Erreur : numéro introuvable. "+clSummary();
      var gone=state.meals.splice(di,1)[0];save();renderMeals();renderToday();
      return "Supprimé : "+gone.name+". Attention, les numéros ont changé. Totaux à jour :\n"+clSummary();
    case "update_meal":
      var ui=Math.round(Number(inp.index))-1,m0=state.meals[ui];if(!m0)return "Erreur : numéro introuvable. "+clSummary();
      if(inp.name)m0.name=String(inp.name).slice(0,60);
      if(Number(inp.qty_g)>0&&Number(inp.qty_g)<=5000)m0.qty=Math.round(Number(inp.qty_g));
      if(Number(inp.kcal)>=0&&Number(inp.kcal)<=5000&&inp.kcal!=null)m0.kcal=Math.round(Number(inp.kcal));
      ["protein","carbs","fat"].forEach(function(f){if(inp[f]!=null&&Number(inp[f])>=0&&Number(inp[f])<=500)m0[f]=Math.round(Number(inp[f])*10)/10;});
      if(CL_TYPES.indexOf(inp.type)>=0)m0.type=inp.type;
      save();renderMeals();renderToday();
      return "Corrigé : "+m0.name+". Totaux à jour :\n"+clSummary();
    case "add_grocery":
      var its=(Array.isArray(inp.items)?inp.items:[]).map(function(x){return String(x).trim().slice(0,60);}).filter(Boolean).slice(0,30);
      if(!its.length)return "Erreur : aucun article.";
      var have=state.groceryList.once.concat(state.groceryList.weekly).map(function(x){return String(x.n).toLowerCase();}),added=[];
      its.forEach(function(n){if(have.indexOf(n.toLowerCase())<0){state.groceryList.once.push({n:n,done:false});have.push(n.toLowerCase());added.push(n);}});
      save();try{renderGrocerySummary();}catch(e){}
      return added.length?"Ajouté à la liste de courses : "+added.join(", ")+".":"Tout était déjà dans la liste.";
  }
  return "Outil inconnu.";
}
/* historique compact pour le coach : quelques lignes par sujet, pas les données brutes */
function clHistory(days){
  days=Math.max(7,Math.min(180,Math.round(Number(days)||30)));
  var from=new Date();from.setDate(from.getDate()-days+1);var f=from.getFullYear()+"-"+pad(from.getMonth()+1)+"-"+pad(from.getDate());
  function inR(d){return d>=f;}
  function avg(a){return a.length?Math.round(a.reduce(function(x,y){return x+y;},0)/a.length):0;}
  function pick(a,n){if(a.length<=n)return a;var o=[],st=(a.length-1)/(n-1);for(var i=0;i<n;i++)o.push(a[Math.round(i*st)]);return o;}
  var out=["Période : "+f+" → "+today()+" ("+days+" jours)"];
  var wh=state.weightHistory.filter(function(x){return inR(x.d);});
  out.push("Poids : "+(wh.length?pick(wh,12).map(function(x){return x.d.slice(5)+" "+x.w;}).join(", ")+" (variation "+(Math.round((wh[wh.length-1].w-wh[0].w)*10)/10)+" kg)":"aucune pesée")+" · départ "+state.profile.start+" kg, objectif "+state.profile.target+" kg");
  var ms=(state.measures||[]).filter(function(x){return inR(x.d);});
  if(ms.length)out.push("Mensurations : "+pick(ms,6).map(function(x){return x.d.slice(5)+(x.waist?" taille "+x.waist:"")+(x.hips?" hanches "+x.hips:"");}).join(", "));
  var ss=state.sessions.filter(function(x){return inR(localDay(x.date));});
  out.push("Séances : "+ss.length+(ss.length?" — "+ss.slice(0,15).map(function(x){return localDay(x.date).slice(5)+" "+x.name;}).join(", "):""));
  var rs=state.runs.filter(function(x){return inR(x.d);});
  if(rs.length)out.push("Courses/marches : "+rs.slice(-12).map(function(x){return x.d.slice(5)+" "+(x.walk?"marche ":"course ")+x.dist+" km/"+Math.round(x.dur)+" min";}).join(", "));
  var wa=(state.waterHistory||[]).filter(function(x){return inR(x.d);}).map(function(x){return Number(x.ml)||0;});
  if(wa.length)out.push("Eau : moyenne "+avg(wa)+" ml/jour sur "+wa.length+" jours");
  var st=state.steps.filter(function(x){return inR(x.d);}).map(function(x){return Number(x.v)||0;});
  if(st.length)out.push("Pas : moyenne "+avg(st)+"/jour sur "+st.length+" jours");
  var mh=(state.mealHistory||[]).filter(function(x){return inR(x.date);}).map(function(x){var k=0,pr=0;x.meals.forEach(function(m){k+=Number(m.kcal||0);pr+=Number(m.protein||0);});return {d:x.date,k:Math.round(k),p:Math.round(pr)};});
  if(mh.length)out.push("Nutrition (jours passés) : moyenne "+avg(mh.map(function(x){return x.k;}))+" kcal et "+avg(mh.map(function(x){return x.p;}))+" g de protéines — "+mh.slice(-7).map(function(x){return x.d.slice(5)+" "+x.k+" kcal/"+x.p+" g";}).join(", "));
  var recs=Object.keys(state.perf).filter(function(k){return state.perf[k]&&state.perf[k].length;}).map(function(k){
    var a=state.perf[k],best=a.reduce(function(m,x){return Number(x.w)>Number(m.w)?x:m;},a[0]),last=a[a.length-1],first=a.filter(function(x){return inR(x.d);})[0];
    return k+" : record "+best.w+" kg"+(best.r?"×"+best.r:"")+" ("+best.d.slice(5)+"), dernier "+last.w+" kg"+(first&&first!==last?", "+(Math.round((last.w-first.w)*10)/10>=0?"+":"")+(Math.round((last.w-first.w)*10)/10)+" kg sur la période":"");
  }).slice(0,30);
  out.push("Charges : "+(recs.join(" ; ")||"aucune"));
  out.push("Jours du programme : "+state.program.map(function(q){return q.name;}).join(", "));
  return out.join("\n");
}
function clExNames(){var o=[];state.program.forEach(function(q){q.ex.forEach(function(e){if(o.indexOf(e.n)<0)o.push(e.n);});});Object.keys(state.perf).forEach(function(k){if(o.indexOf(k)<0)o.push(k);});return o.slice(0,80).join(", ");}
function clSystem(){
  return "Tu es le coach intégré à l'app EVO Fit Coach d'un homme qui veut passer d'environ 100 kg à 85 kg en gardant son muscle (salle EVO Fitness à Genève, Suisse). "
    +"Il ne mange pas de viande, mais mange poisson, crevettes, œufs et produits laitiers. Il achète surtout à la Migros et à la Coop. "
    +"Quand il décrit ce qu'il a mangé, bu, pesé ou marché, enregistre-le directement avec les outils, sans demander de confirmation. "
    +"Estime les portions de façon réaliste (valeurs des produits suisses courants) si la quantité manque, et dis-le. "
    +"Réponds en français, tutoiement, en 1 à 3 phrases courtes : ce que tu as noté (kcal et protéines) puis ce qu'il reste pour la journée. Pas de markdown, pas de listes. "
    +"Produits que j'ai achetés (utilise ces valeurs pour 100 g si je les mentionne) : "+LOCAL_FOODS.filter(function(f){return f.b;}).map(function(f){return f.n+" "+f.kcal+" kcal/"+f.p+" g prot.";}).join(" ; ")+".\n"
    +"Pour log_workout, reprends exactement un de ces noms d'exercice s'il correspond (sinon un nom clair et précis) : "+clExNames()+".\n"
    +"N'écris jamais « noté », « ajouté » ou « enregistré » sans avoir appelé l'outil correspondant dans ce tour.\n"
    +"Ne propose jamais de viande. Pour les questions de progression, moyennes ou records, appelle get_history avant de répondre. Pour une séance ou une course décrite, enregistre-la (log_workout, log_run). Pour retirer ou corriger un aliment précis, utilise son numéro #n (delete_meal, update_meal) seulement si c'est clairement demandé ; en cas de doute, demande lequel. Si on te demande une idée de repas, propose 1 ou 2 options sans viande qui collent au reste de la journée (surtout les protéines), et ajoute les ingrédients à la liste de courses (add_grocery) seulement si on te le demande. Si une photo est jointe : repas ou aliment → identifie chaque aliment, estime les portions visibles et enregistre-les (add_meal) ; étiquette nutritionnelle → utilise ses valeurs pour la quantité indiquée (sinon demande la quantité) ; balance ou mètre ruban → enregistre la valeur lue ; si c'est flou ou ambigu, dis ce que tu vois et demande. Pour les chiffres (eau, kcal, protéines, reste), recopie les totaux renvoyés par le dernier outil appelé : ils incluent déjà ce qui vient d'être ajouté, ne refais aucune addition.\n\nDonnées de l'app avant ce message :\n"+clSummary();
}
function clLoadSdk(){
  if(clSdk)return Promise.resolve(clSdk);
  return import("/fitness/js/vendor/anthropic-sdk.mjs?v=1").then(function(m){clSdk=m.default;return clSdk;});
}
function clErrMsg(e){
  var s=e&&e.status,msg=String((e&&e.message)||"");
  if(s===401)return "Clé API refusée. Vérifie-la dans Profil › Coach Claude.";
  if(s===429)return "Trop de messages d'un coup, réessaie dans une minute.";
  if(s===400&&/credit/i.test(msg))return "Crédit Anthropic épuisé. Recharge-le sur platform.claude.com (Billing).";
  if(s===529||s===503)return "Claude est surchargé, réessaie dans un instant.";
  if(!s)return "Pas de connexion. Vérifie ton réseau et réessaie.";
  return "Erreur ("+s+"). Réessaie.";
}
/* ce qui a VRAIMENT été enregistré par un outil : affiché sous la réponse (✓), pour ne jamais se fier au texte seul */
var CL_WRITE=["add_meal","delete_last_meal","delete_meal","update_meal","add_water","log_weight","log_steps","log_measures","log_workout","log_run","add_grocery"];
function clLabel(name,inp,out){
  inp=inp||{};if(CL_WRITE.indexOf(name)<0||/^Erreur/.test(String(out)))return null;
  var m;
  switch(name){
    case "add_meal": return inp.name+" · "+Math.round(inp.qty_g)+" g · "+Math.round(inp.kcal)+" kcal";
    case "delete_last_meal": case "delete_meal": m=String(out).match(/Supprimé : ([^.\n]+)/);return m?"Supprimé : "+m[1]:null;
    case "update_meal": m=String(out).match(/Corrigé : ([^.\n]+)/);return m?"Corrigé : "+m[1]:null;
    case "add_water": return "Eau "+(inp.ml>0?"+":"")+Math.round(inp.ml)+" ml";
    case "log_weight": return "Poids "+fr(Math.round(Number(inp.kg)*10)/10)+" kg";
    case "log_steps": return kfmt(inp.steps)+" pas";
    case "log_measures": return "Mensurations"+(inp.waist_cm?" · taille "+fr(inp.waist_cm)+" cm":"")+(inp.hips_cm?" · hanches "+fr(inp.hips_cm)+" cm":"");
    case "log_workout": return "Séance · "+(inp.exercises||[]).length+" exercice"+((inp.exercises||[]).length>1?"s":"");
    case "log_run": return (inp.kind==="walk"?"Marche ":"Course ")+fr(inp.distance_km)+" km · "+Math.round(inp.duration_min)+" min";
    case "add_grocery": m=String(out).match(/: (.+)\.$/);return m?"Courses : "+m[1]:null;
  }
  return null;
}
function clPending(){try{return JSON.parse(lsGet("evoClaudePending")||"null");}catch(e){return null;}}
async function clSend(){
  var inp=$("clInput");if(!inp||clBusy)return;
  var text=inp.value.trim(),photo=clPhoto;if(!text&&!photo)return;
  if(!clKey()){toast("Ajoute ta clé dans Profil");showPage("profile");return;}
  var hist=clHist(),mine={r:"me",t:text};if(photo)mine.img=photo.thumb;hist.push(mine);
  /* seules les 3 dernières miniatures sont gardées (place dans le téléphone) */
  var nImg=0;for(var hi=hist.length-1;hi>=0;hi--)if(hist[hi].img&&++nImg>3)delete hist[hi].img;
  clSaveHist(hist);inp.value="";clPhoto=null;renderClPhoto();
  clBusy=true;renderClaude(true);
  /* marqueur « réponse en cours » : si l'app est fermée ou rechargée avant la fin, on le saura au retour */
  lsSet("evoClaudePending",JSON.stringify({t:text,photo:!!photo,at:Date.now()}));
  var saved=[],writeErr=false;
  try{
    var Anthropic=await clLoadSdk();
    var client=new Anthropic({apiKey:clKey(),dangerouslyAllowBrowser:true,maxRetries:1});
    /* contexte : les 8 derniers messages texte, en commençant par un message de l'utilisateur */
    var ctx=hist.slice(-8);while(ctx.length&&ctx[0].r!=="me")ctx.shift();
    var msgs=ctx.map(function(x){return {role:x.r==="me"?"user":"assistant",content:(x.img?"[photo déjà analysée] ":"")+(x.t||"(photo)")};});
    if(photo)msgs[msgs.length-1].content=[{type:"image",source:{type:"base64",media_type:"image/jpeg",data:photo.b64}},{type:"text",text:text||"Analyse cette photo et enregistre ce que j'ai mangé."}];
    var reply="",sys=clSystem(); /* figé au début : sinon Claude recompte ce qu'il vient d'ajouter */
    for(var it=0;it<6;it++){
      var res=await client.messages.create({model:CL_MODEL,max_tokens:1024,system:sys,tools:CL_TOOLS,messages:msgs});
      clAddCost(res.usage);
      var txt=res.content.filter(function(b){return b.type==="text";}).map(function(b){return b.text;}).join(" ").trim();
      if(txt)reply=txt;
      if(res.stop_reason!=="tool_use")break;
      msgs.push({role:"assistant",content:res.content});
      var results=res.content.filter(function(b){return b.type==="tool_use";}).map(function(b){
        var out;try{out=clRunTool(b.name,b.input);}catch(err){out="Erreur : "+err.message;}
        var lb=clLabel(b.name,b.input,out);if(lb)saved.push(lb);else if(CL_WRITE.indexOf(b.name)>=0)writeErr=true;
        return {type:"tool_result",tool_use_id:b.id,content:out};
      });
      msgs.push({role:"user",content:results});
    }
    var entry={r:"ai",t:reply||(saved.length?"C'est noté.":"")};
    if(saved.length)entry.ok=saved;
    /* le texte dit « noté » alors qu'aucun outil n'a rien enregistré : on prévient */
    else if(!writeErr&&/\b(not[ée]|ajout[ée]|enregistr[ée]|supprim[ée]|corrig[ée])/i.test(reply)){entry.warn=1;entry.retry=text;}
    hist=clHist();hist.push(entry);clSaveHist(hist);
  }catch(e){
    var ee={r:"ai",t:clErrMsg(e)+(saved.length?"":" Rien n'a été enregistré."),err:1};
    if(saved.length)ee.ok=saved;else if(!photo)ee.retry=text;
    hist=clHist();hist.push(ee);clSaveHist(hist);
  }
  lsDel("evoClaudePending");
  clBusy=false;renderClaude(false);
}
function renderClaude(thinking){
  var box=$("clLog");if(!box)return;
  var hist=clHist(),key=clKey();
  if(!key){
    box.innerHTML='<button class="cl-keybtn" data-act="go" data-page="profile">Ajouter ma clé Anthropic ›</button>';
  }else if(!hist.length&&!thinking){
    box.innerHTML='';
  }else{
    var base=Math.max(0,hist.length-12),pend=!thinking&&!clBusy?clPending():null;
    box.innerHTML=hist.slice(-12).map(function(x,k){
      var html='<div class="cl-msg '+(x.r==="me"?"me":"ai")+(x.err?" err":"")+(x.img?" has-img":"")+'">'+(x.img?'<img src="'+x.img+'" alt="Photo envoyée">'+(x.t?'<span class="cl-cap">'+esc(x.t)+'</span>':''):esc(x.t))+'</div>';
      if(x.ok)html+='<div class="cl-ok">'+x.ok.map(function(l){return '<span>✓ '+esc(l)+'</span>';}).join("")+'</div>';
      if(x.warn)html+='<div class="cl-ok warn"><span>⚠ Rien n\'a été enregistré</span></div>';
      if(x.retry&&k===hist.length-base-1)html+='<button class="cl-retry" data-act="clRetry" data-i="'+(base+k)+'">Renvoyer</button>';
      return html;
    }).join("")
      +(pend?'<div class="cl-ok warn"><span>⚠ Réponse interrompue (app fermée ou rechargée) : rien n\'a été enregistré</span></div>'+(pend.photo?'<div class="cl-note">Renvoie la photo.</div>':'<button class="cl-retry" data-act="clRetryPending">Renvoyer</button>'):'')
      +(thinking?'<div class="cl-msg ai typing"><i></i><i></i><i></i></div>':'');
    box.scrollTop=box.scrollHeight;
    /* les miniatures grandissent en chargeant : on redescend en bas une fois chargées */
    box.querySelectorAll("img").forEach(function(im){if(!im.complete)im.onload=function(){box.scrollTop=box.scrollHeight;};});
  }
  var b=$("clSendBtn");if(b)b.disabled=!!thinking;
  var c=$("clCost");if(c)c.textContent=key?"≈ "+clCost().toFixed(clCost()<1?3:2).replace(".",",")+" $ ce mois":"Non configuré";
  clSyncSend();
  var cl=$("clClearBtn");if(cl)cl.hidden=!hist.length;
}
/* bouton envoyer allumé seulement quand il y a quelque chose à envoyer */
function clSyncSend(){var b=$("clSendBtn"),i=$("clInput");if(b&&i)b.classList.toggle("ready",!!(i.value.trim()||clPhoto));}
document.addEventListener("input",function(e){if(e.target&&e.target.id==="clInput")clSyncSend();});
document.addEventListener("change",function(e){
  if(e.target&&e.target.id==="clFile"){var f=e.target.files&&e.target.files[0];e.target.value="";clPickPhoto(f);}
});
document.addEventListener("keydown",function(e){
  if(e.target&&e.target.id==="clInput"&&e.key==="Enter"&&!e.isComposing){e.preventDefault();clSend();}
});
/* ===== « À faire maintenant » : 1 à 3 actions concrètes selon l'heure et les données du jour ===== */
function renderCoach(){
  var box=$("coachCard");if(!box)return;
  var h=new Date().getHours(),td=today(),items=[];
  var pl=planFor(dowIdx()),done=planDoneOn(td);
  var protGoal=fnum(state.macro.protein,155),prot=state.meals.reduce(function(a,m){return a+Number(m.protein||0);},0);
  var kcal=state.meals.reduce(function(a,m){return a+Number(m.kcal||0);},0),goal=Number(state.profile.cal||2400);
  var wml=(state.water&&state.water.date===td)?Number(state.water.ml||0):0,wgoal=Math.max(500,Number(state.waterGoal||3)*1000);
  var st=stepsOn(td),lastW=state.weightHistory.length?state.weightHistory[state.weightHistory.length-1].d:null;
  var daysW=lastW?Math.round((new Date(td+"T12:00:00")-new Date(lastW+"T12:00:00"))/864e5):99;
  if(daysW>=3&&h<12)items.push({ic:"scalemass_fill",c:"#e3ae4a",t:"Pèse-toi ce matin",s:"à jeun, avant de manger · dernière pesée il y a "+daysW+" j",act:'data-act="weigh"'});
  /* la séance du jour est déjà dans la carte du dessus : pas de doublon ici */
  var pl2=Math.round(protGoal-prot);
  if(pl2>30&&h>=11)items.push({ic:"bolt_fill",c:"#d0875a",t:"Encore "+pl2+" g de protéines",s:pl2>60?"ex. skyr 200 g (22 g) + thon 120 g (31 g)":"ex. skyr 200 g (22 g) ou 3 œufs (19 g)",act:'data-act="addMeal"'});
  var wl=wgoal-wml;
  if(wl>=500&&h>=10)items.push({ic:"drop_fill",c:"#5a8fe0",t:"Bois encore "+fmtL(wl),s:"touche pour ajouter un verre de 25 cl",act:'data-act="waterAdd" data-amount="250"'});
  if(st<7000&&h>=16)items.push({ic:"figure_walk",c:"#2c63c4",t:(st?kfmt(st)+" pas":"Pas encore de pas")+" : marche 20 min",s:"≈ +2 500 pas · touche pour saisir tes pas",act:'data-act="openSteps"'});
  if(kcal>goal*1.05)items.push({ic:"fork_knife",c:"#d0875a",t:"+"+kfmt(kcal-goal)+" kcal au-dessus de l'objectif",s:"repas léger ce soir : légumes + protéines",act:'data-act="go" data-page="meals"'});
  items=items.slice(0,3);
  box.innerHTML='<div class="eyebrow">À faire maintenant</div>'+(items.length?items.map(function(x){
    return '<button class="coach-row" '+x.act+'><span class="cr-ic" style="color:'+x.c+'"><svg class="ic-s" aria-hidden="true"><use href="#i-'+x.ic+'"/></svg></span><span class="cr-t"><b>'+esc(x.t)+'</b><small>'+esc(x.s)+'</small></span><svg class="ic-s cr-go" aria-hidden="true"><use href="#i-chevron_right"/></svg></button>';
  }).join(""):'<div class="coach-ok">Tout est au vert pour aujourd\'hui 👌 Repose-toi bien.</div>');
}
/* ===== dépense du jour =====
   base = métabolisme de repos (Mifflin-St Jeor, taille/âge/sexe du Profil) × 1,2 (vie quotidienne, ~3 000 pas compris)
   + pas au-delà de 3 000 + séances + cardio. Les séances et courses sont comptées en « net » (on retire la dépense
   de repos pendant l'effort, déjà dans la base). Une marche GPS ou tapis n'est pas recomptée si les pas du jour sont saisis. */
function bmrNow(){
  var pr=state.profile||{},w=latestBody(),h=Number(pr.height)||178,a=Number(pr.age)||30;
  return Math.round(10*w+6.25*h-5*a+(pr.sex==="F"?-161:5));
}
function dayBurn(d){
  var w=latestBody(),bmr=bmrNow(),base=Math.round(bmr*1.2);
  var st=stepsOn(d),stepsK=st>3000?estimateStepsKcal(st-3000):0;
  var sessK=0,cardioK=0;
  state.sessions.forEach(function(x){
    if(localDay(x.date)!==d)return;
    var q=state.program.find(function(pp){return pp.id===x.dayId;}),cat=(q&&q.cat)||"muscu";
    var dur=Number(x.dur)||(q?estimateDurationMin(q):45);
    var gross=Number(x.kcal)||estimateSessionKcal(cat,dur);
    sessK+=Math.max(0,Math.round(gross-w*dur/60));
  });
  state.runs.forEach(function(r){
    if(r.d!==d||(r.walk&&st>0))return;
    var dur=Number(r.dur)||0,gross=Number(r.kcal)||(r.walk?estimateWalkDistKcal(Number(r.dist)||0):estimateRunKcal(Number(r.dist)||0,dur));
    cardioK+=Math.max(0,Math.round(gross-w*dur/60));
  });
  return {bmr:bmr,base:base,steps:stepsK,sess:sessK,cardio:cardioK,total:base+stepsK+sessK+cardioK};
}
function kfmt(n){return Math.round(n).toLocaleString("fr-CH");}
function renderBurn(){
  var box=$("burnCard");if(!box)return;
  var d=today(),st=stepsOn(d),b=dayBurn(d),eaten=state.meals.reduce(function(s2,m){return s2+Number(m.kcal||0);},0),bal=Math.round(eaten-b.total);
  var parts=['base '+kfmt(b.base)];
  if(b.steps)parts.push('pas '+kfmt(b.steps));
  if(b.sess)parts.push('séance '+kfmt(b.sess));
  if(b.cardio)parts.push('cardio '+kfmt(b.cardio));
  box.innerHTML='<div class="burn3"><div><b>'+kfmt(b.total)+'</b><span>dépensé</span></div>'
    +'<div class="'+(bal<=0?"good":"bad")+'"><b>'+(bal<=0?"−":"+")+kfmt(Math.abs(bal))+'</b><span>'+(bal<=0?"déficit":"surplus")+'</span></div>'
    +'<button class="burn-steps" data-act="openSteps"><b>'+kfmt(st)+'</b><span>pas / '+kfmt(STEP_GOAL)+'</span><i><em style="width:'+Math.min(100,Math.round(st/STEP_GOAL*100))+'%"></em></i></button></div>'
    +'<div class="burn-detail">Dépense estimée : '+parts.join(' + ')+' kcal'+(state.profile.height&&state.profile.age?'':' · <u data-act="go" data-page="profile">indique ta taille et ton âge</u> pour plus de précision')+'</div>';
}
/* marche : distance = pas × longueur de foulée moyenne (~0.762 m), coût ~0.5 kcal/kg/km (environ la moitié de la course) */
function estimateStepsKcal(steps){
  steps=Number(steps)||0;if(steps<=0)return 0;
  var distKm=steps*0.000762;
  return Math.max(0,Math.round(distKm*latestBody()*0.5));
}
function weekNo(){var s=new Date((state.profile.startDate||START_DATE)+"T12:00:00"),diff=Math.floor((Date.now()-s)/864e5);return Math.max(1,Math.floor(diff/7)+1);}

/* ===== plan de la semaine : quoi faire chaque jour =====
   Perte de gras maximale sans perdre de muscle : 4 séances de muscu (pecs 2×, bras 2×),
   cardio/marche les autres jours, 10 000 pas par jour. Chaque jour a une variante
   (maison ou marche) si la salle n'est pas possible. Index 0 = lundi. */
var STEP_GOAL=10000;
var WEEK_PLAN=[
 {day:"push",alt:"home-arms",extra:"Finis par 15 min de marche inclinée sur tapis (pente 8-10 %, 5 km/h)."},
 {walk:{title:"Marche rapide",min:45,lines:["45 min à allure soutenue : tu peux parler, pas chanter","Idéal à jeun le matin ou après un repas"]},alt:"home-hiit1"},
 {day:"pull",alt:"home-arms",extra:"Finis par 15 min de marche inclinée ou de vélo."},
 {day:"home-hiit1",alt:"walk",extra:"+ 30 min de marche dans la journée.",walkAlt:{title:"Marche rapide",min:50,lines:["50 min à allure soutenue","Remplace le HIIT si tu es fatigué ou courbaturé"]}},
 {day:"full",alt:"home-fb1",extra:"Le fractionné en fin de séance brûle le plus : ne le saute pas."},
 {day:"legs",alt:"home-fb2",extra:"+ 30-45 min de marche : ce sont le déficit et le cardio qui affinent les hanches."},
 {walk:{title:"Repos actif",min:40,rest:true,lines:["Marche tranquille 30-45 min","5-10 min d'étirements (pecs, hanches, dos)"]}}
];
var PLAN_DAYS=["Lundi","Mardi","Mercredi","Jeudi","Vendredi","Samedi","Dimanche"];
var planSel=null; /* jour affiché dans la carte (null = aujourd'hui) */
function dowIdx(d){return ((d||new Date()).getDay()+6)%7;}
function dateOfWeekday(i){var d=new Date();d.setDate(d.getDate()-dowIdx(d)+i);return d.getFullYear()+"-"+pad(d.getMonth()+1)+"-"+pad(d.getDate());}
function progDay(id){return state.program.find(function(p){return p.id===id;});}
/* ce qui est prévu pour un jour, en tenant compte du choix "variante" */
function planFor(i){
  var e=WEEK_PLAN[i],swapped=!!(state.planSwap&&state.planSwap[dateOfWeekday(i)]);
  var useAlt=swapped&&e.alt;
  if(e.walk&&!useAlt)return {kind:"walk",walk:e.walk,alt:e.alt,swapped:false};
  if(useAlt){
    if(e.alt==="walk")return {kind:"walk",walk:e.walkAlt,alt:true,swapped:true};
    var ap=progDay(e.alt);if(ap)return {kind:ap.cat==="maison"?"home":"gym",p:ap,alt:true,swapped:true,extra:e.walk?null:e.extra};
  }
  var p=progDay(e.day);
  if(!p)return {kind:"walk",walk:{title:"Marche rapide",min:45,lines:["45 min à allure soutenue"]},alt:null,swapped:false};
  return {kind:p.cat==="maison"?"home":"gym",p:p,alt:e.alt||null,swapped:false,extra:e.extra};
}
function stepsOn(d){for(var i=0;i<state.steps.length;i++)if(state.steps[i].d===d)return Number(state.steps[i].v)||0;return 0;}
function planDoneOn(d){
  if(state.planDone&&state.planDone[d])return true;
  if(state.sessions.some(function(s){return localDay(s.date)===d;}))return true;
  return state.runs.some(function(r){return r.d===d;});
}
var planListOpen=false;
function renderPlan(){
  var box=$("planCard");if(!box)return;
  var ti=dowIdx(),i=planSel==null?ti:planSel,d=dateOfWeekday(i),pl=planFor(i),done=planDoneOn(d);
  var week=PLAN_DAYS.map(function(n,k){
    var dk=dateOfWeekday(k),pk=planFor(k),isDone=planDoneOn(dk),ic=pk.kind==="walk"?(pk.walk.rest?"moon_fill":"figure_walk"):(pk.kind==="home"?"house_fill":"dumbbell");
    return '<button class="pw-d'+(k===i?" on":"")+(k===ti?" today":"")+(isDone?" done":"")+'" data-act="planDay" data-i="'+k+'"><span>'+n.charAt(0)+'</span><i><svg class="ic-s" aria-hidden="true"><use href="#i-'+(isDone?"checkmark":ic)+'"/></svg></i></button>';
  }).join("");
  var eyebrow=(i===ti?"AUJOURD'HUI · ":"")+PLAN_DAYS[i].toUpperCase()+(done?" · FAIT ✓":"");
  var icon,title,sub,lines=[],go,alt="";
  if(pl.kind==="walk"){
    icon='<svg class="ic-s" aria-hidden="true"><use href="#i-'+(pl.walk.rest?"moon_fill":"figure_walk")+'"/></svg>';
    title=pl.walk.title;sub=pl.walk.min+" min · brûle ~"+estimateWalkKcal(pl.walk.min)+" kcal";lines=pl.walk.lines.slice();
    go='<button class="go" data-act="planGo">Démarrer la marche (GPS)</button>';
  }else{
    var mk=marksFor(pl.p.id),act=activeExercises(pl.p);
    icon=pl.p.icon;title=pl.p.name;sub=act.length+" exercices · ~"+estimateDurationMin(pl.p)+" min · "+pl.p.focus;
    lines=act.map(function(e){return esc(e.n)+' <span>'+esc(e.t)+'</span>';});
    if(pl.extra)lines.push('<b>'+esc(pl.extra)+'</b>');
    var started=act.some(function(e){return doneSetCount(mk,e)>0;});
    go='<button class="go" data-act="planGo">'+(started?"Continuer la séance":"Commencer la séance")+'</button>';
  }
  if(pl.alt){
    var altLab=pl.swapped?"Revenir au programme prévu":(WEEK_PLAN[i].alt==="walk"?"Trop fatigué\u00a0? Marche à la place":(pl.kind==="walk"?"Il pleut\u00a0? Séance HIIT à la maison":"Pas de salle\u00a0? Version maison"));
    alt='<button class="plan-alt" data-act="planSwap"><svg class="ic-s" aria-hidden="true"><use href="#i-swap"/></svg>'+altLab+'</button>';
  }
  box.innerHTML='<div class="plan-week">'+week+'</div>'
    +'<div class="eyebrow">'+eyebrow+'</div>'
    +'<div class="row"><div class="ic">'+icon+'</div><div style="flex:1;min-width:0"><h3>'+esc(title)+'</h3><div class="sub">'+esc(sub)+'</div></div></div>'
    +go
    +(pl.kind!=="walk"?'<div class="plan-thumbs">'+act.map(function(e){var x=exPhotos(e.n);return x?'<img src="'+photoUrl(x[x.length-1])+'" alt="" loading="lazy">':'';}).join("")+'</div>':'')
    +(pl.kind==="walk"||lines.length<=2||planListOpen
      ?'<ul class="plan-list">'+lines.map(function(l){return '<li>'+(pl.kind==="walk"?esc(l):l)+'</li>';}).join("")+'</ul>'
        +(pl.kind!=="walk"&&lines.length>2?'<button class="plan-more" data-act="planList">Masquer les exercices ▴</button>':'')
      :'<button class="plan-more" data-act="planList">Voir les '+act.length+' exercices ▾</button>')
    +'<div class="plan-foot">'+alt+(pl.kind==="gym"?'<button class="plan-alt" data-act="planTread"><svg class="ic-s" aria-hidden="true"><use href="#i-figure_walk"/></svg>+ Tapis</button>':'')+(pl.kind==="walk"&&!done?'<button class="plan-alt" data-act="planDone"><svg class="ic-s" aria-hidden="true"><use href="#i-checkmark"/></svg>C\'est fait</button>':'')+'</div>';
}
/* marche : ~0.6 kcal/kg/km à allure soutenue */
function estimateWalkDistKcal(km){return Math.max(1,Math.round(km*latestBody()*0.6));}
/* marche rapide ~5,5 km/h : MET 4.3 */
function estimateWalkKcal(min){return Math.round(4.3*latestBody()*(min/60));}
function planGo(){
  var i=planSel==null?dowIdx():planSel,pl=planFor(i);
  if(pl.kind==="walk"){openLiveRun(true);return;}
  state.sessionCategory=pl.p.cat||"muscu";
  state.selDay=state.program.indexOf(pl.p);
  save();openGuidedSession();
}
function planSwap(){
  var i=planSel==null?dowIdx():planSel,d=dateOfWeekday(i);
  if(!state.planSwap)state.planSwap={};
  if(state.planSwap[d])delete state.planSwap[d];else state.planSwap[d]=true;
  save();renderToday();haptic("light");
}
function planMarkDone(){
  var i=planSel==null?dowIdx():planSel,d=dateOfWeekday(i);
  if(!state.planDone)state.planDone={};
  state.planDone[d]=true;save();renderToday();haptic("success");toast("Bien joué !");
}

/* charts */
function lineChart(vals,color,unit){
  if(!vals.length)return '<div class="empty">Pas encore de données.<br>Elles apparaîtront dès ta première saisie.</div>';
  if(vals.length===1)return '<div class="single" style="color:'+color+'">'+fr(vals[0])+(unit||'')+'</div>';
  var W=320,H=150,pad=16,n=vals.length;
  var mn=Math.min.apply(null,vals),mx=Math.max.apply(null,vals);
  if(mn===mx){mn-=1;mx+=1;}else{var m=(mx-mn)*0.18;mn-=m;mx+=m;}
  var xs=function(i){return pad+i*(W-2*pad)/(n-1);};
  var ys=function(v){return H-pad-(v-mn)/(mx-mn)*(H-2*pad);};
  var pts=[],i;for(i=0;i<n;i++)pts.push([xs(i),ys(vals[i])]);
  var line="";for(i=0;i<n;i++)line+=(i?"L":"M")+pts[i][0].toFixed(1)+" "+pts[i][1].toFixed(1)+" ";
  var area=line+"L"+pts[n-1][0].toFixed(1)+" "+(H-pad)+" L"+pts[0][0].toFixed(1)+" "+(H-pad)+" Z";
  var gid="g"+Math.floor(Math.random()*1e6);
  var last=pts[n-1];
  var svg='<svg class="chart" viewBox="0 0 '+W+' '+H+'">'
    +'<defs><linearGradient id="'+gid+'" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="'+color+'" stop-opacity="0.32"/><stop offset="1" stop-color="'+color+'" stop-opacity="0"/></linearGradient></defs>'
    +'<line x1="'+pad+'" y1="'+(H/2)+'" x2="'+(W-pad)+'" y2="'+(H/2)+'" stroke="#2E3340" stroke-width="1" stroke-dasharray="2 4"/>'
    +'<path d="'+area+'" fill="url(#'+gid+')"/>'
    +'<path d="'+line.trim()+'" fill="none" stroke="'+color+'" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>'
    +'<circle cx="'+last[0].toFixed(1)+'" cy="'+last[1].toFixed(1)+'" r="4.5" fill="'+color+'"/>'
    +'<circle cx="'+last[0].toFixed(1)+'" cy="'+last[1].toFixed(1)+'" r="9" fill="'+color+'" opacity="0.18"/>'
    +'</svg>';
  return svg;
}

/* courbe du poids : un point par pesée placé à sa vraie date, poids écrit sur les points clés
   (premier, dernier, plus haut, plus bas), dates sous l'axe, bulle au toucher sur chaque point */
var wChartPts=[];
function weightChart(wh){
  wChartPts=[];
  if(!wh.length)return lineChart([],"","");
  if(wh.length===1)return lineChart([Number(wh[0].w)],"var(--accent-text)"," kg");
  var W=320,H=190,pl=18,pr=24,pt=28,pb=44,n=wh.length;
  var t=wh.map(function(x){return new Date(x.d+"T12:00:00").getTime();}),v=wh.map(function(x){return Number(x.w);});
  var t0=t[0],t1=t[n-1],span=Math.max(1,t1-t0);
  var mn=Math.min.apply(null,v),mx=Math.max.apply(null,v);
  if(mx-mn<1){var c=(mx+mn)/2;mn=c-0.5;mx=c+0.5;}
  var xs=function(i){return pl+(t[i]-t0)/span*(W-pl-pr);},ys=function(y){return pt+(mx-y)/(mx-mn)*(H-pt-pb);};
  var P=v.map(function(y,i){return [xs(i),ys(y)];});
  var line=P.map(function(q,i){return (i?"L":"M")+q[0].toFixed(1)+" "+q[1].toFixed(1);}).join(" ");
  var area=line+" L"+P[n-1][0].toFixed(1)+" "+(H-pb)+" L"+P[0][0].toFixed(1)+" "+(H-pb)+" Z";
  var gid="wg"+Math.floor(Math.random()*1e6);
  /* points étiquetés : premier, dernier, min, max (sans doublon) */
  var iMin=v.indexOf(Math.min.apply(null,v)),iMax=v.indexOf(Math.max.apply(null,v)),lab=[0,n-1,iMin,iMax].filter(function(x,k,a){return a.indexOf(x)===k;});
  var svg='<svg class="chart wchart" viewBox="0 0 '+W+' '+H+'" role="img" aria-label="Évolution du poids">'
    +'<defs><linearGradient id="'+gid+'" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#2c63c4" stop-opacity="0.28"/><stop offset="1" stop-color="#2c63c4" stop-opacity="0"/></linearGradient></defs>';
  /* 3 repères horizontaux discrets */
  [0,0.5,1].forEach(function(f){var y=(pt+f*(H-pt-pb)).toFixed(1);svg+='<line x1="'+pl+'" y1="'+y+'" x2="'+(W-pr)+'" y2="'+y+'" class="wc-grid"/>';});
  svg+='<path d="'+area+'" fill="url(#'+gid+')"/>'
    +'<path d="'+line+'" fill="none" stroke="#2c63c4" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>';
  P.forEach(function(q,i){svg+='<circle cx="'+q[0].toFixed(1)+'" cy="'+q[1].toFixed(1)+'" r="'+(i===n-1?5:4)+'" class="wc-dot'+(i===n-1?' last':'')+'"/>';});
  lab.forEach(function(i){
    /* étiquette du côté opposé aux voisins : sous un creux, au-dessus d'un pic */
    var q=P[i],nb=[P[i-1],P[i+1]].filter(Boolean),ny=nb.reduce(function(a2,b2){return a2+b2[1];},0)/nb.length,below=q[1]>ny,ty=below?q[1]+19:q[1]-11;
    var anchor=q[0]<pl+14?"start":(q[0]>W-pr-14?"end":"middle");
    svg+='<text x="'+q[0].toFixed(1)+'" y="'+ty.toFixed(1)+'" text-anchor="'+anchor+'" class="wc-val'+(i===n-1?' last':'')+'">'+fr(v[i])+'</text>';
  });
  /* dates : premier, dernier et jusqu'à 3 intermédiaires bien espacés */
  var ticks=[0],minGap=52;for(var i=1;i<n-1;i++){if(P[i][0]-P[ticks[ticks.length-1]][0]>=minGap&&P[n-1][0]-P[i][0]>=minGap)ticks.push(i);}ticks.push(n-1);
  if(ticks.length>5){var keep=[ticks[0]],st=(ticks.length-1)/4;for(var k=1;k<4;k++)keep.push(ticks[Math.round(k*st)]);keep.push(ticks[ticks.length-1]);ticks=keep;}
  ticks.forEach(function(i,k){var d=new Date(wh[i].d+"T12:00:00");svg+='<text x="'+P[i][0].toFixed(1)+'" y="'+(H-8)+'" text-anchor="'+(k===0?"start":(k===ticks.length-1?"end":"middle"))+'" class="wc-date">'+d.getDate()+'/'+(d.getMonth()+1)+'</text>';});
  /* zones de toucher larges (invisibles) */
  P.forEach(function(q,i){svg+='<circle cx="'+q[0].toFixed(1)+'" cy="'+q[1].toFixed(1)+'" r="15" class="wc-hit" data-act="wPt" data-i="'+i+'"/>';});
  svg+='</svg><div class="wc-tip" id="wcTip" hidden></div>';
  wChartPts=wh.map(function(x,i){return {d:x.d,w:v[i],x:P[i][0]/W,y:P[i][1]/H,prev:i?v[i-1]:null};});
  return svg;
}
function showWeightTip(i){
  var tip=$("wcTip"),p=wChartPts[i];if(!tip||!p)return;
  var d=new Date(p.d+"T12:00:00").toLocaleDateString("fr-CH",{weekday:"short",day:"numeric",month:"short"});
  var diff=p.prev!=null?Math.round((p.w-p.prev)*10)/10:null;
  tip.innerHTML='<b>'+fr(p.w)+' kg</b><span>'+esc(d)+(diff!=null?' · <em class="'+(diff<=0?"down":"up")+'">'+(diff>0?"+":diff<0?"−":"±")+fr(Math.abs(diff))+' kg</em>':'')+'</span>';
  tip.hidden=false;
  tip.style.left=Math.max(14,Math.min(86,p.x*100))+"%";tip.style.top=(p.y*100)+"%";
  tip.classList.toggle("below",p.y<0.4);
  document.querySelectorAll("#weightChart .wc-dot").forEach(function(c,k){c.classList.toggle("sel",k===i);});
}
/* ===== renders ===== */
function safeRender(fn){
  try{fn();return true;}catch(e){console.error("EVO render error",e);return false;}
}
function renderAll(){
  safeRender(renderToday);
  safeRender(renderSession);
  safeRender(renderProgress);
  safeRender(renderMeals);
  safeRender(renderWater);
  safeRender(renderProfile);
  safeRender(function(){var wn=weekNo();$("weekTag").textContent="Sem. "+wn;});
}

function renderToday(){
  if(state.page!=="today")return; /* repeinte automatiquement par showPage() à la prochaine visite */
  var w=latestBody(),start=Number(state.profile.start),target=Number(state.profile.target),lost=start-w;

  var mp=muscuProgram(),p=mp[state.suggest%mp.length];
  var hh=new Date().getHours(),greet=hh<12?"Bonjour":(hh<18?"Salut":"Bonsoir");
  var todayPl=planFor(dowIdx()),todayTitle=todayPl.kind==="walk"?todayPl.walk.title:todayPl.p.name;
  $("greetHello").textContent=greet+" 👋";
  var dstr=new Date().toLocaleDateString("fr-CH",{weekday:"long",day:"numeric",month:"long"});
  $("greetSub").textContent=dstr.charAt(0).toUpperCase()+dstr.slice(1)+" · "+(planDoneOn(today())?"programme du jour fait 💪":"au programme : "+todayTitle);
  renderCoach();
  if(!clBusy)renderClaude(false);
  renderPlan();

  $("sLost").textContent=fr(Math.max(0,lost));
  $("sSessions").textContent=state.sessions.length;
  $("sPR").textContent=countPRs();

  var rings=todayRings(p);
  $("ringWrap").innerHTML=ringSVG(rings.seance,rings.eau,rings.repas,rings.score);
  $("legSeance").textContent=rings.seanceTxt;
  $("legSeanceBar").style.width=Math.max(0,Math.min(100,rings.seance))+"%";
  $("legEau").textContent=rings.eauTxt;
  $("legEauBar").style.width=Math.max(0,Math.min(100,rings.eau))+"%";
  $("legRepas").textContent=rings.repasTxt;
  $("legRepasBar").style.width=Math.max(0,Math.min(100,rings.repas))+"%";
  renderBurn();

  renderBackupNag();
  renderEnergy();
}
/* ===== anneaux "score du jour" + streak (refonte ergonomie) ===== */
function todayRings(p){
  p=p||muscuProgram()[state.suggest%muscuProgram().length];
  var seance=0,td=today(),best=null;
  state.program.forEach(function(q){
    var mk=marksFor(q.id),totalSets=0,doneSets=0;
    activeExercises(q).forEach(function(e){var arr=setsArrFor(mk,e);totalSets+=arr.length;doneSets+=arr.filter(function(s){return s.done;}).length;});
    if(doneSets){var pc=Math.round(doneSets/totalSets*100);if(pc>seance||!best){seance=Math.max(seance,pc);best={dn:doneSets,tot:totalSets};}}
  });
  if(state.sessions.some(function(s){return localDay(s.date)===td;})||state.runs.some(function(r){return r.d===td;})||(state.planDone&&state.planDone[td]))seance=100;
  var dk=state.meals.reduce(function(s,m){return s+Number(m.kcal||0);},0);
  var repas=Math.round(Math.min(100,dk/Number(state.profile.cal||2400)*100));
  var wt=(state.water&&state.water.date===td)?state.water:{ml:0},waterGoalMl=Math.max(500,Number(state.waterGoal||3)*1000);
  var eau=Math.round(Math.min(100,Number(wt.ml||0)/waterGoalMl*100));
  var score=Math.round((seance+repas+eau)/3);
  /* textes affichés à côté des anneaux : valeurs réelles plutôt qu'un pourcentage */
  var seanceTxt;
  if(seance>=100)seanceTxt="Fait ✓";
  else if(best)seanceTxt=best.dn+"/"+best.tot+" séries"; /* séance commencée (même si ce n'est pas celle prévue) */
  else{
    var pl=planFor(dowIdx());
    if(pl.kind==="walk")seanceTxt=pl.walk.title;
    else{var pmk=marksFor(pl.p.id),tot=0,dn=0;activeExercises(pl.p).forEach(function(e){var a=setsArrFor(pmk,e);tot+=a.length;dn+=a.filter(function(x){return x.done;}).length;});seanceTxt=dn+"/"+tot+" séries";}
  }
  var wml0=Number(wt.ml||0),eauTxt=(wml0<1000?fmtL(wml0):fmtL(wml0).replace(" L",""))+" / "+String(waterGoalMl/1000).replace(".",",")+" L";
  var repasTxt=Math.round(dk).toLocaleString("fr-CH")+" / "+Number(state.profile.cal||2400).toLocaleString("fr-CH");
  return {seance:seance,eau:eau,repas:repas,score:score,seanceTxt:seanceTxt,eauTxt:eauTxt,repasTxt:repasTxt};
}
function ringSVG(seancePct,eauPct,repasPct,score){
  var cx=64,cy=64,r1=54,r2=42,r3=29,sw=8.5;
  var c1=2*Math.PI*r1,c2=2*Math.PI*r2,c3=2*Math.PI*r3;
  function arc(pct,r,c,color,trackColor){
    var p=Math.max(0,Math.min(100,pct)),dash=(Math.max(p,1.4)/100*c).toFixed(1);
    return '<circle cx="'+cx+'" cy="'+cy+'" r="'+r+'" fill="none" stroke="'+trackColor+'" stroke-width="'+sw+'"/>'
      +'<circle cx="'+cx+'" cy="'+cy+'" r="'+r+'" fill="none" stroke="'+color+'" stroke-width="'+sw+'" stroke-linecap="round" stroke-dasharray="'+dash+' '+c.toFixed(1)+'"/>';
  }
  return '<svg width="128" height="128" viewBox="0 0 128 128">'
    +arc(seancePct,r1,c1,'var(--primary)','rgba(227,174,74,.16)')
    +arc(eauPct,r2,c2,'var(--accent)','rgba(44,99,196,.16)')
    +arc(repasPct,r3,c3,'#d0875a','rgba(208,135,90,.16)')
    +'</svg>'
    +'<div class="ring-center"><div class="score">'+(isFinite(score)?score:0)+'</div><div class="lab">SCORE DU JOUR</div></div>';
}
function computeStreak(){
  var days=trainingDays();
  var t=today(),probe=new Date();
  if(!days[t])probe.setDate(probe.getDate()-1);
  var cur=0;
  while(days[probe.getFullYear()+"-"+pad(probe.getMonth()+1)+"-"+pad(probe.getDate())]){cur++;probe.setDate(probe.getDate()-1);}
  return cur;
}
function computeBestStreak(){
  var daysSet=trainingDays();
  var days=Object.keys(daysSet).sort(),best=0,run=0,prev=null;
  days.forEach(function(d){
    if(prev){var diff=Math.round((new Date(d+"T12:00:00")-new Date(prev+"T12:00:00"))/864e5);run=diff===1?run+1:1;}
    else run=1;
    if(run>best)best=run;
    prev=d;
  });
  return best;
}
function countPRs(){var c=0;for(var k in state.perf){var a=state.perf[k];if(a&&a.length){var mx=Math.max.apply(null,a.map(function(x){return Number(x.w);}));if(mx>0)c++;}}return c;}
function latestPR(){var best=null;for(var k in state.perf){var a=state.perf[k];if(!a||!a.length)continue;var last=a[a.length-1];var prevMax=a.slice(0,-1).reduce(function(m,x){return Math.max(m,Number(x.w));},0);if(Number(last.w)>0&&Number(last.w)>prevMax){if(!best||last.d>=best.d)best={n:k,w:Number(last.w),d:last.d};}}return best;}

function setCount(e){var m=String(e.t).match(/^\s*(\d+)\s*[×xX]/);return m?Math.max(1,Number(m[1])):1;}
function repTarget(e){
  var t=String(e.t||"").trim();
  var m=t.match(/^\d+\s*[×xX]\s*(\d+)(?:[-–](\d+))?\s*$/);
  if(!m)return null;
  return {min:Number(m[1]),max:m[2]?Number(m[2]):Number(m[1])};
}
/* mk[e.n].sets est un tableau [{done,reps}, ...] — au moins setCount(e) entrées, plus si séries bonus ajoutées */
function setsArrFor(mk,e){
  if(!mk[e.n])mk[e.n]={};
  var cnt=setCount(e),cur=mk[e.n].sets;
  if(!Array.isArray(cur)){
    var oldCount=(typeof cur==="number")?cur:(mk[e.n].done?cnt:0); /* filet de sécurité si une séance était en cours au moment de la mise à jour */
    cur=[];
    for(var i=0;i<cnt;i++)cur.push({done:i<oldCount,reps:null});
    mk[e.n].sets=cur;
  }else if(cur.length<cnt){
    while(cur.length<cnt)cur.push({done:false,reps:null});
  }
  return cur;
}
/* durée d'un exercice chronométré ("4 × 30 s", "3 × 20-30 s", "20 min…") en secondes, 0 sinon */
function exDurationSec(e){
  var t=String(e.t||""),m=t.match(/[×xX]\s*(\d+)(?:\s*[-–]\s*(\d+))?\s*s\b/);
  if(m)return Number(m[2]||m[1]);
  m=t.match(/^\s*(\d+)\s*min\b/);
  return m?Number(m[1])*60:0;
}
function fmtSec(sec){return sec>=60?Math.floor(sec/60)+":"+pad(sec%60):sec+" s";}
/* repos entre les séries selon l'exercice : court en HIIT, plus long sur les gros mouvements chargés */
function restFor(p,e){
  if(state.restPref&&state.restPref[e.n])return state.restPref[e.n];
  if(/hiit/i.test(p.id||""))return 20;
  if(exDurationSec(e))return 30;
  if(!e.w)return 60;
  return /écarté|élévation|extension|curl|face pull|abducteur/i.test(e.n)?60:90;
}
/* pas de réglage de la charge : 1 kg pour les haltères, 2.5 kg pour barres et machines */
function weightStep(name){return /haltère/i.test(name)?1:2.5;}
/* surcharge progressive : si toutes les séries ont atteint le haut de la fourchette la dernière
   fois, on propose la charge suivante */
function progressionFor(e){
  var a=state.perf[e.n],rt=repTarget(e);if(!e.w||!rt||!a||!a.length)return null;
  var last=a[a.length-1];
  if(last.r==null||!(Number(last.w)>0)||last.d>=today())return null;
  var up=last.r>=rt.max;
  return {from:Number(last.w),to:up?Math.round((Number(last.w)+weightStep(e.n))*10)/10:Number(last.w),reps:last.r,up:up};
}
function defaultWeight(e){var pg=progressionFor(e);return pg?pg.to:lastWeight(e.n);}
function doneSetCount(mk,e){return setsArrFor(mk,e).filter(function(s){return s.done;}).length;}
function isExDone(mk,e){var arr=setsArrFor(mk,e),cnt=setCount(e);for(var i=0;i<cnt;i++)if(!arr[i].done)return false;return true;}
function exSets(mk,e){return doneSetCount(mk,e);} /* conservé pour compat : nombre total de séries validées (bonus incluses) */
function repsFor(mk,e){var rt=repTarget(e);if(!rt)return null;var st=mk[e.n]||{};return st.reps!=null?st.reps:rt.max;}
function estimateDurationMin(p){
  var active=activeExercises(p),totalSets=0;
  active.forEach(function(e){totalSets+=setCount(e);});
  return Math.max(15,Math.round(totalSets*2.5/5)*5);
}
function exerciseRowHTML(e,mk){
  var arr=setsArrFor(mk,e),cnt=setCount(e),isDone=isExDone(mk,e);
  var doneN=arr.filter(function(s){return s.done;}).length;
  var last=lastWeight(e.n);
  var removeAct=e.extra?"removeExtraEx":"excludeEx";
  var lastE=(state.perf[e.n]||[]).slice(-1)[0];
  var meta=esc(e.t)+(last>0?" · dernier "+fr(last)+" kg"+(lastE&&lastE.r?" × "+lastE.r:""):"");
  return '<div class="exrow'+(isDone?" done":"")+'" data-act="guidedJump" data-ex="'+esc(e.n)+'">'
    +'<div class="exrow-check">'+(isDone?'✓':(doneN>0?doneN+"/"+cnt:''))+'</div>'
    +(exPhotos(e.n)?'<img class="exrow-art" src="'+photoUrl(exPhotos(e.n)[exPhotos(e.n).length-1])+'" alt="" loading="lazy">':'')
    +'<div class="exrow-info"><h3>'+esc(e.n)+'</h3><div class="t">'+meta+'</div></div>'
    +'<button class="exrow-x" data-act="'+removeAct+'" data-ex="'+esc(e.n)+'" title="'+(e.extra?"Supprimer":"Retirer aujourd’hui")+'"><svg class="ic-s" aria-hidden="true"><use href="#i-xmark"/></svg></button>'
    +'</div>';
}
/* recalcule seulement les compteurs/la barre de progression — pas les cartes d'exercice */
function updateSessionTotals(){
  var p=state.program[state.selDay],mk=marksFor(p.id),active=activeExercises(p);
  var totalSets=0,doneSets=0,doneEx=0;
  active.forEach(function(e){var arr=setsArrFor(mk,e);totalSets+=arr.length;doneSets+=arr.filter(function(s){return s.done;}).length;if(isExDone(mk,e))doneEx++;});
  $("sesDoneN").textContent=doneEx;$("sesTotN").textContent="/"+active.length;
  $("sesProg").style.width=(totalSets?doneSets/totalSets*100:0)+"%";
  $("sesProgText").textContent=doneSets+"/"+totalSets+" séries";
}
/* remplace uniquement la ligne de l'exercice modifié — évite de reconstruire toute la liste
   (et de perdre le focus/défiler) ; rafraîchit aussi le mode guidé s'il est ouvert */
function refreshExerciseCard(exName){
  var p=state.program[state.selDay],mk=marksFor(p.id),e=findActiveEx(p,exName);if(!e)return;
  var rows=$("exList").querySelectorAll(".exrow");
  for(var i=0;i<rows.length;i++){
    if(rows[i].dataset.ex===exName){rows[i].outerHTML=exerciseRowHTML(e,mk);break;}
  }
  updateSessionTotals();
  if(guidedOpen)renderGuided();
}
function renderSession(){
  document.querySelectorAll("#sessCatTabs .cat-tab").forEach(function(b){b.classList.toggle("on",b.dataset.cat===state.sessionCategory);});
  var isRunning=state.sessionCategory==="running";
  $("sessExerciseView").style.display=isRunning?"none":"";
  $("sessRunningView").style.display=isRunning?"":"none";
  if(isRunning){
    renderRunningView();
    return;
  }
  var dayList=state.program.filter(function(p){return (p.cat||"muscu")===state.sessionCategory;});
  var chips=$("dayChips");
  var plToday=planFor(dowIdx()),plannedId=plToday.kind==="walk"?null:plToday.p.id;
  /* toutes les séances de la catégorie en cartes : nom complet, durée, dernière fois, jour prévu */
  chips.innerHTML=state.program.map(function(p,i){
    if((p.cat||"muscu")!==state.sessionCategory)return "";
    var ls=state.sessions.find(function(x){return x.dayId===p.id;}),st2;
    if(p.id===plannedId)st2='<i class="pc-tag today">Aujourd\'hui</i>';
    else if(ls){var dd=Math.round((new Date(today()+"T12:00:00")-new Date(localDay(ls.date)+"T12:00:00"))/864e5);st2='<i class="pc-tag">'+(dd<=0?"fait aujourd'hui":(dd===1?"fait hier":"il y a "+dd+" j"))+'</i>';}
    else st2='<i class="pc-tag new">Jamais faite</i>';
    return '<button class="chip pcard '+(i===state.selDay?"on":"")+(p.id===plannedId?" planned":"")+'" data-act="selDay" data-i="'+i+'"><span class="e">'+p.icon+'</span><b>'+esc(p.name)+'</b><small>'+activeExercises(p).length+' exos · ~'+estimateDurationMin(p)+' min</small>'+st2+'</button>';
  }).join("");
  var p=state.program[state.selDay];
  if(!p||(p.cat||"muscu")!==state.sessionCategory){p=dayList[0];state.selDay=state.program.indexOf(p);}
  $("sesIc").innerHTML=p.icon;$("sesName").textContent=p.name;$("sesFocus").textContent=p.focus;
  var ban=$("sesBanner");if(ban){var ph=activeExercises(p).map(function(e){var x=exPhotos(e.n);return x?photoUrl(x[x.length-1]):null;}).filter(Boolean).slice(0,3);
    ban.innerHTML=ph.map(function(u){return '<img src="'+u+'" alt="" loading="lazy">';}).join("");ban.hidden=!ph.length;}
  /* la puce choisie reste visible (la liste défile horizontalement) */
  var onChip=chips.querySelector(".chip.on");
  if(onChip){var cr=chips.getBoundingClientRect(),br=onChip.getBoundingClientRect();if(br.left<cr.left||br.right>cr.right)chips.scrollLeft+=br.left-cr.left-(cr.width-br.width)/2;}
  var tag=$("sesTodayTag");
  if(tag){
    if(p.id===plannedId)tag.innerHTML='<span class="today-tag">Prévu aujourd\'hui</span>';
    else if(plannedId)tag.innerHTML='<button class="today-link" data-act="sessToday">↩ Séance du jour : '+esc(plToday.p.short)+'</button>';
    else tag.innerHTML='<span class="today-tag rest">Aujourd\'hui : '+esc(plToday.walk.title.toLowerCase())+'</span>';
  }
  var mk=marksFor(p.id),active=activeExercises(p),excl=excludedFor(p.id);
  $("exList").innerHTML=active.map(function(e){return exerciseRowHTML(e,mk);}).join("")
    +'<div class="exc-foot">'
    +'<button class="btn ghost" data-act="addExOpen">＋ Ajouter un exercice</button>'
    +(excl.length?'<button class="btn ghost" data-act="restoreEx">↺ Restaurer ('+excl.length+')</button>':'')
    +'</div>';
  renderProgList();
  var nSets=active.reduce(function(t,e){return t+setCount(e);},0);
  $("sesMeta").textContent=active.length+" exercice"+(active.length>1?"s":"")+" · "+nSets+" séries · ~"+estimateDurationMin(p)+" min";
  /* dernière fois que cette séance a été faite */
  var lastS=state.sessions.find(function(x){return x.dayId===p.id;}),sl=$("sesLast");
  if(sl){if(lastS){var ld=new Date(lastS.date),parts=[ld.toLocaleDateString("fr-CH",{weekday:"short",day:"numeric",month:"short"})];if(lastS.dur)parts.push(lastS.dur+" min");if(lastS.vol)parts.push(lastS.vol.toLocaleString("fr-CH")+" kg soulevés");sl.textContent="Dernière fois : "+parts.join(" · ");}else sl.textContent="Première fois : prends des charges légères pour apprendre le mouvement.";}
  var totalSets=0,doneSets=0;
  active.forEach(function(e){var arr=setsArrFor(mk,e);totalSets+=arr.length;doneSets+=arr.filter(function(s){return s.done;}).length;});
  $("sesCta").textContent=doneSets>0?"Continuer la séance":"Démarrer la séance";
  $("sesProgWrap").style.display=doneSets>0?"":"none";
  updateSessionTotals();
}
function switchSessionCategory(cat){
  if(["muscu","maison","running"].indexOf(cat)<0)return;
  state.sessionCategory=cat;
  if(cat!=="running"){
    var idx=state.program.findIndex(function(p){return (p.cat||"muscu")===cat;});
    if(idx>=0)state.selDay=idx;
  }
  save();renderSession();
}
/* extrait un objectif numérique (minutes / km) d'un texte de semaine "course continue" —
   les semaines en fractionné (1-6) ne s'y prêtent pas, pas de comparaison fiable possible */
function parseWeekTarget(goal){
  var mm=goal.match(/(\d+)(?:-(\d+))?\s*min/);
  if(!mm)return null;
  var mk=goal.match(/(\d+(?:[.,]\d+)?)(?:-(\d+(?:[.,]\d+)?))?\s*km/);
  return {
    minMin:Number(mm[1]),maxMin:mm[2]?Number(mm[2]):Number(mm[1]),
    minKm:mk?Number(String(mk[1]).replace(",",".")):null,
    maxKm:mk?Number(String(mk[2]||mk[1]).replace(",",".")):null
  };
}
function runsSinceWeekStart(){
  var sd=state.runProg.weekStartDate||today();
  return state.runs.filter(function(r){return !r.walk&&r.d>=sd;});
}
/* suggestion d'adaptation du programme à partir des courses réellement loguées cette
   semaine, comparées à l'objectif — seulement pour les semaines "course continue"
   (7-10) où kcal/distance sont comparables ; le fractionné (1-6) n'est pas mesurable
   avec juste distance+durée totales */
function computeRunSuggestion(){
  if(state.runProg.week<7)return null;
  if(!state.runProg.done.every(function(x){return x;}))return null;
  var target=parseWeekTarget(RUNNING_PROGRAM[state.runProg.week-1].goal);
  if(!target)return null;
  var runs=runsSinceWeekStart();
  if(!runs.length)return null;
  var avgDur=runs.reduce(function(s,r){return s+Number(r.dur||0);},0)/runs.length;
  var avgDist=runs.reduce(function(s,r){return s+Number(r.dist||0);},0)/runs.length;
  var comfortable=avgDur>=target.maxMin*1.1||(target.maxKm&&avgDist>=target.maxKm*1.1);
  var struggled=avgDur<target.minMin*0.75&&(!target.minKm||avgDist<target.minKm*0.75);
  if(comfortable&&state.runProg.week<RUNNING_PROGRAM.length){
    return {type:"advance",text:"Tes courses dépassent nettement l'objectif (moy. "+fr(avgDur)+" min"+(avgDist?" · "+fr(avgDist)+" km":"")+") — tu peux avancer plus vite."};
  }
  if(struggled){
    return {type:"repeat",text:"Tes courses restent en dessous de l'objectif (moy. "+fr(avgDur)+" min) — reprends cette semaine tranquillement avant d'avancer."};
  }
  return {type:"normal",text:"Objectif de la semaine atteint, bien joué !"};
}
function renderRunningView(){
  var wk=RUNNING_PROGRAM[state.runProg.week-1];
  $("runProgWeekN").textContent="Semaine "+state.runProg.week+" / "+RUNNING_PROGRAM.length;
  $("runProgGoal").textContent=wk.goal;
  $("runProgSessions").innerHTML=[0,1,2].map(function(i){
    var done=!!state.runProg.done[i];
    return '<div class="run-prog-s '+(done?"done":"")+'" data-act="runProgToggle" data-i="'+i+'"><div class="rs-check"><svg class="ic-s" aria-hidden="true"><use href="#i-checkmark"/></svg></div><span>Séance '+(i+1)+' / 3</span></div>';
  }).join("");
  var sugg=computeRunSuggestion(),suggEl=$("runProgSuggestion");
  if(sugg){
    var btn=sugg.type==="advance"?'<button class="btn mint" data-act="runProgSkip">⏩ Avancer plus vite</button>'
      :sugg.type==="repeat"?'<button class="btn ghost" data-act="runProgRepeat">🔁 Refaire cette semaine</button>':"";
    suggEl.innerHTML='<div class="sub">'+esc(sugg.text)+'</div>'+btn;
    suggEl.style.display="";
  }else{suggEl.style.display="none";}
  var info=$("runProgInfo");
  var onlyRuns=(state.runs||[]).filter(function(r){return !r.walk;});
  if(onlyRuns.length){
    var lastRun=onlyRuns.slice().sort(function(a,b){return b.d.localeCompare(a.d);})[0];
    var pc=(lastRun.dist>0&&lastRun.dur>0)?" · "+fmtPace(lastRun.dur/lastRun.dist)+" /km":"";
    info.textContent="Dernière course : "+fr(lastRun.dist)+" km"+pc+" · "+onlyRuns.length+" au total";
  }else{info.textContent="Aucune course enregistrée — lance-toi !";}
}
function autoTickRunProg(d){
  if(!d||d<(state.runProg.weekStartDate||"")||d>today())return;
  var i=state.runProg.done.indexOf(false);if(i<0)return;
  state.runProg.done[i]=true;
  setTimeout(function(){toast("Programme course : séance "+(i+1)+"/3 cochée");},2100);
}
function runProgToggle(i){
  state.runProg.done[i]=!state.runProg.done[i];
  save();renderRunningView();
}
function runProgRepeat(){
  state.runProg.done=[false,false,false];
  state.runProg.weekStartDate=today();
  save();renderRunningView();
  toast("Semaine relancée");
}
function runProgWeekShift(d){
  var nw=Math.max(1,Math.min(RUNNING_PROGRAM.length,state.runProg.week+d));
  if(nw!==state.runProg.week)state.runProg.weekStartDate=today();
  state.runProg.week=nw;
  if(d!==0)state.runProg.done=[false,false,false];
  save();renderRunningView();
}
function findActiveEx(p,exName){return activeExercises(p).filter(function(x){return x.n===exName;})[0];}
function setWeight(exName,delta){
  var p=state.program[state.selDay],mk=marksFor(p.id);
  var ex=findActiveEx(p,exName);
  var cur=(mk[exName]&&mk[exName].w!=null)?mk[exName].w:(ex?defaultWeight(ex):lastWeight(exName));
  cur=Math.max(0,Math.round((Number(cur)+delta)*2)/2);
  if(!mk[exName])mk[exName]={};mk[exName].w=cur;save();refreshExerciseCard(exName);
}
/* corrige la valeur affichée d'un champ ex sans reconstruire toute la liste :
   un renderSession() ici pourrait démolir l'élément que l'utilisateur est en train
   de taper juste après (le blur qui déclenche ce correctif peut arriver dans le
   même geste qu'un tap sur une pastille de série voisine) */
function syncFieldValue(cls,exName,val){
  var els=document.querySelectorAll("."+cls);
  for(var i=0;i<els.length;i++)if(els[i].dataset.ex===exName){els[i].value=val;break;}
}
function setWeightExact(exName,val){
  var p=state.program[state.selDay],mk=marksFor(p.id);
  var n=Number(String(val).replace(",","."));if(!isFinite(n)||n<0)n=0;if(n>500)n=500;n=Math.round(n*10)/10;
  if(!mk[exName])mk[exName]={};mk[exName].w=n;save();
  syncFieldValue("wval",exName,num(n));
}
function setReps(exName,delta){
  var p=state.program[state.selDay],mk=marksFor(p.id),e=findActiveEx(p,exName);if(!e)return;
  var rt=repTarget(e);if(!rt)return;
  var cur=repsFor(mk,e);cur=Math.max(0,Math.min(200,cur+delta));
  if(!mk[exName])mk[exName]={};mk[exName].reps=cur;save();refreshExerciseCard(exName);
}
function setRepsExact(exName,val){
  var p=state.program[state.selDay],mk=marksFor(p.id),e=findActiveEx(p,exName);if(!e||!repTarget(e))return;
  var n=Math.round(Number(val));if(!isFinite(n)||n<0)n=0;if(n>200)n=200;
  if(!mk[exName])mk[exName]={};mk[exName].reps=n;save();
  syncFieldValue("rval",exName,n);
}
function setTick(exName,i){
  var p=state.program[state.selDay],mk=marksFor(p.id),e=findActiveEx(p,exName);if(!e)return;
  var arr=setsArrFor(mk,e);if(!arr[i])return;
  var nowDone=!arr[i].done;
  haptic(nowDone?"medium":"light");
  if(nowDone&&mk[exName].w==null&&e.w){var lw=defaultWeight(e);if(lw>0)mk[exName].w=lw;}
  arr[i]={done:nowDone,reps:nowDone?repsFor(mk,e):null,w:nowDone&&e.w?Number(mk[exName].w||0):null};
  /* heure de la 1re série, gardée même si iOS ferme l'app en arrière-plan : sert à la durée de la séance */
  if(nowDone){if(!state.session.start)state.session.start={};if(!state.session.start[p.id])state.session.start[p.id]=Date.now();}
  if(nowDone&&e.w&&!(Number(mk[exName].w)>0))toast("Pense à indiquer la charge (kg) pour suivre tes progrès");
  save();refreshExerciseCard(exName);
  if(nowDone)startRest(restFor(p,e),e.n);
  else if(restEx===exName)stopRest();
}
/* série bonus (jusqu'à 10) */
function addSet(exName){
  var p=state.program[state.selDay],mk=marksFor(p.id),e=findActiveEx(p,exName);if(!e)return;
  var arr=setsArrFor(mk,e);if(arr.length>=10){toast("10 séries maximum");return;}
  arr.push({done:false,reps:null});save();refreshExerciseCard(exName);haptic("light");
}
function excludeEx(exName){
  var p=state.program[state.selDay];
  var exc=excludedFor(p.id);if(exc.indexOf(exName)<0)exc.push(exName);
  save();renderSession();
  snack("« "+exName+" » retiré pour aujourd’hui","Annuler",function(){
    var exc2=excludedFor(p.id),i=exc2.indexOf(exName);if(i>=0)exc2.splice(i,1);
    save();renderSession();
  },5000);
}
function restoreEx(){
  var p=state.program[state.selDay];
  state.session.excluded[p.id]=[];
  save();renderSession();
}
function removeExtraEx(exName){
  var p=state.program[state.selDay],ex=extraFor(p.id);
  var removed=ex.find(function(x){return x.n===exName;});
  state.session.extra[p.id]=ex.filter(function(x){return x.n!==exName;});
  var mk=marksFor(p.id),removedMarks=mk[exName];delete mk[exName];
  save();renderSession();
  if(removed){
    snack("« "+exName+" » supprimé","Annuler",function(){
      extraFor(p.id).push(removed);
      if(removedMarks)marksFor(p.id)[exName]=removedMarks;
      save();renderSession();
    },5000);
  }
}
function openAddExercise(){
  $("addExName").value="";$("addExSets").value="3";$("addExReps").value="";$("addExWeighted").checked=true;
  $("addExModal").classList.add("on");setTimeout(function(){$("addExName").focus();},50);
}
function closeAddExercise(){$("addExModal").classList.remove("on");}
function saveAddExercise(){
  var name=$("addExName").value.trim();if(!name){toast("Indique un nom d'exercice");return;}
  var sets=Math.max(1,Math.min(15,Math.round(Number($("addExSets").value)||3)));
  var reps=$("addExReps").value.trim();
  if(reps&&!/^\d+(?:[-–]\d+)?$/.test(reps)){toast("Répétitions : un nombre ou une plage, ex. 8-10");return;}
  var weighted=$("addExWeighted").checked;
  var t=sets+" ×"+(reps?" "+reps:"");
  var p=state.program[state.selDay],ex=extraFor(p.id),lname=name.toLowerCase();
  if(ex.some(function(x){return x.n.toLowerCase()===lname;})||p.ex.some(function(x){return x.n.toLowerCase()===lname;})){toast("Un exercice porte déjà ce nom");return;}
  ex.push({n:name,t:t,w:weighted,extra:true});
  closeAddExercise();save();renderSession();toast("Exercice ajouté pour aujourd’hui");
}
function finishSession(){
  var p=state.program[state.selDay],mk=marksFor(p.id),active=activeExercises(p);
  var doneEx=active.filter(function(e){return isExDone(mk,e);});
  if(!doneEx.length){toast("Coche au moins un exercice");return;}
  var d=today();
  undoBuf={dayId:p.id,marks:JSON.parse(JSON.stringify(mk)),perf:{},suggest:state.suggest};
  doneEx.forEach(function(e){if(e.w)undoBuf.perf[e.n]=state.perf[e.n]?JSON.parse(JSON.stringify(state.perf[e.n])):null;});
  applyFinish(p,doneEx,d,active.length);
  state.session.marks[p.id]={};
  if((p.cat||"muscu")==="muscu"){
    var mp=muscuProgram(),idxInMp=mp.findIndex(function(x){return x.id===p.id;});
    if(idxInMp>=0)state.suggest=(idxInMp+1)%mp.length;
  }
  save();
  snack("Séance enregistrée · "+doneEx.length+"/"+active.length,"Annuler",undoFinish,6000);
  renderAll();
}
function applyFinish(p,doneEx,d,totalCount){
  doneEx.forEach(function(e){
    if(!e.w)return;
    var mk=marksFor(p.id),wv=Number(mk[e.n].w||0);
    var doneSets=(mk[e.n].sets||[]).filter(function(x){return x.done;}),rt0=repTarget(e);
    var det=doneSets.map(function(x){return {w:Number(x.w!=null?x.w:wv)||0,r:x.reps!=null?x.reps:(rt0?rt0.max:null)};}).filter(function(x){return x.w>0;});
    if(det.length)wv=Math.max.apply(null,det.map(function(x){return x.w;}));
    if(!(wv>0))return;
    if(!state.perf[e.n])state.perf[e.n]=[];
    var top=det.filter(function(x){return x.w===wv;}),rt=repTarget(e);
    var r=rt&&top.length&&top.every(function(x){return x.r!=null;})?Math.min.apply(null,top.map(function(x){return x.r;})):null;
    var arr=state.perf[e.n],ix=arr.findIndex(function(x){return x.d===d;});
    var entry={d:d,w:wv,r:r};if(det.length)entry.s=det;
    if(ix>=0)arr[ix]=entry;else arr.push(entry);
    arr.sort(function(a,b){return a.d.localeCompare(b.d);});
  });
  state.sessions.unshift({date:new Date().toISOString(),dayId:p.id,name:p.name,done:doneEx.length,total:totalCount!=null?totalCount:p.ex.length});
  state.sessions=state.sessions.slice(0,200);
}
function undoFinish(){
  if(!undoBuf)return;var b=undoBuf;
  for(var nm in b.perf){if(b.perf[nm]===null)delete state.perf[nm];else state.perf[nm]=b.perf[nm];}
  state.sessions.shift();
  state.session.marks[b.dayId]=b.marks;
  state.suggest=b.suggest;undoBuf=null;save();renderAll();showPage("session");toast("Séance annulée");
}

/* ===== mode séance guidée plein écran (refonte ergonomie) ===== */
function currentGuidedList(){var p=state.program[state.selDay];return activeExercises(p);}
function findFirstUnfinishedIndex(list,mk){for(var i=0;i<list.length;i++)if(!isExDone(mk,list[i]))return i;return 0;}
function findNextUnfinishedIndex(list,mk,fromIdx){var n=list.length;for(var k=0;k<n;k++){var idx=(fromIdx+k)%n;if(!isExDone(mk,list[idx]))return idx;}return -1;}
function openGuidedSession(jumpToEx){
  var p=state.program[state.selDay];
  if(!p||!p.ex||!p.ex.length){toast("Aucun exercice pour ce jour");return;}
  var mk=marksFor(p.id),list=activeExercises(p);
  if(!list.length){toast("Aucun exercice actif");return;}
  var jumpIdx=jumpToEx?list.findIndex(function(e){return e.n===jumpToEx;}):-1;
  guidedIndex=jumpIdx>=0?jumpIdx:findFirstUnfinishedIndex(list,mk);
  guidedOpen=true;
  if(guidedDayId!==p.id||!guidedStartTimes[p.id])guidedStartTimes[p.id]=Date.now();
  guidedDayId=p.id;
  guidedFrom=state.page==="today"?"today":"session"; /* retour : là d'où on a lancé la séance */
  state.page="session";
  document.querySelectorAll(".page").forEach(function(s){s.classList.toggle("on",s.id==="session");});
  document.querySelectorAll(".nav button").forEach(function(b){b.classList.toggle("on",b.dataset.page==="session");});
  $("guidedView").classList.add("on");
  requestWake(); /* l'écran reste allumé : le minuteur et le son continuent */
  updateSoundBtn();
  renderSession();
  renderGuided();
}
function closeGuided(){cancelWork();stopPhotoCycle();if(guidedOpen&&!runActive)releaseWake();var gi=$("gExIcon");if(gi)gi.dataset.ex="";guidedOpen=false;var v=$("guidedView");if(v)v.classList.remove("on");}
function renderGuided(){
  if(!guidedOpen)return;
  var p=state.program[state.selDay],mk=marksFor(p.id),list=currentGuidedList();
  if(!list.length){closeGuided();return;}
  if(guidedIndex>=list.length)guidedIndex=list.length-1;
  if(guidedIndex<0)guidedIndex=0;
  var e=list[guidedIndex];
  var arr=setsArrFor(mk,e);
  var totalSets=0,doneSets=0;
  list.forEach(function(x){var a=setsArrFor(mk,x);totalSets+=a.length;doneSets+=a.filter(function(s){return s.done;}).length;});
  $("gProgBar").style.width=(totalSets?doneSets/totalSets*100:0)+"%";
  $("gExN").textContent="Exercice "+(guidedIndex+1)+" / "+list.length;
  guidedDoneSets=doneSets;guidedTotalSets=totalSets;updateGuidedClock();
  /* bandeau des exercices : un appui pour sauter à n'importe lequel */
  $("gStrip").innerHTML=list.map(function(x,i){var done=isExDone(mk,x),part=!done&&setsArrFor(mk,x).some(function(z){return z.done;});
    return '<button class="gst'+(i===guidedIndex?" cur":"")+(done?" done":"")+(part?" part":"")+'" data-act="gJump" data-i="'+i+'" aria-label="'+esc(x.n)+'">'+(done?'✓':(i+1))+'</button>';}).join("");
  var cur=$("gStrip").querySelector(".gst.cur");if(cur){var sr=$("gStrip").getBoundingClientRect(),cr=cur.getBoundingClientRect();if(cr.left<sr.left||cr.right>sr.right)$("gStrip").scrollLeft+=cr.left-sr.left-(sr.width-cr.width)/2;}
  /* à suivre */
  var nxt=null;for(var k=1;k<=list.length;k++){var cand=list[(guidedIndex+k)%list.length];if(cand!==e&&!isExDone(mk,cand)){nxt=cand;break;}}
  $("gUpNext").innerHTML=nxt?'<span>À suivre</span><b>'+esc(nxt.n)+'</b><em>'+esc(nxt.t)+'</em>':(isExDone(mk,e)?'<span>Dernier exercice terminé</span><b>Tu peux conclure la séance</b>':'<span>Dernier exercice</span><b>Plus que celui-ci !</b>');
  $("gPrevBtn").disabled=guidedIndex<=0;
  $("gSessName").textContent=p.name;
  $("gExName").textContent=e.n;
  var last=lastWeight(e.n);
  var pg=progressionFor(e),lastE=(state.perf[e.n]||[]).slice(-1)[0],lastTxt="";
  if(lastE&&lastE.s&&lastE.s.length){
    var sameW=lastE.s.every(function(x){return x.w===lastE.s[0].w;});
    lastTxt=" · dernière fois "+(sameW?fr(lastE.s[0].w)+" kg × "+lastE.s.map(function(x){return x.r;}).join(" · "):lastE.s.map(function(x){return fr(x.w)+"×"+x.r;}).join(" · "));
  }else if(pg)lastTxt=" · dernière fois "+fr(pg.from)+" kg × "+pg.reps;
  else if(last>0)lastTxt=" · dernière fois "+fr(last)+" kg";
  $("gExSub").innerHTML=esc(e.t)+lastTxt
    +(pg&&pg.up?'<div class="g-prog">Toutes tes séries réussies : essaie '+fr(pg.to)+' kg</div>':'');
  /* écran de séance épuré : uniquement les séries, pas de photo */
  var ic=$("gExIcon");if(ic&&ic.innerHTML){stopPhotoCycle();ic.innerHTML="";ic.dataset.ex="";}

  var st=mk[e.n]||{},wv=(st.w!=null?st.w:defaultWeight(e)),rt=repTarget(e),rv=repsFor(mk,e),vals="";
  if(e.w)vals+='<div class="val-group"><button data-act="w-" data-ex="'+esc(e.n)+'"><svg class="ic-s" aria-hidden="true"><use href="#i-minus"/></svg></button><div class="val"><input class="wval gw-in" data-ex="'+esc(e.n)+'" type="text" inputmode="decimal" value="'+num(wv)+'" aria-label="Charge en kg"><span>KG</span></div><button data-act="w+" data-ex="'+esc(e.n)+'"><svg class="ic-s" aria-hidden="true"><use href="#i-plus"/></svg></button></div>';
  if(e.w&&rt)vals+='<div class="guided-sep"></div>';
  if(rt)vals+='<div class="val-group"><button data-act="r-" data-ex="'+esc(e.n)+'"><svg class="ic-s" aria-hidden="true"><use href="#i-minus"/></svg></button><div class="val"><b style="color:var(--accent-text)">'+rv+'</b><span>REPS</span></div><button data-act="r+" data-ex="'+esc(e.n)+'"><svg class="ic-s" aria-hidden="true"><use href="#i-plus"/></svg></button></div>';
  if(!vals)vals='<div class="val"><b>'+arr.length+'</b><span>SÉRIES</span></div>';
  $("gVals").innerHTML=vals;

  var firstUndone=arr.findIndex(function(s){return !s.done;});
  $("gSets").innerHTML=arr.map(function(s,i){
    var label;
    if(s.done)label=e.w&&s.w>0?('<b>'+fr(s.w)+'</b><small>'+(rt?"× "+s.reps:"kg")+'</small>'):(rt?'<b>'+s.reps+'</b><small>reps</small>':"✓");
    else label='<small>Série</small><b>'+(i+1)+'</b>';
    var cls="gs"+(s.done?" on":"")+(!s.done&&i===firstUndone?" cur":"")+(i>=setCount(e)?" bonus":"");
    return '<button class="'+cls+'" data-act="setTick" data-ex="'+esc(e.n)+'" data-i="'+i+'">'+label+'</button>';
  }).join("")+(arr.length<10?'<button class="gs gs-add" data-act="addSet" data-ex="'+esc(e.n)+'" aria-label="Ajouter une série"><svg class="ic-s" aria-hidden="true"><use href="#i-plus"/></svg></button>':"");

  var dur=exDurationSec(e),nb=$("gNextBtn");
  nb.classList.toggle("work",!!(workEnd&&workEx===e.n));
  if(isExDone(mk,e))nb.textContent="Exercice suivant";
  else if(workEnd&&workEx===e.n)updateWork();
  else{var fu=arr.findIndex(function(z){return !z.done;});nb.textContent=dur?"Lancer le chrono · "+fmtSec(dur):"Valider la série "+(fu+1)+"/"+arr.length;}
  /* pendant le repos : ce qui vient ensuite */
  var rn=$("gRestNext");if(rn){var fu2=arr.findIndex(function(z){return !z.done;});
    rn.textContent=fu2>=0?"Ensuite : série "+(fu2+1)+"/"+arr.length+(e.w?" · "+fr(wv)+" kg":"")+(rt?" × "+rv:""):(nxt?"Ensuite : "+nxt.n:"Séance presque finie !");}
}
/* chrono de la séance (depuis la 1re série, gardé même si l'app est fermée) + séries faites */
var guidedDoneSets=0,guidedTotalSets=0;
function updateGuidedClock(){
  var el=$("gClock");if(!el||!guidedOpen)return;
  var p=state.program[state.selDay];if(!p)return;
  var first=(state.session.start||{})[p.id],t0=first?first-60000:guidedStartTimes[p.id];
  var sec=t0?Math.max(0,Math.floor((Date.now()-t0)/1000)):0;
  el.textContent=guidedDoneSets+"/"+guidedTotalSets+" séries · "+Math.floor(sec/60)+":"+pad(sec%60);
}
/* chrono des exercices en secondes (gainage, HIIT…) : la série est validée à la fin */
var workEnd=0,workEx=null,workTickSec=0;
function startWork(name,sec){workEnd=Date.now()+sec*1000;workEx=name;workTickSec=0;stopRest();haptic("light");}
function cancelWork(){workEnd=0;workEx=null;var nb=$("gNextBtn");if(nb)nb.classList.remove("work");}
function updateWork(){
  if(!workEnd)return;
  var left=workEnd-Date.now(),nb=$("gNextBtn");
  if(left<=0){
    cancelWork();haptic("success");beepEnd();
    try{if(navigator.vibrate)navigator.vibrate([120,60,120]);}catch(e){}
    if(guidedOpen)guidedAdvance(true);
    return;
  }
  var wsc=Math.ceil(left/1000);
  if(wsc<=3&&wsc!==workTickSec){workTickSec=wsc;beepTick();}
  if(nb&&guidedOpen)nb.textContent=fmtSec(wsc)+" · toucher pour terminer";
}
function guidedAdvance(fromTimer){
  var p=state.program[state.selDay],mk=marksFor(p.id),list=currentGuidedList();
  if(!list.length)return;
  var e=list[guidedIndex],arr=setsArrFor(mk,e);
  var i=arr.findIndex(function(s){return !s.done;});
  var dur=exDurationSec(e);
  if(dur&&i>=0&&!fromTimer){
    if(workEnd&&workEx===e.n)cancelWork(); /* arrêt avant la fin : la série compte quand même */
    else{startWork(e.n,dur);renderGuided();return;}
  }
  if(i>=0)setTick(e.n,i);
  if(isExDone(mk,e)){
    var nextIdx=findNextUnfinishedIndex(list,mk,guidedIndex+1);
    if(nextIdx<0){guidedFinishFlow();return;}
    guidedIndex=nextIdx;
  }
  renderGuided();
}
function guidedSkip(){
  cancelWork();
  var list=currentGuidedList();
  if(!list.length)return;
  if(guidedIndex<list.length-1)guidedIndex++;else toast("Dernier exercice");
  renderGuided();
}
function guidedPrev(){
  cancelWork();
  var list=currentGuidedList();
  if(!list.length)return;
  if(guidedIndex>0)guidedIndex--;else toast("Premier exercice");
  renderGuided();
}
function guidedFinishNow(){
  var p=state.program[state.selDay],mk=marksFor(p.id),active=activeExercises(p);
  if(!active.some(function(e){return isExDone(mk,e);})){toast("Termine au moins un exercice avant de conclure");return;}
  guidedFinishFlow();
}
function guidedFinishFlow(){
  var p=state.program[state.selDay],mk=marksFor(p.id),active=activeExercises(p);
  var totalVolume=0;
  active.forEach(function(e){
    var arr=setsArrFor(mk,e);
    arr.forEach(function(s){
      if(s.done&&e.w){var wv=Number(s.w!=null?s.w:(mk[e.n]||{}).w||0),reps=Number(s.reps||(repTarget(e)?repTarget(e).max:0));totalVolume+=wv*reps;}
    });
  });
  var first=(state.session.start||{})[p.id],t0=first?first-60000:(guidedStartTimes[p.id]||Date.now());
  var durMs=Date.now()-t0,durMin=Math.max(1,Math.min(240,Math.round(durMs/60000)));
  if(state.session.start)delete state.session.start[p.id];
  var kcal=estimateSessionKcal(p.cat,durMin);
  var doneExCount=active.filter(function(e){return isExDone(mk,e);}).length;
  var prevBestStreak=computeBestStreak(),sessionName=p.name,exCount=doneExCount;
  var nSessions=state.sessions.length;
  finishSession();
  if(state.sessions.length>nSessions){state.sessions[0].dur=durMin;state.sessions[0].vol=Math.round(totalVolume);state.sessions[0].kcal=kcal;save();}
  stopRest();
  closeGuided();
  var lp=latestPR(),isNewPR=!!(lp&&lp.d===today());
  var streakNow=computeStreak();
  delete guidedStartTimes[p.id];
  openComplete({
    sessionName:sessionName,gym:(p.cat||"muscu")==="muscu",exCount:exCount,durMin:durMin,volume:Math.round(totalVolume),kcal:kcal,
    isNewPR:isNewPR,prName:isNewPR?lp.n:null,prWeight:isNewPR?lp.w:null,
    streak:streakNow,bestStreak:Math.max(prevBestStreak,streakNow)
  });
}
function openComplete(data){
  $("cpSub").textContent=data.sessionName+" · "+data.exCount+" exercice"+(data.exCount>1?"s":"")+" complété"+(data.exCount>1?"s":"");
  var pr=$("cpPR");
  if(data.isNewPR){pr.style.display="";$("cpPRText").textContent="Record · "+data.prName+" "+fr(data.prWeight)+" kg";}
  else pr.style.display="none";
  $("cpDur").textContent=data.durMin+"min";
  $("cpVolume").textContent=data.volume?data.volume.toLocaleString("fr-CH"):"—";
  $("cpKcal").textContent=data.kcal;
  var wk=weekStats();
  $("cpStreakN").textContent=wk.thisCount+" activité"+(wk.thisCount>1?"s":"")+" cette semaine";
  var sub=wk.prevTotal?"Semaine dernière : "+wk.prevTotal+" au total":"Continue comme ça !";
  $("cpStreakSub").textContent=sub;
  var cpT=$("cpTread");if(cpT)cpT.style.display=data.gym?"":"none";
  $("completeView").classList.add("on");
  haptic("success");
}
function closeComplete(){var v=$("completeView");if(v)v.classList.remove("on");}

/* ===== son (Web Audio) : bips courts à 3-2-1 puis signal de fin =====
   iOS n'autorise le son qu'après un geste : le contexte audio est (ré)activé à chaque tap.
   Type de session "transient" : le bip passe par-dessus la musique sans la couper. */
var audioCtx=null;
function soundOn(){return state.soundOn!==false;}
function unlockAudio(){
  try{
    if(!audioCtx){
      var AC=window.AudioContext||window.webkitAudioContext;if(!AC)return;
      try{if(navigator.audioSession)navigator.audioSession.type="transient";}catch(e){}
      audioCtx=new AC();
    }
    if(audioCtx.state==="suspended")audioCtx.resume();
  }catch(e){}
}
function beep(freq,dur,vol,delay){
  if(!soundOn())return;
  unlockAudio();if(!audioCtx)return;
  try{
    var t=audioCtx.currentTime+(delay||0),o=audioCtx.createOscillator(),g=audioCtx.createGain();
    o.type="sine";o.frequency.value=freq;
    g.gain.setValueAtTime(0.0001,t);g.gain.exponentialRampToValueAtTime(vol||0.4,t+0.012);g.gain.exponentialRampToValueAtTime(0.0001,t+dur);
    o.connect(g);g.connect(audioCtx.destination);o.start(t);o.stop(t+dur+0.03);
  }catch(e){}
}
function beepTick(){beep(880,0.13,0.35);}
function beepEnd(){beep(1175,0.16,0.45);beep(1568,0.16,0.45,0.18);beep(2093,0.4,0.45,0.36);}
document.addEventListener("touchend",unlockAudio,{passive:true});
document.addEventListener("click",unlockAudio);
function toggleSound(){state.soundOn=!soundOn();save();updateSoundBtn();if(soundOn())beepTick();toast(soundOn()?"Son du minuteur activé":"Son du minuteur coupé");}
function updateSoundBtn(){var b=$("gSoundBtn");if(b)b.innerHTML='<svg class="ic-s" aria-hidden="true"><use href="#i-'+(soundOn()?"speaker_on":"speaker_off")+'"/></svg>';}

/* ===== minuteur de repos ===== */
var restTotal=0,restEx=null,restTickSec=0;
function startRest(sec,exName){restTotal=sec*1000;restEnd=Date.now()+restTotal;restEx=exName||null;restTickSec=0;restBeeped=false;updateRest();}
function stopRest(){restEnd=0;updateRest();}
/* ±15 s pendant le repos ; la durée choisie est retenue pour cet exercice */
function restAdjust(d){
  if(!restEnd)return;
  var left=restEnd-Date.now();
  if(left+d*1000<3000)d=Math.ceil((3000-left)/1000);
  restEnd+=d*1000;restTotal=Math.max(5000,restTotal+d*1000);restTickSec=0;
  if(restEx){if(!state.restPref)state.restPref={};state.restPref[restEx]=Math.max(15,Math.min(300,Math.round(restTotal/1000)));save();}
  haptic("light");updateRest();
}
function updateRest(){
  var gr=guidedOpen?$("gRest"):null,gt=$("gTimer"),pill=$("restPill");
  if(gt)gt.style.visibility="hidden";
  var showPill=!!restEnd&&!guidedOpen&&state.page==="session";
  if(pill&&pill.hidden===showPill){pill.hidden=!showPill;document.body.classList.toggle("has-rest",showPill);}
  if(!restEnd){if(gr)gr.hidden=true;return;}
  var left=restEnd-Date.now(),sc=Math.ceil(left/1000);
  if(left<=0){
    restEnd=0;
    if(!restBeeped){
      restBeeped=true;beepEnd();haptic("success");
      try{if(navigator.vibrate)navigator.vibrate([160,80,160]);}catch(e){}
      toast("Repos terminé · à toi !");
    }
    if(gr)gr.hidden=true;
    return;
  }
  if(sc<=3&&sc>=1&&sc!==restTickSec){restTickSec=sc;beepTick();haptic("light");}
  if(showPill)$("restPillT").textContent=Math.floor(sc/60)+":"+pad(sc%60);
  if(gr){
    gr.hidden=false;
    $("gRestT").textContent=Math.floor(sc/60)+":"+pad(sc%60);
    $("gRestBar").style.width=Math.max(0,Math.min(100,left/restTotal*100))+"%";
    gr.classList.toggle("last",sc<=3);
  }
}
function snack(msg,label,cb,ms){
  var el=document.getElementById("snack");document.getElementById("snackMsg").textContent=msg;document.getElementById("snackBtn").textContent=label;
  snackCb=cb;el.classList.add("on");document.body.classList.add("has-snack");clearTimeout(snackT);
  snackT=setTimeout(function(){el.classList.remove("on");document.body.classList.remove("has-snack");snackCb=null;},ms||6000);
}
function delMealConfirm(i){
  var removed=state.meals[i];if(!removed)return;
  state.meals.splice(i,1);save();renderMeals();renderToday();
  snack("Repas supprimé","Annuler",function(){state.meals.splice(i,0,removed);save();renderMeals();renderToday();},5000);
}
function delRunConfirm(id){
  var idx=state.runs.findIndex(function(r){return r.id===id;});if(idx<0)return;
  var removed=state.runs[idx];
  state.runs.splice(idx,1);save();renderProgress();
  snack("Course supprimée","Annuler",function(){state.runs.splice(idx,0,removed);save();renderProgress();},5000);
}
/* export : sur iPhone, le téléchargement d'un fichier depuis une app installée sur l'écran d'accueil ne fait souvent rien.
   On passe donc par la feuille de partage (« Enregistrer dans Fichiers », AirDrop, mail…) quand elle accepte les fichiers. */
function exportData(){
  var json=JSON.stringify(state,null,2),fname="evo-fit-"+today()+".json";
  function done(){markBackup();renderBackupNag();if(state.page==="profile")renderProfile();toast("Données exportées");}
  function download(){
    try{var blob=new Blob([json],{type:"application/json"});
      var url=URL.createObjectURL(blob),a=document.createElement("a");a.href=url;a.download=fname;
      document.body.appendChild(a);a.click();setTimeout(function(){URL.revokeObjectURL(url);a.remove();},1500);done();
    }catch(e){toast("Export impossible");}
  }
  try{
    var file=typeof File==="function"?new File([json],fname,{type:"application/json"}):null;
    if(file&&navigator.canShare&&navigator.canShare({files:[file]})&&navigator.share){
      navigator.share({files:[file],title:"Sauvegarde EVO Fit Coach"}).then(done).catch(function(e){if(!e||e.name!=="AbortError")download();});
      return;
    }
  }catch(e){}
  download();
}
function importData(file){
  var r=new FileReader();
  r.onload=function(){try{var d=JSON.parse(r.result);if(!d||typeof d!=="object")throw 0;merge(d);save();renderAll();toast("Données importées");}catch(e){toast("Fichier invalide");}};
  r.onerror=function(){toast("Lecture impossible");};r.readAsText(file);
}

/* activités par jour (séances + courses/marches ; un jour « C'est fait » ne compte que s'il n'y a rien d'autre ce jour-là) */
function weekStats(){
  var now=new Date(),dow=(now.getDay()+6)%7;
  var monday=new Date(now);monday.setDate(now.getDate()-dow);monday.setHours(0,0,0,0);
  var prevMonday=new Date(monday);prevMonday.setDate(monday.getDate()-7);
  var acts=state.sessions.map(function(x){return localDay(x.date);}).concat(state.runs.map(function(r){return r.d;}));
  Object.keys(state.planDone||{}).forEach(function(d){if(state.planDone[d]&&acts.indexOf(d)<0)acts.push(d);});
  function diffFrom(d,from){return Math.round((new Date(d+"T12:00:00")-from)/864e5-0.5);}
  var counts=[0,0,0,0,0,0,0],prevCount=0,prevTotal=0;
  acts.forEach(function(d){
    var k=diffFrom(d,monday);if(k>=0&&k<7)counts[k]++;
    var j=diffFrom(d,prevMonday);if(j>=0&&j<7){prevTotal++;if(j<=dow)prevCount++;}
  });
  return {dow:dow,counts:counts,thisCount:counts.reduce(function(a,b){return a+b;},0),prevCount:prevCount,prevTotal:prevTotal};
}
function renderWeekSummary(){
  var days=["L","M","M","J","V","S","D"];
  var ws=weekStats(),dow=ws.dow,counts=ws.counts;
  var maxC=Math.max(1,Math.max.apply(null,counts));
  $("weekBar").innerHTML=days.map(function(lab,i){
    var h=counts[i]?Math.round(22+counts[i]/maxC*78):0;
    var col=counts[i]?(i===5?"linear-gradient(180deg,#2c63c4,#a9cbf5)":"linear-gradient(180deg,#e3ae4a,#d0875a)"):"transparent";
    return '<div class="wb'+(i===dow?" today":"")+'"><div class="bar"><i style="height:'+h+'%;background:'+col+'"></i></div><span class="lab">'+lab+'</span></div>';
  }).join("");
  var thisCount=ws.thisCount,prevTotal=ws.prevTotal,delta=thisCount-ws.prevCount;
  $("weekDelta").textContent=thisCount+" activité"+(thisCount>1?"s":"")+(delta===0?" · comme la sem. dernière":(delta>0?" · +"+delta+" vs sem. dernière":" · sem. dernière : "+prevTotal));
  var badges=[];
  var pr=latestPR();if(pr)badges.push({ic:'<svg class="ic-s" aria-hidden="true"><use href="#i-trophy_fill"/></svg>',lab:"Record : "+esc(pr.n)});
  var wt=(state.water&&state.water.date===today())?state.water:{ml:0},waterGoalMl=Math.max(500,Number(state.waterGoal||3)*1000);
  if(Number(wt.ml||0)>=waterGoalMl)badges.push({ic:'<svg class="ic-s" aria-hidden="true"><use href="#i-drop_fill"/></svg>',lab:"Objectif eau atteint"});
  if(!badges.length)badges.push({ic:'<svg class="ic-s" aria-hidden="true"><use href="#i-dumbbell"/></svg>',lab:"Continue comme ça"});
  $("badgeRow").innerHTML=badges.map(function(b){return '<div class="badge"><div class="ic">'+b.ic+'</div><div class="lab">'+b.lab+'</div></div>';}).join("");
}
var progTab=(function(){var t=lsGet("evoProgTab");return ["week","body","strength","cardio"].indexOf(t)>=0?t:"week";})();
var PROG_TABS=["week","body","strength","cardio"];
function setProgTab(t,dir){
  if(PROG_TABS.indexOf(t)<0||t===progTab)return;
  progTab=t;lsSet("evoProgTab",t);renderProgress();
  var seg=$("progSeg");try{if(seg&&window.scrollY>seg.offsetTop)window.scrollTo(0,Math.max(0,seg.offsetTop-60));}catch(e){}
  if(dir){var pg=$("progress");pg.classList.remove("slide-l","slide-r");void pg.offsetWidth;pg.classList.add(dir>0?"slide-l":"slide-r");}
  haptic("light");
}
function applyProgTab(){
  document.querySelectorAll("#progSeg .cat-tab").forEach(function(b){b.classList.toggle("on",b.dataset.t===progTab);});
  document.querySelectorAll("#progress [data-ptab]").forEach(function(el){el.classList.toggle("ptab-off",el.dataset.ptab!==progTab);});
}
function renderProgress(){
  if(state.page!=="progress")return; /* évite de repeindre 3 graphiques SVG pour une page qu'on ne regarde pas */
  applyProgTab();
  renderWeekSummary();renderCalSum();renderSessionHistory();renderMeasures();renderRecords();renderWeightTrend();
  var w=latestBody(),start=Number(state.profile.start),target=Number(state.profile.target);
  $("pwNow").textContent=fr(w);
  $("pwLost").textContent=fr(Math.max(0,start-w));
  $("pwLeft").textContent=fr(Math.max(0,w-target));
  var wh=state.weightHistory.slice(-12);
  $("weightChart").innerHTML=weightChart(wh);
  $("wcFrom").textContent=wh.length?fmtDate(wh[0].d):"";
  var wl=$("wList");if(wl)wl.innerHTML=state.weightHistory.slice().reverse().slice(0,15).map(function(x){return '<div class="hist-row"><div><b>'+fmtDate(x.d)+'</b></div><em>'+fr(x.w)+' kg</em><button class="del" data-act="delWeight" data-d="'+x.d+'" aria-label="Supprimer cette pesée"><svg class="ic-s" aria-hidden="true"><use href="#i-xmark"/></svg></button></div>';}).join("")||'<div class="empty" style="padding:8px 0">Aucune pesée.</div>';
  $("wcTo").textContent=wh.length?fmtDate(wh[wh.length-1].d):"";

  var lastBC=latestBodyComp(),bcCard=$("bodyCompCard");
  if(bcCard){
    if(lastBC){
      bcCard.style.display="";
      $("bcFat").textContent=lastBC.fat!=null?fr(lastBC.fat)+" %":"—";
      $("bcMuscle").textContent=lastBC.muscle!=null?fr(lastBC.muscle)+" kg":"—";
    }else bcCard.style.display="none";
  }

  // exercise picker: only exercises with logged data, else all weighted exercises
  var withData=Object.keys(state.perf).filter(function(k){return state.perf[k]&&state.perf[k].length;});
  var names=withData.length?withData:allWeighted();
  if(!state.selEx||names.indexOf(state.selEx)<0)state.selEx=bestExercise(names);
  $("exPicker").innerHTML=names.map(function(nm){return '<button class="pchip '+(nm===state.selEx?"on":"")+'" data-act="selEx" data-ex="'+esc(nm)+'">'+esc(nm)+'</button>';}).join("")||'<span style="color:var(--faint);font-size:13px">Aucun exercice avec charge.</span>';

  var arr=(state.selEx&&state.perf[state.selEx])||[];
  var vals=arr.map(function(x){return Number(x.w);});
  $("strengthChart").innerHTML=lineChart(vals,"#e3ae4a"," kg");
  $("stNow").textContent=vals.length?fr(vals[vals.length-1]):"—";
  $("stPR").textContent=vals.length?fr(Math.max.apply(null,vals)):"—";
  var gain=vals.length>1?(vals[vals.length-1]-vals[0]):0;
  $("stGain").textContent=(gain>=0?"+":"")+fr(gain);
  $("scFrom").textContent=arr.length?fmtDate(arr[0].d):"";
  $("scTo").textContent=arr.length?fmtDate(arr[arr.length-1].d):"";
  var lastS=arr.length?arr[arr.length-1]:null;
  var sameW=lastS&&lastS.s&&lastS.s.length&&lastS.s.every(function(x){return Number(x.w)===Number(lastS.s[0].w);});
  $("stSets").textContent=lastS&&lastS.s&&lastS.s.length?"Dernière séance ("+fmtDate(lastS.d)+") : "+(sameW?lastS.s.length+" séries à "+fr(lastS.s[0].w)+" kg · "+lastS.s.map(function(x){return x.r;}).join(" / ")+" reps":lastS.s.map(function(x){return fr(x.w)+" kg × "+x.r;}).join(" · ")):"";
  renderCardio();renderSteps();renderEnergy();
}
/* rythme de perte (régression sur 4 semaines) et date estimée d'arrivée à l'objectif */
function weightTrend(){
  var lim=new Date(Date.now()-28*864e5),pts=state.weightHistory.filter(function(x){return new Date(x.d+"T12:00:00")>=lim;});
  if(pts.length<3)return null;
  var t0=new Date(pts[0].d+"T12:00:00").getTime(),xs=pts.map(function(x){return (new Date(x.d+"T12:00:00").getTime()-t0)/864e5;}),ys=pts.map(function(x){return Number(x.w);});
  var span=xs[xs.length-1];if(span<5)return null;
  var n=xs.length,mx=xs.reduce(function(a,b){return a+b;},0)/n,my=ys.reduce(function(a,b){return a+b;},0)/n,num1=0,den=0;
  for(var i=0;i<n;i++){num1+=(xs[i]-mx)*(ys[i]-my);den+=(xs[i]-mx)*(xs[i]-mx);}
  if(!den)return null;
  return {perWeek:num1/den*7};
}
function renderWeightTrend(){
  var el=$("wTrend");if(!el)return;
  var tr=weightTrend(),w=latestBody(),target=Number(state.profile.target);
  if(!tr){el.textContent="Pèse-toi 2 à 3 fois par semaine : le rythme de perte et la date d'arrivée s'afficheront ici.";return;}
  var pw=tr.perWeek,txt;
  if(pw<-0.05&&w>target){
    var weeks=(w-target)/(-pw),eta=new Date(Date.now()+weeks*7*864e5);
    txt="Rythme : "+fr(pw)+" kg/sem. · "+(weeks>104?"à ce rythme, l'objectif de "+fr(target)+" kg est à plus de 2 ans : resserre un peu les calories.":"objectif "+fr(target)+" kg vers "+eta.toLocaleDateString("fr-CH",{month:"long",year:"numeric"}));
    if(pw<-1.5)txt+=" · rythme rapide : garde tes protéines hautes";
  }else if(w<=target)txt="Objectif atteint, bravo ! Tu peux fixer un nouveau poids cible dans le Profil.";
  else if(pw>0.05)txt="Poids en hausse ces 4 dernières semaines (+"+fr(pw)+" kg/sem.) : vérifie tes calories dans Repas.";
  else txt="Poids stable ces 4 dernières semaines ("+(pw>0?"+":"")+fr(pw)+" kg/sem.) : vérifie tes calories dans Repas.";
  el.textContent=txt;
}
/* tour de taille / hanches : le meilleur indicateur de la graisse des hanches */
function renderMeasures(){
  var box=$("measBox");if(!box)return;
  var ms=(state.measures||[]).slice().sort(function(a,b){return a.d.localeCompare(b.d);});
  if(!ms.length){box.innerHTML='<div class="empty" style="padding:10px 0">Mesure ton tour de taille et de hanches à chaque pesée (1 fois par semaine suffit) : c\'est le meilleur indicateur de la graisse qui part des hanches, même quand la balance bouge peu.</div>';return;}
  function stat(key,lab){
    var vals=ms.filter(function(x){return x[key]!=null;});if(!vals.length)return '<div><div class="v num">—</div><div class="l">'+lab+'</div></div>';
    var last=vals[vals.length-1][key],diff=last-vals[0][key];
    return '<div><div class="v num">'+fr(last)+' <small>cm</small></div><div class="l">'+lab+(vals.length>1?' · <span class="'+(diff<=0?"good":"bad")+'">'+(diff>0?"+":"")+fr(diff)+' cm</span>':'')+'</div></div>';
  }
  var hips=ms.filter(function(x){return x.hips!=null;});
  box.innerHTML='<div class="big3" style="grid-template-columns:repeat(2,1fr)">'+stat("waist","taille")+stat("hips","hanches")+'</div>'
    +(hips.length>1?'<div class="chartwrap">'+lineChart(hips.slice(-12).map(function(x){return Number(x.hips);}),"#d0875a"," cm")+'</div><div class="chartmeta"><span>tour de hanches</span><span>'+fmtDate(hips[hips.length-1].d)+'</span></div>':'')
    +'<details class="edit-list"><summary>Voir / supprimer des mesures</summary>'+ms.slice().reverse().slice(0,12).map(function(x){return '<div class="hist-row"><div><b>'+fmtDate(x.d)+'</b></div><em>'+(x.waist!=null?'taille '+fr(x.waist)+' cm':'')+(x.waist!=null&&x.hips!=null?' · ':'')+(x.hips!=null?'hanches '+fr(x.hips)+' cm':'')+'</em><button class="del" data-act="delMeasure" data-d="'+x.d+'" aria-label="Supprimer"><svg class="ic-s" aria-hidden="true"><use href="#i-xmark"/></svg></button></div>';}).join("")+'</details>';
}
/* calories des 7 derniers jours (journal + historique) */
function dayIntake(d){
  var list=d===today()?state.meals:((state.mealHistory.find(function(h){return h.date===d;})||{}).meals||null);
  if(!list||!list.length)return null;
  return {kcal:list.reduce(function(s,m){return s+Number(m.kcal||0);},0),prot:list.reduce(function(s,m){return s+Number(m.protein||0);},0)};
}
/* ligne pointillée de l'objectif : zone des barres = hauteur totale moins la ligne des jours (14 px + 4 px) */
function goalLine(f){return '<i class="goal" style="bottom:calc(18px + (100% - 18px) * '+Math.min(1,Math.max(0,f)).toFixed(3)+')"></i>';}
function renderCalSum(){
  var el=$("calSum");if(!el)return;
  var r=calWeekStats();
  el.textContent=r?(r.defTxt+(r.past?" · "+r.ok+"/"+r.past+" jours dans l'objectif calorique.":".")):"Ajoute tes repas dans Nutrition : ton bilan de la semaine apparaîtra ici.";
}
function calWeekStats(){
  var goal=Number(state.profile.cal||2400),base=new Date(),list=[];
  for(var i=6;i>=0;i--){var dt=new Date(base);dt.setDate(base.getDate()-i);var d=dt.getFullYear()+"-"+pad(dt.getMonth()+1)+"-"+pad(dt.getDate());var v=dayIntake(d);if(v)list.push({d:d,v:v});}
  if(!list.length)return null;
  var past=list.filter(function(x){return x.d!==today();}),avgList=past.length?past:list;
  var ok=past.filter(function(x){return x.v.kcal<=goal*1.05&&x.v.kcal>=goal*0.75;}).length;
  /* moyenne sur les journées terminées seulement : la journée en cours est incomplète */
  if(!past.length)return {ok:0,past:0,avgDef:0,defTxt:"Ton déficit moyen s'affichera dès demain, après une première journée complète"};
  var defs=past.map(function(x){return dayBurn(x.d).total-x.v.kcal;}),avgDef=Math.round(defs.reduce(function(a2,b2){return a2+b2;},0)/defs.length);
  var defTxt=avgDef>0?'Déficit moyen ≈ '+kfmt(avgDef)+' kcal/jour, soit environ −'+fr(avgDef*7/7700)+' kg de graisse par semaine (estimation)':'Pas de déficit en moyenne ('+kfmt(-avgDef)+' kcal/jour au-dessus de ta dépense) : réduis un peu les portions';
  return {ok:ok,past:past.length,avgDef:avgDef,defTxt:defTxt};
}
function renderCalWeek(){
  var box=$("calWeek");if(!box)return;
  var goal=Number(state.profile.cal||2400),days=[],base=new Date();
  for(var i=6;i>=0;i--){var dt=new Date(base);dt.setDate(base.getDate()-i);var d=dt.getFullYear()+"-"+pad(dt.getMonth()+1)+"-"+pad(dt.getDate());days.push({d:d,lab:"LMMJVSD".charAt((dt.getDay()+6)%7),v:dayIntake(d)});}
  var withData=days.filter(function(x){return x.v;});
  if(!withData.length){box.innerHTML='<div class="empty" style="padding:10px 0">Ajoute tes repas dans l\'onglet Repas : ton bilan de la semaine apparaîtra ici.</div>';return;}
  var mx=Math.max(goal*1.25,Math.max.apply(null,withData.map(function(x){return x.v.kcal;})));
  var past=withData.filter(function(x){return x.d!==today();}),avgList=past.length?past:withData;
  var avg=Math.round(avgList.reduce(function(s,x){return s+x.v.kcal;},0)/avgList.length),avgP=Math.round(avgList.reduce(function(s,x){return s+x.v.prot;},0)/avgList.length);
  var ok=past.filter(function(x){return x.v.kcal<=goal*1.05&&x.v.kcal>=goal*0.75;}).length;
  var defTxt=calWeekStats().defTxt+"."; /* même calcul que le résumé de Progrès */
  box.innerHTML='<div class="calbars">'+goalLine(goal/mx)+days.map(function(x){
      var h=x.v?Math.max(4,x.v.kcal/mx*100):0,cls=!x.v?"":(x.v.kcal>goal*1.05?"over":(x.v.kcal<goal*0.75&&x.d!==today()?"under":"ok"));
      return '<div class="cb'+(x.d===today()?" today":"")+'"><div class="bar"><i class="'+cls+'" style="height:'+h+'%"></i></div><span>'+x.lab+'</span></div>';
    }).join("")+'</div>'
    +'<div class="big3" style="margin-bottom:0"><div><div class="v num">'+avg.toLocaleString("fr-CH")+'</div><div class="l">kcal / jour (moy.)</div></div><div><div class="v num">'+avgP+' g</div><div class="l">protéines (moy.)</div></div><div><div class="v num">'+(past.length?ok+'/'+past.length:'—')+'</div><div class="l">jours dans l\'objectif</div></div></div>'
    +'<div class="trend-line">'+defTxt+'</div>';
}
/* suppression avec « Annuler » (pesée, mesure, séance enregistrées par erreur) */
function delEntry(key,d,msg){
  var arr=state[key]||[],ix=arr.findIndex(function(x){return x.d===d;});if(ix<0)return;
  var old=arr[ix];arr.splice(ix,1);save();renderAll();haptic("light");
  snack(msg+" ("+fmtDate(d)+")","Annuler",function(){state[key].push(old);state[key].sort(function(a2,b2){return a2.d.localeCompare(b2.d);});save();renderAll();},6000);
}
function delSession(i){
  var s0=state.sessions[i];if(!s0)return;
  var d=localDay(s0.date),q=state.program.find(function(pp){return pp.id===s0.dayId;});
  /* les charges notées ce jour-là pour les exercices de cette séance partent avec elle (sauf si une autre séance du jour les utilise) */
  var other=state.sessions.some(function(x,k){return k!==i&&localDay(x.date)===d&&x.dayId===s0.dayId;});
  var names=q&&!other?q.ex.map(function(e){return e.n;}):[],removed={};
  names.forEach(function(n){var a2=state.perf[n];if(!a2)return;var ix=a2.findIndex(function(x){return x.d===d;});if(ix>=0){removed[n]=a2[ix];a2.splice(ix,1);if(!a2.length)delete state.perf[n];}});
  state.sessions.splice(i,1);save();renderAll();haptic("light");
  snack("Séance supprimée ("+fmtDate(d)+")","Annuler",function(){
    state.sessions.splice(i,0,s0);
    Object.keys(removed).forEach(function(n){if(!state.perf[n])state.perf[n]=[];state.perf[n].push(removed[n]);state.perf[n].sort(function(a2,b2){return a2.d.localeCompare(b2.d);});});
    save();renderAll();
  },6000);
}
/* historique des séances */
function renderSessionHistory(){
  var box=$("sessHist");if(!box)return;
  $("histCount").textContent=state.sessions.length?state.sessions.length+" au total":"";
  if(!state.sessions.length){box.innerHTML='<div class="empty" style="padding:10px 0">Tes séances terminées apparaîtront ici.</div>';return;}
  box.innerHTML=state.sessions.slice(0,8).map(function(s,i){
    var d=new Date(s.date),lab=d.toLocaleDateString("fr-CH",{weekday:"short",day:"numeric",month:"short"});
    var extra=[s.done+"/"+s.total+" exos"];if(s.dur)extra.push(s.dur+" min");if(s.vol)extra.push(s.vol.toLocaleString("fr-CH")+" kg");
    return '<div class="hist-row"><div><b>'+esc(s.name||"Séance")+'</b><span>'+lab+'</span></div><em>'+extra.join(" · ")+'</em><button class="del" data-act="delSession" data-i="'+i+'" aria-label="Supprimer cette séance"><svg class="ic-s" aria-hidden="true"><use href="#i-xmark"/></svg></button></div>';
  }).join("");
}
/* records par exercice */
function renderRecords(){
  var box=$("recList");if(!box)return;
  var rows=Object.keys(state.perf).map(function(n){
    var a=state.perf[n]||[];if(!a.length)return null;
    /* charge max ; à charge égale, la séance avec le plus de répétitions (puis la plus récente) */
    var best=a.reduce(function(b,x){var xw=Number(x.w),bw=Number(b.w);return xw>bw||(xw===bw&&Number(x.r||0)>=Number(b.r||0))?x:b;},a[0]);
    return {n:n,w:Number(best.w),d:best.d,r:best.r,first:Number(a[0].w)};
  }).filter(Boolean).filter(function(x){return x.w>0;}).sort(function(a,b){return b.d.localeCompare(a.d);});
  box.innerHTML=rows.length?rows.map(function(x){
    var g=x.w-x.first;
    return '<button class="rec-row" data-act="selEx" data-ex="'+esc(x.n)+'"><span><b>'+esc(x.n)+'</b><small>'+fmtDate(x.d)+(g>0?' · +'+fr(g)+' kg depuis le début':'')+'</small></span><em>'+fr(x.w)+' kg'+(x.r?' × '+x.r:'')+'</em></button>';
  }).join(""):'<div class="empty" style="padding:10px 0">Tes records apparaîtront après tes premières séances avec charge.</div>';
}
function allWeighted(){var r=[];state.program.forEach(function(p){p.ex.forEach(function(e){if(e.w&&r.indexOf(e.n)<0)r.push(e.n);});});return r;}
function bestExercise(names){var best=names[0]||null,bn=-1;names.forEach(function(n){var l=(state.perf[n]||[]).length;if(l>bn){bn=l;best=n;}});return best;}
function fmtPace(mpk){if(!isFinite(mpk)||mpk<=0)return "—";var m=Math.floor(mpk),sc=Math.round((mpk-m)*60);if(sc===60){m++;sc=0;}return m+":"+String(sc).padStart(2,"0");}
function valToday(arr){var d=today();for(var i=0;i<arr.length;i++)if(arr[i].d===d)return Number(arr[i].v);return 0;}
function upsertV(arr,d,v){var i=arr.findIndex(function(x){return x.d===d;});if(i>=0)arr[i].v=v;else arr.push({d:d,v:v});arr.sort(function(a,b){return a.d.localeCompare(b.d);});}
function renderCardio(){
  var walks=state.runs.filter(function(r){return r.walk;});
  var runs=state.runs.filter(function(r){return !r.walk;}).sort(function(a,b){return a.d.localeCompare(b.d);});
  $("cdRuns").textContent=runs.length;
  var km=runs.reduce(function(s,r){return s+Number(r.dist||0);},0);$("cdKm").textContent=fr(Math.round(km*10)/10);
  var paces=runs.filter(function(r){return !r.walk&&r.dist>0&&r.dur>0;}).map(function(r){return r.dur/r.dist;});
  $("cdPace").innerHTML=paces.length?fmtPace(Math.min.apply(null,paces))+" <small>/km</small>":"—";
  $("cardioChart").innerHTML=lineChart(runs.map(function(r){return Number(r.dist);}),"#e3ae4a"," km");
  var totalKcal=runs.reduce(function(s,r){return s+Number(r.kcal||0);},0);
  var wKm=walks.reduce(function(s,r){return s+Number(r.dist||0);},0);
  $("cdLastD").textContent=runs.length?fmtDate(runs[runs.length-1].d):"";
  var cdTxt=[];if(totalKcal)cdTxt.push(totalKcal.toLocaleString("fr-CH")+" kcal brûlées en course");if(walks.length)cdTxt.push("marche : "+walks.length+" sortie"+(walks.length>1?"s":"")+", "+fr(wKm)+" km");
  $("cdLast").textContent=cdTxt.join(" · ");
  var recent=state.runs.slice().sort(function(a,b){return b.d.localeCompare(a.d);}).slice(0,8);
  $("runList").innerHTML=recent.length?recent.map(function(r){
    var pace=(r.dist>0&&r.dur>0)?fmtPace(r.dur/r.dist)+" /km":"—";
    var hasRoute=Array.isArray(r.pts)&&r.pts.length>1;
    var lab=(r.tread?"Tapis · ":"")+(r.walk?"Marche · ":"")+fr(r.dist)+" km"+(r.incline?" · pente "+fr(r.incline)+" %":"");
    return '<div class="runrow"><div class="ri"><b>'+esc(lab)+'</b><span>'+fmtDate(r.d)+' · '+fr(r.dur)+' min'+(r.kcal?' · '+Math.round(r.kcal)+' kcal':'')+'</span></div><div class="rp">'+pace+'</div>'
      +(hasRoute?'<button class="mapbtn" data-act="viewRunMap" data-id="'+esc(r.id||"")+'"><svg class="ic-s" aria-hidden="true"><use href="#i-map_fill"/></svg></button>':'')
      +'<button class="del" data-act="delRun" data-id="'+esc(r.id||"")+'"><svg class="ic-s" aria-hidden="true"><use href="#i-xmark"/></svg></button></div>';
  }).join(""):'<div class="empty">Aucune course. Ajoute-en une, ou branche Strava en étape 2.</div>';
}
function renderSteps(){
  var a=state.steps.slice().sort(function(x,y){return x.d.localeCompare(y.d);});
  var tv=valToday(state.steps);
  $("stpToday").textContent=tv?tv.toLocaleString("fr-CH"):"—";
  $("stpAvg").textContent=a.length?Math.round(a.reduce(function(s,x){return s+Number(x.v);},0)/a.length).toLocaleString("fr-CH"):"—";
  $("stpDays").textContent=a.length;
  $("stepsChart").innerHTML=lineChart(a.slice(-14).map(function(x){return Number(x.v);}),"#2c63c4"," pas");
  var stpK=$("stpKcal");if(stpK)stpK.textContent=tv?estimateStepsKcal(tv).toLocaleString("fr-CH")+" kcal aujourd'hui (marche)":"";
}
function renderEnergy(){
  var a=state.energy.slice().sort(function(x,y){return x.d.localeCompare(y.d);});
  var ec=$("energyChart"),el0=$("enLast");
  if(ec)ec.innerHTML=lineChart(a.slice(-14).map(function(x){return Number(x.v);}),"#e3ae4a","");
  if(el0)el0.textContent=a.length?fmtDate(a[a.length-1].d):"";
  var faces=["😫","😕","😐","🙂","🔥"],cur=valToday(state.energy),el=$("efaces");
  if(el)el.innerHTML=faces.map(function(f,i){return '<button class="'+(cur===i+1?"on":"")+'" data-act="energy" data-v="'+(i+1)+'">'+f+'</button>';}).join("");
}
function setEnergy(v){upsertV(state.energy,today(),v);save();renderEnergy();renderToday();toast("Forme du jour enregistrée");}
/* saisie cardio : dehors (distance + durée) ou sur tapis (vitesse, pente, durée),
   course ou marche */
var runWhere="out",runKind="run",runDistTouched=false;
function openRun(preset){
  preset=preset||{};
  ["runDist","runDur","runSpeed","runPaceIn","runIncline","runKcal"].forEach(function(id){$(id).value="";});
  if(preset.dur)$("runDur").value=preset.dur;
  if(preset.speed){$("runSpeed").value=preset.speed;$("runPaceIn").value=fmtPace(60/preset.speed);}
  if(preset.incline!=null)$("runIncline").value=preset.incline;
  $("runDate").value=today();runDistTouched=false;
  setRunMode(preset.where||"out",preset.kind||"run");
  $("runModal").classList.add("on");
}
function closeRun(){$("runModal").classList.remove("on");}
function setRunMode(where,kind){
  runWhere=where;runKind=kind;
  document.querySelectorAll("#runWhere .cat-tab").forEach(function(b){b.classList.toggle("on",b.dataset.v===where);});
  document.querySelectorAll("#runKind .cat-tab").forEach(function(b){b.classList.toggle("on",b.dataset.v===kind);});
  var t=where==="tread";
  $("runOutOnly").style.display=t?"none":"";$("runTreadOnly").style.display=t?"":"none";$("runTreadKcal").style.display=t?"":"none";
  updateRunPace();
}
/* allure saisie comme sur l'écran du tapis : "7:36", "7.36" ou "7,36" = 7 min 36 s ;
   un seul chiffre après la virgule = minutes décimales ("7,5" = 7 min 30 s) */
function parsePace(str){
  var m=String(str||"").trim().match(/^(\d{1,2})(?:\s*([:.,'’])\s*(\d{1,2}))?$/);if(!m)return 0;
  var min=Number(m[1]);if(!m[3])return min;
  var sec=m[2]===":"||m[2]==="'"||m[2]==="’"||m[3].length===2?Number(m[3]):Number(m[3])*6;
  return sec<60?min+sec/60:0;
}
/* dépense sur tapis : équations ACSM (VO2 en ml/kg/min, 5 kcal par litre d'O2),
   la pente compte beaucoup en marche */
function treadKcal(speedKmh,inclinePct,durMin,walk){
  var v=speedKmh*1000/60,g=Math.max(0,inclinePct||0)/100;
  var vo2=walk?(3.5+0.1*v+1.8*v*g):(3.5+0.2*v+0.9*v*g);
  return Math.max(1,Math.round(vo2*latestBody()/1000*5*durMin));
}
function runFormValues(){
  var du=fnum($("runDur").value,0),di=fnum($("runDist").value,0),sp=fnum($("runSpeed").value,0),inc=fnum($("runIncline").value,0),mk=fnum($("runKcal").value,0);
  var pc=parsePace($("runPaceIn").value);if(pc>0)sp=60/pc; /* l'allure saisie est exacte, la vitesse affichée est arrondie */
  var walk=runKind==="walk",kcal=0;
  if(runWhere==="tread"){
    if(!sp&&di>0&&du>0)sp=di/(du/60);
    if(!(di>0)&&sp>0&&du>0)di=sp*du/60;
    if(sp>0&&du>0)kcal=treadKcal(sp,inc,du,walk);
    if(mk>0&&kcal>0)kcal=Math.min(kcal,Math.round(mk)); /* les tapis surestiment souvent : on garde la plus basse */
    else if(mk>0)kcal=Math.round(mk);
  }else if(di>0){kcal=walk?estimateWalkDistKcal(di):estimateRunKcal(di,du);}
  return {du:du,di:di,sp:sp,inc:inc,kcal:kcal,walk:walk};
}
function updateRunPace(){
  if(runWhere==="tread"&&!runDistTouched){
    var sp=fnum($("runSpeed").value,0),du=fnum($("runDur").value,0);
    var pc=parsePace($("runPaceIn").value);if(pc>0)sp=60/pc;
    $("runDist").value=(sp>0&&du>0)?Math.round(sp*du/60*100)/100:"";
  }
  var f=runFormValues(),parts=[];
  if(runWhere==="tread"&&f.sp>0)parts.push("Allure "+fmtPace(60/f.sp)+" /km");
  else if(f.di>0&&f.du>0)parts.push("Allure "+fmtPace(f.du/f.di)+" /km");
  if(f.kcal>0)parts.push("≈ "+f.kcal+" kcal");
  $("runPace").textContent=parts.join(" · ");
}
function saveRun(){
  var f=runFormValues(),d=$("runDate").value||today();
  if(!(f.du>0)){toast("Indique la durée");return;}
  if(!(f.di>0)){toast(runWhere==="tread"?"Indique la vitesse ou la distance":"Distance et durée requises");return;}
  var r={id:"r"+Date.now()+Math.floor(Math.random()*1000),d:d,dist:Math.round(f.di*100)/100,dur:Math.round(f.du*10)/10,src:"manual",kcal:f.kcal||estimateRunKcal(f.di,f.du)};
  if(f.walk)r.walk=true;
  if(runWhere==="tread"){r.tread=true;if(f.sp)r.speed=Math.round(f.sp*10)/10;if(f.inc)r.incline=f.inc;}
  state.runs.push(r);
  if(!f.walk)autoTickRunProg(d);
  save();closeRun();renderProgress();renderToday();
  toast((runWhere==="tread"?"Tapis":"")+(f.walk?(runWhere==="tread"?" · marche":"Marche"):(runWhere==="tread"?" · course":"Course"))+" ajoutée · ≈ "+r.kcal+" kcal");
}
/* ===== live GPS run tracking ===== */
var geoWatch=null,geoRetryTimer=null,geoStaleTimer=null,geoRetryCount=0,runActive=false,runPaused=false;
var runMeters=0,runElapsedMs=0,runSegStart=0,runLastPt=null,runLastTime=0,runLastGeoTimestamp=0,runPts=[],runTick=null,wakeLock=null,runStartDate=today();
var LIVE_RUN_KEY="evoFitV3_liveRun",lastCheckpointAt=0;
function checkpointLiveRun(){
  var now=Date.now();
  if(now-lastCheckpointAt<5000)return;
  lastCheckpointAt=now;
  var elapsed=runElapsedMs+(runPaused?0:now-runSegStart);
  try{lsSet(LIVE_RUN_KEY,JSON.stringify({d:runStartDate,meters:runMeters,elapsedMs:elapsed,pts:runPts,savedAt:now}));}catch(e){}
}
function clearLiveRunCheckpoint(){lsDel(LIVE_RUN_KEY);}
function recoverLiveRunIfAny(){
  var raw=lsGet(LIVE_RUN_KEY);if(!raw)return;
  try{
    var ck=JSON.parse(raw);
    var km=Math.round((ck.meters||0)/10)/100,min=Math.round((ck.elapsedMs||0)/6000)/10;
    var ageOk=ck.savedAt&&(Date.now()-ck.savedAt)<21600000; /* 6h max, sinon trop périmé pour être fiable */
    if(ageOk&&km>=0.05&&min>=0.2){
      if(confirm("Une course interrompue a été retrouvée (~"+fr(km)+" km, "+fmtClock(ck.elapsedMs||0)+"). L'enregistrer ?")){
        var runObj={id:"r"+Date.now()+Math.floor(Math.random()*1000),d:ck.d||today(),dist:km,dur:min,src:"gps",kcal:estimateRunKcal(km,min)};
        if(ck.pts&&ck.pts.length>1)runObj.pts=ck.pts;
        state.runs.push(runObj);save();toast("Course récupérée · "+fr(km)+" km");
      }
    }
  }catch(e){}
  clearLiveRunCheckpoint();
}
var lrMap=null,lrHead=null,lrStart=null,mapReady=false,mapMode="svg",mapCentered=false;
function fmtClock(ms){var s=Math.floor(ms/1000),h=Math.floor(s/3600),m=Math.floor((s%3600)/60),sec=s%60;return (h>0?h+":"+pad(m):String(m))+":"+pad(sec);}
function haversine(a,b){var R=6371000,toR=Math.PI/180;var dLat=(b.lat-a.lat)*toR,dLng=(b.lng-a.lng)*toR,la1=a.lat*toR,la2=b.lat*toR;var x=Math.sin(dLat/2)*Math.sin(dLat/2)+Math.cos(la1)*Math.cos(la2)*Math.sin(dLng/2)*Math.sin(dLng/2);return 2*R*Math.asin(Math.min(1,Math.sqrt(x)));}
var liveWalk=false; /* suivi GPS d'une marche (plan de la semaine) plutôt que d'une course */
function openLiveRun(walk){
  liveWalk=walk===true;
  var lt=document.querySelector("#liveRunModal .lr-title");if(lt)lt.textContent=liveWalk?"Marche en direct":"Course en direct";
  closeRun();
  runActive=false;runPaused=false;runMeters=0;runElapsedMs=0;runSegStart=0;runLastPt=null;runLastTime=0;runLastGeoTimestamp=0;runPts=[];runTick=null;geoRetryCount=0;runStartDate=today();
  $("lrTime").textContent="0:00";$("lrDist").textContent="0.00";$("lrPace").textContent="—";$("lrSpeed").textContent="—";
  $("lrToggle").textContent="Démarrer";$("lrToggle").style.display="";$("lrFinish").style.display="none";$("lrDiscard").style.display="";$("lrDiscard").textContent="Annuler";
  $("lrGps").textContent="GPS prêt";$("lrTrace").innerHTML="";$("lrMapEmpty").style.display="";
  resetMapLayers();
  mapMode="svg";mapReady=false;
  $("lrMap").style.display="none";$("lrTrace").style.display="";$("lrMapEmpty").style.display="";
  $("liveRunModal").classList.add("on");
  waitForMaplibre(45); /* laisse le temps au CDN de secours de prendre le relais si le premier échoue */
}
function waitForMaplibre(triesLeft){
  if(!$("liveRunModal").classList.contains("on"))return; /* course annulée entretemps */
  if(window.maplibregl){
    mapMode="maplibre";
    $("lrMap").style.display="";$("lrTrace").style.display="none";$("lrMapEmpty").style.display="none";
    setTimeout(function(){initMap();if(lrMap){try{lrMap.resize();}catch(e){}}},60);
    return;
  }
  if(triesLeft<=0)return; /* reste en repli SVG */
  setTimeout(function(){waitForMaplibre(triesLeft-1);},200);
}
function closeLiveRun(){stopGeo();releaseWake();if(runTick){clearInterval(runTick);runTick=null;}runActive=false;runPaused=false;runLastPt=null;runLastTime=0;runLastGeoTimestamp=0;$("liveRunModal").classList.remove("on");}
function toggleRun(){if(!runActive)startRun();else if(!runPaused)pauseRun();else resumeRun();}
function startRun(){
  if(!navigator.geolocation){$("lrGps").textContent="GPS non supporté";toast("Géolocalisation indisponible");return;}
  runActive=true;runPaused=false;runSegStart=Date.now();runLastPt=null;runLastTime=0;runLastGeoTimestamp=0;geoRetryCount=0;
  $("lrToggle").textContent="Pause";$("lrFinish").style.display="";$("lrDiscard").style.display="none";
  $("lrGps").textContent="Recherche du signal…";
  requestWake();startGeo();
  if(runTick)clearInterval(runTick);runTick=setInterval(updateLiveUI,250);
  updateLiveUI();
}
function pauseRun(){if(!runActive||runPaused)return;runPaused=true;runElapsedMs+=Date.now()-runSegStart;runLastPt=null;runLastTime=0;runLastGeoTimestamp=0;stopGeo();$("lrToggle").textContent="Reprendre";$("lrGps").textContent="En pause";updateLiveUI();}
function resumeRun(){if(!runActive||!runPaused)return;runPaused=false;runSegStart=Date.now();runLastPt=null;runLastTime=0;runLastGeoTimestamp=0;$("lrToggle").textContent="Pause";$("lrGps").textContent="Recherche du signal…";startGeo();updateLiveUI();}
function finishRun(){
  if(!runActive){closeLiveRun();return;}
  if(!runPaused)runElapsedMs+=Date.now()-runSegStart;
  runActive=false;stopGeo();releaseWake();if(runTick){clearInterval(runTick);runTick=null;}runLastPt=null;runLastTime=0;runLastGeoTimestamp=0;
  var km=Math.round(runMeters/10)/100,min=Math.round(runElapsedMs/6000)/10;
  if(km<0.05||min<0.2){clearLiveRunCheckpoint();toast("Course trop courte, non enregistrée");closeLiveRun();return;}
  var runObj={id:"r"+Date.now()+Math.floor(Math.random()*1000),d:runStartDate,dist:km,dur:min,src:"gps",kcal:liveWalk?estimateWalkDistKcal(km):estimateRunKcal(km,min)};
  if(liveWalk)runObj.walk=true;
  if(runPts.length>1)runObj.pts=runPts.slice();
  state.runs.push(runObj);
  if(!liveWalk)autoTickRunProg(runObj.d);
  clearLiveRunCheckpoint();
  save();closeLiveRun();
  if(liveWalk){showPage("today");toast("Marche enregistrée · "+fr(km)+" km");}
  else{showPage("progress");renderProgress();toast("Course enregistrée · "+fr(km)+" km");}
}
function discardRun(){if(runActive){if(!confirm("Abandonner la course en cours ?"))return;}clearLiveRunCheckpoint();closeLiveRun();}
function startGeo(){
  if(!runActive||runPaused||!navigator.geolocation)return;
  if(geoRetryTimer){clearTimeout(geoRetryTimer);geoRetryTimer=null;}
  if(geoStaleTimer){clearTimeout(geoStaleTimer);geoStaleTimer=null;}
  if(geoWatch!=null)stopGeo();
  try{
    geoWatch=navigator.geolocation.watchPosition(onGeo,onGeoErr,{enableHighAccuracy:true,maximumAge:500,timeout:15000});
    geoStaleTimer=setTimeout(function(){
      if(runActive&&!runPaused){
        $("lrGps").textContent="GPS en recherche…";
        startGeo();
      }
    },14000);
  }catch(e){$("lrGps").textContent="GPS inaccessible";}
}
function stopGeo(){
  if(geoRetryTimer){clearTimeout(geoRetryTimer);geoRetryTimer=null;}
  if(geoStaleTimer){clearTimeout(geoStaleTimer);geoStaleTimer=null;}
  if(geoWatch!=null&&navigator.geolocation){try{navigator.geolocation.clearWatch(geoWatch);}catch(e){}}
  geoWatch=null;
}
function scheduleGeoRetry(){
  if(!runActive||runPaused||geoRetryTimer)return;
  var delay=Math.min(8000,1200+geoRetryCount*1200);geoRetryCount++;
  geoRetryTimer=setTimeout(function(){geoRetryTimer=null;if(runActive&&!runPaused)startGeo();},delay);
}
function onGeo(pos){
  if(!runActive||runPaused||!pos||!pos.coords)return;
  var c=pos.coords,acc=Number(c.accuracy||999);
  if(!isFinite(acc)||acc>30){
    $("lrGps").textContent="Signal faible · "+Math.round(acc)+" m";
    if(!runLastPt&&runPts.length===0&&isFinite(acc)&&acc<=120){
      var lat0=Number(c.latitude),lng0=Number(c.longitude);
      if(isFinite(lat0)&&isFinite(lng0)&&Math.abs(lat0)<=90&&Math.abs(lng0)<=180){
        runPts.push({lat:lat0,lng:lng0}); /* montre un premier point même en signal faible, sans le fixer comme référence */
        $("lrMapEmpty").style.display=(mapMode==="maplibre"||runPts.length>1)?"none":"";
        renderRoute();
      }
    }
    return;
  }
  var lat=Number(c.latitude),lng=Number(c.longitude);
  if(!isFinite(lat)||!isFinite(lng)||Math.abs(lat)>90||Math.abs(lng)>180)return;
  var pt={lat:lat,lng:lng},now=Date.now();
  var gpsTime=Number(pos.timestamp);
  if(isFinite(gpsTime)&&gpsTime>0&&runLastGeoTimestamp&&gpsTime<=runLastGeoTimestamp)return;
  if(isFinite(gpsTime)&&gpsTime>0)runLastGeoTimestamp=gpsTime;

  if(runLastPt){
    var seg=haversine(runLastPt,pt);
    var dt=Math.max(0.5,(now-runLastTime)/1000);
    var segSpeed=seg/dt;
    // Filtre anti-bruit : un petit déplacement inférieur à ~4 m n'est pas ajouté.
    // Les gros bonds ou vitesses irréalistes sont ignorés sans déplacer le point de référence.
    var minMove=Math.max(4,Math.min(10,acc*0.45));
    if(seg>=minMove&&seg<150&&segSpeed<=8.33){
      runMeters+=seg;runPts.push(pt);runLastPt=pt;runLastTime=now;
      checkpointLiveRun();
    }else if(seg>=150){
      // Très gros saut GPS : on ne compte rien et on attend un point cohérent.
      $("lrGps").textContent="GPS recalage…";
      return;
    }else if(segSpeed>8.33){
      $("lrGps").textContent="GPS instable…";
      return;
    }
  }else{
    runLastPt=pt;runLastTime=now;runPts.push(pt);
  }
  geoRetryCount=0;
  if(geoStaleTimer){clearTimeout(geoStaleTimer);geoStaleTimer=null;}
  geoStaleTimer=setTimeout(function(){
    if(runActive&&!runPaused){
      $("lrGps").textContent="GPS en recherche…";
      startGeo();
    }
  },14000);
  $("lrGps").textContent="GPS ok · "+Math.round(acc)+" m";
  $("lrMapEmpty").style.display=(mapMode==="maplibre"||runPts.length>1)?"none":"";
  renderRoute();updateLiveUI();
}
function onGeoErr(e){
  var m="GPS indisponible";
  if(e&&e.code===1){m="Localisation refusée — autorise-la dans les réglages";stopGeo();toast("Localisation refusée");}
  else if(e&&e.code===2){m="Recherche du signal…";scheduleGeoRetry();}
  else if(e&&e.code===3){m="Recherche du signal…";scheduleGeoRetry();}
  $("lrGps").textContent=m;
}
function curElapsed(){return runElapsedMs+((runActive&&!runPaused)?(Date.now()-runSegStart):0);}
function updateLiveUI(){
  var ms=curElapsed();$("lrTime").textContent=fmtClock(ms);
  var km=runMeters/1000;$("lrDist").textContent=km.toFixed(2).replace(".",",");
  var min=ms/60000;
  $("lrPace").textContent=(km>=0.10&&min>=0.5)?fmtPace(min/km):"—";
  var speedKmh=(ms>20000&&km>=0.05)?(km/(ms/3600000)):0;
  $("lrSpeed").textContent=speedKmh?fr(Math.min(speedKmh,25)):"—";
  $("lrKcal").textContent=km>=0.05?fr(liveWalk?estimateWalkDistKcal(km):estimateRunKcal(km,0)):"0";
}
function mapStyleUrl(){
  var isLight=document.documentElement.getAttribute("data-theme")==="light";
  return "https://tiles.openfreemap.org/styles/"+(isLight?"liberty":"dark");
}
function mlCircleEl(fill){
  var el=document.createElement("div");
  el.style.cssText="width:14px;height:14px;border-radius:50%;background:"+fill+";border:2px solid #01030a;box-shadow:0 1px 4px rgba(0,0,0,.35)";
  return el;
}
function initMap(){
  if(lrMap||!window.maplibregl)return;
  try{
    lrMap=new maplibregl.Map({container:"lrMap",style:mapStyleUrl(),center:[6.1432,46.2044],zoom:15,attributionControl:true,dragRotate:false,pitchWithRotate:false,touchPitch:false});
    mapReady=false;
    lrMap.on("load",function(){
      if(!lrMap)return;
      try{
        lrMap.addSource("lr-route",{type:"geojson",data:{type:"Feature",geometry:{type:"LineString",coordinates:[]}}});
        lrMap.addLayer({id:"lr-route-line",type:"line",source:"lr-route",layout:{"line-cap":"round","line-join":"round"},paint:{"line-color":"#e3ae4a","line-width":5,"line-opacity":.95}});
        mapReady=true;
        updateMap();
      }catch(e){}
    });
    lrMap.on("error",function(){
      var g=$("lrGps");if(g&&!runActive)g.textContent="Carte indisponible";
    });
  }catch(e){
    lrMap=null;mapReady=false;mapMode="svg";
    $("lrMap").style.display="none";$("lrTrace").style.display="";
    $("lrMapEmpty").style.display="";
  }
}
function resetMapLayers(){
  try{if(lrHead){lrHead.remove();}}catch(e){}
  try{if(lrStart){lrStart.remove();}}catch(e){}
  lrHead=null;lrStart=null;mapCentered=false;
  try{if(lrMap&&mapReady&&lrMap.getSource("lr-route"))lrMap.getSource("lr-route").setData({type:"Feature",geometry:{type:"LineString",coordinates:[]}});}catch(e){}
}
function havermapDistance(a,b,c,d){return haversine({lat:a,lng:b},{lat:c,lng:d});}
function updateMap(){
  if(!lrMap||!mapReady||!runPts.length)return;
  try{
    var src=lrMap.getSource("lr-route");
    if(src)src.setData({type:"Feature",geometry:{type:"LineString",coordinates:runPts.map(function(p){return [p.lng,p.lat];})}});
  }catch(e){}
  var last=runPts[runPts.length-1];
  if(!lrStart){try{lrStart=new maplibregl.Marker({element:mlCircleEl("#2c63c4"),anchor:"center"}).setLngLat([runPts[0].lng,runPts[0].lat]).addTo(lrMap);}catch(e){}}
  if(!lrHead){
    try{
      var headEl=document.createElement("div");headEl.className="lr-headwrap";headEl.innerHTML='<div class="lr-dot"></div>';
      lrHead=new maplibregl.Marker({element:headEl,anchor:"center"}).setLngLat([last.lng,last.lat]).addTo(lrMap);
    }catch(e){}
  }else{try{lrHead.setLngLat([last.lng,last.lat]);}catch(e){}}
  try{
    if(!mapCentered){
      if(runPts.length>1){
        var bounds=runPts.reduce(function(b,p){return b.extend([p.lng,p.lat]);},new maplibregl.LngLatBounds([runPts[0].lng,runPts[0].lat],[runPts[0].lng,runPts[0].lat]));
        lrMap.fitBounds(bounds,{padding:28,maxZoom:17,duration:0});
      }else{
        lrMap.jumpTo({center:[last.lng,last.lat],zoom:17});
      }
      mapCentered=true;
    }else{
      var c=lrMap.getCenter(), d=havermapDistance(c.lat,c.lng,last.lat,last.lng);
      if(d>35) lrMap.panTo([last.lng,last.lat],{duration:350});
    }
  }catch(e){}
}
function renderRoute(){
  if(mapMode==="maplibre"&&mapReady&&lrMap){$("lrTrace").style.display="none";updateMap();}
  else{$("lrTrace").style.display="";$("lrMapEmpty").style.display=runPts.length>1?"none":"";drawTrace();}
}
function drawTraceInto(svg,pts){
  if(!svg)return;
  if(!pts||pts.length<2){svg.innerHTML="";return;}
  var lats=pts.map(function(p){return p.lat;}),lngs=pts.map(function(p){return p.lng;});
  var minLat=Math.min.apply(null,lats),maxLat=Math.max.apply(null,lats),minLng=Math.min.apply(null,lngs),maxLng=Math.max.apply(null,lngs);
  var span=Math.max(1e-5,maxLat-minLat,maxLng-minLng),pad=10,sz=100-2*pad;
  var cLat=(minLat+maxLat)/2,cLng=(minLng+maxLng)/2;
  var X=function(lng){return (pad+((lng-cLng)/span+0.5)*sz).toFixed(1);};
  var Y=function(lat){return (pad+(0.5-(lat-cLat)/span)*sz).toFixed(1);};
  var dd=pts.map(function(p,i){return (i?"L":"M")+X(p.lng)+" "+Y(p.lat);}).join(" ");
  var f=pts[0],l=pts[pts.length-1];
  svg.innerHTML='<path d="'+dd+'" fill="none" stroke="#e3ae4a" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/>'
    +'<circle cx="'+X(f.lng)+'" cy="'+Y(f.lat)+'" r="3" fill="#2c63c4"/>'
    +'<circle cx="'+X(l.lng)+'" cy="'+Y(l.lat)+'" r="3.4" fill="#e3ae4a"/>';
}
function drawTrace(){drawTraceInto($("lrTrace"),runPts);}
var rmMap=null,rmReady=false,rmStart=null,rmEnd=null,rmPendingPts=null;
function drawRunMapPts(pts){
  try{
    if(rmStart){rmStart.remove();rmStart=null;}
    if(rmEnd){rmEnd.remove();rmEnd=null;}
    var coords=pts.map(function(p){return [p.lng,p.lat];});
    var src=rmMap.getSource("rm-route");
    if(src)src.setData({type:"Feature",geometry:{type:"LineString",coordinates:coords}});
    rmMap.resize();
    var bounds=coords.reduce(function(b,c){return b.extend(c);},new maplibregl.LngLatBounds(coords[0],coords[0]));
    rmMap.fitBounds(bounds,{padding:24,maxZoom:17,duration:0});
    rmStart=new maplibregl.Marker({element:mlCircleEl("#2c63c4"),anchor:"center"}).setLngLat(coords[0]).addTo(rmMap);
    rmEnd=new maplibregl.Marker({element:mlCircleEl("#e3ae4a"),anchor:"center"}).setLngLat(coords[coords.length-1]).addTo(rmMap);
  }catch(e){}
}
function initRunMapWithMaplibre(r){
  if(!rmMap){
    try{
      rmMap=new maplibregl.Map({container:"runMapEl",style:mapStyleUrl(),center:[6.1432,46.2044],zoom:13,attributionControl:true,dragRotate:false,pitchWithRotate:false,touchPitch:false});
      rmMap.on("load",function(){
        try{
          rmMap.addSource("rm-route",{type:"geojson",data:{type:"Feature",geometry:{type:"LineString",coordinates:[]}}});
          rmMap.addLayer({id:"rm-route-line",type:"line",source:"rm-route",layout:{"line-cap":"round","line-join":"round"},paint:{"line-color":"#e3ae4a","line-width":5,"line-opacity":.95}});
          rmReady=true;
          if(rmPendingPts){drawRunMapPts(rmPendingPts);rmPendingPts=null;}
        }catch(e){}
      });
    }catch(e){rmMap=null;rmReady=false;}
  }
  if(rmMap){
    if(rmReady)drawRunMapPts(r.pts);else rmPendingPts=r.pts;
  }else{
    $("runMapEl").style.display="none";$("runMapSvg").style.display="";
    drawTraceInto($("runMapSvg"),r.pts);
  }
}
function waitForMaplibreRunMap(r,triesLeft){
  if(!$("runMapModal").classList.contains("on"))return; /* fermé entretemps */
  if(window.maplibregl){
    $("runMapEl").style.display="";$("runMapSvg").style.display="none";
    initRunMapWithMaplibre(r);
    return;
  }
  if(triesLeft<=0){
    $("runMapEl").style.display="none";$("runMapSvg").style.display="";
    drawTraceInto($("runMapSvg"),r.pts);
    return;
  }
  setTimeout(function(){waitForMaplibreRunMap(r,triesLeft-1);},200);
}
function openRunMap(id){
  var r=state.runs.find(function(x){return x.id===id;});
  if(!r||!Array.isArray(r.pts)||r.pts.length<2){toast("Aucun tracé enregistré pour cette course");return;}
  $("runMapModal").classList.add("on");
  $("runMapEl").style.display="none";$("runMapSvg").style.display="";
  setTimeout(function(){waitForMaplibreRunMap(r,45);},60);
}
function closeRunMap(){$("runMapModal").classList.remove("on");}
function requestWake(){try{if("wakeLock"in navigator&&navigator.wakeLock)navigator.wakeLock.request("screen").then(function(w){wakeLock=w;}).catch(function(){});}catch(e){}}
function releaseWake(){try{if(wakeLock){wakeLock.release();wakeLock=null;}}catch(e){}}
function fixLiveMapSize(){if(lrMap&&$("liveRunModal").classList.contains("on")){try{lrMap.resize();}catch(e){}}}
window.addEventListener("resize",fixLiveMapSize);
window.addEventListener("orientationchange",function(){setTimeout(fixLiveMapSize,200);});

function openSteps(){var t=valToday(state.steps);$("stepsInput").value=t||"";$("stepsModal").classList.add("on");}
function closeSteps(){$("stepsModal").classList.remove("on");}
function saveSteps(){var v=Math.round(Number($("stepsInput").value));if(!(v>=0)||!isFinite(v)){toast("Nombre invalide");return;}upsertV(state.steps,today(),v);save();closeSteps();renderProgress();renderToday();toast("Pas enregistrés");}

var weeklyMenuKey="";
var menuOpenDay=null; /* jour affiché dans la carte du menu (aujourd'hui par défaut) */
/* le menu type (~1 800-1 950 kcal) est mis à l'échelle de l'objectif calorique du Profil :
   quantités (g, œufs), kcal et protéines ajustées du même facteur */
function menuFactor(d){
  var base=MENU[d][1].reduce(function(s,m){var x=m[2].match(/(\d+)\s*kcal/);return s+(x?Number(x[1]):0);},0);
  var goal=Number(state.profile.cal||2400);
  return base?Math.max(0.6,Math.min(1.8,goal/base)):1;
}
/* ajustement du menu à l'objectif : les portions de protéines restent (objectif protéines
   déjà couvert), ce sont les féculents qui absorbent l'écart de calories ; un repas sans
   féculent pesé est ajusté en entier */
var MENU_PROTEIN_FOODS=/skyr|thon|crevette|œuf|fromage blanc|tofu|whey|lait|séré|cottage/i;
function scaleGrams(part,f){
  return part.replace(/(\d+)\s*g\b/g,function(_,n){var v=Number(n)*f;v=v>=50?Math.round(v/10)*10:Math.max(5,Math.round(v/5)*5);return v+" g";});
}
function menuMeal(d,m){
  var row=MENU[d][1][m],f=menuFactor(d),xk=row[2].match(/(\d+)\s*kcal/),xp=row[2].match(/(\d+)\s*g prot/);
  var k0=xk?Number(xk[1]):0,p0=xp?Number(xp[1]):0,parts=row[1].split(" + ");
  var carbParts=parts.filter(function(x){return /\d+\s*g\b/.test(x)&&!MENU_PROTEIN_FOODS.test(x);});
  var desc=row[1],prot=p0;
  if(Math.abs(f-1)>=0.03){
    if(carbParts.length){
      var carbK=Math.max(80,k0-p0*5.5),fc=Math.max(0.4,Math.min(3,1+k0*(f-1)/carbK));
      desc=parts.map(function(x){return carbParts.indexOf(x)>=0?scaleGrams(x,fc):x;}).join(" + ");
      prot=Math.round(p0+(fc-1)*carbK*0.03);
    }else{
      desc=scaleGrams(row[1],f).replace(/(\d+)\s*œufs?/g,function(_,n){var v=Math.max(1,Math.round(Number(n)*f));return v+(v>1?" œufs":" œuf");});
      prot=Math.round(p0*f);
    }
  }
  return {type:row[0],desc:desc,kcal:Math.round(k0*f/10)*10,prot:prot};
}
function buildWeeklyMenuHTML(){
  var idx=(new Date().getDay()+6)%7;
  if(menuOpenDay==null||menuOpenDay<0)menuOpenDay=idx;
  var d=menuOpenDay,meals=MENU[d][1].map(function(_,m){return menuMeal(d,m);});
  var tk=meals.reduce(function(s,x){return s+x.kcal;},0),tp=meals.reduce(function(s,x){return s+x.prot;},0);
  var goal=Number(state.profile.cal||2400);
  $("weeklyMenu").innerHTML='<div class="menu-days">'+MENU.map(function(dd,i){
      return '<button class="md'+(i===d?" on":"")+(i===idx?" today":"")+'" data-act="toggleMenuDay" data-d="'+i+'">'+dd[0].charAt(0)+'</button>';
    }).join("")+'</div>'
    +'<div class="menu-head"><b>'+MENU[d][0]+(d===idx?" · aujourd'hui":"")+'</b><span>≈ '+tk.toLocaleString("fr-CH")+' kcal · '+tp+' g prot.</span></div>'
    +'<div class="menu-note">Quantités ajustées à ton objectif de '+goal.toLocaleString("fr-CH")+' kcal</div>'
    +meals.map(function(x,m){
      return '<div class="menu-row"><div class="menu-t"><small><em>'+esc(x.type)+'</em> · '+x.kcal+' kcal · '+x.prot+' g prot.</small><span>'+esc(x.desc)+'</span></div>'
        +'<button class="menu-add" data-act="menuAdd" data-d="'+d+'" data-m="'+m+'" aria-label="Ajouter au journal"><svg class="ic-s" aria-hidden="true"><use href="#i-plus"/></svg></button></div>';
    }).join("");
}
function toggleMenuDay(i){menuOpenDay=i;buildWeeklyMenuHTML();}
function renderWeeklyMenuIfNeeded(){
  var key=((new Date().getDay()+6)%7)+"|"+state.profile.cal;
  if(key===weeklyMenuKey)return; /* ne change qu'avec le jour ou l'objectif calorique */
  weeklyMenuKey=key;
  buildWeeklyMenuHTML();
}
var NUT_TABS=["day","week","menu"],nutTab=(function(){var t=lsGet("evoNutTab");return NUT_TABS.indexOf(t)>=0?t:"day";})();
function applyNutTab(){
  document.querySelectorAll("#nutSeg .cat-tab").forEach(function(b){b.classList.toggle("on",b.dataset.t===nutTab);});
  document.querySelectorAll("#meals [data-ntab]").forEach(function(el){el.classList.toggle("ptab-off",el.dataset.ntab!==nutTab);});
}
function setNutTab(t,dir){
  if(NUT_TABS.indexOf(t)<0||t===nutTab)return;
  nutTab=t;lsSet("evoNutTab",t);renderMeals();
  var seg=$("nutSeg");try{if(seg&&window.scrollY>seg.offsetTop)window.scrollTo(0,Math.max(0,seg.offsetTop-60));}catch(e){}
  if(dir){var pg=$("meals");pg.classList.remove("slide-l","slide-r");void pg.offsetWidth;pg.classList.add(dir>0?"slide-l":"slide-r");}
  haptic("light");
}
function renderMeals(){
  if(state.page!=="meals")return; /* repeinte automatiquement par showPage() à la prochaine visite */
  applyNutTab();renderCalWeek();
  var kcal=state.meals.reduce(function(s,m){return s+Number(m.kcal||0);},0),prot=state.meals.reduce(function(s,m){return s+Number(m.protein||0);},0),carbs=state.meals.reduce(function(s,m){return s+Number(m.carbs||0);},0),fat=state.meals.reduce(function(s,m){return s+Number(m.fat||0);},0);
  var goal=Number(state.profile.cal||2400),carbGoal=fnum(state.macro.carbs,265),protGoal=fnum(state.macro.protein,155),fatGoal=fnum(state.macro.fat,80);
  ring($("calRing"),Math.min(1,kcal/goal),kcal>goal*1.05?"#d0875a":"#e3ae4a",Math.round(kcal).toLocaleString("fr-CH")+"\n/ "+goal.toLocaleString("fr-CH")+" kcal");
  var kLeft=Math.round(goal-kcal);
  var brn=dayBurn(today()),bal2=Math.round(kcal-brn.total);
  var bl=$("mealBurn");if(bl)bl.innerHTML='Dépense estimée aujourd\'hui : <b>'+kfmt(brn.total)+' kcal</b> · '+(bal2<=0?'<span class="good">déficit '+kfmt(-bal2)+' kcal</span>':'<span class="bad">surplus '+kfmt(bal2)+' kcal</span>');
  $("calLeft").innerHTML=kLeft>=0?'Reste <b>'+kLeft.toLocaleString("fr-CH")+'</b> kcal':'<span class="over">+'+(-kLeft).toLocaleString("fr-CH")+' kcal</span> au-dessus';
  $("mCarbsGoal").textContent=Math.round(carbGoal);$("mProtGoal").textContent=Math.round(protGoal);$("mFatGoal").textContent=Math.round(fatGoal);
  $("mCarbs").textContent=Math.round(carbs);$("mProt").textContent=Math.round(prot);$("mFat").textContent=Math.round(fat);
  function leftTxt(v,g){var l=Math.round(g-v);return l>0?"reste "+l+" g":"objectif atteint";}
  $("mCarbsLeft").textContent=leftTxt(carbs,carbGoal);$("mProtLeft").textContent=leftTxt(prot,protGoal);$("mFatLeft").textContent=leftTxt(fat,fatGoal);
  $("mCarbsBar").style.width=Math.min(100,carbs/carbGoal*100)+"%";$("mProtBar").style.width=Math.min(100,prot/protGoal*100)+"%";$("mFatBar").style.width=Math.min(100,fat/fatGoal*100)+"%";
  var limits={"Petit-déjeuner":Math.round(goal*0.25/10)*10,"Déjeuner":Math.round(goal*0.35/10)*10,"Dîner":Math.round(goal*0.30/10)*10,"Collation":Math.round(goal*0.10/10)*10},ids={"Petit-déjeuner":"breakfastKcal","Déjeuner":"lunchKcal","Dîner":"dinnerKcal","Collation":"snackKcal"};
  var itemIds={"Petit-déjeuner":"itemsBreakfast","Déjeuner":"itemsLunch","Dîner":"itemsDinner","Collation":"itemsSnack"};
  var byType={};Object.keys(itemIds).forEach(function(t){byType[t]=[];});
  state.meals.forEach(function(m,i){var t=byType[m.type]?m.type:"Collation";byType[t].push({m:m,i:i});});
  Object.keys(ids).forEach(function(type){var total=byType[type].reduce(function(s,x){return s+Number(x.m.kcal||0);},0);$(ids[type]).textContent=Math.round(total)+" / "+limits[type]+" kcal";
    $(itemIds[type]).innerHTML=byType[type].map(function(x){var m=x.m;return '<div class="meal"><div class="mi"><b>'+esc(m.name)+'</b><div class="d">'+(m.menu?"":fr(m.qty||100)+' g · ')+fr(m.protein||0)+' g prot.</div></div><div class="kc">'+Math.round(Number(m.kcal||0))+' kcal</div><button class="del" data-act="delMeal" data-i="'+x.i+'"><svg class="ic-s" aria-hidden="true"><use href="#i-xmark"/></svg></button></div>';}).join("");
  });
  renderWeeklyMenuIfNeeded();
  renderGrocerySummary();
}
/* quantités d'eau exactes : 250 ml, 1,5 L, 2,75 L (sans arrondir 250 ml à 0,3 L) */
function fmtL(ml){ml=Math.round(Number(ml)||0);if(Math.abs(ml)<1000)return ml+" ml";return String(Math.round(ml/10)/100).replace(".",",")+" L";}
function fmtL1(ml){return String(Math.round(ml/100)/10).replace(".",",")+" L";}
function renderWater(){
  if(state.page!=="water")return;
  if(rollWater())save();var wt=state.water;
  var ml=Number(wt.ml||0),goalMl=Math.max(500,Number(state.waterGoal||3)*1000),pct=Math.min(1,ml/goalMl);
  var waterStep=Math.max(100,Math.round(goalMl/10/50)*50),r=52,c=2*Math.PI*r;
  $("waterRing").innerHTML='<svg viewBox="0 0 128 128"><circle cx="64" cy="64" r="'+r+'" fill="none" stroke="var(--ring-track)" stroke-width="11"/>'
    +'<circle cx="64" cy="64" r="'+r+'" fill="none" stroke="var(--accent)" stroke-width="11" stroke-linecap="round" stroke-dasharray="'+(Math.max(pct,0.012)*c).toFixed(1)+' '+c.toFixed(1)+'" transform="rotate(-90 64 64)"/></svg>'
    +'<div class="wr-center"><b>'+fmtL(ml)+'</b><span>'+Math.round(pct*100)+' %</span></div>';
  $("waterGoalLabel").textContent=fmtL(goalMl);
  var left=goalMl-ml;
  $("waterLeft").textContent=left>0?"Encore "+fmtL(left):"Objectif atteint 🎉";
  var nG=Math.ceil(left/waterStep);
  $("waterHint").textContent=left>0?"≈ "+nG+" verre"+(nG>1?"s":"")+" de "+fr(waterStep/10)+" cl":"Continue à boire selon ta soif";
  /* verres pleins (✓), un verre entamé rempli en partie, les autres vides */
  var glasses=Math.min(10,Math.floor(ml/waterStep+1e-9)),partPct=glasses<10?Math.round((ml-glasses*waterStep)/waterStep*100):0;
  $("waterGlasses").innerHTML=Array.from({length:10},function(_,i){
    var full=i<glasses,fill=full?100:(i===glasses?partPct:0);
    return '<div class="glass'+(full?" full":(fill>0?" part":""))+'"><i class="glass-fill" style="height:'+fill+'%"></i><button data-act="waterAdd" data-amount="'+(full?(-waterStep):waterStep)+'" aria-label="'+(full?"Retirer":"Ajouter")+' '+waterStep+' ml">'+(full?"✓":"＋")+'</button></div>';
  }).join("");
  $("waterStepLab").textContent="1 verre = "+waterStep+" ml";
  /* 7 derniers jours */
  var hist=state.waterHistory||[],days=[],base=new Date();
  for(var k=6;k>=0;k--){var dt=new Date(base);dt.setDate(base.getDate()-k);var d=dt.getFullYear()+"-"+pad(dt.getMonth()+1)+"-"+pad(dt.getDate());
    var v=d===today()?ml:((hist.find(function(x){return x.d===d;})||{}).ml||0);days.push({d:d,v:v,lab:"LMMJVSD".charAt((dt.getDay()+6)%7)});}
  var mx=Math.max(goalMl*1.2,Math.max.apply(null,days.map(function(x){return x.v;})));
  var past=days.filter(function(x){return x.d!==today()&&x.v>0;});
  $("waterWeek").innerHTML='<div class="calbars">'+goalLine(goalMl/mx)+days.map(function(x){
      return '<div class="cb'+(x.d===today()?" today":"")+'"><div class="bar"><i class="'+(x.v>=goalMl?"ok":(x.v>0?"under":""))+'" style="height:'+(x.v?Math.max(4,x.v/mx*100):0)+'%"></i></div><span>'+x.lab+'</span></div>';
    }).join("")+'</div>'
    +'<div class="big3" style="margin-bottom:0;grid-template-columns:repeat(2,1fr)"><div><div class="v num">'+(past.length?fmtL1(past.reduce(function(s2,x){return s2+x.v;},0)/past.length):"—")+'</div><div class="l">moyenne / jour</div></div><div><div class="v num">'+days.filter(function(x){return x.v>=goalMl;}).length+'/7</div><div class="l">jours objectif atteint</div></div></div>';
}
function ring(svg,frac,color,center){
  var p=Math.max(0,Math.min(1,Number(frac)||0)),parts=String(center).split("\n");
  svg.setAttribute("viewBox","0 0 100 62");
  svg.innerHTML='<path d="M 8 50 A 42 42 0 0 1 92 50" fill="none" stroke="var(--ring-track)" stroke-width="9" stroke-linecap="round"/><path d="M 8 50 A 42 42 0 0 1 92 50" fill="none" stroke="'+color+'" stroke-width="9" stroke-linecap="round" pathLength="100" stroke-dasharray="100" stroke-dashoffset="'+(100-p*100)+'"/><text x="50" y="35" text-anchor="middle" fill="var(--text)" style="font-family:var(--display)" font-weight="700" font-size="18">'+parts[0]+'</text>'+(parts[1]?'<text x="50" y="48" text-anchor="middle" fill="var(--muted)" style="font-family:var(--font)" font-size="8.5">'+parts[1]+'</text>':'');
}
function addMealObj(o){o.date=today();o.qty=Number(o.qty||100);state.meals.push(o);save();renderMeals();renderToday();}
function currentFoodFromForm(){return {name:$("foodQ").value.trim(),kcal:fnum($("foodKcal").value,0),protein:fnum($("foodProt").value,0),carbs:fnum($("foodCarbs").value,0),fat:fnum($("foodFat").value,0),qty:fnum($("foodQty").value,100),type:$("foodType").value};}
/* per-100g reference: once a product is scanned or searched, recompute kcal/macros live as the quantity changes */
var foodRef100=null;
function setFoodRef100(kcal,protein,carbs,fat){
  foodRef100={kcal:Number(kcal)||0,protein:Number(protein)||0,carbs:Number(carbs)||0,fat:Number(fat)||0};
  var hint=$("foodRefHint");if(hint)hint.style.display="";
}
function clearFoodRef100(){foodRef100=null;var hint=$("foodRefHint");if(hint)hint.style.display="none";}
function applyFoodRef100ToQty(){
  if(!foodRef100)return;
  var qty=fnum($("foodQty").value,100),f=qty/100;
  $("foodKcal").value=Math.round(foodRef100.kcal*f);
  $("foodProt").value=Math.round(foodRef100.protein*f*10)/10;
  $("foodCarbs").value=Math.round(foodRef100.carbs*f*10)/10;
  $("foodFat").value=Math.round(foodRef100.fat*f*10)/10;
}
function saveFavorite(){
  var f=currentFoodFromForm();if(!f.name){toast("Indique l’aliment");return;}
  var i=state.foodFavorites.findIndex(function(x){return x.name.toLowerCase()===f.name.toLowerCase();});
  if(i>=0)state.foodFavorites[i]=f;else state.foodFavorites.push(f);
  state.foodFavorites=state.foodFavorites.slice(-100);save();toast("Aliment enregistré ⭐");
}
function openFavorites(){
  var list=$("favoriteList");
  list.innerHTML=state.foodFavorites.length?state.foodFavorites.slice().reverse().map(function(f,i){
    var real=state.foodFavorites.length-1-i;
    return '<div class="favorite-item"><div class="fi"><b>'+esc(f.name)+'</b><span>'+fr(f.qty||100)+' g · '+fr(f.kcal||0)+' kcal · '+fr(f.protein||0)+' g prot.</span></div><button data-act="favUse" data-i="'+real+'">Ajouter</button><button data-act="favDelete" data-i="'+real+'"><svg class="ic-s" aria-hidden="true"><use href="#i-xmark"/></svg></button></div>';
  }).join(""):'<div class="empty">Aucun aliment enregistré. Ajoute-en un depuis le formulaire.</div>';
  $("favoritesModal").classList.add("on");
}
function closeFavorites(){$("favoritesModal").classList.remove("on");}
function useFavorite(i){
  var f=state.foodFavorites[i];if(!f)return;
  addMealObj(Object.assign({},f));closeFavorites();toast("Aliment ajouté");
}
function deleteFavorite(i){
  var removed=state.foodFavorites[i];if(!removed)return;
  state.foodFavorites.splice(i,1);save();openFavorites();
  snack("Aliment retiré des favoris","Annuler",function(){state.foodFavorites.splice(i,0,removed);save();openFavorites();},5000);
}
function groceryCount(){
  var once=state.groceryList.once,weekly=state.groceryList.weekly;
  var total=once.length+weekly.length,done=once.filter(function(x){return x.done;}).length+weekly.filter(function(x){return x.done;}).length;
  return {total:total,done:done};
}
function renderGrocerySummary(){
  var c=groceryCount();
  $("groceryText").textContent=c.done+"/"+c.total+" cochés";
}
function groceryRowsHTML(list,key){
  return list.length?list.map(function(x,i){
    return '<div class="grocery-item"><label><input type="checkbox" data-act="groceryToggle" data-list="'+key+'" data-i="'+i+'"'+(x.done?" checked":"")+'><span class="'+(x.done?"done":"")+'">'+esc(x.n)+'</span></label><button class="del" data-act="groceryDel" data-list="'+key+'" data-i="'+i+'"><svg class="ic-s" aria-hidden="true"><use href="#i-xmark"/></svg></button></div>';
  }).join(""):'<div class="empty">Rien ici.</div>';
}
function openGrocery(){
  $("groceryOnceList").innerHTML=groceryRowsHTML(state.groceryList.once,"once");
  $("groceryWeeklyList").innerHTML=groceryRowsHTML(state.groceryList.weekly,"weekly");
  $("groceryModal").classList.add("on");
}
function closeGrocery(){$("groceryModal").classList.remove("on");}
function toggleGrocery(key,i){
  var item=state.groceryList[key]&&state.groceryList[key][i];if(!item)return;
  item.done=!item.done;haptic("light");save();openGrocery();renderGrocerySummary();
}
function deleteGrocery(key,i){
  var list=state.groceryList[key];if(!list||!list[i])return;
  var removed=list[i];list.splice(i,1);save();openGrocery();renderGrocerySummary();
  snack("Article retiré","Annuler",function(){list.splice(i,0,removed);save();openGrocery();renderGrocerySummary();},5000);
}
function addGrocery(){
  var v=$("groceryAddInput").value.trim();if(!v)return;
  state.groceryList.once.push({n:v,done:false});
  $("groceryAddInput").value="";save();openGrocery();renderGrocerySummary();
}
function resetGrocery(){
  state.groceryList.once.forEach(function(x){x.done=false;});
  state.groceryList.weekly.forEach(function(x){x.done=false;});
  save();openGrocery();renderGrocerySummary();toast("Liste réinitialisée");
}
var fastBeeped=false;
function renderFasting(){
  /* détection de fin de jeûne (vibration/toast) tourne toujours, même sur un autre
     onglet ; seul l'affichage DOM est sauté quand Repas n'est pas affiché */
  if(state.fast&&state.fast.active&&state.fast.start){
    var leftChk=Number(state.fast.hours||16)*3600000-(Date.now()-Number(state.fast.start));
    if(leftChk<=0&&!fastBeeped){
      fastBeeped=true;
      try{if(navigator.vibrate)navigator.vibrate([120,60,120]);}catch(e){}
      toast("Jeûne terminé 🎉");
    }
  }else{
    fastBeeped=false;
  }
  if(state.page!=="meals")return; /* carte + modale ne vivent que sur Repas, inutile de la repeindre chaque seconde ailleurs */
  var title=$("fastTitle"),txt=$("fastText"),bar=$("fastProgress"),btn=$("fastBtn"),actBtn=$("fastActBtn");if(!title||!txt||!bar||!btn)return;
  var hours=Number(state.fast.hours||16);title.textContent="Routine "+hours+":"+Math.max(0,24-hours);
  if(!state.fast.active||!state.fast.start){txt.textContent="Aucun jeûne en cours";bar.style.width="0%";btn.textContent="Démarrer";if(actBtn)actBtn.textContent="Démarrer";return;}
  var elapsed=Math.max(0,Date.now()-Number(state.fast.start)),total=hours*3600000,pct=Math.min(100,elapsed/total*100);
  var left=Math.max(0,total-elapsed),lh=Math.floor(left/3600000),lm=Math.floor((left%3600000)/60000);
  txt.textContent=left?("Encore "+lh+" h "+String(lm).padStart(2,"0")):"Jeûne terminé 🎉";
  bar.style.width=pct+"%";btn.textContent=left?"Arrêter":"Terminé";if(actBtn)actBtn.textContent="Arrêter";
}
function openFasting(){renderFasting();$("fastModal").classList.add("on");}
function startFasting(){var h=Number($("fastHours").value||16);state.fast={active:true,start:Date.now(),hours:h};save();$("fastModal").classList.remove("on");renderFasting();toast("Jeûne démarré · "+h+" h");}
function stopFasting(){state.fast={active:false,start:null,hours:Number(state.fast.hours||16)};save();$("fastModal").classList.remove("on");renderFasting();toast("Jeûne arrêté");}
function toggleFasting(){if(state.fast&&state.fast.active)stopFasting();else startFasting();}

/* calcul des objectifs : métabolisme de base (Mifflin-St Jeor) × activité, déficit de 20 %
   pour perdre du gras sans fondre le muscle ; protéines 1,8 g/kg du poids cible */
var calcSex="M";
function setCalcSex(v){calcSex=v==="F"?"F":"M";document.querySelectorAll("#fSex .cat-tab").forEach(function(b){b.classList.toggle("on",b.dataset.v===calcSex);});}
/* taille, âge, sexe, activité : enregistrés dès la saisie (avant, seulement via « Enregistrer les objectifs ») */
function saveCalcFields(){
  var h=fnum($("fHeight").value,0),a=fnum($("fAge").value,0),pr=state.profile;
  if(h>=120&&h<=230)pr.height=Math.round(h);
  if(a>=14&&a<=99)pr.age=Math.round(a);
  pr.sex=calcSex;pr.activity=Number($("fAct").value)||1.375;
  save();
  if(state.page==="today")renderToday();
}
function calcGoals(){
  var w=latestBody(),h=fnum($("fHeight").value,0),a=fnum($("fAge").value,0),act=Number($("fAct").value)||1.375,tw=fnum($("fTarget").value,0)||Number(state.profile.target)||w;
  if(!(h>=120&&h<=230)||!(a>=14&&a<=99)){toast("Indique ta taille (cm) et ton âge");return;}
  saveCalcFields();
  var bmr=10*w+6.25*h-5*a+(calcSex==="F"?-161:5),tdee=bmr*act;
  var cal=Math.max(calcSex==="F"?1300:1600,Math.round(tdee*0.8/50)*50);
  var prot=Math.round(1.8*Math.min(w,tw)/5)*5,fat=Math.min(Math.round(0.8*w/5)*5,Math.round(cal*0.3/9/5)*5),carbs=Math.max(80,Math.round((cal-prot*4-fat*9)/4/5)*5);
  $("fCal").value=cal;$("fProt").value=prot;$("fFat").value=fat;$("fCarbs").value=carbs;
  var perWeek=(tdee-cal)*7/7700;
  $("calcInfo").innerHTML='Maintien ≈ <b>'+Math.round(tdee/50)*50+'</b> kcal · objectif <b>'+cal+'</b> kcal (−20 %) · environ <b>−'+fr(perWeek)+' kg/sem.</b><br>Vérifie puis touche « Enregistrer les objectifs ».';
  haptic("light");
}
function renderProgList(){
  var pl=$("progList");if(!pl)return;
  pl.innerHTML=state.program.map(function(p){return '<button class="lrow" data-act="editDay" data-id="'+esc(p.id)+'"><span class="lrow-ic">'+p.icon+'</span><span class="lrow-t"><b>'+esc(p.name)+'</b><small>'+esc(p.focus)+' · '+p.ex.length+' exercices</small></span><svg class="ic-s lrow-chev" aria-hidden="true"><use href="#i-chevron_right"/></svg></button>';}).join("");
}
function renderProfile(){
  /* ne pas écraser un champ en cours de saisie si l'app se redessine (synchro cloud, changement de jour) */
  if(document.activeElement!==$("fHeight"))$("fHeight").value=state.profile.height||"";
  if(document.activeElement!==$("fAge"))$("fAge").value=state.profile.age||"";$("fAct").value=String(state.profile.activity||1.375);setCalcSex(state.profile.sex||"M");
  $("fSound").checked=soundOn();
  $("fStartDate").value=state.profile.startDate||START_DATE;
  $("fStart").value=state.profile.start;$("fTarget").value=state.profile.target;$("fCal").value=state.profile.cal;
  $("fCarbs").value=state.macro.carbs;$("fProt").value=state.macro.protein;$("fFat").value=state.macro.fat;$("fWater").value=state.waterGoal;
  renderProgList();
  var ks=$("clKeyStatus");if(ks){var kk=clKey();ks.innerHTML=kk?'Clé enregistrée sur ce téléphone : <b class="good">…'+esc(kk.slice(-4))+'</b>':'Aucune clé : le coach Claude de l\'Accueil est désactivé.';}
  var bs=$("backupStatus");if(bs){var dn=daysSinceBackup();bs.innerHTML='Dernière sauvegarde : <b class="'+(dn==null||dn>=7?"bad":"good")+'">'+backupLabel()+'</b>'+(cloudUser?" · automatique (cloud)":" · connecte-toi ou exporte régulièrement");}
}

/* édition du programme */
function openEditDay(dayId){
  var p=state.program.find(function(x){return x.id===dayId;});if(!p)return;
  editDayId=dayId;
  editDayEx=p.ex.map(function(e){return {n:e.n,t:e.t,w:!!e.w,orig:e.n};});
  $("edName").value=p.name;
  renderEditDayList();
  $("editDayModal").classList.add("on");
}
function renderEditDayList(){
  $("editDayExList").innerHTML=editDayEx.map(function(e,i){
    return '<div class="ed-ex-row">'
      +'<div class="ed-fields">'
      +'<input type="text" data-i="'+i+'" data-f="n" value="'+esc(e.n)+'" placeholder="Nom de l\'exercice">'
      +'<input type="text" data-i="'+i+'" data-f="t" value="'+esc(e.t)+'" placeholder="séries × répétitions">'
      +'</div>'
      +'<label class="ed-w"><input type="checkbox" data-i="'+i+'" data-f="w" '+(e.w?"checked":"")+'>Charge</label>'
      +'<button type="button" class="ed-rm" data-act="edRemoveEx" data-i="'+i+'"><svg class="ic-s" aria-hidden="true"><use href="#i-xmark"/></svg></button>'
      +'</div>';
  }).join("")||'<div class="empty">Aucun exercice. Ajoutes-en un ci-dessous.</div>';
}
function edSyncFieldsFromDOM(){
  document.querySelectorAll('#editDayExList input').forEach(function(inp){
    var i=Number(inp.dataset.i),f=inp.dataset.f;
    if(!editDayEx[i])return;
    if(f==="w")editDayEx[i].w=inp.checked;
    else editDayEx[i][f]=inp.value;
  });
}
function edAddEx(){edSyncFieldsFromDOM();editDayEx.push({n:"",t:"3 × 10-12",w:true,orig:null});renderEditDayList();}
function edRemoveEx(i){edSyncFieldsFromDOM();editDayEx.splice(i,1);renderEditDayList();}
function edClose(){$("editDayModal").classList.remove("on");editDayId=null;editDayEx=[];}
function edSave(){
  edSyncFieldsFromDOM();
  var p=state.program.find(function(x){return x.id===editDayId;});if(!p)return;
  var cleaned=editDayEx.map(function(e){return {n:(e.n||"").trim(),t:(e.t||"").trim()||"3 × 10-12",w:!!e.w,orig:e.orig};}).filter(function(e){return e.n;});
  if(!cleaned.length){toast("Ajoute au moins un exercice");return;}
  cleaned.forEach(function(e){
    if(e.orig&&e.orig!==e.n&&state.perf[e.orig]&&!state.perf[e.n]){
      state.perf[e.n]=state.perf[e.orig];
      delete state.perf[e.orig];
    }
  });
  var newName=($("edName").value||p.name).trim();if(newName)p.name=newName;
  p.ex=cleaned.map(function(e){return {n:e.n,t:e.t,w:e.w};});
  p.edited=true;
  save();
  edClose();
  renderProfile();
  toast("Programme mis à jour");
}

/* nav / pages */
function showPage(id){
  if(!$(id))id="today";
  if(id!=="session"){closeGuided();closeComplete();}
  state.page=id;
  document.querySelectorAll(".page").forEach(function(s){s.classList.toggle("on",s.id===id);});
  document.querySelectorAll(".nav button").forEach(function(b){b.classList.toggle("on",b.dataset.page===id);});
  if(id==="today")renderToday();
  else if(id==="session"){
    if(state.sessionAutoDay!==today()&&!guidedOpen){
      var pl=planFor(dowIdx());
      if(pl.kind!=="walk"){state.sessionCategory=pl.p.cat||"muscu";state.selDay=state.program.indexOf(pl.p);}
      state.sessionAutoDay=today();
    }
    renderSession();
  }
  else if(id==="progress")renderProgress();
  else if(id==="meals")renderMeals();
  else if(id==="water")renderWater();
  else if(id==="profile")renderProfile();
  try{window.scrollTo({top:0,behavior:"smooth"});}catch(e){window.scrollTo(0,0);}
  updateNavbar();
}

/* modals */
function latestBodyComp(){return state.bodyComp.length?state.bodyComp[state.bodyComp.length-1]:null;}
function openWeigh(mode){
  var measure=mode==="measure",m=$("weighModal");
  m.dataset.mode=measure?"measure":"weigh";
  $("wTitle").textContent=measure?"Nouvelles mesures":"Nouvelle pesée";
  $("wSub").textContent=measure?"Mètre ruban, le matin, sans serrer. Le poids n'est enregistré que si tu le modifies.":"Idéalement à jeun, le matin.";
  $("wInput").value=num(latestBody());
  var d=today(),today2=state.bodyComp.find(function(x){return x.d===d;})||latestBodyComp();
  $("wFat").value=today2&&today2.fat!=null?num(today2.fat):"";
  $("wMuscle").value=today2&&today2.muscle!=null?num(today2.muscle):"";
  var ms=(state.measures||[]).find(function(x){return x.d===d;});
  $("wWaist").value=ms&&ms.waist!=null?num(ms.waist):"";$("wHips").value=ms&&ms.hips!=null?num(ms.hips):"";
  ["wInput","wFat","wMuscle","wWaist","wHips"].forEach(function(id){$(id).dataset.init=$(id).value;});
  m.classList.add("on");
  if(measure)setTimeout(function(){try{$("wWaist").focus();}catch(e){}},320);
}
function closeWeigh(){$("weighModal").classList.remove("on");}
function stepWeigh(d){var v=Number($("wInput").value||latestBody());$("wInput").value=(Math.round((v+d)*10)/10);}
function saveWeigh(){
  var n=Number(String($("wInput").value).replace(",","."));
  if(!isFinite(n)||n<30||n>350){toast("Poids invalide");return;}
  function changed(id){return $(id).value.trim()!==($(id).dataset.init||"");}
  var fatRaw=$("wFat").value.trim(),muscleRaw=$("wMuscle").value.trim();
  var fat=fatRaw?Number(String(fatRaw).replace(",",".")):null;
  var muscle=muscleRaw?Number(String(muscleRaw).replace(",",".")):null;
  if(fat!=null&&(!isFinite(fat)||fat<3||fat>60)){toast("Masse grasse invalide (3–60 %)");return;}
  if(muscle!=null&&(!isFinite(muscle)||muscle<10||muscle>90)){toast("Masse musculaire invalide (10–90 kg)");return;}
  function cm(id,lo,hi){var v=$(id).value.trim();if(!v)return null;v=Number(v.replace(",","."));return isFinite(v)&&v>=lo&&v<=hi?Math.round(v*10)/10:NaN;}
  var waist=cm("wWaist",40,220),hips=cm("wHips",40,220);
  if(isNaN(waist)||isNaN(hips)){toast("Tour de taille/hanches invalide (40–220 cm)");return;}
  var d=today(),h=state.weightHistory,ix=h.findIndex(function(x){return x.d===d;});
  var bc=state.bodyComp,bix=bc.findIndex(function(x){return x.d===d;});
  /* masse grasse / musculaire préremplies avec la dernière mesure : on ne les réenregistre que si elles ont été modifiées (ou déjà saisies aujourd'hui) */
  var saveBC=(fat!=null||muscle!=null)&&(bix>=0||changed("wFat")||changed("wMuscle"));
  var saveMeas=waist!=null||hips!=null;
  /* « Mesurer » : le poids prérempli n'est enregistré que s'il a été modifié ; « Peser » : toujours */
  var measureMode=$("weighModal").dataset.mode==="measure";
  var saveW=!measureMode||changed("wInput")||ix>=0;
  if(measureMode&&!saveW&&!saveMeas&&!saveBC){toast("Entre ton tour de taille ou de hanches");return;}
  if(saveW){if(ix>=0)h[ix].w=n;else h.push({d:d,w:n});h.sort(function(a,b){return a.d.localeCompare(b.d);});}
  if(saveMeas){
    if(!state.measures)state.measures=[];
    var mix=state.measures.findIndex(function(x){return x.d===d;}),me={d:d,waist:waist,hips:hips};
    if(mix>=0)state.measures[mix]=me;else state.measures.push(me);
    state.measures.sort(function(a,b){return a.d.localeCompare(b.d);});
  }
  if(saveBC){
    var entry={d:d,fat:fat,muscle:muscle};
    if(bix>=0)bc[bix]=entry;else bc.push(entry);
    bc.sort(function(a,b){return a.d.localeCompare(b.d);});
  }
  save();closeWeigh();renderToday();renderProgress();
  toast(saveW?"Pesée enregistrée · "+fr(n)+" kg"+(saveMeas?" + mesures":""):"Mesures enregistrées");
}
function defaultMealTypeByHour(){
  var h=new Date().getHours();
  if(h<11)return "Petit-déjeuner";
  if(h<15)return "Déjeuner";
  if(h<21)return "Dîner";
  return "Collation";
}
function openMeal(type){$("foodQ").value="";$("foodQty").value="";$("foodKcal").value="";$("foodProt").value="";$("foodCarbs").value="";$("foodFat").value="";$("foodType").value=type||defaultMealTypeByHour();clearFoodRef100();$("foodSearchResults").innerHTML="";syncFoodSearchMode();$("mealModal").classList.add("on");setTimeout(function(){$("foodQ").focus();},50);}
function closeMeal(){$("mealModal").classList.remove("on");pendingBarcode=null;}
function saveMeal(){
  var f=currentFoodFromForm();if(!f.name){toast("Indique l'aliment");return;}
  if(pendingBarcode){
    state.customBarcodes[pendingBarcode]={name:f.name,kcal:f.kcal,protein:f.protein,carbs:f.carbs,fat:f.fat};
    pendingBarcode=null;
    addMealObj(f);closeMeal();toast("Repas ajouté · produit mémorisé pour ce code-barres");
    return;
  }
  addMealObj(f);closeMeal();toast("Repas ajouté");
}


/* barcode scanner */
var barcodeReader=null,barcodeControls=null,barcodeBusy=false,barcodeStream=null,pendingBarcode=null;
function stopBarcode(){
  try{if(barcodeControls&&barcodeControls.stop)barcodeControls.stop();}catch(e){}
  barcodeControls=null;
  try{if(barcodeReader&&barcodeReader.reset)barcodeReader.reset();}catch(e){}
  barcodeReader=null;
  try{if(barcodeStream){barcodeStream.getTracks().forEach(function(t){try{t.stop();}catch(e){}});}}catch(e){}
  barcodeStream=null;
  var v=$("scanVideo");if(v){try{v.pause();}catch(e){};v.srcObject=null;}
}
function closeScanner(){stopBarcode();$("scanModal").classList.remove("on");}
/* produits Coop/Migros/Denner courants mal ou pas référencés sur OpenFoodFacts, vérifiés manuellement
   (fiches produit Coop/Migros/Denner/OpenFoodFacts, valeurs pour 100 g/ml) */
var SEED_BARCODES={"5690845003790":{name:"Isey Skyr framboise-grenade sans lactose",kcal:76,protein:9.5,carbs:4.4,fat:2.2},"8719200041219":{name:"Rama Cremefine 7 %",kcal:89,protein:1.1,carbs:4.8,fat:7.4},
  "7610846871868":{name:"Qualité & Prix Thon rosé au naturel (Coop) 155 g",kcal:110,protein:26,carbs:0,fat:0.5},
  "7627534978501":{name:"Qualité & Prix Thon rosé à l'huile de tournesol (Coop)",kcal:186,protein:25,carbs:0,fat:9.5},
  "7610800036739":{name:"Coop Lifestyle Thon rosé au naturel 200 g",kcal:117,protein:26,carbs:1,fat:1},
  "7624841700177":{name:"Coop Prix Garantie Thon 120 g",kcal:341,protein:8.1,carbs:27,fat:22},
  "7624841548915":{name:"Coop Prix Garantie Thon sandwich 165 g",kcal:242,protein:9.6,carbs:23,fat:12},
  "8004030096004":{name:"Rio Mare Thon au naturel",kcal:118,protein:27,carbs:0.3,fat:1},
  "7613269879398":{name:"Skyr Vanille (Migros) 170 g",kcal:81,protein:10,carbs:10,fat:0.5},
  "00118668":{name:"Skyr nature (Migros) 170 g",kcal:61,protein:11,carbs:4,fat:0.1},
  "7624841842280":{name:"Skyr Nature (Coop) 400 g",kcal:57,protein:11,carbs:3.3,fat:0},
  "7610029141528":{name:"Séré maigre / Magerquark (Denner) 500 g",kcal:59,protein:9,carbs:5.5,fat:0.5},
  "7624841549578":{name:"Quark magro (Coop Prix Garantie) 500 g",kcal:62,protein:11,carbs:4,fat:0.2},
  "7613404013526":{name:"Cottage cheese (M-Budget) 750 g",kcal:88,protein:10,carbs:3,fat:4},
  "7613312403860":{name:"Flocons d'avoine complets fins (Migros Bio) 500 g",kcal:373,protein:13,carbs:61,fat:7},
  "7613404536094":{name:"Lait écrémé M Classic (Migros) 1 L",kcal:35,protein:3.5,carbs:4.9,fat:0.1},
  "7613404016183":{name:"Pain de seigle complet (Migros) 500 g",kcal:212,protein:6.8,carbs:36,fat:2.1},
  "7610200010919":{name:"Riz complet bio (Migros) 1 kg, cru",kcal:347,protein:8,carbs:69,fat:3},
  "7681735130342":{name:"High Protein Yoghurt banane (Coop) 150 g",kcal:87,protein:14,carbs:7.3,fat:0.33},
  "7613269680451":{name:"Fromage râpé (M-Budget) 250 g",kcal:345,protein:34,carbs:0.5,fat:23},
  "7613312320747":{name:"Whey protéines vanille (Migros) 750 g",kcal:382,protein:73,carbs:9,fat:6},
  "7627536595119":{name:"Whey Protein Chocolate (Coop)",kcal:374,protein:72,carbs:6.8,fat:6},
  "7610029155266":{name:"Toast complet intégrale (Denner) 500 g",kcal:242,protein:9.2,carbs:40,fat:3.6}
};
function offVal(n,keys){
  for(var i=0;i<keys.length;i++){var v=Number(n[keys[i]]);if(isFinite(v))return v;}
  return 0;
}
async function lookupBarcode(code){
  code=String(code||"").replace(/\D/g,"");
  if(code.length<8){$("scanStatus").textContent="Code-barres invalide.";barcodeBusy=false;return;}
  $("scanManualEntry").hidden=true;
  var fromUser=state.customBarcodes[code];
  var custom=fromUser||SEED_BARCODES[code];
  if(custom){
    $("scanStatus").textContent=fromUser?"Produit reconnu (mémorisé précédemment).":"Produit reconnu (base intégrée à l'app).";
    $("scanProduct").innerHTML="<b>"+esc(custom.name)+"</b><div style=\"font-size:12px;color:var(--muted);margin-top:4px\">"+(custom.kcal?Math.round(custom.kcal):"—")+" kcal · "+(custom.protein?Math.round(custom.protein*10)/10:"—")+" g protéines / 100 g</div>";
    $("scanProduct").classList.add("on");
    $("foodQ").value=custom.name;
    $("foodKcal").value=custom.kcal?Math.round(custom.kcal):"";
    $("foodProt").value=custom.protein?Math.round(custom.protein*10)/10:"";
    $("foodCarbs").value=custom.carbs?Math.round(custom.carbs*10)/10:"";
    $("foodQty").value="100";
    $("foodFat").value=custom.fat?Math.round(custom.fat*10)/10:"";
    setFoodRef100(custom.kcal,custom.protein,custom.carbs,custom.fat);
    stopBarcode();
    setTimeout(function(){closeScanner();$("mealModal").classList.add("on");},400);
    return;
  }
  $("scanStatus").textContent="Recherche du produit…";$("scanProduct").classList.remove("on");
  try{
    var data=await fetchOffProduct(code);
    if(!data||!data.product)throw new Error(data?"not_found":"network");
    var p=data.product,n=p.nutriments||{};
    var kcal=offVal(n,["energy-kcal_100g","energy-kcal"]);
    var prot=offVal(n,["proteins_100g","proteins"]);
    var carbs=offVal(n,["carbohydrates_100g","carbohydrates"]);
    var fat=offVal(n,["fat_100g","fat"]);
    var name=(p.brands?p.brands+" ":"")+(p.product_name||"Produit");
    $("scanProduct").innerHTML="<b>"+esc(name)+"</b><div style=\"font-size:12px;color:var(--muted);margin-top:4px\">"+(kcal?Math.round(kcal):"—")+" kcal · "+(prot?Math.round(prot*10)/10:"—")+" g protéines / 100 g</div>";
    $("scanProduct").classList.add("on");
    $("foodQ").value=name;
    $("foodKcal").value=kcal?Math.round(kcal):"";
    $("foodProt").value=prot?Math.round(prot*10)/10:"";
    $("foodCarbs").value=carbs?Math.round(carbs*10)/10:"";
    $("foodQty").value="100";
    $("foodFat").value=fat?Math.round(fat*10)/10:"";
    setFoodRef100(kcal,prot,carbs,fat);
    /* gardé en mémoire : le prochain scan de ce produit marche même sans réseau */
    if(kcal)state.customBarcodes[code]={name:name,kcal:kcal,protein:prot||0,carbs:carbs||0,fat:fat||0};
    save();
    stopBarcode();
    setTimeout(function(){closeScanner();$("mealModal").classList.add("on");},500);
  }catch(e){
    $("scanStatus").textContent=(e&&e.message==="network"
      ?"Pas de réponse de la base OpenFoodFacts (réseau lent ou coupé). Réessaie dans un instant avec « Rechercher ce code », ou saisis le produit toi-même : "
      :"Code "+code+" introuvable dans la base OpenFoodFacts. Vérifie les chiffres, ou saisis le produit toi-même : ")+"l'app s'en souviendra pour les prochains scans.";
    $("scanManualEntry").hidden=false;
    $("scanManualEntry").onclick=function(){enterBarcodeManually(code);};
    barcodeBusy=false;
  }
}
/* OpenFoodFacts : API v3 puis v2 (la v3 renvoie parfois une erreur), 8 s max par essai.
   Renvoie {product} si trouvé, {} si le code n'existe pas, null si la base est injoignable. */
async function fetchOffProduct(code){
  var fields="product_name,brands,nutriments";
  var urls=["https://world.openfoodfacts.org/api/v3/product/"+encodeURIComponent(code)+".json?fields="+fields,
            "https://world.openfoodfacts.org/api/v2/product/"+encodeURIComponent(code)+".json?fields="+fields];
  var answered=false;
  for(var i=0;i<urls.length;i++){
    var ctl=window.AbortController?new AbortController():null,tm=ctl?setTimeout(function(){ctl.abort();},8000):null;
    try{
      var res=await fetch(urls[i],{headers:{Accept:"application/json"},signal:ctl?ctl.signal:undefined});
      if(tm)clearTimeout(tm);
      if(res.status===404){answered=true;continue;}
      if(!res.ok)continue;
      var d=await res.json();answered=true;
      if(d&&d.product&&(d.product.product_name||d.product.nutriments))return {product:d.product};
    }catch(e){if(tm)clearTimeout(tm);}
  }
  return answered?{}:null;
}
function enterBarcodeManually(code){
  pendingBarcode=code;
  stopBarcode();
  closeScanner();
  openMeal();
  toast("Renseigne ce produit — il sera reconnu au prochain scan");
}
/* food search — base locale (aliments bruts, instantané, hors ligne) + OpenFoodFacts en ligne
   (inclut de nombreux produits Migros/Coop/Denner ajoutés par des utilisateurs suisses) */
var foodSearchCache=[],foodSearchSeq=0;
function brandsStr(b){if(!b)return"";return Array.isArray(b)?b.join(", "):String(b);}
function normText(s){return String(s||"").toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g,"");}
function searchLocalFoods(q){
  var nq=normText(q).trim();if(!nq)return[];
  var words=nq.split(/\s+/).filter(Boolean);
  var scored=[];
  LOCAL_FOODS.forEach(function(f){
    var name=normText(f.n);
    /* synonymes : « patate » = pomme de terre, « airfrayer » = airfryer… */
    var hay=name+" "+normText(f.a||"")+(name.indexOf("pomme de terre")>=0||name.indexOf("pommes de terre")>=0?" patate patates pdt":"");
    if(!words.every(function(w){return hay.indexOf(w)>=0;}))return;
    var score=0;
    if(name===nq)score=100;
    else if(name.indexOf(nq)===0)score=80;
    else if(name.indexOf(nq)>=0)score=60;
    else if(f.a&&words.every(function(w){return normText(f.a).indexOf(w)>=0;}))score=60+(f.o||0); /* trouvé par synonyme (« patate ») */
    else score=40-words.filter(function(w){return name.indexOf(" "+w)>=0||name.indexOf(w)===0;}).length;
    if(name.indexOf("douce")>=0&&nq.indexOf("douce")<0)score-=30; /* « patate » = pomme de terre, pas patate douce */
    scored.push({f:f,score:score});
  });
  scored.sort(function(a,b){return b.score-a.score||a.f.n.length-b.f.n.length;});
  return scored.map(function(x){var f=x.f;return {name:f.n,kcal:f.kcal,protein:f.p,carbs:f.c,fat:f.f,local:true,portion:f.q||0};});
}
function renderFoodResults(list,q){
  var box=$("foodSearchResults");
  if(normText(q||"")!==foodMoreQ){foodMoreQ=normText(q||"");foodMoreOpen=false;}
  if(!list.length){
    box.innerHTML='<div class="food-search-status">Aucun résultat pour « '+esc(q||"")+' ». Essaie un autre nom, ou saisis les valeurs manuellement.</div>';
    syncFoodSearchMode();return;
  }
  /* 3 meilleurs choix visibles, le reste dans une liste déroulante (« Voir N autres ») */
  function row(f,i){return '<button class="food-result" type="button" data-act="foodPick" data-i="'+i+'"><span class="fr-n">'+esc(f.name)+(f.local?'':'<em>commerce</em>')+'</span>'
      +'<span class="fr-v"><b>'+(f.kcal?Math.round(f.kcal):"—")+'</b> kcal<small>'+(f.protein!=null?fr(Math.round(f.protein*10)/10)+' g prot.':'')+' /100 g</small></span></button>';}
  var top=list.slice(0,3).map(function(f,i){return row(f,i);}).join(""),rest=list.slice(3).map(function(f,k){return row(f,k+3);}).join(""),nRest=list.length-3;
  box.innerHTML='<div class="fr-list">'+top+(nRest>0?'<div class="fr-rest"'+(foodMoreOpen?'':' hidden')+'>'+rest+'</div>':'')+'</div>'
    +'<div class="fr-bar">'+(nRest>0?'<button type="button" class="fr-more" data-act="foodMore">'+(foodMoreOpen?'Moins de choix ▴':'Voir '+nRest+' autre'+(nRest>1?'s':'')+' choix ▾')+'</button>':'<span></span>')
    +'<button type="button" data-act="foodSearchClose">Saisir moi-même</button></div>';
  syncFoodSearchMode();
}
var foodSearchT=null,foodMoreOpen=false,foodMoreQ="";
function syncFoodSearchMode(){
  var box=$("foodSearchResults"),sh=box&&box.closest(".sheet"),on=!!box&&box.innerHTML.trim()!=="";
  if(!sh)return;
  sh.classList.toggle("searching",on);
  var m=sh.closest(".modal");if(m)m.classList.toggle("search-top",on);
  fitSearchSheet();
}
/* en recherche, la fenêtre remonte en haut de l'écran et s'arrête au-dessus du clavier (sinon la liste passe dessous) */
function fitSearchSheet(){
  var m=$("mealModal"),sh=m&&m.querySelector(".sheet");if(!sh)return;
  if(m.classList.contains("search-top")){var vv=window.visualViewport,h=vv?vv.height:window.innerHeight;sh.style.maxHeight=Math.round(h)+"px";if(vv)sh.style.marginTop=Math.round(vv.offsetTop)+"px";}
  else{sh.style.maxHeight="";sh.style.marginTop="";}
}
if(window.visualViewport){window.visualViewport.addEventListener("resize",fitSearchSheet);window.visualViewport.addEventListener("scroll",fitSearchSheet);}
/* mode recherche : tant que des résultats s'affichent, ils prennent toute la fenêtre (les champs réapparaissent au choix d'un aliment) */
(function(){var box=document.getElementById("foodSearchResults");if(!box||!window.MutationObserver)return;
  new MutationObserver(function(){var sh=box.closest(".sheet");if(sh)sh.classList.toggle("searching",box.innerHTML.trim()!=="");}).observe(box,{childList:true});})();
function scheduleFoodSearch(){
  clearTimeout(foodSearchT);
  if($("foodQ").value.trim().length<2){$("foodSearchResults").innerHTML="";syncFoodSearchMode();return;}
  foodSearchT=setTimeout(searchFoodOnline,400);
}
var offResultsCache={};
async function fetchOffResults(q,swissOnly){
  var cacheKey=normText(q)+"|"+(swissOnly?"ch":"all");
  if(offResultsCache[cacheKey])return offResultsCache[cacheKey];
  /* recherche classique d'OpenFoodFacts (le site suisse pour les produits Migros/Coop) : la nouvelle API de recherche
     refuse désormais les appels depuis une app web (CORS), celle-ci les accepte. 8 s max. */
  var url="https://"+(swissOnly?"ch-fr":"world")+".openfoodfacts.org/cgi/search.pl?search_terms="+encodeURIComponent(q)+"&search_simple=1&action=process&json=1&page_size=12&sort_by=unique_scans_n&fields=product_name,brands,nutriments,code";
  var ctl=window.AbortController?new AbortController():null,tm=ctl?setTimeout(function(){ctl.abort();},8000):null;
  var res;try{res=await fetch(url,{headers:{Accept:"application/json"},signal:ctl?ctl.signal:undefined});}finally{if(tm)clearTimeout(tm);}
  if(!res.ok)throw new Error("HTTP "+res.status);
  var data=await res.json();
  var results=(data.hits||data.products||[]).filter(function(p){return p.product_name;}).map(function(p){
    var n=p.nutriments||{},br=brandsStr(p.brands);
    return {name:(br?br+" ":"")+p.product_name,kcal:offVal(n,["energy-kcal_100g","energy-kcal"]),protein:offVal(n,["proteins_100g","proteins"]),carbs:offVal(n,["carbohydrates_100g","carbohydrates"]),fat:offVal(n,["fat_100g","fat"]),local:false};
  }).filter(function(r){return r.kcal>0;}); /* écarte les fiches OFF sans valeur calorique renseignée, peu exploitables */
  offResultsCache[cacheKey]=results;
  return results;
}
async function searchFoodOnline(){
  var q=$("foodQ").value.trim();
  if(q.length<2){$("foodSearchResults").innerHTML="";syncFoodSearchMode();return;}
  var seq=++foodSearchSeq;
  var local=searchLocalFoods(q);
  foodSearchCache=local.slice();
  if(local.length){renderFoodResults(foodSearchCache,q);$("foodSearchResults").insertAdjacentHTML("beforeend",'<div class="food-search-status" id="foodOnlineStatus">Recherche en ligne…</div>');}
  else{$("foodSearchResults").innerHTML='<div class="food-search-status">Recherche en ligne…</div>';syncFoodSearchMode();}
  try{
    var online=await fetchOffResults(q,true);
    if(seq!==foodSearchSeq)return;
    if(!online.length)online=await fetchOffResults(q,false);
    if(seq!==foodSearchSeq)return;
    foodSearchCache=local.concat(online);
    renderFoodResults(foodSearchCache,q);
  }catch(e){
    if(seq!==foodSearchSeq)return;
    if(local.length){var st=$("foodOnlineStatus");if(st)st.textContent="Recherche en ligne indisponible (résultats locaux ci-dessus).";}
    else $("foodSearchResults").innerHTML='<div class="food-search-status">Recherche indisponible. Vérifie ta connexion, ou saisis les valeurs manuellement.</div>';syncFoodSearchMode();
  }
}
function pickFoodResult(i){
  var f=foodSearchCache[i];if(!f)return;
  $("foodQ").value=f.name;
  $("foodQty").value="100";
  $("foodKcal").value=f.kcal?Math.round(f.kcal):"";
  $("foodProt").value=f.protein?Math.round(f.protein*10)/10:"";
  $("foodCarbs").value=f.carbs?Math.round(f.carbs*10)/10:"";
  $("foodFat").value=f.fat?Math.round(f.fat*10)/10:"";
  setFoodRef100(f.kcal,f.protein,f.carbs,f.fat);
  /* produit avec portion habituelle (pot, œuf, sachet…) : quantité préremplie et valeurs recalculées */
  if(f.portion>0){$("foodQty").value=String(f.portion);applyFoodRef100ToQty();}
  $("foodSearchResults").innerHTML="";syncFoodSearchMode();
  /* on passe directement à la quantité */
  setTimeout(function(){try{var q=$("foodQty");q.focus();q.select();}catch(e){}},60);

}
function openScanner(){
  $("mealModal").classList.remove("on");
  $("scanModal").classList.add("on");
  $("scanStatus").textContent="Autorise l’accès à la caméra…";
  $("scanProduct").classList.remove("on");
  $("manualBarcode").value="";
  $("scanManualEntry").hidden=true;
  barcodeBusy=false;
  stopBarcode();
  startCamera();
}
async function startCamera(){
  var v=$("scanVideo");
  if(!navigator.mediaDevices||!navigator.mediaDevices.getUserMedia){
    $("scanStatus").textContent="Caméra indisponible ici. Sur iPhone, ouvre l’app dans Safari (pas depuis l’icône installée) — ou saisis le code manuellement.";
    return;
  }
  var stream;
  try{
    stream=await navigator.mediaDevices.getUserMedia({video:{facingMode:{ideal:"environment"}},audio:false});
  }catch(e){
    var msg="Caméra inaccessible.";
    var nm=e&&e.name;
    if(nm==="NotAllowedError"||nm==="SecurityError")msg="Accès à la caméra refusé. Autorise-le dans les réglages du navigateur puis rouvre le scanner.";
    else if(nm==="NotFoundError"||nm==="OverconstrainedError")msg="Aucune caméra détectée sur cet appareil.";
    else if(nm==="NotReadableError")msg="La caméra est déjà utilisée par une autre application. Ferme-la puis réessaie.";
    $("scanStatus").textContent=msg+" Tu peux saisir le code manuellement ci-dessous.";
    return;
  }
  barcodeStream=stream;
  try{
    v.setAttribute("playsinline","");v.setAttribute("autoplay","");v.muted=true;
    v.srcObject=stream;
    await new Promise(function(res){ if(v.readyState>=2)return res(); v.onloadedmetadata=function(){res();}; setTimeout(res,1200); });
    try{await v.play();}catch(e){}
  }catch(e){}
  $("scanStatus").textContent="Vise le code-barres du produit…";
  if(!window.ZXingBrowser){
    $("scanStatus").textContent="La caméra fonctionne, mais le lecteur automatique est indisponible. Lis le chiffre sous le code-barres et saisis-le ci-dessous.";
    return;
  }
  try{
    barcodeReader=new ZXingBrowser.BrowserMultiFormatReader();
    var pr=barcodeReader.decodeFromVideoElement(v,function(result,err,controls){
      if(controls)barcodeControls=controls;
      if(result&&!barcodeBusy){
        barcodeBusy=true;
        var code=result.getText();
        $("manualBarcode").value=code;
        lookupBarcode(code);
      }
    });
    if(pr&&pr.catch)pr.catch(function(){});
  }catch(e){
    $("scanStatus").textContent="La caméra fonctionne, mais la lecture auto a échoué. Saisis le code manuellement.";
  }
}

/* firebase (optional cloud sync) */
function setupFirebase(){
  if(!window.firebase)return;
  try{firebase.initializeApp(CFG);
    firebase.auth().getRedirectResult().then(function(r){
      if(!cloudUser&&!(r&&r.user)&&lsGet("evoLoginAttempted")){
        $("authStatus").textContent="Retour de connexion sans session (redirect perdu)";
      }
      lsDel("evoLoginAttempted");
    }).catch(function(e){
      $("authStatus").textContent="Erreur connexion : "+(e&&e.code?e.code:(e&&e.message)||"inconnue");
      lsDel("evoLoginAttempted");
    });
    firebase.auth().onAuthStateChanged(function(u){
      var wasSignedIn=!!cloudUser, justSignedIn=!wasSignedIn&&u;
      cloudUser=u;
      if(u){
        lsDel("evoLoginAttempted");
        var providerId=(u.providerData&&u.providerData[0]&&u.providerData[0].providerId)||"";
        var providerLabel=providerId.indexOf("apple")>=0?"Apple":providerId.indexOf("google")>=0?"Google":"cloud";
        $("authStatus").textContent="Connecté · "+(u.email||providerLabel);
        $("loginBtns").style.display="none";$("logoutBtn").style.display="";
      }else{
        if(wasSignedIn)$("authStatus").textContent="Non connecté";
        $("loginBtns").style.display="";$("logoutBtn").style.display="none";
      }
      if(justSignedIn&&!autoRestoreAttempted){
        autoRestoreAttempted=true;
        firebase.firestore().collection("users").doc(u.uid).get().then(function(s){
          var d=s.exists&&s.data().appData;
          if(d&&isLocalStateEmpty()){merge(d);save();renderAll();toast("Données restaurées depuis le cloud");}
          else cloudAutoBackup(true);
        }).catch(function(){});
      }
    });
  }catch(e){}
}
function login(){if(!window.firebase){toast("Cloud indisponible");return;}
  lsSet("evoLoginAttempted","1");
  firebase.auth().signInWithPopup(new firebase.auth.GoogleAuthProvider()).then(function(){
    lsDel("evoLoginAttempted");
  }).catch(function(e){
    $("authStatus").textContent="Erreur connexion : "+(e&&e.code?e.code:(e&&e.message)||"inconnue");
  });}
function loginApple(){if(!window.firebase){toast("Cloud indisponible");return;}
  lsSet("evoLoginAttempted","1");
  var provider=new firebase.auth.OAuthProvider("apple.com");
  provider.addScope("email");provider.addScope("name");
  firebase.auth().signInWithPopup(provider).then(function(){
    lsDel("evoLoginAttempted");
  }).catch(function(e){
    $("authStatus").textContent="Erreur connexion : "+(e&&e.code?e.code:(e&&e.message)||"inconnue");
  });}
function logout(){if(!window.firebase||!cloudUser)return;firebase.auth().signOut();}
function backup(){if(!cloudUser){toast("Connecte-toi d'abord");return;}
  firebase.firestore().collection("users").doc(cloudUser.uid).set({appData:state,updatedAt:Date.now()},{merge:true})
    .then(function(){markBackup();renderProfile();toast("Sauvegarde effectuée");}).catch(function(){toast("Sauvegarde impossible");});}
function restore(){if(!cloudUser){toast("Connecte-toi d'abord");return;}
  firebase.firestore().collection("users").doc(cloudUser.uid).get().then(function(s){
    if(!s.exists){toast("Aucune sauvegarde");return;}var d=s.data().appData;if(!d){toast("Aucune sauvegarde");return;}
    merge(d);save();renderAll();toast("Données restaurées");}).catch(function(){toast("Restauration impossible");});}
function resetAll(){if(!confirm("Effacer toutes les données locales ?"))return;lsDel(KEY);location.reload();}
function setTheme(pref){
  lsSet("evoTheme",pref);
  applyTheme(pref);
  updateThemePicker(pref);
}
function applyTheme(pref){
  var mode=pref==="system"?(matchMedia("(prefers-color-scheme: light)").matches?"light":"dark"):pref;
  if(mode==="light")document.documentElement.setAttribute("data-theme","light");
  else document.documentElement.removeAttribute("data-theme");
  var mc=document.querySelector('meta[name="theme-color"]');
  if(mc)mc.setAttribute("content",mode==="light"?"#eef1f6":"#01030a");
}
function updateThemePicker(pref){
  document.querySelectorAll('#themePicker .cat-tab').forEach(function(b){b.classList.toggle("on",b.dataset.theme===pref);});
}
function initTheme(){
  var pref=lsGet("evoTheme")||"system";
  applyTheme(pref);
  updateThemePicker(pref);
  try{
    matchMedia("(prefers-color-scheme: light)").addEventListener("change",function(){
      if((lsGet("evoTheme")||"system")==="system")applyTheme("system");
    });
  }catch(e){}
}

function updateWaterUI(){
  if(state.page==="today")renderToday();
  if(state.page==="water")renderWater();
}
function addWater(amount){rollWater();var wt=state.water;var goalMl=Math.max(500,Number(state.waterGoal||3)*1000);wt.ml=Math.max(0,Math.min(Math.max(goalMl*2,8000),Number(wt.ml||0)+Number(amount||300)));state.water=wt;save();updateWaterUI();toast(amount>=0?"+"+amount+" ml d’eau":"−"+(-amount)+" ml retirés");}
function adjustBodyWeight(delta){var n=Math.round((latestBody()+delta)*10)/10;if(n<30||n>350)return;var d=today(),h=state.weightHistory,ix=h.findIndex(function(x){return x.d===d;});if(ix>=0)h[ix].w=n;else h.push({d:d,w:n});h.sort(function(a,b){return a.d.localeCompare(b.d);});save();renderMeals();renderToday();toast("Poids : "+num(n)+" kg");}
function saveProfile(){
  var s=Number($("fStart").value),t=Number($("fTarget").value),c=Number($("fCal").value);
  var ca=Number($("fCarbs").value),pr=Number($("fProt").value),fa=Number($("fFat").value),wg=Number($("fWater").value);
  var sd=$("fStartDate").value;if(!/^\d{4}-\d{2}-\d{2}$/.test(sd))sd=state.profile.startDate||START_DATE;
  if(!isFinite(s)||!isFinite(t)||!isFinite(c)||!isFinite(ca)||!isFinite(pr)||!isFinite(fa)||!isFinite(wg)||s<30||t<30||c<500||c>6000||wg<0.5||wg>8){toast("Vérifie les objectifs");return;}
  if(t>=s&&!confirm("Ton objectif ("+fr(t)+" kg) n'est pas inférieur à ton poids de départ ("+fr(s)+" kg) : as-tu inversé les deux champs ? La barre de progression suppose une perte de poids. Continuer quand même ?"))return;
  var hgt=fnum($("fHeight").value,0),age=fnum($("fAge").value,0);
  state.profile=Object.assign(state.profile,{start:s,target:t,cal:c,startDate:sd,height:hgt>=120&&hgt<=230?hgt:state.profile.height,age:age>=14&&age<=99?Math.round(age):state.profile.age,sex:calcSex,activity:Number($("fAct").value)||1.375});
  state.macro={carbs:ca,protein:pr,fat:fa};state.waterGoal=wg;save();renderAll();toast("Objectifs enregistrés");
}

/* events */
document.addEventListener("click",function(e){
  var a=e.target.closest("[data-act]");if(!a)return;
  if(a.tagName==="A")e.preventDefault();
  var act=a.dataset.act, ex=a.dataset.ex;
  switch(act){
    case "go": if(a.dataset.ptab){progTab=a.dataset.ptab;lsSet("evoProgTab",progTab);} showPage(a.dataset.page); break;
    case "weigh": openWeigh(a.dataset.mode); break;
    case "wMinus": stepWeigh(-0.1); break;
    case "wPlus": stepWeigh(0.1); break;
    case "wClose": closeWeigh(); break;
    case "wSave": saveWeigh(); break;
    case "startNext":
      var mpNext=muscuProgram(),nextP=mpNext[state.suggest%mpNext.length];
      state.sessionCategory="muscu";
      state.selDay=state.program.indexOf(nextP);
      save();
      openGuidedSession();
      break;
    case "guidedStart": openGuidedSession(); break;
    case "planList": planListOpen=!planListOpen; renderPlan(); break;
    case "delWeight": delEntry("weightHistory",a.dataset.d,"Pesée supprimée"); break;
    case "delMeasure": delEntry("measures",a.dataset.d,"Mesure supprimée"); break;
    case "delSession": delSession(Number(a.dataset.i)); break;
    case "nutTab": setNutTab(a.dataset.t); break;
    case "nutGo": nutTab=a.dataset.t||"day"; lsSet("evoNutTab",nutTab); showPage("meals"); break;
    case "goRunProg": state.sessionCategory="running"; state.sessionAutoDay=today(); save(); showPage("session"); break;
    case "exportNag": exportData(); break;
    case "nagLater": lsSet("evoNagSnooze",String(Date.now()+3*864e5)); renderBackupNag(); break;
    case "sessToday": var tp=planFor(dowIdx()); if(tp.kind!=="walk"){state.sessionCategory=tp.p.cat||"muscu";state.selDay=state.program.indexOf(tp.p);save();renderSession();} break;
    case "planDay": var pd=Number(a.dataset.i); planSel=(pd===dowIdx())?null:pd; renderPlan(); break;
    case "planGo": planGo(); break;
    case "planSwap": planSwap(); break;
    case "planDone": planMarkDone(); break;
    case "guidedJump": openGuidedSession(ex); break;
    case "guidedClose": closeGuided(); showPage(guidedFrom||state.page||"today"); break;
    case "guidedList": closeGuided(); renderSession(); break;
    case "guidedNext": guidedAdvance(); break;
    case "guidedSkip": guidedSkip(); break;
    case "gJump": cancelWork(); guidedIndex=Number(a.dataset.i)||0; renderGuided(); haptic("light"); break;
    case "guidedPrev": guidedPrev(); break;
    case "guidedFinishNow": guidedFinishNow(); break;
    case "goRunning": showPage("session"); switchSessionCategory("running"); break;
    case "completeClose": closeComplete(); showPage("today"); break;
    case "selDay": state.selDay=Number(a.dataset.i); renderSession(); try{window.scrollTo({top:0,behavior:"smooth"});}catch(e){} haptic("light"); break;
    case "sessCat": switchSessionCategory(a.dataset.cat); break;
    case "runProgToggle": runProgToggle(Number(a.dataset.i)); break;
    case "runProgPrev": runProgWeekShift(-1); break;
    case "runProgNext": runProgWeekShift(1); break;
    case "runProgSkip": runProgWeekShift(2); break;
    case "runProgRepeat": runProgRepeat(); break;
    case "setTick": setTick(ex,Number(a.dataset.i)); break;
    case "w-": setWeight(ex,-weightStep(ex)); break;
    case "w+": setWeight(ex,weightStep(ex)); break;
    case "r-": setReps(ex,-1); break;
    case "r+": setReps(ex,1); break;
    case "excludeEx": excludeEx(ex); break;
    case "restoreEx": restoreEx(); break;
    case "removeExtraEx": removeExtraEx(ex); break;
    case "addExOpen": openExPicker("session"); break;
    case "pickClose": closeExPicker(); break;
    case "pickZone": pickZone=a.dataset.z; renderExPicker(); break;
    case "pickEx": pickExercise(Number(a.dataset.i)); break;
    case "pickCustom": closeExPicker(); if(pickMode==="edit")edAddEx(); else openAddExercise(); break;
    case "addExClose": closeAddExercise(); break;
    case "addExSave": saveAddExercise(); break;
    case "restStop": stopRest(); break;
    case "restAdj": restAdjust(Number(a.dataset.d)); break;
    case "soundToggle": toggleSound(); break;
    case "addSet": addSet(ex); break;
    case "snackAct": if(snackCb)snackCb(); document.getElementById("snack").classList.remove("on"); document.body.classList.remove("has-snack"); clearTimeout(snackT); snackCb=null; break;
    case "export": exportData(); break;
    case "import": document.getElementById("importFile").click(); break;
    case "selEx": state.selEx=ex; progTab="strength"; lsSet("evoProgTab","strength"); renderProgress(); break;
    case "progTab": setProgTab(a.dataset.t); break;
    case "addMeal": openMeal(a.dataset.mealType||""); break;
    case "openFavorites": openFavorites(); break;
    case "favoritesClose": closeFavorites(); break;
    case "favUse": useFavorite(Number(a.dataset.i)); break;
    case "favDelete": deleteFavorite(Number(a.dataset.i)); break;
    case "groceryOpen": openGrocery(); break;
    case "groceryClose": closeGrocery(); break;
    case "groceryToggle": toggleGrocery(a.dataset.list,Number(a.dataset.i)); break;
    case "groceryDel": deleteGrocery(a.dataset.list,Number(a.dataset.i)); break;
    case "groceryAdd": addGrocery(); break;
    case "groceryReset": resetGrocery(); break;
    case "saveFavorite": saveFavorite(); break;
    case "waterAdd": addWater(Number(a.dataset.amount||300)); break;
    case "bodyWeightMinus": adjustBodyWeight(-0.1); break;
    case "bodyWeightPlus": adjustBodyWeight(0.1); break;
    case "fasting": openFasting(); break;
    case "fastClose": $("fastModal").classList.remove("on"); break;
    case "fastStart": toggleFasting(); break;
    case "scanOpen": openScanner(); break;
    case "scanClose": closeScanner(); $("mealModal").classList.add("on"); break;
    case "scanLookup": lookupBarcode(document.getElementById("manualBarcode").value); break;
    case "mClose": closeMeal(); break;
    case "mSave": saveMeal(); break;
    case "foodPick": pickFoodResult(Number(a.dataset.i)); break;
    case "foodMore": foodMoreOpen=!foodMoreOpen; var fr0=document.querySelector("#foodSearchResults .fr-rest");if(fr0)fr0.hidden=!foodMoreOpen; a.textContent=foodMoreOpen?"Moins de choix ▴":"Voir "+(document.querySelectorAll("#foodSearchResults .fr-rest .food-result").length)+" autres choix ▾"; fitSearchSheet(); break;
    case "wPt": showWeightTip(Number(a.dataset.i)); break;
    case "clSend": clSend(); break;
    case "clSugg": $("clInput").value=a.textContent; clSend(); break;
    case "clPhoto": $("clFile").click(); break;
    case "clPhotoDel": clPhoto=null; renderClPhoto(); break;
    case "clRetry": var rh=clHist(),rx=rh[Number(a.dataset.i)];if(rx&&rx.retry){var rt=rx.retry;rh.splice(Number(a.dataset.i),1);if(rh.length&&rh[rh.length-1].r==="me"&&rh[rh.length-1].t===rt)rh.pop();clSaveHist(rh);$("clInput").value=rt;clSend();} break;
    case "clRetryPending": var pp=clPending();lsDel("evoClaudePending");if(pp&&pp.t){var ph=clHist();if(ph.length&&ph[ph.length-1].r==="me"&&ph[ph.length-1].t===pp.t)ph.pop();clSaveHist(ph);$("clInput").value=pp.t;clSend();}else renderClaude(false); break;
    case "clClear": var clOld=clHist(); clSaveHist([]); renderClaude(false); snack("Conversation effacée","Annuler",function(){clSaveHist(clOld);renderClaude(false);},6000); break;
    case "clSaveKey": var kv=$("fClaudeKey").value.trim();
      if(!kv){try{localStorage.removeItem("evoClaudeKey");}catch(e){}toast("Clé supprimée");}
      else if(!/^sk-ant-[\w-]{20,}$/.test(kv)){toast("Clé invalide (elle commence par sk-ant-)");break;}
      else{lsSet("evoClaudeKey",kv);toast("Clé enregistrée");}
      $("fClaudeKey").value="";renderProfile();renderClaude(false); break;
    case "foodSearchClose":clearTimeout(foodSearchT); foodSearchSeq++; $("foodSearchResults").innerHTML="";syncFoodSearchMode(); break;
    case "delMeal": delMealConfirm(Number(a.dataset.i)); break;
    case "openRun": openRun(); break;
    case "liveStart": openLiveRun(); break;
    case "liveClose": discardRun(); break;
    case "runToggle": toggleRun(); break;
    case "runFinish": finishRun(); break;
    case "runDiscard": discardRun(); break;
    case "runClose": closeRun(); break;
    case "runSave": saveRun(); break;
    case "runWhere": setRunMode(a.dataset.v,runKind); break;
    case "runKind": setRunMode(runWhere,a.dataset.v); break;
    case "treadAfter": closeComplete(); showPage("today"); openRun({where:"tread",kind:"walk",dur:15,speed:5,incline:8}); break;
    case "planTread": openRun({where:"tread",kind:"walk",dur:15,speed:5,incline:8}); break;
    case "delRun": delRunConfirm(a.dataset.id); break;
    case "viewRunMap": openRunMap(a.dataset.id); break;
    case "runMapClose": closeRunMap(); break;
    case "openSteps": openSteps(); break;
    case "stepsClose": closeSteps(); break;
    case "stepsSave": saveSteps(); break;
    case "energy": setEnergy(Number(a.dataset.v)); break;
    case "toggleMenuDay": toggleMenuDay(Number(a.dataset.d)); break;
    case "menuAdd": var mm=menuMeal(Number(a.dataset.d),Number(a.dataset.m));
      var mKcal=mm.kcal,mProt=mm.prot;
      /* glucides/lipides non détaillés dans le menu : estimation à partir du reste des
         calories (au-delà des protéines), répartition 65/35 cohérente avec des plats
         riz/pommes de terre — meilleur qu'un 0 franchement faux, mais reste une estimation */
      var mRemain=Math.max(0,mKcal-mProt*4),mCarbs=Math.round(mRemain*0.65/4),mFat=Math.round(mRemain*0.35/9);
      addMealObj({name:mm.desc,kcal:mKcal,protein:mProt,carbs:mCarbs,fat:mFat,qty:100,type:mm.type,menu:true}); toast("Ajouté au journal · "+mKcal+" kcal"); break;
    case "saveProfile": saveProfile(); break;
    case "calcGoals": calcGoals(); break;
    case "calcSex": setCalcSex(a.dataset.v); saveCalcFields(); break;
    case "login": login(); break;
    case "loginApple": loginApple(); break;
    case "logout": logout(); break;
    case "backup": backup(); break;
    case "restore": restore(); break;
    case "reset": resetAll(); break;
    case "editDay": openEditDay(a.dataset.id); break;
    case "edAddEx": openExPicker("edit"); break;
    case "edRemoveEx": edRemoveEx(Number(a.dataset.i)); break;
    case "edClose": edClose(); break;
    case "edSave": edSave(); break;
    case "setTheme": setTheme(a.dataset.theme); break;
  }
});
/* Progrès et Nutrition : glisser horizontalement pour passer d'un onglet à l'autre (hors listes qui défilent déjà de côté) */
function swipeTabs(pageId,tabs,getTab,setTab){
  var pg=$(pageId),x0=0,y0=0,t0=0,ok=false;
  if(!pg)return;
  pg.addEventListener("touchstart",function(e){
    var t=e.touches[0];ok=e.touches.length===1&&!e.target.closest(".pchips,#exPicker,.badge-row,.days,.menu-days,input,select,textarea");
    x0=t.clientX;y0=t.clientY;t0=Date.now();
  },{passive:true});
  pg.addEventListener("touchend",function(e){
    if(!ok)return;ok=false;
    var t=e.changedTouches[0],dx=t.clientX-x0,dy=t.clientY-y0;
    if(Math.abs(dx)<70||Math.abs(dy)>Math.abs(dx)*0.6||Date.now()-t0>700)return;
    var i=tabs.indexOf(getTab())+(dx<0?1:-1);
    if(i>=0&&i<tabs.length)setTab(tabs[i],dx<0?1:-1);
  },{passive:true});
}
swipeTabs("progress",PROG_TABS,function(){return progTab;},setProgTab);
swipeTabs("meals",NUT_TABS,function(){return nutTab;},setNutTab);
/* demande au navigateur de ne jamais effacer les données de l'app pour faire de la place */
try{if(navigator.storage&&navigator.storage.persist)navigator.storage.persisted().then(function(p){if(!p)navigator.storage.persist();}).catch(function(){});}catch(e){}
/* mise à jour automatique : iOS garde l'app en mémoire pendant des heures, les nouvelles versions n'apparaissaient
   qu'après l'avoir fermée à la main. Au retour au premier plan, on compare la version en ligne avec celle chargée
   et on recharge, sauf pendant une séance guidée, une course ou une saisie en cours. */
var APP_V=(function(){var sc=document.querySelector('script[src*="js/app.js"]'),m=sc&&(sc.getAttribute("src")||"").match(/[?&]v=(\d+)/);return m?m[1]:"";})(),lastUpdCheck=0;
function checkAppUpdate(){
  if(!APP_V||navigator.onLine===false||Date.now()-lastUpdCheck<60000)return;
  lastUpdCheck=Date.now();
  fetch("/fitness/index.html?u="+Date.now(),{cache:"no-store"}).then(function(r){return r.ok?r.text():"";}).then(function(html){
    var m=String(html||"").match(/js\/app\.js\?v=(\d+)/);
    if(!m||m[1]===APP_V)return;
    /* jamais pendant une réponse du coach ou un message en cours d'écriture : la réponse serait perdue */
    if(guidedOpen||runActive||clBusy||clPhoto||($("clInput")&&$("clInput").value.trim())||document.querySelector(".modal.on")||document.visibilityState!=="visible")return;
    location.reload();
  }).catch(function(){});
}
window.addEventListener("pageshow",function(e){if(e.persisted)checkAppUpdate();});
document.addEventListener("visibilitychange",function(){if(document.visibilityState==="visible"){checkDayRollover();if((runActive&&!runPaused)||guidedOpen)requestWake();fixLiveMapSize();checkAppUpdate();}else{cloudAutoBackup(true);}});
document.addEventListener("input",function(e){
  var id=e.target.id;
  if(id==="runDist"){runDistTouched=!!e.target.value;updateRunPace();}
  else if(id==="runSpeed"){var sv=fnum(e.target.value,0);$("runPaceIn").value=sv>0?fmtPace(60/sv):"";updateRunPace();}
  else if(id==="runPaceIn"){var pv=parsePace(e.target.value);$("runSpeed").value=pv>0?String(Math.round(60/pv*10)/10).replace(".",","):"";updateRunPace();}
  else if(id==="runDur"||id==="runIncline"||id==="runKcal")updateRunPace();
  else if(id==="foodQty")applyFoodRef100ToQty();
  else if(id==="foodKcal"||id==="foodProt"||id==="foodCarbs"||id==="foodFat")clearFoodRef100();
  else if(id==="foodQ")scheduleFoodSearch();
  else if(id==="pickSearch")renderExPicker();
});
document.addEventListener("change",function(e){var el=e.target;
  if(el.classList&&el.classList.contains("wval")&&el.dataset.ex){setWeightExact(el.dataset.ex,el.value);}
  else if(el.classList&&el.classList.contains("rval")&&el.dataset.ex){setRepsExact(el.dataset.ex,el.value);}
  else if(el.id==="importFile"&&el.files&&el.files[0]){importData(el.files[0]);el.value="";}
  else if(el.id==="fSound"){state.soundOn=el.checked;save();if(el.checked)beepTick();}
  else if(el.id==="fHeight"||el.id==="fAge"||el.id==="fAct"){saveCalcFields();}
});
document.addEventListener("input",function(e){var id=e.target&&e.target.id;if(id==="fHeight"||id==="fAge")saveCalcFields();});
document.querySelectorAll(".nav button").forEach(function(b){
  function navGo(ev){if(ev)ev.preventDefault();if(state.page!==b.dataset.page)haptic("light");showPage(b.dataset.page);}
  b.addEventListener("click",navGo);
  b.addEventListener("touchend",navGo,{passive:false});
});
/* Fermer une feuille passe par son bouton Fermer/Annuler, pour exécuter son nettoyage
   (caméra du scanner, code-barres en attente…) comme un tap sur le bouton. */
function dismissSheet(modal){
  var b=modal.querySelector('[data-act$="Close"]');
  if(b)b.click();else modal.classList.remove("on");
}
document.addEventListener("click",function(e){
  if(e.target.classList&&e.target.classList.contains("modal"))dismissSheet(e.target);
});

/* Glisser une feuille vers le bas pour la fermer (comme les sheets iOS). Le geste ne
   démarre que vers le bas, et pas si la zone touchée a déjà défilé. */
(function(){
  var sheet=null,modal=null,y0=0,x0=0,dy=0,t0=0,dragging=false,decided=false;
  function scrolledUp(el,stop){for(;el&&el!==stop;el=el.parentElement){if(el.scrollTop>0)return true;}return !!stop&&stop.scrollTop>0;}
  document.addEventListener("touchstart",function(e){
    var s=e.target.closest&&e.target.closest(".modal.on .sheet");
    if(!s||e.touches.length!==1||e.target.closest("input,textarea,select,video"))return;
    sheet=s;modal=s.parentElement;y0=e.touches[0].clientY;x0=e.touches[0].clientX;dy=0;t0=Date.now();dragging=false;decided=false;
  },{passive:true});
  document.addEventListener("touchmove",function(e){
    if(!sheet)return;
    var ddy=e.touches[0].clientY-y0,ddx=e.touches[0].clientX-x0;
    if(!decided){
      if(Math.abs(ddy)<6&&Math.abs(ddx)<6)return;
      decided=true;
      dragging=ddy>0&&Math.abs(ddy)>Math.abs(ddx)&&!scrolledUp(e.target,sheet);
      if(!dragging){sheet=null;return;}
      sheet.style.transition="none";
    }
    dy=Math.max(0,ddy);
    sheet.style.transform="translateY("+dy+"px)";
    e.preventDefault();
  },{passive:false});
  function end(){
    if(!sheet)return;
    var s=sheet,m=modal,speed=dy/Math.max(1,Date.now()-t0);sheet=null;
    if(!dragging)return;
    s.style.transition="transform .22s ease";
    if(dy>110||speed>.6){
      s.style.transform="translateY(100%)";
      setTimeout(function(){s.style.transition="";s.style.transform="";dismissSheet(m);},200);
    }else{
      s.style.transform="";
      setTimeout(function(){s.style.transition="";},240);
    }
  }
  document.addEventListener("touchend",end);
  document.addEventListener("touchcancel",end);
})();

/* Glisser depuis le bord gauche pour revenir en arrière sur les écrans plein écran.
   Pas sur la course GPS en direct : y revenir en arrière abandonne la course. */
(function(){
  var BACK={guidedView:"guidedClose",completeView:"completeClose"};
  var view=null,x0=0,y0=0,dx=0,t0=0,dragging=false,decided=false;
  document.addEventListener("touchstart",function(e){
    var v=e.target.closest&&e.target.closest("#guidedView.on,#completeView.on");
    if(!v||e.touches.length!==1||e.touches[0].clientX>28)return;
    view=v;x0=e.touches[0].clientX;y0=e.touches[0].clientY;dx=0;t0=Date.now();dragging=false;decided=false;
  },{passive:true});
  document.addEventListener("touchmove",function(e){
    if(!view)return;
    var ddx=e.touches[0].clientX-x0,ddy=e.touches[0].clientY-y0;
    if(!decided){
      if(Math.abs(ddx)<6&&Math.abs(ddy)<6)return;
      decided=true;dragging=ddx>0&&Math.abs(ddx)>Math.abs(ddy);
      if(!dragging){view=null;return;}
      view.style.transition="none";
    }
    dx=Math.max(0,ddx);
    view.style.transform="translateX("+dx+"px)";
    e.preventDefault();
  },{passive:false});
  function end(){
    if(!view)return;
    var v=view,speed=dx/Math.max(1,Date.now()-t0);view=null;
    if(!dragging)return;
    v.style.transition="transform .22s ease";
    if(dx>window.innerWidth*.35||speed>.6){
      v.style.transform="translateX(100%)";
      setTimeout(function(){v.style.transition="";v.style.transform="";var b=v.querySelector('[data-act="'+BACK[v.id]+'"]');if(b)b.click();},200);
    }else{
      v.style.transform="";
      setTimeout(function(){v.style.transition="";},240);
    }
  }
  document.addEventListener("touchend",end);
  document.addEventListener("touchcancel",end);
})();

/* Barre de titre compacte : quand le grand titre passe sous le haut de l'écran, il réapparaît
   en petit au centre d'une barre floutée, comme dans Réglages. */
var PAGE_TITLES={today:"Accueil",session:"Séance",progress:"Progrès",meals:"Alimentation",water:"Hydratation",profile:"Profil"};
function updateNavbar(){
  var bar=$("iosNavbar");if(!bar)return;
  var page=document.querySelector(".page.on");if(!page)return;
  var mark=page.querySelector(".meals-title h1")||document.querySelector(".topbar");
  var show=!!mark&&mark.getBoundingClientRect().bottom<bar.offsetHeight;
  $("iosNavTitle").textContent=PAGE_TITLES[page.id]||"";
  bar.classList.toggle("on",show);
}
window.addEventListener("scroll",updateNavbar,{passive:true});

/* Retour haptique : moteur Taptic via le plugin Capacitor dans l'app iOS,
   vibration courte ailleurs quand le navigateur le permet (pas sur iPhone Safari). */
function haptic(kind){
  try{
    var C=window.Capacitor;
    var H=C&&C.isNativePlatform&&C.isNativePlatform()&&((C.Plugins&&C.Plugins.Haptics)||(C.registerPlugin&&C.registerPlugin("Haptics")));
    if(H){
      if(kind==="success")H.notification({type:"SUCCESS"});
      else H.impact({style:kind==="medium"?"MEDIUM":"LIGHT"});
      return;
    }
    if(navigator.vibrate)navigator.vibrate(kind==="success"?[20,40,20]:10);
  }catch(e){}
}

var EVO_BOOTED=false;
window.EVO_BOOT_OK=false;

function evoBoot(){
  if(EVO_BOOTED)return;
  EVO_BOOTED=true;
  try{
    load();
    normalizeState();
    initTheme();
    ensureDay();
    renderAll();
    showPage("today");
    recoverLiveRunIfAny();
    setupFirebase();
    setInterval(function(){updateRest();updateWork();updateGuidedClock();},300);
    setInterval(renderFasting,1000);
    setInterval(checkDayRollover,60000);
    window.EVO_BOOT_OK=true;
    document.body.setAttribute("data-evo-boot","ok");
  }catch(e){
    window.EVO_BOOT_OK=false;
    document.body.setAttribute("data-evo-boot","error");
    console.error("EVO boot error",e);
    var t=$("toast");
    if(t){t.textContent="EVO a rencontré une erreur de démarrage.";t.hidden=false;}
  }
}

if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",evoBoot);
else evoBoot();
window.addEventListener("load",evoBoot);
setTimeout(evoBoot,1500);
window.EVO_V3_READY=true;
})();
