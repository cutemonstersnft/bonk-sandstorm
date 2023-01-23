import { PropsWithChildren } from "react";
import Footer from "./Footer";

export default function Layout({ children }: PropsWithChildren<{}>) {
  return (
    <div className='min-h-screen flex flex-col gap-16 bg-gradient-to-b from-green-300 via-blue-500 to-purple-600'>
      <main className='mb-auto pt-24'>
        {children}
      </main>
      <Footer />
    </div>
  )
}
