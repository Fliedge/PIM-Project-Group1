noteToEdit = []

async function updateNoteDb(note) {

    let result = await fetch("/rest/notes/id", {
        method: "PUT",
        body: JSON.stringify(note)
    });
}

function {} 



