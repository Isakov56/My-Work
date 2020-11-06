


//Save Album Options
let albumOptions = document.querySelector('.save-album-options i')
let optionList = document.querySelector('.save-album-options ul')
let saveAlbum = document.querySelector('.save-album-options ul li:nth-of-type(1)')

albumOptions.addEventListener('click', function(){
    if(optionList.style.opacity !== '1'){
        optionList.style.opacity = '1'
        optionList.style.transition = 'opacity 1s ease, margin-left .3s ease'
        optionList.style.marginLeft = '0'

    }
    else{
        optionList.style.opacity = '0'
        optionList.style.transition = 'opacity .4s ease, margin-left .3s ease'
        optionList.style.marginLeft = '-20px'
    }
    
})


//TRACKLIST ELEMENTS
let albumTrackList = document.querySelector('.album-track-list')
let albumTrack = document.querySelector('.album-track')

//OPTIONS ELEMENTS
let dislike = document.querySelector('.like .far')
let like = document.querySelector('.like .fas')
let favAdded = document.querySelector('.album-options p')

//Add Album

//Image Album
let albumCont = document.querySelector('.img-album')

//Album Infos
let titleAlbum = document.querySelector('.title-album h4')
let artistAlbum = document.querySelector('.title-album p')
let albumDetails = document.querySelector('.album-details')
let artistSong = document.querySelector('.title-artist p')
let albumImg = document.querySelector('.img-album img')

//Album button
let addImg = document.querySelector('.fa-plus')

//Available albums
let availableAlbums = document.querySelectorAll('.modal-body ul li')
let availableTitle = document.querySelectorAll('.available-title')
let availableArtist = document.querySelectorAll('.available-artist')
let availableDetails = document.querySelectorAll('.available-details')

//AVAILABLES COVER
let albumBg = [
    './Media/queenRemaster.jpg',
    './Media/miracle.jpg'
]

//SONG TITLES
let songTitles = []

let remasterTitles = [
    'Procession ',
    'Father to Son ',
    'White Queen (As it Began) ',
    'Some Day One Day ',
    'The Loser in the End ',
    'Ogre Battle ',
    "The Fairy Feller's Master-Stroke ",
    'Nevermore ',
    'The March of the Black Queen ',
    'Funny How Love Is ',
    'Seven Seas of Rhye ',
]

let miracleTitles = [
    'Party',
    "Khashoggi's Ship",
    "The Miracle",
    "I Want It All",
    "The Invisible Man",
    "Breakthru",
    "Rain Must Fall",
    "Scandal",
    "My Baby Does Me",
    "Was It All Worth It",
    "Hang On in There (B-Side)",
    "Chinese Torture"
]

songTitles.push(remasterTitles)
songTitles.push(miracleTitles)


//SONGS LENGTH
let tracksLength = []

let remasterLenght = [
    '1:13',
    '6:13',
    '4:33',
    '4:22',
    '4:01',
    '4:08',
    '2:40',
    '1:18',
    '6:32',
    '2:49',
    '2:48',
]

let miracleLenght = [
    '2:24',
    '2:47',
    '5:02',
    '4:41',
    '3:55',
    '4:07',
    '4:20',
    '4:42',
    '3:22',
    '5:45',
    '3:46',
    '1:46',
]

tracksLength.push(remasterLenght)
tracksLength.push(miracleLenght)

//Album Title (SONG DETAIL)

let albumTitleSD = []

let remaster = ' - Remaster 2011'
let miracle = ' - The Miracle'

albumTitleSD.push(remaster)
albumTitleSD.push(miracle)



//ALBUM LIST

let allAlbum = []

//CREATE ALBUM PAGE
for(let b = 0; b < availableAlbums.length; b++){

    //CREATE TRACKLIST
    let createTrack = function(){
    
        for( let a = 0; a < songTitles[b].length; a++){
            let clonedSong = albumTrack.cloneNode(true)
            clonedSong.className = 'album-track'
        
            let titleSong = document.querySelectorAll('.title-song span:nth-of-type(1) h6')
            let titleAlbum = document.querySelectorAll('.title-song span:nth-of-type(2) h6')
            let songLength = document.querySelectorAll('.album-track .length')
        
            titleSong[a].innerText = songTitles[b][a]
            titleAlbum[a].innerText = albumTitleSD[b]
            songLength[a].innerText = tracksLength[b][a]

            let iconTrack = document.querySelectorAll('.album-track .title .fa-music')
            
            clonedSong.addEventListener('click', function(){
                iconTrack[a].style.animation=
            })
        
            albumTrackList.appendChild(clonedSong)
        
        }
    
    }

    //CREATE ALBUM PAGE
    availableAlbums[b].addEventListener('click', function(){
        albumImg.src = albumBg[b]
        titleAlbum.innerText = availableTitle[b].innerText
        artistAlbum.innerText = availableArtist[b].innerText
        artistSong.innerText = availableArtist[b].innerText
        albumDetails.innerText = availableDetails[b].innerText
        albumCont.removeChild(addImg)
        createTrack()
        //PUSH ALBUM ON THE ARRAY
        let completedALbum = document.querySelector('#page-content')
        completedALbum.classList.add('newAlbum'+ b)
        allAlbum.push(completedALbum)


    })
}
localStorage.setItem('newAlbum', JSON.stringify(allAlbum[allAlbum.length - 1]))

window.onload = function(){
    let createdAlbum = localStorage.getItem('newAlbum')
    document.body.appendChild(createdAlbum)
}

//LIKE BUTTON
like.addEventListener('click', function(){
    if(like.style.opacity !== '0'){
        like.style.opacity = '0'
    }
    else{
        like.style.opacity = '1'
        favAdded.style.display = 'block'
        setTimeout(function(){favAdded.style.display = 'none'}, 300)
    }
})
