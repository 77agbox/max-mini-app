let clubs = []

async function loadClubs(){

const response = await fetch("clubs.json")

const data = await response.json()

clubs = data.map(c => ({

direction: c["Наименование третьего уровня РБНДО"],

name: c["Наименование детского объединения"],

age: c["Возраст"],

address: c["Адрес предоставления услуги"],

teacher: c["Педагог"] || "не указан",

link: c["Ссылка"]

}))

updateFilters(clubs)

renderClubs(clubs)

}

function parseAge(ageString){

if(!ageString) return {min:0,max:99}

if(ageString.includes("+")){

return {

min:parseInt(ageString),

max:99

}

}

const parts=ageString.split("-")

return {

min:parseInt(parts[0]),

max:parseInt(parts[1])

}

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

function updateFilters(list){

const addresses=[...new Set(list.map(c=>c.address))]
const directions=[...new Set(list.map(c=>c.direction))]

fillSelect("addressFilter",addresses)
fillSelect("directionFilter",directions)

}

function fillSelect(id,values){

const select=document.getElementById(id)

const current=select.value

select.innerHTML=`<option value="">${select.id==="addressFilter"?"Адрес":"Направление"}</option>`

values.sort().forEach(v=>{

const option=document.createElement("option")

option.value=v

option.textContent=v

select.appendChild(option)

})

select.value=current

}

function filterClubs(){

const text=document
.getElementById("search")
.value
.toLowerCase()

const ageInput=document
.getElementById("ageInput")
.value

const address=document
.getElementById("addressFilter")
.value

const direction=document
.getElementById("directionFilter")
.value

let filtered=clubs.filter(c=>{

const nameMatch=c.name.toLowerCase().includes(text)

const dirMatch=c.direction.toLowerCase().includes(text)

const teacherMatch=c.teacher.toLowerCase().includes(text)

return nameMatch||dirMatch||teacherMatch

})

if(ageInput){

filtered=filtered.filter(c=>{

const age=parseAge(c.age)

return ageInput>=age.min && ageInput<=age.max

})

}

if(address){

filtered=filtered.filter(c=>c.address===address)

}

if(direction){

filtered=filtered.filter(c=>c.direction===direction)

}

updateFilters(filtered)

renderClubs(filtered)

}

loadClubs()
