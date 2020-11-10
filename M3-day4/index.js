const bookCard = (song) => {
   return `
       <img class="img-fluid" src="${song.album.cover}" style="width:10rem; height:12rem;"/>
       <p style="color:white">
       Title: ${song.album.title}
       <br/>
       Category: ${song.artist.name}
       </p style="color:white">`
}

let query = 'eminem'

const changeHandler = (event) => {
    query = event.target.value.toLowerCase()
}

headers = new Headers ({
    "x-rapidapi-key": "27306e4301msh978be9559c7efaap13b3d3jsn3fdc810abb52",
	"x-rapidapi-host": "deezerdevs-deezer.p.rapidapi.com"
})
const search = () =>{
    fetch('https://deezerdevs-deezer.p.rapidapi.com/search?q=' + query, {
    'method': 'GET',
    headers
  })
 .then((res) => {
     return res.json()
 })
 .then((songs) => {
       console.log(songs)
       document.querySelector(".d-flex .main h2").innerText = query
       const booksInfo = songs.data
       const divRow = document.querySelector('.d-flex .main .row')

       divRow.innerHTML = ""

       booksInfo.forEach((song) => {
       const divCol = document.createElement('div')
       divCol.className = 'col col-lg-3 text-center'
       divCol.innerHTML = bookCard(song)
       divRow.appendChild(divCol)
       })   
   })
   .catch((err) => {
       console.error(err)
   })
}

window.onload = () => search()
