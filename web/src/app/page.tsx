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
import { useRouter } from "next/navigation";

export default function Home() {
  const [qrCode, setQrCode] = useState("");
  const [codeValidation, setCodeValidation] = useState("");

  const router = useRouter();

  const handleQrCodeGenerate = async () => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/linked-device/sign`,
      {
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
      }
    );

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
      localStorage.setItem("userId", data.userId);
      return true;
    }
  };

  const handleFetchQrCodeRender = async () => {
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

  const handleFetchConsultCodeGenerate = async () => {
    const valid = await handleConsultCodeGenerate(codeValidation);
    if (valid) {
      router.push("/dashboard");
      return;
    }
  };

  useEffect(() => {
    if (!qrCode) {
      handleFetchQrCodeRender();
    } else {
      const intervalRender = setInterval(() => {
        handleFetchQrCodeRender();
      }, 60000);

      const intervalConsult = setInterval(() => {
        handleFetchConsultCodeGenerate();
      }, 4000);

      return () => {
        clearInterval(intervalRender);
        clearInterval(intervalConsult);
      };
    }
  }, [qrCode]);

  return (
    <main className={styles.main}>
      <header className={styles.header}>
        <img
          src="https://user-images.githubusercontent.com/31235308/233757148-892564b0-b452-4b48-9875-d656f0baba19.png"
          alt="logo"
          width={50}
          className={styles.logo}
        />
        <p className={styles.title}>QR Code login system</p>
      </header>
      <div className={styles.body}>
        <p className={styles.titleAuth}>Use app on your smartphone</p>
        <div className={styles.auth}>
          <div className={styles.steps}>
            <ul>
              <li>1. Open on your smartphone</li>
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
