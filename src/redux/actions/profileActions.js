export const getProfileData = (userId) => (dispatch) => {
	dispatch({ type: "PROFILE_GET_PROFILE_DATA", payload: { userId } });
};

export const getDiscussData = (userId) => (dispatch) => {
	dispatch({ type: "PROFILE_GET_DISCUSS_DATA", payload: { userId } });
};

export const getProfileSocialData = (userId) => (dispatch) => {
	dispatch({ type: "PROFILE_GET_SOCIAL_DATA", payload: { userId } });
};

export const getCompanyData = (userId) => (dispatch) => {
	dispatch({ type: "PROFILE_GET_COMPANY_DATA", payload: { userId } });
};

export const getFollowingData = (userId) => (dispatch) => {
	dispatch({ type: "PROFILE_GET_FOLLOWING_DATA", payload: { userId } });
};

export const getFollowersData = (userId) => (dispatch) => {
	dispatch({ type: "PROFILE_GET_FOLLOWERS_DATA", payload: { userId } });
};