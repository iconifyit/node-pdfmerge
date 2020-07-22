const
    fs              = require('file-system'),
    path            = require("path"),
    dropbox         = require("dropbox"),
    { PDFDocument } = require('pdf-lib'),
    Dropbox         = require('dropbox').Dropbox,
    $fetch          = require('isomorphic-fetch'),
    axios           = require('axios').default

require('dotenv').config()

const
    kDBX_ACCESS_TOKEN = process.env.kDBX_ACCESS_TOKEN,
    kDBX_APP_KEY      = process.env.kDBX_APP_KEY,
    kDBX_APP_SECRET   = process.env.kDBX_APP_SECRET,
    kAUTH_HASH        = (Buffer.from(`${kDBX_APP_KEY}:${kDBX_APP_SECRET}`)).toString('base64');

// curl -X POST https://api.dropboxapi.com/2/files/list_folder \
//     --header "Authorization: Bearer ${ACCESS_TOKEN}"   \
//     --header "Content-Type: application/json"   \
//     --data "{\
//         \"limit\": 250, \
//         \"path\": \"/0000--pdf-merge/watch\",\
//         \"recursive\": true, \
//         \"include_deleted\": false,\
//         \"include_has_explicit_shared_members\": true,\
//         \"include_mounted_folders\": true,\
//         \"include_non_downloadable_files\": true\
//     }"

const response = axios({
    method: 'post',
    url: 'https://api.dropboxapi.com/2/auth/token/from_oauth1',
    data: {
        "oauth1_token": kDBX_APP_KEY,
        "oauth1_token_secret": kDBX_APP_SECRET
    },
    headers: {
        'Authorization': `Basic ${kAUTH_HASH}`
    }
});

// curl -X POST https://api.dropboxapi.com/2/auth/token/from_oauth1 \
//     --header "Authorization: Basic Z3Z4bGVzanBoZzYzejhxOmVnaDhtN3d5d3g1MHBmMQ==" \
//     --header "Content-Type: application/json" \
//     --data "{\"oauth1_token\": \"qievr8hamyg6ndck\",\"oauth1_token_secret\": \"qomoftv0472git7\"}"

response
    .then((result) => console.log(result))
    .catch((reason) => console.error(reason))

// https://www.dropbox.com/oauth2/authorize?client_id=gvxlesjphg63z8q&token_access_type=offline&response_type=code


// const dbx = new Dropbox({ accessToken: kDBX_ACCESS_TOKEN });
//
// const dbx = new Dropbox({
//     Authorization: `Basic ${kDBX_APP_KEY}:${kDBX_APP_SECRET}`,
//     fetch : fetch
// });

const example = {
    '.tag': 'file',
    name: 'R0065-Relentless-GB-Bev-Track-Retainer-Labels-Range-x7-v2-HR.pdf',
    path_lower: '/pdf-merge/staging/hr/r0065-relentless-gb-bev-track-retainer-labels-range-x7-v2-hr.pdf',
    path_display: '/pdf-merge/staging/HR/R0065-Relentless-GB-Bev-Track-Retainer-Labels-Range-x7-v2-HR.pdf',
    id: 'id:c5mPMSl111AAAAAAAAAArA',
    client_modified: '2020-07-22T02:40:55Z',
    server_modified: '2020-07-22T02:40:55Z',
    rev: '015aafeab4c204400000001d86b5970',
    size: 7231065,
    is_downloadable: true,
    content_hash: 'dc9908c2fdc5f99dc8c9d9dab817ec3115563c9a16001e9a07c4d62f86a5c9c4'
};

// dbx.filesListFolder({path: '/pdf-merge/staging/HR'})
//     .then((response) => {
//         console.log(response.entries);
//     })
//     .catch((error) => {
//         console.log(error);
//     });

// page.drawText('Creating PDFs in JavaScript is awesome!', {
//     x: 50,
//     y: 450,
//     size: 15,
//     font: timesRomanFont,
//     color: rgb(0, 0.53, 0.71),
// });

// const directoryPath = path.join(__dirname, 'data');
//
// const pdfs = [];
//
// console.log(typeof fs.readdirSync)
//
// try {
//     console.log(fs.existsSync(directoryPath))
//
//     const files = fs.readdirSync(directoryPath);
//
//     files.forEach((file) => {
//         pdfs.push(
//             path.join(__dirname, 'data', file)
//         );
//     });
//
// }
// catch(e) { console.error(e) }
//
// const mergePdfs = async (pdfsToMerge) => {
//     const mergedPdf = await PDFDocument.create();
//     for (const pdfCopyDoc of pdfsToMerge) {
//         const pdfBytes = fs.readFileSync(pdfCopyDoc);
//         const pdf = await PDFDocument.load(pdfBytes);
//         const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
//         copiedPages.forEach((page) => {
//             mergedPdf.addPage(page);
//         });
//     }
//     const mergedPdfFile = await mergedPdf.save();
//     return mergedPdfFile;
// }
//
// mergePdfs(pdfs)
//     .then((result) => {
//         fs.writeFileSync('./merged.pdf', result);
//     })
