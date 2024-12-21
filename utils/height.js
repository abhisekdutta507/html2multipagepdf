/**
 * @param {{
 *    pageWidth: number;
 *    margin: number;
 *    canvasWidth: number;
 * }} param
 * @returns {{
 *    width: number;
 *    extras: {
 *      canvasWidth: number;
 *      canvasWidthPercentage: number;
 *    };
 * }}
 */
export const bestWidth = ({ pageWidth, margin, canvasWidth }) => {
  let width = canvasWidth;
  const extras = {
    canvasWidth: 0,
    canvasWidthPercentage: 0,
  };

  const totalWidth = canvasWidth + margin * 2; // canvas width + left margin + right margin; assuming both margins are equal
  if (totalWidth > pageWidth) {
    extras.canvasWidth = totalWidth - pageWidth;
    extras.canvasWidthPercentage = (extras.canvasWidth * 100) / canvasWidth;
  }
  width -= extras.canvasWidth;
  return {
    width,
    extras,
  };
};

/**
 * @param {{
 *    pageHeight: number;
 *    margin: number;
 *    canvasHeight: number;
 * }} param
 * @returns {{
 *    height: number;
 *    extras: {
 *      canvasHeight: number;
 *      canvasHeightPercentage: number;
 *    };
 * }}
 */
export const bestHeight = ({
  pageHeight = 0,
  margin = 0,
  canvasHeight = 0,
}) => {
  let height = canvasHeight;
  const extras = {
    canvasHeight: 0,
    canvasHeightPercentage: 0,
  };

  const totalHeight = canvasHeight + margin * 2; // canvas height + top margin + bottom margin; assuming both margins are equal
  if (totalHeight > pageHeight) {
    extras.canvasHeight = totalHeight - pageHeight;
    extras.canvasHeightPercentage = (extras.canvasHeight * 100) / canvasHeight;
  }
  height -= extras.canvasHeight;
  return {
    height,
    extras,
  };
};

/**
 * @param {{
 *    pageWidth: number;
 *    pageHeight: number;
 *    margin: number;
 *    canvasWidth: number;
 *    canvasHeight: number;
 * }} param
 * @returns {{
 *    width: number;
 *    height: number;
 *    margin: number;
 * }}
 */
export const bestWidthAndHeight = ({
  pageWidth = 0,
  pageHeight = 0,
  margin = 0,
  canvasWidth = 0,
  canvasHeight = 0,
}) => {
  let {
    width,
    extras: { canvasWidthPercentage },
  } = bestWidth({
    pageWidth,
    margin,
    canvasWidth,
  });

  const adjustedCanvasHeight =
    (canvasHeight * (100 - canvasWidthPercentage)) / 100;

  let {
    height,
    extras: { canvasHeightPercentage },
  } = bestHeight({
    pageHeight,
    margin,
    canvasHeight: adjustedCanvasHeight,
  });

  width = (width * (100 - canvasHeightPercentage)) / 100;

  return {
    width,
    height,
    margin,
  };
};
