package com.company;

import java.text.SimpleDateFormat;

public class Note {
    private int id;
    private String title;
    private String description;
    private SimpleDateFormat lastUpdate;


    public Note() {
    }

    public Note(String title, String description) {
        this.title = title;
        this.description = description;
    }

    public Note(String title, String description, SimpleDateFormat lastUpdate) {
        this.title = title;
        this.description = description;
        this.lastUpdate = lastUpdate;
    }

    public Note(int id, String title, String description, SimpleDateFormat lastUpdate) {
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

    public SimpleDateFormat getLastUpdate() {
        return lastUpdate;
    }

    public void setLastUpdate(SimpleDateFormat lastUpdate) {
        this.lastUpdate = lastUpdate;
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
