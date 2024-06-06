import styles from "@/styles/Home.module.css"
import { useState,useEffect } from "react"
import Image from "next/image"
import { useWeb3ModalProvider,useWeb3ModalAccount } from "@web3modal/ethers5/react"
import ABI from "@/functions/ABI.json"
import { isAddress } from "ethers/lib/utils"
import { ethers } from "ethers"
import formatETH from "@/functions/formatEth"
import useDebounce from "@/hooks/useDebounce"
import contracts from "@/contracts/deployments.json"
import LoadinSpinner from "./LoadingSpinner"

export default function Wrap (){

    const { walletProvider } = useWeb3ModalProvider()
    const { address } = useWeb3ModalAccount()

    const [input,setInput] = useState(0)
    const [output,setOutput] = useState(0)
    const [balance,setBalance] = useState(null)
    const [button,setButton] = useState("")
    const debouncedInput = useDebounce(input, 750);

    const handleInput = async e => {
        let value = e.target.value;
        value = value.replace(/[^\d.]/g, "");
        if (value.toString().length > 6) {
          value = value.slice(0, 7);
        } else if (value > 5400) {
          value = 5400;
        }
        setInput(value)
    }

    const getBalance = async() => {
        try{
            const provider = new ethers.providers.Web3Provider(walletProvider)
            const signer = provider.getSigner()
            const chest = new ethers.Contract(contracts.rawr, ABI.rawr, signer)
            const response = parseInt(await chest.balanceOf(address))
            setBalance(parseFloat(response/10**18))
        } catch (e) {
            console.log(e)
        }
    }

    const checkIfApproved = async () => {
        try{
            if (!walletProvider) return;
            const provider = new ethers.providers.Web3Provider(walletProvider)
            const signer = provider.getSigner()
            const chest = new ethers.Contract(contracts.rawr, ABI.rawr, signer)
            const response = parseFloat(await chest.allowance(address,contracts.wrawr))/10**18
            console.log(response)
            response >= parseFloat(input) ? setButton("Wrap") : setButton("Approve")
        } catch (e) {
            console.log(e)
        }
    }

    const approveAmount = async() => {
        setButton("Loading")
        try{
            if (!walletProvider) return;
            const provider = new ethers.providers.Web3Provider(walletProvider)
            const signer = provider.getSigner()
            const rawr = new ethers.Contract(contracts.rawr, ABI.rawr, signer)
            const response = await rawr.approve(contracts.wrawr,(input*10**18).toString())
            await response.wait()
            checkIfApproved()
        } catch (e) {
            setButton("Approve")
            console.log(e)
        }
    }

    const wrap = async () => {
        setButton("Loading")
        try{
            if (!walletProvider) return;
            const provider = new ethers.providers.Web3Provider(walletProvider)
            const signer = provider.getSigner()
            const wrawr = new ethers.Contract(contracts.wrawr, ABI.wrawr, signer)
            const response = await wrawr.wrap((input*10**18).toString())
            await response.wait()
            setInput(0)
            getBalance()
        } catch (e) {
            setButton("Wrap")
            console.log(e)
        }
    }

    const theBigButton = async () => {
        button === "Approve" ? approveAmount() : 
        button === "Wrap" ? wrap() : null
    }

    useEffect(() => {
        setOutput(parseFloat(debouncedInput)*1000)
        if (input === 0 || input === ""){
            setButton("")
            return
        }
        parseFloat(balance) >= parseFloat(debouncedInput) ? checkIfApproved() : setButton("Insufficent Balance")
    }, [debouncedInput])

    useEffect(() => {
        if(balance === null && walletProvider !== undefined && isAddress(address)){
            getBalance()
        }
    }, [walletProvider,balance,address])
    

    return(
        <div>
            <div className={styles.inputBox}>
                <input onChange={(e)=>{handleInput(e)}} value={input}/>
                <div className={styles.tokenTicker}>RAWR</div>
            </div>
            <div onClick={()=>setInput(parseFloat(formatETH(balance?.toString())))} className={styles.balance}>Balance: {balance !== null ? formatETH(balance.toString()) : 0}</div>
            <div className={styles.downArrow} ><Image alt={"down-arrow"} src={"/images/down-arrow-svgrepo-com.svg"} width={50} height={50}/></div>
            <div className={styles.inputBox}>
                <input readOnly value={isNaN(output) ? 0 : (output).toLocaleString()}/>
                <div className={styles.tokenTicker}>WRAWR</div>
            </div>
            {button !== "" && 
            <div onClick={()=>theBigButton()} className={styles.theBigButton}>
                {button === "Loading" ? <LoadinSpinner /> : button}
            </div>
            }
        </div>
    )
}