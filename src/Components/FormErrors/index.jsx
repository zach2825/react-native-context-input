import React, { useContext } from 'react';
import { Text } from 'react-native-elements';
import { FormContext } from '../../context/FormContext';

const FormErrors = ({}) => {
    const { hasErrors } = useContext(FormContext);

    return hasErrors ? (
        <Text style={{
            textAlign: 'center',
            color: 'red',
            fontSize: 20,
            fontWeight: 'bold',
        }}>
            Please fix the form errors
        </Text>
    ) : null;
};

export default FormErrors;
