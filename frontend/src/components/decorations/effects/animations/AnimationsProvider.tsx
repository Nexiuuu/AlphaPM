import { useCallback, useRef, useState } from "react";
import { AnimationsContext } from "./AnimationsContext";

export const AnimationsProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [flash, setFlash] = useState(false);
  const [flow, setFlow] = useState(false);

  const lastFlash = useRef(0);

  const cooldown = 1000;

  const triggerFlash = useCallback(() => {
    const now = Date.now();

    if (now - lastFlash.current < cooldown) {
      return;
    }

    lastFlash.current = now;
    setFlash(true);
  }, []);

  const finishFlash = useCallback(() => {
    setFlash(false);
  }, []);

  const triggerFlow = useCallback(() => {
    setFlow(true);
  }, []);

  const finishFlow = useCallback(() => {
    setFlow(false);
  }, []);

  return (
    <AnimationsContext.Provider
      value={{
        flash: {
          active: flash,
          trigger: triggerFlash,
          finish: finishFlash,
        },

        flow: {
          active: flow,
          trigger: triggerFlow,
          finish: finishFlow,
        },

        // TODO
        // bottomGlow: {}
      }}
    >
      {children}
    </AnimationsContext.Provider>
  );
};
