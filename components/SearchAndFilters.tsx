"use client";

import { FormEvent, useCallback, useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Search } from "lucide-react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { getAvailableCountries } from "@/actions/user";

export default function ExampleClientComponent() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [countries, setCountries] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("");

  const createQueryString = useCallback(
    (paramsToUpdate: { [key: string]: string | null }) => {
      const params = new URLSearchParams(searchParams.toString());

      Object.entries(paramsToUpdate).forEach(([name, value]) => {
        if (value === null || value === "") {
          params.delete(name);
        } else {
          params.set(name, value);
        }
      });

      return params.toString();
    },
    [searchParams]
  );

  useEffect(() => {
    async function getData() {
      const { data, error } = await getAvailableCountries();
      setCountries(data!);
    }
    getData();
  }, []);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    router.push(
      pathname +
        "?" +
        createQueryString({ q: searchQuery, country: selectedCountry })
    );
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="flex gap-2 relative flex-grow">
        <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2" />
        <Input
          className="pl-8 py- border-black"
          placeholder="Search..."
          value={searchQuery}
          onChange={(e: any) => setSearchQuery(e.target.value)}
        />
        <select
          value={selectedCountry || "default"}
          onChange={(e) => setSelectedCountry(e.target.value)}
          className="border border-1 border-black rounded"
        >
          <option value="default">Choose country</option>
          <option value="all">All countries</option>
          {countries.map((country, index) => (
            <option
              className="capitalize"
              key={index}
              value={country.toLocaleLowerCase()}
            >
              {country}
            </option>
          ))}
        </select>
        <Button>SEARCH</Button>
      </form>
    </div>
  );
}
