"use client";

import styles from "./page.module.css";
import {
  browserName,
  osName,
  isBrowser,
  isDesktop,
  fullBrowserVersion,
} from "react-device-detect";
import { useEffect, useState } from "react";
import { QrCodeRenderTag } from "./components";

export default function Home() {
  const [qrCode, setQrCode] = useState("");
  const [codeValidation, setCodeValidation] = useState("");

  const handleQrCodeGenerate = async () => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/sign`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "User-Agent": "insomnia/8.4.0",
      },
      body: JSON.stringify({
        browserName,
        deviceName: osName,
        fullBrowserVersion,
      }),
    });

    const data = await response.json();
    return {
      token: data.token,
      code: data.code,
    };
  };

  const handleConsultCodeGenerate = async (code: string) => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/linked-device/${code}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "User-Agent": "insomnia/8.4.0",
        },
        next: {
          revalidate: 4,
        },
      }
    );

    const data = await response.json();

    if (data.error) {
      return false;
    } else {
      return true;
    }
  };

  const handleFetch = async (check: boolean) => {
    if (check) {
      const valid = await handleConsultCodeGenerate(codeValidation);
      if (valid) {
        console.log("redirect");
        return;
      }

      const { token, code } = await handleQrCodeGenerate();
      setQrCode(token);
      setCodeValidation(code);
      return;
    }

    const { token, code } = await handleQrCodeGenerate();
    setQrCode(token);
    setCodeValidation(code);
  };

  const handleQrCodeRender = () => {
    if (isBrowser && isDesktop && qrCode) {
      return <QrCodeRenderTag value={qrCode} />;
    }

    return <></>;
  };

  useEffect(() => {
    if (!qrCode) {
      handleFetch(false);
    } else {
      const interval = setInterval(() => {
        handleFetch(true);
      }, 4000);

      return () => clearInterval(interval);
    }
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
          <div className={styles.qrCode}>{handleQrCodeRender()}</div>
        </div>
      </div>
    </main>
  );
}
