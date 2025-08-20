import { useAppKit } from '@reown/appkit/react'
import { useAccount, useDisconnect } from 'wagmi'
import { useWalletStore } from '../store/wallet-store'
import { useEffect } from 'react'

export const useEVMWallet = () => {
  const { open } = useAppKit()
  const { address, isConnected, chainId } = useAccount()
  const { disconnect } = useDisconnect()
  const { setEVMConnection, setError } = useWalletStore()

  useEffect(() => {
    if (isConnected && address) {
      setEVMConnection(true, address, chainId, 'Web3Modal')
    } else {
      setEVMConnection(false)
    }
  }, [isConnected, address, chainId, setEVMConnection])

  return {
    isConnected,
    address,
    chainId,
    connect: () => open(),
    disconnect,
    switchNetwork: () => open({ view: 'Networks' })
  }
}