let sortedNotes = [];

async function getAllNotesDbSortedByTitle() {

    let result = await fetch("/rest/getNotesOrderByTitle");
    sortedNotes = await result.json();
    homepageList(notesSortedByTitle);

    displayList();

}

async function getAllNotesDbSortedByDateAsc() {

    let result = await fetch("/rest/getNotesOrderByLastUpdateAsc");
    sortedNotes = await result.json();
    homepageList(notesSortedByDateAsc);

    displayList();

}

async function getAllNotesDbSortedByDateDesc() {

    let result = await fetch("/rest/getNotesOrderByLastUpdateDesc");
    sortedNotes = await result.json();
    homepageList(notesSortedByDateDesc);
    
    displayList();

}



function sortingChoices(menu) {

    if (menu.value == '1') {
        getAllNotesDbSortedByTitle();
    } else if (menu.value == '2') {
        getAllNotesDbSortedByDateAsc();
    } else if (menu.value == '3') {
        getAllNotesDbSortedByDateDesc();
    }

}


function homepageList(notes) {
    console.log(notes)

    let list = $(".home-page-all-list");
    list.empty();
    let i = 0;


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


        findNoteId();
    }
}

function findNoteId() {

    let allNotes = $(".note-click");

    for (let i = 0; i < allNotes.length; i++) {
        $(allNotes[i]).click(function () {
            getSingleNoteDb(notes[i])
            // showSingleNote(notes[i])
        });
    }
}

// async function getSingleNoteDb(note) {

//     // let noteToSend = Object.values(note)[0]
//     // let noteToSend = note.f
//     // console.log(noteToSend)

//     let result = await fetch("/rest/notes/" + note.id);
//     singleNote = await result.json();

//     showSingleNote();

// }


