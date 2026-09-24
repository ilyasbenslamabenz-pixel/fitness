(function(){
"use strict";
var CFG={apiKey:"AIzaSyDgvRLAmyY86814Vuu_xqXb-TVJqUYeV2I",authDomain:"fitness-f423a.firebaseapp.com",projectId:"fitness-f423a",storageBucket:"fitness-f423a.firebasestorage.app",messagingSenderId:"186607401810",appId:"1:186607401810:web:309ca695d884a6ec96588b"};
var KEY="evoFitV3", OLDKEY="evoFitCoachV2", BACKUPKEY="evoFitV3_backup";
var START_DATE="2026-09-21";

var DEFAULT_PROGRAM=[
 {id:"push",name:"Poussée",short:"Push",icon:'<svg class="ic-s" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M8.5 14.5a2.5 2.5 0 0 0 5 0c0-1.38-.5-2-1-3-1.07-2.14-.22-4.05 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7.5 7.5 0 1 1-15 0c0-1.15.43-2.29 1-3a2.5 2.5 0 0 0 1 2z"/></svg>',focus:"Pecs · épaules · triceps",ex:[
   {n:"Développé couché haltères",t:"4 × 8-10",w:true},
   {n:"Développé incliné machine",t:"3 × 10-12",w:true},
   {n:"Écarté poulie",t:"3 × 12-15",w:true},
   {n:"Élévations latérales",t:"4 × 12-15",w:true},
   {n:"Extension triceps corde",t:"3 × 12-15",w:true}]},
 {id:"pull",name:"Tirage",short:"Pull",icon:'<svg class="ic-s" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5.2"/><circle cx="12" cy="12" r="1.4" fill="currentColor" stroke="none"/></svg>',focus:"Dos · biceps",ex:[
   {n:"Tirage vertical",t:"4 × 8-10",w:true},
   {n:"Rowing machine",t:"4 × 10-12",w:true},
   {n:"Tirage horizontal poulie",t:"3 × 10-12",w:true},
   {n:"Face pull",t:"3 × 15",w:true},
   {n:"Curl biceps haltères",t:"3 × 10-12",w:true}]},
 {id:"legs",name:"Jambes",short:"Legs",icon:'<svg class="ic-s" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M9 2h3l.5 8-2 5 .5 7H8l-1-7 1-5z"/><path d="M15 2h-3l-.3 8 2.3 5-.5 7H16l1-7-1-5z"/></svg>',focus:"Quadriceps · ischios · fessiers",ex:[
   {n:"Presse à cuisses",t:"4 × 10-12",w:true},
   {n:"Leg curl",t:"3 × 12-15",w:true},
   {n:"Leg extension",t:"3 × 12-15",w:true},
   {n:"Hip thrust machine",t:"3 × 10-12",w:true},
   {n:"Mollets debout",t:"4 × 15-20",w:true}]},
 {id:"full",name:"Full body + cardio",short:"Full",icon:'<svg class="ic-s" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><polygon points="13,2 3,14 12,14 11,22 21,10 12,10"/></svg>',focus:"Corps entier · cardio",ex:[
   {n:"Développé militaire machine",t:"3 × 10-12",w:true},
   {n:"Tirage vertical prise large",t:"3 × 10-12",w:true},
   {n:"Chest press",t:"3 × 10-12",w:true},
   {n:"Gainage",t:"3 × 45 s",w:false},
   {n:"Cardio (vélo ou tapis)",t:"20 min",w:false}]}
];

/* séance maison : force au poids du corps + cardio HIIT en alternance, sans matériel */
var HOME_PROGRAM=[
 {id:"home-fb1",cat:"maison",name:"Full body 1",short:"FB1",icon:'<svg class="ic-s" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4 11.5 12 4l8 7.5"/><path d="M6 10v9a1 1 0 0 0 1 1h3v-6h4v6h3a1 1 0 0 0 1-1v-9"/></svg>',focus:"Poids du corps · corps entier",ex:[
   {n:"Pompes",t:"4 × 10-15",w:false},
   {n:"Squats",t:"4 × 15-20",w:false},
   {n:"Fentes avant",t:"3 × 12",w:false},
   {n:"Gainage (planche)",t:"3 × 30-45 s",w:false},
   {n:"Superman (lombaires)",t:"3 × 15",w:false}]},
 {id:"home-hiit1",cat:"maison",name:"HIIT cardio 1",short:"HIIT1",icon:'<svg class="ic-s" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><polygon points="13,2 3,14 12,14 11,22 21,10 12,10"/></svg>',focus:"Cardio · circuit intense",ex:[
   {n:"Jumping jacks",t:"4 × 30 s",w:false},
   {n:"Mountain climbers",t:"4 × 30 s",w:false},
   {n:"Burpees",t:"4 × 10",w:false},
   {n:"Squat jumps",t:"4 × 15",w:false},
   {n:"Corde à sauter (ou sur place)",t:"4 × 45 s",w:false}]},
 {id:"home-fb2",cat:"maison",name:"Full body 2",short:"FB2",icon:'<svg class="ic-s" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4 11.5 12 4l8 7.5"/><path d="M6 10v9a1 1 0 0 0 1 1h3v-6h4v6h3a1 1 0 0 0 1-1v-9"/></svg>',focus:"Poids du corps · corps entier",ex:[
   {n:"Pompes déclinées",t:"4 × 10-15",w:false},
   {n:"Squats sumo",t:"4 × 15",w:false},
   {n:"Fentes arrière",t:"3 × 12",w:false},
   {n:"Gainage latéral",t:"3 × 20-30 s",w:false},
   {n:"Dips sur chaise",t:"3 × 10-15",w:false}]},
 {id:"home-hiit2",cat:"maison",name:"HIIT cardio 2",short:"HIIT2",icon:'<svg class="ic-s" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><polygon points="13,2 3,14 12,14 11,22 21,10 12,10"/></svg>',focus:"Cardio · circuit intense",ex:[
   {n:"High knees",t:"4 × 30 s",w:false},
   {n:"Burpees",t:"4 × 12",w:false},
   {n:"Jumping lunges",t:"4 × 12",w:false},
   {n:"Plank jacks",t:"4 × 30 s",w:false},
   {n:"Sprint sur place",t:"4 × 40 s",w:false}]}
];

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
 ["Lundi",[["Petit-déjeuner","Avoine 50 g + skyr 200 g + banane","≈ 400 kcal · 25 g prot."],["Déjeuner","Riz 70 g + crevettes 180 g (airfryer) + poivrons + curry","≈ 550 kcal · 42 g prot."],["Dîner","Pommes de terre 300 g (airfryer) + 3 œufs + haricots verts","≈ 560 kcal · 28 g prot."],["Collation","Skyr 150 g + pomme","≈ 160 kcal · 16 g prot."]]],
 ["Mardi",[["Petit-déjeuner","2 œufs + pommes de terre 200 g (airfryer) + fruit","≈ 430 kcal · 20 g prot."],["Déjeuner","Riz 70 g + thon 120 g + courgette (airfryer) + tomate","≈ 520 kcal · 38 g prot."],["Dîner","Lentilles 220 g + riz 50 g + 2 œufs + légumes (airfryer)","≈ 620 kcal · 34 g prot."],["Collation","Fromage blanc 200 g + banane","≈ 180 kcal · 18 g prot."]]],
 ["Mercredi",[["Petit-déjeuner","Avoine 50 g + lait + skyr 150 g + pomme","≈ 430 kcal · 28 g prot."],["Déjeuner","Pommes de terre 350 g (airfryer) + thon 120 g + crudités","≈ 500 kcal · 35 g prot."],["Dîner","Riz 70 g + pois chiches 180 g croustillants (airfryer) + sauce tomate","≈ 600 kcal · 20 g prot."],["Collation","Skyr 200 g","≈ 130 kcal · 22 g prot."]]],
 ["Jeudi",[["Petit-déjeuner","3 œufs + banane + skyr 100 g","≈ 430 kcal · 32 g prot."],["Déjeuner","Riz 70 g + crevettes 180 g (airfryer) + courgettes + curry","≈ 540 kcal · 43 g prot."],["Dîner","Pommes de terre 300 g (airfryer) + lentilles 200 g + 2 œufs","≈ 610 kcal · 33 g prot."],["Collation","Fromage blanc 200 g + pomme","≈ 170 kcal · 17 g prot."]]],
 ["Vendredi",[["Petit-déjeuner","Avoine 50 g + skyr 200 g + banane","≈ 400 kcal · 25 g prot."],["Déjeuner","Riz 70 g + thon 120 g + poivrons (airfryer) + tomate","≈ 530 kcal · 38 g prot."],["Dîner","Pommes de terre 300 g (airfryer) + 3 œufs + brocolis","≈ 560 kcal · 30 g prot."],["Collation","Skyr 150 g + fruit","≈ 160 kcal · 16 g prot."]]],
 ["Samedi",[["Petit-déjeuner","2 œufs + avoine 40 g + banane","≈ 410 kcal · 21 g prot."],["Déjeuner","Riz 70 g + crevettes 180 g (airfryer) + lait de coco léger","≈ 590 kcal · 42 g prot."],["Dîner","Pois chiches 200 g croustillants (airfryer) + pommes de terre 250 g (airfryer) + 2 œufs","≈ 650 kcal · 30 g prot."],["Collation","Fromage blanc 200 g + pomme","≈ 170 kcal · 17 g prot."]]],
 ["Dimanche",[["Petit-déjeuner","Avoine 50 g + lait + skyr 150 g + banane","≈ 450 kcal · 28 g prot."],["Déjeuner","Pommes de terre 350 g (airfryer) + thon 120 g + haricots verts","≈ 500 kcal · 37 g prot."],["Dîner","Riz 70 g + lentilles 200 g + 2 œufs + courgettes (airfryer)","≈ 620 kcal · 34 g prot."],["Collation","Skyr 150 g + fruit","≈ 150 kcal · 16 g prot."]]]
];

/* base locale d'aliments bruts courants (kcal/protéines/glucides/lipides pour 100 g) —
   consultable instantanément sans réseau, complète OpenFoodFacts qui couvre mal le non-transformé */
var LOCAL_FOODS=[
 {n:"Poulet (blanc, grillé)",kcal:165,p:31,c:0,f:3.6},
 {n:"Poulet (cuisse, grillée)",kcal:209,p:26,c:0,f:11},
 {n:"Bœuf (steak grillé, maigre)",kcal:217,p:26,c:0,f:12},
 {n:"Bœuf haché 5% MG (cuit)",kcal:137,p:21,c:0,f:5},
 {n:"Bœuf haché 15% MG (cuit)",kcal:230,p:20,c:0,f:16},
 {n:"Porc (filet grillé)",kcal:143,p:26,c:0,f:4},
 {n:"Dinde (blanc, grillé)",kcal:135,p:30,c:0,f:1},
 {n:"Agneau (grillé)",kcal:258,p:25,c:0,f:17},
 {n:"Jambon blanc",kcal:107,p:18,c:1,f:3},
 {n:"Lard / bacon (cuit)",kcal:541,p:37,c:1.4,f:42},
 {n:"Saucisse de veau (cuite)",kcal:220,p:14,c:1,f:18},
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
  macro:{carbs:240,protein:180,fat:80}, waterGoal:3,
  fast:{active:false,start:null,hours:16},
  selEx:null
};
var cloudUser=null, toastT=null, cloudBackupT=null, autoRestoreAttempted=false;
var restEnd=0, restBeeped=false, undoBuf=null, snackCb=null, snackT=null;
var editDayId=null, editDayEx=[];
var guidedIndex=0, guidedOpen=false, guidedDayId=null, guidedStartTimes={};

/* helpers */
function today(){var d=new Date();return d.getFullYear()+"-"+pad(d.getMonth()+1)+"-"+pad(d.getDate());}
function pad(n){return String(n).padStart(2,"0");}
function fmtDate(s){return new Date(s+"T12:00:00").toLocaleDateString("fr-CH",{day:"numeric",month:"short"});}
function num(n){n=Number(n);return (Math.round(n*10)/10).toString();}
function fnum(x,d){x=Number(String(x==null?"":x).replace(",","."));return isFinite(x)?x:(d||0);}
function esc(s){return String(s==null?"":s).replace(/[&<>"']/g,function(c){return {"&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;","'":"&#39;"}[c];});}
function lsGet(k){try{return localStorage.getItem(k);}catch(e){return null;}}
function lsSet(k,v){try{localStorage.setItem(k,v);}catch(e){}}
function lsDel(k){try{localStorage.removeItem(k);}catch(e){}}
function $(id){return document.getElementById(id);}
function toast(m){var el=$("toast");el.textContent=m;el.hidden=false;clearTimeout(toastT);toastT=setTimeout(function(){el.hidden=true;},2000);}

function save(){
  try{
    var payload=JSON.stringify(state);
    lsSet(KEY,payload);
    lsSet(BACKUPKEY,payload);
  }catch(e){}
  cloudAutoBackup();
}
function isLocalStateEmpty(){
  return !state.sessions.length&&!state.meals.length&&!state.runs.length&&state.weightHistory.length<=1;
}
function cloudAutoBackup(immediate){
  if(!cloudUser||!window.firebase)return;
  clearTimeout(cloudBackupT);
  var push=function(){firebase.firestore().collection("users").doc(cloudUser.uid).set({appData:state,updatedAt:Date.now()},{merge:true}).catch(function(){});};
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
  if(typeof p.suggest==="number")state.suggest=p.suggest;
  if(p.session&&typeof p.session==="object")state.session=p.session;
  if(p.lastDay)state.lastDay=p.lastDay;
  if(typeof p.sessionCategory==="string")state.sessionCategory=p.sessionCategory;
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
  if(!state.macro)state.macro={carbs:240,protein:180,fat:80};
  state.macro={carbs:fnum(state.macro.carbs,240),protein:fnum(state.macro.protein,180),fat:fnum(state.macro.fat,80)};
  state.waterGoal=Number(state.waterGoal||3);if(state.waterGoal<0.5||state.waterGoal>8)state.waterGoal=3;
  if(!state.fast)state.fast={active:false,start:null,hours:16};
  state.fast.hours=Number(state.fast.hours||16);
  if(state.lastDay==null)state.lastDay=today();
  if(!Array.isArray(state.program)||!state.program.length)state.program=JSON.parse(JSON.stringify(DEFAULT_PROGRAM));
  if(!state.program.some(function(p){return p.cat==="maison";})){
    state.program=state.program.concat(JSON.parse(JSON.stringify(HOME_PROGRAM)));
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
  if(!state.session.excluded)state.session.excluded={};
  if(!state.session.extra)state.session.extra={};
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
/* marche : distance = pas × longueur de foulée moyenne (~0.762 m), coût ~0.5 kcal/kg/km (environ la moitié de la course) */
function estimateStepsKcal(steps){
  steps=Number(steps)||0;if(steps<=0)return 0;
  var distKm=steps*0.000762;
  return Math.max(0,Math.round(distKm*latestBody()*0.5));
}
function weekNo(){var s=new Date((state.profile.startDate||START_DATE)+"T12:00:00"),diff=Math.floor((Date.now()-s)/864e5);return Math.max(1,Math.floor(diff/7)+1);}

/* charts */
function lineChart(vals,color,unit){
  if(!vals.length)return '<div class="empty">Pas encore de données.<br>Elles apparaîtront dès ta première saisie.</div>';
  if(vals.length===1)return '<div class="single" style="color:'+color+'">'+num(vals[0])+(unit||'')+'</div>';
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
  safeRender(function(){var wn=weekNo();$("weekTag").textContent="Semaine "+wn+(wn<=12?"/12":"");});
}

function renderToday(){
  if(state.page!=="today")return; /* repeinte automatiquement par showPage() à la prochaine visite */
  var w=latestBody(),start=Number(state.profile.start),target=Number(state.profile.target),lost=start-w;

  var mp=muscuProgram(),p=mp[state.suggest%mp.length];
  $("nIc").innerHTML=p.icon;$("nName").textContent=p.name;$("nFocus").textContent=p.focus;
  var hh=new Date().getHours(),greet=hh<12?"Bonjour":(hh<18?"Salut":"Bonsoir");
  $("greetHello").textContent=greet+" 👋";
  $("greetSub").textContent="Prêt pour "+p.name+" aujourd'hui ?";

  $("sLost").textContent=num(Math.max(0,lost));
  $("sSessions").textContent=state.sessions.length;
  $("sPR").textContent=countPRs();

  var rings=todayRings(p);
  $("ringWrap").innerHTML=ringSVG(rings.seance,rings.eau,rings.repas,rings.score);
  $("legSeance").textContent=rings.seance+"%";
  $("legSeanceBar").style.width=Math.max(0,Math.min(100,rings.seance))+"%";
  $("legEau").textContent=rings.eau+"%";
  $("legEauBar").style.width=Math.max(0,Math.min(100,rings.eau))+"%";
  $("legRepas").textContent=rings.repas+"%";
  $("legRepasBar").style.width=Math.max(0,Math.min(100,rings.repas))+"%";
  $("streakN").textContent=computeStreak();

  var lp=latestPR();
  $("lastPR").innerHTML=lp?('<b style="color:var(--text);font-size:15px">'+esc(lp.n)+'</b> — <span style="color:var(--accent-text);font-weight:600">'+num(lp.w)+' kg</span><br><span style="font-size:12.5px">le '+fmtDate(lp.d)+'</span>')
    :'Loggue une séance pour établir tes premiers records.';
  renderEnergy();
}
/* ===== anneaux "score du jour" + streak (refonte ergonomie) ===== */
function todayRings(p){
  p=p||muscuProgram()[state.suggest%muscuProgram().length];
  var mk=marksFor(p.id),active=activeExercises(p),totalSets=0,doneSets=0;
  active.forEach(function(e){var arr=setsArrFor(mk,e);totalSets+=arr.length;doneSets+=arr.filter(function(s){return s.done;}).length;});
  var seance=totalSets?Math.round(doneSets/totalSets*100):0;
  var dk=state.meals.reduce(function(s,m){return s+Number(m.kcal||0);},0);
  var repas=Math.round(Math.min(100,dk/Number(state.profile.cal||2400)*100));
  var wt=state.water||{ml:0},waterGoalMl=Math.max(500,Number(state.waterGoal||3)*1000);
  var eau=Math.round(Math.min(100,Number(wt.ml||0)/waterGoalMl*100));
  var score=Math.round((seance+repas+eau)/3);
  return {seance:seance,eau:eau,repas:repas,score:score};
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
    +arc(seancePct,r1,c1,'var(--primary)','rgba(10,132,255,.16)')
    +arc(eauPct,r2,c2,'var(--accent)','rgba(48,217,143,.16)')
    +arc(repasPct,r3,c3,'#5e7ce6','rgba(94,124,230,.16)')
    +'</svg>'
    +'<div class="ring-center"><div class="score">'+(isFinite(score)?score:0)+'</div><div class="lab">SCORE DU JOUR</div></div>';
}
function computeStreak(){
  var days={};state.sessions.forEach(function(s){var d=String(s.date||"").slice(0,10);if(d)days[d]=true;});
  var t=today(),probe=new Date();
  if(!days[t])probe.setDate(probe.getDate()-1);
  var cur=0;
  while(days[probe.getFullYear()+"-"+pad(probe.getMonth()+1)+"-"+pad(probe.getDate())]){cur++;probe.setDate(probe.getDate()-1);}
  return cur;
}
function computeBestStreak(){
  var daysSet={};state.sessions.forEach(function(s){var d=String(s.date||"").slice(0,10);if(d)daysSet[d]=true;});
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
  var meta=esc(e.t)+(last>0?" · dernier "+num(last)+" kg":"");
  return '<div class="exrow'+(isDone?" done":"")+'" data-act="guidedJump" data-ex="'+esc(e.n)+'">'
    +'<div class="exrow-check">'+(isDone?'✓':(doneN>0?doneN+"/"+cnt:''))+'</div>'
    +'<div class="exrow-info"><h3>'+esc(e.n)+'</h3><div class="t">'+meta+'</div></div>'
    +'<button class="exrow-x" data-act="'+removeAct+'" data-ex="'+esc(e.n)+'" title="'+(e.extra?"Supprimer":"Retirer aujourd’hui")+'">✕</button>'
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
  chips.innerHTML=state.program.map(function(p,i){
    if((p.cat||"muscu")!==state.sessionCategory)return "";
    return '<button class="chip '+(i===state.selDay?"on":"")+'" data-act="selDay" data-i="'+i+'"><span class="e">'+p.icon+'</span>'+esc(p.short)+'</button>';
  }).join("");
  var p=state.program[state.selDay];
  if(!p||(p.cat||"muscu")!==state.sessionCategory){p=dayList[0];state.selDay=state.program.indexOf(p);}
  $("sesIc").innerHTML=p.icon;$("sesName").textContent=p.name;$("sesFocus").textContent=p.focus;
  var mk=marksFor(p.id),active=activeExercises(p),excl=excludedFor(p.id);
  $("exList").innerHTML=active.map(function(e){return exerciseRowHTML(e,mk);}).join("")
    +'<div class="exc-foot">'
    +'<button class="btn ghost" data-act="addExOpen">＋ Ajouter un exercice</button>'
    +(excl.length?'<button class="btn ghost" data-act="restoreEx">↺ Restaurer ('+excl.length+')</button>':'')
    +'</div>';
  $("sesMeta").textContent=active.length+" exercice"+(active.length>1?"s":"")+" · ~"+estimateDurationMin(p)+" min";
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
  return state.runs.filter(function(r){return r.d>=sd;});
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
    return {type:"advance",text:"Tes courses dépassent nettement l'objectif (moy. "+num(avgDur)+" min"+(avgDist?" · "+num(avgDist)+" km":"")+") — tu peux avancer plus vite."};
  }
  if(struggled){
    return {type:"repeat",text:"Tes courses restent en dessous de l'objectif (moy. "+num(avgDur)+" min) — reprends cette semaine tranquillement avant d'avancer."};
  }
  return {type:"normal",text:"Objectif de la semaine atteint, bien joué !"};
}
function renderRunningView(){
  var wk=RUNNING_PROGRAM[state.runProg.week-1];
  $("runProgWeekN").textContent="Semaine "+state.runProg.week+" / "+RUNNING_PROGRAM.length;
  $("runProgGoal").textContent=wk.goal;
  $("runProgSessions").innerHTML=[0,1,2].map(function(i){
    var done=!!state.runProg.done[i];
    return '<div class="run-prog-s '+(done?"done":"")+'" data-act="runProgToggle" data-i="'+i+'"><div class="rs-check">✓</div><span>Séance '+(i+1)+' / 3</span></div>';
  }).join("");
  var sugg=computeRunSuggestion(),suggEl=$("runProgSuggestion");
  if(sugg){
    var btn=sugg.type==="advance"?'<button class="btn mint" data-act="runProgSkip">⏩ Avancer plus vite</button>'
      :sugg.type==="repeat"?'<button class="btn ghost" data-act="runProgRepeat">🔁 Refaire cette semaine</button>':"";
    suggEl.innerHTML='<div class="sub">'+esc(sugg.text)+'</div>'+btn;
    suggEl.style.display="";
  }else{suggEl.style.display="none";}
  var info=$("runProgInfo");
  if(state.runs&&state.runs.length){
    var lastRun=state.runs.slice().sort(function(a,b){return b.d.localeCompare(a.d);})[0];
    var pc=(lastRun.dist>0&&lastRun.dur>0)?" · "+fmtPace(lastRun.dur/lastRun.dist)+" /km":"";
    info.textContent="Dernière course : "+num(lastRun.dist)+" km"+pc+" · "+state.runs.length+" au total";
  }else{info.textContent="Aucune course enregistrée — lance-toi !";}
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
  var cur=(mk[exName]&&mk[exName].w!=null)?mk[exName].w:lastWeight(exName);
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
  arr[i]={done:nowDone,reps:nowDone?repsFor(mk,e):null};
  if(nowDone&&mk[exName].w==null&&e.w){var lw=lastWeight(exName);if(lw>0)mk[exName].w=lw;}
  save();refreshExerciseCard(exName);
  if(nowDone&&!isExDone(mk,e))startRest(90);
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
    var mk=marksFor(p.id),wv=Number(mk[e.n].w||0);if(!(wv>0))return;
    if(!state.perf[e.n])state.perf[e.n]=[];
    var arr=state.perf[e.n],ix=arr.findIndex(function(x){return x.d===d;});
    if(ix>=0)arr[ix].w=wv;else arr.push({d:d,w:wv});
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
  state.page="session";
  document.querySelectorAll(".page").forEach(function(s){s.classList.toggle("on",s.id==="session");});
  document.querySelectorAll(".nav button").forEach(function(b){b.classList.toggle("on",b.dataset.page==="session");});
  $("guidedView").classList.add("on");
  renderSession();
  renderGuided();
}
function closeGuided(){guidedOpen=false;var v=$("guidedView");if(v)v.classList.remove("on");}
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
  $("gExN").textContent=(guidedIndex+1)+" / "+list.length;
  $("gSessName").textContent=p.name;
  $("gExName").textContent=e.n;
  var last=lastWeight(e.n);
  $("gExSub").textContent=e.t+(last>0?" · dernière fois "+num(last)+" kg":"");
  $("gExIcon").innerHTML=p.icon||'<svg class="ic-s" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="5.5" cy="12" r="3"/><circle cx="18.5" cy="12" r="3"/><line x1="8.5" y1="12" x2="15.5" y2="12"/></svg>';

  var st=mk[e.n]||{},wv=(st.w!=null?st.w:last),rt=repTarget(e),rv=repsFor(mk,e),vals="";
  if(e.w)vals+='<div class="val-group"><button data-act="w-" data-ex="'+esc(e.n)+'">−</button><div class="val"><b>'+num(wv)+'</b><span>KG</span></div><button data-act="w+" data-ex="'+esc(e.n)+'">＋</button></div>';
  if(e.w&&rt)vals+='<div class="guided-sep"></div>';
  if(rt)vals+='<div class="val-group"><button data-act="r-" data-ex="'+esc(e.n)+'">−</button><div class="val"><b style="color:var(--accent-text)">'+rv+'</b><span>REPS</span></div><button data-act="r+" data-ex="'+esc(e.n)+'">＋</button></div>';
  if(!vals)vals='<div class="val"><b>'+arr.length+'</b><span>SÉRIES</span></div>';
  $("gVals").innerHTML=vals;

  var firstUndone=arr.findIndex(function(s){return !s.done;});
  $("gSets").innerHTML=arr.map(function(s,i){
    var label=s.done?(rt?s.reps:"✓"):(rt?rt.max:(i+1));
    var cls="gs"+(s.done?" on":"")+(!s.done&&i===firstUndone?" cur":"");
    return '<button class="'+cls+'" data-act="setTick" data-ex="'+esc(e.n)+'" data-i="'+i+'">'+label+'</button>';
  }).join("");

  $("gNextBtn").textContent=isExDone(mk,e)?"Exercice suivant":"Valider la série";
}
function guidedAdvance(){
  var p=state.program[state.selDay],mk=marksFor(p.id),list=currentGuidedList();
  if(!list.length)return;
  var e=list[guidedIndex],arr=setsArrFor(mk,e);
  var i=arr.findIndex(function(s){return !s.done;});
  if(i>=0)setTick(e.n,i);
  if(isExDone(mk,e)){
    var nextIdx=findNextUnfinishedIndex(list,mk,guidedIndex+1);
    if(nextIdx<0){guidedFinishFlow();return;}
    guidedIndex=nextIdx;
  }
  renderGuided();
}
function guidedSkip(){
  var list=currentGuidedList();
  if(!list.length)return;
  if(guidedIndex<list.length-1)guidedIndex++;else toast("Dernier exercice");
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
      if(s.done&&e.w){var wv=Number((mk[e.n]||{}).w||0),reps=Number(s.reps||(repTarget(e)?repTarget(e).max:0));totalVolume+=wv*reps;}
    });
  });
  var durMs=Date.now()-(guidedStartTimes[p.id]||Date.now()),durMin=Math.max(1,Math.round(durMs/60000));
  var kcal=estimateSessionKcal(p.cat,durMin);
  var doneExCount=active.filter(function(e){return isExDone(mk,e);}).length;
  var prevBestStreak=computeBestStreak(),sessionName=p.name,exCount=doneExCount;
  finishSession();
  closeGuided();
  var lp=latestPR(),isNewPR=!!(lp&&lp.d===today());
  var streakNow=computeStreak();
  delete guidedStartTimes[p.id];
  openComplete({
    sessionName:sessionName,exCount:exCount,durMin:durMin,volume:Math.round(totalVolume),kcal:kcal,
    isNewPR:isNewPR,prName:isNewPR?lp.n:null,prWeight:isNewPR?lp.w:null,
    streak:streakNow,bestStreak:Math.max(prevBestStreak,streakNow)
  });
}
function openComplete(data){
  $("cpSub").textContent=data.sessionName+" · "+data.exCount+" exercice"+(data.exCount>1?"s":"")+" complété"+(data.exCount>1?"s":"");
  var pr=$("cpPR");
  if(data.isNewPR){pr.style.display="";$("cpPRText").textContent="Record · "+data.prName+" "+num(data.prWeight)+" kg";}
  else pr.style.display="none";
  $("cpDur").textContent=data.durMin+"min";
  $("cpVolume").textContent=data.volume?data.volume.toLocaleString("fr-CH"):"—";
  $("cpKcal").textContent=data.kcal;
  $("cpStreakN").textContent=data.streak+" jour"+(data.streak>1?"s":"")+" d'affilée 🔥";
  var sub;
  if(data.streak>0&&data.streak>=data.bestStreak)sub="Nouveau record de série personnel !";
  else{var remain=Math.max(0,data.bestStreak-data.streak);sub=remain>0?("Ton meilleur streak est à "+data.bestStreak+" — encore "+remain+" jour"+(remain>1?"s":"")):"Continue comme ça !";}
  $("cpStreakSub").textContent=sub;
  $("completeView").classList.add("on");
}
function closeComplete(){var v=$("completeView");if(v)v.classList.remove("on");}

