export const getCompanyData = (page) => (dispatch) => {
	dispatch({ type: "GET_COMPANY_DATA", payload: { page } });
};
