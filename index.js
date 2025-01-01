import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import {
  A4,
  Generator,
  PageWithMaxPossibleWidthSelector,
  HiddenElementSelector,
} from "./constants";
import {
  bestWidth,
  bestHeight,
  bestWidthAndHeight,
  bestMargin,
} from "./utils/height";
import { toHTMLElementArray } from "./utils/htmlparser";

/**
 * @param {HTMLElement} page
 * @returns {Promise<HTMLCanvasElement>}
 */
const page2canvas = async (page) => {
  const canvas = await html2canvas(page);
  return canvas;
};

/**
 * @param {HTMLElement} page
 * @param {A4} pageOptions
 * @param {HTMLElement[]} elements
 * @param {HTMLElement[]} traversedElements
 * @param {HTMLElement[]} remainingElements
 * @param {{
 *   canvas: HTMLCanvasElement;
 *   height: number;
 *   width: number;
 *   margin: number;
 * }[]} balancedElements
 * @returns {Promise<{
 *   page: HTMLElement;
 *   balancedElements: {
 *      canvas: HTMLCanvasElement;
 *      height: number;
 *      width: number;
 *      margin: number;
 *  }[];
 * }>}
 */
const generateBalancedElements = async (
  page,
  pageOptions,
  elements,
  traversedElements,
  remainingElements,
  balancedElements
) => {
  if (!remainingElements.length) {
    // convert the ui into an image
    const canvas = await page2canvas(page);
    const { width, height, margin } = bestWidthAndHeight({
      pageWidth: pageOptions.format[0],
      pageHeight: pageOptions.format[1],
      margin: pageOptions.margin.narrow,
      canvasWidth: canvas.width,
      canvasHeight: canvas.height,
    });
    balancedElements.push({ canvas, width, height, margin });
    return { page, balancedElements };
  }

  const [element, ...leftEls] = remainingElements;
  element.classList.remove(HiddenElementSelector);
  traversedElements.push(element);

  // convert the ui into an image
  const canvas = page.getBoundingClientRect();

  // find the best width but not best the height
  let {
    width,
    extras: { canvasWidthPercentage },
  } = bestWidth({
    pageWidth: pageOptions.format[0],
    margin: pageOptions.margin.narrow,
    canvasWidth: canvas.width,
  });
  const adjustedCanvasHeight =
    (canvas.height * (100 - canvasWidthPercentage)) / 100;

  // if the height responsible for best width is more than the page height
  // then find the best height
  if (adjustedCanvasHeight > pageOptions.format[1]) {
    const {
      height,
      extras: { canvasHeightPercentage },
    } = bestHeight({
      pageHeight: pageOptions.format[1],
      margin: pageOptions.margin.narrow,
      canvasHeight: adjustedCanvasHeight,
    });
    width = (width * (100 - canvasHeightPercentage)) / 100;

    if (leftEls.length !== 0) {
      const canvas = await page2canvas(page);
      balancedElements.push({
        canvas,
        width,
        height,
        margin: pageOptions.margin.narrow,
      });

      traversedElements.forEach((element) => {
        element.classList.add(HiddenElementSelector);
      });
    }
    return await generateBalancedElements(
      page,
      pageOptions,
      elements,
      traversedElements,
      leftEls,
      balancedElements
    );
  }

  return await generateBalancedElements(
    page,
    pageOptions,
    elements,
    traversedElements,
    leftEls,
    balancedElements
  );
};

/**
 * @param {HTMLElement[]} pages
 * @param {A4} pageOptions
 * @param {HTMLElement[]} traversedPages
 * @param {HTMLElement[]} remainingPages
 * @param {{
 *   canvas: HTMLCanvasElement,
 *   height: number,
 *   width: number,
 *   margin: number,
 * }[]} balancedPages
 * @param {string} elementSelector
 * @returns {Promise<{
 *   canvas: HTMLCanvasElement,
 *   height: number,
 *   width: number,
 *   margin: number,
 * }[]>}
 */
const generateBalancedPages = async (
  pages,
  pageOptions,
  traversedPages,
  remainingPages,
  balancedPages,
  elementSelector
) => {
  if (!remainingPages.length) {
    return balancedPages;
  }

  const [page, ...leftPages] = remainingPages;
  const elementsNodeList = page.querySelectorAll(`.${elementSelector}`);
  elementsNodeList.forEach((element) => {
    element.classList.add(HiddenElementSelector);
  });

  const elements = toHTMLElementArray(elementsNodeList);
  const { balancedElements } = await generateBalancedElements(
    page,
    pageOptions,
    elements,
    [],
    elements,
    []
  );
  elementsNodeList.forEach((element) => {
    element.classList.remove(HiddenElementSelector);
  });
  traversedPages.push(page);

  return await generateBalancedPages(
    pages,
    pageOptions,
    traversedPages,
    leftPages,
    [...balancedPages, ...balancedElements],
    elementSelector
  );
};

/**
 * @param {string} page
 * @param {A4} pageOptions
 * @param {string} elementSelector
 * @returns {Promise<{
 *   canvas: HTMLCanvasElement;
 *   height: number;
 *   width: number;
 *   margin: number;
 * }[]>}
 */
