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

const renderLoginComponent = ({ formElement, setToken }) => {
  formElement.innerHTML = `
    <div id="auth">
      <p>Чтобы добавить комментарий, <button id="auth-button">авторизуйтесь</button></p>
    </div>
    <div id="auth-form" class="add-form">
      <div>Форма входа</div>
      <br>
      <input id="login" type="text" class="add-form-name" placeholder="Введите логин" />
      <br>
      <input id="password" type="text" class="add-form-name" placeholder="Введите пароль" />
      <div class="add-form-row">
        <button id="login-button" class="add-form-button">Войти</button>
      </div>
    </div>`;

  document.getElementById("login-button").addEventListener("click", () => {
    setToken("Bearer asb4c4boc86gasb4c4boc86g37w3cc3bo3b83k4g37k3bk3cg3c03ck4k");
  });
}

export const renderForm = (formElement, token) => {
  if (!token) {
    renderLoginComponent({
      formElement,
      setToken: (newToken) => {
        token = newToken;
      }
    })
    return;
  }

  formElement.innerHTML = `
    <div id="comment-add-form" class="add-form">
      <input id="name-input" type="text" class="add-form-name" placeholder="Введите ваше имя" />
      <textarea id="comment-text" type="textarea" class="add-form-text" placeholder="Введите ваш комментарий"
        rows="4"></textarea>
      <div class="add-form-row">
        <button id="add-button" class="add-form-button">Написать</button>
      </div>
    </div>
    <div id="loading" class="form-loading">Комментарий добавляется...</div>`;
}


