/**
 * 
 * @param {NodeListOf<HTMLElement>} elementsNodeList 
 * @returns {HTMLElement[]}
 */
export const toHTMLElementArray = (elementsNodeList) => {
  const pageElements = [];
  elementsNodeList.forEach((element) => {
    pageElements.push(element);
  });
  return pageElements;
};
