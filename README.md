# html2multipagepdf v2.1.1

Easily convert HTML templates to PDF in React.js/Next.js. Generate dynamic, server-side PDFs for invoices, reports, or documents with seamless integration into your React.js/Next.js application.

## [Live Demo](https://abhisekdutta.com/experiments/html2pdf) | [Example A](https://github.com/abhisekdutta507/documentation/tree/main/reactjs/implement-html-to-pdf-on-reactjs-or-javascript) | [Example B](https://bitbucket.org/abhisekdutta507/react-html-to-pdf/src/main/)

## Installation

Install npm globally (ignore if already installed):

```bash
npm i -g npm
```

Install the `html2multipagepdf` library:

```bash
npm i @abhisek507/html2multipagepdf@2.1.1
```

## Setup

In React.js/Next.js/Vanilla JavaScript:

```js
import { generatePDF, PageConfig } from "@abhisek507/html2multipagepdf";
import {
  A4,
  Quality,
  RegularPageSelector,
  PageWithMaxPossibleWidthSelector,
  PageElementSelector,
  JSPDFOutputType,
  PageNoElementSelector,
  CustomPageNoElementSelector,
} from "@abhisek507/html2multipagepdf/constants";
```

CSS styles:

```css
.hidden {
  display: none;
}
```

Wrap the JSX/HTML template:

```jsx
const JSX = () => (
  <div className="">
    <div className={`flex flex-col ${RegularPageSelector}`}>
      <div className="header">
        {/* header section */}

        <div className='flex align-items-center gap-4'>
          <span>Page</span>
          <span className={CustomPageNoElementSelector}></span>
        </div>
      </div>

      <div className={`${PageElementSelector}`}>
        {/* content row 1 */}
      </div>

      <div className={`${PageElementSelector}`}>
        {/* content row 2 */}
      </div>

      {/* ... */}

      <div className={`${PageElementSelector}`}>
        {/* content row n */}
      </div>

      <div className="footer">
        {/* footer section */}
      </div>
    </div>

    <div className={`flex flex-col ${PageWithMaxPossibleWidthSelector}`}>
      <div className="header">
        {/* header section */}
      </div>

      <div className={`${PageElementSelector}`}>
        {/* content row 1 */}
      </div>

      <div className={`${PageElementSelector}`}>
        {/* content row 2 */}
      </div>

      {/* ... */}

      <div className={`${PageElementSelector}`}>
        {/* content row n */}
      </div>

      <div className="footer">
        {/* footer section */}
      </div>
    </div>
  </div>
);
```

## Generate a PDF

```js
import { generatePDF, PageConfig } from "@abhisek507/html2multipagepdf";
import {
  A4,
  Quality,
  RegularPageSelector,
  PageWithMaxPossibleWidthSelector,
  PageElementSelector,
  JSPDFOutputType,
} from "@abhisek507/html2multipagepdf/constants";

const handleGeneratePDF = async () => {
  const pageSelectors = [RegularPageSelector, PageWithMaxPossibleWidthSelector];
  const pageOptions = A4; // A4 || Letter || Legal
  const elementSelector = PageElementSelector;
  const quality = Quality["100"]; // quality can be 100% || 90% || 80% ... || 10%
  /**
   * @type {PageConfig}
   */
  const pageConfig = {
    quality,
    alignCenter: true,
  };

  try {
    const pdf = await generatePDF(pageSelectors, pageOptions, elementSelector, pageConfig);
    const time = new Date().getTime();
    pdf.save(`${name}-${time}.pdf`);

    // base64 image
    const output = pdf.output(JSPDFOutputType.datauristring);
    return output;
  } catch (e) {

  }
};
```

## What are pageSelectors?

A page selector is a `css class` will be used by the script to determine a page. There are 2 types of pageSelectors,

1. [RegularPageSelector](?tab=readme-ov-file#regularpageselector)
2. [PageWithMaxPossibleWidthSelector](?tab=readme-ov-file#pagewithmaxpossiblewidthselector)

### RegularPageSelector

The PDF pages generated using `RegularPageSelector` can have `dis-similar content width`. But the script will try to utilize most of the available PDF page width for the content.

### PageWithMaxPossibleWidthSelector

The PDF pages will have `exact same content width`. To achieve this behaviour the script might not use most of the PDF page width.

For **e.g**: 2 pages are generated using `PageWithMaxPossibleWidthSelector`. The 1st page content has a width `A` & 2nd page content has a width `B`.

Let's consider `A` is smaller than `B` then both the page contents will have width `A` to make sure they are of `exact same width`.

### Best practices

1. We must use `PageElementSelector` inside the `PageWithMaxPossibleWidthSelector` or `RegularPageSelector`.
2. As many `PageElementSelector` we use inside 1 `pageSelector` the more better PDF output we can expect.
3. The `PageElementSelector` must not have more height than the available page height.

## Display page number

We can either display each page number or custom page number,

1. [PageNoElementSelector](?tab=readme-ov-file#pagenoelementselector)
2. [CustomPageNoElementSelector](?tab=readme-ov-file#custompagenoelementselector)

### PageNoElementSelector

The page no will be conted from first to last. Whenever the className `PageNoElementSelector` will be there on a page, it will be updated with the page no.

### CustomPageNoElementSelector

The `CustomPageNoElementSelector` will allow us to display the page numbers in a controlled sequence. For eg. page 1 & 3 have the className `CustomPageNoElementSelector`, then `page 1` will be considered as `page 1` but `page 3` will be considered as `page 2`. 

## Credits

1. [html2canvas](https://www.npmjs.com/package/html2canvas)
2. [jsPDF](https://www.npmjs.com/package/jspdf)


## Source Code

See the [package source](https://github.com/abhisekdutta507/html2multipagepdf) for more details.

## Support

Tested in Chrome 131, Firefox 133, Safari 18, DuckDuckGo 1.118.0.
