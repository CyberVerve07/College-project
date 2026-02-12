package com.travelplanner.pdf;

import java.util.List;

public class ItineraryRequest {
    private double estimatedCost;
    private String recommendedVehicle;
    private String bookingCTA;
    private List<ItineraryDay> itinerary;

    public double getEstimatedCost() {
        return estimatedCost;
    }

    public void setEstimatedCost(double estimatedCost) {
        this.estimatedCost = estimatedCost;
    }

    public String getRecommendedVehicle() {
        return recommendedVehicle;
    }

    public void setRecommendedVehicle(String recommendedVehicle) {
        this.recommendedVehicle = recommendedVehicle;
    }

    public String getBookingCTA() {
        return bookingCTA;
    }

    public void setBookingCTA(String bookingCTA) {
        this.bookingCTA = bookingCTA;
    }

    public List<ItineraryDay> getItinerary() {
        return itinerary;
    }

    public void setItinerary(List<ItineraryDay> itinerary) {
        this.itinerary = itinerary;
    }
}
