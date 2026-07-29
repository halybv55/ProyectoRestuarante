function toAscii(value) {
  return String(value ?? "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^\x20-\x7E]/g, " ");
}

function escapePdfText(value) {
  return toAscii(value)
    .replaceAll("\\", "\\\\")
    .replaceAll("(", "\\(")
    .replaceAll(")", "\\)");
}

function truncate(value, maximumLength) {
  const text = toAscii(value);

  if (text.length <= maximumLength) return text;

  return `${text.slice(0, Math.max(maximumLength - 3, 1))}...`;
}

function createLine(text, x, y, size = 10, bold = false) {
  const font = bold ? "F2" : "F1";

  return `BT /${font} ${size} Tf 1 0 0 1 ${x} ${y} Tm (${escapePdfText(text)}) Tj ET`;
}

function createPageContent({
  title,
  subtitle,
  headers,
  rows,
  summary,
  page,
  totalPages,
}) {
  const content = [
    createLine("RESTAURANTE ERP", 48, 752, 10, true),
    createLine(title, 48, 724, 17, true),
    createLine(subtitle, 48, 704, 9),
    "0.75 w 48 693 m 564 693 l S",
  ];

  let y = 670;

  if (page === 1 && summary.length > 0) {
    summary.forEach((item) => {
      content.push(createLine(`${item.label}: ${item.value}`, 48, y, 10, true));
      y -= 18;
    });
    y -= 6;
  }

  const columnWidth = Math.floor(92 / Math.max(headers.length, 1));
  const headerLine = headers
    .map((header) => truncate(header, columnWidth).padEnd(columnWidth))
    .join(" ");

  content.push(createLine(headerLine, 48, y, 9, true));
  y -= 8;
  content.push(`0.4 w 48 ${y} m 564 ${y} l S`);
  y -= 16;

  rows.forEach((row) => {
    const line = row
      .map((cell) => truncate(cell, columnWidth).padEnd(columnWidth))
      .join(" ");
    content.push(createLine(line, 48, y, 9));
    y -= 16;
  });

  content.push("0.4 w 48 42 m 564 42 l S");
  content.push(
    createLine(`Pagina ${page} de ${totalPages}`, 260, 26, 8),
  );

  return content.join("\n");
}

function buildPdfBytes(pages) {
  const objects = [];
  const fontRegularId = 3 + pages.length * 2;
  const fontBoldId = fontRegularId + 1;
  const pageIds = pages.map((_, index) => 3 + index * 2);

  objects[1] = "<< /Type /Catalog /Pages 2 0 R >>";
  objects[2] =
    `<< /Type /Pages /Kids [${pageIds.map((id) => `${id} 0 R`).join(" ")}] /Count ${pages.length} >>`;

  pages.forEach((content, index) => {
    const pageId = pageIds[index];
    const contentId = pageId + 1;

    objects[pageId] =
      `<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] ` +
      `/Resources << /Font << /F1 ${fontRegularId} 0 R /F2 ${fontBoldId} 0 R >> >> ` +
      `/Contents ${contentId} 0 R >>`;
    objects[contentId] =
      `<< /Length ${content.length} >>\nstream\n${content}\nendstream`;
  });

  objects[fontRegularId] =
    "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>";
  objects[fontBoldId] =
    "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>";

  let pdf = "%PDF-1.4\n";
  const offsets = [0];

  for (let id = 1; id < objects.length; id += 1) {
    offsets[id] = pdf.length;
    pdf += `${id} 0 obj\n${objects[id]}\nendobj\n`;
  }

  const xrefOffset = pdf.length;
  pdf += `xref\n0 ${objects.length}\n`;
  pdf += "0000000000 65535 f \n";

  for (let id = 1; id < objects.length; id += 1) {
    pdf += `${String(offsets[id]).padStart(10, "0")} 00000 n \n`;
  }

  pdf +=
    `trailer\n<< /Size ${objects.length} /Root 1 0 R >>\n` +
    `startxref\n${xrefOffset}\n%%EOF`;

  return new TextEncoder().encode(pdf);
}

export function downloadReportPdf({
  filename,
  title,
  subtitle,
  headers,
  rows,
  summary = [],
}) {
  const firstPageCapacity = summary.length > 0 ? 30 : 34;
  const remainingPageCapacity = 34;
  const chunks = [];
  let offset = 0;

  chunks.push(rows.slice(offset, offset + firstPageCapacity));
  offset += firstPageCapacity;

  while (offset < rows.length) {
    chunks.push(rows.slice(offset, offset + remainingPageCapacity));
    offset += remainingPageCapacity;
  }

  if (chunks.length === 0) chunks.push([]);

  const pages = chunks.map((pageRows, index) =>
    createPageContent({
      title,
      subtitle,
      headers,
      rows: pageRows,
      summary: index === 0 ? summary : [],
      page: index + 1,
      totalPages: chunks.length,
    }),
  );
  const blob = new Blob([buildPdfBytes(pages)], {
    type: "application/pdf",
  });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");

  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}
