export function calculateQuadrilateralCenter({x1, y1, x2, y2}: Record<string, number>) {
  const x0 = (x1 + x2)/2,
        y0 = (y1 + y2)/2;
  return { x0, y0 };
}
