import React, {
    createContext,
    useContext,
    useEffect,
    useMemo,
    useState,
} from 'react';
import { GlobalContext } from './GlobalSCops';
import { REQUIRED, EMAIL } from '../rules/form';

export const FormContext = createContext({});

const FormProvider = ({
    children,
    onSubmit,
    validation = {},
    defaultData = {},
}) => {
    const [form, setForm] = useState(defaultData);
    const [errors, setErrors] = useState({});
    const [validated, setValidated] = useState(false);
    const [valid, setValid] = useState(false);
    const { scrollRef } = useContext(GlobalContext);
    const [validationRules, setValidationRules] = useState(validation);

    const hasErrors = useMemo(() => {
        return Object.keys(errors).length > 0;
    }, [errors]);

    useEffect(() => {
        setForm(defaultData);
    }, [defaultData]);

    useEffect(() => {
        setValidationRules(validation);
    }, [validation]);

    useEffect(() => {
        setValidated(false);

        return () => setValidated(false);
    }, []);

    const validateForm = () => {
        let errorTest = {};

        console.log({ validationRules });

        Object.keys(validationRules).forEach(fieldName => {
            let messages = [];

            const { rules = [] } = validationRules[fieldName];
            const { [fieldName]: value = false } = form;

            // run validations
            if (rules.includes(REQUIRED) && (!value || value.length == 0)) {
                messages.push('This field is required');
            } else if (rules.includes(EMAIL)) {
                const emailChecked = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
                    value);
                if (!emailChecked) { // email validation failed
                    messages.push('This field needs to be a valid email');
                }
            }

            if (messages.length > 0) {
                const message = messages.join('. Also, ');

                errorTest = ({ ...errorTest, [fieldName]: { message } });
            }
        });

        setErrors(errorTest);

        // validation fails
        return Object.keys(errorTest).length <= 0;
    };

    const getError = ({ name }, defaultValue = false) => {
        const { [name]: { message = defaultValue } = {} } = errors;
        return message;
    };

    const handleFormSubmit = () => {
        setValidated(true);

        const validCheck = validateForm();
        setValid(validCheck);

        if (validCheck) {
            onSubmit(form);
        } else {
            // scroll to top and show that there is an error
            scrollRef.scrollTo({ x: 0, y: 50, animated: true });
        }
    };

    const getValue = (key, defaultValue = '') => {
        const { [key]: value = defaultValue } = form;
        return value;
    };

    useEffect(() => {
        if (validated) {
            validateForm();
        }
    }, [form]);

    const update = (name, value) => {
        setForm({ ...form, [name]: value });
    };

    const clear = () => {
        setForm({});
        setValidated(false);
        setValid(false);
    };

    const addValidation = (name, rule) => {
        const { rules = [] } = validationRules[name] || {};
        const newRules = [...rules, rule];

        setValidationRules({ ...validationRules, [name]: { rules: newRules } });
    };

    return (
        <FormContext.Provider
            value={{
                // values
                form,
                errors,
                valid,
                hasErrors,

                // functions
                setForm,
                handleFormSubmit,
                onSubmit: handleFormSubmit,
                update,
                getValue,
                getError,
                clear,
                addValidation,
            }}
        >
            {children}
        </FormContext.Provider>
    );
};

export default FormProvider;
