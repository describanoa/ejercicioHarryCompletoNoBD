export function handler(req: Request) {
  if (req.method !== "POST") {
    return new Response("Method Not Allowed", { status: 405 });
  }

  const headers = new Headers();
  headers.set(
    "Set-Cookie",
    "username=; Path=/; HttpOnly; Max-Age=0", // Elimina la cookie
  );
  headers.set(
    "Set-Cookie",
    "favorites=; Path=/; HttpOnly; Max-Age=0", // Elimina la cookie
  );

  return new Response(JSON.stringify({ message: "Logout exitoso" }), {
    status: 200,
    headers,
  });
}