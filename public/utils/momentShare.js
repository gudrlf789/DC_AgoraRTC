const momentSocket = io();
let momentShareActive = false;

const momentShareBtn = document.querySelector("#momentShare");
const momentShareIcon = document.querySelector(".fa-brain");
const messagesContainer = document.querySelector(".messages");
const chatContainer = document.querySelector(".main__chat_window");

const momentShareArea = document.createElement("i");
const iFrameContainer = document.createElement("div");
const searchInput = document.createElement("input");
const searchInputBtn = document.createElement("div");
const searchInputBtnIcon = document.createElement("i");
const momentShare = document.createElement("iframe");

momentShare.id = "momentShare-iframe";
momentShare.name = "iFrame";
momentShareArea.id = "momentShareArea";
iFrameContainer.id = "iFrameContainer";
searchInput.id = "searchInput";
searchInputBtn.id = "searchInputBtn";
searchInputBtnIcon.id = "searchInputBtnIcon";

searchInputBtnIcon.className = "fas fa-search";

searchInputBtn.appendChild(searchInputBtnIcon);

iFrameContainer.append(searchInput, searchInputBtn);
momentShareArea.append(iFrameContainer, momentShare);

momentShareBtn.addEventListener("click", (e) => {
    momentShareActive = !momentShareActive;

    if (momentShareActive == true) {
        chatContainer.appendChild(momentShareArea);
        momentShareArea.style.display = "block";
        messagesContainer.style.flex = "0.2";
        momentShareIcon.style.color = "#000";
    } else {
        momentShareArea.style.display = "none";
        momentShareIcon.style.color = "#fff";
        messagesContainer.style.flex = "1";
    }
});

$(document).on("click", "#searchInputBtn", (e) => {
    if (searchInput.value.length !== 0) {
        momentSocket.emit("submit_address", searchInput.value, options.channel);
        debugger;
        momentShare.src = `https://${searchInput.value.replace(/^(https?:\/\/)?(www\.)?/,"")}`;
        searchInput.value = "";
    }
});

$(document).on("keydown", "#searchInput", (e) => {
    if (e.which === 13 && searchInput.value.length !== 0) {
        momentSocket.emit("submit_address", searchInput.value, options.channel);
        momentShare.src = `https://${searchInput.value.replace(/^(https?:\/\/)?(www\.)?/,"")}`;
        searchInput.value = "";
    }
});
