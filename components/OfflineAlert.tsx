import { WifiOff } from "lucide-react";

import { Alert, AlertDescription, AlertTitle } from "./ui/alert";

const OfflineAlert = () => {
  return (
    <Alert className="mb-6 border-alert/50 bg-alert/10">
      <WifiOff className="h-4 w-4 text-alert" />
      <AlertTitle className="text-alert">Offline Mode</AlertTitle>
      <AlertDescription className="text-alert">
        You`re currently offline. Showing cached data from your last visit.
      </AlertDescription>
    </Alert>
  );
};

export default OfflineAlert;
