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
  // When the browser is zoomed out, keep the decorative pattern legible
  // instead of rendering an increasingly dense set of tiny triangles.
  const zoomScale = Math.min(4, Math.max(1, 1 / window.devicePixelRatio));
  const triangleHeight = BASE_HEIGHT * zoomScale;
  const triangleWidth = BASE_WIDTH * zoomScale;

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

  const stepX = triangleWidth / 2 + gap;
  const useDesktop = size.width > size.height;
  const gridSize = useDesktop
    ? { yCount: trianglesCount.narrower, xCount: trianglesCount.wider * 2 }
    : { yCount: trianglesCount.wider, xCount: trianglesCount.narrower * 2 };

  const xCount = Math.max(
    gridSize.xCount,
    Math.ceil(size.width / stepX) + 4,
  );
  const maxX = xCount * stepX;

  const stepY = triangleHeight + gap;
  // The visible CSS viewport changes when the browser zoom changes. Keep the
  // original density, but add rows whenever the main content area is taller.
  const yCount = Math.max(
    gridSize.yCount,
    Math.ceil(size.height / stepY) + 3,
  );
  const maxY = yCount * stepY;

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
              [x + triangleWidth, y],
              [x + triangleWidth / 2, y + triangleHeight],
            ]
          : [
              [x + triangleWidth / 2, y],
              [x, y + triangleHeight],
              [x + triangleWidth, y + triangleHeight],
            ];

        triangles.push(<Triangle key={`${x},${y}`} vertices={vertices} />);
      }
    }

    return triangles;
  };

  const transformX = ((triangleWidth + gap) * scale) / 100;
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
