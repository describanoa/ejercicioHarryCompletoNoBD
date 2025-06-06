import { FunctionalComponent } from "preact/src/index.d.ts";


const Buscador: FunctionalComponent = () => {

    return (
        <div class="buscador">
            <form action="/search" method="get">
                <h1>Searcher</h1>
                <input type="text" placeholder="Character..." name="name" required />
                <br />
                <button type="submit" >Search</button>
            </form>
        </div>
    );
}
export default Buscador;