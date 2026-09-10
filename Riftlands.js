/*
========================================================

                 RIFTLANDS
        EaglerForge Single File Expansion

                 Version 1.0

========================================================
*/

(function(){

"use strict";


const Riftlands = {

VERSION:"1.0",

enabled:true,

dimension:false,

seed:0,

xp:0,

level:1,

energy:100,

shards:0,

boss:{
    active:false,
    name:"",
    health:0,
    maxHealth:0
},

config:{
    particles:true,
    bosses:true,
    events:true,
    hud:true
},

world:{
    biome:"Unknown",
    structures:[],
    discovered:[]
},



log:function(text){

    try{

        ModAPI.displayToChat(
            "§5[Riftlands] §f"+text
        );

    }
    catch(e){

        console.log(
            "[Riftlands] "+text
        );

    }

},



random:function(min,max){

return Math.floor(
Math.random()*(max-min+1)+min
);

},



save:function(){

let data={

level:this.level,

xp:this.xp,

energy:this.energy,

shards:this.shards,

world:this.world

};


localStorage.setItem(
"riftlands_data",
JSON.stringify(data)
);


},



load:function(){

let data=
localStorage.getItem(
"riftlands_data"
);


if(data){

data=JSON.parse(data);


this.level=data.level||1;

this.xp=data.xp||0;

this.energy=data.energy||100;

this.shards=data.shards||0;

this.world=data.world||this.world;


}


},



addXP:function(amount){

this.xp+=amount;


let needed=this.level*100;


if(this.xp>=needed){

this.xp-=needed;

this.level++;


this.log(
"Level increased to "+this.level
);


}


this.save();

},



enterRift:function(){


if(this.dimension)
return;


this.dimension=true;


this.seed=
Math.floor(
Math.random()*999999
);


this.generateWorld();


this.log(
"You entered the Riftlands"
);


},



exitRift:function(){


this.dimension=false;


this.log(
"You returned from the Riftlands"
);


},



generateWorld:function(){


let biomes=[

"Crystal Wastes",

"Ashen Forest",

"Void Highlands",

"Deep Rift"

];


this.world.biome=
biomes[
this.random(
0,
biomes.length-1
)
];


this.world.structures=[];


for(let i=0;i<30;i++){


this.world.structures.push({

type:[
"Rift Tower",
"Ancient Temple",
"Crystal Vault"
]
[
this.random(0,2)
],


x:this.random(-1000,1000),

z:this.random(-1000,1000)

});


}


this.log(
"Generated "+this.world.biome
);


this.save();


}

};
/*
========================================================

                 RIFTLANDS
        EaglerForge Single File Expansion

                 Version 1.0

========================================================
*/

(function(){

"use strict";


const Riftlands = {

VERSION:"1.0",

enabled:true,

dimension:false,

seed:0,

xp:0,

level:1,

energy:100,

shards:0,

boss:{
    active:false,
    name:"",
    health:0,
    maxHealth:0
},

config:{
    particles:true,
    bosses:true,
    events:true,
    hud:true
},

world:{
    biome:"Unknown",
    structures:[],
    discovered:[]
},



log:function(text){

    try{

        ModAPI.displayToChat(
            "§5[Riftlands] §f"+text
        );

    }
    catch(e){

        console.log(
            "[Riftlands] "+text
        );

    }

},



random:function(min,max){

return Math.floor(
Math.random()*(max-min+1)+min
);

},



save:function(){

let data={

level:this.level,

xp:this.xp,

energy:this.energy,

shards:this.shards,

world:this.world

};


localStorage.setItem(
"riftlands_data",
JSON.stringify(data)
);


},



load:function(){

let data=
localStorage.getItem(
"riftlands_data"
);


if(data){

data=JSON.parse(data);


this.level=data.level||1;

this.xp=data.xp||0;

this.energy=data.energy||100;

this.shards=data.shards||0;

this.world=data.world||this.world;


}


},



addXP:function(amount){

this.xp+=amount;


let needed=this.level*100;


if(this.xp>=needed){

this.xp-=needed;

this.level++;


this.log(
"Level increased to "+this.level
);


}


this.save();

},



enterRift:function(){


if(this.dimension)
return;


this.dimension=true;


this.seed=
Math.floor(
Math.random()*999999
);


this.generateWorld();


this.log(
"You entered the Riftlands"
);


},



exitRift:function(){


this.dimension=false;


this.log(
"You returned from the Riftlands"
);


},



generateWorld:function(){


let biomes=[

"Crystal Wastes",

"Ashen Forest",

"Void Highlands",

"Deep Rift"

];


this.world.biome=
biomes[
this.random(
0,
biomes.length-1
)
];


this.world.structures=[];


for(let i=0;i<30;i++){


this.world.structures.push({

type:[
"Rift Tower",
"Ancient Temple",
"Crystal Vault"
]
[
this.random(0,2)
],


x:this.random(-1000,1000),

z:this.random(-1000,1000)

});


}


this.log(
"Generated "+this.world.biome
);


this.save();


}

};
// ======================================================
// RIFTLANDS ITEMS AND EQUIPMENT SYSTEM
// ======================================================


Riftlands.items = {


    RiftShard:{
        name:"Rift Shard",
        rarity:"Rare",
        value:10
    },


    VoidCrystal:{
        name:"Void Crystal",
        rarity:"Epic",
        value:50
    },


    AncientAlloy:{
        name:"Ancient Alloy",
        rarity:"Legendary",
        value:150
    },


    RiftBlade:{
        name:"Rift Blade",
        damage:15,
        ability:"Rift Slash",
        cooldown:5
    },


    VoidBow:{
        name:"Void Bow",
        damage:20,
        ability:"Void Arrow",
        cooldown:8
    },


    CrystalStaff:{
        name:"Crystal Staff",
        damage:30,
        ability:"Crystal Storm",
        cooldown:12
    },


    RiftArmor:{
        name:"Rift Armor",
        defense:25,
        ability:"Rift Shield"
    }

};




// ======================================================
// PLAYER ABILITIES
// ======================================================


Riftlands.abilities = {


cooldowns:{},



use:function(name){


if(this.cooldowns[name]){


Riftlands.log(
name+" is on cooldown"
);


return false;


}



switch(name){



case "Rift Slash":


Riftlands.log(
"Dark energy cuts through enemies"
);


this.cooldowns[name]=5;


break;



case "Void Arrow":


Riftlands.log(
"A void projectile was fired"
);


this.cooldowns[name]=8;


break;



case "Crystal Storm":


Riftlands.log(
"Crystals rain from the sky"
);


this.cooldowns[name]=12;


break;



case "Rift Shield":


Riftlands.energy+=20;


Riftlands.log(
"Rift shield activated"
);


this.cooldowns[name]=30;


break;



case "Blink":


if(Riftlands.energy>=20){


Riftlands.energy-=20;


Riftlands.log(
"Teleported through the Rift"
);


}


break;


}


return true;


},



tick:function(){


for(let key in this.cooldowns){


if(this.cooldowns[key]>0){

this.cooldowns[key]--;

}


}



}



};





// ======================================================
// LOOT SYSTEM
// ======================================================


Riftlands.loot = {



rarity:function(){


let roll=Math.random();


if(roll<0.05)
return "Legendary";


if(roll<0.20)
return "Epic";


if(roll<0.50)
return "Rare";


return "Common";


},



generate:function(){


let rarity=this.rarity();


let loot;



if(rarity==="Legendary"){


loot="Ancient Alloy";


}


else if(rarity==="Epic"){


loot="Void Crystal";


}


else if(rarity==="Rare"){


loot="Rift Shard";


}


else{


loot="Rift Stone";


}



Riftlands.log(
"Found "+rarity+" loot: "+loot
);


return loot;


}


};




// ======================================================
// STRUCTURE SYSTEM
// ======================================================


Riftlands.structures = {


spawn:function(type,x,z){


let structure={


type:type,


x:x,


z:z,


loot:Riftlands.loot.generate()


};



Riftlands.world.structures.push(
structure
);



Riftlands.log(
"Discovered "+type
);



},



random:function(){


let list=[

"Rift Tower",

"Ancient Temple",

"Crystal Vault",

"Void Shrine",

"Forgotten Laboratory"

];



this.spawn(

list[
Riftlands.random(
0,
list.length-1
)
],


Riftlands.random(-500,500),


Riftlands.random(-500,500)

);



}


};




// ======================================================
// ENEMY DATABASE
// ======================================================


Riftlands.mobs={



RiftStalker:{


health:40,

damage:8,

speed:1.4,

drop:"Rift Shard"


},



AshWalker:{


health:80,

damage:14,

speed:0.8,

drop:"Ash Core"


},



VoidWisp:{


health:25,

damage:20,

speed:2,

drop:"Void Crystal"


},



CrystalGolem:{


health:300,

damage:30,

speed:0.4,

drop:"Crystal Heart"


},



RiftKnight:{


health:150,

damage:25,

speed:1,

drop:"Ancient Alloy"


}


};




// ======================================================
// BOSS SYSTEM
// ======================================================


Riftlands.bosses={



spawn:function(name){



if(!Riftlands.config.bosses)
return;



let bosses={


"Rift Guardian":{

health:2000,

damage:35

},



"Void Serpent":{

health:5000,

damage:50

},



"Ancient Core":{

health:10000,

damage:80

}



};



let boss=bosses[name];


if(!boss)
return;



Riftlands.boss={


active:true,

name:name,

health:boss.health,

maxHealth:boss.health,

damage:boss.damage


};



Riftlands.log(

"Boss appeared: "+name

);



},




damage:function(amount){



if(!this.boss.active)
return;



this.boss.health-=amount;



if(this.boss.health<=0){



this.boss.active=false;



Riftlands.log(

this.boss.name+
" defeated!"

);



Riftlands.addXP(500);



Riftlands.shards+=10;



}



}


};
// ======================================================
// RIFT WORLD SIMULATION ENGINE
// ======================================================


Riftlands.generator = {


blocks:[

"RiftStone",

"VoidStone",

"CrystalBlock",

"AshGrass",

"AncientBrick",

"RiftOre"

],



generateChunk:function(x,z){


let chunk={

x:x,

z:z,

blocks:[],

structures:[]

};



let biome=
Riftlands.world.biome;



for(let bx=0;bx<16;bx++){


for(let bz=0;bz<16;bz++){


let height =
Math.floor(
Math.sin(
(x+bx)*0.1
)
*
5
+
Math.cos(
(z+bz)*0.1
)
*
5
+
20
);



let column=[];



for(let y=0;y<height;y++){



let block;



if(y===height-1){



if(biome==="Ashen Forest")
block="AshGrass";

else
block="RiftGrass";


}



else if(y<5){



block="VoidStone";



}



else{



block=this.blocks[
Riftlands.random(
0,
this.blocks.length-1
)
];



}



column.push({

x:bx,

y:y,

z:bz,

block:block


});



}



chunk.blocks.push(column);



}



}



if(Math.random()<0.15){



chunk.structures.push(

Riftlands.structures.spawn(

"Rift Tower",

x,

z

)

);



}



return chunk;



}



};




// ======================================================
// MINING / RESOURCE SYSTEM
// ======================================================


Riftlands.mining={



mine:function(block){



let drops={


RiftOre:"RiftShard",


VoidStone:"VoidCrystal",


AncientBrick:"AncientAlloy",


CrystalBlock:"VoidCrystal"



};



let drop=drops[block];



if(drop){


Riftlands.addItem(drop);


Riftlands.log(

"Obtained "+drop

);


}



},



};


Riftlands.inventory={};



Riftlands.addItem=function(item){



if(!this.inventory[item]){


this.inventory[item]=0;


}



this.inventory[item]++;


this.save();



};




// ======================================================
// CRAFTING SYSTEM
// ======================================================


Riftlands.crafting={



recipes:{



RiftBlade:{


materials:{


RiftShard:5,

AncientAlloy:2


}


},



VoidBow:{


materials:{


VoidCrystal:8,

AncientAlloy:3


}


},



CrystalStaff:{


materials:{


VoidCrystal:10,

RiftShard:10


}


}



},




craft:function(name){



let recipe=this.recipes[name];


if(!recipe)
return false;



for(let item in recipe.materials){



if(
!Riftlands.inventory[item] ||
Riftlands.inventory[item]
<
recipe.materials[item]
){


Riftlands.log(
"Missing materials"
);


return false;


}



}



for(let item in recipe.materials){



Riftlands.inventory[item]
-=recipe.materials[item];


}



Riftlands.addItem(name);



Riftlands.log(
"Crafted "+name
);



return true;



}



};




// ======================================================
// QUEST SYSTEM
// ======================================================


Riftlands.quests={



active:[],

completed:[],



create:function(){



let quests=[


{

name:"Crystal Hunter",

goal:"Collect 10 Rift Shards",

reward:100


},


{

name:"Guardian Slayer",

goal:"Defeat Rift Guardian",

reward:500


},


{

name:"Void Explorer",

goal:"Discover a Void Shrine",

reward:250


}



];



let quest=
quests[
Riftlands.random(
0,
quests.length-1
)

];



this.active.push(quest);



Riftlands.log(

"New quest: "+
quest.name

);



},



complete:function(quest){



this.completed.push(quest);


Riftlands.addXP(
quest.reward
);


Riftlands.log(
"Quest completed!"
);



}



};




// ======================================================
// WEATHER SYSTEM
// ======================================================


Riftlands.weather={



current:"Clear",



change:function(){


let weather=[


"Clear",

"Rift Storm",

"Void Rain",

"Crystal Wind"


];



this.current=
weather[
Riftlands.random(
0,
weather.length-1
)

];



Riftlands.log(
"Weather: "+
this.current
);



}



};




// ======================================================
// DIMENSION EFFECTS
// ======================================================


Riftlands.effects={



apply:function(){



if(!Riftlands.dimension)
return;



// passive Rift energy regeneration

if(
Riftlands.energy<100
){


Riftlands.energy+=0.1;


}



// random events

if(
Math.random()<0.0005
){


Riftlands.events.random();


}



}



};




// ======================================================
// FINAL UPDATE HOOK EXTENSION
// ======================================================


if(typeof ModAPI!=="undefined"){


try{


ModAPI.addEventListener(

"update",

function(){


Riftlands.effects.apply();



}

);



}

catch(e){}



}


// ======================================================
// END OF RIFTLANDS CORE
// ======================================================
// ======================================================
// ADVANCED COMBAT ENGINE
// ======================================================


Riftlands.combat = {


damageMultiplier:function(){


return 1 +
(
Riftlands.level *
0.05
);


},



attack:function(target,weapon){



if(!target || !target.health)
return;



let item=
Riftlands.items[weapon];



let damage=1;



if(item){

damage=item.damage || 5;


}



damage*=this.damageMultiplier();



target.health-=damage;



Riftlands.log(

weapon+
" dealt "+
Math.floor(damage)+
" damage"

);



if(target.health<=0){


target.alive=false;


Riftlands.enemyDefeated(target);


}



},



critical:function(){



return Math.random()<0.15;



},



calculate:function(base){



let damage=base;



if(this.critical()){


damage*=2;


Riftlands.log(
"Critical hit!"
);


}



return damage;



}



};




// ======================================================
// ENEMY DEFEAT SYSTEM
// ======================================================


Riftlands.enemyDefeated=function(enemy){



Riftlands.addXP(
enemy.health/2
);



if(enemy.drop){


Riftlands.addItem(
enemy.drop
);


}



Riftlands.log(

enemy.type+
" defeated"

);



};




// ======================================================
// BOSS PHASE SYSTEM
// ======================================================


Riftlands.bossAI={



phase:1,



update:function(){



let boss=
Riftlands.boss;



if(!boss.active)
return;



let percent=
boss.health /
boss.maxHealth;



if(percent<=0.75 &&
this.phase===1){



this.phase=2;



Riftlands.log(

boss.name+
" entered Phase 2"

);



this.phaseTwo();



}



if(percent<=0.50 &&
this.phase===2){



this.phase=3;


Riftlands.log(

boss.name+
" entered Phase 3"

);



this.phaseThree();



}



if(percent<=0.25 &&
this.phase===3){



this.phase=4;



Riftlands.log(

boss.name+
" is enraged!"

);



this.phaseFour();



}



},



phaseTwo:function(){


Riftlands.log(
"Boss attacks become faster"
);


},



phaseThree:function(){


Riftlands.log(
"Boss summons minions"
);


Riftlands.spawnEnemy(
"RiftStalker"
);


Riftlands.spawnEnemy(
"VoidWisp"
);



},



phaseFour:function(){


Riftlands.log(
"The Rift is collapsing"
);



Riftlands.events.start(
"Rift Storm"
);



}



};




// ======================================================
// WEAPON ENCHANTMENT SYSTEM
// ======================================================


Riftlands.enchant={



types:{


"Void":{
damage:1.25,
effect:"Void Damage"
},


"Crystal":{
damage:1.15,
effect:"Crystal Burst"
},


"Ancient":{
damage:1.5,
effect:"Ancient Power"
}


},



apply:function(item,type){



let enchant=
this.types[type];



if(!enchant)
return;



item.enchantment=type;


item.damage*=enchant.damage;



Riftlands.log(

item.name+
" enchanted with "+
type

);



}



};




// ======================================================
// ARMOR SYSTEM
// ======================================================


Riftlands.armor={



equipped:null,



equip:function(name){



let armor=
Riftlands.items[name];



if(!armor)
return;



this.equipped=armor;



Riftlands.log(

"Equipped "+
name

);



},



defense:function(){



if(!this.equipped)
return 0;



return this.equipped.defense;



}



};




// ======================================================
// RIFT SKILL TREE
// ======================================================


Riftlands.skills={



points:0,



skills:{


"VoidPower":{

level:0,
max:5,
description:
"Increase damage"

},


"CrystalHeart":{

level:0,
max:5,
description:
"Increase health"

},


"RiftMaster":{

level:0,
max:3,
description:
"Reduce ability cooldowns"

}



},




upgrade:function(skill){



let s=this.skills[skill];


if(!s)
return;



if(s.level>=s.max){

Riftlands.log(
"Skill maxed"
);

return;

}



if(this.points<=0){

Riftlands.log(
"No skill points"
);

return;

}



s.level++;

this.points--;



Riftlands.log(

skill+
" upgraded"

);



}



};




// ======================================================
// ACHIEVEMENTS
// ======================================================


Riftlands.achievements={



list:{



"FirstStep":false,

"FirstShard":false,

"BossHunter":false,

"RiftLegend":false



},



unlock:function(name){



if(this.list[name]===false){


this.list[name]=true;


Riftlands.log(

"Achievement unlocked: "+
name

);


}



}



};




// ======================================================
// FINAL BOSS UPDATE HOOK
// ======================================================


if(typeof ModAPI!=="undefined"){


try{


ModAPI.addEventListener(

"update",

function(){


Riftlands.bossAI.update();



}

);



}

catch(e){}



}


// ======================================================
// END ADVANCED SYSTEMS
// ======================================================
// ======================================================
// RIFT HUD + VISUAL SYSTEM
// ======================================================


Riftlands.visuals = {


bossBar:function(){


if(!Riftlands.boss.active)
return;


let boss=
Riftlands.boss;



let percent=Math.floor(

boss.health /
boss.maxHealth *
100

);



try{


ModAPI.displayToChat(

"§4██████████████ §c"+
boss.name+
" §f"+
percent+
"%"

);



}
catch(e){}



},




playerStatus:function(){


try{


ModAPI.displayToChat(

"§5[Rift Energy] §f"+
Math.floor(
Riftlands.energy
)+
"/100"

);



}
catch(e){}



}



};




// ======================================================
// RIFT PARTICLE ENGINE
// ======================================================


Riftlands.particles={



active:[],



spawn:function(type,x,y,z){


let particle={


type:type,


x:x,


y:y,


z:z,


life:100



};



this.active.push(
particle
);



},



update:function(){



for(
let i=this.active.length-1;
i>=0;
i--
){


let p=this.active[i];


p.life--;



if(p.life<=0){


this.active.splice(
i,
1
);


}



}



},




riftBurst:function(){



for(let i=0;i<20;i++){


this.spawn(

"RiftEnergy",


Math.random()*10,


Math.random()*10,


Math.random()*10


);



}



}



};




// ======================================================
// LOOT CHEST SYSTEM
// ======================================================


Riftlands.chests={



active:[],



create:function(x,y,z){


let chest={


x:x,


y:y,


z:z,


opened:false,


loot:


Riftlands.loot.generate()



};



this.active.push(
chest
);



Riftlands.log(
"Ancient chest discovered"
);



},




open:function(chest){



if(chest.opened)
return;



chest.opened=true;



Riftlands.addItem(
chest.loot
);



Riftlands.log(

"Chest opened: "+
chest.loot

);



}



};




// ======================================================
// RANDOM WORLD DISCOVERY
// ======================================================


Riftlands.discovery={



discover:function(type){



if(
Riftlands.world.discovered
.indexOf(type)
!==-1
)
return;



Riftlands.world.discovered.push(
type
);



Riftlands.achievements.unlock(
"FirstStep"
);



Riftlands.log(

"Discovered: "+
type

);



Riftlands.save();



}



};




// ======================================================
// RIFT COMPASS SYSTEM
// ======================================================


Riftlands.compass={



target:null,



setTarget:function(x,z){


this.target={

x:x,

z:z

};



},



distance:function(px,pz){



if(!this.target)
return 0;



let dx=
this.target.x-px;


let dz=
this.target.z-pz;



return Math.floor(

Math.sqrt(

dx*dx+
dz*dz

)

);



}



};




// ======================================================
// RIFT WEATHER EFFECTS
// ======================================================


Riftlands.weatherEffects={



storm:function(){



if(!Riftlands.dimension)
return;



for(let i=0;i<50;i++){



Riftlands.particles.spawn(

"VoidLightning",


Riftlands.random(-50,50),


100,


Riftlands.random(-50,50)

);



}



Riftlands.log(
"Void lightning strikes"
);



}



};




// ======================================================
// SAVE VERSION CONTROL
// ======================================================


Riftlands.saveVersion=1;



Riftlands.migrate=function(){



let version=
localStorage.getItem(
"riftlands_version"
);



if(!version){



localStorage.setItem(

"riftlands_version",

this.saveVersion

);



return;

}



if(
Number(version)
<
this.saveVersion
){



Riftlands.log(
"Save upgraded"
);



localStorage.setItem(

"riftlands_version",

this.saveVersion

);



}



};




// ======================================================
// FULL UPDATE LOOP
// ======================================================


Riftlands.fullTick=function(){



Riftlands.particles.update();



Riftlands.visuals.bossBar();



Riftlands.visuals.playerStatus();



if(
Riftlands.config.particles &&
Math.random()<0.01
){



Riftlands.particles.riftBurst();



}



};





if(typeof ModAPI!=="undefined"){


try{


ModAPI.addEventListener(

"update",

function(){


Riftlands.fullTick();


}

);



}

catch(e){}



}



// ======================================================
// MOD INFORMATION
// ======================================================


Riftlands.info=function(){


Riftlands.log(
"Riftlands Expansion v1.0"
);


Riftlands.log(
"Custom dimension system active"
);


Riftlands.log(
"Explore. Fight. Upgrade."
);


};



// ======================================================
// FINAL INITIALIZATION
// ======================================================


setTimeout(function(){


Riftlands.migrate();


Riftlands.info();



},1000);

})();
