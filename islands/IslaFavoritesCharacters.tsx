import { FunctionalComponent } from "preact/src/index.d.ts";
import { Character, State } from "../routes/(platform)/characters.tsx";
import { useState } from "preact/hooks";

type Props = {
  data: State;
};

const IslaFavoritesCharacters: FunctionalComponent<Props> = (props) => {
  const [characters, setCharacters] = useState<Character[]>(
    props.data.characters,
  );

  const quitarFavorito = async (c: Character, event: Event) => {
    event.stopPropagation();
    const response = await fetch("/api/quitarfavorito", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: c.id }),
    });

    if (!response.ok) {
      alert("Error al quitar favorito");
    } else {
      setCharacters(characters.filter((character) => character.id !== c.id));
      if (characters.length === 1) {
        alert("No tienes favoritos, por favor, añade alguno.");
        document.cookie = "favorites=; Path=/; HttpOnly; Max-Age=0"; // Elimina la cookie de favoritos
        globalThis.location.href = "/characters";
      }
    }
  };

  return (
    <div class="containerCharacters">
      <div class="titular">
        <p>
          Usuario: <span>{props.data.username}</span>
        </p>
      </div>
      <div class="characters">
        {characters.map((c) => (
          <div class="character" key={c.id} onClick={() => globalThis.location.href = `/character/${c.id}`} >
            <img src={c.image} alt={c.name} />
            <h3>{c.name}</h3>
            <p>House: <a href={`/house/${c.house}`}>{c.house}</a></p>
            <button type="button" onClick={(e) => quitarFavorito(c, e)}>
              ❌ Quitar de favoritos
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default IslaFavoritesCharacters;
