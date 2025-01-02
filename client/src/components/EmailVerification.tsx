import axios from '@/lib/axios';
import React, { useEffect, useState, useCallback, memo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { LoadingSpinner } from './LoadingSpinner';
import { StatusIcon } from '@/lib/icons';

const MESSAGES = {
    VERIFYING: 'Verifying your email...',
    DEFAULT_ERROR: 'Verification failed. Please try again.',
    NETWORK_ERROR: 'Verification failed. Please try again or request a new verification link.'
} as const;

const EmailVerification: React.FC = () => {
    const [status, setStatus] = useState<'verifying' | 'success' | 'error'>('verifying');
    const [message, setMessage] = useState<string>(MESSAGES.VERIFYING);
    const [isVerificationAttempted, setIsVerificationAttempted] = useState(false);

    const { token } = useParams();
    const navigate = useNavigate();

    const handleVerification = useCallback(async () => {
        if (!token || isVerificationAttempted) return;

        setIsVerificationAttempted(true);

        try {
            const response = await axios.post('/auth/verify-email', { token });
            const data = response.data;

            if (data.success) {
                setStatus('success');
                setMessage(data.message);
                setTimeout(() => navigate('/login'), 3000);
            } else {
                setStatus('error');
                setMessage(data.message || MESSAGES.DEFAULT_ERROR);
            }
        } catch (error: any) {
            setStatus('error');
            setMessage(error.response?.data?.message || MESSAGES.NETWORK_ERROR);
        }
    }, [token, navigate, isVerificationAttempted]);

    const handleRetry = useCallback(() => {
        setIsVerificationAttempted(false);
        setStatus('verifying');
        setMessage(MESSAGES.VERIFYING);
    }, []);

    const handleNavigateToLogin = useCallback(() => {
        navigate('/login');
    }, [navigate]);

    const handleNavigateToResend = useCallback(() => {
        navigate('/resend-verification');
    }, [navigate]);

    useEffect(() => {
        handleVerification();
    }, [handleVerification]);

    const statusConfig = {
        verifying: { title: 'Verifying Email', colorClass: 'text-blue-600' },
        success: { title: 'Email Verified!', colorClass: 'text-green-600' },
        error: { title: 'Verification Failed', colorClass: 'text-red-600' }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="max-w-md w-full px-6 py-8 bg-white shadow-md rounded-lg">
                <div className="text-center">
                    {status === 'verifying' && <LoadingSpinner />}
                    {status === 'success' && <StatusIcon status="success" />}
                    {status === 'error' && <StatusIcon status="error" />}

                    <h2 className={`mt-4 text-xl font-semibold ${statusConfig[status].colorClass}`}>
                        {statusConfig[status].title}
                    </h2>

                    <p className="mt-2 text-sm text-gray-600">{message}</p>

                    {status === 'error' && (
                        <div className="mt-6 space-y-4">
                            <button
                                onClick={handleRetry}
                                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                            >
                                Try Again
                            </button>
                            <button
                                onClick={handleNavigateToResend}
                                className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                            >
                                Resend Verification Email
                            </button>
                        </div>
                    )}

                    {status === 'success' && (
                        <div className="mt-6">
                            <button
                                onClick={handleNavigateToLogin}
                                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                            >
                                Proceed to Login
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default memo(EmailVerification);