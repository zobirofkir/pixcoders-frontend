import Link from "next/link";
import Image from "next/image";
import Logo from "../../../../public/images/logo/logo.png";

const LogoComponent = () => (
  <Link href="/dashboard" className="flex items-center gap-2">
    <Image
      src={Logo}
      alt="Logo"
      width={32}
      height={32}
      className="object-contain"
    />
    <span className="font-semibold text-lg text-gray-900">PixCoders</span>
  </Link>
);

export default LogoComponent;
