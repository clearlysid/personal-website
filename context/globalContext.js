import React, { createContext, useReducer, useContext } from "react";

// define context
const GlobalStateContext = createContext();
const GlobalDispatchContext = createContext();

// reducer
const globalReducer = (state, action) => {
	switch(action.type) {
		case 'CURSOR_TYPE': {
			return {
				...state,
				cursorType: action.cursorType
			} 
		}
		default: {
			throw new Error(`Unhandled action type: ${action.type}`);
		}
	}
}

export const GlobalProvider = ({children}) => {
	const [state, dispatch] = useReducer(globalReducer, {
		cursorType: false,
	})

	return (
		<GlobalDispatchContext.Provider value={dispatch}>
			<GlobalStateContext.Provider value={state}>
				{children}
			</GlobalStateContext.Provider>
		</GlobalDispatchContext.Provider>
	)
}

export const useGlobalStateContext = () => useContext(GlobalStateContext);
export const useGlobalDispatchContext = () => useContext(GlobalDispatchContext);