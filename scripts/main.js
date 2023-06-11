import { fetchComments, fetchPost } from "./api.js";

const listElement = document.getElementById("list");
const formElement = document.getElementById("comment-add-form");
const buttonElement = document.getElementById("add-button");
const loadingElement = document.getElementById("loading");
const nameInputElement = document.getElementById("name-input");
const commentTextareaElement = document.getElementById("comment-text");
const options = { year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric' };
let comments = [];
const host = "https://wedev-api.sky.pro/api/v1/pauline-orda";

const initEventListeners = () => {
    const buttonElements = document.querySelectorAll(".like-button");
    for (const buttonElement of buttonElements) {
        buttonElement.addEventListener("click", () => {
            event.stopPropagation();
            const index = buttonElement.dataset.index;
            if (comments[index].isLiked === true) {
                comments[index].likeCounter--;
                comments[index].isLiked = false;
            } else {
                comments[index].likeCounter++;
                comments[index].isLiked = true;
            }
            renderComments();
        })
    }
}
const initAnswerListeners = () => {
    const commentElements = document.querySelectorAll(".comment");
    for (const commentElement of commentElements) {
        commentElement.addEventListener("click", () => {
            const index = commentElement.dataset.index;
            commentTextareaElement.value = `>${comments[index].text}\n${comments[index].userName}`;
        })
    }
}

const fetchAndRenderComments = () => {
    fetchComments()
        .then((data) => {
            comments = data;
            renderComments();
        })
        .catch((error) => {
            alert("Кажется, у вас сломался интернет, попробуйте позже");
            console.warn(error);
        });
}

const renderComments = () => {
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

    listElement.innerHTML = commentsHtml;
    initEventListeners();
    initAnswerListeners();
}

listElement.textContent = "Пожалуйста, подождите, комментарии добавляются...";
fetchAndRenderComments();
loadingElement.classList.add("none");

nameInputElement.addEventListener("input", () => {
    if (nameInputElement.value !== "" && commentTextareaElement.value !== "") {
        buttonElement.removeAttribute("disabled");
        buttonElement.classList.remove("error");
    }
});

commentTextareaElement.addEventListener("input", () => {
    if (nameInputElement.value !== "" && commentTextareaElement.value !== "") {
        buttonElement.removeAttribute("disabled");
        buttonElement.classList.remove("error");
    }
});

buttonElement.addEventListener("click", () => {
    if (nameInputElement.value === "" || commentTextareaElement.value === "") {
        buttonElement.setAttribute("disabled", "disabled");
        buttonElement.classList.add("error");
        return;
    }

    loadingElement.classList.remove("none");
    formElement.classList.add("none");

    fetchPost(commentTextareaElement, nameInputElement)
        .then((response) => {
            if (response.status === 200) {
                return response.json();
            }
            if (response.status === 400) {
                throw new Error("Плохой запрос");
            }
            if (response.status === 500) {
                throw new Error("Сервер сломался");
            }
        })
        .then(() => {
            return fetchAndRenderComments();
        })
        .then(() => {
            loadingElement.classList.add("none");
            formElement.classList.remove("none");
            nameInputElement.value = "";
            commentTextareaElement.value = "";
        })
        .catch((error) => {
            loadingElement.classList.add("none");
            formElement.classList.remove("none");
            if (error.message === "Плохой запрос") {
                alert("Имя и комментарий должны быть не короче 3 символов");
            }
            if (error.message === "Сервер сломался") {
                alert("Сервер сломался, попробуй позже");
            }
            if (error.message !== "Плохой запрос" && error.message !== "Сервер сломался") {
                alert("Кажется, у вас сломался интернет, попробуйте позже");
            }
            console.warn(error);
        });
})