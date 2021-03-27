document.addEventListener('DOMContentLoaded', () => {

    const likeWrappers = document.querySelectorAll('.like-wrapper')

    likeWrappers.forEach(like => {
        like.addEventListener('click', event => {
            event.preventDefault()

            const spans = like.querySelectorAll('span')
            spans.forEach(span => {
                span.classList.toggle('hide')
            })
        })
    })

})