package com.travelplanner.backend.service;

import com.travelplanner.backend.model.WeatherResponse;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import java.time.LocalDate;
import java.time.Month;

@Service
public class WeatherService {

    @Value("${weather.api.key}")
    private String apiKey;

    private final RestTemplate restTemplate = new RestTemplate();
    private final ObjectMapper objectMapper = new ObjectMapper();

    public WeatherResponse getCurrentWeather(double lat, double lng) {
        if (apiKey == null || apiKey.isEmpty() || apiKey.contains("INSERT")) {
            // Mock data if API Key is not set
            return new WeatherResponse(20.0, "Sunny (Mock)", "01d", "Safe", "Open", "Great time to visit!");
        }

        String url = UriComponentsBuilder.fromHttpUrl("https://api.openweathermap.org/data/2.5/weather")
                .queryParam("lat", lat)
                .queryParam("lon", lng)
                .queryParam("appid", apiKey)
                .queryParam("units", "metric")
                .toUriString();

        try {
            String response = restTemplate.getForObject(url, String.class);
            JsonNode root = objectMapper.readTree(response);

            double temp = root.path("main").path("temp").asDouble();
            String description = root.path("weather").get(0).path("description").asText();
            String icon = root.path("weather").get(0).path("icon").asText();
            String mainCondition = root.path("weather").get(0).path("main").asText();

            String safetyStatus = "Safe";
            String roadStatus = "Open";

            // Simple logic for safety/road warnings
            if (mainCondition.equalsIgnoreCase("Rain") || mainCondition.equalsIgnoreCase("Drizzle")) {
                safetyStatus = "Caution";
                roadStatus = "Slightly Slippery";
            } else if (mainCondition.equalsIgnoreCase("Snow") || mainCondition.equalsIgnoreCase("Thunderstorm")) {
                safetyStatus = "Unsafe";
                roadStatus = "Warning: Possible Closures";
                if (temp < -5) {
                    roadStatus = "Likely Closed due to Snow";
                }
            } else if (temp > 40) {
                safetyStatus = "Caution (Heat)";
            }

            // Determine "Best Time" (simplified logic based on month and generic hill
            // station preferences)
            String bestTimeStatus = getBestTimeStatus(lat);

            return new WeatherResponse(temp, description, icon, safetyStatus, roadStatus, bestTimeStatus);

        } catch (Exception e) {
            e.printStackTrace();
            return new WeatherResponse(0.0, "Error fetching weather", "01d", "Unknown", "Unknown", "Unknown");
        }
    }

    private String getBestTimeStatus(double lat) {
        Month currentMonth = LocalDate.now().getMonth();
        // Assuming most destinations are in Himachal (North India)
        // Best time: March-June (Summer), Sept-Nov (Autumn)
        // Monsoon: July-August
        // Winter: Dec-Feb

        if (currentMonth == Month.JULY || currentMonth == Month.AUGUST) {
            return "Monsoon Season - Check Forecast";
        } else if (currentMonth == Month.DECEMBER || currentMonth == Month.JANUARY || currentMonth == Month.FEBRUARY) {
            return "Winter - Good for Snow, risky roads";
        } else {
            return "Great time to visit!";
        }
    }
}
