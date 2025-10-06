import Link from 'next/link';
import Image from 'next/image';

const LogoComponent = () => (
  <div className="flex-shrink-0 flex items-center">
    <Link href="/" className="flex items-center">
      <Image 
        src="/images/logo/logo.png" 
        alt="Pixcoders Logo" 
        width={120} 
        height={32}
        className="h-auto w-auto"
        priority
      />
    </Link>
  </div>
);

export default LogoComponent;
