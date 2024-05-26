import {DateTime} from 'luxon'

const TZ = process.env.TZ || 'Europe/Berlin'
const LOCALE = process.env.LOCALE || 'de-DE'

// We mimick https://github.com/public-transport/hafas-client/blob/6e74b9ab609afbf8bfee45ee95ca00f441d47f1e/parse/when.js here.
const parseWhen = (field, obj) => {
	const plannedFieldSource = field + 'Planned'
	const plannedFieldTarget = 'planned' + field.slice(0, 1).toUpperCase() + field.slice(1)
	const prognosedField = 'prognosed' + field.slice(0, 1).toUpperCase() + field.slice(1)
	const delayField = field + 'Delay'

	// we're assuming ISO 8601 strings here
	let when = obj[plannedFieldSource] || null
	let plannedWhen = obj[plannedFieldSource] || null
	let delay = null
	if (Number.isFinite(obj[delayField])) {
		delay = obj[delayField] * 60 // convert to seconds
		when = DateTime
		.fromISO(plannedWhen, {zone: TZ, locale: LOCALE})
		.plus({seconds: delay})
		.toISO({suppressMilliseconds: true})
	}

	const res = {
		[field]: when,
		[plannedFieldTarget]: plannedWhen,
		[delayField]: delay,
	}

	if (obj.cancelled === true) {
		res.cancelled = true
		res[prognosedField] = res[field]
		res[field] = null
	}

	return res
}
const parseArrival = obj => parseWhen('arrival', obj)
const parseDeparture = obj => parseWhen('departure', obj)

const parseTrip = (_) => {
	return {
		id: _.id,
		lineName: _.line,
		stopovers: _.stops.map((st) => ({
			stop: {
				id: st.id,
				ds100Id: st.ds100,
				name: st.name,
			},
			...parseArrival(st),
			...parseDeparture(st),
			// todo: why is st.track an array? 🤔
			tracks: st.track,
			// note: st.connections is mostly useless:
			// {
			// 	"id": "BZOO",
			// 	"ds100": "BZOO",
			// 	"name": "Berlin Zoologischer Garten",
			// 	"arrivalDelay": 0,
			// 	"departureDelay": 0,
			// 	"cancelled": false,
			// 	"track": [],
			// 	"connections": [
			// 		{
			// 			"id": "49",
			// 			"destination": "Charlottenburg, Hertzallee",
			// 			"departurePlanned": "2024-05-25T17:50:00+02:00",
			// 			"departureDelay": 59,
			// 			"platformDeparture": ""
			// 		},
			// 		{
			// 			"id": "34",
			// 			"destination": "Charlottenburg, Hertzallee",
			// 			"departurePlanned": "2024-05-25T17:50:00+02:00",
			// 			"departureDelay": 48,
			// 			"platformDeparture": ""
			// 		}
			// 	],
			// 	"arrivalPlanned": "2024-05-25T18:32:00+02:00",
			// 	"departurePlanned": "2024-05-25T18:33:00+02:00"
			// },
			connections: st.connections,
		})),
	}
}

export {
	parseWhen,
	parseArrival, parseDeparture,
	parseTrip,
}
