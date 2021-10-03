import Test, { Props } from '../components/Test'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient();

export const getServerSideProps = Props(prisma);

export default function Main({ posts }) {
    console.log(posts)
    return (
        <>
            <Test posts={posts}/>
        </>
    )
}
