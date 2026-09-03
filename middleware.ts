import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

// Protects everything under /admin (except /admin/login) and /api/admin.
export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isApiRoute = pathname.startsWith("/api/admin");
  const isAdminPage = pathname.startsWith("/admin") && !pathname.startsWith("/admin/login");
  if (!isApiRoute && !isAdminPage) {
    return NextResponse.next();
  }

  const denied = () =>
    isApiRoute
      ? NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 })
      : NextResponse.redirect(
          (() => {
            const loginUrl = new URL("/admin/login", request.url);
            loginUrl.searchParams.set("next", pathname);
            return loginUrl;
          })()
        );

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !anonKey) {
    // Env not configured yet — fail closed rather than exposing the dashboard.
    return denied();
  }

  let response = NextResponse.next({ request });

  const supabase = createServerClient(url, anonKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value }) =>
          request.cookies.set(name, value)
        );
        response = NextResponse.next({ request });
        cookiesToSet.forEach(({ name, value, options }) =>
          response.cookies.set(name, value, options)
        );
      },
    },
  });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return denied();
  }

  return response;
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
};
