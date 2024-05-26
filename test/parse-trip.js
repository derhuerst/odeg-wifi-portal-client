import test from 'node:test'
import {ok, deepStrictEqual} from 'node:assert'
import {
	parseArrival, parseDeparture,
	parseTrip,
} from '../lib/parse.js'

// As extracted manually from the portal, but deleted stopovers between Sülstorf & Berlin-Spandau.
const course0 = {
	"id": "62026",
	"line": "RE8",
	"origin": "Wismar",
	"destination": "Flughafen BER",
	"stops": [
		{
			"id": "WWI",
			"ds100": "WWI",
			"name": "Wismar",
			"departureDelay": 0,
			"cancelled": false,
			"track": [],
			"connections": [],
			"departurePlanned": "2024-05-25T15:24:00+02:00"
		},
		{
			"id": "WMK",
			"ds100": "WMK",
			"name": "Dorf Mecklenburg",
			"arrivalDelay": 0,
			"departureDelay": 0,
			"cancelled": false,
			"track": [],
			"connections": [],
			"arrivalPlanned": "2024-05-25T15:29:00+02:00",
			"departurePlanned": "2024-05-25T15:30:00+02:00"
		},
		{
			"id": "WMOI",
			"ds100": "WMOI",
			"name": "Moidentin",
			"arrivalDelay": 0,
			"departureDelay": 0,
			"cancelled": false,
			"track": [],
			"connections": [],
			"arrivalPlanned": "2024-05-25T15:34:00+02:00",
			"departurePlanned": "2024-05-25T15:34:00+02:00"
		},
		{
			"id": "WK",
			"ds100": "WK",
			"name": "Bad Kleinen",
			"arrivalDelay": 0,
			"departureDelay": 0,
			"cancelled": false,
			"track": [],
			"connections": [],
			"arrivalPlanned": "2024-05-25T15:38:00+02:00",
			"departurePlanned": "2024-05-25T15:39:00+02:00"
		},
		{
			"id": "WLST",
			"ds100": "WLST",
			"name": "Lübstorf",
			"arrivalDelay": 0,
			"departureDelay": 0,
			"cancelled": false,
			"track": [],
			"connections": [],
			"arrivalPlanned": "2024-05-25T15:44:00+02:00",
			"departurePlanned": "2024-05-25T15:44:00+02:00"
		},
		{
			"id": "WS",
			"ds100": "WS",
			"name": "Schwerin Hbf",
			"arrivalDelay": 0,
			"departureDelay": 0,
			"cancelled": false,
			"track": [],
			"connections": [],
			"arrivalPlanned": "2024-05-25T15:51:00+02:00",
			"departurePlanned": "2024-05-25T16:00:00+02:00"
		},
		{
			"id": "WSMI",
			"ds100": "WSMI",
			"name": "Schwerin Mitte",
			"arrivalDelay": 1,
			"departureDelay": 1,
			"cancelled": false,
			"track": [],
			"connections": [],
			"arrivalPlanned": "2024-05-25T16:01:00+02:00",
			"departurePlanned": "2024-05-25T16:02:00+02:00"
		},
		{
			"id": "WSS",
			"ds100": "WSS",
			"name": "Schwerin Süd",
			"arrivalDelay": 4,
			"departureDelay": 4,
			"cancelled": false,
			"track": [],
			"connections": [],
			"arrivalPlanned": "2024-05-25T16:07:00+02:00",
			"departurePlanned": "2024-05-25T16:07:00+02:00"
		},
		{
			"id": "WHO",
			"ds100": "WHO",
			"name": "Holthusen",
			"arrivalDelay": 5,
			"departureDelay": 4,
			"cancelled": false,
			"track": [],
			"connections": [],
			"arrivalPlanned": "2024-05-25T16:10:00+02:00",
			"departurePlanned": "2024-05-25T16:10:00+02:00"
		},
		{
			"id": "WNS",
			"ds100": "WNS",
			"name": "Neustadt(Dosse)",
			"arrivalDelay": 4,
			"departureDelay": 4,
			"cancelled": false,
			"track": [],
			"connections": [],
			"arrivalPlanned": "2024-05-25T17:34:00+02:00",
			"departurePlanned": "2024-05-25T17:35:00+02:00"
		},
		{
			"id": "BZOO",
			"ds100": "BZOO",
			"name": "Berlin Zoologischer Garten",
			"arrivalDelay": 0,
			"departureDelay": 0,
			"cancelled": false,
			"track": [],
			"connections": [
				{
					"id": "49",
					"destination": "Charlottenburg, Hertzallee",
					"departurePlanned": "2024-05-25T17:50:00+02:00",
					"departureDelay": 59,
					"platformDeparture": ""
				},
				{
					"id": "34",
					"destination": "Charlottenburg, Hertzallee",
					"departurePlanned": "2024-05-25T17:50:00+02:00",
					"departureDelay": 48,
					"platformDeparture": ""
				}
			],
			"arrivalPlanned": "2024-05-25T18:32:00+02:00",
			"departurePlanned": "2024-05-25T18:33:00+02:00"
		},
		{
			"id": "BLS",
			"ds100": "BLS",
			"name": "Berlin Hauptbahnhof (Stadtb)",
			"arrivalDelay": 0,
			"departureDelay": 0,
			"cancelled": false,
			"track": [],
			"connections": [],
			"arrivalPlanned": "2024-05-25T18:38:00+02:00",
			"departurePlanned": "2024-05-25T18:40:00+02:00"
		},
		{
			"id": "BFRI",
			"ds100": "BFRI",
			"name": "Berlin Friedrichstraße",
			"arrivalDelay": 0,
			"departureDelay": 0,
			"cancelled": false,
			"track": [],
			"connections": [],
			"arrivalPlanned": "2024-05-25T18:43:00+02:00",
			"departurePlanned": "2024-05-25T18:44:00+02:00"
		},
		{
			"id": "BALE",
			"ds100": "BALE",
			"name": "Alexanderplatz",
			"arrivalDelay": 0,
			"departureDelay": 0,
			"cancelled": false,
			"track": [],
			"connections": [],
			"arrivalPlanned": "2024-05-25T18:47:00+02:00",
			"departurePlanned": "2024-05-25T18:48:00+02:00"
		},
		{
			"id": "BHF",
			"ds100": "BHF",
			"name": "Berlin Ostbahnhof",
			"arrivalDelay": 0,
			"departureDelay": 0,
			"cancelled": false,
			"track": [],
			"connections": [],
			"arrivalPlanned": "2024-05-25T18:52:00+02:00",
			"departurePlanned": "2024-05-25T18:53:00+02:00"
		},
		{
			"id": "BOKR",
			"ds100": "BOKR",
			"name": "Berlin Ostkreuz Gl.1+2",
			"arrivalDelay": 0,
			"departureDelay": 0,
			"cancelled": true,
			"track": [],
			"connections": [],
			"arrivalPlanned": "2024-05-25T18:55:00+02:00",
			"departurePlanned": "2024-05-25T18:57:00+02:00"
		},
		{
			"id": "BFBI",
			"ds100": "BFBI",
			"name": "Flughafen BER",
			"arrivalDelay": 0,
			"cancelled": false,
			"track": [],
			"connections": [],
			"arrivalPlanned": "2024-05-25T19:15:00+02:00"
		}
	]
}

