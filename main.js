document.addEventListener('DOMContentLoaded', () => {
    const likeButtons = document.querySelectorAll('.blog-post__like-btn');

    likeButtons.forEach(button => {
        button.addEventListener('click', () => {
            const postId = button.getAttribute('data-post-id');
            const likeCount = document.getElementById(`like-count-${postId}`);
            const icon = button.querySelector('i');

            const likedPosts = JSON.parse(localStorage.getItem('likedPosts') || '{}');
            const likeCounts = JSON.parse(localStorage.getItem('likeCounts') || '{}');

            if (!likeCounts[postId]) likeCounts[postId] = parseInt(likeCount.textContent);

            if (likedPosts[postId]) {
                likedPosts[postId] = false;
                likeCounts[postId]--;
                icon.classList.remove('bxs-heart');
                icon.classList.add('bx-heart');
                button.classList.remove('blog-post__like-btn--active');
            } else {
                likedPosts[postId] = true;
                likeCounts[postId]++;
                icon.classList.remove('bx-heart');
                icon.classList.add('bxs-heart');
                button.classList.add('blog-post__like-btn--active');
            }

            likeCount.textContent = likeCounts[postId];

            localStorage.setItem('likedPosts', JSON.stringify(likedPosts));
            localStorage.setItem('likeCounts', JSON.stringify(likeCounts));
        });
    });

    const initLikeStates = () => {
        const likedPosts = JSON.parse(localStorage.getItem('likedPosts') || '{}');
        const likeCounts = JSON.parse(localStorage.getItem('likeCounts') || '{}');

        likeButtons.forEach(button => {
            const postId = button.getAttribute('data-post-id');
            const likeCount = document.getElementById(`like-count-${postId}`);
            const icon = button.querySelector('i');

            if (likeCounts[postId] !== undefined) {
                likeCount.textContent = likeCounts[postId];
            }

            if (likedPosts[postId]) {
                icon.classList.remove('bx-heart');
                icon.classList.add('bxs-heart');
                button.classList.add('blog-post__like-btn--active');
            }
        });
    };

    initLikeStates();
});
