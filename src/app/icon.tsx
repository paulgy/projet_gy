import { ImageResponse } from 'next/og';

// Route segment config
export const runtime = 'edge';

// Image metadata
export const size = {
    width: 32,
    height: 32,
};
export const contentType = 'image/png';

// Image generation
export default function Icon() {
    return new ImageResponse(
        (
            // ImageResponse JSX element
            <div
                style={{
                    fontSize: 20, // Taille de la lettre G
                    background: 'black', // Fond noir
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white', // Lettre blanche
                    borderRadius: '50%', // Transforme le carré en cercle
                    fontWeight: 800, // Gras
                    fontFamily: 'sans-serif',
                }}
            >
                G
            </div>
        ),
        // ImageResponse options
        {
            ...size,
        }
    );
}