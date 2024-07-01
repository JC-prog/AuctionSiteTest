package com.model;

public class DurationPreset {
    private int durationID;
    private String name;
    private int hours;
    private boolean isActive;

    // Getters and Setters
    public DurationPreset(int durationID, String name,int hours, boolean isActive) {
        this.durationID = durationID;
        this.name = name;
        this.hours = hours;
        this.isActive = isActive;
    }

    public int getDurationID() {
        return durationID;
    }

    public void setDurationID(int durationID) {
        this.durationID = durationID;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getHours() {
        return hours;
    }

    public void setHours(int hours) {
        this.hours = hours;
    }

    public boolean isActive() {
        return isActive;
    }

    public void setActive(boolean isActive) {
        this.isActive = isActive;
    }
}
