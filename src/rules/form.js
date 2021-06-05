export const REQUIRED = 'required';

// input types
export const EMAIL = 'email';
export const TEXT = 'text';
export const NUMBER = 'number';
export const PHONE = 'phone';
export const PASSWORD = 'password';
export const TEXTAREA = 'textarea';

export const inputPROPS = (type, props = {}) => {
	if (type === EMAIL) {
		props['keyboardType'] = 'email-address';
		props['autoCapitalize'] = 'none';
	} else if (type === PHONE) {
		props['keyboardType'] = 'phone-pad';
	} else if (type === PASSWORD) {
		props['secureTextEntry'] = true;
	} else if (type === TEXTAREA) {
		props['multiline'] = true;
		props['numberOfLines'] = props['numberOfLines'] || 3;
	}

	return props;
};
