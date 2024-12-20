import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";

export const quality = {
  100: 1,
  90: 0.9,
  80: 0.8,
  70: 0.7,
  60: 0.6,
  50: 0.5,
  30: 0.3,
  20: 0.2,
  10: 0.1,
};
export const regularPageSelector = "html2multipagepdf-regular-page";
export const pageWithMaxPossibleWidthSelector =
  "html2multipagepdf-page-max-possible-width";
export const pageElementSelector = "html2multipagepdf-page-element";

/**
 * @description A4 page is 20.99 cm x 29.7 cm
 * or 446.2 px x 631.4 px
 */
export const A4 = {
  orientation: 'portrait',
  unit: 'px',
  format: [446.2, 631.4],
  compress: false,
  margin: {
    narrow: 16,
    normal: 32,
  }
};

/**
 * @description Legal page is 21.59 cm x 35.56 cm
 * or 459 px x 756 px
 */
export const Legal = {
  orientation: 'portrait',
  unit: 'px',
  format: [459, 756],
  compress: false,
  margin: {
    narrow: 16,
    normal: 32,
  }
};

/**
 * @description Letter page is 21.59 cm x 27.94 cm
 * or 459 px x 594 px
 */
export const Letter = {
  orientation: 'portrait',
  unit: 'px',
  format: [459, 594],
  compress: false,
  margin: {
    narrow: 16,
    normal: 32,
  }
};

/**
 * 
 * @param {NodeListOf<HTMLElement>} elementsNodeList 
 * @returns {HTMLElement[]}
 */
const toHTMLElementArray = (elementsNodeList) => {
  const pageElements = [];
  elementsNodeList.forEach((element) => {
    pageElements.push(element);
  });
  return pageElements;
};

const bestWidth = ({
  pageWidth,
  margin,
  canvasWidth,
}) => {
  let width = canvasWidth;
  const extras = {
    canvasWidth: 0,
    canvasWidthPercentage: 0,
  };

  const totalWidth = canvasWidth + margin * 2; // canvas width + left margin + right margin; assuming both margins are equal
  if (totalWidth > pageWidth) {
    extras.canvasWidth = totalWidth - pageWidth;
    extras.canvasWidthPercentage = extras.canvasWidth * 100 / canvasWidth;
  }
  width -= extras.canvasWidth;
  return {
    width,
    extras,
  };
};

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
    extras.canvasHeightPercentage = extras.canvasHeight * 100 / canvasHeight;
  }
  height -= extras.canvasHeight;
  return {
    height,
    extras,
  };
};

const bestWidthAndHeight = ({
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

  const adjustedCanvasHeight = canvasHeight * (100 - canvasWidthPercentage) / 100;

  let {
    height,
    extras: { canvasHeightPercentage },
  } = bestHeight({
    pageHeight,
    margin,
    canvasHeight: adjustedCanvasHeight,
  });

  width = width * (100 - canvasHeightPercentage) / 100;

  return {
    width,
    height,
    margin,
  };
};

/**
 * @param {string[]} pageSelectors 
 * @param {A4} pageOptions 
 * @param {string} elementSelector 
 * @param {number} quality 
 * @returns {Promise<jsPDF>}
 */
export const generatePDF = async (pageSelectors, pageOptions, selector, quality) => {
  const pdf = new jsPDF(pageOptions);
  return pdf;
};

export default generatePDF;
