export const validateNum = (maybeNum: any): number => {
  if (!maybeNum) throw new Error("missing num");
  if (isNaN(+maybeNum)) throw new Error("invalid num");
  return +maybeNum;
};
