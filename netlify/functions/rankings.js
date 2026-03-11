import { getStore } from '@netlify/blobs';

export default async (req, context) => {
    const store = getStore({ name: 'rankings', consistency: 'strong' });

    try {
        if (req.method === 'GET') {
            const now = new Date();
            const dailyKey = `daily_${now.toISOString().split('T')[0]}`;
            
            const d = new Date(Date.UTC(now.getFullYear(), now.getMonth(), now.getDate()));
            const dayNum = d.getUTCDay() || 7;
            d.setUTCDate(d.getUTCDate() + 4 - dayNum);
            const yearStart = new Date(Date.UTC(d.getUTCFullYear(),0,1));
            const weekNo = Math.ceil((((d - yearStart) / 86400000) + 1)/7);
            const weeklyKey = `weekly_${d.getUTCFullYear()}_${weekNo}`;
            
            const monthlyKey = `monthly_${now.getUTCFullYear()}_${now.getUTCMonth() + 1}`;
            
            const [overall, monthly, weekly, daily] = await Promise.all([
                store.get('overall', { type: 'json' }).then(r => r || []),
                store.get(monthlyKey, { type: 'json' }).then(r => r || []),
                store.get(weeklyKey, { type: 'json' }).then(r => r || []),
                store.get(dailyKey, { type: 'json' }).then(r => r || [])
            ]);

            return new Response(JSON.stringify({ overall, monthly, weekly, daily }), {
                status: 200,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        if (req.method === 'POST') {
            const body = await req.json();
            const { name, score } = body;
            
            if (!name || typeof score !== 'number') {
                return new Response('Invalid data', { status: 400 });
            }

            const now = new Date();
            const dailyKey = `daily_${now.toISOString().split('T')[0]}`;
            
            const d = new Date(Date.UTC(now.getFullYear(), now.getMonth(), now.getDate()));
            const dayNum = d.getUTCDay() || 7;
            d.setUTCDate(d.getUTCDate() + 4 - dayNum);
            const yearStart = new Date(Date.UTC(d.getUTCFullYear(),0,1));
            const weekNo = Math.ceil((((d - yearStart) / 86400000) + 1)/7);
            const weeklyKey = `weekly_${d.getUTCFullYear()}_${weekNo}`;
            
            const monthlyKey = `monthly_${now.getUTCFullYear()}_${now.getUTCMonth() + 1}`;

            const updateRanking = async (key) => {
                let current = await store.get(key, { type: 'json' }) || [];
                // Only keep highest score for a player in a specific ranking
                const existingIdx = current.findIndex(r => r.name === name);
                if (existingIdx !== -1) {
                    if (score > current[existingIdx].score) {
                        current[existingIdx].score = score;
                        current[existingIdx].date = now.toISOString();
                    }
                } else {
                    current.push({ name, score, date: now.toISOString() });
                }
                current.sort((a, b) => b.score - a.score);
                current = current.slice(0, 100);
                await store.setJSON(key, current);
            };

            await Promise.all([
                updateRanking('overall'),
                updateRanking(monthlyKey),
                updateRanking(weeklyKey),
                updateRanking(dailyKey)
            ]);

            return new Response(JSON.stringify({ success: true }), {
                status: 201,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        return new Response('Method Not Allowed', { status: 405 });
    } catch (error) {
        console.error("Error in rankings function:", error);
        return new Response('Internal Server Error', { status: 500 });
    }
};

export const config = {
    path: '/api/rankings'
};
