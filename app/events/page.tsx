"use client";

import { useState } from "react";
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
import Image from "next/image";
import Header from "@/components/Header";

export default function SearchPage() {
  const [view, setView] = useState<"grid" | "list">("grid");
  const [searchQuery, setSearchQuery] = useState("");

  const results = [
    { id: 1, title: "Quantum Mechanics Workshop", date: "2024-10-01" },
    { id: 2, title: "AI and Machine Learning Seminar", date: "2024-09-28" },
    { id: 3, title: "Advanced Algorithms Lecture", date: "2024-09-25" },
    { id: 4, title: "Data Science Symposium", date: "2024-09-22" },
    {
      id: 5,
      title: "Genomics and Bioinformatics Conference",
      date: "2024-09-18",
    },
    { id: 6, title: "Cybersecurity Awareness Workshop", date: "2024-09-15" },
    {
      id: 7,
      title: "Renewable Energy Technologies Webinar",
      date: "2024-09-10",
    },
    { id: 8, title: "Sustainable Architecture Symposium", date: "2024-09-05" },
    { id: 9, title: "Blockchain in Finance Lecture", date: "2024-09-02" },
    { id: 10, title: "Psychology of Learning Workshop", date: "2024-08-28" },
  ];

  return (
    <>
      <Header />
      <div className="container px-16 p-4 h-screen flex flex-col mt-12">
        <div className="flex items-center space-x-2 mb-4">
          <div className="relative flex-grow">
            <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2" />
            <Input
              className="pl-8 py-6 border-black"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
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
            onClick={() => setView(view === "grid" ? "list" : "grid")}
          >
            {view === "grid" ? (
              <List className="h-4 w-4" />
            ) : (
              <Grid2X2 className="h-4 w-4" />
            )}
          </Button>
        </div>

        <div
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
                <Image
                  alt="event image"
                  className="object-cover w-full h-48"
                  height="200"
                  src="/images/australia.jpg"
                  width="300"
                />
                <div className={view === "list" ? "flex-grow" : ""}>
                  <h3 className="font-semibold">{result.title}</h3>
                  <p className="text-sm text-muted-foreground">{result.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
