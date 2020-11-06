/* LOGIN PAGE-------------------------------------------------------------------------------------------------------- */

let emailText = document.querySelector('#email-text')
let usernameText = document.querySelector('#username-text')
let passText = document.querySelector('#pass-text')
let saveChange = document.querySelector('#save-change')
let emailUserLogin = document.querySelector('#email-user-login')
let passLogin = document.querySelector('#pass-login')
let loginButton = document.querySelector('#login')

let credentials = []


saveChange.addEventListener('click', function(){

    let userId = {
        email : '',
        username : '',
        password : '',
    }

    userId.email = emailText.value
    userId.username = usernameText.value
    userId.pass = passText.value

    credentials.push(userId)

    emailText.value = ''
    usernameText.value = ''
    passText.value = ''

})

loginButton.addEventListener('click', function(){
    for(let lgin = 0; lgin < credentials.length; lgin++){
        
        
        if(emailUserLogin.value === credentials[lgin].email || emailUserLogin.value === credentials[lgin].username && passLogin.value === credentials[lgin].pass){
            window.location.href = 'home.html'
        }

        
    }
    emailUserLogin.value = ''
    passLogin.value = ''
})

