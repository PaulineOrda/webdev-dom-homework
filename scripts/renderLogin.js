import { fetchLogin } from "./api.js";
import { renderElements } from "./renderElements.js";

export const renderLogin = (appElement, isInitialLoading, comments) => {
    appElement.innerHtml = `
    <div class="container">
        <div class="add-form">
            <h3 class="title">Форма входа</h3>
            <br>
            <input id="login" type="text" class="add-form-name" placeholder="Введите логин" />
            <br>
            <input id="password" type="text" class="add-form-name" placeholder="Введите пароль" />
            <div class="add-form-row">
            <button id="auth-button" class="add-form-button">Войти</button>
            </div>
            <br>
            <a href='#' id="reg">Зарегистрируйтесь</a>
        </div>  
    </div>`;

    const authButton = getElementById("auth-button");
    authButton.addEventListener("click", () => {
        const login = document.getElementById("login").value;
        const password = document.getElementById("password").value;
        fetchLogin(login, password).then((response) => {
            renderElements(appElement, isInitialLoading, comments, response.user);
        });
    });
}