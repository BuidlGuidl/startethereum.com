"use client";

import { useState } from "react";
import { PencilIcon } from "@heroicons/react/24/solid";
import { Address } from "~~/components/scaffold-eth";
import { BlockieAvatar } from "~~/components/scaffold-eth/BlockieAvatar";
import { User } from "~~/services/database/repositories/users";

// ToDo. Fetch from database / component / whatever
const badges = [
  {
    title: "Off-chain Signature",
    completed: true,
    description: "Completed your first off-chain signature",
    instructions:
      "1. Go to the signature page\n2. Connect your wallet\n3. Sign the message using your wallet\n4. Verify the signature is valid",
  },
  {
    title: "Your First Transaction",
    completed: false,
    description: "Send your first on-chain transaction",
    instructions:
      "1. Ensure you have some ETH in your wallet\n2. Go to the transaction page\n3. Enter the recipient address and amount\n4. Confirm the transaction in your wallet",
  },
  {
    title: "Token Swap",
    completed: false,
    description: "Complete your first token swap",
    instructions:
      "1. Navigate to the swap interface\n2. Select the tokens you want to exchange\n3. Review the exchange rate and fees\n4. Confirm and execute the swap",
  },
  {
    title: "Stable Coins",
    completed: false,
    description: "Learn about and use stable coins",
    instructions:
      "1. Read about different types of stablecoins\n2. Get some USDC or DAI\n3. Make a transaction using stablecoins\n4. Understand the benefits of price stability",
  },
];

const ProfileContent = ({ user }: { user: User }) => {
  const [selectedBadge, setSelectedBadge] = useState<(typeof badges)[0] | null>(null);

  if (!user) {
    return (
      <div className="flex flex-col items-center mt-10">
        <h1 className="text-2xl font-bold">User not found</h1>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-6 mt-10">
      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:w-3/12">
          <div className="bg-base-200 rounded-lg p-6 shadow-lg">
            <div className="flex flex-col items-center">
              <BlockieAvatar address={user.id} size={120} />
              <div className="mt-2">
                <Address address={user.id} />
              </div>
              <div className="mt-6 flex items-center gap-2 text-primary font-bold cursor-pointer hover:opacity-80">
                <span className="text-sm">Set your name</span>
                <PencilIcon className="h-4 w-4" />
              </div>
            </div>
          </div>
        </div>

        <div className="md:w-9/12">
          <h2 className="text-2xl font-bold mb-6">Your Progress</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {badges.map((badge, index) => (
              <div
                key={index}
                className={`bg-base-200 rounded-lg p-4 shadow-lg cursor-pointer transition-colors
                  ${selectedBadge === badge ? "ring-2 ring-primary" : "hover:bg-base-300"}`}
                onClick={() => setSelectedBadge(badge === selectedBadge ? null : badge)}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-3 h-3 rounded-full ${badge.completed ? "bg-green-500" : "bg-gray-400"}`} />
                  <h3 className="font-semibold">{badge.title}</h3>
                </div>
                <p className="mt-2 text-sm text-gray-500">{badge.description}</p>
              </div>
            ))}
          </div>

          {/* Detailed information section */}
          {selectedBadge && (
            <div className="mt-8 bg-base-200 rounded-lg p-6 shadow-lg">
              <h3 className="text-xl font-bold mb-4">{selectedBadge.title}</h3>
              <div className="space-y-4">
                <p className="text-gray-500">{selectedBadge.description}</p>
                <div className="divider"></div>
                <div>
                  <h4 className="font-semibold mb-2">How to earn this badge:</h4>
                  <div className="text-gray-500">
                    {selectedBadge.instructions.split("\n").map((instruction, index) => (
                      <p key={index}>{instruction}</p>
                    ))}
                  </div>
                </div>
                {selectedBadge.completed && (
                  <div className="mt-4 text-green-500 font-semibold">✓ You earned this badge!</div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileContent;
