import { jsPDF } from 'jspdf';
import { EPaperPage, EPAPER_PAGES } from '../epaperData';

// Convert ArrayBuffer to Base64 safely
function arrayBufferToBase64(buffer: ArrayBuffer): string {
  let binary = '';
  const bytes = new Uint8Array(buffer);
  const len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return window.btoa(binary);
}

// Global font cache to avoid fetching multiple times
let devanagariFontBase64: string | null = null;

async function loadDevanagariFont(): Promise<string | null> {
  if (devanagariFontBase64) return devanagariFontBase64;
  
  try {
    // High-quality Noto Sans Devanagari font from jsdelivr / fontsource
    const fontUrl = 'https://cdn.jsdelivr.net/fontsource/fonts/noto-sans-devanagari@latest/devanagari-400-normal.ttf';
    const response = await fetch(fontUrl);
    if (!response.ok) throw new Error("Failed to fetch font");
    const buffer = await response.arrayBuffer();
    devanagariFontBase64 = arrayBufferToBase64(buffer);
    return devanagariFontBase64;
  } catch (error) {
    console.error("Error loading Devanagari font, using Helvetica fallback", error);
    return null;
  }
}

interface GeneratePDFOptions {
  pageNumber?: number; // if undefined, generate all pages
  language: 'english' | 'marathi' | 'hindi';
}

export async function generateEPaperPDF(options: GeneratePDFOptions): Promise<string> {
  const { pageNumber, language } = options;
  const isDevanagari = language === 'marathi' || language === 'hindi';
  
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4' // 210 x 297 mm
  });

  if (isDevanagari) {
    const fontBase64 = await loadDevanagariFont();
    if (fontBase64) {
      doc.addFileToVFS('NotoSansDevanagari-Regular.ttf', fontBase64);
      doc.addFont('NotoSansDevanagari-Regular.ttf', 'NotoSansDevanagari', 'normal');
      doc.setFont('NotoSansDevanagari');
    } else {
      doc.setFont('Helvetica');
    }
  } else {
    doc.setFont('Helvetica');
  }

  const pagesToGenerate = pageNumber 
    ? EPAPER_PAGES.filter(p => p.pageNumber === pageNumber)
    : EPAPER_PAGES;

  pagesToGenerate.forEach((page, index) => {
    if (index > 0) {
      doc.addPage();
      if (isDevanagari && devanagariFontBase64) {
        doc.setFont('NotoSansDevanagari');
      } else {
        doc.setFont('Helvetica');
      }
    }

    renderPageOnDoc(doc, page, language);
  });

  const pdfBlob = doc.output('blob');
  return URL.createObjectURL(pdfBlob);
}

export async function downloadEPaperPDFDirect(options: GeneratePDFOptions & { filename: string }): Promise<void> {
  const { pageNumber, language, filename } = options;
  const isDevanagari = language === 'marathi' || language === 'hindi';
  
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4' // 210 x 297 mm
  });

  if (isDevanagari) {
    const fontBase64 = await loadDevanagariFont();
    if (fontBase64) {
      doc.addFileToVFS('NotoSansDevanagari-Regular.ttf', fontBase64);
      doc.addFont('NotoSansDevanagari-Regular.ttf', 'NotoSansDevanagari', 'normal');
      doc.setFont('NotoSansDevanagari');
    } else {
      doc.setFont('Helvetica');
    }
  } else {
    doc.setFont('Helvetica');
  }

  const pagesToGenerate = pageNumber 
    ? EPAPER_PAGES.filter(p => p.pageNumber === pageNumber)
    : EPAPER_PAGES;

  pagesToGenerate.forEach((page, index) => {
    if (index > 0) {
      doc.addPage();
      if (isDevanagari && devanagariFontBase64) {
        doc.setFont('NotoSansDevanagari');
      } else {
        doc.setFont('Helvetica');
      }
    }

    renderPageOnDoc(doc, page, language);
  });

  doc.save(filename);
}

