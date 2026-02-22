import React, { useState, useEffect } from "react";
import { Download } from "lucide-react";

const InstallPWA = () => {
  const [supportsPWA, setSupportsPWA] = useState(false);
  const [promptInstall, setPromptInstall] = useState(null);

  useEffect(() => {
    const handler = (e) => {
      e.preventDefault();
      setSupportsPWA(true);
      setPromptInstall(e);
    };

    // This event fires if the browser detects a valid PWA manifest
    window.addEventListener("beforeinstallprompt", handler);

    return () => window.removeEventListener("transitionend", handler);
  }, []);

  const onClick = (evt) => {
    e.preventDefault();
    if (!promptInstall) return;

    // Show the browser's install prompt
    promptInstall.prompt();

    // Wait for the user to respond to the prompt
    promptInstall.userChoice.then((choiceResult) => {
      if (choiceResult.outcome === "accepted") {
        console.log("User accepted the install prompt");
      } else {
        console.log("User dismissed the install prompt");
      }
      // Clear the saved prompt since it can't be used again
      setPromptInstall(null);
      setSupportsPWA(false);
    });
  };

  // If the app is already installed or not supported, don't show the button
  if (!supportsPWA) return null;

  return (
    <button
      onClick={onClick}
      className="w-full flex items-center justify-center gap-3 bg-gradient-to-r from-teal-500 to-emerald-500 text-slate-900 py-3 px-4 rounded-xl font-black shadow-lg hover:shadow-teal-500/30 hover:-translate-y-0.5 transition-all mt-4"
    >
      <Download size={20} strokeWidth={2.5} />
      Install App
    </button>
  );
};

export default InstallPWA;