const generateBalancedPagesWithRegularWidth = async (
  page,
  pageOptions,
  elementSelector
) => {
  const pagesNodeList = document.querySelectorAll(`.${page}`);
  const pages = toHTMLElementArray(pagesNodeList);
  const balancedPages = await generateBalancedPages(
    pages,
    pageOptions,
    [],
    pages,
    [],
    elementSelector
  );
  return balancedPages;
};

/**
 * @param {string} page
 * @param {A4} pageOptions
 * @param {string} elementSelector
 * @returns {Promise<{
 *   canvas: HTMLCanvasElement;
 *   height: number;
 *   width: number;
 *   margin: number;
 * }[]>}
 */
const generateBalancedPagesWithMaxPossibleWidth = async (
  page,
  pageOptions,
  elementSelector
) => {
  const pagesNodeList = document.querySelectorAll(`.${page}`);
  const pages = toHTMLElementArray(pagesNodeList);
  const balancedPages = await generateBalancedPages(
    pages,
    pageOptions,
    [],
    pages,
    [],
    elementSelector
  );

  let canvasMinWidth = balancedPages[0].width;
  balancedPages.forEach(({ width }) => {
    if (width < canvasMinWidth) canvasMinWidth = width;
  });

  const balancedPagesWithMinWidth = balancedPages.map(
    ({ width, height, ...rest }) => {
      if (canvasMinWidth === width) {
        return { width, height, ...rest };
      }

      const extraWidth = width - canvasMinWidth;
      const extraWidthPercentage = (extraWidth * 100) / width;
      const adjustedCanvasHeight = (height * (100 - extraWidthPercentage)) / 100;
      return {
        width: canvasMinWidth,
        height: adjustedCanvasHeight,
        ...rest,
      };
    }
  );

  return balancedPagesWithMinWidth;
};

const BalancedPagesGeneratorCollection = new Map([
  [Generator.withRegularWidth, generateBalancedPagesWithRegularWidth],
  [Generator.withMaxPossibleWidth, generateBalancedPagesWithMaxPossibleWidth],
]);

/**
 * @param {jsPDF} pdf
 * @param {string} page
 * @param {A4} pageOptions
 * @param {string} elementSelector
 * @param {{
 *    quality: number;
 *    alignCenter: boolean;
 * }} pageConfig
 * @param {Generator.withRegularWidth | Generator.withMaxPossibleWidth} generatorType
 * @returns {Promise<jsPDF>}
 */
const generateBalancedPagesWithOrWithoutMinWidth = async (
  pdf,
  page,
  pageOptions,
  elementSelector,
  pageConfig,
  generatorType
) => {
  const generateBalancedPages =
    BalancedPagesGeneratorCollection.get(generatorType);
  const balancedPages = await generateBalancedPages(
    page,
    pageOptions,
    elementSelector
  );
  balancedPages.forEach((page) => {
    const convertedImage = page.canvas.toDataURL(
      "image/jpeg",
      pageConfig.quality
    );
    const margin = {
      top: page.margin,
      left: page.margin,
    };
    if (pageConfig.alignCenter) {
      const { left, top } = bestMargin({
        pageWidth: pageOptions.format[0],
        margin: page.margin,
        canvasWidth: page.width,
      });
      margin.left = left;
      margin.top = top;
    }
    pdf.addImage(
      convertedImage,
      "jpeg",
      margin.left,
      margin.top,
      page.width,
      page.height
    );
    pdf.addPage();
  });
  return pdf;
};

/**
 * @param {jsPDF} pdf
 * @param {string[]} remainingPages
 * @param {A4} pageOptions
 * @param {string} elementSelector
 * @param {{
 *    quality: number;
 *    alignCenter: boolean;
 * }} pageConfig
 * @returns {Promise<jsPDF>}
 */
const doGeneratePDF = async (
  pdf,
  remainingPages,
  pageOptions,
  elementSelector,
  pageConfig
) => {
  if (!remainingPages.length) {
    return pdf;
  }

  const [page, ...leftPages] = remainingPages;
  const generatorType =
    page === PageWithMaxPossibleWidthSelector
      ? Generator.withMaxPossibleWidth
      : Generator.withRegularWidth;
  const _pdf = await generateBalancedPagesWithOrWithoutMinWidth(
    pdf,
    page,
    pageOptions,
    elementSelector,
    pageConfig,
    generatorType
  );
  return doGeneratePDF(
    _pdf,
    leftPages,
    pageOptions,
    elementSelector,
    pageConfig
  );
};

/**
 * @param {string[]} pageSelectors
 * @param {A4} pageOptions
 * @param {string} elementSelector
 * @param {{
 *    quality: number;
 *    alignCenter: boolean;
 * }} pageConfig
 * @returns {Promise<jsPDF>}
 */
export const generatePDF = async (
  pageSelectors,
  pageOptions,
  elementSelector,
  pageConfig
) => {
  /**
   * @type {jsPDF}
   */
  const pdf = await doGeneratePDF(
    new jsPDF(pageOptions),
    pageSelectors,
    pageOptions,
    elementSelector,
    pageConfig
  );
  const { pageNumber } = pdf.getCurrentPageInfo();
  pdf.deletePage(pageNumber);
  return pdf;
};

export default generatePDF;
