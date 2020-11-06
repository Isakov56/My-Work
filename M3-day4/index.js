fetch('https://striveschool-api.herokuapp.com/books', {
    'method': 'GET'
}).then(res => res.json())
.then(body => {
    const myFunction = function(){
        const myArray = []
     for (let i = 0; i < body.length; i++) {
        myArray.push(body[i].title)
     }
     console.log(myArray)
    }
    myFunction()
    

    
})