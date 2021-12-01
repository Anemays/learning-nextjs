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
import React from 'react';

export const getServerSideProps = getSSP();

const IProps = {
    acceptedFileTypes: null,
    allowMultipleFiles: null,
    label: 'Upload',
    onChange: null,
    uploadFileName: null,
}

export default function UiFileInputButton () {
    const props = IProps;
    const fileInputRef = null;
    const formRef = null;

    const onClickHandler = () => {
        fileInputRef.current?.click();
    };

    const onChangeHandler = (event) => {
        if (!event.target.files?.length) {
            return;
        }

        const formData = new FormData();

        Array.from(event.target.files).forEach((file) => {
            formData.append(event.target.name, file);
        });

        props.onChange(formData);

        formRef.current?.reset();
    };

    return (
        <form ref={formRef}>
            <button type="button" onClick={onClickHandler}>
                {props.label}
            </button>
            <input
                accept={props.acceptedFileTypes}
                multiple={props.allowMultipleFiles}
                name={props.uploadFileName}
                onChange={onChangeHandler}
                ref={fileInputRef}
                style={{ display: 'none' }}
                type="file"
            />
        </form>
    );
};

UiFileInputButton.defaultProps = {
    acceptedFileTypes: '',
    allowMultipleFiles: false,
};