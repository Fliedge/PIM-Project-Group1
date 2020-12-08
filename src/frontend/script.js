let notes = [];

function submitNote() {

    let titleInput = $("#title-input");
    let descriptionInput = $("#description-input");

    if (titleInput > 0) {

        note = {
            title: titleInput,
            description: descriptionInput
        };
        createNoteDb(note);
    }
    else {
        alert("Title needs to be added")
    }
}

function viewNotes(){

    

}

async function getAllNotesDb() {

    let result = await fetch("rest/notes");
    notes = await result.json();

}

async function getSingleNoteDb(note) {

    let result = await fetch("/rest/notes/:id");
    notes = await result.json(note);

}

async function deleteNoteDb(note) {

    let result = await fetch("/rest/notes/:id", {
        method: "DELETE",
        BODY: JSON.stringify(note)
    });

}

async function createNoteDb(note) {

    let result = await fetch("/rest/notes", {
        method: "POST",
        body: JSON.stringify(note);
    });

}

async function updateNoteDb(note) {

    let result = await fetch("/rest/notes/:id", {
        method: "PUT",
        body: JSON.stringify(note)
    });

}