const trip0 = {
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
			tracks: course0.stops[0].track,
			connections: course0.stops[0].connections,
		},
		{
			stop: {
				id: 'WMK',
				ds100Id: 'WMK',
				name: 'Dorf Mecklenburg',
			},
			arrival: '2024-05-25T15:29:00+02:00',
			plannedArrival: '2024-05-25T15:29:00+02:00',
			arrivalDelay: 0,
			departure: '2024-05-25T15:30:00+02:00',
			plannedDeparture: '2024-05-25T15:30:00+02:00',
			departureDelay: 0,
			tracks: course0.stops[1].track,
			connections: course0.stops[1].connections,
		},
		{
			stop: {
				id: 'WMOI',
				ds100Id: 'WMOI',
				name: 'Moidentin',
			},
			arrival: '2024-05-25T15:34:00+02:00',
			plannedArrival: '2024-05-25T15:34:00+02:00',
			arrivalDelay: 0,
			departure: '2024-05-25T15:34:00+02:00',
			plannedDeparture: '2024-05-25T15:34:00+02:00',
			departureDelay: 0,
			tracks: course0.stops[2].track,
			connections: course0.stops[2].connections,
		},
		{
			stop: {
				id: 'WK',
				ds100Id: 'WK',
				name: 'Bad Kleinen',
			},
			arrival: '2024-05-25T15:38:00+02:00',
			plannedArrival: '2024-05-25T15:38:00+02:00',
			arrivalDelay: 0,
			departure: '2024-05-25T15:39:00+02:00',
			plannedDeparture: '2024-05-25T15:39:00+02:00',
			departureDelay: 0,
			tracks: course0.stops[3].track,
			connections: course0.stops[3].connections,
		},
		{
			stop: {
				id: 'WLST',
				ds100Id: 'WLST',
				name: 'Lübstorf',
			},
			arrival: '2024-05-25T15:44:00+02:00',
			plannedArrival: '2024-05-25T15:44:00+02:00',
			arrivalDelay: 0,
			departure: '2024-05-25T15:44:00+02:00',
			plannedDeparture: '2024-05-25T15:44:00+02:00',
			departureDelay: 0,
			tracks: course0.stops[4].track,
			connections: course0.stops[4].connections,
		},
		{
			stop: {
				id: 'WS',
				ds100Id: 'WS',
				name: 'Schwerin Hbf',
			},
			arrival: '2024-05-25T15:51:00+02:00',
			plannedArrival: '2024-05-25T15:51:00+02:00',
			arrivalDelay: 0,
			departure: '2024-05-25T16:00:00+02:00',
			plannedDeparture: '2024-05-25T16:00:00+02:00',
			departureDelay: 0,
			tracks: course0.stops[5].track,
			connections: course0.stops[5].connections,
		},
		{
			stop: {
				id: 'WSMI',
				ds100Id: 'WSMI',
				name: 'Schwerin Mitte',
			},
			arrival: '2024-05-25T16:02:00+02:00',
			plannedArrival: '2024-05-25T16:01:00+02:00',
			arrivalDelay: 60,
			departure: '2024-05-25T16:03:00+02:00',
			plannedDeparture: '2024-05-25T16:02:00+02:00',
			departureDelay: 60,
			tracks: course0.stops[6].track,
			connections: course0.stops[6].connections,
		},
		{
			stop: {
				id: 'WSS',
				ds100Id: 'WSS',
				name: 'Schwerin Süd',
			},
			arrival: '2024-05-25T16:11:00+02:00',
			plannedArrival: '2024-05-25T16:07:00+02:00',
			arrivalDelay: 240,
			departure: '2024-05-25T16:11:00+02:00',
			plannedDeparture: '2024-05-25T16:07:00+02:00',
			departureDelay: 240,
			tracks: course0.stops[7].track,
			connections: course0.stops[7].connections,
		},
		{
			stop: {
				id: 'WHO',
				ds100Id: 'WHO',
				name: 'Holthusen',
			},
			arrival: '2024-05-25T16:15:00+02:00',
			plannedArrival: '2024-05-25T16:10:00+02:00',
			arrivalDelay: 300,
			departure: '2024-05-25T16:14:00+02:00',
			plannedDeparture: '2024-05-25T16:10:00+02:00',
			departureDelay: 240,
			tracks: course0.stops[8].track,
			connections: course0.stops[8].connections,
		},
		{
			stop: {
				id: 'WNS',
				ds100Id: 'WNS',
				name: 'Neustadt(Dosse)',
			},
			arrival: '2024-05-25T17:38:00+02:00',
			plannedArrival: '2024-05-25T17:34:00+02:00',
			arrivalDelay: 240,
			departure: '2024-05-25T17:39:00+02:00',
			plannedDeparture: '2024-05-25T17:35:00+02:00',
			departureDelay: 240,
			tracks: course0.stops[9].track,
			connections: course0.stops[9].connections,
		},
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
			tracks: course0.stops[10].track,
			connections: course0.stops[10].connections,
		},
		{
			stop: {
				id: 'BLS',
				ds100Id: 'BLS',
				name: 'Berlin Hauptbahnhof (Stadtb)',
			},
			arrival: '2024-05-25T18:38:00+02:00',
			plannedArrival: '2024-05-25T18:38:00+02:00',
			arrivalDelay: 0,
			departure: '2024-05-25T18:40:00+02:00',
			plannedDeparture: '2024-05-25T18:40:00+02:00',
			departureDelay: 0,
			tracks: course0.stops[11].track,
			connections: course0.stops[11].connections,
		},
		{
			stop: {
				id: 'BFRI',
				ds100Id: 'BFRI',
				name: 'Berlin Friedrichstraße',
			},
			arrival: '2024-05-25T18:43:00+02:00',
			plannedArrival: '2024-05-25T18:43:00+02:00',
			arrivalDelay: 0,
			departure: '2024-05-25T18:44:00+02:00',
			plannedDeparture: '2024-05-25T18:44:00+02:00',
			departureDelay: 0,
			tracks: course0.stops[12].track,
			connections: course0.stops[12].connections,
		},
		{
			stop: {
				id: 'BALE',
				ds100Id: 'BALE',
				name: 'Alexanderplatz',
			},
			arrival: '2024-05-25T18:47:00+02:00',
			plannedArrival: '2024-05-25T18:47:00+02:00',
			arrivalDelay: 0,
			departure: '2024-05-25T18:48:00+02:00',
			plannedDeparture: '2024-05-25T18:48:00+02:00',
			departureDelay: 0,
			tracks: course0.stops[13].track,
			connections: course0.stops[13].connections,
		},
		{
			stop: {
				id: 'BHF',
				ds100Id: 'BHF',
				name: 'Berlin Ostbahnhof',
			},
			arrival: '2024-05-25T18:52:00+02:00',
			plannedArrival: '2024-05-25T18:52:00+02:00',
			arrivalDelay: 0,
			departure: '2024-05-25T18:53:00+02:00',
			plannedDeparture: '2024-05-25T18:53:00+02:00',
			departureDelay: 0,
			tracks: course0.stops[14].track,
			connections: course0.stops[14].connections,
		},
		{
			stop: {
				id: 'BOKR',
				ds100Id: 'BOKR',
				name: 'Berlin Ostkreuz Gl.1+2',
			},
			arrival: null,
			plannedArrival: '2024-05-25T18:55:00+02:00',
			arrivalDelay: 0,
			cancelled: true,
			prognosedArrival: '2024-05-25T18:55:00+02:00',
			departure: null,
			plannedDeparture: '2024-05-25T18:57:00+02:00',
			departureDelay: 0,
			prognosedDeparture: '2024-05-25T18:57:00+02:00',
			tracks: course0.stops[15].track,
			connections: course0.stops[15].connections,
		},
		{
			stop: {
				id: 'BFBI',
				ds100Id: 'BFBI',
				name: 'Flughafen BER',
			},
			arrival: '2024-05-25T19:15:00+02:00',
			plannedArrival: '2024-05-25T19:15:00+02:00',
			arrivalDelay: 0,
			departure: null,
			plannedDeparture: null,
			departureDelay: null,
			tracks: course0.stops[16].track,
			connections: course0.stops[16].connections,
		},
	],
}


test('parses a stopover\'s arrival & departure correctly', (t) => {
	const stopover0 = course0.stops.find(st => st.ds100 === 'WNS') // Neustadt(Dosse)
	ok(stopover0, 'precondition failed')

	{
		const arr0 = parseArrival(stopover0)
		deepStrictEqual(arr0, {
			arrival: '2024-05-25T17:38:00+02:00',
			plannedArrival: '2024-05-25T17:34:00+02:00',
			arrivalDelay: 4 * 60,
		})
	}
	{
		const dep0 = parseDeparture(stopover0)
		deepStrictEqual(dep0, {
			departure: '2024-05-25T17:39:00+02:00',
			plannedDeparture: '2024-05-25T17:35:00+02:00',
			departureDelay: 4 * 60,
		})
	}
})

test('handles a stopover\'s missing arrival data correctly', (t) => {
	const arr0 = parseArrival(course0.stops[0])
	deepStrictEqual(arr0, {
		arrival: null,
		plannedArrival: null,
		arrivalDelay: null,
	})
})

test('parses a full trip correctly', (t) => {
	const parsed = parseTrip(course0)
	deepStrictEqual(parsed, trip0)
})
