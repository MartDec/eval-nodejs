document.addEventListener('DOMContentLoaded', () => {

    const host = `${location.protocol}//${location.host}`
    const adminActions = document.querySelectorAll('.admin-actions a')
    const updateFormWrapper = document.querySelector('.update-form')
    const updateForm = updateFormWrapper.querySelector('form')

    const toggleUpdateForm = () => {
        updateFormWrapper.classList.toggle('hide')
        const updateBtn = document.querySelector('.admin-actions a[action-type="update"]')
        updateBtn.innerText = updateBtn.innerText === 'update' ? 'cancel' : 'update'
    }

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
                    toggleUpdateForm()
                    break
                case 'delete':
                    deletePost(event)
                    break
            }
        })
    })

    updateForm.addEventListener('submit', event => {
        event.preventDefault()

        const postId = event.target.querySelector('#post-id').value
        const options = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                headline: event.target.querySelector('#headline').value,
                body: event.target.querySelector('#body').value
            })
        }

        fetch(`${host}/post/${postId}`, options)
            .then(response => response.ok ? response.json() : response.statusText)
            .then(data => {
                event.target.querySelector('#headline').value = data.headline
                event.target.querySelector('#body').value = data.body
                document.getElementById('post-headline').innerText = data.headline
                document.getElementById('post-body').innerText = data.body
                toggleUpdateForm()
            })
            .catch(error => console.error(error))
    })

})