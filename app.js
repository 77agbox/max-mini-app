async function showClubs(){

const response = await fetch("clubs.json")

const clubs = await response.json()

let html=""

clubs.forEach(c=>{

html += `
<div class="card">

<h3>${c.name}</h3>

<p>Возраст: ${c.age}</p>

<p>Адрес: ${c.address}</p>

<p>Педагог: ${c.teacher}</p>

<a href="${c.link}">
<button>Записаться</button>
</a>

</div>
`

})

document.getElementById("content").innerHTML = html

}
