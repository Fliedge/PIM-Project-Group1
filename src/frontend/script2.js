let img = "";

async function submitNote() {

    let imageUrl = await uploadImage();
    let fileUrl = await uploadFile();

    let titleInput = $("#create-title-input").val();
    let descriptionInput = $("#create-description-input").val();

    if (titleInput.length >= 0) {

        note = {
            title: titleInput,
            description: descriptionInput,
            imageUrl: img,
            fileUrl: fileUrl
        };
        createNoteDb(note);
    }
    else {
        alert("Title needs to be added");
    }

    location.reload();
}

async function uploadFile() {

    let files = document.querySelector(".input-file").files;

    if (files.length > 0) {

        let formData = new FormData();

        for (let file of files) {
            formData.append("files", file, file.name);

        }
        let uploadResult = await fetch('/api/file-upload', {
            method: 'POST',
            body: formData
        });

        fileUrl = await uploadResult.text();

        return fileUrl;
    }
    else {
        return null;
    }
}

async function uploadImage() {

    let images = document.querySelector(".input-image").files;

    if (images.length > 0) {
        let formData = new FormData();

        for (let image of images) {
            formData.append("images", image, image.name);

        }

        let uploadResult = await fetch('/api/images-upload', {
            method: 'POST',
            body: formData
        });

        imageUrl = await uploadResult.text();

        return imageUrl;
    }
    else {
        return "";
    }
}

async function createNoteDb(note) {

    let result = await fetch("/rest/notes", {
        method: "POST",
        body: JSON.stringify(note)
    });

}

function addAttachment() {

    let addImage = document.querySelector("#add-image-span");
    let addFile = document.querySelector("#add-file-span");

    addFile.addEventListener("change", async () => {
        let fileList = $(".add-file-ul");
        fileList.empty();
        fileUrl = await uploadFile();
        fileList.append(`
            <strong onclick="deleteFileFromNote()" id="edit-delete-file">X</strong>
            ${fileUrl}
        `)
    });

    addImage.addEventListener("change", async () => {
        let imageList = $(".add-image-ul");
        imageList.empty();
        img = await uploadImage();
        imageList.append(`
            <strong onclick="deleteImageFromNote()" class="delete-create-image">X</strong>
            <img id="edit-note-image" src="${img}">
        `)
    });
}

function deleteImageFromNote() {

    $(".add-image-ul").empty();
    $(".input-image").val("")


}

function deleteFileFromNote() {
    
    $(".add-file-ul").empty();
    $(".input-file").val("");
   

}


function displayPage() {

    let page = $("#create-form")

    page.append(`
        <li><input type="text" placeholder="Title..." id="create-title-input"></li><br>
        <li><textarea id="create-description-input" placeholder="Description..."></textarea></li><br>

        <button onclick="submitNote()" id="add-button">Create</button>

        <h4 id="add-file-title">Add file: </h4>
        <span id="add-file-span">
            <input type="file" accept=".pdf, .txt" placeholder="select file" id="input-file" class="input-file">
            <ul class="add-file-ul"></ul><br>
        </span>

        <h4 id="add-image-title">Add image: </h4>
        <span id="add-image-span">
            <input type="file" accept="image/*" placeholder="select image" id="input-image" class="input-image"><br>
            <br><ul class="add-image-ul">
            </ul>
        </span>
    `)

    addAttachment();

}

displayPage();