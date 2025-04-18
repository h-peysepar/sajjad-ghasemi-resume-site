import { NextRequest, NextResponse } from "next/server";
import Negotiator from "negotiator";
import { match } from "@formatjs/intl-localematcher";

const locales = ["en", "fa"];
const defaultLocale = "fa";

export function getLocale(request: NextRequest): string {
  const headers = Object.fromEntries(request.headers.entries());
  const negotiator = new Negotiator({ headers });
  const languages = negotiator.languages();
  const locale = match(languages, locales, defaultLocale)
  return locale;
}

export function middleware(request:NextRequest) {
      // Check if there is any supported locale in the pathname
      const { pathname } = request.nextUrl
      const pathnameHasLocale = locales.some(
        (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
      )

      if (pathnameHasLocale) return

      // Redirect if there is no locale
      const locale = getLocale(request)
      request.nextUrl.pathname = `/${locale}${pathname}`
      // e.g. incoming request is /products
      // The new URL is now /en-US/products
      return NextResponse.redirect(request.nextUrl)
    }

    export const config = {
      matcher: [
#        "/((?!api|_next|favicon.ico).*)", // ⬅️ این خط خیلی مهمه
"/((?!api|_next|favicon\\.ico|.*\\..*).*)"
      ],
    };
