import { FunctionalComponent } from "preact/src/index.d.ts";
import { Signal } from "@preact/signals";


const IslaLogin: FunctionalComponent = () => {

    const usernameSignal = new Signal<string>("");
    const passwordSignal = new Signal<string>("");

    const funcionLogin = async (e: Event) => {
        e.preventDefault();

        const response = await fetch("/api/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                username: usernameSignal.value,
                password: passwordSignal.value,
            }),
        });

        if (response.ok) {
            globalThis.location.href = "/characters";
        } else {
            usernameSignal.value = "";
            passwordSignal.value = "";
            alert("Usuario o contraseña incorrectos");
        }
    };

    return (
        <div class="login">
            <form>
                <label>Username: </label>
                <input type="text" placeholder="Username..." value={usernameSignal} onInput={(e) => usernameSignal.value = e.currentTarget.value} required />
                <br />
                <label>Password: </label>
                <input type="password" placeholder="Password..." value={passwordSignal} onInput={(e) => passwordSignal.value = e.currentTarget.value} required />
                <br />
                <button type="submit" onClick={funcionLogin}>Login</button>
            </form>
        </div>
    );
}
export default IslaLogin;