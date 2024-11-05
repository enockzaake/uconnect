"use client";
import React, { useState, ChangeEvent, useRef } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { toast } from "sonner";
import { CirclePlus, EllipsisVertical } from "lucide-react";

import { addProgram, removeProgram, SubmitApplication } from "@/actions/user";
import { newEvent, newProgram, updateEvent } from "@/actions/admin";
import { ScrollArea } from "./ui/scroll-area";
import { Separator } from "./ui/separator";

import { Spinner } from "./Loaders";
import Image from "next/image";
import { DialogDescription } from "@radix-ui/react-dialog";

export function AddChosenProgramButton({ programID }: { programID: string }) {
  const [loading, setLoading] = useState(false);

  async function handleAddProgram() {
    setLoading(true);
    if (programID.length === 0) {
      toast.error("Invalid program");
      setLoading(false);
      return;
    }

    const { error } = await addProgram(programID);
    if (error) {
      toast.error(error);
      setLoading(false);
      return;
    }

    toast.success("Program added to application list");
    setLoading(false);
  }

  return (
    <Button disabled={loading} onClick={handleAddProgram}>
      {loading ? <Spinner /> : "Add"}
    </Button>
  );
}

export function RemoveChosenProgramButton({
  programID,
}: {
  programID: string;
}) {
  const [loading, setLoading] = useState(false);
  const closeBtnRef = useRef<HTMLButtonElement | null>(null);

  async function handleRemoveProgram() {
    if (!programID) {
      toast.error("Invalid program id");
      setLoading(false);
      return;
    }

    setLoading(true);

    const { error } = await removeProgram(programID);
    if (error) {
      toast.error(error);
      setLoading(false);
      return;
    }

    toast.success("Program removed from application list");
    // Invalid the list and refresh
    setLoading(false);
    closeBtnRef.current?.click();
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <EllipsisVertical className="hover:cursor-pointer" />
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Remove program</DialogTitle>
          <DialogDescription className="text-sm">
            This program will be removed from the chosen application programs.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <DialogClose asChild>
            <Button ref={closeBtnRef} type="button" variant="outline">
              Cancel
            </Button>
          </DialogClose>
          <Button
            disabled={loading}
            onClick={handleRemoveProgram}
            className="bg-red-500"
            type="submit"
          >
            {loading ? <Spinner /> : "Remove"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export function SubmitApplicationButton({ progress }: { progress: number }) {
  const [loading, setLoading] = useState(false);

  async function handleSubmitApplication() {
    setLoading(true);
    // if (progress < 100) {
    //   toast.info(
    //     "Please provide all required profile information to submit application"
    //   );
    //   setLoading(false);
    //   return;
    // }

    toast.success("Appliciation submitted succcessfully.");
    setLoading(false);

    const { error } = await SubmitApplication();

    if (error) {
      toast.error(error);
      setLoading(false);
      return;
    }

    toast.success("Appliciation submitted succcessfully.");
    setLoading(false);
  }

  return (
    <Button
      variant="outline"
      disabled={loading}
      className="bg-green-500 mt-1"
      onClick={handleSubmitApplication}
    >
      {loading ? <Spinner /> : "Submit"}
    </Button>
  );
}

type EducationLevel = "bachelors" | "masters" | "phd";

export function NewProgram() {
  const formRef = useRef<HTMLFormElement>(null);

  const [formData, setFormData] = useState({
    name: "",
    level: "" as EducationLevel,
    institution: "",
    duration: "",
    fulltime: true,
    description: "",
    image: null as File | null,
  });

  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSwitchChange = (checked: boolean) => {
    setFormData((prev) => ({ ...prev, fulltime: checked }));
  };

  const handleSelectChange = (value: string) => {
    setFormData((prev) => ({ ...prev, level: value as EducationLevel }));
  };
  const handleDurationChange = (value: string) => {
    setFormData((prev) => ({ ...prev, duration: value as EducationLevel }));
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData((prev) => ({ ...prev, image: file }));
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setLoading(true);
    e.preventDefault();
    const formElement = e.currentTarget;
    const form = new FormData(formElement);
    const { error } = await newProgram(form);
    if (error) {
      toast.error(error);
      return;
    }
    toast.success("Program added successfully");
    formElement.reset();
    setFormData({
      name: "",
      level: "" as EducationLevel,
      institution: "",
      duration: "",
      fulltime: true,
      description: "",
      image: null,
    });
    setLoading(false);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="gap-1">
          <CirclePlus />
          New program
        </Button>
      </DialogTrigger>
      <DialogContent
        className="sm:min-w-[900px]"
        onInteractOutside={(e) => e.preventDefault()}
      >
        <DialogHeader className="">
          <DialogTitle className="px-6">Add new program</DialogTitle>
        </DialogHeader>
        <ScrollArea className="h-[calc(100vh-12rem)] pr-4">
          <form
            onSubmit={handleSubmit}
            className="space-y-6 mx-auto p-6 bg-card rounded-lg shadow"
          >
            <div>
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                name="name"
                className="border-gray-500"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            </div>

            <div>
              <Label htmlFor="level">Education Level</Label>
              <Select
                onValueChange={handleSelectChange}
                name="level"
                value={formData.level}
                required
              >
                <SelectTrigger className="border-gray-500">
                  <SelectValue placeholder="Select education level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="bachelors">Bachelors</SelectItem>
                  <SelectItem value="masters">Masters</SelectItem>
                  <SelectItem value="phd">Phd</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="institution">Institution</Label>
              <Input
                id="institution"
                name="institution"
                className="border-gray-500"
                value={formData.institution}
                onChange={handleInputChange}
                required
              />
            </div>

            <div>
              <Label htmlFor="duration">Duration</Label>
              <Select
                onValueChange={handleDurationChange}
                name="duration"
                value={formData.duration}
                required
              >
                <SelectTrigger className="border-gray-500">
                  <SelectValue placeholder="Select education duration" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="6 months">6 months</SelectItem>
                  <SelectItem value="1 year">1 year</SelectItem>
                  <SelectItem value="2 years">2 years</SelectItem>
                  <SelectItem value="3 years">3 years</SelectItem>
                  <SelectItem value="4 years">4 years</SelectItem>
                  <SelectItem value="5 years">5 years</SelectItem>
                  <SelectItem value="6 years">6 years</SelectItem>
                  <SelectItem value="7+ years">7+ years</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                id="fulltime"
                name="fulltime"
                checked={formData.fulltime}
                onCheckedChange={handleSwitchChange}
              />
              <Label htmlFor="fulltime">Full Time</Label>
            </div>

            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                className="border-gray-500"
                value={formData.description}
                onChange={handleInputChange}
                required
              />
            </div>

            <div>
              <Label htmlFor="image">Image</Label>
              <Input
                id="image"
                name="image"
                type="file"
                accept="image/*"
                className="border-gray-500 mb-2"
                onChange={handleImageChange}
              />
              {imagePreview && (
                <div className="mt-2">
                  <Image
                    src={imagePreview}
                    alt="Preview"
                    className="max-w-full h-auto rounded"
                  />
                </div>
              )}
            </div>

            <Separator />
            <div className="flex md:justify-end">
              <Button
                disabled={loading}
                className="w-full sm:w-fit"
                type="submit"
              >
                {loading ? <Spinner /> : "Submit"}
              </Button>
            </div>
          </form>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}

export function UpdateEvent({ eventID }: { eventID: string }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Edit</Button>
      </DialogTrigger>
      <DialogContent
        className="sm:max-w-[900px]"
        onInteractOutside={(e) => e.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle>New event</DialogTitle>
        </DialogHeader>
        <ScrollArea className="h-[calc(100vh-12rem)] mt-6 pr-4">
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input
                id="name"
                defaultValue="Pedro Duarte"
                className="col-span-3"
              />
            </div>
          </div>
        </ScrollArea>
        <DialogFooter>
          <Button type="submit">Save </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
export function NewEvent() {
  const formRef = useRef<HTMLFormElement>(null);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image: null as File | null,
    start_date: "",
    venue: "",
    status: "active", // default value
  });

  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData((prev) => ({ ...prev, image: file }));
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setLoading(true);
    e.preventDefault();
    const formElement = e.currentTarget;
    const form = new FormData(formElement);

    // @ts-ignore
    const { error } = await newEvent(form); // Submit form data (you need to implement newEvent)
    if (error) {
      toast.error(error);
      setLoading(false);
      return;
    }

    toast.success("Event added successfully");
    if (formRef.current) {
      formRef.current.reset();
    }

    setFormData({
      title: "",
      description: "",
      image: null,
      start_date: "",
      venue: "",
      status: "active",
    });

    setImagePreview(null);
    setLoading(false);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="gap-1">
          <CirclePlus />
          New Event
        </Button>
      </DialogTrigger>
      <DialogContent
        className="sm:min-w-[900px]"
        onInteractOutside={(e) => e.preventDefault()}
      >
        <DialogHeader className="">
          <DialogTitle className="px-6">Add new event</DialogTitle>
        </DialogHeader>
        <ScrollArea className="h-[calc(100vh-12rem)] pr-4">
          <form
            ref={formRef}
            onSubmit={handleSubmit}
            className="space-y-6 mx-auto p-6 bg-card rounded-lg shadow"
          >
            {/* Title */}
            <div>
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                name="title"
                className="border-gray-500"
                value={formData.title}
                onChange={handleInputChange}
                required
              />
            </div>

            {/* Description */}
            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                className="border-gray-500"
                value={formData.description}
                onChange={handleInputChange}
                required
              />
            </div>

            {/* Start Date */}
            <div>
              <Label htmlFor="start_date">Start Date</Label>
              <Input
                id="start_date"
                name="start_date"
                type="date"
                className="border-gray-500"
                value={formData.start_date}
                onChange={handleInputChange}
                required
              />
            </div>

            {/* Venue */}
            <div>
              <Label htmlFor="venue">Venue</Label>
              <Input
                id="venue"
                name="venue"
                className="border-gray-500"
                value={formData.venue}
                onChange={handleInputChange}
                required
              />
            </div>

            {/* Status */}
            <div>
              <Label htmlFor="status">Status</Label>
              <Select
                onValueChange={(value) =>
                  setFormData((prev) => ({ ...prev, status: value }))
                }
                name="status"
                value={formData.status}
                required
              >
                <SelectTrigger className="border-gray-500">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Image */}
            <div>
              <Label htmlFor="image">Image</Label>
              <Input
                id="image"
                name="image"
                type="file"
                accept="image/*"
                className="border-gray-500 mb-2"
                onChange={handleImageChange}
              />
              {imagePreview && (
                <div className="mt-2">
                  <Image
                    src={imagePreview}
                    alt="Preview"
                    className="max-w-full h-auto rounded"
                  />
                </div>
              )}
            </div>

            <Separator />
            <div className="flex md:justify-end">
              <Button
                disabled={loading}
                className="w-full sm:w-fit"
                type="submit"
              >
                {loading ? <Spinner /> : "Submit"}
              </Button>
            </div>
          </form>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
