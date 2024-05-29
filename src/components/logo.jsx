import logo from "../../public/img/logo.png";
import Image from "next/image";
const Logo = () => {
  return (
    <div className="flex items-center">
      <Image alt="Logo" src={logo} height={60} width={60} />
      <span className="ml-2 font-bold text-lg">Citizen Trade Management</span>
    </div>
  );
};

export default Logo;
