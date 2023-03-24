import React, { useRef } from "react";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import Button from "../Button";

function CustomTableRow({ row }: any) {
  const inputRef: any = useRef();
  const handleClick = () => {
    console.log(inputRef.current.value);
  };
  return (
    <TableRow
      key={row._id}
      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
    >
      {Object.keys(row).map((key: string) => {
        if (key === "makeChanges") {
          return (
            <TableCell align="center">
              <div className="flex gap-5 justify-center">
                <input
                  type="text"
                  ref={inputRef}
                  onChange={handleClick}
                  value={row[key]}
                  hidden
                />
                <Button color="primary" onClick={handleClick} class="px-5 py-2">
                  Edit
                </Button>
                <Button color="danger" onClick={handleClick} class="px-5 py-2">
                  Delete
                </Button>
              </div>
            </TableCell>
          );
        }
        return (
          <TableCell align="center">
            <div>{row[key]}</div>
          </TableCell>
        );
      })}
    </TableRow>
  );
}

export default CustomTableRow;
