/**
 * 笛卡尔坐标转换
 */
function descartesTransform(height, xy) {
  const x = xy[0];
  const y = height - xy[1];
  return [x, y];
}
