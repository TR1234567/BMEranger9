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

// Push
app.get('/webhook', (req, res) => {			
	// push block
	let msg = 'Hello'				// ; can or cannnot added in afterward
	push(msg)
	res.send(msg)						// for showing when perform
		
})

// Reply
app.post('/webhook', (req, res) => {		// WEBHOOK send to bot is always post method
	// reply block							// from users
	if(req.body.events[0].type == 'beacon')
	{
		// let mess = 'Welcome'
		// let reply_token = req.body.events[0].replyToken     // get event 0 (the first array) that we want to get reply_token
		// let msg = JSON.stringify(req.body)
		// if(count <0){ count = 0}
		// if(req.body.events[0].beacon.type == 'enter'){
		// 	let body = 'enter'
		// 	//push(mess)
		// 	sendbeacon('enter', body)
		// 	//console.log('Pin')
		// 	count = count + 1
		// 	//console.log('enter = ' + count)
		// }
		// else if(req.body.events[0].beacon.type == 'leave'){
		// 	let body = 'leave'
		// 	sendbeacon('leave', body)
		// 	console.log('Pout')
		// 	count = count - 1
		// 	console.log('leave = ' + count)
		// }
		// if(count > 2){
		// 	let noti = 'There are too many people, please wait a moment'
		// 	push(noti)
		// 	// if(count < 2 && count > 0){
		// 	// 	reply(reply_token, )
		// 	// }
		// }
    }
	else if(req.body.events[0].message.text == 'Admin_Mon'){
		let reply_token = req.body.events[0].replyToken
		let msg = 'Hello, loading information..'
		let body = JSON.stringify({
			replyToken: reply_token,
		})
		//reply(reply_token, msg)
		show(reply_token, msg)
        //requestdata(body)
	}
	res.sendStatus(200)
})

/*
function requestdata(body){
    request.post({
        url: 'https://63d407c3.ngrok.io/receiveBeacon/showdb',
        headers: HEADERS,
        body: body
    }, (err, res, body) => {
		console.log('req')
	})
}*/

function sorry(reply_token, ) {
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
/*
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
*/
/*
function push(noti) {					// similar to notification (push message to users)
	let body = JSON.stringify({
	// push body
	to: 'Uf8e0ff3e535a04463f383f6fc27290ed',
	messages: [{
		type: 'text',
		text: noti
	}]
  })
  curl('push', body)
}
*/

function show(reply_token, msg){
	console.log('Pass show')
	let body = JSON.stringify({
		messages: [{
            type: 'flex',
            altText: 'Flex Message',
            contents: {
              type: 'bubble',
              header: {
                type: 'box',
                layout: 'vertical',
                contents: [
                  {
                    type: 'text',
                    text: 'Sanam Chandra Palace ',
                    size: 'xs',
                    weight: 'bold',
                    color: '#AAAAAA'
                  }
                ]
              },
              hero: {
                type: 'image',
                url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/30/Chali_Mongkol_Asana.jpg/1200px-Chali_Mongkol_Asana.jpg',
                flex: 3,
                align: 'start',
                size: 'full',
                aspectRatio: '20:13',
                aspectMode: 'cover',
                action: {
                  type: 'uri',
                  label: 'Action',
                  uri: 'https://linecorp.com/'
                }
              },
              body: {
                type: 'box',
                layout: 'horizontal',
                spacing: 'md',
                contents: [
                  {
                    type: 'box',
                    layout: 'vertical',
                    flex: 1,
                    contents: [
                      {
                        type: 'image',
                        url: 'https://static.bhphotovideo.com/explora/sites/default/files/styles/top_shot/public/Color-Temperature.jpg?itok=yHYqoXAf',
                        gravity: 'bottom',
                        size: 'sm',
                        aspectRatio: '4:3',
                        aspectMode: 'cover'
                      },
                      {
                        type: 'image',
                        url: 'https://www.clipartmax.com/png/middle/251-2517394_backpacking-package-tour-tourism-cartoon-tourist-cartoon-png.png',
                        margin: 'md',
                        size: 'sm',
                        aspectRatio: '4:3',
                        aspectMode: 'cover'
                      }
                    ]
                  },
                  {
                    type: 'box',
                    layout: 'vertical',
                    flex: 2,
                    contents: [
                      {
                        type: 'text',
                        text: 'Temperature : ',
                        flex: 1,
                        size: 'xs',
                        gravity: 'top',
                        weight: 'bold'
                      },
                      {
                        type: 'separator',
                        color: '#2ABA11'
                      },
                      {
                        type: 'text',
                        text: 'Humidity     :',
                        flex: 2,
                        size: 'xs',
                        gravity: 'center',
                        weight: 'bold'
                      },
                      {
                        type: 'separator',
                        color: '#54BC0A'
                      },
                      {
                        type: 'text',
                        text: 'P In      :',
                        flex: 2,
                        size: 'xs',
                        gravity: 'center',
                        weight: 'bold',
                        color: '#141813'
                      },
                      {
                        type: 'separator',
                        color: '#06BC0B'
                      },
                      {
                        type: 'text',
                        text: 'P Out    :',
                        flex: 1,
                        size: 'xs',
                        gravity: 'bottom',
                        weight: 'bold'
                      }
                    ]
                  }
                ]
              }
            }
          }
        ]
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
}

function sendbeacon(method, ok){
	request.post({
		url: 'http://e4d62859.ngrok.io/receiveData/beacon/' + method,
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

