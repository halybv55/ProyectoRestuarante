const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const sourcePath = path.join(root, "Informe_Final_Proyecto_Restaurante.md");
const outputPath = path.join(root, "Informe_Final_Proyecto_Restaurante.docx");
const markdown = fs.readFileSync(sourcePath, "utf8");

function esc(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function plain(value) {
  return String(value)
    .replace(/!\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/\*\*([^*]+)\*\*/g, "$1")
    .replace(/\*([^*]+)\*/g, "$1")
    .replace(/`([^`]+)`/g, "$1")
    .replace(/<br>/g, " ")
    .replace(/<[^>]+>/g, "")
    .trim();
}

function run(text, options = {}) {
  const props = [
    options.bold ? "<w:b/>" : "",
    options.italic ? "<w:i/>" : "",
    options.size ? `<w:sz w:val="${options.size}"/><w:szCs w:val="${options.size}"/>` : "",
  ].join("");
  return `<w:r><w:rPr><w:rFonts w:ascii="Times New Roman" w:hAnsi="Times New Roman"/>${props}</w:rPr><w:t xml:space="preserve">${esc(text)}</w:t></w:r>`;
}

function paragraph(text, style = "", options = {}) {
  const pPr = [
    style ? `<w:pStyle w:val="${style}"/>` : "",
    options.center ? '<w:jc w:val="center"/>' : "",
    options.keep ? "<w:keepNext/>" : "",
    options.pageBreakBefore ? "<w:pageBreakBefore/>" : "",
    options.after !== undefined ? `<w:spacing w:after="${options.after}" w:line="360" w:lineRule="auto"/>` : "",
  ].join("");
  return `<w:p><w:pPr>${pPr}</w:pPr>${run(plain(text), options)}</w:p>`;
}

function tocField() {
  return `<w:p><w:r><w:fldChar w:fldCharType="begin" w:dirty="true"/></w:r><w:r><w:instrText xml:space="preserve"> TOC \\o "1-3" \\h \\z \\u </w:instrText></w:r><w:r><w:fldChar w:fldCharType="separate"/></w:r><w:r><w:t>Actualice este campo en Word para recalcular la tabla de contenidos.</w:t></w:r><w:r><w:fldChar w:fldCharType="end"/></w:r></w:p>`;
}

function table(headers, rows) {
  const cols = Math.max(headers.length, 1);
  const width = Math.floor(9360 / cols);
  const cell = (value, isHeader) => `<w:tc><w:tcPr><w:tcW w:w="${width}" w:type="dxa"/>${isHeader ? '<w:shd w:fill="E7E6E6"/>' : ""}</w:tcPr><w:p><w:pPr><w:spacing w:after="40" w:line="240" w:lineRule="auto"/></w:pPr>${run(plain(value), { bold: isHeader, size: 19 })}</w:p></w:tc>`;
  const row = (values, isHeader = false) => `<w:tr><w:trPr><w:cantSplit/></w:trPr>${values.map((value) => cell(value, isHeader)).join("")}</w:tr>`;
  return `<w:tbl><w:tblPr><w:tblW w:w="9360" w:type="dxa"/><w:tblBorders><w:top w:val="single" w:sz="4"/><w:left w:val="single" w:sz="4"/><w:bottom w:val="single" w:sz="4"/><w:right w:val="single" w:sz="4"/><w:insideH w:val="single" w:sz="4"/><w:insideV w:val="single" w:sz="4"/></w:tblBorders><w:tblLayout w:type="fixed"/></w:tblPr><w:tblGrid>${headers.map(() => `<w:gridCol w:w="${width}"/>`).join("")}</w:tblGrid>${row(headers, true)}${rows.map((values) => row(values)).join("")}</w:tbl>`;
}

function mockupBox() {
  return `<w:tbl><w:tblPr><w:tblW w:w="8504" w:type="dxa"/><w:tblBorders><w:top w:val="dashed" w:sz="10"/><w:left w:val="dashed" w:sz="10"/><w:bottom w:val="dashed" w:sz="10"/><w:right w:val="dashed" w:sz="10"/></w:tblBorders></w:tblPr><w:tblGrid><w:gridCol w:w="8504"/></w:tblGrid><w:tr><w:trPr><w:trHeight w:val="5102" w:hRule="exact"/><w:cantSplit/></w:trPr><w:tc><w:tcPr><w:vAlign w:val="center"/></w:tcPr><w:p><w:pPr><w:jc w:val="center"/></w:pPr>${run("ESPACIO RESERVADO PARA CAPTURA VALIDADA", { bold: true })}</w:p></w:tc></w:tr></w:tbl>`;
}

function imageDrawing(relId, title) {
  return `<w:p><w:pPr><w:jc w:val="center"/><w:keepNext/></w:pPr><w:r><w:drawing><wp:inline distT="0" distB="0" distL="0" distR="0" xmlns:wp="http://schemas.openxmlformats.org/drawingml/2006/wordprocessingDrawing"><wp:extent cx="5943600" cy="3291840"/><wp:docPr id="${relId.replace("rId", "")}" name="${esc(title)}"/><a:graphic xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main"><a:graphicData uri="http://schemas.openxmlformats.org/drawingml/2006/picture"><pic:pic xmlns:pic="http://schemas.openxmlformats.org/drawingml/2006/picture"><pic:nvPicPr><pic:cNvPr id="0" name="${esc(title)}"/><pic:cNvPicPr/></pic:nvPicPr><pic:blipFill><a:blip r:embed="${relId}" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships"/><a:stretch><a:fillRect/></a:stretch></pic:blipFill><pic:spPr><a:xfrm><a:off x="0" y="0"/><a:ext cx="5943600" cy="3291840"/></a:xfrm><a:prstGeom prst="rect"><a:avLst/></a:prstGeom></pic:spPr></pic:pic></a:graphicData></a:graphic></wp:inline></w:drawing></w:r></w:p>`;
}

