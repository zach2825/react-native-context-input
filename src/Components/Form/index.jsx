import React from 'react';
import FormProvider from '../../context/FormContext';
import FormErrors from '../FormErrors';
import { View } from 'react-native';

const Form = ({
    onSubmit,
    validation = {},
    defaultData = {},
    children,
    ...props
}) => {
    return (
        <FormProvider onSubmit={onSubmit} validation={validation}
                      defaultData={defaultData}>
            <View {...props}>
                <FormErrors />
                {children}
            </View>
        </FormProvider>
    );
};

export default Form;
