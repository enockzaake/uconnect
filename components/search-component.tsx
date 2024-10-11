"use client";

import { useState, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function AdvancedSearchComponent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [search, setSearch] = useState(searchParams.get("q") || "");
  const [isOpen, setIsOpen] = useState(false);
  const [filters, setFilters] = useState({
    category: searchParams.get("category") || "",
    priceRange: searchParams.get("priceRange") || "",
    inStock: searchParams.get("inStock") === "true",
    rating: searchParams.get("rating") || "",
    sortBy: searchParams.get("sortBy") || "relevance",
  });

  const updateQuery = useCallback(
    (name: string, value: string | boolean) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value !== "" && value !== false) {
        params.set(name, value.toString());
      } else {
        params.delete(name);
      }
      return params.toString();
    },
    [searchParams]
  );

  const handleSearch = useCallback(
    (value: string) => {
      setSearch(value);
      const newQuery = updateQuery("q", value);
      router.replace(`?${newQuery}`);
    },
    [router, updateQuery]
  );

  const handleFilterChange = useCallback(
    (name: string, value: string | boolean) => {
      setFilters((prev) => ({ ...prev, [name]: value }));
    },
    []
  );

  const applyFilters = useCallback(() => {
    let newQuery = updateQuery("q", search);
    Object.entries(filters).forEach(([key, value]) => {
      newQuery = updateQuery(key, value);
    });
    router.replace(`?${newQuery}`);
    setIsOpen(false);
  }, [router, updateQuery, search, filters]);

  return (
    <div className="w-full max-w-2xl mx-auto p-4">
      <div className="flex gap-2 mb-4">
        <Input
          type="text"
          placeholder="Search..."
          value={search}
          onChange={(e) => handleSearch(e.target.value)}
          className="flex-grow"
        />
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button variant="outline">Filters</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Filters</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="category">Category</Label>
                <Select
                  value={filters.category}
                  onValueChange={(value) =>
                    handleFilterChange("category", value)
                  }
                >
                  <SelectTrigger id="category">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="electronics">Electronics</SelectItem>
                    <SelectItem value="clothing">Clothing</SelectItem>
                    <SelectItem value="books">Books</SelectItem>
                    <SelectItem value="home">Home & Garden</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="priceRange">Price Range</Label>
                <Select
                  value={filters.priceRange}
                  onValueChange={(value) =>
                    handleFilterChange("priceRange", value)
                  }
                >
                  <SelectTrigger id="priceRange">
                    <SelectValue placeholder="Select price range" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0-50">$0 - $50</SelectItem>
                    <SelectItem value="50-100">$50 - $100</SelectItem>
                    <SelectItem value="100-200">$100 - $200</SelectItem>
                    <SelectItem value="200+">$200+</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="inStock"
                  checked={filters.inStock}
                  onCheckedChange={(checked) =>
                    handleFilterChange("inStock", checked)
                  }
                />
                <Label htmlFor="inStock">In Stock</Label>
              </div>
              <div className="grid gap-2">
                <Label>Rating</Label>
                <RadioGroup
                  value={filters.rating}
                  onValueChange={(value) => handleFilterChange("rating", value)}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="4+" id="r4" />
                    <Label htmlFor="r4">4 stars & above</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="3+" id="r3" />
                    <Label htmlFor="r3">3 stars & above</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="2+" id="r2" />
                    <Label htmlFor="r2">2 stars & above</Label>
                  </div>
                </RadioGroup>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="sortBy">Sort By</Label>
                <Select
                  value={filters.sortBy}
                  onValueChange={(value) => handleFilterChange("sortBy", value)}
                >
                  <SelectTrigger id="sortBy">
                    <SelectValue placeholder="Select sorting" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="relevance">Relevance</SelectItem>
                    <SelectItem value="price-low-high">
                      Price: Low to High
                    </SelectItem>
                    <SelectItem value="price-high-low">
                      Price: High to Low
                    </SelectItem>
                    <SelectItem value="newest">Newest Arrivals</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <Button onClick={applyFilters}>Apply Filters</Button>
          </DialogContent>
        </Dialog>
      </div>
      <div className="bg-muted p-4 rounded-md">
        <h2 className="text-lg font-semibold mb-2">Active Filters:</h2>
        <ul className="list-disc list-inside">
          {search && <li>Search: {search}</li>}
          {filters.category && <li>Category: {filters.category}</li>}
          {filters.priceRange && <li>Price Range: {filters.priceRange}</li>}
          {filters.inStock && <li>In Stock: Yes</li>}
          {filters.rating && <li>Rating: {filters.rating}</li>}
          {filters.sortBy !== "relevance" && <li>Sort By: {filters.sortBy}</li>}
        </ul>
      </div>
    </div>
  );
}
