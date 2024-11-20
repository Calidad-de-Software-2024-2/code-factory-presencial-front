import React from "react";
import { useRouter } from "next/router";
import SearchCard from "../molecules/searchCard";
import SearchParams from "@/utils/interface/search";

const Search: React.FC = () => {
  const router = useRouter();

  const handleSearch = (searchParams: SearchParams) => {
    router.push({
      pathname: "/list",
      query: { ...searchParams },
    });
  };

  return <SearchCard onSearch={handleSearch} />;
};

export default Search;
