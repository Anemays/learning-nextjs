import React from 'react'
import * as XLSX from "xlsx";
//import * as FileSaver from "file-saver";

export const ExportToExcel = ({ apiData, fileName }) => {
    const fileType =
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
    const fileExtension = ".xlsx";

    const exportToCSV = (apiData, fileName) => {
        const ws = XLSX.utils.json_to_sheet(apiData);
        const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
        //const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
        //const data = new Blob([excelBuffer], { type: fileType });
        //FileSaver.saveAs(data, fileName + fileExtension);
        XLSX.writeFile(wb, fileName + fileExtension);
    };

    return (
        <button onClick={(e) => exportToCSV(apiData, fileName)}>Export</button>
    );
};