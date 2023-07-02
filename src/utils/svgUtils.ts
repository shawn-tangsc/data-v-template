function filterNonNumber(array: any) {
  return array.filter(function (n: any) {
    return typeof n === 'number';
  });
}
function mulAdd(nums: any) {
  nums = filterNonNumber(nums);
  return nums.reduce(function (all: number, num: number) {
    return all + num;
  }, 0);
}
function getTwoPointDistance(pointOne: any, pointTwo: any) {
  var minusX = Math.abs(pointOne[0] - pointTwo[0]);
  var minusY = Math.abs(pointOne[1] - pointTwo[1]);
  return Math.sqrt(minusX * minusX + minusY * minusY);
}
export function getPolylineLength(points: any) {
  let lineSegments = new Array(points.length - 1).fill(0).map(function (foo, i) {
    return [points[i], points[i + 1]];
  });
  let lengths = lineSegments.map((item) => {

    return getTwoPointDistance(item[0], item[1])
  })
  return mulAdd(lengths)
}
