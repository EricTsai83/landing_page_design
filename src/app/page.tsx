"use client";

import { useRef, useState, useEffect } from "react";

function Banner(props: {
  imageSrc: string;
  className?: string;
  style?: React.CSSProperties;
  disableGradient?: boolean; // Keep the gradient control
  gradientEnd?: string; // New prop to control gradient end position
}) {
  return (
    <div
      className={`absolute left-0 w-full h-full bg-cover bg-center-bottom transition-all duration-500 ease-out ${props.className}`}
      style={{
        backgroundImage: props.disableGradient
          ? `url(${props.imageSrc})`
          : `linear-gradient(to top, #010302 0%, transparent ${props.gradientEnd}), url(${props.imageSrc})`,
        ...props.style,
      }}
    />
  );
}

function HeroSection() {
  const [banner2Position, setBanner2Position] = useState(0); // Position for banner_2
  const [banner3Position, setBanner3Position] = useState(0); // Position for banner_3
  const [textPosition, setTextPosition] = useState(0); // Position for the text block
  const banner3StopPosition = 250; // Stop position for banner_3
  const banner2StopPosition = 250; // Stop position for banner_2
  const textStopPosition = 10; // Stop position for the text block

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;

      // Calculate the new position of banner_3 based on its speed
      const banner3Speed = 0.3; // Speed for banner_3
      let newBanner3Position = Math.max(0, scrollY * banner3Speed);
      if (newBanner3Position > banner3StopPosition) {
        newBanner3Position = banner3StopPosition;
      }
      setBanner3Position(newBanner3Position);

      // Calculate the new position of banner_2 based on its speed
      const banner2Speed = 0.3; // Speed for banner_2
      let newBanner2Position = Math.max(0, scrollY * banner2Speed);
      if (newBanner2Position > banner2StopPosition) {
        newBanner2Position = banner2StopPosition;
      }
      setBanner2Position(newBanner2Position);

      // Calculate the new position of the text block
      const textSpeed = 0.2; // Speed for the text block
      let newTextPosition = Math.max(0, scrollY * textSpeed);
      if (newTextPosition > textStopPosition) {
        newTextPosition = textStopPosition;
      }
      setTextPosition(newTextPosition);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="relative h-screen bg-[#010302] bg-cover bg-center flex justify-center items-center">
      {/* Updated text block with dynamic top position */}
      <div
        className="absolute left-0 w-full h-full text-center z-20"
        style={{ top: `calc(32% - ${textPosition}px)` }} // Move text up based on scroll
      >
        <h5 className="text-[#d1c3ae] text-[50px] m-0 text-shadow">
          Welcome to my website
        </h5>
        <h1 className="text-[#d1c3ae] text-[11vw] m-0 text-shadow">
          Eric Tsai
        </h1>
      </div>

      {/* Include banner_0 here */}
      <Banner imageSrc="/images/banner_0.png" gradientEnd="60%" />
      <Banner imageSrc="/images/banner_1.png" gradientEnd="60%" />
      <Banner
        className="z-10"
        imageSrc="/images/banner_2.png"
        style={{ bottom: `${banner2Position}px` }}
        disableGradient={false}
        gradientEnd="20%" // 30% transparency for banner 2
      />
      <Banner
        className="z-30"
        imageSrc="/images/banner_3.png"
        style={{ bottom: `${banner3Position}px` }}
        disableGradient={false}
        gradientEnd="15%" // 20% transparency for banner 3
      />
    </div>
  );
}

function ContentSection() {
  return (
    <div
      className="min-h-screen bg-[#010302] relative bg-cover bg-center flex justify-center items-center"
      style={{
        backgroundImage:
          "linear-gradient(to top, #010302 0%, transparent 20%, #010302 80%), url(/images/tab1.jpg)",
      }}
    >
      <div className="w-[700px] max-w-[90%] text-[#eee]">
        <div className="mt-4">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quaerat
          autem alias a id distinctio...
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  const containerRef = useRef<HTMLDivElement | null>(null);

  return (
    <div className="overflow-hidden h-max" ref={containerRef}>
      <HeroSection />
      <ContentSection />
    </div>
  );
}
