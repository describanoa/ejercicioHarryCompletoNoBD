import { FreshContext, PageProps } from "$fresh/server.ts";
import Axios from "npm:axios";
import ComponenteCharacter from "../../../components/ComponenteCharacter.tsx";

export type StateID = {
  username: string;
  characters: CharacterID;
};

export type CharacterID = {
  id: string;
  name: string;
  house: string;
  image: string;
  species: string;
  gender: string;
  dateOfBirth: string;
  wizard: boolean;
  actor: string;
};

export async function handler(
  _req: Request,
  ctx: FreshContext<StateID>,
) {
  const { character } = ctx.params;

  // Obtener los personajes de la casa desde la API
  const buscarCharacterAPI = await Axios.get(
    `https://hp-api.onrender.com/api/character/${character}`,
  );

  return ctx.render({
    username: ctx.state.username,
    characters: buscarCharacterAPI.data[0],
  });
}

export default function Home(props: PageProps<StateID>) {
  return <ComponenteCharacter data={props.data} />;
}