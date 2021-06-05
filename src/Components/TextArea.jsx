import React, { useContext } from 'react';
import { FormContext } from '../context/FormContext';
import { TextInput } from 'react-native';

export default ({ name, numberOfLines = 10, ...props }) => {
    const handleOnChange = (value) => {
        update(name, value);
    };

    const { getValue, update, getError } = useContext(FormContext);
    const _errorMessage = getError({ name });

    return (
        <TextInput
            value={getValue(name, value)}
            type="textarea"
            bordered
            multiline={true}
            numberOfLines={numberOfLines}
            onChange={handleOnChange}
            errorMessage={_errorMessage}
            {...props}
        />
    );
};
