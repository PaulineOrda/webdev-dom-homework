import { fetchComments, fetchPost } from "./api.js";
import { renderComments } from "./renderComments.js";

const listElement = document.getElementById("list");
const formElement = document.getElementById("comment-add-form");
const buttonElement = document.getElementById("add-button");
const loadingElement = document.getElementById("loading");
const nameInputElement = document.getElementById("name-input");
const commentTextareaElement = document.getElementById("comment-text");
let comments = [];

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
            renderAndInitListeners();
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
            renderAndInitListeners();
        })
        .catch((error) => {
            alert("Кажется, у вас сломался интернет, попробуйте позже");
            console.warn(error);
        });
}

const renderAndInitListeners = () => {
    listElement.innerHTML = renderComments(comments);
    initEventListeners();
    initAnswerListeners();
}

loadingElement.classList.add("none");
listElement.textContent = "Пожалуйста, подождите, комментарии добавляются...";
fetchAndRenderComments();

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