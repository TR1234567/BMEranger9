const bodyParser = require('body-parser')			// encoindtion
const request = require('request')					// request from event
const express = require('express')					// shorten nodejs coding

const app = express()
const port = process.env.PORT || 4000
const hostname = '127.0.0.1'
const HEADERS = {
	'Content-Type': 'application/json',
	'Authorization': 'Bearer {vkAoFTQJACw1uYwCNb05aAMq30C4QzVbLTCz4cTclj/FFdub70la4P00vdwHamyptmPU/JrGdd7roCBZ7ewc2rX/PWxDUCazquTAJqL/bCQwFm+2zTzh32qHM2jxecnhPs/LUTnDHugTdwHrH7JlVAdB04t89/1O/w1cDnyilFU=}'
}
let count = 0

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// var options = { method: 'GET',
//   url: 'http://localhost:4000/webhook',
//   headers: 
//    { 'Postman-Token': '34285dc8-eddd-4c6b-9f02-4c5524eaa945',
//      'cache-control': 'no-cache' } };

// Push
app.get('/webhook', (req, res) => {			
	// push block
	//let msg = 'Hello'				// ; can or cannnot added in afterward
	//push(msg)
	res.send(msg)						// for showing when perform	
})

// Reply
app.post('/webhook', (req, res) => {		// WEBHOOK send to bot is always post method
	console.log('webhook passed')
	// reply block							// from users
	if(req.body.events[0].type == 'beacon')
	{
		 let greet = 'Welcome, press Admin_Mon to see info'
		 let msg = JSON.stringify(req.body)
		 let reply_token = req.body.events[0].replyToken     // get event 0 (the first array) that we want to get reply_token
		 //let echo = req.body.events[0].message.text
		 if(count < 0)  { count = 0 }
		 if(req.body.events[0].beacon.type == 'enter'){
		 	let body = 'enter'
			greeting(reply_token, greet)
		 	sendbeacon('enter', body)
			console.log('Pin')
			count = count + 1
			console.log('enter = ' + count)
		}
		else if(req.body.events[0].beacon.type == 'leave'){
			let body = 'leave'
			sendbeacon('leave', body)
			console.log('Pout')
			count = count - 1
			console.log('leave = ' + count)
		}
		if(count > 2){
			let msg = 'There are too many people, please wait a moment'
			casting(reply_token, msg)
		}
		else if (count < 2 && count > 0){
			let msg = 'Available Now...'
			casting(reply_token, msg)
		}
    }
	else if(req.body.events[0].message.text == 'Admin_Mon'){
		let reply_token = req.body.events[0].replyToken
		let userid = req.body.events[0].userId
		let msg = 'Loading information...'
		let body = JSON.stringify({
			replyToken: reply_token,
			userId: userid
		})
		console.log('Wordin')
		reply(reply_token, msg)
        sendreply(body)
	}
	res.sendStatus(200)
})


function sendreply(body){
    request.post({
        url: 'https://13e202fb.ngrok.io/receiveBeacon/showdb',
        headers: HEADERS,
        body: body
    }, (err, res, body) => {
		console.log('req')
	})
}


function casting(reply_token,msg) {
	console.log('casting')
	let body = JSON.stringify({
		// push body
		replyToken: reply_token,
		messages: [{
			type: 'text',
			text: msg
		},
		{
			type: 'sticker',
			packageId: '1',
			stickerId: '106'
		}]
	  })
  curl('reply', body)
}

function reply(reply_token, msg) {
	let body = JSON.stringify({
		// push body
		replyToken: reply_token,
		messages: [{
			type: 'text',
			text: msg
		}]

	  })
  curl('reply', body)
  console.log('reply')
}


function greeting(reply_token, greet) {
	let body = JSON.stringify({
		// push body
		replyToken: reply_token,
		messages: [{
			type: 'flex',
			altText: 'Flex Message',
			contents: {
			  type: 'bubble',
			  body: {
				type: 'box',
				layout: 'vertical',
				spacing: 'sm',
				action: {
				  type: 'uri',
				  label: 'Action',
				  uri: 'https://linecorp.com'
				},
				contents: [
				  {
					type: 'text',
					text: 'Sanam Chandra Palace',
					size: 'lg',
					weight: 'bold'
				  },
				  {
					type: 'box',
					layout: 'vertical',
					spacing: 'sm',
					contents: [
					  {
						type: 'box',
						layout: 'baseline',
						contents: [
						  {
							type: 'text',
							text: 'Information press >',
							flex: 0,
							margin: 'sm'
						  },
						  {
							type: 'text',
							text: 'Admin_Mon',
							size: 'sm',
							align: 'end',
							weight: 'bold',
							color: '#760F0F'
						  }
						]
					  }
					]
				  }
				]
			  }
			}
		  }]

	  })
  curl('reply', body)
}

function sendbeacon(method, body){
	request.post({
		url: 'http://13e202fb.ngrok.io/receiveData/beacon/' + method,
		headers: HEADERS,
		body: body								// must tranform to json 
	}, (err, res, body) => {
		console.log('send')
	})
}

function curl(method, body) {						// curl is fn post request value to api depend on pushing or replying by define parameter for fixing
	request.post({
		url: 'https://api.line.me/v2/bot/message/' + method,
		headers: HEADERS,
		body: body									// must tranform to json 
	}, (err, res, body) => {
		console.log('status = ' + res.statusCode)
	})
}

app.listen(port, hostname, () => {
	console.log(`Server running at http://${hostname}:${port}/`)		// returning hostname
})

