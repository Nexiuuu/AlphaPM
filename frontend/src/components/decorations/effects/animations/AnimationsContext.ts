import { createContext } from "react";

export type AnimationsContextType = {
  flash: {
    active: boolean;
    trigger: () => void;
    finish: () => void;
  };

  //TODO
  // bottomGlow: {
  //   active: boolean;
  //   trigger: () => void;
  //   finish: () => void;
  // };
};

export const AnimationsContext = createContext<AnimationsContextType | null>(
  null,
);
