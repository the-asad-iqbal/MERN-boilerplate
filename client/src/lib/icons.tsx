import { memo } from "react";

export const StatusIcon = memo(({ status }: { status: 'success' | 'error' }) => (
    <div className={`mx-auto flex items-center justify-center h-12 w-12 rounded-full ${status === 'success' ? 'bg-green-100' : 'bg-red-100'
        }`}>
        {status === 'success' ? (
            <svg className="h-6 w-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
            </svg>
        ) : (
            <svg className="h-6 w-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
        )}
    </div>
));