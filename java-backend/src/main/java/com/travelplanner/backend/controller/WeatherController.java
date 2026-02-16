package com.travelplanner.backend.controller;

import com.travelplanner.backend.model.WeatherResponse;
import com.travelplanner.backend.service.WeatherService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/weather")
@CrossOrigin(origins = "http://localhost:3000") // Allow frontend
public class WeatherController {

    private final WeatherService weatherService;

    public WeatherController(WeatherService weatherService) {
        this.weatherService = weatherService;
    }

    @GetMapping
    public WeatherResponse getWeather(@RequestParam double lat, @RequestParam double lng) {
        return weatherService.getCurrentWeather(lat, lng);
    }
}
