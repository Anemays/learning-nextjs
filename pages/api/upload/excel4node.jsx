// Require library
import excel from 'excel4node';
import prisma from '../../../lib/db/prisma';

async function handler(req, res) {
    if (req.method === "GET") {
        const posts = await prisma.post.findMany();

        if (!posts) {
            return res
                .status(403)
                .send("");
        }

        // Create a new instance of a Workbook class
        var workbook = new excel.Workbook();

        // Add Worksheets to the workbook
        var worksheet = workbook.addWorksheet('Sheet 1');
        var worksheet2 = workbook.addWorksheet('Sheet 2');

        // Create a reusable style
        var style = workbook.createStyle({
            font: {
                color: '#FF0800',
                size: 12
            },
            //numberFormat: '$#,##0.00; ($#,##0.00); -'
        });
        
        const row_start_at = 1;
        const col_start_at = 1;
        for (let row_index = 0; row_index < posts.length; row_index++) {
            //console.log(`Row: ${row_index}`)
            const row_data = posts[row_index]; // object
            //console.log(row_data)
            const row_keys = Object.keys(row_data);
            //console.log(row_keys)
            const row_num = row_start_at + row_index;
            for (let col_index = 0; col_index < row_keys.length; col_index++) {
                const col_key = row_keys[col_index];
                const col_data = row_data[col_key];
                const col_num = col_start_at + col_index;
                //console.log(`[${row_num} | ${col_num}] ${col_key} ${col_data}`)
                switch (typeof col_data) {
                    case 'boolean':
                        worksheet.cell(row_num, col_num).bool(col_data).style(style);
                        break;
                    case 'number':
                        worksheet.cell(row_num, col_num).number(col_data).style(style);
                        break;
                    case 'string':
                        worksheet.cell(row_num, col_num).string(col_data).style(style);
                        break;
                    default:
                        if (col_data instanceof Date) {
                            if (typeof col_data.getMonth === 'function')
                                worksheet.cell(row_num, col_num).date(col_data).style(style);
                        }
                        break;
                }
            }
        }
        return workbook.write('Excel.xlsx', res);
    }
    return res.status(404).send("");

}

export default handler;