let notesSortedByTitle = [];
let notesSortedByDateAsc = [];
let notesSortedByDateDesc = [];

async function getAllNotesDbSortedByTitle() {

    let result = await fetch("/rest/getNotesOrderByTitle");
    notesSortedByTitle = await result.json();
    homepageList(notesSortedByTitle);

}

async function getAllNotesDbSortedByDateAsc() {

    let result = await fetch("/rest/getNotesOrderByLastUpdateAsc");
    notesSortedByDateAsc = await result.json();
    homepageList(notesSortedByDateAsc);

}

async function getAllNotesDbSortedByDateDesc() {

    let result = await fetch("/rest/getNotesOrderByLastUpdateDesc");
    notesSortedByDateDesc = await result.json();
    homepageList(notesSortedByDateDesc);

}



function sortingChoices(menu){
    
    if (menu.value == '1') {
        getAllNotesDbSortedByTitle();
    } else if (menu.value == '2') {
        getAllNotesDbSortedByDateAsc();
    } else if (menu.value == '3') {
        getAllNotesDbSortedByDateDesc();
    }
    
}


function homepageList(notes) {

    let list = $("#home-list");
    list.empty();


    for (note of notes) {
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
    }

    findNoteId();

}


