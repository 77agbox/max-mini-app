let clubs = []

async function loadClubs(){

const response = await fetch("clubs.json")

const data = await response.json()

// преобразуем русский JSON в удобный формат

clubs = data.map(c => ({

direction: c["Наименование третьего уровня РБНДО"],

name: c["Наименование детского объединения"],

age: c["Возраст"],

address: c["Адрес предоставления услуги"],

teacher: c["Педагог"] || "не указан",

link: c["Ссылка"]

}))

renderClubs(clubs)

}

function renderClubs(list){

const container = document.getElementById("clubs")

container.innerHTML = ""

list.forEach(c => {

container.innerHTML += `

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

function searchClubs(){

const text = document
.getElementById("search")
.value
.toLowerCase()

const filtered = clubs.filter(c =>

c.name.toLowerCase().includes(text) ||

c.direction.toLowerCase().includes(text) ||

c.teacher.toLowerCase().includes(text) ||

c.address.toLowerCase().includes(text)

)

renderClubs(filtered)

}

loadClubs()
