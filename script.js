const textarea = document.querySelector(".input-text");
const btnEncrypt = document.querySelector(".btn-encrypt");
const btnDecrypt = document.querySelector(".btn-decrypt");

textarea.addEventListener(
  "input",
  () => {
    this.style.height = "auto";
    this.style.height = this.scrollHeight + "px";
    this.style.maxHeight = 250 + "px";
  },
  false
);

let chat = [];

btnEncrypt.addEventListener("click", (e) => {
  e.preventDefault();
  const textMinus = textarea.value.toLowerCase();
  chat[chat.length] = ["Seu Texto", textMinus];
  const response = encryptText(textMinus);
  chat[chat.length] = ["Texto Criptografado", response];
  textarea.value = "";
  console.log(chat);
});

btnDecrypt.addEventListener("click", (e) => {
  e.preventDefault();
  const textMinus = textarea.value.toLowerCase();
  chat[chat.length] = ["Seu Texto", textMinus];
  const response = decryptText(textMinus);
  chat[chat.length] = ["Texto Descriptografado", response];
  textarea.value = "";
  console.log(chat);
  console.log(response);
});

const encryptedWords = {
  e: "enter",
  i: "imes",
  a: "ai",
  o: "ober",
  u: "ufat",
};

function encryptText(text) {
  let textEncrypted = "";
  for (let i = 0; i < text.length; i++) {
    const letters = text[i];
    textEncrypted += encryptedWords[letters] || letters;
  }
  return textEncrypted;
}

function decryptText(text) {
  text = text.replace(/enter/g, "e");
  text = text.replace(/imes/g, "i");
  text = text.replace(/ai/g, "a");
  text = text.replace(/ober/g, "o");
  text = text.replace(/ufat/g, "u");
  return text;
}
