let notes = [];

getAllNotesDb();


function displayList() {

    let list = $(".home-page-all-list");
    let i = 0;
    list.empty();

    for (note of notes) {

        let internList = $("#home-list");

        if (i == 0) {
            list.append(`
            <h1 class="title"> My Latest Notes </h1>
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
    console.log(notes)

    findNoteId();

}

function findNoteId() {

    let allNotes = $(".note-click");

    for (let i = 0; i < allNotes.length; i++) {
        $(allNotes[i]).click(function () {
            getSingleNoteDb(notes[i])
            showSingleNote(notes[i])
        });
    }
}

function showSingleNote(note) {

    let list = $(".home-page-all-list");
    list.empty()



    list.append(`
    <h1 class="title"> My Note </h1>
        <div class="home-wrapper">
        <div id="home-list">
            <span class="single-note-click">
                <section class="single-note-columns">
                    <div class="home-column">
                        <h2 class="single-note-title">${note.title}</h2><br>
                        <p contenteditable="true" class="single-note-description">${note.description}</p>
                    </div>
                </section>
            </span><br>
            <button onclick="updateNote" id="edit-button">Edit</button>
            <button onclick="addImageToNote()" id="edit-image-button">Add images</button>
            <button onclick="addFileToNote()" id="edit-files-button">Add files</button>
        </div>
        </div>
    `)
}

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

    $("#title-input").val("");
    $("#description-input").val("");

}

async function getAllNotesDb() {

    let result = await fetch("rest/notes");
    notes = await result.json();

    displayList()
}

async function getSingleNoteDb(note) {

    let noteToSend = Object.values(note)[0]
    

    let result = await fetch("/rest/notes/id");
    notes = await result.json(noteToSend);

    // showSingleNote();

}

async function deleteNoteDb(note) {

    let result = await fetch("/rest/notes/id", {
        method: "DELETE",
        BODY: JSON.stringify(note)
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

}



