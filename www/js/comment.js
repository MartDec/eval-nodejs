document.addEventListener('DOMContentLoaded', () => {

    const host = `${location.protocol}//${location.host}`
    const commentActions = document.querySelectorAll('.comment-wrapper .admin-actions a')
    const commentForms = document.querySelectorAll('.comment-wrapper .update-form')

    const toggleUpdateForm = commentId => {
        const formWrapper = document.querySelector(`.comment-wrapper .update-form[comment-id="${commentId}"]`)
        formWrapper.classList.toggle('hide')
        const updateBtn = document.querySelector(`.comment-wrapper .admin-actions a[action-type="update"][comment-id="${commentId}"]`)
        updateBtn.innerText = updateBtn.innerText === 'update' ? 'cancel' : 'update'
    }

    const deleteComment = commentId => {
        const confirmDelete = confirm('Do you want to delete this comment ?')
        if (confirmDelete) {
            const options = { method: 'DELETE' }
            fetch(`${host}/comment/${commentId}`, options)
                .then(response => response.ok ? response.json() : response.statusText)
                .then(data => document.querySelector(`.comment-wrapper[comment-id="${data._id.toString()}"]`).remove())
                .catch(error => console.error(error))
        }
    }

    const updateComment = comment => {
        const options = {
            method: 'PUT',
            body: JSON.stringify({
                body: comment.body,
                post: comment.post
            }),
            headers: { 'Content-Type': 'application/json' }
        }
        fetch(`${host}/comment/${comment.id}`, options)
            .then(response => response.ok ? response.json() : response.statusText)
            .then(data => {
                document
                    .querySelector(`.comment-wrapper[comment-id="${data._id.toString()}"] .single-comment-body`)
                    .innerHTML = data.body
                toggleUpdateForm(comment.id)
            })
            .catch(error => console.error(error))
    }

    commentActions.forEach(action => {
        action.addEventListener('click', event => {
            event.preventDefault()

            const type = event.target.getAttribute('action-type')
            switch (type) {
                case 'update':
                    toggleUpdateForm(event.target.getAttribute('comment-id'))
                    break
                case 'delete':
                    deleteComment(event.target.getAttribute('comment-id'))
                    break
            }
        })
    })

    commentForms.forEach(form => {
        form.addEventListener('submit', event => {
            event.preventDefault()

            const commentId = event.target.parentElement.getAttribute('comment-id')
            const commentBody = event.target.querySelector('textarea').value
            const commentPost = event.target.getAttribute('post-id')
            updateComment({
                id: commentId,
                body: commentBody,
                post: commentPost
            })
        })
    })

})