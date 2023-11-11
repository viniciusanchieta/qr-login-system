"use client";
import Image from "next/image";
import styles from "./page.module.css";
import { QRCode } from "react-qrcode-logo";
import { osName, browserName } from "react-device-detect";
import { useEffect, useState } from "react";
import { v4 as uuid } from "uuid";

export default function Home() {
  const [qrCode, setQrCode] = useState("");

  useEffect(() => {
    if (qrCode) {
      setTimeout(() => {
        setQrCode(uuid());
      }, 30000);
      return;
    }

    setQrCode(uuid());
  }, [qrCode]);

  return (
    <main className={styles.main}>
      <header className={styles.header}>
        <img
          src="https://rendaextraton.com.br/wp-content/uploads/2021/08/Logo_ton_white.png"
          alt="logo"
          width={50}
          className={styles.logo}
        />
        <p className={styles.title}>Ton na mão</p>
      </header>
      <div className={styles.body}>
        <p className={styles.titleAuth}>Use app Ton on your smartphone</p>
        <div className={styles.auth}>
          <div className={styles.steps}>
            <ul>
              <li>1. Open Ton on your smartphone</li>
              <li>2. Click on the Add device button</li>
              <li>3. Scan the QR code</li>
            </ul>
            <p className={styles.about}>
              After scanning the QR code, you will be redirected to the
              dashboard.
            </p>
          </div>
          <div className={styles.qrCode}>
            <QRCode
              value={qrCode + " - " + osName + " - " + browserName}
              logoImage="https://static.wixstatic.com/media/c93dac_70e290cddaaa47e38d28e64a85e5c6c5~mv2.png/v1/fill/w_240,h_240,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/Perfil-01%202.png"
              logoWidth={50}
              logoHeight={50}
              size={200}
              qrStyle="dots"
            />
          </div>
        </div>
      </div>
    </main>
  );
}
