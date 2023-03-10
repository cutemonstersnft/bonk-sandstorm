import { PropsWithChildren } from "react";

export default function PageHeading({ children }: PropsWithChildren<{}>) {
  return <h3 className="text-4xl text-center font-light text-black px-4">{children}</h3>
}
