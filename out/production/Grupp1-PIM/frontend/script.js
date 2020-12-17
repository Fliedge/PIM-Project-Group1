let singleNote = {};
let notes = [];
let createNoteImg = ""


getAllNotesDb();


// Home page

async function getAllNotesDb() {

    let result = await fetch("rest/notes");
    notes = await result.json();

    displayList()
}

function displayList() {

    let list = $(".home-page-all-list");
    let i = 0;
    list.empty();

    for (note of notes) {

        let internList = $("#home-list");

        if (i == 0) {
            list.append(`
            <h1 class="title"> My Notes </h1>
            <div class="home-wrapper">
                <span class="note-click">
                    <section class="home-note-columns">
                        <div class="home-column">
                            <h6 class="list-dates">last update: ${note.lastUpdate}</h6>
                            <h2 class="home-note-title">${note.title}</h2><br>
                            <p class="home-note-description">${note.description}</p>
                        </div>
                    </section>
                </span>
                <div id="home-list">
                </div>
            </div>
            `)
            i++;
        }
        else {
            internList.append(`
            <span class="note-click">
                <section class="home-note-columns">
                    <div class="home-column">
                        <h6 class="list-dates">last update: ${note.lastUpdate}</h6>
                        <h2 class="home-note-title">${note.title}</h2><br>
                        <p class="home-note-description">${note.description}</p>
                    </div>
                </section>
            </span>
            `)
        }
    }
    findNoteId();

}

function findNoteId() {

    let allNotes = $(".note-click");

    for (let i = 0; i < allNotes.length; i++) {
        $(allNotes[i]).click(async function () {
            await getSingleNoteDb(notes[i])
            showSingleNote();
        });
    }
}


// Single note page

async function getSingleNoteDb(note) {

    let result = await fetch("/rest/notes/" + note.id);
    singleNote = await result.json();

}

function showSingleNote() {

    let list = $(".home-page-all-list");
    list.empty();

    list.append(`
    
    <h1 class="title"> My Notes </h1>
        <div class="home-wrapper">
        <div id="home-list">
            <span class="single-note-click">
                <section onclick="displayList()" class="single-note-columns">
                <div class="home-column">
                    <h6 class="single-note-date">last update: ${singleNote.lastUpdate}</h6>
                        <button onclick="deleteNoteDb()" class="delete-button"><strong>X</strong></button>

                        <h2 class="single-note-title">${singleNote.title}</h2><br>
                        <p class="single-note-description">${singleNote.description}</p>

                    </div>
                </section>
            </span><br>
            <button onclick="showSingleNoteForEdit()" id="edit-button">Edit</button>
        </div>
        </div>
    `);

    if (singleNote.imageUrl != null) {
        let box = $(".home-column");
        box.append(`
        <br><img id="view-note-image" src="${singleNote.imageUrl}">
        `);
    }
    if (singleNote.fileUrl != null) {
        let box = $(".home-column");
        box.append(`
        <br><a href="${singleNote.fileUrl}">${singleNote.fileUrl}</a>
        `);
    }
}

async function deleteNoteDb() {

    let result = await fetch("/rest/notes/" + singleNote.id, {
        method: "DELETE",
        BODY: JSON.stringify()
    });

    location.reload();
}


// Edit note page

function showSingleNoteForEdit() {


    let list = $(".home-page-all-list");
    list.empty();

    list.append(`
    <form action="submit">
            
    <h2>Edit Note</h2>
   
        <li><input type="text" id="edit-title-input" value=><br></li><br>
        <li><textarea id="edit-description-input"></textarea></li><br>        

        <button onclick="editNote()" id="save-button">Save</button>

        <h4 id="edit-file-title">Add file: </h4>
        <span id="edit-file-span"><input type="file" accept=".pdf" placeholder="select file" class="input-file"></span>
        <ul id="file-ul"></ul><br>

        <h4 id="edit-image-title">Add image: </h4>
        <span id="edit-image-span"><input type="file" accept="image/*" placeholder="select image" class="input-image"></span><br><br>
        <ul id="image-ul"></ul>

    </form>
    `);


    addEditInputs();
    editAttachment();

    
    $("#edit-delete-image").click(async function () {
        console.log("Hello")
        let updateNote = {
            id: singleNote.id,
            title: singleNote.title,
            description: singleNote.description,
            imageUrl: null,
            fileUrl: singleNote.fileUrl
        }
        console.log("Hello")
        // await updateNoteDb(updateNote)
        $("#image-ul").empty();

    });

    // deleteAttachment();
}

