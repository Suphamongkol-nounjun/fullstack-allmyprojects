import { getToken } from "next-auth/jwt"
import { withAuth } from "next-auth/middleware"
import { NextFetchEvent, NextRequest, NextResponse } from "next/server"

// export { default } from "next-auth/middleware"

export default withAuth(
    middleware = (req) => {
        if (req.nextUrl.pathname.startsWith("/admin") && req.nextauth.token?.role !== "admin") {
            return NextResponse.rewrite(
                new URL("/welcome", req.url)
            );
        }
        if (req.nextUrl.pathname.startsWith("/user") && req.nextauth.token?.role !== "user")
            return NextResponse.rewrite(
                new URL("/welcome", req.url)
            );
    },
    {
        callbacks: {
            authorize: ({ token }) => {
                console.log('token', token)
            
            }
        }
    }

)
export const config = { matcher: ["/user/:path*", "/admin/:path*"] }

// import { getToken } from 'next-auth/jwt'
// import { NextResponse } from 'next/server'

// export async function middleware(request) {
//   const user = await getToken({
//     req: request,
//     secret: process.env.NEXTAUTH_SECRET,
//   })
//   console.log("user:", user)

//   // Get the pathname of the request
//   const { pathname } = request.nextUrl

//   // If the pathname starts with /protected and the user is not an admin, redirect to the home page
//   if (
//     pathname.startsWith('/protected') &&
//     (!user || user.role !== 'admin')
//   ) {
//     return NextResponse.redirect(new URL('/', request.url))
//   }

//   // Continue with the request if the user is an admin or the route is not protected
//   return NextResponse.next()
// }