const addImageBtn = document.querySelector('.submit-btn');
if (addImageBtn) {
    const imageInput = document.getElementById('images');
    const fileLabel = document.querySelector('.file-label');
    addImageBtn.onclick = (event) => {
        if (imageInput && imageInput.files.length > 3) {
            event.preventDefault();
            imageInput.classList.add('invalid');
            fileLabel.classList.add('invalid-text');
            fileLabel.innerText = "Maximum of 3 photos only";
        } else {
            fileLabel.innerText = "";
        }
    }
}