package com.model;

public class Condition {
    private int conditionID;
    private String name;
    private boolean isActive;

    // Default constructor
    public Condition() {}

    // Parameterized constructor
    public Condition(int conditionID, String name, boolean isActive) {
        this.conditionID = conditionID;
        this.name = name;
        this.isActive = isActive;
    }

    // Getter and Setter for conditionID
    public int getConditionID() {
        return conditionID;
    }

    public void setConditionID(int conditionID) {
        this.conditionID = conditionID;
    }

    // Getter and Setter for name
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    // Getter and Setter for isActive
    public boolean isIsActive() {
        return isActive;
    }

    public void setIsActive(boolean isActive) {
        this.isActive = isActive;
    }

    @Override
    public String toString() {
        return "Condition{" +
                "conditionID=" + conditionID +
                ", name='" + name + '\'' +
                ", isActive=" + isActive +
                '}';
    }
}