function startRest(sec){restEnd=Date.now()+sec*1000;restBeeped=false;updateRest();}
function stopRest(){restEnd=0;updateRest();}
function updateRest(){
  /* la détection de fin de repos (vibration/toast) tourne toujours, même sur un autre
     onglet ; seules les écritures DOM (texte/barre) sont sautées quand Séance n'est
     pas affichée — inutile de repeindre un minuteur que personne ne regarde */
  var onSession=state.page==="session";
  var gt=guidedOpen?document.getElementById("gTimer"):null,gtt=guidedOpen?document.getElementById("gTimerT"):null;
  if(!restEnd){
    if(onSession){var lab=document.getElementById("restLabel"),stop=document.getElementById("restStop");if(lab){lab.textContent="Repos";lab.classList.remove("run");if(stop)stop.style.display="none";}}
    if(gt)gt.style.visibility="hidden";
    return;
  }
  var left=restEnd-Date.now();
  if(left<=0){
    restEnd=0;
    if(!restBeeped){restBeeped=true;try{if(navigator.vibrate)navigator.vibrate([120,60,120]);}catch(e){}toast("Repos terminé");}
    if(onSession){
      var lab2=document.getElementById("restLabel"),stop2=document.getElementById("restStop");
      if(lab2){lab2.textContent="Terminé";lab2.classList.remove("run");if(stop2)stop2.style.display="none";}
      setTimeout(function(){if(!restEnd){var l=document.getElementById("restLabel");if(l&&l.textContent==="Terminé")l.textContent="Repos";}},1600);
    }
    if(gt)gt.style.visibility="hidden";
    return;
  }
  if(onSession){
    var lab3=document.getElementById("restLabel"),stop3=document.getElementById("restStop");
    if(lab3){var sc=Math.ceil(left/1000);lab3.textContent=Math.floor(sc/60)+":"+String(sc%60).padStart(2,"0");lab3.classList.add("run");if(stop3)stop3.style.display="";}
  }
  if(gt&&gtt){var sc2=Math.ceil(left/1000);gtt.textContent=Math.floor(sc2/60)+":"+String(sc2%60).padStart(2,"0");gt.style.visibility="visible";}
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
function exportData(){
  try{var blob=new Blob([JSON.stringify(state,null,2)],{type:"application/json"});
    var url=URL.createObjectURL(blob),a=document.createElement("a");a.href=url;a.download="evo-fit-"+today()+".json";
    document.body.appendChild(a);a.click();setTimeout(function(){URL.revokeObjectURL(url);a.remove();},120);toast("Données exportées");
  }catch(e){toast("Export impossible");}
}
function importData(file){
  var r=new FileReader();
  r.onload=function(){try{var d=JSON.parse(r.result);if(!d||typeof d!=="object")throw 0;merge(d);save();renderAll();toast("Données importées");}catch(e){toast("Fichier invalide");}};
  r.onerror=function(){toast("Lecture impossible");};r.readAsText(file);
}

function renderWeekSummary(){
  var days=["L","M","M","J","V","S","D"];
  var now=new Date(),dow=(now.getDay()+6)%7;
  var monday=new Date(now);monday.setDate(now.getDate()-dow);monday.setHours(0,0,0,0);
  var counts=[0,0,0,0,0,0,0];
  state.sessions.forEach(function(s){var d=new Date(s.date),diff=Math.floor((d-monday)/86400000);if(diff>=0&&diff<7)counts[diff]++;});
  var maxC=Math.max(1,Math.max.apply(null,counts));
  $("weekBar").innerHTML=days.map(function(lab,i){
    var h=counts[i]?Math.round(22+counts[i]/maxC*78):0;
    var col=counts[i]?(i===5?"linear-gradient(180deg,#30d98f,#7ee8c4)":"linear-gradient(180deg,#0a84ff,#5e7ce6)"):"transparent";
    return '<div class="wb'+(i===dow?" today":"")+'"><div class="bar"><i style="height:'+h+'%;background:'+col+'"></i></div><span class="lab">'+lab+'</span></div>';
  }).join("");
  var prevMonday=new Date(monday);prevMonday.setDate(monday.getDate()-7);var prevCount=0;
  state.sessions.forEach(function(s){var d=new Date(s.date),diff=Math.floor((d-prevMonday)/86400000);if(diff>=0&&diff<7)prevCount++;});
  var thisCount=counts.reduce(function(a,b){return a+b;},0),delta=thisCount-prevCount;
  $("weekDelta").textContent=delta===0?"":(delta>0?"+":"")+delta+" séance"+(Math.abs(delta)>1?"s":"")+" vs sem. dernière";
  var badges=[],streak=computeStreak();
  if(streak>0)badges.push({ic:'<svg class="ic-s" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M8.5 14.5a2.5 2.5 0 0 0 5 0c0-1.38-.5-2-1-3-1.07-2.14-.22-4.05 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7.5 7.5 0 1 1-15 0c0-1.15.43-2.29 1-3a2.5 2.5 0 0 0 1 2z"/></svg>',lab:streak+" jour"+(streak>1?"s":"")+" d'affilée"});
  var pr=latestPR();if(pr)badges.push({ic:'<svg class="ic-s" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M7 4H4.8A1.8 1.8 0 0 0 3 5.8v.4A3.8 3.8 0 0 0 6.8 10H7"/><path d="M17 4h2.2A1.8 1.8 0 0 1 21 5.8v.4A3.8 3.8 0 0 1 17.2 10H17"/><path d="M7 3h10v6.5a5 5 0 0 1-10 0V3z"/><path d="M9.5 15.5v1.3c0 .5-.35.9-.83 1.1C7.55 18.3 7 19.4 7 21"/><path d="M14.5 15.5v1.3c0 .5.35.9.83 1.1.62.4 1.17 1.5 1.17 3.1"/><line x1="5" y1="21" x2="19" y2="21"/></svg>',lab:"Record : "+esc(pr.n)});
  var wt=state.water||{ml:0},waterGoalMl=Math.max(500,Number(state.waterGoal||3)*1000);
  if(Number(wt.ml||0)>=waterGoalMl)badges.push({ic:'<svg class="ic-s" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2.5s7 8.2 7 13a7 7 0 0 1-14 0c0-4.8 7-13 7-13z"/></svg>',lab:"Objectif eau atteint"});
  if(!badges.length)badges.push({ic:'<svg class="ic-s" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="5.5" cy="12" r="3"/><circle cx="18.5" cy="12" r="3"/><line x1="8.5" y1="12" x2="15.5" y2="12"/></svg>',lab:"Continue comme ça"});
  $("badgeRow").innerHTML=badges.map(function(b){return '<div class="badge"><div class="ic">'+b.ic+'</div><div class="lab">'+b.lab+'</div></div>';}).join("");
}
function renderProgress(){
  if(state.page!=="progress")return; /* évite de repeindre 3 graphiques SVG pour une page qu'on ne regarde pas */
  renderWeekSummary();
  var w=latestBody(),start=Number(state.profile.start),target=Number(state.profile.target);
  $("pwNow").textContent=num(w);
  $("pwLost").textContent=num(Math.max(0,start-w));
  $("pwLeft").textContent=num(Math.max(0,w-target));
  var wh=state.weightHistory.slice(-12);
  $("weightChart").innerHTML=lineChart(wh.map(function(x){return Number(x.w);}),"#30d98f"," kg");
  $("wcFrom").textContent=wh.length?fmtDate(wh[0].d):"";
  $("wcTo").textContent=wh.length?fmtDate(wh[wh.length-1].d):"";

  var lastBC=latestBodyComp(),bcCard=$("bodyCompCard");
  if(bcCard){
    if(lastBC){
      bcCard.style.display="";
      $("bcFat").textContent=lastBC.fat!=null?num(lastBC.fat)+" %":"—";
      $("bcMuscle").textContent=lastBC.muscle!=null?num(lastBC.muscle)+" %":"—";
    }else bcCard.style.display="none";
  }

  // exercise picker: only exercises with logged data, else all weighted exercises
  var withData=Object.keys(state.perf).filter(function(k){return state.perf[k]&&state.perf[k].length;});
  var names=withData.length?withData:allWeighted();
  if(!state.selEx||names.indexOf(state.selEx)<0)state.selEx=bestExercise(names);
  $("exPicker").innerHTML=names.map(function(nm){return '<button class="pchip '+(nm===state.selEx?"on":"")+'" data-act="selEx" data-ex="'+esc(nm)+'">'+esc(nm)+'</button>';}).join("")||'<span style="color:var(--faint);font-size:13px">Aucun exercice avec charge.</span>';

  var arr=(state.selEx&&state.perf[state.selEx])||[];
  var vals=arr.map(function(x){return Number(x.w);});
  $("strengthChart").innerHTML=lineChart(vals,"#0a84ff"," kg");
  $("stNow").textContent=vals.length?num(vals[vals.length-1]):"—";
  $("stPR").textContent=vals.length?num(Math.max.apply(null,vals)):"—";
  var gain=vals.length>1?(vals[vals.length-1]-vals[0]):0;
  $("stGain").textContent=(gain>=0?"+":"")+num(gain);
  $("scFrom").textContent=arr.length?fmtDate(arr[0].d):"";
  $("scTo").textContent=arr.length?fmtDate(arr[arr.length-1].d):"";
  renderCardio();renderSteps();renderEnergy();
}
function allWeighted(){var r=[];state.program.forEach(function(p){p.ex.forEach(function(e){if(e.w&&r.indexOf(e.n)<0)r.push(e.n);});});return r;}
function bestExercise(names){var best=names[0]||null,bn=-1;names.forEach(function(n){var l=(state.perf[n]||[]).length;if(l>bn){bn=l;best=n;}});return best;}
function fmtPace(mpk){if(!isFinite(mpk)||mpk<=0)return "—";var m=Math.floor(mpk),sc=Math.round((mpk-m)*60);if(sc===60){m++;sc=0;}return m+":"+String(sc).padStart(2,"0");}
function valToday(arr){var d=today();for(var i=0;i<arr.length;i++)if(arr[i].d===d)return Number(arr[i].v);return 0;}
function upsertV(arr,d,v){var i=arr.findIndex(function(x){return x.d===d;});if(i>=0)arr[i].v=v;else arr.push({d:d,v:v});arr.sort(function(a,b){return a.d.localeCompare(b.d);});}
function renderCardio(){
  var runs=state.runs.slice().sort(function(a,b){return a.d.localeCompare(b.d);});
  $("cdRuns").textContent=runs.length;
  var km=runs.reduce(function(s,r){return s+Number(r.dist||0);},0);$("cdKm").textContent=num(Math.round(km*10)/10);
  var paces=runs.filter(function(r){return r.dist>0&&r.dur>0;}).map(function(r){return r.dur/r.dist;});
  $("cdPace").textContent=paces.length?fmtPace(Math.min.apply(null,paces))+" /km":"—";
  $("cardioChart").innerHTML=lineChart(runs.map(function(r){return Number(r.dist);}),"#0a84ff"," km");
  var totalKcal=runs.reduce(function(s,r){return s+Number(r.kcal||0);},0);
  $("cdLast").textContent=(runs.length?fmtDate(runs[runs.length-1].d):"")+(totalKcal?" · "+totalKcal.toLocaleString("fr-CH")+" kcal au total":"");
  var recent=state.runs.slice().sort(function(a,b){return b.d.localeCompare(a.d);}).slice(0,8);
  $("runList").innerHTML=recent.length?recent.map(function(r){
    var pace=(r.dist>0&&r.dur>0)?fmtPace(r.dur/r.dist)+" /km":"—";
    var hasRoute=Array.isArray(r.pts)&&r.pts.length>1;
    return '<div class="runrow"><div class="ri"><b>'+num(r.dist)+' km</b><span>'+fmtDate(r.d)+' · '+num(r.dur)+' min'+(r.kcal?' · '+Math.round(r.kcal)+' kcal':'')+'</span></div><div class="rp">'+pace+'</div>'
      +(hasRoute?'<button class="mapbtn" data-act="viewRunMap" data-id="'+esc(r.id||"")+'"><svg class="ic-s" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><polygon points="3,6 9,3 15,6 21,3 21,18 15,21 9,18 3,21"/><line x1="9" y1="3" x2="9" y2="18"/><line x1="15" y1="6" x2="15" y2="21"/></svg></button>':'')
      +'<button class="del" data-act="delRun" data-id="'+esc(r.id||"")+'">×</button></div>';
  }).join(""):'<div class="empty">Aucune course. Ajoute-en une, ou branche Strava en étape 2.</div>';
}
function renderSteps(){
  var a=state.steps.slice().sort(function(x,y){return x.d.localeCompare(y.d);});
  var tv=valToday(state.steps);
  $("stpToday").textContent=tv?tv.toLocaleString("fr-CH"):"—";
  $("stpAvg").textContent=a.length?Math.round(a.reduce(function(s,x){return s+Number(x.v);},0)/a.length).toLocaleString("fr-CH"):"—";
  $("stpDays").textContent=a.length;
  $("stepsChart").innerHTML=lineChart(a.slice(-14).map(function(x){return Number(x.v);}),"#30d98f"," pas");
  var stpK=$("stpKcal");if(stpK)stpK.textContent=tv?estimateStepsKcal(tv).toLocaleString("fr-CH")+" kcal aujourd'hui (marche)":"";
}
function renderEnergy(){
  var a=state.energy.slice().sort(function(x,y){return x.d.localeCompare(y.d);});
  $("energyChart").innerHTML=lineChart(a.slice(-14).map(function(x){return Number(x.v);}),"#0a84ff","");
  $("enLast").textContent=a.length?fmtDate(a[a.length-1].d):"";
  var faces=["😫","😕","😐","🙂","🔥"],cur=valToday(state.energy),el=$("efaces");
  if(el)el.innerHTML=faces.map(function(f,i){return '<button class="'+(cur===i+1?"on":"")+'" data-act="energy" data-v="'+(i+1)+'">'+f+'</button>';}).join("");
}
function setEnergy(v){upsertV(state.energy,today(),v);save();renderEnergy();renderToday();toast("Forme du jour enregistrée");}
function openRun(){$("runDist").value="";$("runDur").value="";$("runDate").value=today();$("runPace").textContent="";$("runModal").classList.add("on");}
function closeRun(){$("runModal").classList.remove("on");}
function updateRunPace(){var di=Number($("runDist").value),du=Number($("runDur").value);$("runPace").textContent=(di>0&&du>0)?("Allure "+fmtPace(du/di)+" /km"):"";}
function saveRun(){
  var di=Number(String($("runDist").value).replace(",",".")),du=Number(String($("runDur").value).replace(",","."));
  var d=$("runDate").value||today();
  if(!(di>0)||!(du>0)){toast("Distance et durée requises");return;}
  state.runs.push({id:"r"+Date.now()+Math.floor(Math.random()*1000),d:d,dist:Math.round(di*100)/100,dur:Math.round(du*10)/10,src:"manual",kcal:estimateRunKcal(di,du)});
  save();closeRun();renderProgress();toast("Course ajoutée");
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
      if(confirm("Une course interrompue a été retrouvée (~"+num(km)+" km, "+fmtClock(ck.elapsedMs||0)+"). L'enregistrer ?")){
        var runObj={id:"r"+Date.now()+Math.floor(Math.random()*1000),d:ck.d||today(),dist:km,dur:min,src:"gps",kcal:estimateRunKcal(km,min)};
        if(ck.pts&&ck.pts.length>1)runObj.pts=ck.pts;
        state.runs.push(runObj);save();toast("Course récupérée · "+num(km)+" km");
      }
    }
  }catch(e){}
  clearLiveRunCheckpoint();
}
var lrMap=null,lrHead=null,lrStart=null,mapReady=false,mapMode="svg",mapCentered=false;
function fmtClock(ms){var s=Math.floor(ms/1000),h=Math.floor(s/3600),m=Math.floor((s%3600)/60),sec=s%60;return (h>0?h+":"+pad(m):String(m))+":"+pad(sec);}
function haversine(a,b){var R=6371000,toR=Math.PI/180;var dLat=(b.lat-a.lat)*toR,dLng=(b.lng-a.lng)*toR,la1=a.lat*toR,la2=b.lat*toR;var x=Math.sin(dLat/2)*Math.sin(dLat/2)+Math.cos(la1)*Math.cos(la2)*Math.sin(dLng/2)*Math.sin(dLng/2);return 2*R*Math.asin(Math.min(1,Math.sqrt(x)));}
function openLiveRun(){
  closeRun();
  runActive=false;runPaused=false;runMeters=0;runElapsedMs=0;runSegStart=0;runLastPt=null;runLastTime=0;runLastGeoTimestamp=0;runPts=[];runTick=null;geoRetryCount=0;runStartDate=today();
  $("lrTime").textContent="0:00";$("lrDist").textContent="0.00";$("lrPace").textContent="—";$("lrSpeed").textContent="—";
  $("lrToggle").textContent="Démarrer";$("lrToggle").style.display="";$("lrFinish").style.display="none";$("lrDiscard").style.display="";$("lrDiscard").textContent="Annuler";
  $("lrGps").textContent="GPS prêt";$("lrTrace").innerHTML="";$("lrMapEmpty").style.display="";
  resetMapLayers();
  mapMode="svg";mapReady=false;
  $("lrMap").style.display="none";$("lrTrace").style.display="";$("lrMapEmpty").style.display="";
  $("liveRunModal").classList.add("on");
  waitForMaplibre(20); /* la librairie (≈800 ko) peut encore être en cours de téléchargement sur mobile */
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
  var runObj={id:"r"+Date.now()+Math.floor(Math.random()*1000),d:runStartDate,dist:km,dur:min,src:"gps",kcal:estimateRunKcal(km,min)};
  if(runPts.length>1)runObj.pts=runPts.slice();
  state.runs.push(runObj);
  clearLiveRunCheckpoint();
  save();closeLiveRun();showPage("progress");renderProgress();toast("Course enregistrée · "+num(km)+" km");
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
  var km=runMeters/1000;$("lrDist").textContent=km.toFixed(2);
  var min=ms/60000;
  $("lrPace").textContent=(km>=0.10&&min>=0.5)?fmtPace(min/km):"—";
  var speedKmh=(ms>20000&&km>=0.05)?(km/(ms/3600000)):0;
  $("lrSpeed").textContent=speedKmh?num(Math.min(speedKmh,25)):"—";
  $("lrKcal").textContent=km>=0.05?num(estimateRunKcal(km,0)):"0";
}
function mapStyleUrl(){
  var isLight=document.documentElement.getAttribute("data-theme")==="light";
  return "https://tiles.openfreemap.org/styles/"+(isLight?"liberty":"dark");
}
function mlCircleEl(fill){
  var el=document.createElement("div");
  el.style.cssText="width:14px;height:14px;border-radius:50%;background:"+fill+";border:2px solid #04101f;box-shadow:0 1px 4px rgba(0,0,0,.35)";
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
        lrMap.addLayer({id:"lr-route-line",type:"line",source:"lr-route",layout:{"line-cap":"round","line-join":"round"},paint:{"line-color":"#0a84ff","line-width":5,"line-opacity":.95}});
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
  if(!lrStart){try{lrStart=new maplibregl.Marker({element:mlCircleEl("#30d98f"),anchor:"center"}).setLngLat([runPts[0].lng,runPts[0].lat]).addTo(lrMap);}catch(e){}}
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
  svg.innerHTML='<path d="'+dd+'" fill="none" stroke="#0a84ff" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/>'
    +'<circle cx="'+X(f.lng)+'" cy="'+Y(f.lat)+'" r="3" fill="#30d98f"/>'
    +'<circle cx="'+X(l.lng)+'" cy="'+Y(l.lat)+'" r="3.4" fill="#0a84ff"/>';
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
    rmStart=new maplibregl.Marker({element:mlCircleEl("#30d98f"),anchor:"center"}).setLngLat(coords[0]).addTo(rmMap);
    rmEnd=new maplibregl.Marker({element:mlCircleEl("#0a84ff"),anchor:"center"}).setLngLat(coords[coords.length-1]).addTo(rmMap);
  }catch(e){}
}
function initRunMapWithMaplibre(r){
  if(!rmMap){
    try{
      rmMap=new maplibregl.Map({container:"runMapEl",style:mapStyleUrl(),center:[6.1432,46.2044],zoom:13,attributionControl:true,dragRotate:false,pitchWithRotate:false,touchPitch:false});
      rmMap.on("load",function(){
        try{
          rmMap.addSource("rm-route",{type:"geojson",data:{type:"Feature",geometry:{type:"LineString",coordinates:[]}}});
          rmMap.addLayer({id:"rm-route-line",type:"line",source:"rm-route",layout:{"line-cap":"round","line-join":"round"},paint:{"line-color":"#0a84ff","line-width":5,"line-opacity":.95}});
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
  setTimeout(function(){waitForMaplibreRunMap(r,20);},60);
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

var weeklyMenuDay=-1;
var menuOpenDay=null; /* accordéon : un seul jour développé à la fois (aujourd'hui par défaut) */
function buildWeeklyMenuHTML(){
  var idx=(new Date().getDay()+6)%7;
  if(menuOpenDay==null)menuOpenDay=idx;
  $("weeklyMenu").innerHTML=MENU.map(function(d,i){
    var dk=d[1].reduce(function(s,m){var x=m[2].match(/(\d+)\s*kcal/);return s+(x?Number(x[1]):0);},0);
    var isOpen=i===menuOpenDay;
    return '<div class="menuday '+(i===idx?"today":"")+(isOpen?" open":"")+'">'
      +'<button class="mh" data-act="toggleMenuDay" data-d="'+i+'"><b>'+d[0]+(i===idx?" · aujourd'hui":"")+'</b><span style="color:var(--muted)">'+dk+' kcal <span class="chev">'+(isOpen?"▾":"▸")+'</span></span></button>'
      +(isOpen?d[1].map(function(m,j){return '<div class="mm"><div class="mt"><span>'+esc(m[0])+'</span><span style="color:var(--muted)">'+esc(m[2])+'</span></div><div class="md">'+esc(m[1])+'</div><button class="add" data-act="menuAdd" data-d="'+i+'" data-m="'+j+'">＋ Ajouter au journal</button></div>';}).join(""):"")
      +'</div>';
  }).join("");
}
function toggleMenuDay(i){menuOpenDay=(menuOpenDay===i)?-1:i;buildWeeklyMenuHTML();}
function renderWeeklyMenuIfNeeded(){
  var idx=(new Date().getDay()+6)%7;
  if(idx===weeklyMenuDay)return; /* le menu ne change qu'une fois par jour : inutile de reconstruire ses lignes à chaque repas/eau ajoutés */
  weeklyMenuDay=idx;
  buildWeeklyMenuHTML();
}
function renderMeals(){
  if(state.page!=="meals")return; /* repeinte automatiquement par showPage() à la prochaine visite */
  var kcal=state.meals.reduce(function(s,m){return s+Number(m.kcal||0);},0),prot=state.meals.reduce(function(s,m){return s+Number(m.protein||0);},0),carbs=state.meals.reduce(function(s,m){return s+Number(m.carbs||0);},0),fat=state.meals.reduce(function(s,m){return s+Number(m.fat||0);},0);
  var goal=Number(state.profile.cal||2400),carbGoal=fnum(state.macro.carbs,240),protGoal=fnum(state.macro.protein,180),fatGoal=fnum(state.macro.fat,80);
  ring($("calRing"),Math.min(1,kcal/goal),"#0a84ff",Math.round(kcal)+"\n/ "+goal+" kcal");
  $("mCarbs").textContent=Math.round(carbs*10)/10;$("mProt").textContent=Math.round(prot*10)/10;$("mFat").textContent=Math.round(fat*10)/10;
  $("mCarbsBar").style.width=Math.min(100,carbs/carbGoal*100)+"%";$("mProtBar").style.width=Math.min(100,prot/protGoal*100)+"%";$("mFatBar").style.width=Math.min(100,fat/fatGoal*100)+"%";
  var limits={"Petit-déjeuner":Math.round(goal*0.25/10)*10,"Déjeuner":Math.round(goal*0.35/10)*10,"Dîner":Math.round(goal*0.30/10)*10,"Collation":Math.round(goal*0.10/10)*10},ids={"Petit-déjeuner":"breakfastKcal","Déjeuner":"lunchKcal","Dîner":"dinnerKcal","Collation":"snackKcal"};
  var itemIds={"Petit-déjeuner":"itemsBreakfast","Déjeuner":"itemsLunch","Dîner":"itemsDinner","Collation":"itemsSnack"};
  var byType={};Object.keys(itemIds).forEach(function(t){byType[t]=[];});
  state.meals.forEach(function(m,i){var t=byType[m.type]?m.type:"Collation";byType[t].push({m:m,i:i});});
  Object.keys(ids).forEach(function(type){var total=byType[type].reduce(function(s,x){return s+Number(x.m.kcal||0);},0);$(ids[type]).textContent=Math.round(total)+" / "+limits[type]+" kcal";
    $(itemIds[type]).innerHTML=byType[type].map(function(x){var m=x.m;return '<div class="meal"><div class="mi"><b>'+esc(m.name)+'</b><div class="d">'+num(m.qty||100)+' g · '+num(m.protein||0)+' g prot.</div></div><div class="kc">'+Math.round(Number(m.kcal||0))+' kcal</div><button class="del" data-act="delMeal" data-i="'+x.i+'">×</button></div>';}).join("");
  });
  renderWeeklyMenuIfNeeded();
}
function renderWater(){
  if(state.page!=="water")return;
  var wt=state.water||{date:today(),ml:0};if(wt.date!==today()){wt={date:today(),ml:0};state.water=wt;save();}
  var waterGoal=Number(state.waterGoal||3),waterStep=Math.max(100,Math.round(waterGoal*1000/10/50)*50);
  $("waterTotal").textContent=(Number(wt.ml||0)/1000).toFixed(2)+" L";
  $("waterGoalLabel").textContent=waterGoal.toFixed(2)+" L";
  var glasses=Math.min(10,Math.round(Number(wt.ml||0)/waterStep));$("waterGlasses").innerHTML=Array.from({length:10},function(_,i){return '<div class="glass"><button data-act="waterAdd" data-amount="'+(i<glasses?(-waterStep):waterStep)+'">'+(i<glasses?"✓":"＋")+'</button></div>';}).join("");
}
function ring(svg,frac,color,center){
  var p=Math.max(0,Math.min(1,Number(frac)||0)),parts=String(center).split("\n");
  svg.setAttribute("viewBox","0 0 100 62");
  svg.innerHTML='<path d="M 8 50 A 42 42 0 0 1 92 50" fill="none" stroke="var(--ring-track)" stroke-width="9" stroke-linecap="round"/><path d="M 8 50 A 42 42 0 0 1 92 50" fill="none" stroke="'+color+'" stroke-width="9" stroke-linecap="round" pathLength="100" stroke-dasharray="100" stroke-dashoffset="'+(100-p*100)+'"/><text x="50" y="35" text-anchor="middle" fill="var(--text)" font-family="Space Grotesk" font-weight="700" font-size="18">'+parts[0]+'</text>'+(parts[1]?'<text x="50" y="48" text-anchor="middle" fill="var(--muted)" font-size="8.5">'+parts[1]+'</text>':'');
}
function addMealObj(o){o.date=today();o.qty=Number(o.qty||100);state.meals.push(o);save();renderMeals();renderToday();}
function currentFoodFromForm(){return {name:$("foodName").value.trim(),kcal:fnum($("foodKcal").value,0),protein:fnum($("foodProt").value,0),carbs:fnum($("foodCarbs").value,0),fat:fnum($("foodFat").value,0),qty:fnum($("foodQty").value,100),type:$("foodType").value};}
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
    return '<div class="favorite-item"><div class="fi"><b>'+esc(f.name)+'</b><span>'+num(f.qty||100)+' g · '+num(f.kcal||0)+' kcal · '+num(f.protein||0)+' g prot.</span></div><button data-act="favUse" data-i="'+real+'">Ajouter</button><button data-act="favDelete" data-i="'+real+'">×</button></div>';
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
  var hours=Number(state.fast.hours||16);title.textContent="Routine "+hours+":8";
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

function renderProfile(){
  $("fStartDate").value=state.profile.startDate||START_DATE;
  $("fStart").value=state.profile.start;$("fTarget").value=state.profile.target;$("fCal").value=state.profile.cal;
  $("fCarbs").value=state.macro.carbs;$("fProt").value=state.macro.protein;$("fFat").value=state.macro.fat;$("fWater").value=state.waterGoal;
  $("progList").innerHTML=state.program.map(function(p){return '<div class="progline"><span class="e">'+p.icon+'</span><div class="n"><b>'+esc(p.name)+'</b><span>'+esc(p.focus)+' · '+p.ex.length+' exercices</span></div><button class="link" data-act="editDay" data-id="'+esc(p.id)+'">Modifier</button></div>';}).join("");
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
      +'<input type="text" data-i="'+i+'" data-f="t" value="'+esc(e.t)+'" placeholder="ex : 4 × 8-10">'
      +'</div>'
      +'<label class="ed-w"><input type="checkbox" data-i="'+i+'" data-f="w" '+(e.w?"checked":"")+'>Charge</label>'
      +'<button type="button" class="ed-rm" data-act="edRemoveEx" data-i="'+i+'">✕</button>'
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
  else if(id==="session")renderSession();
  else if(id==="progress")renderProgress();
  else if(id==="meals")renderMeals();
  else if(id==="water")renderWater();
  else if(id==="profile")renderProfile();
  try{window.scrollTo({top:0,behavior:"smooth"});}catch(e){window.scrollTo(0,0);}
}

/* modals */
function latestBodyComp(){return state.bodyComp.length?state.bodyComp[state.bodyComp.length-1]:null;}
function openWeigh(){
  $("wInput").value=num(latestBody());
  var d=today(),today2=state.bodyComp.find(function(x){return x.d===d;})||latestBodyComp();
  $("wFat").value=today2&&today2.fat!=null?num(today2.fat):"";
  $("wMuscle").value=today2&&today2.muscle!=null?num(today2.muscle):"";
  $("weighModal").classList.add("on");
}
function closeWeigh(){$("weighModal").classList.remove("on");}
function stepWeigh(d){var v=Number($("wInput").value||latestBody());$("wInput").value=(Math.round((v+d)*10)/10);}
function saveWeigh(){
  var n=Number(String($("wInput").value).replace(",","."));
  if(!isFinite(n)||n<30||n>350){toast("Poids invalide");return;}
  var fatRaw=$("wFat").value.trim(),muscleRaw=$("wMuscle").value.trim();
  var fat=fatRaw?Number(String(fatRaw).replace(",",".")):null;
  var muscle=muscleRaw?Number(String(muscleRaw).replace(",",".")):null;
  if(fat!=null&&(!isFinite(fat)||fat<3||fat>60)){toast("Masse grasse invalide (3–60 %)");return;}
  if(muscle!=null&&(!isFinite(muscle)||muscle<10||muscle>70)){toast("Masse musculaire invalide (10–70 %)");return;}
  var d=today(),h=state.weightHistory,ix=h.findIndex(function(x){return x.d===d;});
  if(ix>=0)h[ix].w=n;else h.push({d:d,w:n});
  h.sort(function(a,b){return a.d.localeCompare(b.d);});
  if(fat!=null||muscle!=null){
    var bc=state.bodyComp,bix=bc.findIndex(function(x){return x.d===d;});
    var entry={d:d,fat:fat,muscle:muscle};
    if(bix>=0)bc[bix]=entry;else bc.push(entry);
    bc.sort(function(a,b){return a.d.localeCompare(b.d);});
  }
  save();closeWeigh();renderToday();renderProgress();toast("Pesée enregistrée · "+num(n)+" kg");
}
function defaultMealTypeByHour(){
  var h=new Date().getHours();
  if(h<11)return "Petit-déjeuner";
  if(h<15)return "Déjeuner";
  if(h<21)return "Dîner";
  return "Collation";
}
function openMeal(type){$("foodName").value="";$("foodQty").value="100";$("foodKcal").value="";$("foodProt").value="";$("foodCarbs").value="";$("foodFat").value="";$("foodType").value=type||defaultMealTypeByHour();clearFoodRef100();$("foodSearchResults").innerHTML="";$("mealModal").classList.add("on");setTimeout(function(){$("foodName").focus();},50);}
function closeMeal(){$("mealModal").classList.remove("on");}
function saveMeal(){
  var f=currentFoodFromForm();if(!f.name){toast("Indique l'aliment");return;}
  addMealObj(f);closeMeal();toast("Repas ajouté");
}


/* barcode scanner */
var barcodeReader=null,barcodeControls=null,barcodeBusy=false,barcodeStream=null;
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
function offVal(n,keys){
  for(var i=0;i<keys.length;i++){var v=Number(n[keys[i]]);if(isFinite(v))return v;}
  return 0;
}
async function lookupBarcode(code){
  code=String(code||"").replace(/\D/g,"");
  if(code.length<8){$("scanStatus").textContent="Code-barres invalide.";barcodeBusy=false;return;}
  $("scanStatus").textContent="Recherche du produit…";$("scanProduct").classList.remove("on");
  try{
    var url="https://world.openfoodfacts.org/api/v3/product/"+encodeURIComponent(code)+".json?fields=product_name,brands,nutriments,nutrition_data_per,nutriscore_grade";
    var res=await fetch(url,{headers:{Accept:"application/json"}});
    if(!res.ok)throw new Error("HTTP "+res.status);
    var data=await res.json();
    if(!data.product)throw new Error("not_found");
    var p=data.product,n=p.nutriments||{};
    var kcal=offVal(n,["energy-kcal_100g","energy-kcal"]);
    var prot=offVal(n,["proteins_100g","proteins"]);
    var carbs=offVal(n,["carbohydrates_100g","carbohydrates"]);
    var fat=offVal(n,["fat_100g","fat"]);
    var name=(p.brands?p.brands+" ":"")+(p.product_name||"Produit");
    $("scanProduct").innerHTML="<b>"+esc(name)+"</b><div style=\"font-size:12px;color:var(--muted);margin-top:4px\">"+(kcal?Math.round(kcal):"—")+" kcal · "+(prot?Math.round(prot*10)/10:"—")+" g protéines / 100 g</div>";
    $("scanProduct").classList.add("on");
    $("foodName").value=name;
    $("foodKcal").value=kcal?Math.round(kcal):"";
    $("foodProt").value=prot?Math.round(prot*10)/10:"";
    $("foodCarbs").value=carbs?Math.round(carbs*10)/10:"";
    $("foodQty").value="100";
    $("foodFat").value=fat?Math.round(fat*10)/10:"";
    setFoodRef100(kcal,prot,carbs,fat);
    stopBarcode();
    setTimeout(function(){closeScanner();$("mealModal").classList.add("on");},500);
  }catch(e){
    $("scanStatus").textContent="Produit introuvable. Vérifie le code ou saisis l’aliment manuellement.";
    barcodeBusy=false;
  }
}
/* food search — base locale (aliments bruts, instantané, hors ligne) + OpenFoodFacts en ligne
   (inclut de nombreux produits Migros/Coop/Denner ajoutés par des utilisateurs suisses) */
var foodSearchCache=[],foodSearchBusy=false;
function brandsStr(b){if(!b)return"";return Array.isArray(b)?b.join(", "):String(b);}
function normText(s){return String(s||"").toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g,"");}
function searchLocalFoods(q){
  var nq=normText(q).trim();if(!nq)return[];
  var words=nq.split(/\s+/).filter(Boolean);
  var scored=[];
  LOCAL_FOODS.forEach(function(f){
    var name=normText(f.n);
    if(!words.every(function(w){return name.indexOf(w)>=0;}))return;
    var score=0;
    if(name===nq)score=100;
    else if(name.indexOf(nq)===0)score=80;
    else if(name.indexOf(nq)>=0)score=60;
    else score=40-words.filter(function(w){return name.indexOf(" "+w)>=0||name.indexOf(w)===0;}).length;
    scored.push({f:f,score:score});
  });
  scored.sort(function(a,b){return b.score-a.score||a.f.n.length-b.f.n.length;});
  return scored.map(function(x){var f=x.f;return {name:f.n,kcal:f.kcal,protein:f.p,carbs:f.c,fat:f.f,local:true};});
}
function renderFoodResults(list,q){
  var box=$("foodSearchResults");
  if(!list.length){
    box.innerHTML='<div class="food-search-status">Aucun résultat pour « '+esc(q||"")+' ». Essaie un autre nom, ou saisis les valeurs manuellement.</div>';
    return;
  }
  box.innerHTML=list.map(function(f,i){
    return '<button class="food-result" type="button" data-act="foodPick" data-i="'+i+'"><b>'+(f.local?'<svg class="ic-s" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4 11.5 12 4l8 7.5"/><path d="M6 10v9a1 1 0 0 0 1 1h3v-6h4v6h3a1 1 0 0 0 1-1v-9"/></svg>'+" ":"")+esc(f.name)+'</b><span>'+(f.kcal?Math.round(f.kcal)+" kcal / 100 g":"kcal inconnues")+'</span></button>';
  }).join("");
}
var foodSearchT=null;
function scheduleFoodSearch(){
  clearTimeout(foodSearchT);
  if($("foodName").value.trim().length<2){$("foodSearchResults").innerHTML="";return;}
  foodSearchT=setTimeout(searchFoodOnline,400);
}
var offResultsCache={};
async function fetchOffResults(q,swissOnly){
  var cacheKey=normText(q)+"|"+(swissOnly?"ch":"all");
  if(offResultsCache[cacheKey])return offResultsCache[cacheKey];
  var qs=swissOnly?(q+' countries_tags:"en:switzerland"'):q;
  var url="https://search.openfoodfacts.org/search?q="+encodeURIComponent(qs)+"&page_size=8&fields=product_name,brands,nutriments,code";
  var res=await fetch(url,{headers:{Accept:"application/json"}});
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
  var q=$("foodName").value.trim();
  if(q.length<2){$("foodSearchResults").innerHTML="";return;}
  if(foodSearchBusy)return;
  foodSearchBusy=true;
  var local=searchLocalFoods(q);
  foodSearchCache=local.slice();
  if(local.length){renderFoodResults(foodSearchCache,q);$("foodSearchResults").insertAdjacentHTML("beforeend",'<div class="food-search-status" id="foodOnlineStatus">Recherche en ligne…</div>');}
  else{$("foodSearchResults").innerHTML='<div class="food-search-status">Recherche en ligne…</div>';}
  try{
    var online=await fetchOffResults(q,true);
    if(!online.length)online=await fetchOffResults(q,false);
    foodSearchCache=local.concat(online);
    renderFoodResults(foodSearchCache,q);
  }catch(e){
    if(local.length){var st=$("foodOnlineStatus");if(st)st.textContent="Recherche en ligne indisponible (résultats locaux ci-dessus).";}
    else $("foodSearchResults").innerHTML='<div class="food-search-status">Recherche indisponible. Vérifie ta connexion, ou saisis les valeurs manuellement.</div>';
  }
  foodSearchBusy=false;
}
function pickFoodResult(i){
  var f=foodSearchCache[i];if(!f)return;
  $("foodName").value=f.name;
  $("foodQty").value="100";
  $("foodKcal").value=f.kcal?Math.round(f.kcal):"";
  $("foodProt").value=f.protein?Math.round(f.protein*10)/10:"";
  $("foodCarbs").value=f.carbs?Math.round(f.carbs*10)/10:"";
  $("foodFat").value=f.fat?Math.round(f.fat*10)/10:"";
  setFoodRef100(f.kcal,f.protein,f.carbs,f.fat);
  $("foodSearchResults").innerHTML="";
  toast("Aliment sélectionné · valeurs pour 100 g");
}
function openScanner(){
  $("mealModal").classList.remove("on");
  $("scanModal").classList.add("on");
  $("scanStatus").textContent="Autorise l’accès à la caméra…";
  $("scanProduct").classList.remove("on");
  $("manualBarcode").value="";
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
    .then(function(){toast("Sauvegarde effectuée");}).catch(function(){toast("Sauvegarde impossible");});}
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
  if(mc)mc.setAttribute("content",mode==="light"?"#eef1f6":"#04101f");
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
  var wt=state.water||{date:today(),ml:0},waterMl=Number(wt.ml||0);
  if(state.page==="today"){
    renderToday();
  }
  if(state.page==="water"){
    var waterGoal=Number(state.waterGoal||3),waterStep=Math.max(100,Math.round(waterGoal*1000/10/50)*50);
    $("waterTotal").textContent=(waterMl/1000).toFixed(2)+" L";
    $("waterGoalLabel").textContent=waterGoal.toFixed(2)+" L";
    var glasses=Math.min(10,Math.round(waterMl/waterStep));
    $("waterGlasses").innerHTML=Array.from({length:10},function(_,i){return '<div class="glass"><button data-act="waterAdd" data-amount="'+(i<glasses?(-waterStep):waterStep)+'">'+(i<glasses?"✓":"＋")+'</button></div>';}).join("");
  }
}
function addWater(amount){var wt=state.water||{date:today(),ml:0};if(wt.date!==today())wt={date:today(),ml:0};var goalMl=Math.max(500,Number(state.waterGoal||3)*1000);wt.ml=Math.max(0,Math.min(goalMl,Number(wt.ml||0)+Number(amount||300)));state.water=wt;save();updateWaterUI();toast((amount>=0?"+":"")+amount+" ml d’eau");}
function adjustBodyWeight(delta){var n=Math.round((latestBody()+delta)*10)/10;if(n<30||n>350)return;var d=today(),h=state.weightHistory,ix=h.findIndex(function(x){return x.d===d;});if(ix>=0)h[ix].w=n;else h.push({d:d,w:n});h.sort(function(a,b){return a.d.localeCompare(b.d);});save();renderMeals();renderToday();toast("Poids : "+num(n)+" kg");}
function saveProfile(){
  var s=Number($("fStart").value),t=Number($("fTarget").value),c=Number($("fCal").value);
  var ca=Number($("fCarbs").value),pr=Number($("fProt").value),fa=Number($("fFat").value),wg=Number($("fWater").value);
  var sd=$("fStartDate").value;if(!/^\d{4}-\d{2}-\d{2}$/.test(sd))sd=state.profile.startDate||START_DATE;
  if(!isFinite(s)||!isFinite(t)||!isFinite(c)||!isFinite(ca)||!isFinite(pr)||!isFinite(fa)||!isFinite(wg)||s<30||t<30||c<500||c>6000||wg<0.5||wg>8){toast("Vérifie les objectifs");return;}
  if(t>=s&&!confirm("Ton objectif ("+num(t)+" kg) n'est pas inférieur à ton poids de départ ("+num(s)+" kg) : as-tu inversé les deux champs ? La barre de progression suppose une perte de poids. Continuer quand même ?"))return;
  state.profile={start:s,target:t,cal:c,startDate:sd};state.macro={carbs:ca,protein:pr,fat:fa};state.waterGoal=wg;save();renderAll();toast("Objectifs enregistrés");
}

/* events */
document.addEventListener("click",function(e){
  var a=e.target.closest("[data-act]");if(!a)return;
  if(a.tagName==="A")e.preventDefault();
  var act=a.dataset.act, ex=a.dataset.ex;
  switch(act){
    case "go": showPage(a.dataset.page); break;
    case "weigh": openWeigh(); break;
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
    case "guidedJump": openGuidedSession(ex); break;
    case "guidedClose": closeGuided(); showPage("today"); break;
    case "guidedList": closeGuided(); renderSession(); break;
    case "guidedNext": guidedAdvance(); break;
    case "guidedSkip": guidedSkip(); break;
    case "guidedFinishNow": guidedFinishNow(); break;
    case "goRunning": showPage("session"); switchSessionCategory("running"); break;
    case "quicklogOpen": $("quicklogSheet").classList.add("on"); break;
    case "quicklogClose": $("quicklogSheet").classList.remove("on"); break;
    case "completeClose": closeComplete(); showPage("today"); break;
    case "selDay": state.selDay=Number(a.dataset.i); renderSession(); break;
    case "sessCat": switchSessionCategory(a.dataset.cat); break;
    case "runProgToggle": runProgToggle(Number(a.dataset.i)); break;
    case "runProgPrev": runProgWeekShift(-1); break;
    case "runProgNext": runProgWeekShift(1); break;
    case "runProgSkip": runProgWeekShift(2); break;
    case "runProgRepeat": runProgRepeat(); break;
    case "setTick": setTick(ex,Number(a.dataset.i)); break;
    case "w-": setWeight(ex,-2.5); break;
    case "w+": setWeight(ex,2.5); break;
    case "r-": setReps(ex,-1); break;
    case "r+": setReps(ex,1); break;
    case "excludeEx": excludeEx(ex); break;
    case "restoreEx": restoreEx(); break;
    case "removeExtraEx": removeExtraEx(ex); break;
    case "addExOpen": openAddExercise(); break;
    case "addExClose": closeAddExercise(); break;
    case "addExSave": saveAddExercise(); break;
    case "restStop": stopRest(); break;
    case "snackAct": if(snackCb)snackCb(); document.getElementById("snack").classList.remove("on"); document.body.classList.remove("has-snack"); clearTimeout(snackT); snackCb=null; break;
    case "export": exportData(); break;
    case "import": document.getElementById("importFile").click(); break;
    case "selEx": state.selEx=ex; renderProgress(); break;
    case "addMeal": openMeal(a.dataset.mealType||""); break;
    case "openFavorites": openFavorites(); break;
    case "favoritesClose": closeFavorites(); break;
    case "favUse": useFavorite(Number(a.dataset.i)); break;
    case "favDelete": deleteFavorite(Number(a.dataset.i)); break;
    case "saveFavorite": saveFavorite(); break;
    case "waterAdd": addWater(Number(a.dataset.amount||300)); break;
    case "bodyWeightMinus": adjustBodyWeight(-0.1); break;
    case "bodyWeightPlus": adjustBodyWeight(0.1); break;
    case "fasting": openFasting(); break;
    case "fastClose": $("fastModal").classList.remove("on"); break;
    case "fastStart": toggleFasting(); break;
    case "scanOpen": openScanner(); break;
    case "scanClose": closeScanner(); break;
    case "scanLookup": lookupBarcode(document.getElementById("manualBarcode").value); break;
    case "mClose": closeMeal(); break;
    case "mSave": saveMeal(); break;
    case "foodPick": pickFoodResult(Number(a.dataset.i)); break;
    case "delMeal": delMealConfirm(Number(a.dataset.i)); break;
    case "openRun": openRun(); break;
    case "liveStart": openLiveRun(); break;
    case "liveClose": discardRun(); break;
    case "runToggle": toggleRun(); break;
    case "runFinish": finishRun(); break;
    case "runDiscard": discardRun(); break;
    case "runClose": closeRun(); break;
    case "runSave": saveRun(); break;
    case "delRun": delRunConfirm(a.dataset.id); break;
    case "viewRunMap": openRunMap(a.dataset.id); break;
    case "runMapClose": closeRunMap(); break;
    case "openSteps": openSteps(); break;
    case "stepsClose": closeSteps(); break;
    case "stepsSave": saveSteps(); break;
    case "energy": setEnergy(Number(a.dataset.v)); break;
    case "toggleMenuDay": toggleMenuDay(Number(a.dataset.d)); break;
    case "menuAdd": var row=MENU[Number(a.dataset.d)][1][Number(a.dataset.m)];
      var xk=row[2].match(/(\d+)\s*kcal/),xp=row[2].match(/(\d+)\s*g prot/);
      var mKcal=xk?Number(xk[1]):0,mProt=xp?Number(xp[1]):0;
      /* glucides/lipides non détaillés dans le menu : estimation à partir du reste des
         calories (au-delà des protéines), répartition 65/35 cohérente avec des plats
         riz/pommes de terre — meilleur qu'un 0 franchement faux, mais reste une estimation */
      var mRemain=Math.max(0,mKcal-mProt*4),mCarbs=Math.round(mRemain*0.65/4),mFat=Math.round(mRemain*0.35/9);
      addMealObj({name:row[1],kcal:mKcal,protein:mProt,carbs:mCarbs,fat:mFat,qty:100,type:row[0]}); toast("Ajouté au journal"); break;
    case "saveProfile": saveProfile(); break;
    case "login": login(); break;
    case "loginApple": loginApple(); break;
    case "logout": logout(); break;
    case "backup": backup(); break;
    case "restore": restore(); break;
    case "reset": resetAll(); break;
    case "editDay": openEditDay(a.dataset.id); break;
    case "edAddEx": edAddEx(); break;
    case "edRemoveEx": edRemoveEx(Number(a.dataset.i)); break;
    case "edClose": edClose(); break;
    case "edSave": edSave(); break;
    case "setTheme": setTheme(a.dataset.theme); break;
  }
});
document.addEventListener("visibilitychange",function(){if(document.visibilityState==="visible"){if(runActive&&!runPaused)requestWake();fixLiveMapSize();}else{cloudAutoBackup(true);}});
document.addEventListener("input",function(e){
  var id=e.target.id;
  if(id==="runDist"||id==="runDur")updateRunPace();
  else if(id==="foodQty")applyFoodRef100ToQty();
  else if(id==="foodKcal"||id==="foodProt"||id==="foodCarbs"||id==="foodFat")clearFoodRef100();
  else if(id==="foodName")scheduleFoodSearch();
});
document.addEventListener("change",function(e){var el=e.target;
  if(el.classList&&el.classList.contains("wval")&&el.dataset.ex){setWeightExact(el.dataset.ex,el.value);}
  else if(el.classList&&el.classList.contains("rval")&&el.dataset.ex){setRepsExact(el.dataset.ex,el.value);}
  else if(el.id==="importFile"&&el.files&&el.files[0]){importData(el.files[0]);el.value="";}
});
document.querySelectorAll(".nav button").forEach(function(b){
  function navGo(ev){if(ev)ev.preventDefault();showPage(b.dataset.page);}
  b.addEventListener("click",navGo);
  b.addEventListener("touchend",navGo,{passive:false});
});
document.addEventListener("click",function(e){ // close modal on backdrop
  if(e.target.classList&&e.target.classList.contains("modal"))e.target.classList.remove("on");
});

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
    setInterval(updateRest,300);
    setInterval(renderFasting,1000);
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
