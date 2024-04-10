import { NextResponse } from "next/server";
import { checkToken } from "./app/utilsHelper/Useful";

export async function middleware(request) {
  let path = request.nextUrl.pathname;
  let token = request.cookies.get("excktn")?.value;

  const check = await checkToken(token || "");

  if (!token && path !== "/login" && path !== "/") {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (token && check?.isValid && (path === "/login" || path === "/")) {
    return NextResponse.redirect(new URL("/main/dashboard", request.url));
  }

  if (token && !check?.isValid) {
    request.cookies.delete("excktn");
    request.cookies.delete("frhktn");
    return NextResponse.redirect(new URL("/login", request.url));
  }
}

export const config = {
  matcher: [
    "/login",
    "/main/community",
    "/main/store",
    "/main/store/addproduct",
    "/main/store/editproduct",
    "/main/community",
    "/",
    "/membership",
    "/main/order",
    "/main/earnings",
    "/main/post/[id]",
    "/main/customization",
    "/main/settings",
    "/main/dashboard",
    "/main/community/editCommunity",
    "/main/community/createCommunity"
  ],
};