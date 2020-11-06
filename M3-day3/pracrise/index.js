fetch('http://www.splashbase.co/api/v1/images/search?query=city',{
     'method': 'GET'
}).then(res => res.json())
.then(body => { console.log(body.images[0].url)
    const imageLoader = function(){
        
    for (let i = 0; i < body.images.length; i++) {
        const imgJs = document.querySelectorAll('div.card img')
        imgJs[i].src = body.images[i].url
    }
    }
    const loaderJs = document.querySelector('.loader')
    loaderJs.addEventListener('click', imageLoader())
})

fetch('http://www.splashbase.co/api/v1/images/search?query=sea',{
     'method': 'GET'
}).then(res => res.json())
.then(body => {
    const loade2Image = function(){
        for (let i = 0; i < body.images.length; i++) {
            const imgJs = document.querySelectorAll('div.card img')
            imgJs[i].src = body.images[i].url
        }
    }
    const loaderJs = document.querySelector('.loader2')
    loaderJs.addEventListener('click', loade2Image)
})

let viewJs = document.querySelectorAll('.view')

    for (let i = 0; i < viewJs.length; i++) {
        viewJs[i].addEventListener('click', function() {
        const allImages  = document.querySelectorAll('div.card img')
    let modal = `
    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <img src='${allImages[i].url}'
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
          <button type="button" class="btn btn-primary">Save changes</button>
        </div>
      </div>
    </div>
  </div>`
  document.body.innerHTML = document.body.innerHTML + modal
        
})
    }
    
