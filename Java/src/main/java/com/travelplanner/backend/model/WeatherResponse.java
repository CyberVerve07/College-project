package com.travelplanner.backend.model;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class WeatherResponse {
    private double temperature;
    private String description;
    private String icon;
    private String safetyStatus; // Safe, Caution, Unsafe
    private String roadStatus; // Open, Warning, Closed (Estimated)
    private String bestTimeStatus; // "Great time to visit!", "Off-season", etc.
}
