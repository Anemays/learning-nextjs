import prisma from '../lib/db/prisma';
import NavBar from '../components/header/navbar';

export const getServerSideProps = async ({  }) => {
    await prisma.$disconnect();
    return {
        props: {

        }
    };
}

function Main ({ posts }) {
    return (
        <>
            <NavBar></NavBar>
        </>
    )
}

export default Main;
