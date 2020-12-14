package com.company;

import java.security.Timestamp;


public class Note {
    private int id;
    private String title;
    private String description;
    private String lastUpdate;
    private AddedImage addedImage;
    private AddedFile addedFile;


    public Note() {
    }

    public Note(String title, String description) {
        this.title = title;
        this.description = description;
    }

    public Note(int id, String title, String description) {
        this.id = id;
        this.title = title;
        this.description = description;
    }

    public Note(String title, String description, String lastUpdate) {
        this.title = title;
        this.description = description;
        this.lastUpdate = lastUpdate;
    }

    public Note(int id, String title, String description, String lastUpdate) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.lastUpdate = lastUpdate;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getLastUpdate() {
        return lastUpdate;
    }

    public void setLastUpdate(String lastUpdate) {
        this.lastUpdate = lastUpdate;
    }

    public AddedImage getAddedImage() {
        return addedImage;
    }

    public void setAddedImage(AddedImage addedImage) {
        this.addedImage = addedImage;
    }

    public AddedFile getAddedFile() {
        return addedFile;
    }

    public void setAddedFile(AddedFile addedFile) {
        this.addedFile = addedFile;
    }

    @Override
    public String toString() {
        return "Note{" +
                "id=" + id +
                ", title='" + title + '\'' +
                ", description='" + description + '\'' +
                ", lastUpdate=" + lastUpdate +
                '}';
    }

    
}