const media = [];
const imageRelations = [];
let nextRel = 3;
const documentParts = [];
const lines = markdown.split(/\r?\n/);
let i = 0;
let skipStaticToc = false;

while (i < lines.length) {
  const line = lines[i];
  const heading = line.match(/^(#{1,4})\s+(.+)$/);
  if (heading) {
    const level = heading[1].length;
    const text = heading[2];
    if (skipStaticToc && text === "Lista de figuras") skipStaticToc = false;
    if (skipStaticToc) { i++; continue; }
    const style = `Heading${Math.min(level, 4)}`;
    documentParts.push(paragraph(text, style, { keep: true, pageBreakBefore: level === 1 && !text.startsWith("INFORME DEL") }));
    if (text === "Tabla de contenidos") {
      documentParts.push(tocField());
      skipStaticToc = true;
    }
    i++;
    continue;
  }
  if (skipStaticToc) { i++; continue; }

  const image = line.match(/^!\[([^\]]+)\]\((diagramas\/([^)]+\.svg))\)$/);
  if (image) {
    const source = path.join(root, image[2]);
    const relId = `rId${nextRel++}`;
    const target = `media/${image[3]}`;
    media.push({ name: `word/${target}`, data: fs.readFileSync(source) });
    imageRelations.push({ id: relId, target });
    documentParts.push(imageDrawing(relId, image[1]));
    i++;
    continue;
  }

  if (line.startsWith("| ") && i + 1 < lines.length && /^\|(?:\s*:?-+:?\s*\|)+$/.test(lines[i + 1])) {
    const rows = [];
    while (i < lines.length && lines[i].startsWith("|")) {
      rows.push(lines[i].slice(1, -1).split(/(?<!\\)\|/).map((cell) => cell.trim().replaceAll("\\|", "|")));
      i++;
    }
    const headers = rows.shift();
    rows.shift();
    documentParts.push(table(headers, rows));
    continue;
  }

  if (line.includes('class="mockup-box"')) {
    documentParts.push(mockupBox());
    i++;
    continue;
  }
  if (/^<\/?div/.test(line.trim())) { i++; continue; }

  if (line.trim().startsWith("<h1>")) {
    documentParts.push(paragraph(plain(line), "Title", { center: true, bold: true, size: 32 }));
    i++;
    continue;
  }
  if (line.trim().startsWith("<h2>")) {
    documentParts.push(paragraph(plain(line), "Subtitle", { center: true, bold: true, size: 32 }));
    i++;
    continue;
  }
  if (line.trim().startsWith("<p>")) {
    documentParts.push(paragraph(plain(line), "", { center: line.includes("<strong>") }));
    i++;
    continue;
  }
  if (/^\s*-\s+/.test(line)) {
    documentParts.push(paragraph(`• ${line.replace(/^\s*-\s+/, "")}`, "", { after: 60 }));
    i++;
    continue;
  }
  if (!line.trim()) { i++; continue; }
  documentParts.push(paragraph(line, "", { bold: /^\*\*Tabla \d+\./.test(line) }));
  i++;
}

