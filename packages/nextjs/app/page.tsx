"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import clsx from "clsx";
import type { NextPage } from "next";
import { useAccount, useSignTypedData } from "wagmi";
import { XCircleIcon } from "@heroicons/react/24/outline";
import { CheckCircleIcon } from "@heroicons/react/24/solid";
import { Container } from "~~/components/Container";
import { Address, RainbowKitCustomConnectButton } from "~~/components/scaffold-eth";
import { useGlobalState } from "~~/services/store/store";
import { EIP_712_DOMAIN, EIP_712_TYPES__REGISTER } from "~~/utils/eip712";

const Home: NextPage = () => {
  const { isConnected, address } = useAccount();
  const isUserRegistered = useGlobalState(state => state.isUserRegistered);
  const setIsUserRegistered = useGlobalState(state => state.setIsUserRegistered);
  const [hasWalletInstalled, setHasWalletInstalled] = useState(isUserRegistered || false);

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
        setIsUserRegistered(true);
      } else {
        console.error("Failed to register");
      }
    } catch (error) {
      console.error("Error signing message:", error);
    }
  };

  return (
    <div className="px-2 max-w-[1920px] mx-auto">
      <div
        className="relative mt-2 rounded-4xl ring-1 ring-inset ring-black/5"
        style={{
          background:
            "radial-gradient(at 53% 20%, rgba(161, 252, 247, 0.4) 0px, transparent 50%), radial-gradient(at 71% 10%, rgba(131, 169, 247, 0.4) 0px, transparent 50%), radial-gradient(at 31% 10%, rgba(205, 174, 251, 0.4) 0px, transparent 50%)",
        }}
      >
        <Container className="relative min-h-[calc(100vh-6rem)] md:min-h-[calc(100vh-8rem)]">
          <div className="pb-24 pt-16 sm:pb-32 sm:pt-24 md:pb-48 md:pt-32">
            <h1 className="font-raleway text-balance text-6xl font-bold tracking-tight text-gray-950 sm:text-8xl">
              Start Ethereum
            </h1>
            <p className="mt-8 max-w-3xl text-xl/8 sm:text-2xl/10">
              Your journey into the world of Ethereum starts here. Learn how to use blockchain technology beyond trading
              - from setting up your first wallet and signing transactions to exploring decentralized applications.
            </p>
            <p className="mt-12">
              <Link href="#wallet" className="btn btn-lg btn-primary rounded-md">
                Get Started
              </Link>
            </p>
          </div>
        </Container>

        <div id="wallet" className="relative isolate overflow-hidden bg-gray-900 py-24 shadow-2xl rounded-4xl md:py-56">
          <Container className="relative">
            <div className="grid items-center justify-between gap-24 lg:gap-0 lg:grid-cols-2">
              <div>
                <div className="mb-4 flex items-center gap-2">
                  <h2
                    className={clsx("m-0 text-lg/7 font-semibold md:text-xl/7", {
                      "text-green-400": hasWalletInstalled || isUserRegistered,
                      "text-pink-400": !(hasWalletInstalled || isUserRegistered),
                    })}
                  >
                    1. Crypto in your pocket
                  </h2>
                  {(hasWalletInstalled || isUserRegistered) && <CheckCircleIcon className="text-green-400 h-7 w-7" />}
                </div>
                <p className="mt-2 text-5xl font-raleway font-bold tracking-tight text-white md:text-7xl">
                  Get A Wallet
                </p>
                <p className="mt-6 text-pretty text-xl/8 text-gray-100 sm:text-2xl/10">
                  Download Rainbow wallet to start your Web3 journey
                </p>
                <div className="form-control">
                  <label className="label cursor-pointer justify-normal gap-4">
                    <input
                      type="checkbox"
                      className="checkbox checkbox-primary"
                      checked={hasWalletInstalled}
                      onChange={e => setHasWalletInstalled(e.target.checked)}
                    />
                    <span className="label-text text-gray-100 text-xl">I already have Rainbow wallet installed</span>
                  </label>
                </div>
                {/* Mobile App Links */}
                <div className="mt-16 flex items-center gap-8 lg:hidden">
                  <div className="px-6 pt-6 pb-4 bg-gray-800 ring-1 ring-white/15 rounded-3xl">
                    <Link
                      className="text-center"
                      href="https://apps.apple.com/us/app/rainbow-ethereum-wallet/id1457119021"
                    >
                      <Image
                        alt="Apple App Store"
                        src="/logo-apple-apps.svg"
                        className="w-16 h-16 md:w-20 md:h-20"
                        width={72}
                        height={72}
                      />
                      <span className="mt-3 block text-white font-bold">iOS</span>
                    </Link>
                  </div>
                  <div className="px-6 pt-6 pb-4 bg-gray-800 ring-1 ring-white/15 rounded-3xl">
                    <Link className="text-center" href="https://play.google.com/store/apps/details?id=me.rainbow">
                      <Image
                        alt="Android App Store"
                        src="/logo-google-apps.svg"
                        className="w-16 h-16 md:w-20 md:h-20"
                        width={80}
                        height={80}
                      />
                      <span className="mt-3 block text-white font-bold">Android</span>
                    </Link>
                  </div>
                </div>

                {/* Desktop QR Codes */}
                <div className="hidden mt-16 items-center gap-8 lg:flex">
                  <div className="px-6 pt-6 pb-4 bg-gray-800 ring-1 ring-white/15 rounded-3xl">
                    <button
                      onClick={() => {
                        const modal = document.getElementById("modal_apple_qr") as HTMLDialogElement;
                        modal.showModal();
                      }}
                    >
                      <Image
                        alt="Apple App Store"
                        src="/logo-apple-apps.svg"
                        className="w-16 h-16 md:w-20 md:h-20"
                        width={72}
                        height={72}
                      />
                      <span className="mt-3 block text-white font-bold">iOS</span>
                    </button>

                    <dialog id="modal_apple_qr" className="modal">
                      <div className="modal-box">
                        <h3 className="mt-3 mb-0 font-semibold text-xl text-center">
                          Scan or search for <span className="text-primary">Rainbow Wallet</span>
                          <br /> on the Apple App Store
                        </h3>
                        <Image
                          alt="QR code for Apple App Store"
                          src="/qr-apple-app.svg"
                          className="w-full"
                          width={80}
                          height={80}
                        />
                        <form method="dialog">
                          <button className="absolute top-2 right-2 text-gray-500">
                            <XCircleIcon className="w-11 h-11" />
                          </button>
                        </form>
                      </div>
                    </dialog>
                  </div>
                  <div className="px-6 pt-6 pb-4 bg-gray-800 ring-1 ring-white/15 rounded-3xl">
                    <button
                      onClick={() => {
                        const modal = document.getElementById("modal_android_qr") as HTMLDialogElement;
                        modal.showModal();
                      }}
                    >
                      <Image
                        alt="Android App Store"
                        src="/logo-google-apps.svg"
                        className="w-16 h-16 md:w-20 md:h-20"
                        width={80}
                        height={80}
                      />
                      <span className="mt-3 block text-white font-bold">Android</span>
                    </button>

                    <dialog id="modal_android_qr" className="modal">
                      <div className="modal-box">
                        <h3 className="mt-3 mb-0 font-semibold text-xl text-center">
                          Scan or search for <span className="text-primary">Rainbow Wallet</span>
                          <br /> on the Google Play Store
                        </h3>
                        <Image
                          alt="QR code for Google App Store"
                          src="/qr-google-app.svg"
                          className="w-full"
                          width={80}
                          height={80}
                        />
                        <form method="dialog">
                          <button className="absolute top-2 right-2 text-gray-500">
                            <XCircleIcon className="w-11 h-11" />
                          </button>
                        </form>
                      </div>
                    </dialog>
                  </div>
                </div>
              </div>
              <div>
                <Image
                  className="mx-auto -mb-96 lg:mb-0 lg:absolute lg:-top-14 lg:right-32 max-w-sm"
                  alt="Mobile Ethereum Wallet"
                  src="/phone-mock.png"
                  width={483}
                  height={974}
                />
              </div>
            </div>
          </Container>
          <svg
            viewBox="0 0 1024 1024"
            aria-hidden="true"
            className="absolute left-[-20%] lg:left-0 top-1/2 -z-10 size-[64rem] -translate-x-1/2 [mask-image:radial-gradient(closest-side,white,transparent)]"
          >
            <circle r={512} cx={512} cy={512} fill="url(#radialGradient)" fillOpacity="0.5" />
            <defs>
              <radialGradient id="radialGradient">
                <stop stopColor="#FFA8DD" />
                <stop offset={1} stopColor="#DF71DB" />
              </radialGradient>
            </defs>
          </svg>
        </div>

        <div className="relative isolate min-h-screen overflow-hidden my-28 py-24 bg-gray-100 rounded-4xl ring-1 ring-inset ring-black/5 md:my-48 md:py-56">
          <Container>
            <div className="mb-4 flex items-center gap-2">
              <h2
                className={clsx("m-0 text-lg/7 font-semibold md:text-xl/7", {
                  "text-green-600": isConnected || isUserRegistered,
                  "text-pink-600": !(isConnected || isUserRegistered),
                })}
              >
                2. Sign in anywhere
              </h2>
              {(isConnected || isUserRegistered) && <CheckCircleIcon className="text-green-600 h-7 w-7" />}
            </div>
            <p className="mt-2 text-5xl font-raleway font-bold tracking-tight md:text-7xl">Connect Your Wallet</p>
            {!isConnected && (
              <p className="mt-6 text-xl/8 lg:text-2xl/10 max-w-2xl">Connect your wallet to this website</p>
            )}
            <div className="mt-12">
              {!isConnected ? <RainbowKitCustomConnectButton /> : <Address address={address} size="2xl" />}
            </div>
          </Container>
          <div aria-hidden="true" className="absolute bottom-0 inset-x-0 -z-10 transform-gpu overflow-hidden blur-3xl">
            <div
              style={{
                clipPath:
                  "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
              }}
              className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ec4899] to-[#c026d3] opacity-20 md:opacity-25 md:left-[calc(50%+16rem)]"
            />
          </div>
        </div>

        <div className="relative isolate overflow-hidden bg-gray-900 my-28 py-24 shadow-2xl rounded-4xl md:my-48 md:py-56">
          <Container className="relative">
            <div className="grid items-center justify-between gap-24 lg:gap-0 lg:grid-cols-2">
              <div>
                <div className="mb-4 flex items-center gap-2">
                  <h2
                    className={clsx("m-0 text-lg/7 font-semibold md:text-xl/7", {
                      "text-green-400": isUserRegistered,
                      "text-pink-400": !isUserRegistered,
                    })}
                  >
                    3. Register A Profile
                  </h2>
                  {isUserRegistered && <CheckCircleIcon className="text-green-400 h-7 w-7" />}
                </div>
                <p className="mt-2 text-5xl font-raleway font-bold tracking-tight text-white md:text-7xl">
                  Sign Your First Message
                </p>

                {!isUserRegistered ? (
                  <>
                    <p className="mt-6 text-pretty text-xl/8 text-gray-100 sm:text-2xl/10">
                      Try out a simple off-chain signature - no gas fees!
                    </p>
                    <p className="mt-12">
                      <button
                        className="btn btn-lg btn-primary rounded-md"
                        disabled={!isConnected || isSigningMessage}
                        onClick={handleSignMessage}
                      >
                        {isSigningMessage ? (
                          <span className="loading loading-spinner text-white"></span>
                        ) : (
                          "Sign Message"
                        )}
                      </button>
                    </p>
                  </>
                ) : (
                  <>
                    <p className="mt-6 text-pretty text-xl/8 text-gray-100 sm:text-2xl/10">
                      You have signed the message successfully! Go to your profile to continue your journey:
                    </p>
                    <p className="mt-12">
                      <Link href={`/user/${address}`}>
                        <button className="btn btn-lg btn-primary rounded-md">Go to Profile</button>
                      </Link>
                    </p>
                  </>
                )}
              </div>
            </div>
          </Container>
          <svg
            viewBox="0 0 1024 1024"
            aria-hidden="true"
            className="absolute right-[-20%] lg:right-0 top-1/2 -z-10 size-[64rem] translate-x-1/2 [mask-image:radial-gradient(closest-side,white,transparent)]"
          >
            <circle r={512} cx={512} cy={512} fill="url(#radialGradient)" fillOpacity="0.5" />
            <defs>
              <radialGradient id="radialGradient">
                <stop stopColor="#FFA8DD" />
                <stop offset={1} stopColor="#DF71DB" />
              </radialGradient>
            </defs>
          </svg>
        </div>
      </div>
    </div>
  );
};

export default Home;
