import PleaseConnectWallet from "@/components/PleaseConnectWallet";
import styles from "@/styles/Home.module.css";
import { useState } from "react";
import { useWeb3ModalAccount } from '@web3modal/ethers5/react'
import Wrap from "@/components/Wrap";
import Unwrap from "@/components/Unwrap";

export default function Home() {

  const [mode,modeToggle] = useState("wrap")
  const { isConnected } = useWeb3ModalAccount()

  return (
    <div className={styles.wrapper}>
      <div className={styles.disclaimer}>! This WRAWR is an unofficial test token !</div>
      <div className={styles.container}>
        <div className={styles.modeToggleWrapper}>
          <div onClick={()=>modeToggle("wrap")} className={`${styles.modeToggle} ${mode === "wrap" ? styles.active : null}`}>Wrap</div>
          <div onClick={()=>modeToggle("unwrap")} className={`${styles.modeToggle} ${mode === "unwrap" ? styles.active : null}`}>Unwrap</div>
        </div>
        {
          !isConnected ? <PleaseConnectWallet /> : 
          isConnected && mode === "wrap" ? <Wrap /> :
          isConnected && mode === "unwrap" ? <Unwrap /> : null
        }
      </div>
    </div>
  )
}