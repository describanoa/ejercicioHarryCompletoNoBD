import { FreshContext, PageProps } from "$fresh/server.ts";
import Axios from "npm:axios";
import IslaCharacter from "../../islands/IslaCharacter.tsx";
import { getCookieFromHeader } from "../../utils/cookies.ts";
import Buscador from "../../components/Buscador.tsx";

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

export async function handler(req: Request, ctx: FreshContext<State>) {
  const charactersAPI = await Axios.get(
    "https://hp-api.onrender.com/api/characters",
  );
  const cookieHeader = req.headers.get("cookie");
  const favoritesCookie = getCookieFromHeader(cookieHeader, "favorites");
  const favoritos = favoritesCookie ? favoritesCookie.split(",") : [];

  const url = new URL(req.url);
  const name = url.searchParams.get("name");

  if (!name) {
    return ctx.render({
      username: ctx.state.username,
      characters: [],
    });
  }

  const personajes: Character[] = charactersAPI.data.map((c: Character) => ({
    ...c,
    favorite: favoritos.includes(c.id),
  }));
  const personajesNombre = personajes.filter((p) =>
    p.name.toLowerCase().includes(name?.toLowerCase() || "")
  );

  return ctx.render({
    username: ctx.state.username,
    characters: personajesNombre,
  });
}
// VER SI SE PUEDE PONER UN MAXIMO DE RETURN EN LA API
export default function Home(props: PageProps<State>) {
  return (
    <>
      <Buscador />
      {props.data.characters.length === 0
        ? (
          null
        )
        : <IslaCharacter data={props.data} />}
    </>
  );
}
