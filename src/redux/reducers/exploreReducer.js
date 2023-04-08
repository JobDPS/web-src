import * as types from "../types";

const initialState = {
    user: {
        loading: true
    },
	discuss: {
		loading: true
	},
	companies: {
		loading: true
	},
	social: {
		loading: true
	},
	errors: null
};

function reducer (state = initialState, action) {
	switch (action.type) {
		case types.EXPLORE_SET_USER:
			return {
				...state,
				user: {
					loading: false,
					...action.payload
				}
			};
		case types.EXPLORE_LOADING_USER:
			return {
				...state,
				user: {
					loading: true
				}
			};
		case types.EXPLORE_SET_DISCUSS:
			return {
				...state,
				discuss: {
					loading: false,
					...action.payload
				}
			};
		case types.EXPLORE_LOADING_DISCUSS:
			return {
				...state,
				discuss: {
					loading: true
				}
			};
		case types.EXPLORE_SET_COMPANIES:
			return {
				...state,
				companies: {
					loading: false,
					...action.payload
				}
			};
		case types.EXPLORE_LOADING_COMPANIES:
			return {
				...state,
				companies: {
					loading: true
				}
			};
		case types.EXPLORE_SET_SOCIAL:
			return {
				...state,
				social: {
					loading: false,
					...action.payload
				}
			};
		case types.EXPLORE_LOADING_SOCIAL:
			return {
				...state,
				social: {
					loading: true
				}
			};
		case types.EXPLORE_CLEAR_ERRORS:
			return {
				...state,
				loading: false,
				errors: null
			};
		case types.EXPLORE_SET_ERRORS:
			return {
				...state,
				loading: false,
				errors: action.payload
			};
		default:
			return state;
	}
}

export default reducer;
