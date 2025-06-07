import { FunctionalComponent } from "preact/src/index.d.ts";
import { StateID } from "../routes/(platform)/character/[character].tsx";

type Props = {
  data: StateID;
};

const ComponenteCharacter: FunctionalComponent<Props> = (props) => {
    return (
        <div class="characterID">
            <h1>{props.data.characters.name}</h1>
            <img src={props.data.characters.image} alt={props.data.characters.name} />
            <p>House: <a href={`/house/${props.data.characters.house}`}>{props.data.characters.house}</a></p>
            <p>Species: {props.data.characters.species}</p>
            <p>Gender: {props.data.characters.gender}</p>
            <p>Date of Birth: {props.data.characters.dateOfBirth}</p>
            <p>Wizard: {props.data.characters.wizard ? "Sí" : "No"}</p>
            <p>Actor: {props.data.characters.actor}</p>
        </div>
    );
}
export default ComponenteCharacter;