import { ItineraryResponse } from '@/ai/ai/flows/itinerary-types';
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

    // Header
    doc.setFillColor(15, 118, 110);
    doc.rect(0, 0, pageWidth, 45, 'F');

    doc.setTextColor(255, 255, 255);
    doc.setFontSize(24);
    doc.setFont('helvetica', 'bold');
    doc.text('Your Himachal Trip', margin, 22);

    doc.setFontSize(11);
    doc.setFont('helvetica', 'normal');
    doc.text('Crafted by Leo AI | Destiny Tour Travel', margin, 34);

    y = 60;

    // Quick Stats
    doc.setTextColor(50, 50, 50);
    doc.setFontSize(10);
    doc.setFont('helvetica', 'bold');

    const statBoxWidth = contentWidth / 3;
    const stats = [
        { label: 'Total Budget', value: itinerary.budgetBreakdown?.total || 'N/A' },
        { label: 'Days', value: `${itinerary.itinerary.length} Days` },
        { label: 'Destinations', value: `${itinerary.bestDestinations?.length || 0} Places` },
    ];

    stats.forEach((stat, i) => {
        const x = margin + i * statBoxWidth;

        doc.setFillColor(240, 253, 250);
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

    // Best Destinations
    checkPageBreak(30);
    doc.setTextColor(30, 30, 30);
    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.text('Best Destinations', margin, y);
    y += 10;

    itinerary.bestDestinations?.forEach((dest) => {
        checkPageBreak(15);
        doc.setTextColor(15, 118, 110);
        doc.setFontSize(11);
        doc.setFont('helvetica', 'bold');
        doc.text(`- ${dest.name}`, margin + 5, y);
        y += 5;

        doc.setTextColor(80, 80, 80);
        doc.setFontSize(9);
        doc.setFont('helvetica', 'normal');
        const reasonLines = doc.splitTextToSize(dest.reason, contentWidth - 10);
        reasonLines.forEach((line: string) => {
            checkPageBreak(5);
            doc.text(line, margin + 10, y);
            y += 5;
        });
        y += 3;
    });

    y += 5;

    // Separator
    doc.setDrawColor(200, 200, 200);
    doc.setLineWidth(0.3);
    doc.line(margin, y, pageWidth - margin, y);
    y += 10;

    // Day-by-Day Itinerary
    doc.setTextColor(30, 30, 30);
    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.text('Day-by-Day Plan', margin, y);
    y += 12;

    itinerary.itinerary.forEach((day) => {
        checkPageBreak(60);

        doc.setFillColor(15, 118, 110);
        doc.circle(margin + 6, y + 3, 6, 'F');
        doc.setTextColor(255, 255, 255);
        doc.setFontSize(9);
        doc.setFont('helvetica', 'bold');
        doc.text(`${day.day}`, margin + 6, y + 5, { align: 'center' });

        doc.setTextColor(30, 30, 30);
        doc.setFontSize(13);
        doc.setFont('helvetica', 'bold');
        doc.text(day.title, margin + 16, y + 5);
        y += 12;

        doc.setTextColor(180, 130, 0);
        doc.setFontSize(8);
        doc.setFont('helvetica', 'bold');
        doc.text('Morning:', margin + 16, y);
        y += 5;
        doc.setTextColor(70, 70, 70);
        doc.setFontSize(9);
        doc.setFont('helvetica', 'normal');
        const morningLines = doc.splitTextToSize(day.morning, contentWidth - 20);
        morningLines.forEach((line: string) => {
            checkPageBreak(5);
            doc.text(line, margin + 16, y);
            y += 5;
        });
        y += 3;

        doc.setTextColor(200, 100, 0);
        doc.setFontSize(8);
        doc.setFont('helvetica', 'bold');
        doc.text('Afternoon:', margin + 16, y);
        y += 5;
        doc.setTextColor(70, 70, 70);
        doc.setFontSize(9);
        doc.setFont('helvetica', 'normal');
        const afternoonLines = doc.splitTextToSize(day.afternoon, contentWidth - 20);
        afternoonLines.forEach((line: string) => {
            checkPageBreak(5);
            doc.text(line, margin + 16, y);
            y += 5;
        });
        y += 3;

        doc.setTextColor(80, 80, 160);
        doc.setFontSize(8);
        doc.setFont('helvetica', 'bold');
        doc.text('Evening:', margin + 16, y);
        y += 5;
        doc.setTextColor(70, 70, 70);
        doc.setFontSize(9);
        doc.setFont('helvetica', 'normal');
        const eveningLines = doc.splitTextToSize(day.evening, contentWidth - 20);
        eveningLines.forEach((line: string) => {
            checkPageBreak(5);
            doc.text(line, margin + 16, y);
            y += 5;
        });

        y += 3;
        doc.setTextColor(120, 120, 120);
        doc.setFontSize(8);
        doc.setFont('helvetica', 'italic');
        doc.text(`Approx: ${day.dailyExpense}`, margin + 16, y);
        y += 10;
    });

    // Budget Breakdown
    checkPageBreak(40);
    doc.setDrawColor(200, 200, 200);
    doc.line(margin, y, pageWidth - margin, y);
    y += 10;

    doc.setTextColor(30, 30, 30);
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text('Budget Breakdown', margin, y);
    y += 10;

    if (itinerary.budgetBreakdown) {
        const entries = Object.entries(itinerary.budgetBreakdown);
        entries.forEach(([key, value]) => {
            checkPageBreak(8);
            doc.setTextColor(80, 80, 80);
            doc.setFontSize(10);
            doc.setFont('helvetica', key === 'total' ? 'bold' : 'normal');
            doc.text(`${key.charAt(0).toUpperCase() + key.slice(1)}:`, margin + 5, y);
            doc.text(value, margin + contentWidth - 40, y, { align: 'right' });
            y += 7;
        });
    }

    // Local Tips
    checkPageBreak(30);
    y += 5;
    doc.setTextColor(30, 30, 30);
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text('Local Tips', margin, y);
    y += 10;

    itinerary.localTips?.forEach((tip) => {
        checkPageBreak(10);
        doc.setTextColor(70, 70, 70);
        doc.setFontSize(9);
        doc.setFont('helvetica', 'normal');
        const tipLines = doc.splitTextToSize(`- ${tip}`, contentWidth - 5);
        tipLines.forEach((line: string) => {
            checkPageBreak(5);
            doc.text(line, margin + 5, y);
            y += 5;
        });
        y += 3;
    });

    // Footer CTA
    checkPageBreak(30);
    doc.setDrawColor(200, 200, 200);
    doc.line(margin, y, pageWidth - margin, y);
    y += 10;

    doc.setFillColor(15, 118, 110);
    doc.roundedRect(margin, y, contentWidth, 22, 3, 3, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(11);
    doc.setFont('helvetica', 'bold');
    doc.text(itinerary.bookingCTA || 'Contact Destiny Tour Travel to book!', pageWidth / 2, y + 13, { align: 'center' });

    // Save
    const firstName = itinerary.bestDestinations?.[0]?.name || 'Himachal';
    doc.save(`LeoAI_TripTo_${firstName}.pdf`);
}
