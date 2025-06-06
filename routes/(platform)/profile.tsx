import { FreshContext, PageProps } from "$fresh/server.ts";
import IslaProfile from "../../islands/IslaProfile.tsx";

export type State = {
  username: string;
};

export function handler(
  _req: Request,
  ctx: FreshContext<State>,
) {

  return ctx.render({
    username: ctx.state.username,
  });
}
// VER SI SE PUEDE PONER UN MAXIMO DE RETURN EN LA API
export default function Home(props: PageProps<State>) {
  return <IslaProfile data={props.data} />
}
