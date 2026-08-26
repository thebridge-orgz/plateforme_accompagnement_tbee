import { serve } from 'https://deno.land/std@0.177.0/http/server.ts';

const ANTHROPIC_API_KEY = Deno.env.get('ANTHROPIC_API_KEY')!;
const CORS = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
    'Content-Type': 'application/json',
};

const PROMPT = `Tu es un expert RH spécialisé dans l'accompagnement des étudiants en alternance.
Analyse ce CV et fournis un retour structuré en français avec ces sections :

## Analyse globale
Une appréciation générale du CV (2-3 phrases).

## Points forts
- Liste des points positifs (mise en page, expériences, compétences...)

## Points à améliorer
- Liste des améliorations concrètes à apporter

## Recommandations prioritaires
1. Action prioritaire 1
2. Action prioritaire 2
3. Action prioritaire 3

## Note globale
X/10 — Justification en une phrase.

Sois concret, bienveillant et orienté action. Le public cible est un étudiant cherchant une alternance.`;

serve(async (req) => {
    if (req.method === 'OPTIONS') {
        return new Response('ok', { headers: CORS });
    }

    try {
        const { fileUrl } = await req.json();

        if (!fileUrl) {
            return new Response(JSON.stringify({ error: 'fileUrl required' }), { status: 400, headers: CORS });
        }

        // Télécharger le fichier CV (PDF ou autre)
        const fileRes = await fetch(fileUrl);
        if (!fileRes.ok) {
            return new Response(JSON.stringify({ error: 'Could not fetch CV file' }), { status: 400, headers: CORS });
        }

        const fileBuffer = await fileRes.arrayBuffer();
        const base64 = btoa(String.fromCharCode(...new Uint8Array(fileBuffer)));
        const contentType = fileRes.headers.get('content-type') || 'application/pdf';
        const isPdf = contentType.includes('pdf');

        // Construire le message Claude
        const content: any[] = isPdf
            ? [
                {
                    type: 'document',
                    source: { type: 'base64', media_type: 'application/pdf', data: base64 },
                },
                { type: 'text', text: PROMPT },
            ]
            : [
                { type: 'text', text: `${PROMPT}\n\n(Note : le fichier n'est pas un PDF — analyse basée sur les métadonnées disponibles.)` },
            ];

        const claudeRes = await fetch('https://api.anthropic.com/v1/messages', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': ANTHROPIC_API_KEY,
                'anthropic-version': '2023-06-01',
                'anthropic-beta': 'pdfs-2024-09-25',
            },
            body: JSON.stringify({
                model: 'claude-sonnet-4-6',
                max_tokens: 2000,
                messages: [{ role: 'user', content }],
            }),
        });

        if (!claudeRes.ok) {
            const err = await claudeRes.text();
            return new Response(JSON.stringify({ error: `Claude API error: ${err}` }), { status: 500, headers: CORS });
        }

        const claudeData = await claudeRes.json();
        const analysis = claudeData.content?.[0]?.text ?? '';

        return new Response(JSON.stringify({ analysis }), { headers: CORS });
    } catch (err) {
        return new Response(JSON.stringify({ error: String(err) }), { status: 500, headers: CORS });
    }
});
