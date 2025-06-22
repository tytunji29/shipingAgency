import Link from "next/link";
import Image from "next/image";
import React from "react";

function Logo() {
  return (
    <div>
      <Link href="/">
        <Image
          src="/images/myLogo.png" // saved version of the uploaded image
          alt="JetSend Logo"
          width={124}
          height={36}
          priority
        />
      </Link>
    </div>
  );
}

export default Logo;
