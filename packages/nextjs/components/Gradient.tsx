import { clsx } from "clsx";

export function Gradient({ className, ...props }: React.ComponentPropsWithoutRef<"div">) {
  return (
    <div
      {...props}
      className={clsx(className, "")}
      style={{
        background:
          "radial-gradient(at 53% 78%, rgba(161, 252, 247, 0.4) 0px, transparent 50%), radial-gradient(at 71% 91%, rgba(131, 169, 247, 0.4) 0px, transparent 50%), radial-gradient(at 31% 91%, rgba(205, 174, 251, 0.4) 0px, transparent 50%)",
      }}
    />
  );
}
