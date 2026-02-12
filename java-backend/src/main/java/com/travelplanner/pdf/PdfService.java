package com.travelplanner.pdf;

import com.lowagie.text.*;
import com.lowagie.text.pdf.PdfWriter;
import org.springframework.stereotype.Service;

import java.io.ByteArrayOutputStream;
import java.io.IOException;

@Service
public class PdfService {

    public byte[] generateItineraryPdf(ItineraryRequest request) throws DocumentException, IOException {
        ByteArrayOutputStream out = new ByteArrayOutputStream();
        Document document = new Document();
        PdfWriter.getInstance(document, out);

        document.open();

        Font titleFont = FontFactory.getFont(FontFactory.HELVETICA_BOLD, 24, Font.BOLD);
        Font subTitleFont = FontFactory.getFont(FontFactory.HELVETICA, 18);
        Font normalFont = FontFactory.getFont(FontFactory.HELVETICA, 12);
        Font boldFont = FontFactory.getFont(FontFactory.HELVETICA_BOLD, 12);

        // Header
        Paragraph title = new Paragraph("Your Custom Travel Itinerary", titleFont);
        title.setAlignment(Element.ALIGN_CENTER);
        document.add(title);
        document.add(new Paragraph("\n"));

        // Summary
        document.add(new Paragraph("Budget: INR " + request.getEstimatedCost(), subTitleFont));
        document.add(new Paragraph("Recommended Vehicle: " + request.getRecommendedVehicle(), subTitleFont));
        document.add(new Paragraph("\n"));
        document.add(new Paragraph("--------------------------------------------------"));
        document.add(new Paragraph("\n"));

        // Days
        if (request.getItinerary() != null) {
            for (ItineraryDay day : request.getItinerary()) {
                Paragraph dayTitle = new Paragraph("Day " + day.getDay() + ": " + day.getTitle(), boldFont);
                document.add(dayTitle);

                Paragraph time = new Paragraph("Travel Time: " + day.getTravelTime(), normalFont);
                document.add(time);

                Paragraph desc = new Paragraph(day.getDescription(), normalFont);
                document.add(desc);

                document.add(new Paragraph("\n"));
            }
        }

        // Footer
        document.add(new Paragraph("--------------------------------------------------"));
        document.add(new Paragraph("\n"));
        Paragraph cta = new Paragraph(request.getBookingCTA(), boldFont);
        cta.setAlignment(Element.ALIGN_CENTER);
        document.add(cta);

        document.close();
        return out.toByteArray();
    }
}
