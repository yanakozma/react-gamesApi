import "../styles/GameViewerWithSearch.css";
import GameSearchForm from "./GameSearchForm";
import { useState, useEffect } from "react";

export default function GameViewerWithSearch() {
    const [gameTitle, setGameTitle] = useState("");
    const [searchedGames, setSearchedGames] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const response = await fetch(`https://www.cheapshark.com/api/1.0/games?title=${gameTitle}&limit=3`);
            const data = await response.json();
            setSearchedGames(data);
        }
        fetchData();
    }, [gameTitle]);

    const searchGame = (gameTitle) => {
        setGameTitle(gameTitle);
    };

    return (
        <>
            <GameSearchForm searchGame={searchGame} />
            <div className="games">
                {searchedGames.map((game) => {
                    return (
                        <div key={game.gameID} className="game">
                            {game.external}
                            <img src={game.thumb} alt="" />
                            {game.cheapest}
                        </div>
                    )
                })}
            </div>
            <div className="dealsSection">
                <h1>Latest Deals</h1>
            </div>
        </>
    )
}