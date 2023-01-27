import { useNavigate } from "react-router-dom";

const withHistory = (Component) => {
	const Wrapper = (props) => {
		const history = { push: useNavigate() };
		return <Component {...props} history={history} />;
	};
	return Wrapper;
};

export default withHistory;
