function getData() {
	
	//initialisatie van de API
	
	var url = "https://api.openweathermap.org/data/2.5/weather";
	var apiKey ="ec4d4e5f4d7f0abbe175e9edde69a791";
	var city = document.getElementById("stad").value;

	// Hier wordt het verzoek ingediend
	var request = url + "?" + "appid=" + apiKey + "&" + "q=" + city;

	// Haalt de weergegevens op
	fetch(request).then(function(response) {

		return response.json();

	})

	// Genereert weermelding
	.then(function(response) {

		onSuccess(response);

	})

	// Genereert foutmelding
	.catch(function (error) {

		onError(error);

	});
	
}

function onSuccess(response) {

	var wind = Math.round(response.wind.speed * 3.6); // Haalt de initiele waarden van de windsnelheid op
	var windmph = wind * 0.621371; // omrekenfactor van snelheid in kilometer per uur naar mijl per uur
	var celsius = Math.floor(response.main.temp - 273.15); // Converteert de initiele waarden in graden kelvin naar celsius
	var fahrenheit = celsius * 1.8000 + 32.00; // omrekenfactor van graden celsius naar fahrenheit

	var clouds = response.clouds.all;
	var location = response.name;

	var weatherDOM = document.getElementById('graden');
	var windDOM = document.getElementById('snelheid');
	var cloudsDOM = document.getElementById('wolken');
	var locationDOM = document.getElementById('naam');

	locationDOM.innerHTML = location;
	cloudsDOM.innerHTML = clouds + "&#37";
	weatherDOM.innerHTML = celsius + "&#176;C" + " / " + fahrenheit.toFixed(1) + "&#8457;"; // Geeft de temperatuur aan in geselecteerde locatie in celsius en fahrenheit. En rond deze af op 1 getal achter te komma
	windDOM.innerHTML = wind + " km/h" + " / " + (windmph.toFixed(1)) + "mp/h"; // Geeft de de snelheid aan in kilometer per uur en mijl per uur. En rond deze af op 1 getal achter de komma

		if (wind >= 40 || clouds >= 70) {

		document.getElementById("veiligheid").innerHTML = "Onveilig / Unsafe"; // Bij windsnelheden boven de 40km/h en bewolkingspercentage boven de 70% is het onveilig om te landen.
		document.getElementById("veiligheid").style.color = 'red';

		}

		else {

		document.getElementById("veiligheid").innerHTML = "Veilig / Safe"; // In alle andere gevallen buiten deze voorwaarden is het veilig om te landen.
		document.getElementById("veiligheid").style.color = 'green';

		}

}

function onError(error) {
	
	console.error('Fetch request failed / Kan zoekresultaat niet vinden', error); // Print een error in de console
	alert('Locatie niet gevonden. Controleer of u de locatie goed heeft gespeld en probeer het nogmaals.'); // Foutmelding alert bij invalide locatie

}

document.getElementById("zoeken").onsubmit = function(e){ // Dit activiteert de optie die zoekt naar de opgegeven stad bij klik op item met het id "Zoeken"

	e.preventDefault();
	getData();

};







