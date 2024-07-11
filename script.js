const textarea = document.querySelector(".input-text");
const btnEncrypt = document.querySelector(".btn-encrypt");
const btnDecrypt = document.querySelector(".btn-decrypt");
const textSection = document.querySelector(".chat-texts");
const textSectionHistory = document.querySelector(".chat-texts-history");
const btnHistory = document.querySelector(".btn-history");
const btnClearHistory = document.querySelector(".btn-clean-history");

btnHistory.addEventListener("click", () => {
  if (document.querySelector(".history-section").classList.contains("active")) {
    document.querySelector(".history-section").classList.remove("active");
  } else {
    document.querySelector(".history-section").classList.add("active");
  }
});

btnClearHistory.addEventListener("click", () => {
  localStorage.clear();
  hisArray = [];
  textSectionHistory.innerText = "";
});

textarea.addEventListener(
  "input",
  () => {
    textarea.style.height = "auto";
    textarea.style.height = textarea.scrollHeight + "px";
    textarea.style.maxHeight = 250 + "px";
  },
  false
);

let chat = [];

btnEncrypt.addEventListener("click", (e) => {
  e.preventDefault();
  if (!textarea.value == "") {
    const textMinus = textarea.value.toLowerCase();
    chat[chat.length] = ["Seu Texto", textMinus];
    const response = encryptText(textMinus);
    chat[chat.length] = ["Texto Criptografado", response];
    textarea.value = "";
    addTextToChat();
  }
});

function encryptText(text) {
  const encryptedWords = {
    e: "enter",
    i: "imes",
    a: "ai",
    o: "ober",
    u: "ufat",
  };
  let textEncrypted = "";
  for (let i = 0; i < text.length; i++) {
    const letters = text[i];
    textEncrypted += encryptedWords[letters] || letters;
  }
  return textEncrypted;
}

btnDecrypt.addEventListener("click", (e) => {
  e.preventDefault();
  if (!textarea.value == "") {
    const textMinus = textarea.value.toLowerCase();
    chat[chat.length] = ["Seu Texto", textMinus];
    const response = decryptText(textMinus);
    chat[chat.length] = ["Texto Descriptografado", response];
    textarea.value = "";
    addTextToChat();
  }
});

function decryptText(text) {
  text = text.replace(/enter/g, "e");
  text = text.replace(/imes/g, "i");
  text = text.replace(/ai/g, "a");
  text = text.replace(/ober/g, "o");
  text = text.replace(/ufat/g, "u");
  return text;
}

function createText(title, content, onHistory) {
  const text = document.createElement("div");
  text.classList.add("text");

  const textTitle = document.createElement("h5");
  textTitle.classList.add("text-title");
  textTitle.innerText = title;
  text.appendChild(textTitle);

  const textContent = document.createElement("p");
  textContent.classList.add("text-content");
  textContent.innerText = content;
  text.appendChild(textContent);

  const btnCopy = document.createElement("div");
  btnCopy.classList.add("btn-copy");

  const spanIconCopy = document.createElement("span");
  spanIconCopy.classList.add("material-symbols-outlined");
  spanIconCopy.innerText = "content_copy";
  spanIconCopy.addEventListener("click", () => {
    navigator.clipboard.writeText(textContent.innerText);
  });
  btnCopy.appendChild(spanIconCopy);
  text.appendChild(btnCopy);

  if (
    textTitle.textContent === "Texto Criptografado" ||
    textTitle.textContent === "Texto Descriptografado"
  ) {
    textTitle.style.color = "var(--text-color-third)";
    textContent.classList.add("line");
  }

  if (onHistory) {
    textSectionHistory.appendChild(text);
  } else {
    textSection.appendChild(text);
  }
}

let hisArray = [];

if (localStorage.length) {
  let history = localStorage.getItem("History");
  hisArray = JSON.parse(history);
  for (let [index, [title, content]] of hisArray.entries()) {
    createText(title, content, true);
  }
}

function addTextToChat() {
  textSection.innerHTML = "";
  hisArray = [...hisArray, ...chat];
  const stringChat = JSON.stringify(hisArray);
  localStorage.setItem("History", stringChat);
  for (let [index, [title, content]] of chat.entries()) {
    createText(title, content);
  }
}
