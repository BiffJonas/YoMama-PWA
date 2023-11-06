const corsProxy = "https://cors-anywhere.herokuapp.com/";
const githubURL =
	"https://raw.githubusercontent.com/beanboi7/yomomma-apiv2/master/jokes.json";
const YoMamaJokeGenerator = async () => {
	const response = await fetch(`${corsProxy}${githubURL}`, {
		method: "GET",
		headers: { "Content-type": "application/json" },
	});
	const jokes = await response.json();
	randomNumber = Math.floor(Math.random() * jokes.length);
	randomJoke = jokes[randomNumber];
	return randomJoke;
};

const renderJoke = async () => {
	joke = await YoMamaJokeGenerator();
	document.getElementById("joke-p").textContent = joke;
};

//ServiceWorker

let registration = null;

function register_service__worker() {
	if ("serviceWorker" in navigator) {
		window.navigator.serviceWorker
			.register("./service-worker.js", { scope: "./" })
			.then((res) => {
				registration = res;
				console.log("Service worker successfully registerd");
			})
			.catch((err) => {
				console.log("Service worker not registerd");
			});
	}
}

function unregister_service__worker() {
	navigator.serviceWorker
		.getRegistrations()
		.then((registrations) => {
			registrations.forEach((registration) => {
				registration.unregister();
				console.log("Service worker unregistered");
			});
		})
		.catch((err) => {
			console.log("could not register service worker");
		});
}

register_service__worker();
