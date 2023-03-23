import { call, put, takeEvery, takeLatest } from "redux-saga/effects";
import axios from "axios";

function* getCompanyData (action) {
	try {
		yield put({ type: "LOADING_COMPANIES" });
		const res = yield axios.post("/company", action.payload.page);
		yield put({ type: "SET_COMPANIES", payload: res.data });
	} catch (e) {
		yield put({ type: "COMPANIES_SET_ERROR", payload: e });
	}
}

function* relationSaga () {
	yield takeLatest("GET_COMPANY_DATA", getCompanyData);
}

export default relationSaga;