/* Illustrations animées des exercices : une silhouette vectorielle (nette à toutes les
   tailles) dont les poses clés sont décrites ci-dessous et interpolées en boucle.
   Vue de profil (côté "n" = proche, "f" = éloigné, estompé) ou de face (front:true).
   Membres : angles absolus en degrés (0 = droite, 90 = bas) : ua/fa bras, th/sh jambe, ft pied ;
   ou cible main (h) / cheville (a) résolue par cinématique inverse (e/k = sens du coude/genou). */
(function(){
"use strict";
var T=46,NK=13,UA=24,FA=22,TH=33,SH=31,FT=10,G=144,SW=12,HW=7;
var NS="http://www.w3.org/2000/svg";

function rad(a){return a*Math.PI/180;}
function pt(o,a,l){return [o[0]+Math.cos(rad(a))*l,o[1]+Math.sin(rad(a))*l];}
function ang(a,b){return Math.atan2(b[1]-a[1],b[0]-a[0])*180/Math.PI;}
function ik(r,t,l1,l2,s){
  var dx=t[0]-r[0],dy=t[1]-r[1],d=Math.sqrt(dx*dx+dy*dy),b=Math.atan2(dy,dx);
  d=Math.max(Math.abs(l1-l2)+.01,Math.min(l1+l2-.01,d));
  var a=Math.acos(Math.max(-1,Math.min(1,(l1*l1+d*d-l2*l2)/(2*l1*d))));
  var j=[r[0]+Math.cos(b+s*a)*l1,r[1]+Math.sin(b+s*a)*l1],b2=Math.atan2(t[1]-j[1],t[0]-j[0]);
  return [j,[j[0]+Math.cos(b2)*l2,j[1]+Math.sin(b2)*l2]];
}
function arm(sh,m){
  if(m.h)return ik(sh,m.h,UA,FA,m.e||1);
  var el=pt(sh,m.ua,UA);return [el,pt(el,m.fa,FA)];
}
function leg(hp,m,tl){
  var r,th=TH*(tl||1);
  if(m.a)r=ik(hp,m.a,th,SH,m.k||-1);else{var kn=pt(hp,m.th,th);r=[kn,pt(kn,m.sh,SH)];}
  return [r[0],r[1],pt(r[1],m.ft==null?0:m.ft,FT)];
}
/* squelette complet d'une pose */
function solve(p){
  var hip=p.hip,neck=pt(hip,p.t,T),head=pt(neck,p.hd==null?p.t:p.hd,NK),J={hip:hip,neck:neck,head:head,front:!!p.front,p:p};
  if(p.front){
    var px=Math.cos(rad(p.t+90)),py=Math.sin(rad(p.t+90));
    J.shN=[neck[0]-px*SW,neck[1]-py*SW];J.shF=[neck[0]+px*SW,neck[1]+py*SW];
    J.hpN=[hip[0]-px*HW,hip[1]-py*HW];J.hpF=[hip[0]+px*HW,hip[1]+py*HW];
  }else{J.shN=J.shF=neck;J.hpN=J.hpF=hip;}
  J.aN=arm(J.shN,p.n);J.aF=arm(J.shF,p.f);J.lN=leg(J.hpN,p.n,p.tl);J.lF=leg(J.hpF,p.f,p.tl);
  return J;
}
/* interpolation de deux poses (nombres et tableaux de nombres) */
function lerp(a,b,k){
  if(typeof a==="number")return typeof b==="number"?a+(b-a)*k:a;
  if(Array.isArray(a))return a.map(function(v,i){return lerp(v,b&&b[i],k);});
  if(a&&typeof a==="object"){var o={};for(var key in a)o[key]=(b&&key in b)?lerp(a[key],b[key],k):a[key];return o;}
  return a;
}
function ease(k){return k<.5?2*k*k:1-Math.pow(-2*k+2,2)/2;}

/* ---------- raccourcis de poses ---------- */
function cp(o){return JSON.parse(JSON.stringify(o));}
function mix(base,over){var o=cp(base);for(var k in over)o[k]=cp(over[k]);return o;}
/* debout de profil, pieds à plat */
function stand(x,o){return mix({hip:[x,75],t:-90,hd:-90,n:{ua:96,fa:94,th:91,sh:90,ft:0},f:{ua:84,fa:86,th:89,sh:90,ft:0}},o||{});}
/* debout de face */
function standF(x,o){return mix({front:true,hip:[x,75],t:-90,n:{ua:100,fa:96,th:93,sh:90,ft:180},f:{ua:80,fa:84,th:87,sh:90,ft:0}},o||{});}
/* corps gainé tendu des chevilles (ax,ay) aux épaules (sx,sy) */
function body(ax,ay,sy,o,hx){
  var L=T+TH+SH-.5,sx=ax+Math.sqrt(L*L-(ay-sy)*(ay-sy)),a=ang([ax,ay],[sx,sy]),hip=pt([sx,sy],a+180,T);
  hx=hx||sx;
  return mix({hip:hip,t:a,hd:a+6,n:{h:[hx+2,G-3],e:-1,a:[ax,ay],k:1,ft:100},f:{h:[hx-2,G-3],e:-1,a:[ax-2,ay],k:1,ft:100}},o||{});
}
function withN(p,n){var o=cp(p);for(var k in n)o.n[k]=n[k];return o;}
function withF(p,f){var o=cp(p);for(var k in f)o.f[k]=f[k];return o;}
function limbs(p,n,f){return withF(withN(p,n||{}),f||{});}

/* ---------- équipements ---------- */
var FLOOR={k:"floor"};
function path(d,w){return {k:"path",d:d,w:w||5};}
function db(side){return {k:"db",s:side};}
function cable(x,y,side){return {k:"cable",x:x,y:y,s:side};}
function pad(x,y,r){return {k:"pad",x:x,y:y,r:r};}

/* ---------- bibliothèque ---------- */
var LIB={};
function add(names,spec){names.split("|").forEach(function(n){LIB[n]=spec;});}

/* pompes */
var PU_A=body(58,137,98,{},162),PU_B=body(58,137,126,{hd:-4},162);
add("Pompes|Pompes larges",{f:[PU_A,PU_B],p:[FLOOR]});
add("Pompes déclinées",{f:[
  limbs(body(52,101,98,{},160),{ft:70},{ft:70}),
  limbs(body(52,101,126,{hd:10},160),{ft:70},{ft:70})],
  p:[FLOOR,path("M24 110H78M32 110V144M70 110V144",6)]});

/* squats et fentes */
var SQ_UP=stand(118,{n:{ua:2,fa:0,th:91,sh:90,ft:0},f:{ua:-2,fa:-2,th:89,sh:90,ft:0}});
var SQ_DN={hip:[98,108],t:-58,hd:-80,n:{ua:-6,fa:-6,a:[124,139],k:-1,ft:0},f:{ua:-10,fa:-10,a:[120,139],k:-1,ft:0}};
add("Squats",{f:[SQ_UP,SQ_DN],p:[FLOOR]});
add("Squats sumo",{f:[
  standF(120,{n:{h:[116,54],e:1,a:[90,139],k:1,ft:180},f:{h:[124,54],e:-1,a:[150,139],k:-1,ft:0}}),
  standF(120,{hip:[120,100],n:{h:[116,78],e:1,a:[90,139],k:1,ft:180},f:{h:[124,78],e:-1,a:[150,139],k:-1,ft:0}})],p:[FLOOR]});
add("Squat jumps",{d:650,f:[
  {hip:[100,108],t:-58,hd:-80,n:{ua:130,fa:120,a:[124,139],k:-1,ft:0},f:{ua:126,fa:116,a:[120,139],k:-1,ft:0}},
  stand(116,{hip:[116,62],n:{ua:-30,fa:-42,th:94,sh:96,ft:50},f:{ua:-26,fa:-38,th:88,sh:92,ft:50}})],p:[FLOOR]});
var LUNGE_UP=stand(120,{n:{h:[127,72],e:1,th:91,sh:90,ft:0},f:{h:[125,72],e:1,th:89,sh:90,ft:0}});
add("Fentes arrière",{f:[LUNGE_UP,
  {hip:[112,104],t:-90,hd:-90,n:{h:[120,100],e:1,a:[82,134],k:1,ft:30},f:{h:[118,100],e:1,a:[144,139],k:-1,ft:0}}],p:[FLOOR]});
add("Fentes marchées haltères",{f:[stand(110,{n:{ua:92,fa:92,th:91,sh:90,ft:0},f:{ua:88,fa:88,th:89,sh:90,ft:0}}),
  {hip:[122,100],t:-90,hd:-90,n:{ua:92,fa:92,a:[152,139],k:-1,ft:0},f:{ua:88,fa:88,a:[82,128],k:1,ft:30}}],p:[FLOOR,db("f"),db("n")]});
add("Jumping lunges",{d:560,f:[
  {hip:[116,100],t:-88,hd:-90,n:{ua:40,fa:-50,a:[148,139],k:-1,ft:0},f:{ua:130,fa:100,a:[78,128],k:1,ft:30}},
  {hip:[116,74],t:-88,hd:-90,n:{ua:80,fa:20,th:70,sh:110,ft:20},f:{ua:100,fa:80,th:110,sh:70,ft:40}},
  {hip:[116,100],t:-88,hd:-90,n:{ua:130,fa:100,a:[78,128],k:1,ft:30},f:{ua:40,fa:-50,a:[148,139],k:-1,ft:0}},
  {hip:[116,74],t:-88,hd:-90,n:{ua:100,fa:80,th:110,sh:70,ft:40},f:{ua:80,fa:20,th:70,sh:110,ft:20}}],p:[FLOOR]});

/* gainage */
var PL=limbs(body(52,137,117,{hd:-8}),{h:null,ua:88,fa:0},{h:null,ua:92,fa:-2});
add("Gainage (planche)|Gainage",{d:1700,f:[PL,limbs(body(52,137,115,{hd:-12}),{h:null,ua:88,fa:0},{h:null,ua:92,fa:-2})],p:[FLOOR]});
function sidePlank(lift){
  var s=[156,106-lift],a=[46,136],t=ang(a,s),hip=pt(s,t+180,T);
  return {front:true,hip:hip,t:t,hd:t-8,n:{ua:t-90,fa:t-92,th:t+180,sh:t+180,ft:t+90},f:{ua:92,fa:-8,th:t+180,sh:t+180,ft:t+90}};
}
add("Gainage latéral",{d:1400,f:[sidePlank(0),sidePlank(8)],p:[FLOOR]});
add("Mountain climbers",{d:420,f:[
  limbs(PU_A,{a:[124,128],k:-1,ft:80},{a:[58,137]}),
  limbs(PU_A,{a:[58,137]},{a:[122,128],k:-1,ft:80})],p:[FLOOR]});
add("Plank jacks",{d:520,f:[PU_A,body(58,126,94,{},162)],p:[FLOOR]});

/* cardio poids du corps */
add("Burpees",{d:560,f:[
  stand(118),
  {hip:[104,112],t:-52,hd:-40,n:{h:[146,G-3],e:-1,a:[122,139],k:-1,ft:0},f:{h:[142,G-3],e:-1,a:[118,139],k:-1,ft:0}},
  body(58,137,98),
  {hip:[104,112],t:-52,hd:-40,n:{h:[146,G-3],e:-1,a:[122,139],k:-1,ft:0},f:{h:[142,G-3],e:-1,a:[118,139],k:-1,ft:0}},
  stand(118,{hip:[118,66],n:{ua:-50,fa:-60,th:92,sh:94,ft:50},f:{ua:-46,fa:-56,th:88,sh:92,ft:50}})],p:[FLOOR]});
add("Jumping jacks",{d:520,f:[
  standF(120,{n:{ua:98,fa:94,th:92,sh:90,ft:180},f:{ua:82,fa:86,th:88,sh:90,ft:0}}),
  standF(120,{hip:[120,72],n:{ua:-135,fa:-110,a:[92,137],k:1,ft:180},f:{ua:-45,fa:-70,a:[148,137],k:-1,ft:0}})],p:[FLOOR]});
add("Corde à sauter (ou sur place)",{d:420,f:[
  standF(120,{rope:-70,n:{h:[88,92],e:-1,th:92,sh:90,ft:180},f:{h:[152,92],e:1,th:88,sh:90,ft:0}}),
  standF(120,{hip:[120,66],rope:215,n:{h:[88,84],e:-1,th:92,sh:92,ft:130},f:{h:[152,84],e:1,th:88,sh:88,ft:50}})],p:[FLOOR,{k:"rope"}]});
add("High knees",{d:380,f:[
  stand(118,{hip:[118,72],n:{ua:130,fa:60,th:-4,sh:90,ft:20},f:{ua:40,fa:-50,th:92,sh:88,ft:0}}),
  stand(118,{hip:[118,72],n:{ua:40,fa:-50,th:92,sh:88,ft:0},f:{ua:130,fa:60,th:-4,sh:90,ft:20}})],p:[FLOOR]});
add("Sprint sur place",{d:300,f:[
  stand(118,{hip:[118,74],t:-84,hd:-86,n:{ua:40,fa:-60,th:30,sh:120,ft:40},f:{ua:130,fa:90,th:100,sh:120,ft:10}}),
  stand(118,{hip:[118,74],t:-84,hd:-86,n:{ua:130,fa:90,th:100,sh:120,ft:10},f:{ua:40,fa:-60,th:30,sh:120,ft:40}})],p:[FLOOR]});

/* chaise, sol */
var CHAIR=path("M62 98H108M68 98V144M104 98V144M64 98V58",6);
add("Dips sur chaise",{f:[
  {hip:[114,96],t:-92,hd:-88,n:{h:[106,97],e:1,a:[184,139],k:-1,ft:-80},f:{h:[102,97],e:1,a:[180,139],k:-1,ft:-80}},
  {hip:[116,120],t:-94,hd:-86,n:{h:[106,97],e:1,a:[180,139],k:-1,ft:-80},f:{h:[102,97],e:1,a:[176,139],k:-1,ft:-80}}],p:[FLOOR,CHAIR]});
add("Hip thrust au sol",{f:[
  {hip:[102,133],t:180,hd:182,n:{ua:4,fa:2,a:[150,139],k:-1,ft:0},f:{ua:2,fa:0,a:[146,139],k:-1,ft:0}},
  {hip:[96,107],t:145,hd:176,n:{ua:10,fa:4,a:[150,139],k:-1,ft:0},f:{ua:8,fa:2,a:[146,139],k:-1,ft:0}}],p:[FLOOR]});
add("Hip thrust machine",{f:[
  {hip:[100,126],t:-142,hd:-170,n:{h:[104,116],e:1,a:[150,139],k:-1,ft:0},f:{h:[100,116],e:1,a:[146,139],k:-1,ft:0}},
  {hip:[110,100],t:180,hd:-170,n:{h:[112,92],e:1,a:[150,139],k:-1,ft:0},f:{h:[108,92],e:1,a:[146,139],k:-1,ft:0}}],
  p:[FLOOR,path("M24 104H72M34 104V144M64 104V144",6),{k:"hippad"}]});

/* haltères, bancs */
var FLAT=path("M56 112H184M72 112V144M170 112V144",6);
add("Développé couché haltères",{f:[
  {hip:[100,103],t:0,hd:0,n:{h:[148,56],e:1,a:[70,139],k:1,ft:180},f:{h:[144,56],e:1,a:[66,139],k:1,ft:180}},
  {hip:[100,103],t:0,hd:0,n:{h:[148,88],e:-1,a:[70,139],k:1,ft:180},f:{h:[144,88],e:-1,a:[66,139],k:1,ft:180}}],p:[FLOOR,FLAT,db("f"),db("n")]});
add("Développé incliné haltères",{f:[
  {hip:[96,106],t:-34,hd:-40,n:{h:[138,36],e:1,a:[70,139],k:1,ft:180},f:{h:[134,36],e:1,a:[66,139],k:1,ft:180}},
  {hip:[96,106],t:-34,hd:-40,n:{h:[128,76],e:-1,a:[70,139],k:1,ft:180},f:{h:[124,76],e:-1,a:[66,139],k:1,ft:180}}],
  p:[FLOOR,path("M78 114H112M90 114L150 74M96 114V144",6),db("f"),db("n")]});
add("Curl biceps haltères",{f:[
  stand(118,{n:{ua:94,fa:92,th:91,sh:90,ft:0},f:{ua:90,fa:88,th:89,sh:90,ft:0}}),
  stand(118,{n:{ua:98,fa:-55,th:91,sh:90,ft:0},f:{ua:94,fa:-59,th:89,sh:90,ft:0}})],p:[FLOOR,db("f"),db("n")]});
add("Élévations latérales",{f:[
  standF(120,{n:{h:[103,78],e:-1,th:93,sh:90,ft:180},f:{h:[137,78],e:1,th:87,sh:90,ft:0}}),
  standF(120,{n:{h:[66,36],e:-1,th:93,sh:90,ft:180},f:{h:[174,36],e:1,th:87,sh:90,ft:0}})],p:[FLOOR,db("f"),db("n")]});
add("Soulevé de terre roumain",{f:[
  stand(112,{n:{ua:92,fa:90,th:91,sh:90,ft:0},f:{ua:88,fa:90,th:89,sh:90,ft:0}}),
  {hip:[98,78],t:-16,hd:-6,n:{ua:88,fa:90,a:[118,139],k:-1,ft:0},f:{ua:86,fa:88,a:[114,139],k:-1,ft:0}}],p:[FLOOR,db("f"),db("n")]});
var BENCH_ROW=path("M78 104H176M90 104V144M164 104V144",6);
add("Rowing haltère",{f:[
  {hip:[104,70],t:-6,hd:0,n:{ua:88,fa:90,a:[112,139],k:-1,ft:0},f:{h:[154,102],e:-1,a:[78,100],k:1,ft:180}},
  {hip:[104,70],t:-6,hd:0,n:{h:[128,78],e:-1,a:[112,139],k:-1,ft:0},f:{h:[154,102],e:-1,a:[78,100],k:1,ft:180}}],p:[FLOOR,BENCH_ROW,db("n")]});

/* poulies et machines */
add("Écarté poulie",{f:[
  standF(120,{n:{h:[60,48],e:1,th:93,sh:90,ft:180},f:{h:[180,48],e:-1,th:87,sh:90,ft:0}}),
  standF(120,{n:{h:[114,74],e:1,th:93,sh:90,ft:180},f:{h:[126,74],e:-1,th:87,sh:90,ft:0}})],
  p:[FLOOR,path("M16 8V144M224 8V144",5),cable(16,14,"n"),cable(224,14,"f")]});
add("Extension triceps corde",{f:[
  stand(116,{t:-80,hd:-84,n:{ua:96,fa:-40,th:91,sh:90,ft:0},f:{ua:92,fa:-44,th:89,sh:90,ft:0}}),
  stand(116,{t:-80,hd:-84,n:{ua:96,fa:88,th:91,sh:90,ft:0},f:{ua:92,fa:84,th:89,sh:90,ft:0}})],
  p:[FLOOR,path("M214 8V144",5),cable(212,16,"n")]});
add("Face pull",{f:[
  stand(112,{n:{h:[172,28],e:1,th:91,sh:90,ft:0},f:{h:[168,28],e:1,th:89,sh:90,ft:0}}),
  stand(112,{n:{h:[134,18],e:-1,th:91,sh:90,ft:0},f:{h:[130,18],e:-1,th:89,sh:90,ft:0}})],
  p:[FLOOR,path("M222 8V144",5),cable(220,24,"n")]});
var SEAT=path("M84 110H130M108 110V144M92 144H124",6);
add("Tirage vertical|Tirage vertical prise large",{f:[
  {hip:[106,104],t:-86,hd:-96,n:{h:[118,10],e:-1,a:[146,136],k:-1,ft:0},f:{h:[114,10],e:-1,a:[142,136],k:-1,ft:0}},
  {hip:[106,104],t:-80,hd:-92,n:{h:[128,54],e:-1,a:[146,136],k:-1,ft:0},f:{h:[124,54],e:-1,a:[142,136],k:-1,ft:0}}],
  p:[FLOOR,SEAT,pad(150,96,6),cable(122,0,"n"),{k:"bar",s:"n"}]});
add("Tirage horizontal poulie",{f:[
  {hip:[90,110],t:-66,hd:-80,n:{h:[160,84],e:-1,a:[168,122],k:-1,ft:-80},f:{h:[156,84],e:-1,a:[164,122],k:-1,ft:-80}},
  {hip:[90,110],t:-96,hd:-92,n:{h:[112,84],e:1,a:[168,122],k:-1,ft:-80},f:{h:[108,84],e:1,a:[164,122],k:-1,ft:-80}}],
  p:[FLOOR,path("M56 116H130M70 116V144M116 116V144M176 98V142",6),path("M226 70V144",5),cable(224,86,"n")]});
var CHAIR_M=path("M84 110H130M108 110V144M92 144H124M86 110V40",6);
add("Chest press",{f:[
  {hip:[100,104],t:-90,hd:-90,n:{h:[128,66],e:1,a:[134,136],k:-1,ft:0},f:{h:[124,66],e:1,a:[130,136],k:-1,ft:0}},
  {hip:[100,104],t:-90,hd:-90,n:{h:[146,62],e:1,a:[134,136],k:-1,ft:0},f:{h:[142,62],e:1,a:[130,136],k:-1,ft:0}}],
  p:[FLOOR,CHAIR_M,{k:"handle",s:"n"}]});
add("Développé militaire machine",{f:[
  {hip:[100,104],t:-90,hd:-90,n:{h:[112,52],e:1,a:[134,136],k:-1,ft:0},f:{h:[108,52],e:1,a:[130,136],k:-1,ft:0}},
  {hip:[100,104],t:-90,hd:-90,n:{h:[108,12],e:1,a:[134,136],k:-1,ft:0},f:{h:[104,12],e:1,a:[130,136],k:-1,ft:0}}],
  p:[FLOOR,CHAIR_M,{k:"handle",s:"n",v:1}]});
add("Dips assistés",{f:[
  {hip:[146,80],t:-88,hd:-90,n:{h:[150,80],e:-1,th:96,sh:170,ft:170},f:{h:[146,80],e:-1,th:94,sh:168,ft:170}},
  {hip:[144,104],t:-80,hd:-86,n:{h:[150,80],e:-1,th:96,sh:170,ft:170},f:{h:[146,80],e:-1,th:94,sh:168,ft:170}}],
  p:[FLOOR,path("M128 82H192M134 82V144M186 82V144",5),{k:"kneepad"}]});
add("Presse à cuisses",{f:[
  {hip:[92,116],t:-150,hd:-150,n:{h:[102,112],e:1,a:[140,70],k:-1,ft:-45},f:{h:[98,112],e:1,a:[136,72],k:-1,ft:-45}},
  {hip:[92,116],t:-150,hd:-150,n:{h:[102,112],e:1,a:[114,92],k:-1,ft:-45},f:{h:[98,112],e:1,a:[110,94],k:-1,ft:-45}}],
  p:[FLOOR,path("M44 104L86 128H112M98 128V144",6),{k:"sled"}]});
add("Abducteurs machine",{f:[
  standF(120,{hip:[120,94],tl:.45,n:{h:[94,100],e:-1,th:100,sh:90,ft:180},f:{h:[146,100],e:1,th:80,sh:90,ft:0}}),
  standF(120,{hip:[120,94],tl:.45,n:{h:[94,100],e:-1,th:150,sh:96,ft:180},f:{h:[146,100],e:1,th:30,sh:84,ft:0}})],
  p:[FLOOR,path("M88 102H152M120 102V144M100 144H140M92 102V60M148 102V60",6),{k:"kneepads"}]});
add("Cardio fractionné (vélo ou rameur)",{d:900,crank:{c:[130,120],r:13},f:[
  {hip:[98,80],t:-58,hd:-40,n:{h:[160,66],e:1,a:[130,107],k:-1,ft:10},f:{h:[156,66],e:1,a:[130,133],k:-1,ft:10}}],
  p:[{k:"bike"}]});

/* ---------- rendu ---------- */
var uid=0,running=null;
function el(n,a,parent){var e=document.createElementNS(NS,n);for(var k in a)e.setAttribute(k,a[k]);if(parent)parent.appendChild(e);return e;}
function f1(v){return v.toFixed(1);}
/* segment galbé : deux cercles de rayons r1/r2 reliés par leurs tangentes */
function capsule(a,b,r1,r2){
  var dx=b[0]-a[0],dy=b[1]-a[1],d=Math.sqrt(dx*dx+dy*dy)||.01,th=Math.atan2(dy,dx),ph=Math.acos(Math.max(-1,Math.min(1,(r1-r2)/d)));
  var p1=[a[0]+r1*Math.cos(th+ph),a[1]+r1*Math.sin(th+ph)],p2=[b[0]+r2*Math.cos(th+ph),b[1]+r2*Math.sin(th+ph)];
  var p3=[b[0]+r2*Math.cos(th-ph),b[1]+r2*Math.sin(th-ph)],p4=[a[0]+r1*Math.cos(th-ph),a[1]+r1*Math.sin(th-ph)];
  return "M"+f1(p1[0])+" "+f1(p1[1])+"L"+f1(p2[0])+" "+f1(p2[1])+"A"+r2+" "+r2+" 0 1 0 "+f1(p3[0])+" "+f1(p3[1])+
    "L"+f1(p4[0])+" "+f1(p4[1])+"A"+r1+" "+r1+" 0 1 0 "+f1(p1[0])+" "+f1(p1[1])+"Z";
}
function limbD(root,m){
  return capsule(root,m[0],5.2,3.6)+capsule(m[0],m[1],3.6,2.7)+"M"+f1(m[1][0]+3.3)+" "+f1(m[1][1])+"a3.3 3.3 0 1 0 -6.6 0a3.3 3.3 0 1 0 6.6 0Z";
}
function legD(root,l){return capsule(root,l[0],7.4,5)+capsule(l[0],l[1],5,3.3)+capsule(l[1],l[2],3.4,2.4);}
function torsoD(J){
  if(J.front){
    var w=pt(J.hip,J.p.t,T*.38);
    return capsule(J.hpN,J.hpF,7,7)+capsule(J.shN,J.shF,7.5,7.5)+capsule(J.hip,w,11,13)+capsule(w,J.neck,13,11)+capsule(J.neck,pt(J.neck,J.p.hd==null?J.p.t:J.p.hd,6),4,4);
  }
  var c=pt(J.hip,J.p.t,T*.62);
  return capsule(J.hip,c,8,9.6)+capsule(c,J.neck,9.6,7)+capsule(J.neck,pt(J.neck,J.p.hd==null?J.p.t:J.p.hd,6),3.6,3.6);
}

/* cadrage : boîte englobante de toutes les poses et des équipements, au format 240×166 */
function pathPts(d){
  var r=[],x=0,y=0,re=/([MLHV])([^MLHV]*)/g,m;
  while((m=re.exec(d))){
    var n=m[2].trim().split(/[\s,]+/).map(Number);
    if(m[1]==="H")x=n[0];else if(m[1]==="V")y=n[0];else{x=n[0];y=n[1];}
    r.push([x,y]);
  }
  return r;
}
function frameBox(spec){
  var pts=[],poses=spec.crank?[0,1,2,3].map(function(i){return frameAt(spec,i*(spec.d||1100)/4);}):spec.f.map(solve);
  poses.forEach(function(J){
    [J.head,J.neck,J.hip,J.shN,J.shF].concat(J.aN,J.aF,J.lN,J.lF).forEach(function(q){pts.push([q[0]-9,q[1]-9],[q[0]+9,q[1]+9]);});
    if(J.p.rope!=null)pts.push([120,Math.min(J.p.rope,200)*.5+J.aN[1][1]*.5]);
  });
  spec.p.forEach(function(p){
    if(p.k==="floor")pts.push([120,G+4]);
    if(p.k==="path")pts=pts.concat(pathPts(p.d));
    if(p.k==="cable")pts.push([p.x,p.y]);
    if(p.k==="bike")pts.push([38,146],[210,56]);
  });
  var x0=1e9,y0=1e9,x1=-1e9,y1=-1e9;
  pts.forEach(function(q){x0=Math.min(x0,q[0]);y0=Math.min(y0,q[1]);x1=Math.max(x1,q[0]);y1=Math.max(y1,q[1]);});
  x0-=6;x1+=6;y0-=6;y1+=4;
  var w=x1-x0,h=y1-y0,R=240/166;
  if(w/h<R){var nw=h*R;x0-=(nw-w)/2;w=nw;}else{var nh=w/R;y0-=nh-h;h=nh;}
  if(w<150){var k=150/w;x0-=(150-w)/2;y0-=h*k-h;w=150;h=h*k;}
  return [x0,y0,w,h].map(function(v){return v.toFixed(1);}).join(" ");
}

function build(host,spec){
  var id="exg"+(++uid);
  if(!spec.vb)spec.vb=frameBox(spec);
  var svg=el("svg",{viewBox:spec.vb,class:"ex-art","aria-hidden":"true"});
  var defs=el("defs",{},svg),gr=el("linearGradient",{id:id,gradientUnits:"userSpaceOnUse",x1:"40",y1:"0",x2:"200",y2:"150"},defs);
  el("stop",{offset:"0",class:"ex-c1"},gr);el("stop",{offset:"1",class:"ex-c2"},gr);
  var eq=el("g",{class:"ex-eq",fill:"none","stroke-linecap":"round","stroke-linejoin":"round"},svg);
  var R={svg:svg,dyn:[]};
  spec.p.forEach(function(p){
    if(p.k==="floor"){el("ellipse",{cx:120,cy:G+1,rx:300,ry:3.2,class:"ex-shadow"},svg);}
    else if(p.k==="path")el("path",{d:p.d,"stroke-width":p.w},eq);
    else if(p.k==="bike")el("path",{d:"M60 124m-19 0a19 19 0 1 0 38 0a19 19 0 1 0 -38 0M188 124m-19 0a19 19 0 1 0 38 0a19 19 0 1 0 -38 0M60 124L96 86L130 120L60 124M130 120L166 70L188 124M96 86L92 78M84 78H104M166 70L158 62H172","stroke-width":4.5},eq);
    else if(p.k==="pad")el("circle",{cx:p.x,cy:p.y,r:p.r,class:"ex-pad"},svg);
  });
  var back=el("g",{fill:"none","stroke-linecap":"round",class:"ex-cable"},svg);
  var fig=el("g",{fill:"url(#"+id+")"},svg);
  R.far=el("path",{opacity:spec.f[0].front?1:.42},fig);
  R.torso=el("path",{},fig);
  R.head=el("circle",{r:9.5},fig);
  R.near=el("path",{},fig);
  var front=el("g",{fill:"none","stroke-linecap":"round","stroke-linejoin":"round"},svg);
  spec.p.forEach(function(p){
    if(p.k==="cable"||p.k==="rope")R.dyn.push({p:p,e:el("path",{"stroke-width":p.k==="rope"?2:1.6},back)});
    if(p.k==="db"||p.k==="bar"||p.k==="handle")R.dyn.push({p:p,e:el("path",{"stroke-width":p.k==="db"?6:4.5,class:"ex-db"},front)});
    if(p.k==="db")R.dyn.push({p:{k:"dbend",s:p.s},e:el("path",{"stroke-width":10,class:"ex-db"},front)});
    if(p.k==="sled"||p.k==="hippad"||p.k==="kneepad"||p.k==="kneepads")R.dyn.push({p:p,e:el("path",{"stroke-width":p.k==="sled"?6:9,class:p.k==="sled"?"ex-eqs":"ex-pads"},p.k==="sled"?front:svg)});
  });
  if(spec.p.some(function(p){return p.k==="kneepads"||p.k==="kneepad"||p.k==="hippad";}))svg.appendChild(fig);
  host.appendChild(svg);
  return R;
}
function hand(J,s){return s==="f"?J.aF:J.aN;}
function draw(R,J){
  R.far.setAttribute("d",legD(J.hpF,J.lF)+limbD(J.shF,J.aF));
  R.torso.setAttribute("d",torsoD(J));
  R.head.setAttribute("cx",f1(J.head[0]));R.head.setAttribute("cy",f1(J.head[1]));
  R.near.setAttribute("d",legD(J.hpN,J.lN)+limbD(J.shN,J.aN));
  R.dyn.forEach(function(d){
    var p=d.p,e=d.e,h,a,c,s;
    if(p.k==="cable"){h=hand(J,p.s)[1];e.setAttribute("d","M"+p.x+" "+p.y+"L"+f1(h[0])+" "+f1(h[1]));}
    else if(p.k==="rope"){var hn=J.aN[1],hf=J.aF[1],cy=J.p.rope||200;e.setAttribute("d","M"+f1(hn[0])+" "+f1(hn[1])+"Q120 "+f1(cy)+" "+f1(hf[0])+" "+f1(hf[1]));}
    else if(p.k==="db"||p.k==="dbend"||p.k==="handle"){
      var m=hand(J,p.s);h=m[1];a=p.v?0:Math.atan2(h[1]-m[0][1],h[0]-m[0][0])+Math.PI/2;
      if(J.front&&p.k!=="handle")a=0;
      var L=p.k==="db"?8:p.k==="handle"?7:0;c=Math.cos(a);s=Math.sin(a);
      if(p.k==="dbend")e.setAttribute("d","M"+f1(h[0]-c*8)+" "+f1(h[1]-s*8)+"l0 0M"+f1(h[0]+c*8)+" "+f1(h[1]+s*8)+"l0 0");
      else e.setAttribute("d","M"+f1(h[0]-c*L)+" "+f1(h[1]-s*L)+"L"+f1(h[0]+c*L)+" "+f1(h[1]+s*L));
    }
    else if(p.k==="bar"){h=hand(J,p.s)[1];e.setAttribute("d","M"+f1(h[0]-26)+" "+f1(h[1])+"L"+f1(h[0]+22)+" "+f1(h[1]));}
    else if(p.k==="sled"){h=J.lN[1];var ft=J.lN[2],mx=(h[0]+ft[0])/2+3,my=(h[1]+ft[1])/2+3;e.setAttribute("d","M"+f1(mx-15)+" "+f1(my-15)+"L"+f1(mx+15)+" "+f1(my+15));}
    else if(p.k==="hippad"){h=J.hip;e.setAttribute("d","M"+f1(h[0]-8)+" "+f1(h[1]-11)+"L"+f1(h[0]+8)+" "+f1(h[1]-11));}
    else if(p.k==="kneepad"){h=J.lN[0];e.setAttribute("d","M"+f1(h[0]-2)+" "+f1(h[1]+8)+"L"+f1(h[0]+6)+" "+f1(h[1]+8));}
    else if(p.k==="kneepads"){var k1=J.lN[0],k2=J.lF[0];e.setAttribute("d","M"+f1(k1[0]-7)+" "+f1(k1[1])+"l0 0M"+f1(k2[0]+7)+" "+f1(k2[1])+"l0 0");}
  });
}
function frameAt(spec,t){
  var fr=spec.f,d=spec.d||1100,p;
  if(spec.crank){
    var q=(t%d)/d*2*Math.PI,c=spec.crank.c,r=spec.crank.r;p=cp(fr[0]);
    p.n.a=[c[0]+Math.cos(q)*r,c[1]+Math.sin(q)*r];p.f.a=[c[0]-Math.cos(q)*r,c[1]-Math.sin(q)*r];
    return solve(p);
  }
  var n=fr.length,cyc=n*d,tt=t%cyc,i=Math.floor(tt/d),k=ease((tt-i*d)/d);
  return solve(lerp(fr[i],fr[(i+1)%n],k));
}
function reduced(){try{return window.matchMedia("(prefers-reduced-motion: reduce)").matches;}catch(e){return false;}}

window.EXART={
  has:function(name){return !!LIB[name];},
  names:function(){return Object.keys(LIB);},
  /* dessine l'exercice dans host ; animé tant qu'il reste affiché (un seul à la fois) */
  mount:function(host,name,opts){
    var spec=LIB[name];if(!spec)return false;
    host.innerHTML="";
    var R=build(host,spec),me={},t0=null;
    if(opts&&opts.frame!=null){draw(R,spec.crank?frameAt(spec,opts.frame*(spec.d||1100)/4):solve(spec.f[opts.frame]));return true;}
    if(opts&&opts.still||reduced()){draw(R,spec.crank?frameAt(spec,0):solve(spec.f[spec.f.length>2?0:1]));return true;}
    running=me;draw(R,frameAt(spec,0));
    requestAnimationFrame(function loop(ts){
      if(running!==me||!R.svg.isConnected)return;
      if(t0==null)t0=ts;
      if(R.svg.getClientRects().length)draw(R,frameAt(spec,ts-t0));
      requestAnimationFrame(loop);
    });
    return true;
  },
  _lib:LIB
};
})();
