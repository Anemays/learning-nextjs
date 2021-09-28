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
    Input
} from "@chakra-ui/react"
import { Formik, Field, Form } from 'formik';

const prisma = new PrismaClient();

export const getStaticProps = async () => {
    const posts = await prisma.post.findMany();
    return {
        props: {
            posts
        }
    };
};

const Main = ({ posts }) => {

    const Form_Edit = (data) => {

        return (
            <Formik
                initialValues={ data }
                onSubmit={(values, actions) => {
                    setTimeout(async () => {
                        const title = values.title;
                        const excerpt = values.excerpt;

                        const response = await fetch("/api/crud/test", {
                            method: "POST",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify({ title, excerpt })
                        });
                        if (response.ok) {
                            return router.push("/");
                        } else {
                            //setIsOpen(true)
                            alert(JSON.stringify(values));
                        }

                        actions.setSubmitting(false)
                    }, 0)
                }}
            >
                {(props) => (
                    <Form>
                        <Field name="id">
                            {({ field, form }) => (
                                <FormControl isInvalid={form.errors.id && form.touched.id}>
                                    <FormLabel htmlFor="id">Id</FormLabel>
                                    <Input {...field} id="id" placeholder="id" isDisabled />
                                    <FormErrorMessage>{form.errors.id}</FormErrorMessage>
                                </FormControl>
                            )}
                        </Field>
                        <Field name="title">
                            {({ field, form }) => (
                                <FormControl isInvalid={form.errors.title && form.touched.title}>
                                    <FormLabel htmlFor="title">Title</FormLabel>
                                    <Input {...field} id="title" placeholder="title" />
                                    <FormErrorMessage>{form.errors.title}</FormErrorMessage>
                                </FormControl>
                            )}
                        </Field>
                        <Field name="excerpt">
                            {({ field, form }) => (
                                <FormControl isInvalid={form.errors.excerpt && form.touched.excerpt}>
                                    <FormLabel htmlFor="excerpt">Excerpt</FormLabel>
                                    <Input {...field} id="excerpt" placeholder="excerpt" />
                                    <FormErrorMessage>{form.errors.excerpt}</FormErrorMessage>
                                </FormControl>
                            )}
                        </Field>
                        <Button
                            mt={4}
                            colorScheme="teal"
                            isLoading={props.isSubmitting}
                            type="submit"
                        >
                            Update
                        </Button>
                    </Form>
                )}
            </Formik>
        )
    }

    const Button_Edit = (data) => {
        const { isOpen, onOpen, onClose } = useDisclosure();
        return (
            <>
                <Button colorScheme="blue" onClick={onOpen}>Edit</Button>

                <Modal isOpen={isOpen} onClose={onClose} variant="wide">
                    <ModalOverlay />
                    <ModalContent>
                        <ModalHeader>Edit {data.title}</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                            {Form_Edit(data)}
                        </ModalBody>

                        <ModalFooter>
                        </ModalFooter>
                    </ModalContent>
                </Modal>
            </>
        )
    }

    const Button_Delete = (data) => {
        const { isOpen, onOpen, onClose } = useDisclosure();
        return (
            <>
                <Button colorScheme="red" onClick={onOpen}>Delete</Button>

                <Modal isOpen={isOpen} onClose={onClose} variant="wide">
                    <ModalOverlay />
                    <ModalContent>
                        <ModalHeader>Delete {data.title}</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                            <p>{data.excerpt}</p>
                        </ModalBody>

                        <ModalFooter>
                            <Button mr={3} onClick={onClose}>
                                Cancel
                            </Button>
                            <Button colorScheme="red" mr={3} onClick={onClose}>
                                Confirm Delete
                            </Button>
                        </ModalFooter>
                    </ModalContent>
                </Modal>
            </>
        )
    }

    const Button_Add = () => {
        const { isOpen, onOpen, onClose } = useDisclosure();
        return (
            <>
                <Button colorScheme="green" onClick={onOpen}>Add</Button>

                <Modal isOpen={isOpen} onClose={onClose} variant="wide">
                    <ModalOverlay />
                    <ModalContent>
                        <ModalHeader>Add</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                            <p>Test</p>
                        </ModalBody>

                        <ModalFooter>
                            <Button mr={3} onClick={onClose}>
                                Cancel
                            </Button>
                            <Button colorScheme="green" mr={3} onClick={onClose}>
                                Add
                            </Button>
                        </ModalFooter>
                    </ModalContent>
                </Modal>
            </>
        )
    }

    return (
        <>
            <Table variant="simple">
                <Thead>
                    <Tr>
                        <Th isNumeric>Id</Th>
                        <Th>Title</Th>
                        <Th>excerpt</Th>
                        <Th>Actions</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {posts.map(post => (
                    <Tr>
                        <Td isNumeric>{post.id}</Td>
                        <Td>{post.title}</Td>
                        <Td>{post.excerpt}</Td>
                        <Td>{Button_Edit(post)} {Button_Delete(post)}</Td>
                    </Tr>
                    ))}
                </Tbody>
                <Tfoot>
                    <Tr>
                        <Th isNumeric>{Button_Add()}</Th>
                    </Tr>
                </Tfoot>
            </Table>
        </>
    );
}

export default Main;
