"use client";

import { QRCode } from "react-qrcode-logo";

function QrCodeRenderComponent({ value }: { value: string }) {
  return (
    <QRCode
      value={value}
      logoImage="https://user-images.githubusercontent.com/31235308/233757148-892564b0-b452-4b48-9875-d656f0baba19.png"
      logoWidth={60}
      logoHeight={45}
      size={200}
      qrStyle="squares"
    />
  );
}

export default QrCodeRenderComponent;
