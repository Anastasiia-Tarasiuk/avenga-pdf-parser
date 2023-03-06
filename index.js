const url = '../pdf/pdftest.pdf';

const canvas = document.querySelector("canvas");
const ctx = canvas.getContext('2d');

let pdfDocument = null;

const scale = 0.5;

renderPDF(url);

function renderPDF(url) {
    
    pdfjsLib.getDocument(url).promise.then(pdfDoc => {
        pdfDocument = pdfDoc;

        renderPage(1)
    })
}

const renderPage = num => {

    pdfDocument.getPage(num).then(page => {

        const viewport = page.getViewport({scale})
        canvas.height = viewport.height;
        canvas.width = viewport.width;

        const renderCtx = {
            canvasContext: ctx,
            viewport
        }

        page.render(renderCtx).promise.then(() => {
            console.log('done')
        })
    })

}


const inputEl = document.querySelector('input');

function onSaveFilen(e) {
    const fr = new FileReader();

    // fr.readAsDataURL(inputEl.files[0]);

    fr.readAsArrayBuffer(inputEl.files[0])
    fr.onload = function (e) {
        console.log(e.srcElement.result)
        renderPDF(e.srcElement.result)
    } 
}

inputEl.addEventListener('change', onSaveFilen);
