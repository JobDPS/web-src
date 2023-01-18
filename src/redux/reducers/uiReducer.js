import * as types from "../types";

const initialState = {
	loading: false,
	errors: null,
	closeForm: false
};

function reducer (state = initialState, action) {
	switch (action.type) {
		case types.SET_ERRORS:
			return {
				...state,
				loading: false,
				errors: action.payload,
				closeForm: false
			};
		case types.CLEAR_ERRORS:
			return {
				...state,
				loading: false,
				errors: null
			};
		case types.LOADING_UI:
			return {
				...state,
				loading: true,
				closeForm: false
			};
		case types.STOP_LOADING_UI:
			return {
				...state,
				loading: false
			};
		case types.CLOSE_FORM:
			return {
				...state,
				closeForm: true
			}
		case types.OPEN_FORM:
			return {
				...state,
				closeForm: false
			}
		default:
			return state;
	}
}

export default reducer;
