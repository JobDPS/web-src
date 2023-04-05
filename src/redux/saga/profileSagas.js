import { call, put, takeEvery, takeLatest } from "redux-saga/effects";
import axios from "axios";

function* getProfileData (action) {
	try {
		yield put({ type: "PROFILE_LOADING_CREDENTIALS" });
		const res = yield axios.get(`/user/${action.payload.userId}`);
		yield put({ type: "PROFILE_SET_CREDENTIALS", payload: res.data });
	} catch (e) {
		yield put({ type: "PROFILE_SET_ERROR", payload: e });
	}
}

function* getDiscussData (action) {
	try {
		yield put({ type: "PROFILE_LOADING_DISCUSS" });
		const res = yield axios.get(`/user/${action.payload.userId}/discuss`);
		yield put({ type: "PROFILE_SET_DISCUSS", payload: res.data });
	} catch (e) {
		yield put({ type: "PROFILE_SET_ERROR", payload: e });
	}
}

function* getSocialData (action) {
	try {
		yield put({ type: "PROFILE_LOADING_SOCIAL" });
		const res = yield axios.get(`/user/${action.payload.userId}/social`);
		yield put({ type: "PROFILE_SET_SOCIAL", payload: res.data });
	} catch (e) {
		yield put({ type: "PROFILE_SET_ERROR", payload: e });
	}
}

function* getCompanyData (action) {
	try {
		yield put({ type: "PROFILE_LOADING_COMPANIES" });
		const res = yield axios.get(`/user/${action.payload.userId}/companies`);
		yield put({ type: "PROFILE_SET_COMPANIES", payload: res.data });
	} catch (e) {
		yield put({ type: "PROFILE_SET_ERROR", payload: e });
	}
}

function* getFollowingData (action) {
	try {
		yield put({ type: "PROFILE_LOADING_FOLLOWING" });
		const res = yield axios.get(`/user/${action.payload.userId}/following`);
		yield put({ type: "PROFILE_SET_FOLLOWING", payload: res.data });
	} catch (e) {
		yield put({ type: "PROFILE_SET_ERROR", payload: e });
	}
}

function* getFollowersData (action) {
	try {
		yield put({ type: "PROFILE_LOADING_FOLLOWERS" });
		const res = yield axios.get(`/user/${action.payload.userId}/followers`);
		yield put({ type: "PROFILE_SET_FOLLOWERS", payload: res.data });
	} catch (e) {
		yield put({ type: "PROFILE_SET_ERROR", payload: e });
	}
}

function* profileSaga () {
	yield takeLatest("PROFILE_GET_PROFILE_DATA", getProfileData);
	yield takeLatest("PROFILE_GET_DISCUSS_DATA", getDiscussData);
	yield takeLatest("PROFILE_GET_SOCIAL_DATA", getSocialData);
	yield takeLatest("PROFILE_GET_COMPANY_DATA", getCompanyData);
	yield takeLatest("PROFILE_GET_FOLLOWING_DATA", getFollowingData);
	yield takeLatest("PROFILE_GET_FOLLOWERS_DATA", getFollowersData);
}

export default profileSaga;