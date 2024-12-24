export const EIP_712_DOMAIN = {
  name: "Start Ethereum",
  version: "1",
} as const;

export const EIP_712_TYPES__REGISTER = {
  Message: [
    { name: "action", type: "string" },
    { name: "description", type: "string" },
  ],
};
