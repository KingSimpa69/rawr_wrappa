import styles from "@/styles/Header.module.css"
import Image from "next/image";
import ConnectButton from "./ConnectButton";

export default function Header () {

    return(
        <div className={styles.wrapper}>
            <Image alt={"logo"} priority src={"/images/logo.png"} width={50} height={50} />
            <ConnectButton />
        </div>
    )
}