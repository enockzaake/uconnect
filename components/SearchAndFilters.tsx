"use client";

import React, { useState } from "react";
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
import { Search, SlidersHorizontal } from "lucide-react";

export default function SearchAndFilters() {
  const [searchQuery, setSearchQuery] = useState("");
  return (
    <div className="flex items-center space-x-2 mb-4 bg-gray-200 p-2 m-4 rounded">
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
    </div>
  );
}
