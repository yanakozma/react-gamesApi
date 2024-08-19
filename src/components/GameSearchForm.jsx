import "../styles/GameSearchForm.css";
import { useState } from "react";

export default function GameSearchForm({searchGame}) {
    const [text, setText] = useState("");

    const handleSubmit = (evt) => {
        evt.preventDefault();
        searchGame(text);
        setText("");
    };
    return (
        <form onSubmit={handleSubmit} className="GameSearchForm">
            <h1>Search For A Game</h1>
            <input 
            placeholder="Minecraft..." 
            type="text" 
            value={text}
            onChange={(evt) => setText(evt.target.value)}
            />
            <button>Search Game Title</button>
        </form>
    );
};