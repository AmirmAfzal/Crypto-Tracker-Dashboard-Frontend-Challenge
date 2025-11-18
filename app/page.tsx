import React, { Suspense } from "react";
import HomePage from "@/components/HomePage";

const Page = () => {
  return (
    <Suspense fallback={<div />}>
      <HomePage />
    </Suspense>
  );
};

export default Page;
