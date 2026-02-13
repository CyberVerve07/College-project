package com.travelplanner.backend.controller;

import com.travelplanner.backend.service.DistanceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000") // Allow Next.js frontend
public class DistanceController {

    @Autowired
    private DistanceService distanceService;

    @GetMapping("/calculate-distance")
    public ResponseEntity<?> getDistance(@RequestParam String from, @RequestParam String to) {
        try {
            long distanceInMeters = distanceService.calculateDistance(from, to);
            double distanceInKm = distanceInMeters / 1000.0;

            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("distanceKm", distanceInKm);
            response.put("origin", from);
            response.put("destination", to);

            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, Object> errorResponse = new HashMap<>();
            errorResponse.put("success", false);
            errorResponse.put("error", e.getMessage());
            return ResponseEntity.badRequest().body(errorResponse);
        }
    }
}
