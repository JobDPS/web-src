export const getCompanyData = (pageData) => (dispatch) => {
	dispatch({ type: "GET_COMPANY_DATA", payload: { pageData } });
};

export const editUserStarredCompanies = (id, pageData) => (dispatch) => {
	dispatch({ type: "EDIT_USER_COMPANY_STARRED", payload: { id, pageData } });
};

export const searchCompanies = (query) => (dispatch) => {
	dispatch({ type: "SEARCH_COMPANY", payload: { query } });
};
