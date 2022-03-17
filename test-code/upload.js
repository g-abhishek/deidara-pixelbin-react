import upload from "../artifacts/javascript/upload";

const fileInput = document.getElementById("fileUpload");
fileInput.addEventListener("change", (e) => upload(e.target.files[0]));