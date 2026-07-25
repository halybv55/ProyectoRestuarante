import ExcelJS from "exceljs";

export const generarExcel = async (
  titulo,
  columnas,
  datos,
  res,
  nombreArchivo,
) => {
  const workbook = new ExcelJS.Workbook();

  workbook.creator = "AlphaRest";
  workbook.created = new Date();

  const sheet = workbook.addWorksheet(titulo);

  sheet.mergeCells("A1", `${String.fromCharCode(64 + columnas.length)}1`);

  const tituloCell = sheet.getCell("A1");

  tituloCell.value = titulo;

  tituloCell.font = {
    bold: true,
    size: 18,
  };

  tituloCell.alignment = {
    horizontal: "center",
  };

  sheet.addRow([]);

  sheet.columns = columnas;

  sheet.getRow(3).font = {
    bold: true,
  };

  datos.forEach((item) => {
    sheet.addRow(item);
  });

  sheet.columns.forEach((column) => {
    column.width = 25;
  });

  res.setHeader(
    "Content-Type",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  );

  res.setHeader(
    "Content-Disposition",
    `attachment; filename=${nombreArchivo}.xlsx`,
  );

  await workbook.xlsx.write(res);

  res.end();
};
