import { useState, useEffect } from "react";
import "./styles/main.css";
import logoImg from "./assets/logo.svg";
import { GameBanner } from "./Components/GameBanner";
import { CreateAdBanner } from "./Components/CreateAdBanner";
import * as Dialog from "@radix-ui/react-dialog";
import { CreateAdModal } from "./Components/CreateAdModal";
import axios from "axios";

interface Game {
  id: string;
  tittle: string;
  bannerUrl: string;
  _count: {
    Ad: number;
  };
}
export default function App() {
  const [games, setGames] = useState<Game[]>([]);

  useEffect(() => {
    axios("http://localhost:3333/games").then((res) => {
      setGames(res.data);
    });
  }, []);

  return (
    <div className="max-w-[1344px] mx-auto flex flex-col items-center my-20">
      <img src={logoImg} alt="" />

      <h1 className="text-6xl text-white font-black mt-20">
        Seu{" "}
        <span className="bg-nlw-gradient text-transparent bg-clip-text">
          duo
        </span>{" "}
        está aqui.
      </h1>
      <div className="grid grid-cols-6 gap-6 mt-16">
        {games.map((game) => {
          return (
            <GameBanner
              key={game.id}
              bannerUrl={game.bannerUrl}
              tittle={game.tittle}
              adsCount={game._count.Ad}
            />
          );
        })}
      </div>
      <Dialog.Root>
        <CreateAdBanner />
        <CreateAdModal />
      </Dialog.Root>
    </div>
  );
}
