import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import CustomTableRow from "./CustomTableRow";

export default function BasicTable({ headers, rows, editImage, deleteButtonValue }: any) {
  return (
    <>
    
      <TableContainer component={Paper} className="max-h-[450px] min-h-[300px]">
        <Table sx={{ minWidth: 550 }} aria-label="simple table" className="divId">
          <TableHead className=" sticky top-0 z-10 bg-black text-white">
            <TableRow className="bg-black border flex divide-x !min-h-10px">
              {headers.map((header: any) => (
                <TableCell align="center" className="py-2" key={header}>
                  <h2 className="text-white text-lg">{header}</h2>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
          {rows && rows.length > 0 ? (
              rows.map((row: any) => (
                <CustomTableRow row={row} editImage={editImage} deleteButtonValue={deleteButtonValue} />
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={headers.length} align="center">
                  No data available
                </TableCell>
              </TableRow>
            )}
            
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
