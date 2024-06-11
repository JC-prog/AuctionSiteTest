package com.fyp.auction_app.models;

import jakarta.persistence.*;

@Entity
@Table(name = "duration_preset")
public class DurationPreset {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer duration_preset_id;

    private String duration_preset_name;

    private Integer duration_preset_hour;

    private Boolean is_active;

    // Default Constructor
    public DurationPreset() {

    }

    // Constructor
    public DurationPreset(
            String duration_preset_name,
            Integer duration_preset_hour,
            Boolean is_active
    ) {
        this.duration_preset_name = duration_preset_name;
        this.duration_preset_hour = duration_preset_hour;
        this.is_active = is_active;
    }

    // Getter and setter
    public Integer getDurationPresetId() {
        return duration_preset_id;
    }

    public void setDurationPresetId(Integer duration_preset_id) {
        this.duration_preset_id = duration_preset_id;
    }

    public String getDurationPresetName() {
        return duration_preset_name;
    }

    public void setDurationPresetName(String duration_preset_name) {
        this.duration_preset_name = duration_preset_name;
    }

    public Integer getDurationPresetHour() {
        return duration_preset_hour;
    }

    public void setDurationPresetHour(Integer duration_preset_hour) {
        this.duration_preset_hour = duration_preset_hour;
    }

    public Boolean getIsActive() {
        return is_active;
    }

    public void setIsActive(Boolean is_active) {
        this.is_active = is_active;
    }

}
