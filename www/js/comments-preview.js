document.addEventListener('DOMContentLoaded', () => {

    const previewOpeners = document.querySelectorAll('.comment-preview-opener')

    previewOpeners.forEach(opener => {
        const post = opener.getAttribute('post-id')
        const targetPopup = document.querySelector(`.comments-preview[post-id="${post}"]`)
        const targetPopupCloser = targetPopup.querySelector('.close-popup')

        opener.addEventListener('click', event => {
            event.preventDefault()

            targetPopup.classList.remove('hide')
            targetPopupCloser.addEventListener('click', event => {
                event.preventDefault()
                targetPopup.classList.add('hide')
            })
        })
    })

})
