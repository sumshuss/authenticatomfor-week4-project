const express = require('express');
const fetch = (...args) =>
	import('node-fetch').then(({ default: fetch }) => fetch(...args));
// console.log('hello1')
const router = express.Router();

router.post('/api/users/register', async (req, res) => {
	const { first_name, last_name, email, username, password } = req.body;
	// console.log('hello2')
	const body = JSON.stringify({
		first_name,
		last_name,
		email,
		username,
		password,
	});

	try {
		const apiRes = await fetch(`https://artemis-camping-backend.herokuapp.com/api/users/register`, {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
			body,
		});
		// console.log(process.env.API_URL)
		const data = await apiRes.json();

		return res.status(apiRes.status).json(data);
	} catch (err) {
		console.log(err)
		return res.status(500).json({
			error: 'Something went wrong when registering account',
		});
	}
});

module.exports = router;
