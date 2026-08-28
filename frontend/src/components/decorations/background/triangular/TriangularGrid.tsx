import { useEffect, useState, type SVGProps } from "react";
import { Triangle, type TriangleParams } from "./Triangle";

interface TriangularGridParams extends SVGProps<SVGSVGElement> {
  gap: number;
  trianglesCount: { wider: number; narrower: number };
  scale?: number;
  autoTranslate?: boolean;
}

export const TriangularGrid = ({
  gap,
  trianglesCount,
  scale = 100,
  autoTranslate = false,
  ...props
}: TriangularGridParams) => {
  const [size, setSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  const BASE_HEIGHT = 86.6;
  const BASE_WIDTH = 100;

  const useDesktop = size.width > size.height;

  const mobileGrid = {
    yCount: trianglesCount.wider,
    xCount: trianglesCount.narrower * 2,
  };
  const desktopGrid = {
    yCount: trianglesCount.narrower,
    xCount: trianglesCount.wider * 2,
  };

  const gridSize = useDesktop ? desktopGrid : mobileGrid;

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;

    const handleResize = () => {
      clearTimeout(timeout);

      timeout = setTimeout(() => {
        setSize({
          width: window.innerWidth,
          height: window.innerHeight,
        });
      }, 100);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(timeout);
    };
  }, []);

  const stepX = BASE_WIDTH / 2 + gap;
  const maxX = gridSize.xCount * stepX;

  const stepY = BASE_HEIGHT + gap;
  const maxY = gridSize.yCount * stepY;

  let counterY = 0;
  let reversed = false;

  const grid = () => {
    const triangles = [];
    for (let y = 0; y < maxY; y += stepY, ++counterY) {
      reversed = counterY % 2 ? true : false;

      for (let x = 0; x < maxX; x += stepX) {
        reversed = !reversed;
        const vertices: TriangleParams["vertices"] = reversed
          ? [
              [x, y],
              [x + BASE_WIDTH, y],
              [x + BASE_WIDTH / 2, y + BASE_HEIGHT],
            ]
          : [
              [x + BASE_WIDTH / 2, y],
              [x, y + BASE_HEIGHT],
              [x + BASE_WIDTH, y + BASE_HEIGHT],
            ];

        triangles.push(<Triangle key={`${x},${y}`} vertices={vertices} />);
      }
    }

    return triangles;
  };

  const transformX = ((BASE_WIDTH + gap) * scale) / 100;
  return (
    <svg
      style={{
        color: "var(--color-surface-grid)",
        ...(autoTranslate && {
          transform: `translateX(-${transformX}px)`,
        }),
      }}
      {...props}
    >
      {grid()}
    </svg>
  );
};
