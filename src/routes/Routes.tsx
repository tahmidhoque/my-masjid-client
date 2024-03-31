import { Navigate, Route, Routes as Switch } from "react-router-dom";
import { PageWrapper } from "../components/PageWrapper";
import Login from "../pages/Login";
import Main from "../pages/Main";
import { useAppState } from "../providers/state";
import CountdownPage from "../pages/CountdownPage";
import Jamaat from "../pages/Jamaat";
import Adhaan from "../pages/Adhaan";
import Pair from "../pages/Pair";

function ProtectedRoute({ children }: { children: JSX.Element }) {
	const { state } = useAppState();

	if (!state.isUserLoggedIn) {
		return <Navigate to="/login" />;
	}
	return children;
}

export default function Routes() {
	const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

	return (
		<PageWrapper>
			<Switch>
				<Route path="/" element={<Main />} />
				<Route path="/pair" element={<Pair />} />
				<Route
					path="/login"
					element={
						isLoggedIn ? <Navigate replace to={"/settings"} /> : <Login />
					}
				/>
				<Route
					path="/adhaan-countdown"
					element={<CountdownPage title={"Adhaan"} />}
				/>
				<Route path="/adhaan" element={<Adhaan />} />
				<Route path="/jamaat" element={<Jamaat />} />
				<Route
					path="jamaat-countdown"
					element={<CountdownPage title="Jamaa'at" />}
				/>
			</Switch>
		</PageWrapper>
	);
}
