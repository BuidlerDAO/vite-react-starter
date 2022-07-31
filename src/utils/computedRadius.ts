const computedRadius = (height: number) => {
  let radius = 16;
  // 圆角值计算方法
  if (+((height / 4) % 2) === 0) {
    radius = height / 4;
  } else if (+((height / 4) % 2) !== 0) {
    radius = height / 4 + 2;
  } else {
    radius = height / 4 + 1;
  }

  // 圆角值最大值为 16
  if (radius >= 16) {
    radius = 16;
  }
  return radius;
};

export default computedRadius;
