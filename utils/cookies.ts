export function getCookieFromHeader(cookieHeader: string | null, name: string): string | null {
  if (!cookieHeader) return null;
  const cookies = cookieHeader.split("; ");
  const cookie = cookies.find((c) => c.includes(`${name}=`));
  return cookie ? decodeURIComponent(cookie.split("=")[1]) : null;
}