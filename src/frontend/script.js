let singleNote = {};
let notes = [];

getAllNotesDb();
searchNotes();

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

        let fileInd = "";
        let internList = $("#home-list");

        if (note.imageUrl != null || note.fileUrl != null) {
            fileInd = "/design/Gem mindre.png"
        }    

        if (i == 0) {
            list.append(`
            <h1 class="title"> My Notes </h1>
            <div class="home-wrapper">
                <span class="note-click">
                    <section class="home-note-columns">
                        <div class="home-column">
                            <h6 class="list-dates">last update: ${note.lastUpdate}</h6>
                            <img id="file-indication"src="${fileInd}" alt="">

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
                        <img id="file-indication"src="${fileInd}" alt="">

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

function searchNotes() {

    let searchBar = document.querySelector(".search-bar")

    searchBar.addEventListener("keypress", (e) => {

        if (e.keyCode === 13) {

            let searchString = $(".search-bar").val();

            if (searchString.length > 0) {
                searchTitleInDb(searchString);
            }
            else {
                getAllNotesDb();
            }
            $(".search-bar").val("");
        }
    });
}

async function searchTitleInDb(searchString) {

    let searchResult = await fetch("/rest/notes/search/" + searchString);
    notes = await searchResult.json();
    displayList();
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
    
    <h1 class="title"> My Note </h1>
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
            <h4>Added file:</h4>
            <button onclick="showSingleNoteForEdit()" id="edit-button">Edit</button><br>
            <div id="show-file">
            </div>
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
        let box = $("#show-file");
        box.append(`
        <a id="view-note-file" href="${singleNote.fileUrl}" download>${singleNote.fileUrl}</a>
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
   
        <li><input type="text" id="edit-title-input"><br></li><br>
        <li><textarea id="edit-description-input"></textarea></li><br>        

        <button onclick="editNote()" id="save-button">Save</button>

        <h4 id="edit-file-title">Add file: </h4>
        <span id="edit-file-span"><input type="file" accept=".pdf, .txt, .zip" placeholder="select file" class="input-file"></span>
        <ul id="file-ul"></ul><br>

        <h4 id="edit-image-title">Add image: </h4>
        <span id="edit-image-span"><input type="file" accept="image/*" placeholder="select image" class="input-image"></span><br><br>
        <ul id="image-ul"></ul>

    </form>
    `);

    addToInputField();
    addAttachment();
}

function addToInputField() {

    let fileList = $("#file-ul");
    let imageList = $("#image-ul");

    if (singleNote.fileUrl != null) {
        fileList.append(`
        <strong onclick="deleteFileFromNote()" id="edit-delete-file">X</strong>
        ${singleNote.fileUrl}
        `);

    }

    if (singleNote.imageUrl != null) {
        imageList.append(`
        <li>
            <strong onclick="deleteImageFromNote()" class="edit-delete-image">X</strong>
            <img id="edit-note-image" src="${singleNote.imageUrl}">
        </li>
        `);

    }

    $("#edit-title-input").val(singleNote.title);
    $("#edit-description-input").val(singleNote.description,);
}

function addAttachment() {

    let addImage = document.querySelector("#edit-image-span");
    let addFile = document.querySelector("#edit-file-span");

    addFile.addEventListener("change", async () => {
        singleNote.fileUrl = await uploadFile();
        if (singleNote.fileUrl != "") {
            let fileList = $("#file-ul");
            fileList.empty();
            fileList.append(`
            <strong onclick="deleteFileFromNote()" id="edit-delete-file">X</strong>
            ${singleNote.fileUrl}
        `)
        }
        else {
            $("#file-ul").empty();
        }
    });

    addImage.addEventListener("change", async () => {
        singleNote.imageUrl = await uploadImage();
        if (singleNote.imageUrl != "") {
            let imagelist = $("#image-ul")
            imagelist.empty();
            imagelist.append(`
            <strong onclick="deleteImageFromNote()" class="edit-delete-image">X</strong>
            <img id="edit-note-image" src="${singleNote.imageUrl}">
        `)
        }
        else {
            $("#image-ul").empty();
        }
    });

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

function deleteFileFromNote() {

    let updateNote = {
        id: singleNote.id,
        title: singleNote.title,
        description: singleNote.description,
        imageUrl: singleNote.imageUrl,
        fileUrl: null
    }


    updateNoteDb(updateNote)
    $("#file-ul").empty();
    $(".input-file").val("");
    singleNote.fileUrl = null;


}

function deleteImageFromNote() {

    let updateNote = {
        id: singleNote.id,
        title: singleNote.title,
        description: singleNote.description,
        imageUrl: null,
        fileUrl: singleNote.fileUrl
    }

    updateNoteDb(updateNote);
    $("#image-ul").empty();
    $(".input-image").val("");
    singleNote.imageUrl = null;

}

async function editNote() {

    let editFile = await uploadFile();
    let editImage = await uploadImage();

    let editTitleInput = validateString($("#edit-title-input").val());
    let editDescriptionInput = validateString($("#edit-description-input").val());


    if (editImage == "") {
        editImage = singleNote.imageUrl
    }
    if (editFile == "") {
        editFile = singleNote.fileUrl
    }
    
    let noteToEdit = {

        id: singleNote.id,
        title: editTitleInput,
        description: editDescriptionInput ,
        imageUrl: singleNote.imageUrl,
        fileUrl: singleNote.fileUrl
    }
    await updateNoteDb(noteToEdit)
    location.reload()

}

function validateString (string){
    if (string.includes("<")){
        string = string.replace(/</g, "&lt;").replace(/>/g, "&gt;");
    }
    return string;
}

async function updateNoteDb(note) {

    let result = await fetch("/rest/notes/id", {
        method: "PUT",
        body: JSON.stringify(note)
    });

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