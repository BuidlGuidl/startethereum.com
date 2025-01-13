import { connectorsForWallets } from "@rainbow-me/rainbowkit";
import { rainbowWallet } from "@rainbow-me/rainbowkit/wallets";
import scaffoldConfig from "~~/scaffold.config";

const wallets = [rainbowWallet];

/**
 * wagmi connectors for the wagmi context
 */
export const wagmiConnectors = connectorsForWallets(
  [
    {
      groupName: "Recommended Wallets",
      wallets,
    },
  ],

  {
    appName: "scaffold-eth-2",
    projectId: scaffoldConfig.walletConnectProjectId,
  },
);
