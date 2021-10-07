import excel from 'node-excel-export'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function handler(req, res) {
    if (/*req.method === "POST"*/true) {
        const posts = await prisma.post.findMany();

        if (!posts) {
            return res
                .status(403)
                .send("");
        }
        
        // You can define styles as json object
        const styles = {
            headerDark: {
                fill: {
                    fgColor: {
                        rgb: 'FF000000'
                    }
                },
                font: {
                    color: {
                        rgb: 'FFFFFFFF'
                    },
                    sz: 14,
                    bold: true,
                    underline: true
                }
            },
            cellPink: {
                fill: {
                    fgColor: {
                        rgb: 'FFFFCCFF'
                    }
                }
            },
            cellGreen: {
                fill: {
                    fgColor: {
                        rgb: 'FF00FF00'
                    }
                }
            }
        };

        //Array of objects representing heading rows (very top)
        const heading = [
            [
                { value: 'Styled Heading', style: styles.headerDark },
            ],
            ['Heading'], // <-- It can be only values
            ['Merged Heading', 'Merged Heading', 'Merged Heading']
        ];

        //Here you specify the export structure
        const specification = {
            /*customer_name: { // <- the key should match the actual data key
                displayName: 'Customer', // <- Here you specify the column header
                headerStyle: styles.headerDark, // <- Header style
                cellStyle: function (value, row) { // <- style renderer function
                    // if the status is 1 then color in green else color in red
                    // Notice how we use another cell value to style the current one
                    return (row.status_id == 1) ? styles.cellGreen : { fill: { fgColor: { rgb: 'FFFF0000' } } }; // <- Inline cell style is possible 
                },
                width: 120 // <- width in pixels
            },
            status_id: {
                displayName: 'Status',
                headerStyle: styles.headerDark,
                cellFormat: function (value, row) { // <- Renderer function, you can access also any row.property
                    return (value == 1) ? 'Active' : 'Inactive';
                },
                width: '10' // <- width in chars (when the number is passed as string)
            },
            note: {
                displayName: 'Description',
                headerStyle: styles.headerDark,
                cellStyle: styles.cellPink, // <- Cell style
                width: 220 // <- width in pixels
            }*/
            id: {
                displayName: 'Id', // <- Here you specify the column header
                headerStyle: styles.headerDark, // <- Header style
                width: 120 // <- width in pixels
            },
            title: {
                displayName: 'Title', // <- Here you specify the column header
                headerStyle: styles.headerDark, // <- Header style
                cellStyle: styles.cellGreen,
                width: 200 // <- width in pixels
            },
            excerpt: {
                displayName: 'Excerpt', // <- Here you specify the column header
                headerStyle: styles.headerDark, // <- Header style
                cellStyle: styles.cellPink,
                width: 600 // <- width in pixels
            }
        }

        // The data set should have the following shape (Array of Objects)
        // The order of the keys is irrelevant, it is also irrelevant if the
        // dataset contains more fields as the report is build based on the
        // specification provided above. But you should have all the fields
        // that are listed in the report specification
        const dataset = [
            { customer_name: 'IBM', status_id: 1, note: 'some note', misc: 'not shown' },
            { customer_name: 'HP', status_id: 0, note: 'some note' },
            { customer_name: 'MS', status_id: 0, note: 'some note', misc: 'not shown' }
        ]

        // Define an array of merges. 1-1 = A:1
        // The merges are independent of the data.
        // A merge will overwrite all data _not_ in the top-left cell.
        const merges = [
            /*{ start: { row: 1, column: 1 }, end: { row: 1, column: 10 } },
            { start: { row: 2, column: 1 }, end: { row: 2, column: 5 } },
            { start: { row: 2, column: 6 }, end: { row: 2, column: 10 } }*/
            { start: { row: 3, column: 1 }, end: { row: 3, column: 3} } // merge row 3 column 1-3
        ]

        // Create the excel report.
        // This function will return Buffer
        const report = excel.buildExport(
            [ // <- Notice that this is an array. Pass multiple sheets to create multi sheet report
                {
                    name: 'Report', // <- Specify sheet name (optional)
                    heading: heading, // <- Raw heading array (optional)
                    merges: merges, // <- Merge cell ranges
                    specification: specification, // <- Report specification
                    data: posts//dataset // <-- Report data
                }
            ]
        );

        return res
            .setHeader('Content-disposition', 'attachment; filename=Report.xlsx')
            .status(201)
            .send(report);
        
    }
    return res
        .status(404)
        .send("");

}

export default handler;
