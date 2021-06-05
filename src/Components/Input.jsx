import React, { useContext, useEffect } from 'react';
import { Input } from 'react-native-elements';
import { REQUIRED, EMAIL, inputPROPS } from '../rules/form';
import { FormContext } from '../context/FormContext';

export default React.forwardRef((
	{
		label,
		onChange,
		value,
		errorMessage = '',
		secureTextEntry = false,
		addShadow = false,
		addBackground = true,
		bordered = true,
		inputNext = false,
		type = 'text',
		numberOfLines = 5,
		name = false,
		required = false,
		...props
	}, ref) => {

	inputPROPS(type, props);

	const {
		getValue,
		update,
		getError,
		addValidation,
		removeValidation,
	} = useContext(FormContext);
	const _errorMessage = getError({ name }, errorMessage);

	useEffect(() => {
		if (required) {
			addValidation(name, REQUIRED);
		}
	}, [required]);

	// if type changes make sure to track any rule changes.
	useEffect(() => {
		if (type === EMAIL) {
			addValidation(name, EMAIL);
		} else {
			removeValidation(name, EMAIL);
		}
	}, [type]);

	const handleOnChange = (value) => {
		onChange && onChange(value);

		if (name) {
			update(name, value);
		}
	};

	if (inputNext && props.onSubmitEditing) {
		props['returnKeyType'] = 'next';
	}

	return (
		<Input
			labelStyle={{ fontWeight: 'bold' }}
			ref={ref}
			data-testid="input"
			onChangeText={handleOnChange}
			value={getValue(name, value)}
			label={label}
			secureTextEntry={secureTextEntry}
			errorMessage={_errorMessage}
			underlineColorAndroid="transparent"
			{...props}
		/>
	);
});
