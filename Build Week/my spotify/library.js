
let libraryNav = document.querySelectorAll('#library-menu ul li')
let librarySlider = document.getElementById('library-slider')

for( let a = 0; a < libraryNav.length; a++){

    let underline = document.createElement('div')
    underline.className = 'underline'

    libraryNav[a].appendChild(underline)
}

libraryNav[0].addEventListener('click', function(){
    librarySlider.style.marginLeft = '0'
    
})
libraryNav[1].addEventListener('click', function(){
    librarySlider.style.marginLeft = '-100%'
})
libraryNav[2].addEventListener('click', function(){
    librarySlider.style.marginLeft = '-200%'
})
libraryNav[3].addEventListener('click', function(){
    librarySlider.style.marginLeft = '-300%'
})
libraryNav[4].addEventListener('click', function(){
    librarySlider.style.marginLeft = '-400%'
})

//CREATE NEW ALBUM CARD

let newAlbumImageSource = document.querySelector('.modal-body input:nth-of-type(1)')
let newAlbumName = document.querySelector('.modal-body input:nth-of-type(2)')
let newAlbumArtist = document.querySelector('.modal-body input:nth-of-type(3)')
let newAlbumCard = document.querySelector('.library-card-album')
let addNewAlbum = document.querySelector('.modal-footer button')
let albumPage = document.querySelector('#library-album .row')

let newAlbumList = []

newAlbumList.push(newAlbumCard)
    
let createAlbumCard = function(album){
   
 /*    let newAlbum = newAlbumCard.cloneNode(true)
  
    newAlbum.className = 'library-card-album'
    newAlbum.classList.add('col-12')
    newAlbum.classList.add('col-sm-12')
    newAlbum.classList.add('col-md-6')
    newAlbum.classList.add('col-lg-3')

    newAlbumList.push(newAlbum)
    
    newAlbum.style.display = 'inline-flex'
    albumPage.appendChild(newAlbum) */
  
    addNewAlbum.addEventListener('click', function(){
      
        let newImg = document.querySelectorAll('.img-library-album img')
        let newTitle = document.querySelectorAll('.library-card-album a h6')
        let newArtist = document.querySelectorAll('.library-card-album p')
            // create js object
        let album = {
            title: newAlbumName.value,
            image: './Media/' + newAlbumImageSource.value,
            artist:newAlbumArtist.value
            
        }
         // push it to array
        newAlbumList.push(album);
        // store to local
        storeIt("newAlbumList",newAlbumList)
        // re populate albums
        populateAlbums()
    })

}

const populateAlbums = () => {
    const albumsListContainer = document.getElementById("albums-list") 
    // keep addButton
    const addButton = albumsListContainer.firstElementChild.outerHTML
   // remove container
    albumsListContainer.innerHTML=""
     newAlbumList.forEach(album=>{
         // add all albums in the array as columns
        albumsListContainer.innerHTML = `${albumsListContainer.innerHTML} ${AlbumCard(album)}`
    }) 
    // add add button again at  the beggining of row as first col
    albumsListContainer.innerHTML = `${addButton} ${albumsListContainer.innerHTML}`
}
let defaultArray = []


const AlbumCard =  (album) => ` 
    <div
        class="col-12 col-sm-12 col-md-6 col-lg-3 library-card-album">
        <div class="img-library-album">
            <img src="${album.image}" alt="" width="100%" />
        </div>
        <a href="album.html"><h6>${album.title}</h6></a>
        <p>${album.artist}</p>
        <!--<div class="library-play-button">
        <i class="fas fa-plus"></i>
        </div>-->
    </div>
    
    `

window.onload=function(){
    newAlbumList  = getFromStore("newAlbumList")
    if(!newAlbumList){ // if there is no newAlbumList in localStorage
        // create it and save it to localStorage 
        // and overwrite newAlbumList variable in global scope
        newAlbumList =storeIt('newAlbumList',[]);
    }
    populateAlbums()
     
}

const storeIt = (key,value) => {
    localStorage.setItem(key,JSON.stringify(value));// you can only stores string
    return value;
}
const getFromStore = (key) => {
    return JSON.parse(localStorage.getItem(key));
}