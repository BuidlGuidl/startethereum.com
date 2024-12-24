"use client";

import { useState } from "react";
import type { NextPage } from "next";
import { useAccount } from "wagmi";
import { CheckCircleIcon } from "@heroicons/react/24/solid";
import { Address, RainbowKitCustomConnectButton } from "~~/components/scaffold-eth";

const Home: NextPage = () => {
  const { isConnected, address } = useAccount();
  const [hasWalletInstalled, setHasWalletInstalled] = useState(false);
  const [hasSignedMessage, setHasSignedMessage] = useState(false);

  return (
    <>
      <div className="flex items-center flex-col flex-grow pt-10">
        <div className="px-5">
          <h1 className="text-center">
            <span className="block text-2xl mb-2">Welcome to</span>
            <span className="block text-4xl font-bold">StartEthereum</span>
          </h1>
          <p className="text-center text-lg max-w-xl mb-8">
            Your journey into the world of Ethereum starts here. Learn how to use blockchain technology beyond trading -
            from setting up your first wallet and signing transactions to exploring decentralized applications.{" "}
          </p>

          <div className="flex flex-col gap-12 max-w-xl mx-auto">
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <h2 className="text-2xl font-bold">1. Get your wallet!</h2>
                {hasWalletInstalled && <CheckCircleIcon className="text-green-500 h-5 w-5" />}
              </div>
              <p className="text-gray-600">Download Rainbow wallet to start your Web3 journey</p>
              <a
                href="https://rainbow.me"
                target="_blank"
                rel="noopener noreferrer"
                className="btn w-fit border-none text-white font-bold
                  bg-gradient-to-r from-purple-500 via-pink-500 to-yellow-500
                  hover:from-purple-600 hover:via-pink-600 hover:to-yellow-600
                  transition-all duration-300 hover:scale-105"
              >
                Download Rainbow
              </a>
              <div className="flex items-center gap-2 mt-2">
                <input
                  type="checkbox"
                  className="checkbox"
                  checked={hasWalletInstalled}
                  onChange={e => setHasWalletInstalled(e.target.checked)}
                />
                <label className="text-sm">I already have Rainbow wallet installed</label>
              </div>
            </div>

            <div className={`flex flex-col gap-2 ${!hasWalletInstalled ? "opacity-50" : ""}`}>
              <div className="flex items-center gap-2">
                <h2 className="text-2xl font-bold">2. Connect your wallet</h2>
                {isConnected && <CheckCircleIcon className="text-green-500 h-5 w-5" />}
              </div>
              {!isConnected && <p className="text-gray-600">Connect your wallet to this website</p>}
              <div className="w-fit">
                {!isConnected ? <RainbowKitCustomConnectButton /> : <Address address={address} />}
              </div>
            </div>

            <div className={`flex flex-col gap-2 ${!isConnected ? "opacity-50" : ""}`}>
              <div className="flex items-center gap-2">
                <h2 className="text-2xl font-bold">3. Sign your first message</h2>
                {hasSignedMessage && <CheckCircleIcon className="text-green-500 h-5 w-5" />}
              </div>
              <p className="text-gray-600">Try out a simple off-chain signature - no gas fees!</p>
              <button
                className="btn btn-primary btn-sm w-fit"
                disabled={!isConnected}
                onClick={() => setHasSignedMessage(true)}
              >
                Sign Message
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
