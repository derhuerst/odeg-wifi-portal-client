import test from 'node:test'
import {ok} from 'node:assert'
import {
	fetchTripStatus,
} from '../index.js'

test('fetchTripStatus() works', async (t) => {
	const trip = await fetchTripStatus()
	// todo
	ok(trip)
})
