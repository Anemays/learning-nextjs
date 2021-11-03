import {
    FormControl,
    FormLabel,
    FormErrorMessage,
    Input,
    Button
} from "@chakra-ui/react"
import { Formik, Field, Form } from 'formik';

function FormikExample() {
    function validateName(value) {
        let error
        if (!value) {
            error = "Name is required"
        } else if (value.toLowerCase() !== "naruto") {
            error = "Jeez! You're not a fan 😱"
        }
        return error
    }

    return (
        <Formik
            initialValues={{ name: "Sasuke" }}
            onSubmit={(values, actions) => {
                setTimeout(async () => {
                    alert(values.name)

                    actions.setSubmitting(false)
                }, 0)
            }}
        >
            {(props) => (
                <Form>
                    <Field name="name" validate={validateName}>
                        {({ field, form }) => (
                            <FormControl isInvalid={form.errors.name && form.touched.name}>
                                <FormLabel htmlFor="name">First name</FormLabel>
                                <Input {...field} id="name" placeholder="name" />
                                <FormErrorMessage>{form.errors.name}</FormErrorMessage>
                            </FormControl>
                        )}
                    </Field>
                    <Button
                        mt={4}
                        colorScheme="teal"
                        isLoading={props.isSubmitting}
                        type="submit"
                    >
                        Submit
                    </Button>
                </Form>
            )}
        </Formik>
    )
}

export default FormikExample;
