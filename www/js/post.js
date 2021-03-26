document.addEventListener('DOMContentLoaded', () => {

    const host = `${location.protocol}//${location.host}`
    const adminActions = document.querySelectorAll('.admin-actions a')
    const updateForm = document.querySelector('.update-form')

    const deletePost = event => {
        const confirmDelete = confirm('Do you want to delete this post ?')
        if (confirmDelete) {
            const options = { method: 'DELETE' }
            fetch(`${host}/post/${event.target.getAttribute('post-id')}`, options)
                .then(response => response.ok ? response.json() : response.statusText)
                .then(data => location = host)
                .catch(error => console.error(error))
        }
    }

    adminActions.forEach(action => {
        action.addEventListener('click', event => {
            event.preventDefault()
            const type = action.getAttribute('action-type')
            switch (type) {
                case 'update':
                    updateForm.classList.toggle('hide')
                    event.target.innerText = event.target.innerText === 'update' ? 'cancel' : 'update'
                    break
                case 'delete':
                    deletePost(event)
                    break
            }
        })
    })

})