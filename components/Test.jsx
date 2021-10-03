
import {
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
    Modal,
    Button,
    useDisclosure,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalCloseButton,
    ModalBody,
    FormControl,
    FormLabel,
    FormErrorMessage,
    FormHelperText,
    Input,
    toggleColorMode,
    useColorMode
} from "@chakra-ui/react"

export function Props(prisma) {
    const Return = async ({ }) => {
        const posts = await prisma.post.findMany();
        return {
            props: {
                posts
            }
        };
    }
    return Return;
}

export default function Test({children, posts}) {
    const { colorMode, toggleColorMode } = useColorMode()
    return (
        <>
            <header>
                <Button onClick={toggleColorMode}>
                    Toggle {colorMode === "light" ? "Dark" : "Light"}
                </Button>
            </header>
            <Table variant="simple">
                <Thead>
                    <Tr>
                        <Th isNumeric>Id</Th>
                        <Th>Title</Th>
                        <Th>Excerpt</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {posts.map(post => (
                        <Tr>
                            <Td isNumeric>{post.id}</Td>
                            <Td>{post.title}</Td>
                            <Td>{post.excerpt}</Td>
                        </Tr>
                    ))}
                </Tbody>
                <Tfoot>
                </Tfoot>
            </Table>
            {children}
        </>
    )
}
