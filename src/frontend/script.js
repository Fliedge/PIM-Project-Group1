let singleNote = {};
let notes = [];



getAllNotesDb();


function findNoteId() {

    let allNotes = $(".note-click");

    for (let i = 0; i < allNotes.length; i++) {
        $(allNotes[i]).click(function () {
            getSingleNoteDb(notes[i])
        });
    }

}

// Send note functions
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

async function uploadImage() {


    let images = document.querySelector("#input-image").files;

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
        return imageUrl = "";
    }
}

async function uploadFile() {


    let files = document.querySelector("#input-file").files;

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
        return fileUrl = "";
    }
}

// Edit note

async function editNote() {

    let editImage = await uploadImage();;
    let editFile = await uploadFile();

    if (editImage == "") {
        editImage = singleNote.imageUrl
    }
    if (editFile == "") {
        editFile = singleNote.fileUrl
    }

    let noteToEdit = {

        id: singleNote.id,
        title: $("#edit-title-input").val(),
        description: $("#edit-description-input").val(),
        imageUrl: editImage,
        fileUrl: editFile
    }
    updateNoteDb(noteToEdit)
}

// Display functions

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
            <div id="home-list">
                <span class="note-click">
                    <section class="home-note-columns">
                        <div class="home-column">
                        <h6 class="list-dates">last update: ${note.lastUpdate}</h6>
                        <h2 class="home-note-title">${note.title}</h2><br>
                            <p class="home-note-description">${note.description}</p>
                        </div>
                    </section>
                </span>
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

function showSingleNote() {

    let list = $(".home-page-all-list");
    list.empty()

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
    `)

    // <button onclick="addImageToNote()" id="edit-image-button">Add images</button>
    // <button onclick="addFileToNote()" id="edit-files-button">Add files</button>

    if (singleNote.imageUrl != "") {
        let box = $(".home-column")
        box.append(`
        <br><img src="${singleNote.imageUrl}" alt="">
        `)
    }
    if (singleNote.fileUrl != "") {
        let box = $(".home-column")
        box.append(`
        <br><a href="${singleNote.fileUrl}">${singleNote.fileUrl}</a>
        `)
    }
}

function showSingleNoteForEdit() {

    let list = $(".home-page-all-list");
    list.empty();

    list.append(`
    <form action="submit">
            
    <h2>Edit Note</h2>
   
        <li><input type="text" id="edit-title-input" value=><br></li><br>
        <li><textarea id="edit-description-input"></textarea></li><br>
        <button class="delete-image-button"><strong>X</strong></button>
        <ul id="image-li"></ul>

        <button onclick="editNote()" id="save-button">Save</button>
  

        <input type="file" accept="image/*" placeholder="select image" id="input-image">
        <input type="file" accept=".pdf" placeholder="select file" id="input-file">
   
    </form>
    `)

    // <button onclick="addImageToNote()" id="add-image-button">Add images</button>
    // <button onclick="addFileToNote()" id="add-files-button">Add files</button>
    let imageList = $("image-li")

    imageList.append(`
    <img src="${singleNote.imageUrl}">
        `)

    $("#edit-title-input").val(singleNote.title);
    $("#edit-description-input").val(singleNote.description,);

    $(".delete-image-button").click(function () {
        let updateNote = {
            id: singleNote.id,
            title: singleNote.title,
            description: singleNote.description,
            imageUrl: "",
            fileUrl: singleNote.fileUrl
        }
        updateNoteDb(updateNote)
        event.preventDefault();
    });



}


// DB functions

async function getAllNotesDb() {

    let result = await fetch("rest/notes");
    notes = await result.json();

    displayList()
}

async function getSingleNoteDb(note) {

    let result = await fetch("/rest/notes/" + note.id);
    singleNote = await result.json();

    showSingleNote();

}

async function deleteNoteDb() {

    let result = await fetch("/rest/notes/" + singleNote.id, {
        method: "DELETE",
        BODY: JSON.stringify()
    });

    location.reload();

}

async function createNoteDb(note) {

    let result = await fetch("/rest/notes", {
        method: "POST",
        body: JSON.stringify(note)
    });

}

async function updateNoteDb(note) {

    let result = await fetch("/rest/notes/id", {
        method: "PUT",
        body: JSON.stringify(note)
    });

    location.reload()
}

async function addImage(formData) {

    let uploadResult = await fetch('/api/file-upload', {
        method: 'POST',
        body: formData
    });

    imageUrl = await uploadResult.text();

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




