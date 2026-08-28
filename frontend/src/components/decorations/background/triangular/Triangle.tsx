export type TriangleParams = {
  vertices: [v1: [number, number], v2: [number, number], v3: [number, number]];
};

export const Triangle = ({ vertices }: TriangleParams) => {
  const points = vertices.map(([x, y]) => `${x},${y}`).join(" ");

  return <polygon fill="currentColor" points={points} />;
};
