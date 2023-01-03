import React, { useState, useEffect } from "react";
import { FaChevronUp } from "react-icons/fa";

const BackToTopButton = () => {
  const [scrollPosition, setScrollPosition] = useState(0);

  const handleScroll = () => {
    const position = window.pageYOffset;
    setScrollPosition(position);
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <button
      onClick={scrollToTop}
      className={`bg-neutral-700 text-white fixed right-4 bottom-4 md:right-16 md:bottom-16 rounded-md py-2.5 px-4 transition-opacity duration-500 ${
        scrollPosition > 10 ? "opacity-100" : "opacity-0 cursor-default"
      }`}
      aria-label="scroll to top"
    >
      <FaChevronUp />
    </button>
  );
};

export default BackToTopButton;
