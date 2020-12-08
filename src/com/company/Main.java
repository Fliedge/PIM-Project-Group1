package com.company;


import express.Express;
import express.middleware.Middleware;

import java.io.IOException;
import java.nio.file.Paths;
import java.util.List;

public class Main {

    public static void main(String[] args) {


        Express app = new Express();
        Database db = new Database();

        app.get("/rest/notes", (request, response) -> {
            List<Note> notes = db.getNotes();

            response.json(notes);
        });

        app.get("/rest/notes/:id", (request, response) -> {
            try {
                int id = Integer.parseInt(request.getParam("id"));

                Note note = db.getNoteByID(id);

                response.json(note);
            } catch (NumberFormatException e) {
                e.printStackTrace();
            }
        });

        app.post("/rest/notes", (request, response) -> {
            Note note = (Note) request.getBody(Note.class);

            db.createNote(note);

        });

        app.put("/rest/notes/:id", (request, response) -> {
            Note note = (Note) request.getBody(Note.class);
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
        };

        app.listen(1000);
        System.out.println("Server started on port 1000");


    }
}
