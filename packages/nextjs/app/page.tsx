"use client";

import { useState } from "react";
import Link from "next/link";
import type { NextPage } from "next";
import { useAccount, useSignTypedData } from "wagmi";
import { CheckCircleIcon } from "@heroicons/react/24/solid";
import { Address, RainbowKitCustomConnectButton } from "~~/components/scaffold-eth";
import { EIP_712_DOMAIN, EIP_712_TYPES__REGISTER } from "~~/utils/eip712";

const Home: NextPage = () => {
  const { isConnected, address } = useAccount();
  const [hasWalletInstalled, setHasWalletInstalled] = useState(false);
  const [hasSignedMessage, setHasSignedMessage] = useState(false);

  const { signTypedDataAsync, isPending: isSigningMessage } = useSignTypedData();

  const handleSignMessage = async () => {
    try {
      const signature = await signTypedDataAsync({
        domain: EIP_712_DOMAIN,
        types: EIP_712_TYPES__REGISTER,
        primaryType: "Message",
        message: {
          action: "Register",
          description: "I want to register my account into Start Ethereum signing this offchain message",
        },
      });

      const response = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          signerAddress: address,
          signature,
        }),
      });

      if (response.ok) {
        setHasSignedMessage(true);
      } else {
        console.error("Failed to register");
      }
    } catch (error) {
      console.error("Error signing message:", error);
    }
  };

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
              {!hasSignedMessage ? (
                <>
                  <p className="text-gray-600">Try out a simple off-chain signature - no gas fees!</p>
                  <button
                    className="btn btn-primary btn-sm w-fit"
                    disabled={!isConnected || isSigningMessage}
                    onClick={handleSignMessage}
                  >
                    {isSigningMessage ? <span className="loading loading-spinner"></span> : "Sign Message"}
                  </button>
                </>
              ) : (
                <>
                  <p className="text-gray-600">
                    You have signed the message successfully! Go to your profile to continue your journey:
                  </p>
                  <Link href={`/profile/${address}`}>
                    <button className="btn btn-primary btn-sm w-fit">Go to Profile</button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
