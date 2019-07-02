console.log('client side js is loaded')

const wetherForm = document.querySelector('form')
const searchTag = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')



wetherForm.addEventListener('submit',(e)=>{
    e.preventDefault()
    messageOne.textContent = 'Loding...'
    fetch('/wether?address='+searchTag.value).then((response) => {    
    response.json().then((data) => {
            if (data.error) {
                messageOne.textContent = data.error
            } else {
                messageOne.textContent = data.location
                messageTwo.textContent=  data.forecast
            }
        })
    })
})     