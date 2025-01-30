import {auth} from '@/lib/auth'
import {PUBLIC_ROUTES} from "@/lib/constants";

export default auth(req => {
  const isLoggedIn = !!req.auth;
  const {nextUrl} = req
  const isPublicRoute = PUBLIC_ROUTES.includes(nextUrl.pathname)

  if (!isLoggedIn && !isPublicRoute) {
    return Response.redirect(new URL('/login', nextUrl))
  }

  if (isLoggedIn && isPublicRoute) {
    return Response.redirect(new URL('/board', nextUrl))
  }

  return null
})

export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
}
