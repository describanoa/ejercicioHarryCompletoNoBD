import { FunctionalComponent } from "preact/src/index.d.ts";
import { State } from "../routes/(platform)/profile.tsx";

type Props = {
  data: State;
};

const IslaProfile: FunctionalComponent<Props> = (props) => {
  const funcionCerrarSesion = async (e: Event) => {
    e.preventDefault();

    const response = await fetch("/api/logout", {
      method: "POST",
    });

    if (response.ok) {
      globalThis.location.href = "/login";
    } else {
      alert("Error al cerrar sesión");
    }
  };

  return (
    <div class="profile">
      <p>Username: <span>{props.data.username}</span></p>
      <button type="submit" onClick={funcionCerrarSesion}>Cerrar sesión</button>
    </div>
  );
};

export default IslaProfile;