const sectPr = `<w:sectPr><w:headerReference w:type="default" r:id="rId1"/><w:footerReference w:type="default" r:id="rId2"/><w:pgSz w:w="12240" w:h="15840"/><w:pgMar w:top="1440" w:right="1440" w:bottom="1440" w:left="1440" w:header="720" w:footer="720" w:gutter="0"/></w:sectPr>`;
const documentXml = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><w:document xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships"><w:body>${documentParts.join("")}${sectPr}</w:body></w:document>`;
const stylesXml = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><w:styles xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main"><w:docDefaults><w:rPrDefault><w:rPr><w:rFonts w:ascii="Times New Roman" w:hAnsi="Times New Roman"/><w:sz w:val="24"/><w:szCs w:val="24"/></w:rPr></w:rPrDefault><w:pPrDefault><w:pPr><w:jc w:val="both"/><w:spacing w:after="120" w:line="360" w:lineRule="auto"/></w:pPr></w:pPrDefault></w:docDefaults>
<w:style w:type="paragraph" w:default="1" w:styleId="Normal"><w:name w:val="Normal"/></w:style>
<w:style w:type="paragraph" w:styleId="Title"><w:name w:val="Title"/><w:basedOn w:val="Normal"/><w:rPr><w:b/><w:sz w:val="32"/></w:rPr></w:style>
<w:style w:type="paragraph" w:styleId="Subtitle"><w:name w:val="Subtitle"/><w:basedOn w:val="Normal"/><w:rPr><w:b/><w:sz w:val="32"/></w:rPr></w:style>
<w:style w:type="paragraph" w:styleId="Heading1"><w:name w:val="heading 1"/><w:basedOn w:val="Normal"/><w:next w:val="Normal"/><w:qFormat/><w:pPr><w:outlineLvl w:val="0"/><w:keepNext/></w:pPr><w:rPr><w:b/><w:sz w:val="32"/></w:rPr></w:style>
<w:style w:type="paragraph" w:styleId="Heading2"><w:name w:val="heading 2"/><w:basedOn w:val="Normal"/><w:next w:val="Normal"/><w:qFormat/><w:pPr><w:outlineLvl w:val="1"/><w:keepNext/></w:pPr><w:rPr><w:b/><w:sz w:val="28"/></w:rPr></w:style>
<w:style w:type="paragraph" w:styleId="Heading3"><w:name w:val="heading 3"/><w:basedOn w:val="Normal"/><w:next w:val="Normal"/><w:qFormat/><w:pPr><w:outlineLvl w:val="2"/><w:keepNext/></w:pPr><w:rPr><w:b/><w:sz w:val="24"/></w:rPr></w:style>
<w:style w:type="paragraph" w:styleId="Heading4"><w:name w:val="heading 4"/><w:basedOn w:val="Normal"/><w:next w:val="Normal"/><w:qFormat/><w:pPr><w:outlineLvl w:val="3"/><w:keepNext/></w:pPr><w:rPr><w:b/><w:sz w:val="24"/></w:rPr></w:style></w:styles>`;
const headerXml = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><w:hdr xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main"><w:p><w:pPr><w:jc w:val="center"/><w:pBdr><w:bottom w:val="single" w:sz="4" w:color="888888"/></w:pBdr></w:pPr>${run("RESTAURANTE ERP - INFORME FINAL", { size: 18 })}</w:p></w:hdr>`;
const footerXml = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><w:ftr xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main"><w:p><w:pPr><w:jc w:val="center"/><w:pBdr><w:top w:val="single" w:sz="4" w:color="888888"/></w:pBdr></w:pPr>${run("Página ", { size: 18 })}<w:r><w:fldChar w:fldCharType="begin"/></w:r><w:r><w:instrText> PAGE </w:instrText></w:r><w:r><w:fldChar w:fldCharType="end"/></w:r></w:p></w:ftr>`;
const relsXml = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/header" Target="header1.xml"/><Relationship Id="rId2" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/footer" Target="footer1.xml"/>${imageRelations.map((rel) => `<Relationship Id="${rel.id}" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/image" Target="${rel.target}"/>`).join("")}<Relationship Id="rIdStyles" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles" Target="styles.xml"/><Relationship Id="rIdSettings" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/settings" Target="settings.xml"/></Relationships>`;
const contentTypes = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types"><Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/><Default Extension="xml" ContentType="application/xml"/><Default Extension="svg" ContentType="image/svg+xml"/><Override PartName="/word/document.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml"/><Override PartName="/word/styles.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.styles+xml"/><Override PartName="/word/settings.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.settings+xml"/><Override PartName="/word/header1.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.header+xml"/><Override PartName="/word/footer1.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.footer+xml"/><Override PartName="/docProps/core.xml" ContentType="application/vnd.openxmlformats-package.core-properties+xml"/><Override PartName="/docProps/app.xml" ContentType="application/vnd.openxmlformats-officedocument.extended-properties+xml"/></Types>`;
const packageRels = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="word/document.xml"/><Relationship Id="rId2" Type="http://schemas.openxmlformats.org/package/2006/relationships/metadata/core-properties" Target="docProps/core.xml"/><Relationship Id="rId3" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/extended-properties" Target="docProps/app.xml"/></Relationships>`;
const settingsXml = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><w:settings xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main"><w:updateFields w:val="true"/></w:settings>`;
const coreXml = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><cp:coreProperties xmlns:cp="http://schemas.openxmlformats.org/package/2006/metadata/core-properties" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:dcterms="http://purl.org/dc/terms/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"><dc:title>Informe Final - Restaurante ERP</dc:title><dc:creator>Equipo de desarrollo, pendiente de validación</dc:creator><dcterms:created xsi:type="dcterms:W3CDTF">2026-07-29T04:27:00Z</dcterms:created></cp:coreProperties>`;
const appXml = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Properties xmlns="http://schemas.openxmlformats.org/officeDocument/2006/extended-properties"><Application>Codex OpenXML Generator</Application></Properties>`;

