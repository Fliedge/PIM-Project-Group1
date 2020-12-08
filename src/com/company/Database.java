package com.company;

import com.fasterxml.jackson.core.JsonProcessingException;
import express.utils.Utils;

import java.sql.*;
import java.util.List;

public class Database {

    private Connection conn;

    public Database(){

        try {
            conn = DriverManager.getConnection("jdbc:sqlite:pim-grupp1.db");
        } catch (SQLException throwables) {
            throwables.printStackTrace();
        }
    }

    // Get all notes from database
    public List<Note> getNotes(){
        List<Note> notes=null;
        String query = "SELECT * FROM notes:";

        try {
            PreparedStatement stmt = conn.prepareStatement(query);
            ResultSet rs = stmt.executeQuery();
            Note[] notesFromRS = (Note[]) Utils.readResultSetToObject(rs, Note[].class);
            notes = List.of(notesFromRS);
        } catch (SQLException throwables) {
            throwables.printStackTrace();
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }

        return notes;
    }

    // Get one specific note from database by id
    public Note getNoteByID(int id){
        Note note = null;
        String query = "SELECT * FROM notes WHERE id = ?;";

        try {
            PreparedStatement stmt = conn.prepareStatement(query);
            stmt.setInt(1,id);
            ResultSet rs = stmt.executeQuery();
            Note[] notesFromRS = (Note[]) Utils.readResultSetToObject(rs, Note[].class);
            note = notesFromRS[0];
        } catch (SQLException throwables) {
            throwables.printStackTrace();
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }
        return note;
    }

    // Add new note into database
    public void createNote(Note note){
        String query = "INSERT INTO notes (title, description, last_update) VALUES (?,?, CURRENT_TIMESTAMP);";
        try {
            PreparedStatement stmt =conn.prepareStatement(query);
            stmt.setString(1, note.getTitle());
            stmt.setString(2,note.getDescription());
            stmt.executeUpdate();
        } catch (SQLException throwables) {
            throwables.printStackTrace();
        }
    }

    // Update note in database
    public void updateNote(Note note) {
        String query = "UPDATE notes SET title = ?, description =?, last_update = CURRENT_TIMESTAMP WHERE id = ?;)";
        try {
            PreparedStatement stmt= conn.prepareStatement(query);
            stmt.setString(1, note.getTitle());
            stmt.setString(2,note.getDescription());
            stmt.setInt(3, note.getId());
            stmt.executeUpdate();
        } catch (SQLException throwables) {
            throwables.printStackTrace();
        }
    }

    // Delete note in database
    public void deleteNote(Note note) {
        String query = "DELETE FROM notes WHERE id = ?;";
        try {
            PreparedStatement stmt = conn.prepareStatement(query);
            stmt.setInt(1, note.getId());
            stmt.executeUpdate();
        } catch (SQLException throwables) {
            throwables.printStackTrace();
        }
    }
}


