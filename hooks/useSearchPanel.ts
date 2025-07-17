import getRandomColor from "@/utils/getRandomColor";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

export default function useSearchPanel() {
  const router = useRouter();
  const [searchValue, setSearchValue] = useState("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    router.push(`/${searchValue}/`);
    setSearchValue("");
  };

  const randomColor = getRandomColor();

  return {
    searchValue,
    setSearchValue,
    handleSubmit,
    randomColor,
  };
}
