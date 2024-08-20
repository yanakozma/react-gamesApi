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
            <label htmlFor="name">Search For A Game</label>
            <input
            id="name"
            placeholder="Minecraft..." 
            type="text" 
            value={text}
            onChange={(evt) => setText(evt.target.value)}
            />
            <button>Search Game Title</button>
        </form>
    );
};