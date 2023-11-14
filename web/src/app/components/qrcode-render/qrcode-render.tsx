"use client";

import { QRCode } from "react-qrcode-logo";

function QrCodeRenderComponent({ value }: { value: string }) {
  return (
    <QRCode
      value={value}
      logoImage="https://github.com/viniciusanchieta/viniciusanchieta.dev/assets/31235308/2854a3d1-c8d8-4d52-8454-21bff6271380"
      logoWidth={50}
      logoHeight={50}
      size={200}
      qrStyle="dots"
    />
  );
}

export default QrCodeRenderComponent;
