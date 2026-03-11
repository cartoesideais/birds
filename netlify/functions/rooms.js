import { getStore } from '@netlify/blobs';

export default async (req, context) => {
    const store = getStore('rooms');

    try {
        if (req.method === 'GET') {
            const { blobs } = await store.list();
            const rooms = [];
            for (const blob of blobs) {
                const data = await store.get(blob.key, { type: 'json' });
                if (data) {
                    rooms.push({ id: blob.key, ...data });
                }
            }
            return new Response(JSON.stringify(rooms), {
                status: 200,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        if (req.method === 'POST') {
            const body = await req.json();
            const { roomId, hostName } = body;
            
            if (!roomId || !hostName) {
                return new Response('Missing roomId or hostName', { status: 400 });
            }

            await store.setJSON(roomId, { hostName, createdAt: Date.now() });
            return new Response(JSON.stringify({ success: true }), {
                status: 201,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        if (req.method === 'DELETE') {
            const url = new URL(req.url);
            const roomId = url.searchParams.get('roomId');
            
            if (roomId) {
                await store.delete(roomId);
            }
            
            return new Response(JSON.stringify({ success: true }), {
                status: 200,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        return new Response('Method Not Allowed', { status: 405 });
    } catch (error) {
        console.error("Error in rooms function:", error);
        return new Response('Internal Server Error', { status: 500 });
    }
};

export const config = {
    path: '/api/rooms'
};