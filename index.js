// todo: use import assertions once they're supported by Node.js & ESLint
// https://github.com/tc39/proposal-import-assertions
import {createRequire} from 'module'
const require = createRequire(import.meta.url)

import {parseTrip} from './lib/parse.js'
const pkg = require('./package.json')

const API_DOMAIN = 'wasabi.hotspot-local.unwired.at'
const API_URL = `https://${API_DOMAIN}/api/graphql`
const USER_AGENT = pkg.name

const addResponsePropsToError = (err, res) => {
	err.statusCode = res.status
	err.url = res.url
	Object.defineProperty(err, 'response', {value: res})
}

const requestViaGraphql = async (query, variables = {}, opt = {}) => {
	if ('string' !== typeof query) throw new Error('query must be a string')
	if (!variables) throw new Error('variables must be an object')

	const reqBody = JSON.stringify({
		// operationName: randomBytes(6).toString('hex'),
		query,
		variables,
	})

	const res = await fetch(API_URL, {
		mode: 'cors',
		method: 'POST',
		headers: {
			'User-Agent': USER_AGENT,
			'Content-Type': 'application/json',
			'Accept': 'application/json',
		},
		body: reqBody,
		timeout: 3000,
		...opt,
	})
	if (!res.ok) {
		const err = new Error(res.statusText)
		addResponsePropsToError(err, res)
		throw err
	}
	const resBody = await res.json()
	return resBody.data
}

const fetchTripStatus = async () => {
	const {
		journey_widget: {
			widget: {
				// update_interval,
				json: payload,
			},
		},
	} = await requestViaGraphql(`\
		query foo {
			journey_widget: feed_widget(
				widget_id: "cc0504a8-8c1d-4898-b7e1-8eb1ca72f3be"
			) {
				widget {
					...on JourneyInfoWidget {
						# update_interval
						json
					}
				}
			}
		}
	`)

	const {
		course,
	} = JSON.parse(payload)
	return parseTrip(course)
}

export {
	fetchTripStatus,
}
