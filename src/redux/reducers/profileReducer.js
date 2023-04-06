import * as types from "../types";

const initialState = {
	credentials: {
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
	following: {
		loading: true
	},
	followers: {
		loading: true
	},
	errors: null
};

function reducer (state = initialState, action) {
	switch (action.type) {
		case types.PROFILE_SET_CREDENTIALS:
			return {
				...state,
				credentials: {
					loading: false,
					...action.payload
				}
			};
		case types.PROFILE_LOADING_CREDENTIALS:
			return {
				...state,
				credentials: {
					loading: true
				}
			};
		case types.PROFILE_SET_DISCUSS:
			return {
				...state,
				discuss: {
					loading: false,
					...action.payload
				}
			};
		case types.PROFILE_LOADING_DISCUSS:
			return {
				...state,
				discuss: {
					loading: true
				}
			};
		case types.PROFILE_SET_COMPANIES:
			return {
				...state,
				companies: {
					loading: false,
					...action.payload
				}
			};
		case types.PROFILE_LOADING_COMPANIES:
			return {
				...state,
				companies: {
					loading: true
				}
			};
		case types.PROFILE_SET_SOCIAL:
			return {
				...state,
				social: {
					loading: false,
					...action.payload
				}
			};
		case types.PROFILE_LOADING_SOCIAL:
			return {
				...state,
				social: {
					loading: true
				}
			};
		case types.PROFILE_SET_FOLLOWING:
			return {
				...state,
				following: {
					loading: false,
					...action.payload
				}
			};
		case types.PROFILE_LOADING_FOLLOWING:
			return {
				...state,
				following: {
					loading: true
				}
			};
		case types.PROFILE_SET_FOLLOWERS:
			return {
				...state,
				followers: {
					loading: false,
					...action.payload
				}
			};
		case types.PROFILE_LOADING_FOLLOWERS:
			return {
				...state,
				followers: {
					loading: true
				}
			};
		case types.PROFILE_CLEAR_ERRORS:
			return {
				...state,
				loading: false,
				errors: null
			};
		case types.PROFILE_SET_ERRORS:
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
