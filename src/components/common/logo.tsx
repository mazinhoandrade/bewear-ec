import Image from "next/image";
import Link from "next/link";
import React from "react";

const logo = () => {
  return (
    <>
      <Link href="/">
        <Image src="/logo.svg" alt="BEWEAR" width={100} height={26.14} />
      </Link>
    </>
  );
};

export default logo;
