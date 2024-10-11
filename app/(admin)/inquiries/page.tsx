import AdminApplicationsTable from "@/components/AdminApplicationsTable";
import DashboardHeader from "@/components/DashboardHeader";
import React, { Suspense } from "react";

export default function Inquiries() {
  return (
    <div className="mx-4">
      <DashboardHeader title={"Inquiries"} />

      <Suspense key={""} fallback={<div>Loading...</div>}>
        <AdminApplicationsTable />
      </Suspense>
    </div>
  );
}
