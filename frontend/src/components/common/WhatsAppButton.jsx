import { FaWhatsapp } from "react-icons/fa";

function WhatsAppButton() {
  return (
    <a
      href="https://wa.me/917061107079"
      target="_blank"
      rel="noreferrer"
      aria-label="Contact us on WhatsApp"
      className="fixed bottom-5 right-5 z-10 flex h-14 w-14 items-center justify-center rounded-full bg-green-500 text-white transition-transform duration-200 hover:scale-105 hover:bg-green-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-500 sm:bottom-6 sm:right-6"
    >
      <FaWhatsapp size={30} aria-hidden="true" />
    </a>
  );
}

export default WhatsAppButton;
