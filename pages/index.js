import { PrismaClient } from '@prisma/client'

import {
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
    Button
  } from "@chakra-ui/react"

const prisma = new PrismaClient();

export const getStaticProps = async () => {
    const posts = await prisma.post.findMany();
    return {
        props: {
            posts
        }
    };
};

export default function Index({posts}) {

    return(
        <>

            <Table variant="simple">
                <Thead>
                    <Tr>
                    <Th>ID</Th>
                    <Th>Title</Th>
                    <Th>Excerpt</Th>
                    <Th>Action</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {posts.map(post=>(
                        <Tr>
                            <Td>{post.id}</Td>
                            <Td>{post.title}</Td>
                            <Td>{post.excerpt}</Td>
                            <Td><Button>Edit</Button></Td>
                        </Tr>
                    ))}
                </Tbody>
                </Table>
        </>
    )
}