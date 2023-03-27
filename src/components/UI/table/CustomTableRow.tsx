import React, { useRef } from "react";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import Button from "../Button";

function CustomTableRow({ row }: any) {
  const inputRef: any = useRef();

  return (
    <TableRow
      key={row}
      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
    >
      {Object.keys(row).map((key: string) => {
        if (key === "makeChanges") {
          return (
            <TableCell align="center">
              <div className="flex gap-5 justify-center">
                <input type="text" ref={inputRef} value={row[key]._id} hidden />
                {row[key].extraEditButton && (
                  <Button
                    color="primary"
                    onClick={() => {
                      row[key].handleEdit(inputRef.current.value);
                    }}
                    class="px-5 py-2"
                  >
                    Edit Image
                  </Button>
                )}
                <Button
                  color="primary"
                  onClick={() => {
                    row[key].handleEdit(inputRef.current.value);
                  }}
                  class="px-5 py-2"
                >
                  Edit
                </Button>
                <Button
                  color="danger"
                  onClick={() => {
                    row[key].handleDelete(inputRef.current.value);
                  }}
                  class="px-5 py-2"
                >
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
