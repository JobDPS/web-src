import * as types from "../types";
import axios from "axios";

export const getDiscussData = () => (dispatch) => {
	dispatch({ type: "GET_DISCUSS_DATA" });
};

