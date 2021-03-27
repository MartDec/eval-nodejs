import FetchRequest from "./class/FetchRequest.js";

document.addEventListener('DOMContentLoaded', () => {

    const likeWrappers = document.querySelectorAll('.like-wrapper')

    likeWrappers.forEach(like => {
        like.addEventListener('click', event => {
            event.preventDefault()

            const id = like.getAttribute('entity-id')
            const type = like.getAttribute('entity-type')
            const icon = like.querySelector('.like-icon')
            const counter = like.querySelector('.like-counter .value')

            icon.classList.toggle('liked')
            icon.querySelectorAll('.material-icons')
                .forEach(element => element.classList.toggle('hide'))

            if (icon.classList.contains('liked')) {
                counter.innerText = parseInt(counter.innerText) + 1
                const request = new FetchRequest('like', 'POST', {
                    type: type,
                    id: id
                })
                request.send()
                    .then(data => like.setAttribute('like-id', data._id.toString()))
                    .catch(error => console.error(error))
            } else {
                counter.innerText = parseInt(counter.innerText) - 1
                const likeId = like.getAttribute('like-id')
                const request = new FetchRequest(`like/${likeId}`, 'DELETE')
                request.send()
                    .then(() => like.removeAttribute('like-id'))
                    .catch(error => console.error(error))
            }
        })
    })

})
