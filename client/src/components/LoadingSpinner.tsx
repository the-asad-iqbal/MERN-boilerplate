import { memo } from "react";

export const LoadingSpinner = memo(() => (
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto" />
));