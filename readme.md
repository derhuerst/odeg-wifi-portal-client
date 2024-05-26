# odeg-wifi-portal-client

**A client for the [WiFi passenger information portal](https://www.netmodule.com/uploads/files/news/success-stories/unwired-odeg/success_story_unwired-odeg_EN.pdf) in German [ODEG](https://en.wikipedia.org/wiki/Ostdeutsche_Eisenbahn) trains.**

[![npm version](https://img.shields.io/npm/v/odeg-wifi-portal-client.svg)](https://www.npmjs.com/package/odeg-wifi-portal-client)
![ISC-licensed](https://img.shields.io/github/license/derhuerst/odeg-wifi-portal-client.svg)
![minimum Node.js version](https://img.shields.io/node/v/odeg-wifi-portal-client.svg)
[![support me via GitHub Sponsors](https://img.shields.io/badge/support%20me-donate-fa7664.svg)](https://github.com/sponsors/derhuerst)
[![chat with me on Twitter](https://img.shields.io/badge/chat%20with%20me-on%20Twitter-1da1f2.svg)](https://twitter.com/derhuerst)


## Installation

```shell
npm install odeg-wifi-portal-client
```


## Usage

```js
// todo
```


## API

### `fetchTripStatus()`

```js
import {fetchTripStatus} from 'odeg-wifi-portal-client'

await fetchTripStatus()
```

```js
{
	id: '62026',
	lineName: 'RE8',
	stopovers: [
		{
			stop: {
				id: 'WWI',
				ds100Id: 'WWI',
				name: 'Wismar',
			},
			arrival: null,
			plannedArrival: null,
			arrivalDelay: null,
			departure: '2024-05-25T15:24:00+02:00',
			plannedDeparture: '2024-05-25T15:24:00+02:00',
			departureDelay: 0,
			tracks: [],
			connections: [],
		},
		// …
		{
			stop: {
				id: 'BZOO',
				ds100Id: 'BZOO',
				name: 'Berlin Zoologischer Garten',
			},
			arrival: '2024-05-25T18:32:00+02:00',
			plannedArrival: '2024-05-25T18:32:00+02:00',
			arrivalDelay: 0,
			departure: '2024-05-25T18:33:00+02:00',
			plannedDeparture: '2024-05-25T18:33:00+02:00',
			departureDelay: 0,
			tracks: [],
			connections: [{
				id: '49',
				destination: 'Charlottenburg, Hertzallee',
				departurePlanned: '2024-05-25T17:50:00+02:00',
				departureDelay: 59,
				platformDeparture: '',
			}, {
				id: '34',
				destination: 'Charlottenburg, Hertzallee',
				departurePlanned: '2024-05-25T17:50:00+02:00',
				departureDelay: 48,
				platformDeparture: '',
			}],
		},
		// …
		{
			stop: {
				id: 'BOKR',
				ds100Id: 'BOKR',
				name: 'Berlin Ostkreuz Gl.1+2',
			},
			cancelled: true,
			arrival: null,
			plannedArrival: '2024-05-25T18:55:00+02:00',
			prognosedArrival: '2024-05-25T18:55:00+02:00',
			arrivalDelay: 0,
			departure: null,
			plannedDeparture: '2024-05-25T18:57:00+02:00',
			prognosedDeparture: '2024-05-25T18:57:00+02:00',
			departureDelay: 0,
			tracks: [],
			connections: [],
		},
		// …
	],
}
```


## Contributing

If you have a question or need support using `odeg-wifi-portal-client`, please double-check your code and setup first. If you think you have found a bug or want to propose a feature, use [the issues page](https://github.com/derhuerst/odeg-wifi-portal-client/issues).
