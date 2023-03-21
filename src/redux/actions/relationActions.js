export const getRelationData = () => (dispatch) => {
	dispatch({ type: "GET_RELATION_DATA" });
};

export const editRelation = (relationId, newPostData) => (dispatch) => {
	dispatch({ type: "EDIT_RELATION", payload: { relationId, newPostData } });
};

export const editRelationDate = (relationId, newPostData) => (dispatch) => {
	dispatch({ type: "EDIT_RELATION_DATE", payload: { relationId, newPostData } });
};
