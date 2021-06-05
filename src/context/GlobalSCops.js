import React, { createContext, useState } from 'react';

export const GlobalContext = createContext({});

export const GlobalContextProvider = ({ children }) => {
	const [scrollRef, setScrollRef] = useState(null);

	return (
		<GlobalContext.Provider
			value={{
				scrollRef,
				setScrollRef,
			}}
		>
			{children}
		</GlobalContext.Provider>
	);
};
