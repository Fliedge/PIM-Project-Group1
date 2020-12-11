package com.company;

import express.Express;
import express.middleware.Middleware;

import java.io.IOException;
import java.nio.file.Paths;
import java.util.List;

public class JExpress {

    public void callExpress() {

        Express app = new Express();
        Database db = new Database();

        app.get("/rest/notes", (request, response) -> {
            List<Note> notes = db.getNotes();

            response.json(notes);
        });


        app.get("/rest/notes/:id", (request, response) -> {

            int id = 0;
            try {
                id = Integer.parseInt(request.getParam("id"));

            } catch (NumberFormatException e) {
                e.printStackTrace();
            }

            Note note = db.getNoteByID(id);
            response.json(note);
        });

        app.get("/rest/getNotesOrderByTitle", (request, response) -> {
            List<Note> notes = db.getNotesOrderByTitle();

            response.json(notes);
        });

        app.get("/rest/getNotesOrderByLastUpdateAsc", (request, response) -> {
            List<Note> notes = db.getNotesOrderByLastupdateAsc();

            response.json(notes);
        });

        app.get("/rest/getNotesOrderByLastUpdateDesc", (request, response) -> {
            List<Note> notes = db.getNotesOrderByLastupdateDesc();

            response.json(notes);
        });

        app.post("/rest/notes", (request, response) -> {
            Note note = (Note) request.getBody(Note.class);


            db.createNote(note);
            response.send();
        });

        app.put("/rest/notes/id", (request, response) -> {
            Note note = (Note) request.getBody(Note.class);
//
            db.updateNote(note);

            response.send("Update Successful!");
        });

        app.delete("/rest/notes/:id", (request, response) -> {
            Note note = (Note) request.getBody(Note.class);
            db.deleteNote(note);

        });

        try {
            app.use(Middleware.statics(Paths.get("src/frontend").toString()));
        } catch (IOException e) {
            e.printStackTrace();
        }
        ;

        app.listen(1000);
        System.out.println("Server started on port 1000");

    }
}
