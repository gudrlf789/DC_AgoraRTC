const momentSocket = io();
let momentShareActive = false;
let mouseDrag = false;

const momentShareBtn = document.querySelector("#momentShare");
const momentShareIcon = document.querySelector(".fa-brain");
const messagesContainer = document.querySelector(".messages");
const chatContainer = document.querySelector(".main__chat_window");

const momentShareArea = document.createElement("i");
const iFrameContainer = document.createElement("div");
const searchInput = document.createElement("input");
const searchInputBtn = document.createElement("div");
const mouseDragBtn = document.createElement("div");
const mouseDragBtnIcon = document.createElement("i");
const searchInputBtnIcon = document.createElement("i");
const momentShare = document.createElement("iframe");

searchInput.placeholder = "Please search.";
searchInput.style.textAlign = "center";
momentShare.id = "momentShare-iframe";
momentShare.name = "iFrame";
momentShareArea.id = "momentShareArea";
iFrameContainer.id = "iFrameContainer";
searchInput.id = "searchInput";
searchInputBtn.id = "searchInputBtn";
searchInputBtnIcon.id = "searchInputBtnIcon";
mouseDragBtn.id = "mouseDragBtn";

searchInputBtnIcon.className = "fas fa-search";
mouseDragBtnIcon.className = "far fa-hand-paper";

mouseDragBtn.appendChild(mouseDragBtnIcon);
searchInputBtn.appendChild(searchInputBtnIcon);

iFrameContainer.append(searchInput, searchInputBtn, mouseDragBtn);
momentShareArea.append(iFrameContainer, momentShare);

momentShare.frameborder = "0";

momentShareBtn.addEventListener("click", (e) => {
    momentShareActive = !momentShareActive;
    momentShareActive ? momentShareEnable() : momentShareDisable();
});

function momentShareEnable() {
    $(".main").append(momentShareArea);
    momentShareArea.style.display = "block";
    momentShareIcon.style.color = "#000";
}

function momentShareDisable() {
    momentShareArea.style.display = "none";
    momentShareIcon.style.color = "#fff";
}

$(document).on("click", "#searchInputBtn", (e) => {
    if (searchInput.value.length !== 0) {
        momentSocket.emit("submit_address", searchInput.value, options.channel);
        momentShare.src = `https://${searchInput.value.replace(
            /^(https?:\/\/)?(www\.)?/,
            ""
        )}/webhp?igu=1`;
        searchInput.value = "";
    }
});

$(document).on("keydown", "#searchInput", (e) => {
    if (e.which === 13 && searchInput.value.length !== 0) {
        momentSocket.emit("submit_address", searchInput.value, options.channel);
        momentShare.src = `https://${searchInput.value.replace(
            /^(https?:\/\/)?(www\.)?/,
            ""
        )}/webhp?igu=1`;

        searchInput.value = "";
    }
});

mouseDragBtn.addEventListener("click", (e) => {
    e.preventDefault();
    mouseDrag = !mouseDrag;
    if (mouseDrag) {
        mouseDragBtnIcon.className = "far fa-hand-rock";
        $("#momentShareArea").draggable().draggable("enable");
    } else {
        mouseDragBtnIcon.className = "far fa-hand-paper";
        $("#momentShareArea").draggable("disable");
    }
});
