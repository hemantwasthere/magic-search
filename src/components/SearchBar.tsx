"use client";

import { Loader2, Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { useRef, useState, useTransition } from "react";

import { Button } from "./ui/button";
import { Input } from "./ui/input";

const SearchBar: React.FC = () => {
  const [query, setQuery] = useState<string>("");

  const inputRef = useRef<HTMLInputElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const [isSearching, startTransition] = useTransition();
  const router = useRouter();

  const search = () => {
    startTransition(() => {
      router.push(`/search?q=${query}`);
    });
  };

  return (
    <div className="relative w-full h-14 flex flex-col bg-white">
      <div className="relative h-14 z-10 rounded-md">
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          ref={inputRef}
          disabled={isSearching}
          onKeyDown={(e) => (
            e.key === "Escape" && inputRef?.current?.blur(),
            e.key === "Enter" && search()
          )}
          className="absolute inset-0 h-full"
        />

        <Button
          size="sm"
          ref={buttonRef}
          onClick={search}
          onKeyDown={(e) => e.key === "Escape" && buttonRef?.current?.blur()}
          className="absolute right-0 inset-y-0 h-full rounded-l-none"
          disabled={isSearching}
        >
          {isSearching ? (
            <Loader2 className="h-6 w-6 animate-spin" />
          ) : (
            <Search className="h-6 w-6" />
          )}
        </Button>
      </div>
    </div>
  );
};

export default SearchBar;
