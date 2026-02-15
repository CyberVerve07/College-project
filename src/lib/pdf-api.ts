import { ItineraryResponse } from '@/ai/flows/itinerary-types';
import jsPDF from 'jspdf';

export async function downloadItineraryPdf(itinerary: ItineraryResponse) {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const margin = 20;
    const contentWidth = pageWidth - margin * 2;
    let y = margin;

    const checkPageBreak = (needed: number) => {
        if (y + needed > pageHeight - margin) {
            doc.addPage();
            y = margin;
        }
    };

    // ── Header ──
    doc.setFillColor(15, 118, 110); // teal-700
    doc.rect(0, 0, pageWidth, 45, 'F');

    doc.setTextColor(255, 255, 255);
    doc.setFontSize(24);
    doc.setFont('helvetica', 'bold');
    doc.text('Your Himachal Trip', margin, 22);

    doc.setFontSize(11);
    doc.setFont('helvetica', 'normal');
    doc.text('Crafted by AI • Himachal Cab Service', margin, 34);

    y = 60;

    // ── Quick Stats ──
    doc.setTextColor(50, 50, 50);
    doc.setFontSize(10);
    doc.setFont('helvetica', 'bold');

    const statBoxWidth = contentWidth / 3;
    const stats = [
        { label: 'Est. Cost', value: `₹${itinerary.estimatedCost.toLocaleString()}` },
        { label: 'Vehicle', value: itinerary.recommendedVehicle },
        { label: 'Days', value: `${itinerary.itinerary.length} Days` },
    ];

    stats.forEach((stat, i) => {
        const x = margin + i * statBoxWidth;

        doc.setFillColor(240, 253, 250); // teal-50
        doc.roundedRect(x, y, statBoxWidth - 5, 22, 3, 3, 'F');

        doc.setTextColor(100, 100, 100);
        doc.setFontSize(8);
        doc.setFont('helvetica', 'normal');
        doc.text(stat.label, x + 5, y + 8);

        doc.setTextColor(15, 118, 110);
        doc.setFontSize(12);
        doc.setFont('helvetica', 'bold');
        doc.text(stat.value, x + 5, y + 18);
    });

    y += 35;

    // ── Separator ──
    doc.setDrawColor(200, 200, 200);
    doc.setLineWidth(0.3);
    doc.line(margin, y, pageWidth - margin, y);
    y += 10;

    // ── Day-by-Day Itinerary ──
    doc.setTextColor(30, 30, 30);
    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.text('Day-by-Day Plan', margin, y);
    y += 12;

    itinerary.itinerary.forEach((day) => {
        checkPageBreak(50);

        // Day number badge
        doc.setFillColor(15, 118, 110);
        doc.circle(margin + 6, y + 3, 6, 'F');
        doc.setTextColor(255, 255, 255);
        doc.setFontSize(9);
        doc.setFont('helvetica', 'bold');
        doc.text(`${day.day}`, margin + 6, y + 5, { align: 'center' });

        // Day title
        doc.setTextColor(30, 30, 30);
        doc.setFontSize(13);
        doc.setFont('helvetica', 'bold');
        doc.text(day.title, margin + 16, y + 5);
        y += 10;

        // Travel time
        doc.setTextColor(120, 120, 120);
        doc.setFontSize(8);
        doc.setFont('helvetica', 'italic');
        doc.text(`⏱ ${day.travelTime}`, margin + 16, y + 2);
        y += 7;

        // Description (with word wrap)
        doc.setTextColor(70, 70, 70);
        doc.setFontSize(9);
        doc.setFont('helvetica', 'normal');
        const lines = doc.splitTextToSize(day.description, contentWidth - 16);
        lines.forEach((line: string) => {
            checkPageBreak(6);
            doc.text(line, margin + 16, y);
            y += 5;
        });
        y += 8;
    });

    // ── Footer CTA ──
    checkPageBreak(30);
    doc.setDrawColor(200, 200, 200);
    doc.line(margin, y, pageWidth - margin, y);
    y += 10;

    doc.setFillColor(15, 118, 110);
    doc.roundedRect(margin, y, contentWidth, 22, 3, 3, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(11);
    doc.setFont('helvetica', 'bold');
    doc.text(itinerary.bookingCTA || 'Book your dream trip now!', pageWidth / 2, y + 13, { align: 'center' });

    // ── Save ──
    const firstName = itinerary.itinerary[0]?.title.split(' ')[0] || 'MyTrip';
    doc.save(`TripTo${firstName}.pdf`);
}
