"use client";
import React, { useState } from "react";
import { Button } from "./ui/button";
import { addProgram, removeProgram, SubmitApplication } from "@/actions/user";
import { toast } from "sonner";

import { Spinner } from "./Loaders";

export function AddChosenProgramButton({ programID }: { programID: string }) {
  const [loading, setLoading] = useState(false);

  async function handleAddProgram() {
    setLoading(true);
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
    <Button onClick={handleAddProgram}>{loading ? <Spinner /> : "Add"}</Button>
  );
}
export function RemoveChosenProgramButton({
  programID,
}: {
  programID: string;
}) {
  const [loading, setLoading] = useState(false);

  async function handleRemoveProgram() {
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
  }

  return (
    <Button className="bg-red-500 mt-1" onClick={handleRemoveProgram}>
      {loading ? <Spinner /> : "Remove"}
    </Button>
  );
}

export function SubmitApplicationButton() {
  const [loading, setLoading] = useState(false);

  async function handleSubmitApplication() {
    setLoading(true);
    const { error } = await SubmitApplication();

    if (error) {
      toast.error(error);
      setLoading(false);
      return;
    }

    toast.success("Applciation submitted succcessfully.");
    setLoading(false);
  }

  return (
    <Button className="bg-red-500 mt-1" onClick={handleSubmitApplication}>
      {loading ? <Spinner /> : "Submit"}
    </Button>
  );
}
