"use client";

import { ChangeEvent } from "react";
import useSearchPanel from "../hooks/useSearchPanel";

function SearchPanel() {
  const { handleSubmit, searchValue, setSearchValue, randomColor } = useSearchPanel();

  return (
    <search className="w-full md:w-1/2">
      <form className="w-full flex justify-between items-center gap-2" onSubmit={handleSubmit}>
        <input
          type="search"
          value={searchValue}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setSearchValue(e.target.value)}
          placeholder="Are you looking for something?"
          className="bg-white px-5 py-2 w-full text-[16px] rounded-tr-sm rounded-tl-2xl rounded-br-2xl rounded-bl-sm placeholder-shown:italic placeholder:text-neutral-600"
        />

        <input
          style={{ backgroundColor: randomColor }}
          type="submit"
          className="p-2 text-xl rounded-xl cursor-pointer hover:bg-green-600"
          value="🔎"
        />
      </form>
    </search>
  );
}

export default SearchPanel;
