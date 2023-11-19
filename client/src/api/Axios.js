import axios from 'axios';

const baseURL = "http://localhost:8081/ap/api";

export default axios.create({
	baseURL: baseURL
});

const checkStatus = response => {
	if (response.ok) {
		return response;
	}
	// convert non-2xx HTTP responses into errors:
	const error = new Error(response.statusText);
	error.response = response;
	return Promise.reject(error);
}

export const getAllApps = () =>
	fetch(baseURL + "/app/list", {
		headers: {"Content-Type": "application/json"},
		method: "GET"
	}).then(checkStatus);


// export const getAllApps = () => {
// 	axios.get("/app/list")
// 		.then(json => setAllApps(json.data.allApps));
// }

// axios.get(url
// 	// 	// , {
// 	// 	// params: {
// 	// 	// 	ID: 12345
// 	// 	// }
// 	// // }
// )
// 	.then(function (response) {
// 		setAllApps(response.data);
// 		// return response;
// 	})
// 	.catch(function (error) {
// 		console.log(error);
// 	})
// 	.finally(function () {
// 		// always executed
// 	});