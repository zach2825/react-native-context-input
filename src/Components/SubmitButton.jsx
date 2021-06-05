import Button from './Button';
import { FormContext } from '../context/FormContext';
import { useContext } from 'react';

const SubmitButton = () => {
	const {
		onSubmit,
	} = useContext(FormContext);

	return <Button {...props} onPress={onSubmit} type="submit" />;
};
