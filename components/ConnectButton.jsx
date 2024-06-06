import styles from "@/styles/Header.module.css"
import { useWeb3Modal, useWeb3ModalAccount } from '@web3modal/ethers5/react'
import { useState, useEffect } from 'react'
import { shortenEthAddy } from "@/functions/shortenEthAddy"

export default function ConnectButton () {

    const [wallet,setWallet] = useState("") 
  

    const { address, isConnected } = useWeb3ModalAccount() 
    const { open, close } = useWeb3Modal()                        

    function web3ButtonClick() {
        if(!isConnected){
            open({ view: 'Connect' })
        } else {
            open({ view: 'Account' })
        }
    }

    useEffect(() => {

        isConnected ? setWallet(address) : setWallet("")

    }, [isConnected])
    

    return(
        <div onClick={()=>web3ButtonClick()} className={styles.connectButton}>
            {wallet === "" ? "Connect" : shortenEthAddy(wallet)}
        </div>
    )
}