import React from 'react'
import ExportToExcel from '../../lib/features/ExportToExcel';
import prisma from '../../lib/db/prisma';

function App({ posts }) {
    //const [data, setData] = React.useState([])
    const fileName = "posts"; // here enter filename for your excel file

    return (
        <div className="App">
            <ExportToExcel apiData={posts} fileName={fileName} />
        </div>
    );
}

export default App;

export const getServerSideProps = async ({ }) => {
    const posts = await prisma.post.findMany();
    return {
        props: {
            posts
        }
    };
}
