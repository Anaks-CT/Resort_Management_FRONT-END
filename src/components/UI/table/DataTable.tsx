import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import CustomTableRow from "./CustomTableRow";

export default function BasicTable({ headers, rows, setgallaryDetails }: any) {
  return (
    <>
      <TableContainer component={Paper} className='h-[600px]'>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow className="bg-black" >
              {headers.map((header: any) => (
                <TableCell align="center" key={header}>
                  <h2 className="text-white text-lg">{header}</h2>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows?.map((row: any) => (
              ///// customTablecell is a component made by me to render each row with unique useref
              <CustomTableRow row={row}/>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}












// export default function BasicTable({ headers, rows }: any) {
//   const renderCell = (row: any, key: string) => {
//     if (typeof row[key] === "boolean") {
//       return (
//         <TableCell align="center">
//           <Button variant="contained" color={row[key] ? "success" : "error"}>
//             {row[key] ? "True" : "False"}
//           </Button>
//         </TableCell>
//       );
//     } else {
//       return <TableCell align="center">{row[key]}</TableCell>;
//     }
//   };

//   return (
//     <>
//       <TableContainer component={Paper}>
//         <Table sx={{ minWidth: 650 }} aria-label="simple table">
//           <TableHead>
//             <TableRow>
//               {headers.map((header: any) => (
//                 <TableCell align="center" key={header}>
//                   <h2 className="text-black text-lg">{header}</h2>
//                 </TableCell>
//               ))}
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {rows.map((row: any, rowIndex: number) => (
//               <TableRow
//                 key={rowIndex}
//                 sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
//               >
//                 {Object.keys(row).map((key: string, cellIndex: number) => (
//                   <React.Fragment key={`${rowIndex}-${cellIndex}`}>
//                     {renderCell(row, key)}
//                   </React.Fragment>
//                 ))}
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </TableContainer>
//     </>
//   );
// }