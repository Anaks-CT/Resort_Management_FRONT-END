import React, { useRef } from "react";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import Button from "../Button";

function CustomTableRow({ row, editImage, deleteButtonValue }: any) {
  const inputRef: any = useRef();
  const noData = () => {
    if (!row)
      return (
        <TableRow>
          <h1 className="text-black">No data to show</h1>
        </TableRow>
      );
  };

  
  return (
    <>
      {noData}
      <TableRow
      className="flex border"
        key={row}
        sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
      >
        {Object.keys(row).map((key: string) => {
          if (key === "makeChanges") {
            return (
              <TableCell align="center" className="border">
                <div className="flex gap-5 justify-center">
                  <input
                    type="text"
                    ref={inputRef}
                    value={row[key]._id}
                    hidden
                  />
                  {row[key].extraEditButton && !editImage && (
                    <Button
                      color="primary"
                      onClick={() => {
                        row[key].handleEditImage(inputRef.current.value);
                      }}
                      class="px-5 py-2"
                    >
                      Edit Image
                    </Button>
                  )}
                  { row[key].handleEdit && <Button
                    color="primary"
                    onClick={() => {
                      row[key].handleEdit(inputRef.current.value);
                    }}
                    class="px-5 py-2"
                  >
                    Edit
                  </Button>}
                  <Button
                    color="danger"
                    onClick={() => {
                      row[key].handleDelete(inputRef.current.value);
                    }}
                    class="px-5 py-2"
                  >
                    {deleteButtonValue ? (row[key].active ? "Block" : "Unblock") : 'Delete'}
                  </Button>
                </div>
              </TableCell>
            );
          }
          return (
            <TableCell align="center" className="border">
              <div>{row[key]}</div>
            </TableCell>
          );
        })}
      </TableRow>
    </>
  );
}

export default CustomTableRow;
