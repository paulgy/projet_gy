import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Un simple Map en mémoire pour le rate limiting basique.
// Note : En environnement serverless (Vercel Edge), ce Map sera réinitialisé à chaque
// redémarrage de la fonction ou sera différent entre les différents "Edge Nodes".
// C'est toutefois suffisant pour limiter un spam basique "pour l'instant".
const rateLimitMap = new Map<string, { count: number; lastReset: number }>();

const LIMIT = 4;
// Fenêtre de temps avant réinitialisation (ici 1 heure)
const WINDOW_MS = 60 * 60 * 1000;

export function proxy(request: NextRequest) {
    // Récupérer l'adresse IP depuis les headers (x-forwarded-for en prod)
    const ip = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown';

    if (ip !== 'unknown') {
        const now = Date.now();
        const rateLimitInfo = rateLimitMap.get(ip);

        if (!rateLimitInfo || now - rateLimitInfo.lastReset > WINDOW_MS) {
            // Première requête ou nouvelle fenêtre de temps
            rateLimitMap.set(ip, { count: 1, lastReset: now });
        } else {
            // Vérification du quota
            if (rateLimitInfo.count >= LIMIT) {
                return NextResponse.json(
                    {
                        error: "Ce site est à caractère expérimental et le nombre de sollicitations de l'API Gemini est limité, car la clef api est personnelle."
                    },
                    { status: 429 }
                );
            }
            // Incrémenter le compteur
            rateLimitInfo.count += 1;
            rateLimitMap.set(ip, rateLimitInfo);
        }
    }

    return NextResponse.next();
}

// Spécifier les routes API qui doivent passer par ce middleware
export const config = {
    matcher: [
        '/api/evaluate-volunteering-gemini',
        '/api/evaluate-sentence-gemini',
        '/api/evaluate-ec2-gemini'
    ],
};
