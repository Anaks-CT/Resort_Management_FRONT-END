import React from "react";
import Button from "../Button";

type props = {
  inputOnchange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  buttonOnclick: () => void;
  pages?: number
  handlePageClick? : (pageNumber: number) => void
};

function TableService({ inputOnchange, buttonOnclick, pages, handlePageClick }: props) {

  const pagesBox = []
    if(handlePageClick && pages){
    for (let i = 1; i <= pages; i++) {
        pagesBox.push(
            <Button onClick={() => handlePageClick(i)} class="" outline color="transparent">{i}</Button>
        );
      }
    }
  return (
    <div className=" flex items-center justify-between">
      <div className="flex gap-4 h-10">
        <input
          name="search"
          className="bg-black rounded text-white"
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
