import { FunctionalComponent } from "preact/src/index.d.ts";
import { Character, State } from "../routes/(platform)/characters.tsx";
import { useState } from "preact/hooks";

type Props = {
  data: State;
};

const IslaCharacter: FunctionalComponent<Props> = (props) => {
  const [characters, setCharacters] = useState<Character[]>(
    props.data.characters,
  );

  const añadirFavorito = async (c: Character, event: Event) => {
    event.stopPropagation(); // Evita que el evento se propague al div
    const response = await fetch("/api/nuevofavorito", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: c.id }),
    });

    if (!response.ok) {
      alert("Error al añadir favorito");
    } else {
      setCharacters(
        characters.map((character) =>
          character.id === c.id ? { ...character, favorite: true } : character
        ),
      );
    }
  };

  const quitarFavorito = async (c: Character, event: Event) => {
    event.stopPropagation(); // Evita que el evento se propague al div
    const response = await fetch("/api/quitarfavorito", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: c.id }),
    });

    if (!response.ok) {
      alert("Error al quitar favorito");
    } else {
      setCharacters(
        characters.map((character) =>
          character.id === c.id ? { ...character, favorite: false } : character
        ),
      );
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
          <div
            class="character"
            key={c.id}
            onClick={() => globalThis.location.href = `/character/${c.id}`}
          >
            <img src={c.image} alt={c.name} />
            <h3>{c.name}</h3>
            <p>House: <a href={`/house/${c.house}`}>{c.house}</a></p>
            {!c.favorite
              ? (
                <button
                  type="button"
                  onClick={(event) => añadirFavorito(c, event)}
                >
                  ⭐️ Añadir a favoritos
                </button>
              )
              : (
                <button
                  type="button"
                  onClick={(event) => quitarFavorito(c, event)}
                >
                  ❌ Quitar de favoritos
                </button>
              )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default IslaCharacter;
