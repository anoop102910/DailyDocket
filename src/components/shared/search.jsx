"use client";
import { useDebouncedCallback } from "use-debounce";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

function SearchInput() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSearch = useDebouncedCallback(e => {
    const params = new URLSearchParams(searchParams);
    const value = e.target.value;
    if (value) {
      params.set("q", e.target.value);
    } else params.delete("q");

    replace(`${pathname}?${params.toString()}`);
  }, 300);
  
  return (
      <input
      className="bg-inherit outline-none w-full text-slate-700"
        placeholder="Search..."
        type="search"
        onChange={handleSearch}
        defaultValue={searchParams.get("q")?.toString()}
      />
  );
}

export default SearchInput;
