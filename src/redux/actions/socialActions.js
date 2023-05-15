export const getSocialData = () => (dispatch) => {
	dispatch({ type: "GET_SOCIAL_DATA" });
};

export const createPost = (newPostData, history) => (dispatch) => {
	dispatch({ type: "CREATE_SOCIAL_POST", payload: { newPostData, history } });
};

export const getSocialPost = (postId) => (dispatch) => {
	dispatch({ type: "GET_SOCIAL_POST", payload: { postId } });
};

export const createReply = (postId, newReplyData) => (dispatch) => {
	dispatch({ type: "CREATE_SOCIAL_REPLY", payload: { postId, newReplyData } });
};

export const createReplyReply = (postId, replyId, newReplyData) => (dispatch) => {
	dispatch({ type: "CREATE_SOCIAL_REPLYREPLY", payload: { postId, replyId, newReplyData } });
};

export const createReplyReply2 = (postId, replyId, replyId2, newReplyData) => (dispatch) => {
	dispatch({ type: "CREATE_SOCIAL_REPLYREPLY2", payload: { postId, replyId, replyId2, newReplyData } });
};

export const deleteSocialPost = (postId) => (dispatch) => {
	dispatch({ type: "DELETE_SOCIAL_POST", payload: { postId } });
};

export const deleteSocialPostReply = (postId, replyId) => (dispatch) => {
	dispatch({ type: "DELETE_SOCIAL_POSTREPLY", payload: { postId, replyId } });
};

export const deleteSocialPostReplyReply = (postId, replyId, replyReplyId) => (dispatch) => {
	dispatch({ type: "DELETE_SOCIAL_POSTREPLYREPLY", payload: { postId, replyId, replyReplyId } });
};

export const editSocialPost = (postId, newPostData) => (dispatch) => {
	dispatch({ type: "EDIT_SOCIAL_POST", payload: { postId, newPostData } });
};

export const editSocialPostReply = (postId, replyId, newPostReplyData) => (dispatch) => {
	dispatch({ type: "EDIT_SOCIAL_POSTREPLY", payload: { postId, replyId, newPostReplyData } });
};

export const editSocialPostReplyReply = (postId, replyId, replyReplyId, newPostReplyData) => (dispatch) => {
	dispatch({ type: "EDIT_SOCIAL_POSTREPLYREPLY", payload: { postId, replyId, replyReplyId, newPostReplyData } });
};

export const likeSocialPost = (postId) => (dispatch) => {
	dispatch({ type: "LIKE_SOCIAL_POST", payload: { postId } });
};
