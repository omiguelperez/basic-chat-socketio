'use strict'

$(function() {

	const socket = io()

	let $form = $('form')
		, $message = $('#message')
		, $messages = $('#messages')


	$form.submit(function(event) {
		event.preventDefault()

		let message = $message.val()

		socket.emit('chat message', message)
		$message.val(null)
	})

	socket.on('chat message', function(message) {
		$messages.append($('<li>').text(message))
	})

})