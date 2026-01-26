import React from "react";
import logo from "@/assets/images/momentum.jpg";
import google from "@/assets/icons/google.svg";

interface GoogleLoginModalProps {
  isOpen: boolean;
  onLogin: () => void;
}

export const GoogleLoginModal: React.FC<GoogleLoginModalProps> = ({
  isOpen,
  onLogin,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-md" />

      {/* Modal content */}
      <div className="relative w-full max-w-md bg-linear-to-br from-gray-950 via-gray-900 to-gray-950 rounded-2xl border border-gray-800/50 shadow-2xl p-8 sm:p-12">
        <div className="absolute inset-0 bg-linear-to-br from-cyan-500/5 to-blue-600/5 rounded-2xl pointer-events-none" />

        <div className="relative space-y-8">
          {/* Logo and Title */}
          <div className="text-center space-y-4">
            <div className="flex justify-center mb-6">
              {/* <div className="w-16 h-16 rounded-2xl bg-linear-to-br from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-500/30"> */}
              <img
                src={logo}
                className="rounded-lg w-18 h-18 lg:w-24 lg:h-24"
              />
              {/* </div> */}
            </div>

            <h2 className="text-white text-2xl sm:text-3xl">
              Welcome to Momentum
            </h2>
            <p className="text-gray-400 text-base sm:text-lg">
              Please sign in to continue
            </p>
          </div>

          {/* Google Sign In Button */}
          <button
            onClick={onLogin}
            className="w-full cursor-pointer flex items-center justify-center gap-3 px-6 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition-all duration-200 shadow-lg shadow-blue-600/30 hover:shadow-blue-600/50 hover:scale-[1.02] active:scale-[0.98] group"
          >
            {/* Google Logo SVG */}
            {/* <div className="w-6 h-6 bg-white rounded-md flex items-center justify-center shrink-0"> */}
            <img src={google} className="w-8 h-8" />
            {/* </div> */}
            <span className="text-lg">Sign in with Google</span>
          </button>
        </div>
      </div>
    </div>
  );
};
