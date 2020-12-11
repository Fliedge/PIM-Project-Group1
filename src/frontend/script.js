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

function submitNote() {

    let titleInput = $("#title-input").val();
    let descriptionInput = $("#description-input").val();

    if (titleInput.length >= 0) {

        note = {
            title: titleInput,
            description: descriptionInput
        };
        createNoteDb(note);
    }
    else {
        alert("Title needs to be added");
    }

    $("#title-input").val(singleNote.title);
    $("#description-input").val("");

}

// Edit note

function showSingleNoteForEdit() {

    let list = $(".home-page-all-list");
    list.empty();
    
    list.append(`
    <form action="submit">
            
    <h2>Edit Note</h2>
   
    <li><input type="text" id="edit-title-input" value=><br></li><br>
    <li><textarea id="edit-description-input"></textarea></li><br>

    <button onclick="editNote()" id="update-button">Save</button>
    <button onclick="addImageToNote()" id="add-image-button">Add images</button>
    <button onclick="addFileToNote()" id="add-files-button">Add files</button>
   
    </form>
    `)

    $("#edit-title-input").val(singleNote.title);
    $("#edit-description-input").val(singleNote.description);

}

function editNote() {


    let noteToEdit = {

        id: singleNote.id,
        title: $("#edit-title-input").val(),
        description: $("#edit-description-input").val()

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
                        <h2 class="single-note-title">${singleNote.title}</h2><br>
                        <pre class="single-note-description">${singleNote.description}</pre>
                    </div>
                </section>
            </span><br>
            <button onclick="showSingleNoteForEdit()" id="edit-button">Edit</button>
            <button onclick="addImageToNote()" id="edit-image-button">Add images</button>
            <button onclick="addFileToNote()" id="edit-files-button">Add files</button>
        </div>
        </div>  
    `)
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

async function deleteNoteDb(note) {

    let result = await fetch("/rest/notes/id", {
        method: "DELETE",
        BODY: JSON.stringify()
    });

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

    // getAllNotesDb();
    location.reload()

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



