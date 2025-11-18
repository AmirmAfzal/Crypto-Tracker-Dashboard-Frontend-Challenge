import { AlertCircle } from "lucide-react";

import { Alert, AlertDescription, AlertTitle } from "./ui/alert";

interface Props {
  message: string;
}

const ErrorAlert = ({ message }: Props) => {
  return (
    <Alert variant="destructive" className="mb-6">
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>Error</AlertTitle>
      <AlertDescription>
        {message ||
          "Failed to load cryptocurrency data. Please try again later."}
      </AlertDescription>
    </Alert>
  );
};

export default ErrorAlert;
