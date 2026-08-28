import { useContext } from "react";
import { AnimationsContext } from "../../components/decorations/effects/animations/AnimationsContext";

export const useFlash = () => {
  const context = useContext(AnimationsContext);

  if (!context) {
    throw new Error("useFlash must be used inside AnimationsProvider");
  }

  return context.flash;
};
