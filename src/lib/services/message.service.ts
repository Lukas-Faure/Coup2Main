import type { CreateMessage } from '$lib/schemas/message.schema';

export async function sendMessage(data: CreateMessage): Promise<Response> {
	return await fetch('/api/messages', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(data)
	});
} 