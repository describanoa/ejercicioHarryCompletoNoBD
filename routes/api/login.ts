export async function handler(req: Request) {
  if (req.method !== "POST") {
    return new Response("Method Not Allowed", { status: 405 });
  }

  const { username, password } = await req.json();

  // Validar la contraseña (en este caso, debe ser "1234")
  if (password === "1234" && username) {
    const headers = new Headers();
    headers.set(
      "Set-Cookie",
      `username=${username}; Path=/; HttpOnly; Max-Age=604800`, // Cookie válida por 7 días
    );

    return new Response(JSON.stringify({ message: "Login exitoso" }), {
      status: 200,
      headers,
    });
  }

  return new Response(JSON.stringify({ message: "Usuario o contraseña incorrectos" }), {
    status: 401,
  });
}