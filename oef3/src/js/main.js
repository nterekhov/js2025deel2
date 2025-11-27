// Import our custom CSS
import '../scss/styles.scss'

// Import all of Bootstrap’s JS
import * as bootstrap from 'bootstrap'

//eigen js
// -----------------------------------------------------
// Mini Blog Viewer – main.js
// -----------------------------------------------------

const inputId = document.querySelector("#ex3_post_id");
const btnLoad = document.querySelector("#ex3_btn");
const statusEl = document.querySelector("#ex3_status");
const postCard = document.querySelector("#ex3_post_card");
const commentsCard = document.querySelector("#ex3_comments_card");
const titleEl = document.querySelector("#ex3_title");
const bodyEl = document.querySelector("#ex3_body");
const commentsList = document.querySelector("#ex3_comments_list");
const commentsEmpty = document.querySelector("#ex3_comments_empty");

// Helpers --------------------------------------------
function setStatus(message, type = "secondary") {
    statusEl.textContent = message;
    statusEl.className = `alert alert-${type} mb-3`;
}

function clearPost() {
    titleEl.textContent = "";
    bodyEl.textContent = "";
    postCard.classList.add("d-none");

    commentsList.innerHTML = "";
    commentsCard.classList.add("d-none");
}

// API calls ------------------------------------------
async function fetchPost(id) {
    const resp = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
    if (!resp.ok) throw new Error("Post niet gevonden");
    return resp.json();
}

async function fetchComments(id) {
    const resp = await fetch(`https://jsonplaceholder.typicode.com/comments?postId=${id}`);
    if (!resp.ok) throw new Error("Comments konden niet geladen worden");
    return resp.json();
}

// Main handler ----------------------------------------
async function loadPost() {
    const id = Number(inputId.value.trim());

    // VALIDATIE
    if (!id) {
        setStatus("Gelieve een geldig post ID in te geven.", "warning");
        clearPost();
        return;
    }

    // LOADING UI
    setStatus("Bezig met laden...", "info");
    clearPost();

    try {
        // Post en comments PARALLEL ophalen:
        const [post, comments] = await Promise.all([
            fetchPost(id),
            fetchComments(id)
        ]);

        // Post tonen
        titleEl.textContent = post.title;
        bodyEl.textContent = post.body;
        postCard.classList.remove("d-none");

        // Comments tonen
        commentsList.innerHTML = "";
        comments.forEach((c) => {
            const li = document.createElement("li");
            li.className = "list-group-item";

            li.innerHTML = `
                <strong>${c.name}</strong> 
                <br><small>${c.email}</small>
                <br>${c.body}
            `;

            commentsList.appendChild(li);
        });

        commentsEmpty.classList.add("d-none");
        commentsCard.classList.remove("d-none");

        setStatus("Post succesvol geladen!", "success");

    } catch (err) {
        setStatus(err.message, "danger");
        clearPost();
    }
}

// EVENT -----------------------------------------------
btnLoad.addEventListener("click", loadPost);