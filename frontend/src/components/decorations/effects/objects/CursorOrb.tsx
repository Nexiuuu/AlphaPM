import { useEffect, useRef } from "react";

interface CursorOrbProps {
  parrentRef?: React.RefObject<HTMLElement | null>;
}

export const CursorOrb = ({ parrentRef }: CursorOrbProps) => {
  const orbRef = useRef<HTMLDivElement>(null);

  const mouse = useRef({ x: 0, y: 0 });
  const position = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const rect = parrentRef?.current?.getBoundingClientRect();

      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;

      if (rect) {
        mouse.current.x -= rect.left;
        mouse.current.y -= rect.top;
      }
    };

    window.addEventListener("mousemove", handleMouseMove);

    let animationFrame: number;

    const animate = () => {
      const current = position.current;

      const target = mouse.current;

      const dx = target.x - current.x;
      const dy = target.y - current.y;

      if (Math.hypot(dx, dy) > 0.25) {
        const speed = 0.15;

        current.x += dx * speed;
        current.y += dy * speed;

        if (orbRef.current) {
          orbRef.current.style.transform = `translate3d(${current.x - 4}px, ${current.y - 4}px, 0)`;
        }
      }

      animationFrame = requestAnimationFrame(animate);
    };

    animationFrame = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrame);
    };
  }, []);

  return (
    <div
      ref={orbRef}
      className={`cursor-orb 
        w-2 h-2
        rounded-full 
        bg-[var(--color-primary)] 
        absolute pointer-events-none 
        left-0 top-0 

        before:content-['']
        before:absolute
        before:left-1/2 before:top-1/2
        before:-translate-x-1/2 before:-translate-y-1/2
        before:w-40 before:h-40
        before:rounded-full
        before:bg-[radial-gradient(circle,color-mix(in_srgb,var(--color-primary)_75%,transparent)_0%,transparent_60%)]
        before:opacity-90`}
    />
  );
};
