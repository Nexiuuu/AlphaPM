import { useRef, useState } from "react";
import { AnimationsContext } from "./AnimationsContext";

export const AnimationsProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [flash, setFlash] = useState(false);
  const lastFlash = useRef(0);

  const cooldown = 400;

  const triggerFlash = () => {
    const now = Date.now();

    if (now - lastFlash.current < cooldown) {
      return;
    }

    lastFlash.current = now;
    setFlash(true);
  };

  const finishFlash = () => {
    setFlash(false);
  };
  return (
    <AnimationsContext.Provider
      value={{
        flash: {
          active: flash,
          trigger: triggerFlash,
          finish: finishFlash,
        },
        //TODO
        // bottomGlow={}
      }}
    >
      {children}
    </AnimationsContext.Provider>
  );
};
