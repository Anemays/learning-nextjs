import { getSSP } from '../../lib/props/serverSide';
import {
    Button,
    FormControl,
    FormLabel,
    Input,
    FormErrorMessage
} from '@chakra-ui/react';
import {
    useState,
    useReducer,
    useEffect
} from 'react';
import { Formik, Form, Field } from 'formik';
import axios from 'axios';

export const getServerSideProps = getSSP();

export default function Main() {

    return (
        <Formik
            initialValues={{ name: 'Sasuke' }}
            onSubmit={(values, actions) => {
                const { file } = values;
                setTimeout(async () => {
                    /*const config = {
                        //headers: { 'content-type': 'multipart/form-data' },
                        onUploadProgress: (event) => {
                            console.log(`Current progress:`, Math.round((event.loaded * 100) / event.total));
                        },
                    };
                    //alert(JSON.stringify(values, null, 2))
                    //alert(file)

                    await axios.post('/api/multer/test', file, config)
                        .then(function (response) {
                            console.log(response);
                        })
                        .catch(function (error) {
                            console.log(error);
                        });*/
                    actions.setSubmitting(false);
                    const response = await fetch('/api/multer/test', {
                        method: 'POST',
                        body: file
                    })
                }, 1000)
            }}
        >
            {(props) => (
                <Form>
                    <Field name='name'>
                        {({ field, form }) => (
                            <FormControl isInvalid={form.errors.name && form.touched.name}>
                                <FormLabel htmlFor='name'>First name</FormLabel>
                                <Input {...field} id='name' placeholder='name' />
                                <FormErrorMessage>{form.errors.name}</FormErrorMessage>
                            </FormControl>
                        )}
                    </Field>
                    <Field name='file'>
                        {({ field, form }) => (
                            <FormControl isInvalid={form.errors.name && form.touched.name}>
                                <FormLabel htmlFor='name'>File</FormLabel>
                                <Input {...field} type='file' />
                                <FormErrorMessage>{form.errors.name}</FormErrorMessage>
                            </FormControl>
                        )}
                    </Field>
                    <Button
                        mt={4}
                        colorScheme='teal'
                        isLoading={props.isSubmitting}
                        type='submit'
                    >
                        Submit
                    </Button>
                </Form>
            )}
        </Formik>
    )
}
