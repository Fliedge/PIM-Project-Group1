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

    // $("#create-title-input").val("");
    // $("#create-description-input").val("");

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



    addImage.addEventListener("change", async () => {
        let ull = $(".image-ul");
        ull.empty();
        img = await uploadImage();
        ull.append(`
        
            <strong onclick="deleteImageFromNote()" id="delete-create-image">X</strong>
            <img id="edit-note-image" src="${img}">
            `)
    });

    // addFile.addEventListener("click", () => {
    //     await addFileToNote();

    // });
}

function deleteImageFromNote() {

    let ull = $(".image-ul");
    ull.empty();

    // $("#input-image").val("");
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
            <div id="add-file-ul"></div><br>
        </span>

        <h4 id="add-image-title">Add image: </h4>
        <span id="add-image-span">
            <input type="file" accept="image/*" placeholder="select image" id="input-image" class="input-image"><br>
            <br><ul class="image-ul">
            
            
            </ul>
        </span>
    `)

    addAttachment();

}

displayPage();






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
        return "";
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