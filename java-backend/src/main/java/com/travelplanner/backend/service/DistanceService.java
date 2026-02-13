package com.travelplanner.backend.service;

import com.google.maps.DistanceMatrixApi;
import com.google.maps.GeoApiContext;
import com.google.maps.model.DistanceMatrix;
import com.google.maps.model.DistanceMatrixElement;
import com.google.maps.model.DistanceMatrixRow;
import com.google.maps.model.TravelMode;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.IOException;

@Service
public class DistanceService {

    private final GeoApiContext context;

    public DistanceService(@Value("${google.maps.api-key}") String apiKey) {
        this.context = new GeoApiContext.Builder()
                .apiKey(apiKey)
                .build();
    }

    public long calculateDistance(String origin, String destination) throws Exception {
        try {
            DistanceMatrix result = DistanceMatrixApi.newRequest(context)
                    .origins(origin)
                    .destinations(destination)
                    .mode(TravelMode.DRIVING)
                    .await();

            if (result.rows.length > 0) {
                DistanceMatrixRow row = result.rows[0];
                if (row.elements.length > 0) {
                    DistanceMatrixElement element = row.elements[0];
                    if (element.status.toString().equals("OK")) {
                        // Return distance in meters
                        return element.distance.inMeters;
                    } else {
                        throw new Exception("Error calculating distance: " + element.status);
                    }
                }
            }
            throw new Exception("No route found between " + origin + " and " + destination);

        } catch (Exception e) {
            throw new Exception("Error calling Google Maps API: " + e.getMessage());
        }
    }
}
