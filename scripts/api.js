const host = "https://wedev-api.sky.pro/api/v1/pauline-orda";

export const fetchComments = () => {
    return fetch(host + "/comments", {
        method: "GET"
    })
        .then((response) => {
            return response.json();
        })
        .then((responseData) => {
            const appComments = responseData.comments.map((comment) => {
                return {
                    userName: comment.author.name,
                    date: new Date(comment.date),
                    text: comment.text,
                    likeCounter: comment.likes,
                    isLiked: false,
                };
            });
            return appComments;
        });
}

export const fetchPost = (text, name) => {
   return fetch(host + "/comments", {
        method: "POST",
        body: JSON.stringify({
            text: text.value
            .replaceAll("&", "&amp;")
            .replaceAll("<", "&lt;")
            .replaceAll(">", "&gt;")
            .replaceAll('"', "&quot;"),
            name: name.value
            .replaceAll("&", "&amp;")
            .replaceAll("<", "&lt;")
            .replaceAll(">", "&gt;")
            .replaceAll('"', "&quot;")
        })
    })
}