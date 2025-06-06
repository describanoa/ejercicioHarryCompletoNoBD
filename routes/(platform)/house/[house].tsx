import { FreshContext, PageProps } from "$fresh/server.ts";
import Axios from "npm:axios";
import { getCookieFromHeader } from "../../../utils/cookies.ts";
import IslaCharacter from "../../../islands/IslaCharacter.tsx";

export type State = {
  username: string;
  characters: Character[];
};

export type Character = {
  id: string;
  name: string;
  house: string;
  image: string;
  favorite?: boolean;
};

export async function handler(
  req: Request,
  ctx: FreshContext<State>,
) {
  const { house } = ctx.params;

  // Obtener la cookie de favoritos desde el encabezado
  const cookieHeader = req.headers.get("cookie");
  const favoritesCookie = getCookieFromHeader(cookieHeader, "favorites");
  const favoritos = favoritesCookie ? favoritesCookie.split(",") : [];

  // Obtener los personajes de la casa desde la API
  const buscarCasaAPI = await Axios.get(
    `https://hp-api.onrender.com/api/characters/house/${house}`,
  );

  // Marcar los personajes como favoritos si su ID está en la cookie
  const personajes: Character[] = buscarCasaAPI.data.map((c: Character) => ({
    ...c,
    favorite: favoritos.includes(c.id),
  }));

  return ctx.render({
    username: ctx.state.username,
    characters: personajes,
  });
}

export default function Home(props: PageProps<State>) {
  return <IslaCharacter data={props.data} />;
}