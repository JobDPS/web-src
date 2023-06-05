import * as types from "../types";

const initialState = {
	authenticated: false,
	loading: false
};

function reducer (state = initialState, action) {
	switch (action.type) {
		case types.SET_AUTHENTICATED:
			return {
				...state,
				authenticated: true
			};
		case types.SET_UNAUTHENTICATED:
			return initialState;
		case types.SET_USER:
			return {
				authenticated: true,
				loading: false,
				...action.payload
			};
		case types.LOADING_USER:
			return {
				...state,
				loading: true
			};
		default:
			return state;
	}
}

export default reducer;
