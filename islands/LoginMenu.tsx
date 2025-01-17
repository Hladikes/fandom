import { useSignal } from '@preact/signals'
import { accounts, selectAccount, selectedAccount, isLoaded } from '../utils/auth.ts'
import { animation } from 'twind/css'
import { tw } from 'twind'

const slideRight = animation("0.4s ease normal", {
  from: { transform: "translateX(100%)" },
  to: { transform: "translateX(0%)" },
})

export default function LoginMenu() {
  const isMenuVisible = useSignal(false)

  return (
    <>
      {isMenuVisible.value && (
        <div 
          onClick={() => isMenuVisible.value = false}
          class="cursor-pointer inset-0 h-screen w-screen bg-black opacity-20 fixed z-40"></div>
      )}

      <div class={`flex flex-col justify-end sm:justify-start pointer-events-none fixed left-0 sm:left-auto top-0 right-0 bottom-0 z-50 rounded-t-2xl w-screen sm:w-96 sm:rounded-r-none sm:rounded-l-2xl transition-transform ${isMenuVisible.value ? 'translate-x-0' : 'translate-x-full'}`}>
        <div class="p-6 bg-white sm:flex-1 pointer-events-auto">
          <div class="flex justify-between items-center">
            <h1 class="text-4xl">Accounts</h1>
            <button 
              class="p-1 flex items-center" 
              onClick={() => isMenuVisible.value = false}>
              <svg xmlns="http://www.w3.org/2000/svg" height="28" viewBox="0 -960 960 960" width="28">
                <path d="m251.333-204.667-46.666-46.666L433.334-480 204.667-708.667l46.666-46.666L480-526.666l228.667-228.667 46.666 46.666L526.666-480l228.667 228.667-46.666 46.666L480-433.334 251.333-204.667Z"/>
              </svg>
            </button>
          </div>
          <div class="mt-8 flex flex-col space-y-2">
            {accounts.value.map((account) => (
              <button 
                onClick={() => selectAccount(account)}
                class="border-2 border-black rounded-lg py-3 px-4 space-y-1 text-left transition-colors hover:bg-gray-200 relative">
                <h1 class="font-medium text-lg">{account.meta.name}</h1>
                <p>{account.meta.source}</p>
                <pre class="text-xs text-gray-400">{account.address.substring(0, 20)}...</pre>
                <div class="absolute top-0 right-0 bottom-0 flex flex-col justify-center">
                  <div class={`mr-4 h-4 w-4 border-2 border-black rounded-full ${selectedAccount.value === account ? 'bg-black' : ''}`}></div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {isLoaded.value && (
        <button 
          onClick={() => isMenuVisible.value = true}
          class="flex items-center gap-2 border-2 border-gray-800 rounded-full px-5 py-1 font-semibold text-gray-800 hover:bg-gray-800 hover:text-white transition-colors duration-300">
          <span>{selectedAccount.value ? selectedAccount?.value?.meta?.name : 'Select account'}</span>
        </button>
      )}
    </>
  )
}