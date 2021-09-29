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
import { useRouter } from 'next/router';

const prisma = new PrismaClient();

export const getServerSideProps = async ({  }) => {
    const posts = await prisma.post.findMany();
    return {
        props: {
            posts
        }
    };
}

const Main = ({ posts }) => {
    const router = useRouter();

    const Form_Add = (onClose) => {
        return (
            <Formik
                initialValues={{}}
                onSubmit={(values, actions) => {
                    setTimeout(async () => {

                        const response = await fetch("/api/crud/create", {
                            method: "POST",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify(values)
                        });
                        if (response.ok) {
                            onClose();
                            actions.setSubmitting(false)
                            return router.reload(window.location.pathname);
                        } else {
                            alert(JSON.stringify(values));
                        }

                        onClose();
                        actions.setSubmitting(false)
                    }, 0)
                }}
            >
                {(props) => (
                    <Form>
                        <Field name="title">
                            {({ field, form }) => (
                                <FormControl isInvalid={form.errors.title && form.touched.title} isRequired>
                                    <FormLabel htmlFor="title">Title</FormLabel>
                                    <Input {...field} id="title" placeholder="title" />
                                    <FormErrorMessage>{form.errors.title}</FormErrorMessage>
                                </FormControl>
                            )}
                        </Field>
                        <Field name="excerpt">
                            {({ field, form }) => (
                                <FormControl isInvalid={form.errors.excerpt && form.touched.excerpt} isRequired>
                                    <FormLabel htmlFor="excerpt">Excerpt</FormLabel>
                                    <Input {...field} id="excerpt" placeholder="excerpt" />
                                    <FormErrorMessage>{form.errors.excerpt}</FormErrorMessage>
                                </FormControl>
                            )}
                        </Field>
                        <Button
                            mt={4}
                            colorScheme="green"
                            isLoading={props.isSubmitting}
                            type="submit"
                        >
                            Add
                        </Button>
                    </Form>
                )}
            </Formik>
        )
    }

    const Form_Delete = (data, onClose) => {
        return (
            <Formik
                initialValues={data}
                onSubmit={(values, actions) => {
                    setTimeout(async () => {

                        const response = await fetch("/api/crud/delete", {
                            method: "POST",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify(values)
                        });
                        if (response.ok) {
                            onClose();
                            actions.setSubmitting(false)
                            return router.reload(window.location.pathname);
                        } else {
                            alert(JSON.stringify(values));
                        }

                        onClose();
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
                                    <Input {...field} id="title" placeholder="title" isDisabled />
                                    <FormErrorMessage>{form.errors.title}</FormErrorMessage>
                                </FormControl>
                            )}
                        </Field>
                        <Field name="excerpt">
                            {({ field, form }) => (
                                <FormControl isInvalid={form.errors.excerpt && form.touched.excerpt}>
                                    <FormLabel htmlFor="excerpt">Excerpt</FormLabel>
                                    <Input {...field} id="excerpt" placeholder="excerpt" isDisabled />
                                    <FormErrorMessage>{form.errors.excerpt}</FormErrorMessage>
                                </FormControl>
                            )}
                        </Field>
                        <Button
                            mt={4}
                            colorScheme="red"
                            isLoading={props.isSubmitting}
                            type="submit"
                        >
                            Delete
                        </Button>
                    </Form>
                )}
            </Formik>
        )
    }

    const Form_Update = (data, onClose) => {
        return (
            <Formik
                initialValues={ data }
                onSubmit={(values, actions) => {
                    setTimeout(async () => {

                        const response = await fetch("/api/crud/update", {
                            method: "POST",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify(values)
                        });
                        if (response.ok) {
                            onClose();
                            actions.setSubmitting(false)
                            return router.reload(window.location.pathname);
                        } else {
                            alert(JSON.stringify(values));
                        }

                        onClose();
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
                                <FormControl isInvalid={form.errors.title && form.touched.title} isRequired>
                                    <FormLabel htmlFor="title">Title</FormLabel>
                                    <Input {...field} id="title" placeholder="title" />
                                    <FormErrorMessage>{form.errors.title}</FormErrorMessage>
                                </FormControl>
                            )}
                        </Field>
                        <Field name="excerpt">
                            {({ field, form }) => (
                                <FormControl isInvalid={form.errors.excerpt && form.touched.excerpt} isRequired>
                                    <FormLabel htmlFor="excerpt">Excerpt</FormLabel>
                                    <Input {...field} id="excerpt" placeholder="excerpt" />
                                    <FormErrorMessage>{form.errors.excerpt}</FormErrorMessage>
                                </FormControl>
                            )}
                        </Field>
                        <Button
                            mt={4}
                            colorScheme="blue"
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
                            {Form_Update(data, onClose)}
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
                            {Form_Delete(data, onClose)}
                        </ModalBody>

                        <ModalFooter>
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
                            {Form_Add(onClose)}
                        </ModalBody>

                        <ModalFooter>
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
                        <Th>Excerpt</Th>
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
