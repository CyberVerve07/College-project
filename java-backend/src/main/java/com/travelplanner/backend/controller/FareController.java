package com.travelplanner.backend.controller;

import org.springframework.web.bind.annotation.*;
import java.util.Map;
import java.util.HashMap;

@RestController
@RequestMapping("/api/fare")
@CrossOrigin(origins = "*") // Allow requests from Next.js frontend
public class FareController {

    @PostMapping("/calculate")
    public Map<String, Object> calculateFare(@RequestBody Map<String, Object> request) {
        String from = (String) request.get("from");
        String to = (String) request.get("to");
        String vehicleType = (String) request.getOrDefault("vehicleType", "Sedan");

        // Parse distance safely
        double distance = 0.0;
        Object distanceObj = request.get("distance");
        if (distanceObj instanceof Number) {
            distance = ((Number) distanceObj).doubleValue();
        } else if (distanceObj instanceof String) {
            try {
                distance = Double.parseDouble((String) distanceObj);
            } catch (NumberFormatException e) {
                distance = 0.0;
            }
        }

        double ratePerKm = 25.0;
        if (vehicleType.toLowerCase().contains("suv")) {
            ratePerKm = 35.0; // Higher rate for SUV
        } else if (vehicleType.toLowerCase().contains("tempo")) {
            ratePerKm = 50.0;
        }

        // Pricing Logic:
        // 4km = 100rs (Implies Minimum 100rs or 25rs/km)
        // 8km = 200rs (25 * 8)

        double fare = distance * ratePerKm;

        // Minimum fare logic (optional based on interpretation)
        if (fare < 100 && distance > 0) {
            fare = 100.0;
        }

        Map<String, Object> response = new HashMap<>();
        response.put("estimatedFare", (int) Math.ceil(fare));
        response.put("distanceKm", distance);
        response.put("vehicle", vehicleType);
        response.put("breakdown", distance + "km @ ₹" + ratePerKm + "/km");

        return response;
    }
}
