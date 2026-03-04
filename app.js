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

createFilters()

renderClubs(clubs)

}

function createFilters(){

const ages = [...new Set(clubs.map(c=>c.age))]
const addresses = [...new Set(clubs.map(c=>c.address))]
const directions = [...new Set(clubs.map(c=>c.direction))]

fillSelect("ageFilter",ages)
fillSelect("addressFilter",addresses)
fillSelect("directionFilter",directions)

}

function fillSelect(id,values){

const select=document.getElementById(id)

values.sort().forEach(v=>{

const option=document.createElement("option")

option.value=v
option.textContent=v

select.appendChild(option)

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

const age=document
.getElementById("ageFilter")
.value

const address=document
.getElementById("addressFilter")
.value

const direction=document
.getElementById("directionFilter")
.value

let filtered=clubs.filter(c=>

c.name.toLowerCase().includes(text) ||
c.direction.toLowerCase().includes(text) ||
c.teacher.toLowerCase().includes(text)

)

if(age) filtered=filtered.filter(c=>c.age===age)

if(address) filtered=filtered.filter(c=>c.address===address)

if(direction) filtered=filtered.filter(c=>c.direction===direction)

renderClubs(filtered)

}

loadClubs()
