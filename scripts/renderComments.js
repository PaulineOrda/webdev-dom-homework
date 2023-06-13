const options = { year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric' };

export const renderComments = (comments) => {   
    const commentsHtml = comments.map((comment, index) => {
        return `<li data-index="${index}"class="comment">
          <div class="comment-header">
            <div>${comment.userName}</div>
            <div>${comment.date.toLocaleDateString('ru-RU', options)}</div>
          </div>
          <div class="comment-body">
            <div class="comment-text">
              ${comment.text}
            </div>
          </div>
          <div class="comment-footer">
            <div class="likes">
              <span class="likes-counter">${comment.likeCounter}</span>
              <button data-index="${index}"class="${comment.isLiked ? "like-button -active-like" : "like-button"}"></button>
            </div>
          </div>
        </li>`;
    })
        .join("");

    return commentsHtml;
}