"use client";

import { QRCode } from "react-qrcode-logo";

function QrCodeRenderComponent({ value }: { value: string }) {
  return (
    <QRCode
      value={value}
      logoImage="https://static.wixstatic.com/media/c93dac_70e290cddaaa47e38d28e64a85e5c6c5~mv2.png/v1/fill/w_240,h_240,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/Perfil-01%202.png"
      logoWidth={50}
      logoHeight={50}
      size={200}
      qrStyle="dots"
    />
  );
}

export default QrCodeRenderComponent;
