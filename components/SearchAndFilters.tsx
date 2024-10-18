"use client";

import { FormEvent, useCallback, useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getAvailableCountries } from "@/actions/user";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import Link from "next/link";

export default function ResponsiveSearchComponent() {
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
      const { data } = await getAvailableCountries();
      setCountries(data);
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
    <div className="w-full mx-auto ">
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            className="w-full pl-10 py-4  border-gray-600"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <Select value={selectedCountry} onValueChange={setSelectedCountry}>
          <SelectTrigger className="w-full sm:w-[200px] border-gray-600">
            <SelectValue placeholder="Choose country" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All countries</SelectItem>
            {countries.map((country, index) => (
              <SelectItem
                key={index}
                value={country.toLowerCase()}
                className="capitalize"
              >
                {country}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Button type="submit" className="w-full sm:w-auto">
          <MagnifyingGlassIcon className="w-6 h-6" />
          Search
        </Button>
      </form>

      <Button variant="outline" className="border-gray-700 mt-2">
        <Link href="/find-programs">Clear all filters</Link>
      </Button>
    </div>
  );
}
