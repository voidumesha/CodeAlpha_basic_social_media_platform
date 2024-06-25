document.addEventListener('DOMContentLoaded', () => {
    loadFeed();
});

function loadFeed() {
    fetch('/api/feed')
        .then(response => response.json())
        .then(posts => {
            const content = document.getElementById('content');
            content.innerHTML = '';
            posts.forEach(post => {
                const postElement = document.createElement('div');
                postElement.className = 'post';
                postElement.innerHTML = `
                    <h2>${post.title}</h2>
                    <p>${post.body}</p>
                    <button onclick="likePost('${post._id}')">Like (${post.likes})</button>
                    <div>
                        <h3>Comments</h3>
                        <div>${post.comments.map(comment => `<p>${comment}</p>`).join('')}</div>
                        <input type="text" id="comment-${post._id}" placeholder="Add a comment">
                        <button onclick="addComment('${post._id}')">Comment</button>
                    </div>
                `;
                content.appendChild(postElement);
            });
        });
}

function likePost(postId) {
    fetch(`/api/posts/${postId}/like`, { method: 'POST' })
        .then(() => loadFeed());
}

function addComment(postId) {
    const commentInput = document.getElementById(`comment-${postId}`);
    const comment = commentInput.value;
    fetch(`/api/posts/${postId}/comment`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ comment })
    }).then(() => {
        commentInput.value = '';
        loadFeed();
    });
}
