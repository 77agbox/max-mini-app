let clubs=[]

let selectedAddress=null
let selectedDirection=null

async function loadClubs(){

const response=await fetch("clubs.json")

const data=await response.json()

clubs=data.map(c=>({

direction:c["Наименование третьего уровня РБНДО"],

name:c["Наименование детского объединения"],

age:c["Возраст"],

address:c["Адрес предоставления услуги"],

teacher:c["Педагог"]||"не указан",

link:c["Ссылка"]

}))

createChips()

renderClubs(clubs)

}

function parseAge(age){

if(!age)return{min:0,max:99}

if(age.includes("+")){

return{min:parseInt(age),max:99}

}

const p=age.split("-")

return{

min:parseInt(p[0]),

max:parseInt(p[1])

}

}

function createChips(){

const addresses=[...new Set(clubs.map(c=>c.address))]
const directions=[...new Set(clubs.map(c=>c.direction))]

const addrContainer=document.getElementById("addressChips")
const dirContainer=document.getElementById("directionChips")

addresses.forEach(a=>{

const chip=document.createElement("div")

chip.className="chip"

chip.textContent=a

chip.onclick=()=>{

selectedAddress=(selectedAddress===a)?null:a

updateChips()

filterClubs()

}

addrContainer.appendChild(chip)

})

directions.forEach(d=>{

const chip=document.createElement("div")

chip.className="chip"

chip.textContent=d

chip.onclick=()=>{

selectedDirection=(selectedDirection===d)?null:d

updateChips()

filterClubs()

}

dirContainer.appendChild(chip)

})

}

function updateChips(){

document.querySelectorAll("#addressChips .chip")
.forEach(c=>{

c.classList.toggle("active",c.textContent===selectedAddress)

})

document.querySelectorAll("#directionChips .chip")
.forEach(c=>{

c.classList.toggle("active",c.textContent===selectedDirection)

})

}

function renderClubs(list){

const container=document.getElementById("clubs")

container.innerHTML=""

list.forEach(c=>{

container.innerHTML+=`

<div class="card">

<h3>${c.name}</h3>

<p><b>Направление:</b> ${c.direction}</p>

<p><b>Возраст:</b> ${c.age}</p>

<p><b>Адрес:</b> ${c.address}</p>

<p><b>Педагог:</b> ${c.teacher}</p>

<a href="${c.link}" target="_blank">

<button>Подробнее / Записаться</button>

</a>

</div>

`

})

}

function filterClubs(){

const text=document
.getElementById("search")
.value
.toLowerCase()

const ageInput=document
.getElementById("ageInput")
.value

let filtered=clubs.filter(c=>

c.name.toLowerCase().includes(text) ||

c.direction.toLowerCase().includes(text) ||

c.teacher.toLowerCase().includes(text)

)

if(ageInput){

filtered=filtered.filter(c=>{

const a=parseAge(c.age)

return ageInput>=a.min && ageInput<=a.max

})

}

if(selectedAddress){

filtered=filtered.filter(c=>c.address===selectedAddress)

}

if(selectedDirection){

filtered=filtered.filter(c=>c.direction===selectedDirection)

}

renderClubs(filtered)

}

loadClubs()
