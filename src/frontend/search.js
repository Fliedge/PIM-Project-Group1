
function searchNotes(){
    let searchString = $("#search-bar").val();

    if (searchString.length > 0){
        searchTitleInDb(searchString);
    }
    else{
        alert("Search string needs to be added")
    }
    $("#search-bar").val("");
}


async function searchTitleInDb(searchString){
    let searchResult = await fetch("rest/notes/seach/" + $(searchString));
    notes = await result.json();
    displayList();

}