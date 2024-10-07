// "use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Grid2X2, List, Search, SlidersHorizontal } from "lucide-react";

import { getAllPrograms } from "@/actions/user";
import { AddChosenProgramButton } from "@/components/ActionBUttons";

export default async function SearchPage() {
  // const [view, setView] = useState<"grid" | "list">("grid");
  // const [searchQuery, setSearchQuery] = useState("");
  // const [programs, setPrograms] = useState([1, 2, 3, 4, 5, 6]);
  const view = "grid";
  const searchQuery = "";

  const { programs, error } = await getAllPrograms();

  if (error) return <div className="">{error}</div>;

  // Mock data for demonstration
  const results = [
    { id: 1, title: "Result 1", description: "This is the first result" },
    { id: 2, title: "Result 2", description: "This is the second result" },
    { id: 3, title: "Result 3", description: "This is the third result" },
    { id: 4, title: "Result 4", description: "This is the fourth result" },
    { id: 5, title: "Result 5", description: "This is the fifth result" },
    { id: 6, title: "Result 6", description: "This is the sixth result" },
    { id: 7, title: "Result 7", description: "This is the seventh result" },
    { id: 8, title: "Result 8", description: "This is the eighth result" },
    { id: 9, title: "Result 9", description: "This is the ninth result" },
    { id: 10, title: "Result 10", description: "This is the tenth result" },
  ];

  return (
    <div className="container mx-auto p-4 h-screen flex flex-col">
      <div className="flex items-center space-x-2 mb-4">
        <div className="relative flex-grow">
          <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            className="pl-8"
            placeholder="Search..."
            // value={searchQuery}
            // onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline">
              <SlidersHorizontal className="mr-2 h-4 w-4" />
              Filters
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Filters</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <Label>Category</Label>
                <RadioGroup defaultValue="all">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="all" id="all" />
                    <Label htmlFor="all">All</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="products" id="products" />
                    <Label htmlFor="products">Products</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="services" id="services" />
                    <Label htmlFor="services">Services</Label>
                  </div>
                </RadioGroup>
              </div>
              <div className="space-y-2">
                <Label>Price Range</Label>
                <div className="flex items-center space-x-2">
                  <Checkbox id="price-low" />
                  <Label htmlFor="price-low">$0 - $50</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="price-medium" />
                  <Label htmlFor="price-medium">$51 - $100</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="price-high" />
                  <Label htmlFor="price-high">$101+</Label>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
        <Button
          variant="outline"
          size="icon"
          // onClick={() => setView(view === "grid" ? "list" : "grid")}
        >
          {view === "grid" ? (
            <List className="h-4 w-4" />
          ) : (
            <Grid2X2 className="h-4 w-4" />
          )}
        </Button>
      </div>

      {programs.map((program: any, index: number) => (
        <div key={index} className="flex items-center justify-between max-w-lg">
          {program.name}
          <AddChosenProgramButton programID={program.id as string} />
        </div>
      ))}

      {/* <div
        className={`overflow-y-auto flex-grow ${
          view === "grid" ? "pr-2" : "pr-4"
        }`}
      >
        <div
          className={
            view === "grid"
              ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
              : "space-y-4"
          }
        >
          {results.map((result, index) => (
            <div
              key={index}
              className={`p-4 rounded-lg border ${
                view === "grid"
                  ? ""
                  : "flex flex-col sm:flex-row sm:items-center sm:space-x-4"
              }`}
            >
              <div
                className={`bg-muted rounded-md mb-2 ${
                  view === "grid"
                    ? "w-full h-40"
                    : "w-full sm:w-24 h-24 flex-shrink-0"
                }`}
              />
              <div className={view === "list" ? "flex-grow" : ""}>
                <h3 className="font-semibold">{result.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {result.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div> */}
    </div>
  );
}
