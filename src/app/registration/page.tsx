import React from "react";
import RegistrationForm from "./regForm";
import PageTitle from "@/components/ui/PageTitle";
import Link from "next/link";
import { ArrowBigLeft, ArrowLeft } from "lucide-react";

const RegPage = () => {
  return (
    <main className="flex min-h-screen flex-col items-center pb-6">
      <div className="absolute left-10 top-5">
        <Link href="/" className="flex">
          <ArrowLeft /> BACK
        </Link>
      </div>
      <PageTitle title="Registration Form" className="pb-4 pt-8" />

      <RegistrationForm />
    </main>
  );
};

export default RegPage;
