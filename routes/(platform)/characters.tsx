import { FreshContext, PageProps } from "$fresh/server.ts";
import Axios from "npm:axios";
import IslaCharacter from "../../islands/IslaCharacter.tsx";
import { getCookieFromHeader } from "../../utils/cookies.ts";

export type State = {
  username: string;
  characters: Character[];
}

export type Character = {
  id: string;
  name: string;
  house: string;
  image: string;
  favorite?: boolean;
}


export async function handler(req: Request, ctx: FreshContext<State>) {
  const charactersAPI = await Axios.get("https://hp-api.onrender.com/api/characters");
  const cookieHeader = req.headers.get("cookie");
  const favoritesCookie = getCookieFromHeader(cookieHeader, "favorites");
  const favoritos = favoritesCookie ? favoritesCookie.split(",") : [];

  const personajes: Character[] = charactersAPI.data.map((c: Character) => ({
    ...c,
    favorite: favoritos.includes(c.id),
  }));

  return ctx.render({
    username: ctx.state.username,
    characters: personajes,
  });
}
// VER SI SE PUEDE PONER UN MAXIMO DE RETURN EN LA API
export default function Home(props: PageProps<State>) {
  return (
    <IslaCharacter data={props.data} />
  );
}