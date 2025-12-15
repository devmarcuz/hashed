import Image from "next/image";
import "@/styles/NoiseEffect.css";

const NoiseEffect = () => {
  return (
    <Image
      src="/svgs/noise.svg"
      className="noise"
      alt=""
      width={1512}
      height={982}
      priority
      loading="eager"
    />
  );
};

export default NoiseEffect;
