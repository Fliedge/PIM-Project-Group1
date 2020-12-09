let note1 = {
    title: "Title test 1",
    description: "Description test 1"
}

let note2 = {
    title: "Title test 2",
    description: "Description test 2"
}

let note3 = {
    title: "Title test 3",
    description: "Description test 3"
}

let note4 = {
    title: "Title test 4",
    description: "Description test 4"
}

let notes = [];


notes.push(note1);
notes.push(note2);
notes.push(note3);
notes.push(note4);


// console.log(notes);

homepageList();

let newob = null;

function homepageList() {

    let list = $("#home-list");
    list.empty();


    for (note of notes) {
        list.append(`
        <a class="note-click" href="view.html">
            <section class="home-note-columns">
                <div class="home-column">
                    <h2 class="home-note-title">${note.title}</h2>
                    <p class="home-note-description">${note.description}</p>
                </div>
            </section>
        </a>
        `)
    }

    findNoteId();

}

function findNoteId() {

    let allNotes = $(".note-click");

    for (let i = 0; i < allNotes.length; i++) {
        $(allNotes[i]).click(function () {
            // showSingleNote(notes[i]);
            // console.log(notes[i])

            // console.log("runs")
        });
    }
}

// function showSingleNote(note) {
    

//     let singleNotes = $("#show-single-note")
//     console.log("WORKS 2")

//         let oneNote = {
//             title: note.title,
//             description: note.description
//         }


//     singleNotes.append(`
//         <li>${oneNote.title}</li>
//         <li>${oneNote.description}</li>
//         `);
// }
// showSingleNote()


function submitNote() {

    let titleInput = $("#title-input");
    let descriptionInput = $("#description-input");

    let bool = titleInput.includes("ä")
    if (bool == true) {
        console.log("true")
    }

    if (titleInput > 0) {

        note = {
            title: titleInput,
            description: descriptionInput
        };
        // createNoteDb(note);
    }
    else {
        alert("Title needs to be added")
    }
}

function viewNotes() {


}

async function getAllNotesDb() {

    let result = await fetch("rest/notes");
    notes = await result.json();

}

async function getSingleNoteDb(note) {

    let result = await fetch("/rest/notes/id");
    notes = await result.json(note);

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



