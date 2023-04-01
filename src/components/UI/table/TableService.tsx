import React from "react";
import Button from "../Button";
import Input from "../Input";

type props = {
  inputOnchange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  buttonOnclick: () => void;
  searchInput: string;
  pages?: number
  handlePageClick? : (pageNumber: number) => void
};

function TableService({ inputOnchange, buttonOnclick, searchInput, pages, handlePageClick }: props) {

  const pagesBox = []
    if(handlePageClick && pages){
    for (let i = 1; i <= pages; i++) {
        pagesBox.push(
            <Button onClick={() => handlePageClick(i)} class="" outline color="transparent">{i}</Button>
        );
      }
    }
  return (
    <div className=" flex items-center justify-between ">
      <div className="flex gap-4">
        <Input
          name="search"
          onChange={inputOnchange}
          placeholder="Search"
          type="text"
          
        />
        <Button
          class="px-5 py-2"
          color="primary"
          onClick={buttonOnclick}
          rounded
        >
          SEARCH
        </Button>
      </div>
      <div className="flex gap-5">
        {pagesBox}
      </div>
    </div>
  );
}

export default TableService;
