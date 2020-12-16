package com.company;

public class AddedFile {

    private int id;
    private int noteId;
    private String url;

    public AddedFile() {
    }

    public AddedFile(int id, int noteId, String url) {
        this.id = id;
        this.noteId = noteId;
        this.url = url;
    }

    public AddedFile(int noteId, String url) {
        this.noteId = noteId;
        this.url = url;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getNoteId() {
        return noteId;
    }

    public void setNoteId(int noteId) {
        this.noteId = noteId;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    @Override
    public String toString() {
        return "AddedFile{" +
                "id=" + id +
                ", noteId=" + noteId +
                ", url='" + url + '\'' +
                '}';
    }
}
