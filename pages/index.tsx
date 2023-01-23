import { useWallet } from '@solana/wallet-adapter-react'
import Card from '../components/Products'
import SiteHeading from '../components/SiteHeading'

export default function HomePage() {

  return (
    <div className="flex justify-center max-w-4xl m-auto"> 
<div className="max-w-sm bg-white border-4 rounded-xl shadow-md dark:bg-gray-800 dark:border-gray-700">
    <a href="#">
        <img className="rounded-t-lg" src="/bonkburn.png" alt="bonkburn" />
    </a>
    <div className="p-5">
        <a href="#">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Set your bonk ablaze with ease - No gas required!</h5>
        </a>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Put your Bonk on the line and take on any bet with confidence! With this easy and fun interface, you can burn Bonk at the click of a button. No more trips to the solincinerator - all you need is your mobile wallet and you're all set!</p>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Take on bigger bets and challenges and burn Bonk today with this easy-to-use tool!</p>
        <a href="/burn" className="inline-flex items-center mt-2 px-3 py-2 text-sm font-medium text-center text-white bg-red-700 rounded-lg hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-red-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            Burn Bonk! 🔥
            <svg aria-hidden="true" className="w-4 h-4 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
        </a>
    </div>
    
</div>

    </div>
  )
}
