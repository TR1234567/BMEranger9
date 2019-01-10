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

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// Push
app.get('/webhook', (req, res) => {			
	// push block
	//let msg = 'Hello'				// ; can or cannnot added in afterward
	//push(msg)
	//res.send(msg)						// for showing when perform
		
})

// Reply
app.post('/webhook', (req, res) => {		// WEBHOOK send to bot is always post method
	// reply block							// from users
	if(req.body.events[0].type == 'beacon')
	{
		let mess = 'Welcome'
		let reply_token = req.body.events[0].replyToken     // get event 0 (the first array) that we want to get reply_token
        let msg = JSON.stringify(req.body)
        let re = req.body.events[0].message.text
		push(mess)
		if(req.body.events[0].beacon.type == 'enter'){
			let ok = 'enter'
			sendbeacon('enter', ok)
			console.log('Pin')
		}
		else if(req.body.events[0].beacon.type == 'leave'){
			let ok = 'leave'
			sendbeacon('leave', ok)
			console.log('Pout')
		}
		
    }
    /*
	else if(req.body.events[0].type == 'message'){
		let msg = req.body.events[0].message.text
		let reply_token = req.body.events[0].replyToken
		//reply(reply_token,msg)
		show(reply_token, msg)
	}*/
	else if(req.body.events[0].message.text == 'Admin_Mon'){
		let re = 'Request Data'
        let reply_token = req.body.events[0].replyToken
        requestdata(reply_token, re)
	}
})

function requestdata(reply_token, re){
    resquest.post({
        url: 'https://63d407c3.ngrok.io/webhook/showdb',
        headers: HEADERS,
        re: re
    }, (err, res, body) => {
		//console.log(data)
		console.log('req')
	})
}

function data(method, ok){
	request.post({
		url: 'https://api.line.me/v2/bot/message/' + method,
		headers: HEADERS,
		ok: ok								// must tranform to json 
	}, (err, res, body) => {
		//console.log(data)
		console.log('send')
	})
}

function push(msg) {					// similar to notification (push message to users)
	let body = JSON.stringify({
	// push body
	to: 'Uf8e0ff3e535a04463f383f6fc27290ed',
	messages: [{
		type: 'text',
		text: msg
	}]

  })
  curl('push', body)
}

/*
function show(reply_token, msg){
	console.log('Pass show')
	let body = JSON.stringify({
	messages:[{
		type: 'bubble',
		body: {
			type: 'box',
			layout: 'vertical',
			spacing: 'md',
			contents: [
				{
				type: 'box',
				layout: 'horizontal',
				spacing: 'md',
				contents: [{
					type: 'text',
					text: 'Time'
					},
					{
					type: 'separator'
					},
					{
					type: 'text',
					text: '00:00 - 00:00'
					}
				]},
				{
					type: 'separator'
				},
				{
					type: 'box',
					layout: 'vertical',
					spacing: 'md',
					contents: [
						{
							type: 'text',
							text: 'Temp'
						},
						{
							type = 'separator'
						},
						{
							type: 'text',
							text: '00.00 C'
						}
					]
				},
				{
					type: 'separator'
				},
				{
					type: 'box',
					layout: 'vertical',
					spacing: 'md',
					contents: [
						{
							type: 'text',
							text: 'Humidity'
						},
						{
							type = 'separator'
						},
						{
							type: 'text',
							text: '00.00 %'
						}
					]
				},
				{
					type: 'separator'
				},
				{
					type: 'box',
					layout: 'vertical',
					spacing: 'md',
					contents: [
						{
							type: 'text',
							text: 'P In'
						},
						{
							type = 'separator'
						},
						{
							type: 'text',
							text: '0 persons'
						}
					]
				},
				{
					type: 'separator'
				},
				{
					type: 'box',
					layout: 'vertical',
					spacing: 'md',
					contents: [
						{
							type: 'text',
							text: 'P Out'
						},
						{
							type = 'separator'
						},
						{
							type: 'text',
							text: '0 persons'
						}
					]
				}

			]
		}
	}]
  })
  showinfo('reply', body)
}
*/


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
}

function sendbeacon(method, ok){
	request.post({
		url: 'https://api.line.me/v2/bot/message/' + method,
		headers: HEADERS,
		ok: ok								// must tranform to json 
	}, (err, res, body) => {
		//console.log(data)
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

