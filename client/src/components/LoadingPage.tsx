import { LoaderPinwheelIcon } from "lucide-react";

export default function LoadingPage({ message }: { message: string }) {
  return (
    <div className="bg-gray-900 h-full w-full flex justify-center items-center flex-col gap-4">
      <span className="animate-spin ">
        <LoaderPinwheelIcon size={48} />
      </span>
      <div className="font-bold animate-pulse">{message}</div>
    </div>
  );
}
