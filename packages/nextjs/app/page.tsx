import type { NextPage } from "next";

const Home: NextPage = () => {
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
        </div>
      </div>
    </>
  );
};

export default Home;
