import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import { Generator, PageWithMaxPossibleWidthSelector } from "./constants";
import { bestWidthAndHeight } from "./utils/height";
import { toHTMLElementArray } from "./utils/htmlparser";

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
  return [];
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
    element.classList.add("hidden");
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
    element.classList.remove("hidden");
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
 * @param {number} quality
 * @param {Generator.withRegularWidth | Generator.withMaxPossibleWidth} generatorType
 * @returns {Promise<jsPDF>}
 */
const generateBalancedPagesWithOrWithoutMinWidth = async (
  pdf,
  page,
  pageOptions,
  elementSelector,
  quality,
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
    const convertedImage = page.canvas.toDataURL("image/jpeg", quality);
    pdf.addImage(
      convertedImage,
      "jpeg",
      page.margin,
      page.margin,
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
 * @param {number} quality
 * @returns {Promise<jsPDF>}
 */
const doGeneratePDF = async (
  pdf,
  remainingPages,
  pageOptions,
  elementSelector,
  quality
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
    quality,
    generatorType
  );
  return doGeneratePDF(_pdf, leftPages, pageOptions, elementSelector, quality);
};

/**
 * @param {string[]} pageSelectors
 * @param {A4} pageOptions
 * @param {string} elementSelector
 * @param {number} quality
 * @returns {Promise<jsPDF>}
 */
export const generatePDF = async (
  pageSelectors,
  pageOptions,
  elementSelector,
  quality
) => {
  /**
   * @type {jsPDF}
   */
  const pdf = await doGeneratePDF(
    new jsPDF(pageOptions),
    pageSelectors,
    pageOptions,
    elementSelector,
    quality
  );
  const { pageNumber } = pdf.getCurrentPageInfo();
  pdf.deletePage(pageNumber);
  return pdf;
};

export default generatePDF;
