import { renderLogin } from "./renderLogin.js";

const options = { year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric' };

export const renderElements = (appElement, isInitialLoading, comments, user) => {
  let commentHTML = comments.map((comment, index) => {
    return `
      <ul id="list" class="comments">
        <li data-index="${index}"class="comment">
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
        </li>
      </ul>`
  })
    .join("");

  let appHtml = `
    <div class="container">
      <ul id="list" class="comments">
      ${isInitialLoading
        ? `<div class='loading'>Подождите, пожалуйста, комментарии загружаются...</div>`
        : commentHTML
      }
      </ul>
      ${user
      ? `
      <div id="comment-add-form" class="add-form">
        <input id="name-input" type="text" class="add-form-name" value="${user.name}" disabled />
        <textarea id="comment-text" type="textarea" class="add-form-text" placeholder="Введите ваш комментарий"
          rows="4"></textarea>
        <div class="add-form-row">
          <button id="add-button" class="add-form-button">Написать</button>
        </div>
      </div>`
      : `
      <div class='form-loading' style="margin-top: 20px">
        Чтобы добавить комментарий, <a href='#' id="go-to-login">aвторизуйтесь</a>
      </div>`
    }
    </div>`
  appElement.innerHTML = appHtml;

  if (!user) {
    const goToLogin = document.getElementById("go-to-login");
    goToLogin.addEventListener("click", () => {
      renderLogin(appElement, isInitialLoading, comments);
    })
  }
}





