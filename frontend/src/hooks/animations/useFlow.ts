import { useContext } from "react";
import { AnimationsContext } from "../../components/decorations/effects/animations/AnimationsContext";

export const useFlow = () => {
  const context = useContext(AnimationsContext);

  if (!context) {
    throw new Error("useFlow must be used inside AnimationsProvider");
  }

  return context.flow;
};