function addEditInputs() {

    let fileList = $("#file-ul");

    if (singleNote.fileUrl != null) {
        fileList.append(`
        <strong id="delete-file">X</strong>
        <p>${singleNote.fileUrl}</p>
        `);
    }

    let imageList = $("#image-ul");

    if (singleNote.imageUrl != null) {
        imageList.append(`
        <strong id="delete-image">X</strong>
        <img id="edit-note-image" src="${singleNote.imageUrl}">
        `);
    }

    $("#edit-title-input").val(singleNote.title);
    $("#edit-description-input").val(singleNote.description,);
}

function editAttachment() {

    let addImage = document.querySelector("#edit-image-span");
    let addFile = document.querySelector("#edit-file-span");


    addImage.addEventListener("change", async () => {
        await addImageToNote();
        let imageList = $("#image-ul");
        imageList.empty();
        imageList.append(`
            <strong id="edit-delete-image">X</strong>
            <img id="edit-note-image" src="${singleNote.imageUrl}">
        `)
    })

    addFile.addEventListener("change", async () => {
        await addFileToNote();
        let fileList = $("#file-ul");
        fileList.empty();
        fileList.append(`
            <strong id="edit-delete-file">X</strong>
            ${singleNote.fileUrl}
        `)
    });
}


function deleteAttachment() {



    // $("#delete-image").click(async function () {
    //     let updateNote = {
    //         id: singleNote.id,
    //         title: singleNote.title,
    //         description: singleNote.description,
    //         imageUrl: null,
    //         fileUrl: singleNote.fileUrl
    //     }
    //     console.log("Hello")
    //     await updateNoteDb(updateNote)
    //     $("#image-ul").empty();

    // });

    $("#delete-file").click(async function () {
        let updateNote = {
            id: singleNote.id,
            title: singleNote.title,
            description: singleNote.description,
            imageUrl: singleNote.imageUrl,
            fileUrl: null
        }
        $("#file-ul").empty();
        console.log("Hello")
        await updateNoteDb(updateNote)
    });
}

async function addImageToNote() {

    let img = await uploadImage();
    singleNote.imageUrl = img;

}

async function addFileToNote() {

    let file = await uploadFile();
    singleNote.fileUrl = file;

}

async function editNote() {

    let editFile = await uploadFile();
    let editImage = await uploadImage();


    if (editImage == null) {
        editImage = singleNote.imageUrl
    }
    if (editFile == null) {
        editFile = singleNote.fileUrl
    }

    let noteToEdit = {

        id: singleNote.id,
        title: $("#edit-title-input").val(),
        description: $("#edit-description-input").val(),
        imageUrl: singleNote.imageUrl,
        fileUrl: singleNote.fileUrl
    }
    await updateNoteDb(noteToEdit)
    location.reload()

}

async function updateNoteDb(note) {

    let result = await fetch("/rest/notes/id", {
        method: "PUT",
        body: JSON.stringify(note)
    });

}


// Create note page

async function submitNote() {

    let imageUrl = await uploadImage();
    let fileUrl = await uploadFile();

    let titleInput = $("#create-title-input").val();
    let descriptionInput = $("#create-description-input").val();

    if (titleInput.length >= 0) {

        note = {
            title: titleInput,
            description: descriptionInput,
            imageUrl: imageUrl,
            fileUrl: fileUrl
        };
        createNoteDb(note);
    }
    else {
        alert("Title needs to be added");
    }

    $("#create-title-input").val("");
    $("#create-description-input").val("");

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
        return null;
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
    let imgul = $("#add-image-ul")
    imgul.empty();

    addImage.addEventListener("click", () => {
        addImage.addEventListener("mouseout", async function () {
            let img = await uploadImage();
            imgul.append(`
                    <img src="${img}">
                `)
        })
    }

    );
    addFile.addEventListener("click", () => {
        addFile.addEventListener("mouseout", async function () {
            await addFileToNote();

        })
    }
    );
}


// Sorting functions

function sortingChoices(menu) {

    if (menu.value == '1') {
        getAllNotesDbSortedByTitle();
    } else if (menu.value == '2') {
        getAllNotesDbSortedByDateAsc();
    } else if (menu.value == '3') {
        getAllNotesDbSortedByDateDesc();
    }

}

async function getAllNotesDbSortedByTitle() {

    let result = await fetch("/rest/getNotesOrderByTitle");
    notes = await result.json();

    displayList();

}

async function getAllNotesDbSortedByDateAsc() {

    let result = await fetch("/rest/getNotesOrderByLastUpdateAsc");
    notes = await result.json();

    displayList();

}

async function getAllNotesDbSortedByDateDesc() {

    let result = await fetch("/rest/getNotesOrderByLastUpdateDesc");
    notes = await result.json();

    displayList();

}