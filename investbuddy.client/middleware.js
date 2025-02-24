// middleware.js à la racine ou dans le dossier /real-estate
import { NextResponse } from 'next/server';

export function middleware(request) {
  // On vérifie si l'URL commence par /real-estate
  if (request.nextUrl.pathname.startsWith('/real-estate')) {
    // Vérifiez ici la présence d'un token dans les cookies par exemple
    const token = request.cookies.get('token'); // ou le nom de votre cookie d'authentification

    // Si aucun token n'est trouvé, redirige vers la page de connexion ou une page "Not Logged In"
    if (!token) {
      const url = request.nextUrl.clone();
      url.pathname = '/NotLoggedIn';
      return NextResponse.redirect(url);
    }
  }
  return NextResponse.next();
}

export const config = {
  matcher: ['/real-estate/:path*'],
};
