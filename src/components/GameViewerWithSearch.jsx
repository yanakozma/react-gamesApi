import "../styles/GameViewerWithSearch.css";
import GameSearchForm from "./GameSearchForm";
import { useState, useEffect } from "react";
import useSWR from "swr"

const fetcher = (...args) => fetch(...args).then((response) => response.json());

export default function GameViewerWithSearch() {
    const [gameTitle, setGameTitle] = useState("");
    const [searchedGames, setSearchedGames] = useState([]);
    // const [gameDeals, setGameDeals] = useState([]);

    const { data, error } = useSWR(
        "https://www.cheapshark.com/api/1.0/deals?storeID=1&upperPrice=20&pageSize=3",
        fetcher
    );

    useEffect(() => {
        async function fetchGameData() {
            const response = await fetch(`https://www.cheapshark.com/api/1.0/games?title=${gameTitle}&limit=3`);
            const data = await response.json();
            setSearchedGames(data);
        }
        fetchGameData();
    }, [gameTitle]);

    // useEffect(() => {
    //     async function fetchDealsData() {
    //         const response = await fetch(`https://www.cheapshark.com/api/1.0/deals?storeID=1&upperPrice=20&pageSize=3`);
    //         const data = await response.json();
    //         setGameDeals(data);
    //     }
    //     fetchDealsData();
    // }, []);

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
                <div className="deals">
                    {data && data.map((deal) => {
                        return (
                            <div key={deal.dealID} className="deal">
                                <h3>{deal.title}</h3>
                                <p>Normal Price: {deal.normalPrice}</p>
                                <p>Deal Price: {deal.salePrice}</p>
                                <h3>YOU SAVE {deal.savings.substr(0, 2)}%</h3>
                            </div>
                        )
                    })}
                </div>
            </div>
        </>
    )
}