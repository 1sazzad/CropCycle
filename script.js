const cropProfiles={
chickpea:{name:"Chickpea",water:92,soil:95,risk:82,income:76,summary:"A strong dry-season option because it needs relatively little water and adds rotation diversity through a legume phase.",next:"Maize"},
mustard:{name:"Mustard",water:88,soil:70,risk:84,income:81,summary:"A resilient dry-season oilseed with moderate water demand and good fit where rainfall is limited.",next:"Mung bean"},
mung:{name:"Mung bean",water:86,soil:96,risk:79,income:78,summary:"A short-duration legume that supports soil recovery while keeping water demand low.",next:"Rice"},
maize:{name:"Maize",water:68,soil:74,risk:75,income:90,summary:"A productive rotation crop when irrigation is available and heat stress is manageable.",next:"Mung bean"},
lentil:{name:"Lentil",water:90,soil:94,risk:80,income:77,summary:"A low-water pulse crop that improves rotation diversity and can support soil nitrogen balance.",next:"Maize"},
sesame:{name:"Sesame",water:93,soil:67,risk:88,income:75,summary:"A drought-tolerant option for warmer, drier conditions with limited irrigation.",next:"Pulse crop"}};

const regionBias={
dhaka:{chickpea:5,mung:5,maize:3,mustard:2,lentil:2,sesame:0},
rajshahi:{chickpea:7,mustard:7,lentil:6,sesame:5,maize:3,mung:1},
khulna:{sesame:7,mung:5,mustard:4,chickpea:2,maize:0,lentil:1},
sylhet:{mung:6,maize:5,chickpea:2,mustard:0,lentil:1,sesame:-2}};

const cropPenalty={
rice:{maize:4,chickpea:8,mung:7,lentil:6,mustard:5,sesame:3},
wheat:{mung:8,chickpea:7,sesame:5,maize:1,lentil:4,mustard:1},
maize:{mung:8,chickpea:7,lentil:6,mustard:4,sesame:4,maize:-12},
potato:{mung:7,lentil:6,chickpea:5,mustard:4,sesame:2,maize:3},
vegetables:{mung:6,chickpea:5,lentil:5,mustard:4,sesame:3,maize:2}};

function title(v){return v.replace(/\b\w/g,function(c){return c.toUpperCase();});}

function plan(e){
e.preventDefault();
const region=document.getElementById("region").value;
const current=document.getElementById("currentCrop").value;
const soil=document.getElementById("soil").value;
const season=document.getElementById("season").value;
const priority=document.getElementById("priority").value;
const irrigation=document.getElementById("irrigation").value;

const weighted=Object.entries(cropProfiles).map(function(entry){
const key=entry[0],p=entry[1];
let score=(p.water+p.soil+p.risk+p.income)/4;
score+=(regionBias[region][key]||0);
score+=(cropPenalty[current][key]||0);
if(priority==="water")score+=(p.water-75)*0.18;
if(priority==="soil")score+=(p.soil-75)*0.18;
if(priority==="risk")score+=(p.risk-75)*0.18;
if(priority==="income")score+=(p.income-75)*0.16;
if(irrigation==="limited")score+=(p.water-80)*0.12;
if(irrigation==="reliable"&&key==="maize")score+=4;
if(season==="kharif"&&["mung","sesame"].includes(key))score+=4;
if(season==="rabi"&&["chickpea","mustard","lentil"].includes(key))score+=5;
if(soil==="sandy"&&["sesame","chickpea"].includes(key))score+=3;
if(soil==="clay"&&key==="lentil")score-=2;
return {key:key,score:Math.max(55,Math.min(96,Math.round(score)))};
}).sort(function(a,b){return b.score-a.score;});

const best=weighted[0],alt=weighted[1],p=cropProfiles[best.key],ap=cropProfiles[alt.key];
document.getElementById("cropName").textContent=p.name;
document.getElementById("score").textContent=best.score;
document.getElementById("summary").textContent=p.summary;
document.getElementById("rotation1").textContent=title(current);
document.getElementById("rotation2").textContent=p.name;
document.getElementById("rotation3").textContent=p.next;
document.getElementById("alternative").textContent=ap.name;
document.getElementById("altWhy").textContent="Suitability score "+alt.score+"/100 with a different balance of water, soil and climate resilience.";

const reasons=[["Water fit",p.water+"/100"],["Soil benefit",p.soil+"/100"],["Climate resilience",p.risk+"/100"],["Income balance",p.income+"/100"]];
document.getElementById("reasons").innerHTML=reasons.map(function(r){return '<div class="reason"><small>'+r[0]+'</small><strong>'+r[1]+'</strong></div>';}).join("");
}

document.getElementById("plannerForm").addEventListener("submit",plan);
document.getElementById("plannerForm").dispatchEvent(new Event("submit",{cancelable:true,bubbles:true}));