import React from "react";
import { useNavigate } from "@tanstack/react-router";

const ErrorScreen = ({
  title = "Something went wrong!",
  message = "We're sorry, but an unexpected error has occurred. Please login.",
  statusCode = 500,
  showHomeButton = true,
}: {
  title?: string;
  message?: string;
  statusCode?: number;
  showHomeButton?: boolean;
}) => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-base-200 text-center p-6">
      <div className="card bg-base-100 shadow-xl max-w-md p-8">
        <h1 className="text-6xl font-bold text-error">{statusCode}</h1>
        <h2 className="text-2xl font-semibold mt-4">{title}</h2>
        <p className="text-gray-500 mt-2 mb-6">{message}</p>

        {showHomeButton && (
            <div className="flex justify-center">
            <button
                onClick={() => navigate({ to: "/" })}
                className="btn btn-accent btn-wide text-white"
            >
                Go to Home
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ErrorScreen;