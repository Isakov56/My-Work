fetch("https://rapidapi.p.rapidapi.com/search?q=eminem", {
	"method": "GET",
	"headers": {
		"x-rapidapi-key": "27306e4301msh978be9559c7efaap13b3d3jsn3fdc810abb52",
		"x-rapidapi-host": "deezerdevs-deezer.p.rapidapi.com"
	}
})
.then(response => response.json())
.then(imageEminem => {
    const imgJs = document.createElement('img')
    imgJs.src = imageEminem.data[0].album.cover
    console.log(imgJs)
    const newJs = document.querySelector('.container')
    newJs.appendChild(imgJs)   

    
})

	
.catch(err => {
	console.error(err);
});
//imageEminem.data[0].album.cover
//console.log(Image)
//const hlJs = document.querySelector('.hl')
//console.log(hlJs)


//document.body.appendChild(imgJs)




const lister = function(){
    const inputJs = document.querySelector('input')
    const divJs = document.getElementsByClassName('container')[0]
    const newElemnt = document.createElement('li')
    newElemnt.innerText = inputJs.value
    const ulJs = document.createElement('ul')
    ulJs.appendChild(newElemnt)
    divJs.appendChild(ulJs)
}

