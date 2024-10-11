import AdminApplicationsTable from "@/components/AdminApplicationsTable";
import DashboardHeader from "@/components/DashboardHeader";
import React, { Suspense } from "react";

export default function ReviewDone() {
  return (
    <div className="mx-4">
      <DashboardHeader title={"Reviewed applications"} />

      <Suspense key={""} fallback={<div>Loading...</div>}>
        <AdminApplicationsTable />
      </Suspense>
    </div>
  );
}