function renderPageOnDoc(doc: jsPDF, page: EPaperPage, language: 'english' | 'marathi' | 'hindi') {
  const isDevanagari = language === 'marathi' || language === 'hindi';
  const width = doc.internal.pageSize.getWidth(); // 210
  const height = doc.internal.pageSize.getHeight(); // 297
  const margin = 12;

  // Draw background border
  doc.setDrawColor(44, 44, 40); // Charcoal
  doc.setLineWidth(0.4);
  doc.rect(margin, margin, width - 2 * margin, height - 2 * margin);
  
  // Inner thin border (double border effect)
  doc.setLineWidth(0.15);
  doc.rect(margin + 1, margin + 1, width - 2 * margin - 2, height - 2 * margin - 2);

  // --- NEWSPAPER MASTHEAD ---
  const mastheadTop = margin + 4;
  
  // Sub-title/Motto
  doc.setFontSize(8);
  doc.setTextColor(80, 80, 80);
  const motto = language === 'marathi' 
    ? 'आपला आवाज आपली शक्ती' 
    : language === 'hindi'
      ? 'आपकी आवाज़ आपकी शक्ति'
      : 'Your Voice, Your Strength';
  doc.text(motto, width / 2, mastheadTop, { align: 'center' });

  // Main Banner Text
  doc.setFontSize(36);
  doc.setTextColor(190, 24, 24); // brand red #be1818
  const titleText = isDevanagari ? 'जनशक्ती' : 'Janshakti';
  
  // Draw decorative horizontal lines framing title
  doc.setDrawColor(190, 24, 24);
  doc.setLineWidth(0.8);
  doc.line(margin + 5, mastheadTop + 6, (width / 2) - 30, mastheadTop + 6);
  doc.line((width / 2) + 30, mastheadTop + 6, width - margin - 5, mastheadTop + 6);

  doc.text(titleText, width / 2, mastheadTop + 10, { align: 'center' });

  // Secondary border under title
  doc.setDrawColor(44, 44, 40);
  doc.setLineWidth(0.5);
  doc.line(margin + 2, mastheadTop + 14, width - margin - 2, mastheadTop + 14);
  doc.setLineWidth(0.15);
  doc.line(margin + 2, mastheadTop + 15, width - margin - 2, mastheadTop + 15);

  // Date, Page Number, Edition & Price Row
  doc.setFontSize(7.5);
  doc.setTextColor(60, 60, 60);
  
  const editionText = language === 'marathi'
    ? 'जळगाव, नाशिक, धुळे, नंदुरबार आवृत्ती'
    : language === 'hindi'
      ? 'जलगांव, नाशिक, धुले, नंदुरबार संस्करण'
      : 'Jalgaon, Nashik, Dhule, Nandurbar Edition';

  const dateText = language === 'marathi'
    ? 'शुक्रवार, २६ जून २०२६ • किंमत ₹२'
    : language === 'hindi'
      ? 'शुक्रवार, 26 जून 2026 • मूल्य ₹2'
      : 'Friday, June 26, 2026 • Price ₹2';

  const pageLabel = language === 'marathi'
    ? `पान ${page.pageNumber}: ${page.title.marathi}`
    : language === 'hindi'
      ? `पृष्ठ ${page.pageNumber}: ${page.title.hindi}`
      : `PAGE ${page.pageNumber}: ${page.title.english}`;

  doc.text(editionText, margin + 4, mastheadTop + 19);
  doc.text(pageLabel, width / 2, mastheadTop + 19, { align: 'center' });
  doc.text(dateText, width - margin - 4, mastheadTop + 19, { align: 'right' });

  // Border below row
  doc.setLineWidth(0.3);
  doc.line(margin + 2, mastheadTop + 21, width - margin - 2, mastheadTop + 21);

  // --- CONTENT SECTION ---
  const contentTop = mastheadTop + 25;
  const contentWidth = width - 2 * margin - 8; // ~178mm
  
  const mainArticle = page.articles.find(a => a.isMain) || page.articles[0];
  const sideArticles = page.articles.filter(a => a !== mainArticle);

  // 1. LEAD ARTICLE (Left/Top)
  const leadLeft = margin + 4;
  const leadWidth = contentWidth * 0.62; // ~110mm
  
  doc.setFillColor(190, 24, 24, 0.1);
  doc.rect(leadLeft - 1, contentTop - 1, leadWidth + 2, 6, 'F');
  
  doc.setFontSize(8);
  doc.setTextColor(190, 24, 24);
  const leadTag = language === 'marathi' ? 'मुख्य वृत्त' : language === 'hindi' ? 'मुख्य समाचार' : 'LEAD STORY';
  doc.text(leadTag, leadLeft, contentTop + 3.5);

  // Title
  doc.setFontSize(14);
  doc.setTextColor(20, 20, 20);
  const leadTitle = mainArticle.title[language] || mainArticle.title.english;
  const splitTitle = doc.splitTextToSize(leadTitle, leadWidth);
  let currentY = contentTop + 11;
  doc.text(splitTitle, leadLeft, currentY);
  currentY += (splitTitle.length * 5) + 2;

  // Author
  if (mainArticle.author) {
    doc.setFontSize(8);
    doc.setTextColor(100, 100, 100);
    const authorText = `— ${mainArticle.author[language] || mainArticle.author.english}`;
    doc.text(authorText, leadLeft, currentY);
    currentY += 5;
  }

  // Lead content paragraphs
  doc.setFontSize(9);
  doc.setTextColor(40, 40, 40);
  
  const leadParas = mainArticle.content[language] || mainArticle.content.english;
  
  leadParas.forEach((para) => {
    const splitPara = doc.splitTextToSize(para, leadWidth);
    
    // Check if we will overflow the page before printing
    if (currentY + (splitPara.length * 4) > height - margin - 15) {
      return; // prevent spilling past double boundary
    }
    
    doc.text(splitPara, leadLeft, currentY, { align: 'justify', maxWidth: leadWidth });
    currentY += (splitPara.length * 4.2) + 3;
  });

  // Vertical Divider
  const sideLeft = leadLeft + leadWidth + 4;
  const sideWidth = contentWidth - leadWidth - 4; // ~64mm

  doc.setDrawColor(200, 200, 200);
  doc.setLineWidth(0.15);
  doc.line(sideLeft - 2, contentTop, sideLeft - 2, height - margin - 12);

  // 2. SIDEBAR ARTICLES (Right)
  let sideY = contentTop;

  sideArticles.forEach((article, idx) => {
    if (sideY + 25 > height - margin - 12) return; // space guard

    if (idx > 0) {
      // Horizontal separator line between secondary articles
      doc.setDrawColor(220, 220, 220);
      doc.setLineWidth(0.1);
      doc.line(sideLeft, sideY - 1, sideLeft + sideWidth, sideY - 1);
      sideY += 3;
    }

    doc.setFontSize(7.5);
    doc.setTextColor(190, 24, 24);
    const sideTag = language === 'marathi' ? 'स्थानिक वृत्त' : language === 'hindi' ? 'स्थानीय समाचार' : 'LOCAL NEWS';
    doc.text(sideTag, sideLeft, sideY + 2.5);
    sideY += 6.5;

    // Side Title
    doc.setFontSize(10.5);
    doc.setTextColor(30, 30, 30);
    const sideTitleText = article.title[language] || article.title.english;
    const splitSideTitle = doc.splitTextToSize(sideTitleText, sideWidth);
    doc.text(splitSideTitle, sideLeft, sideY);
    sideY += (splitSideTitle.length * 4.2) + 2.5;

    // Side Content Paras
    doc.setFontSize(8.2);
    doc.setTextColor(50, 50, 50);
    const sideParas = article.content[language] || article.content.english;
    
    for (let pIdx = 0; pIdx < sideParas.length; pIdx++) {
      const para = sideParas[pIdx];
      const splitSidePara = doc.splitTextToSize(para, sideWidth);
      
      if (sideY + (splitSidePara.length * 3.8) > height - margin - 12) {
        break; // break paragraph printing if out of space
      }
      
      doc.text(splitSidePara, sideLeft, sideY, { align: 'justify', maxWidth: sideWidth });
      sideY += (splitSidePara.length * 3.8) + 2.5;
    }
    
    sideY += 3;
  });

  // --- FOOTER ROW ---
  const footerY = height - margin - 6;
  doc.setDrawColor(44, 44, 40);
  doc.setLineWidth(0.4);
  doc.line(margin + 2, footerY - 2, width - margin - 2, footerY - 2);

  doc.setFontSize(7);
  doc.setTextColor(120, 120, 120);
  doc.text('epaper.janashakti.in', margin + 4, footerY + 1.5);
  doc.text('DAILY REPLICA AUDITED SHEET', width / 2, footerY + 1.5, { align: 'center' });
  doc.text('JANSHAKTI NEWS GROUP © 2026', width - margin - 4, footerY + 1.5, { align: 'right' });
}
