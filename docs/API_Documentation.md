# Destiny Tour & Travels API Documentation

## Overview
This document describes the API endpoints for the Destiny Tour & Travels backend services, which include functionality for distance calculation, fare estimation, weather information, and PDF generation.

## Endpoints

### 1. Distance Calculation
- **Endpoint:** `GET /api/distance`
- **Description:** Calculate the distance between two locations.
- **Query Parameters:**  
  - `origin`: Starting location (string)
  - `destination`: Destination location (string)
- **Response:**  
  ```json
  {
    "distance": "10 kilometers",
    "duration": "15 minutes"
  }
  ```

### 2. Fare Estimation
- **Endpoint:** `POST /api/fare-estimate`
- **Description:** Estimate the fare based on distance and type of vehicle.
- **Request Body:**  
  ```json
  {
    "distance": 10,
    "vehicleType": "sedan"
  }
  ```
- **Response:**  
  ```json
  {
    "estimatedFare": "$20"
  }
  ```

### 3. Weather Information
- **Endpoint:** `GET /api/weather`
- **Description:** Get the current weather for a specific location.
- **Query Parameters:**  
  - `location`: Location for weather information (string)
- **Response:**  
  ```json
  {
    "temperature": "22°C",
    "condition": "Clear"
  }
  ```

### 4. PDF Generation
- **Endpoint:** `POST /api/generate-pdf`
- **Description:** Generate a PDF document for travel itinerary.
- **Request Body:**  
  ```json
  {
    "itineraryId": "12345"
  }
  ```
- **Response:**  
  - **Status Code:** `200 OK`
  - **Content:** PDF file gets generated, downloadable via a link.

## Error Handling
- Common error responses include:  
  - **400 Bad Request**: Invalid parameters.
  - **404 Not Found**: Resource not found.
  - **500 Internal Server Error**: Generic server error.

## Conclusion
This API documentation provides a comprehensive overview suitable for developers integrating with the Destiny Tour & Travels backend. For additional inquiries, please reach out to the development team.