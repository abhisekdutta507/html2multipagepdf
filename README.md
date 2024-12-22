# html2multipagepdf v2.0.1

Easily convert HTML templates to PDF in React.js/Next.js. Generate dynamic, server-side PDFs for invoices, reports, or documents with seamless integration into your React.js/Next.js application.

## Installation

Using npm:
```sh
$ npm i -g npm
$ npm i @abhisek507/html2multipagepdf@2.0.1
```

In React.js/Next.js/Vanilla JavaScript:
```js
import { generatePDF } from "@abhisek507/html2multipagepdf";
import {
  A4,
  Quality,
  RegularPageSelector,
  PageWithMaxPossibleWidthSelector,
  PageElementSelector,
} from "@abhisek507/html2multipagepdf/constants";

const JSPDFOutputType = {
  arraybuffer: 'arraybuffer',
  blob: 'blob',
  bloburi: 'bloburi',
  datauristring: 'datauristring',
};
```

## Setup

Wrap the JSX/HTML template:
```jsx
const JSX = () => (
  <div className="">
    <div className={`flex flex-col ${RegularPageSelector}`}>
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

    <div className={`flex flex-col ${RegularPageSelector}`}>
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

    <div className={`flex flex-col ${RegularPageSelector}`}>
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
import { generatePDF } from "@abhisek507/html2multipagepdf";
import {
  A4,
  Quality,
  RegularPageSelector,
  PageWithMaxPossibleWidthSelector,
  PageElementSelector,
} from "@abhisek507/html2multipagepdf/constants";

const JSPDFOutputType = {
  arraybuffer: 'arraybuffer',
  blob: 'blob',
  bloburi: 'bloburi',
  datauristring: 'datauristring',
};

const handleGeneratePDF = async () => {
  const pageSelectors = [RegularPageSelector, PageWithMaxPossibleWidthSelector];
  const pageOptions = A4; // A4 || Letter || Legal
  const elementSelector = PageElementSelector;
  const quality = Quality[100] // quality can be 100% || 90% || 80% ... || 10%

  try {
    const pdf = await generatePDF(pageSelectors, pageOptions, elementSelector, quality);
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

- RegularPageSelector
- PageWithMaxPossibleWidthSelector

### RegularPageSelector

The PDF pages generated for `RegularPageSelector` can have `dissimilar content width`. But the script will try to utilize most of the available PDF page width for the content.

### PageWithMaxPossibleWidthSelector

The PDF pages will have `exact same content width`. To achieve this behaviour script might not use most of the PDF page width.

For e.g: 2 pages are generated using `PageWithMaxPossibleWidthSelector`. The 1st page content has a width `A` & 2nd page content has a width `B`.

Let's consider `A` is smaller that `B` then both the page contents will have width `A` to make sure they are of `exact same width`.

### Best practices

- We must use `PageElementSelector` inside the `PageWithMaxPossibleWidthSelector` or `RegularPageSelector`.
- As many `PageElementSelector` we use inside 1 `pageSelector` the more better PDF out we can expect.
- The `PageElementSelector` must not have more height than the available page height.

## Source Code

See the [package source](https://github.com/abhisekdutta507/html2multipagepdf) for more details.

## Support

Tested in Chrome 131, Firefox 133, Safari 18, DuckDuckGo 1.118.0.
