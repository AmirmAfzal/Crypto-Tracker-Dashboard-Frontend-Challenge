import { Suspense } from "react";

import HomePage from "@/components/HomePage";

const page = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <HomePage />
    </Suspense>
  );
};

export default page;
