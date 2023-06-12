
const Footer = () => {
  return (
    <footer className="bg-black/75 text-[#737373] absolute -bottom-72 left-0 w-full h-60">
      <div className="w-[90%] md:max-w-5xl mx-auto py-8">
        <p className="mb-8 font-semibold">
          <span className="hover:underline cursor-pointer">Questions? Contact us.</span>
        </p>
        <ul className="text-sm">
          <li className="inline-block mb-4 pr-3 w-1/4 min-w-[100px]">
            <span className="hover:underline cursor-pointer">FAQ</span>
          </li>
          <li className="inline-block mb-4 pr-3 w-1/4 min-w-[100px]">
            <span className="hover:underline cursor-pointer">Help Center</span>
          </li>
          <li className="inline-block mb-4 pr-3 w-1/4 min-w-[100px]">
            <span className="hover:underline cursor-pointer">Terms of Use</span>
          </li>
          <li className="inline-block mb-4 pr-3 w-1/4 min-w-[100px]">
            <span className="hover:underline cursor-pointer">Privacy</span>
          </li>
          <li className="inline-block mb-4 pr-3 w-1/4 min-w-[100px]">
            <span className="hover:underline cursor-pointer">Cookie Preferences</span>
          </li>
          <li className="inline-block mb-4 pr-3 w-1/4 min-w-[100px]">
            <span className="hover:underline cursor-pointer">Corporate Information</span>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;