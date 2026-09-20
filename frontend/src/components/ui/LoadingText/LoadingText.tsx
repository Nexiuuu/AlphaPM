import { useEffect, useState } from "react";

interface LoadingTextProps {
  label: string;
}

export const LoadingText = ({ label }: LoadingTextProps) => {
  const [dotCount, setDotCount] = useState(0);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setDotCount((previousDotCount) => (previousDotCount + 1) % 4);
    }, 400);

    return () => window.clearInterval(interval);
  }, []);

  return (
    <span>
      {label}
      <span aria-hidden="true" className="inline-block w-[1.5em]">
        {".".repeat(dotCount)}
      </span>
    </span>
  );
};
