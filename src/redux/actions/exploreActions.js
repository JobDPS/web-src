export const getUserData = () => (dispatch) => {
	dispatch({ type: "EXPLORE_GET_USER_DATA" });
};

export const getDiscussData = () => (dispatch) => {
	dispatch({ type: "EXPLORE_GET_DISCUSS_DATA" });
};

export const getSocialData = () => (dispatch) => {
	dispatch({ type: "EXPLORE_GET_SOCIAL_DATA" });
};

export const getCompanyData = () => (dispatch) => {
	dispatch({ type: "EXPLORE_GET_COMPANY_DATA" });
};
