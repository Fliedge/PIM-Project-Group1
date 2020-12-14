package com.company;

public class AddedImage {

    private int id;
    private int noteId;
    private String url;
    private String altText;


    public AddedImage() {
    }

    public AddedImage(int id, int noteId, String url, String altText) {
        this.id = id;
        this.noteId = noteId;
        this.url = url;
        this.altText = altText;
    }

    public AddedImage(int noteId, String url, String altText) {
        this.noteId = noteId;
        this.url = url;
        this.altText = altText;
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

    public String getAltText() {
        return altText;
    }

    public void setAltText(String altText) {
        this.altText = altText;
    }

    @Override
    public String toString() {
        return "AddedImage{" +
                "id=" + id +
                ", noteId=" + noteId +
                ", url='" + url + '\'' +
                ", altText='" + altText + '\'' +
                '}';
    }
}