const entries = [
  { name: "[Content_Types].xml", data: Buffer.from(contentTypes) },
  { name: "_rels/.rels", data: Buffer.from(packageRels) },
  { name: "docProps/core.xml", data: Buffer.from(coreXml) },
  { name: "docProps/app.xml", data: Buffer.from(appXml) },
  { name: "word/document.xml", data: Buffer.from(documentXml) },
  { name: "word/styles.xml", data: Buffer.from(stylesXml) },
  { name: "word/settings.xml", data: Buffer.from(settingsXml) },
  { name: "word/header1.xml", data: Buffer.from(headerXml) },
  { name: "word/footer1.xml", data: Buffer.from(footerXml) },
  { name: "word/_rels/document.xml.rels", data: Buffer.from(relsXml) },
  ...media,
];

const crcTable = new Uint32Array(256);
for (let n = 0; n < 256; n++) {
  let c = n;
  for (let k = 0; k < 8; k++) c = (c & 1) ? (0xedb88320 ^ (c >>> 1)) : (c >>> 1);
  crcTable[n] = c >>> 0;
}
function crc32(buffer) {
  let crc = 0xffffffff;
  for (const byte of buffer) crc = crcTable[(crc ^ byte) & 0xff] ^ (crc >>> 8);
  return (crc ^ 0xffffffff) >>> 0;
}
function zipStore(files) {
  const local = [];
  const central = [];
  let offset = 0;
  for (const file of files) {
    const name = Buffer.from(file.name.replaceAll("\\", "/"));
    const data = Buffer.isBuffer(file.data) ? file.data : Buffer.from(file.data);
    const crc = crc32(data);
    const lh = Buffer.alloc(30);
    lh.writeUInt32LE(0x04034b50, 0); lh.writeUInt16LE(20, 4); lh.writeUInt16LE(0x0800, 6);
    lh.writeUInt16LE(0, 8); lh.writeUInt32LE(crc, 14); lh.writeUInt32LE(data.length, 18); lh.writeUInt32LE(data.length, 22); lh.writeUInt16LE(name.length, 26);
    local.push(lh, name, data);
    const ch = Buffer.alloc(46);
    ch.writeUInt32LE(0x02014b50, 0); ch.writeUInt16LE(20, 4); ch.writeUInt16LE(20, 6); ch.writeUInt16LE(0x0800, 8);
    ch.writeUInt16LE(0, 10); ch.writeUInt32LE(crc, 16); ch.writeUInt32LE(data.length, 20); ch.writeUInt32LE(data.length, 24); ch.writeUInt16LE(name.length, 28); ch.writeUInt32LE(offset, 42);
    central.push(ch, name);
    offset += lh.length + name.length + data.length;
  }
  const centralBuffer = Buffer.concat(central);
  const end = Buffer.alloc(22);
  end.writeUInt32LE(0x06054b50, 0); end.writeUInt16LE(files.length, 8); end.writeUInt16LE(files.length, 10);
  end.writeUInt32LE(centralBuffer.length, 12); end.writeUInt32LE(offset, 16);
  return Buffer.concat([...local, centralBuffer, end]);
}

fs.writeFileSync(outputPath, zipStore(entries));
console.log(JSON.stringify({ outputPath, bytes: fs.statSync(outputPath).size, media: media.length, paragraphsAndTables: documentParts.length }, null, 2));
