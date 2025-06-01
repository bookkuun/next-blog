"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "../ui/input";

const SearchBox = () => {
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500);

    return () => clearTimeout(timer);
  }, [search]);

  useEffect(() => {
    if (debouncedSearch.trim()) {
      router.push(`/?search=${debouncedSearch.trim()}`);
    } else {
      router.push("/");
    }
  }, [debouncedSearch, router]);

  return (
    <Input
      placeholder="記事を検索..."
      className="w-[200px] lg:w-[300px] bg-white"
      value={search}
      onChange={(e) => setSearch(e.target.value)}
    />
  );
};

export default SearchBox;
