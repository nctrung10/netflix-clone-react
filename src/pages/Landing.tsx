import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

import { UserAuth } from "../store/auth-context";
import { AiOutlinePlus } from 'react-icons/ai';

const LandingPage = () => {
  const [openAccordion, setOpenAccordion] = useState<number | null>(null);
  const { user } = UserAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) navigate('/browser');
  }, [user, navigate]);

  const clickHandler = (index: number) => {
    if (index !== openAccordion) {
      setOpenAccordion(index);
    } else {
      setOpenAccordion(null);
    }
  };

  const answerClass = `text-left text-lg md:text-2xl text-white bg-[#2d2d2d] transition-all ease-in-out duration-300 px-6 overflow-hidden`;

  const rotateIcon = (index: number) => openAccordion === index ? 'rotate-45' : 'rotate-0';

  const toggleAccordion = (index: number) => {
    return openAccordion === index ? 'visible max-h-[75rem] py-6' : 'collapse max-h-0';
  };

  return (
    <div className="w-full relative bg-black">
      <div className="relative text-white w-full h-full flex justify-center text-center pt-28 pb-8 sm:pt-32 sm:pb-12 lg:pt-40 lg:pb-16 
        min-h-[30rem] sm:min-h-[32rem] lg:min-h-[44rem]">
        <div className="overflow-hidden w-full h-full absolute inset-0">
          <div className="w-full h-full absolute inset-0 z-10 bg-black/30 bg-gradient-to-t from-black/80 to-transparent"></div>
          <img
            className="absolute inset-0 h-full w-full object-cover scale-125 -translate-y-[10%]"
            src="https://assets.nflxext.com/ffe/siteui/vlv3/39f3c979-c105-4948-9c51-611eedf3a6fd/aa02ddf2-423e-4abb-929d-5ba8d950cad4/VN-en-20230612-popsignuptwoweeks-perspective_alpha_website_large.jpg"
            alt="landing-page-banner"
          />
        </div>

        <div className="absolute top-[60%] left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 w-full
          flex items-center justify-center text-center">
          <div className="w-[90%] sm:w-ful font-bold sm:font-normal">
            <h1 className="text-3xl sm:text-5xl font-black">Unlimited movies, TV shows, and more</h1>
            <h2 className="mt-4 text-lg sm:text-2xl">Watch anywhere. Cancel anytime.</h2>
            <div className="mt-6 px-6 sm:px-8">
              <p className="text-lg sm:text-xl">Ready to watch? Press the button below to create your membership.</p>
              <Link to="/signup">
                <button className="bg-red-600 mt-4 py-3 px-6 rounded text-lg sm:text-xl font-bold">Sign Up Now</button>
              </Link>
            </div>
          </div>
        </div>
        <div className="absolute -bottom-2 w-full h-2 bg-[#232323]"></div>
      </div>
      <div className="relative w-full h-full text-white py-14 sm:py-[4.5rem]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 relative h-full min-h-[auto] w-[90%] xl:w-[80%] m-auto">
          <div className="flex flex-col justify-center text-center lg:text-left">
            <h1 className="text-3xl lg:text-5xl font-black">Enjoy on your TV</h1>
            <p className="text-lg lg:text-2xl mt-4">Watch on Smart TVs, Playstation, Xbox, Chromecast, Apple TV, Blu-ray players, and more.</p>
          </div>
          <div>
            <img
              className="w-full md:w-auto m-auto lg:w-full"
              src="https://assets.nflxext.com/ffe/siteui/acquisition/ourStory/fuji/desktop/tv.png"
              alt="landing-tv-img"
            />
          </div>

        </div>
        <div className="absolute -bottom-2 w-full h-2 bg-[#232323]"></div>
      </div>
      <div className="relative w-full h-full text-white py-14 sm:py-[4.5rem]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 relative h-full min-h-[auto] w-[90%] xl:w-[80%] m-auto text-center">
          <div className="order-2 lg:order-1">
            <div className="relative">
              <img
                className="w-full md:w-auto m-auto lg:w-full"
                src="https://assets.nflxext.com/ffe/siteui/acquisition/ourStory/fuji/desktop/mobile-0819.jpg"
                alt="landing-phone-img"
              />
              <div className="flex items-center absolute left-1/2 bottom-[8%] -translate-x-1/2 py-1 px-[10px] sm:py-2 sm:px-3 
                w-[60%] min-w-[15rem] bg-black border-2 border-white/20 rounded-lg shadow">
                <div className='mr-4'>
                  <img
                    className="h-12 sm:h-16 lg:h-[4.5rem]"
                    src="https://assets.nflxext.com/ffe/siteui/acquisition/ourStory/fuji/desktop/boxshot.png"
                    alt="landing-mini-poster" />
                </div>
                <div className="flex-1 text-left">
                  <p className="font-semibold text-sm lg:text-base">Stranger Things</p>
                  <p className="text-xs lg:text-sm text-[#0071eb]">Dowloading...</p>
                </div>
                <div>
                  <img
                    className="w-12 h-12"
                    src="https://assets.nflxext.com/ffe/siteui/acquisition/ourStory/fuji/desktop/download-icon.gif"
                    alt="landing-icon-gif"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col justify-center text-center lg:text-left order-1 lg:order-2">
            <h1 className="text-3xl lg:text-5xl lg:leading-tight font-black">Download your shows to watch offline</h1>
            <p className="text-lg lg:text-2xl mt-4">Save your favorites easily and always have something to watch.</p>
          </div>
        </div>
        <div className="absolute -bottom-2 w-full h-2 bg-[#232323]"></div>
      </div>
      <div className="relative w-full h-full text-white py-14 sm:py-[4.5rem]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 relative h-full min-h-[auto] w-[90%] xl:w-[80%] m-auto text-center">
          <div className="flex flex-col justify-center text-center lg:text-left">
            <h1 className="text-3xl lg:text-5xl lg:leading-tight font-black">Watch everywhere</h1>
            <p className="text-lg lg:text-2xl mt-4">Stream unlimited movies and TV shows on your phone, tablet, laptop, and TV.</p>
          </div>
          <div>
            <img
              className="w-full md:w-auto m-auto lg:w-full"
              src="https://assets.nflxext.com/ffe/siteui/acquisition/ourStory/fuji/desktop/device-pile-vn.png"
              alt="landing-device-img"
            />
          </div>
        </div>
        <div className="absolute -bottom-2 w-full h-2 bg-[#232323]"></div>
      </div>
      <div className="relative w-full h-full text-white py-14 sm:py-[4.5rem]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 relative h-full min-h-[auto] w-[90%] xl:w-[80%] m-auto text-center">
          <div className="order-2 lg:order-1">
            <div className="relative">
              <img
                className="w-full md:w-auto m-auto lg:w-full"
                src="https://occ-0-395-299.1.nflxso.net/dnm/api/v6/19OhWN2dO19C9txTON9tvTFtefw/AAAABejKYujIIDQciqmGJJ8BtXkYKKTi5jiqexltvN1YmvXYIfX8B9CYwooUSIzOKneblRFthZAFsYLMgKMyNfeHwk16DmEkpIIcb6A3.png?r=f55"
                alt="landing-kids-img"
              />
            </div>
          </div>
          <div className="flex flex-col justify-center text-center lg:text-left order-1 lg:order-2">
            <h1 className="text-3xl lg:text-5xl lg:leading-tight font-black">Create profiles for kids</h1>
            <p className="text-lg lg:text-2xl mt-4">Send kids on adventures with their favorite characters in a space made just for them—free with your membership.</p>
          </div>
        </div>
        <div className="absolute -bottom-2 w-full h-2 bg-[#232323]"></div>
      </div>
      <div className="relative w-full h-full text-white py-14 sm:py-[4.5rem]">
        <div className="flex flex-col justify-center text-center h-full min-h-[auto] w-[90%] xl:w-[80%] m-auto">
          <h1 className="text-3xl lg:text-5xl font-black">Frequently Asked Questions</h1>
          <div className="mt-6">
            <ul className="text-2xl">
              <li className="mb-2">
                <div
                  className="relative flex items-center mb-0.5 bg-[#2d2d2d] hover:bg-[#4e4e4e] ease-out duration-300"
                  onClick={() => clickHandler(1)}
                >
                  <button className="flex justify-between items-center w-full p-6">
                    <span className="text-lg md:text-2xl">What is Netflix?</span>
                    <AiOutlinePlus className={`w-4 h-4 md:w-9 md:h-9 ${rotateIcon(1)}`} />
                  </button>
                </div>
                <div className={`${answerClass} ${toggleAccordion(1)}`}>
                  Netflix is a streaming service that offers a wide variety of award-winning TV shows, movies, anime, documentaries, and more on thousands of internet-connected devices.
                  <br /><br />
                  You can watch as much as you want, whenever you want without a single commercial - all for one low monthly price.
                  There's always something new to discover and new TV shows and movies are added every week!
                </div>
              </li>
              <li className="mb-2">
                <div
                  className="relative flex items-center mb-0.5 bg-[#2d2d2d] hover:bg-[#4e4e4e] ease-out duration-300"
                  onClick={() => clickHandler(2)}
                >
                  <button className="flex justify-between items-center w-full p-6">
                    <span className="text-lg md:text-2xl">How much does Netflix cost?</span>
                    <AiOutlinePlus className={`w-4 h-4 md:w-9 md:h-9 ${rotateIcon(2)}`} />
                  </button>
                </div>
                <div className={`${answerClass} ${toggleAccordion(2)}`}>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus odit vero voluptatibus alias, sunt architecto expedita minus, sed, deserunt doloribus placeat eius cum sit qui sequi quia! Veritatis, soluta laboriosam!
                </div>
              </li>
              <li className="mb-2">
                <div
                  className="relative flex items-center mb-0.5 bg-[#2d2d2d] hover:bg-[#4e4e4e] ease-out duration-300"
                  onClick={() => clickHandler(3)}
                >
                  <button className="flex justify-between items-center w-full p-6">
                    <span className="text-lg md:text-2xl">Where can I watch?</span>
                    <AiOutlinePlus className={`w-4 h-4 md:w-9 md:h-9 ${rotateIcon(3)}`} />
                  </button>
                </div>
                <div className={`${answerClass} ${toggleAccordion(3)}`}>
                  Watch anywhere, anytime. Sign in with your Netflix account to watch instantly on the web at netflix.com from your personal computer or on any internet-connected device that offers the Netflix app, including smart TVs, smartphones, tablets, streaming media players and game consoles.
                  <br /><br />
                  You can also download your favorite shows with the iOS, Android, or Windows 10 app. Use downloads to watch while you're on the go and without an internet connection. Take Netflix with you anywhere.
                </div>
              </li>
              <li className="mb-2">
                <div
                  className="relative flex items-center mb-0.5 bg-[#2d2d2d] hover:bg-[#4e4e4e] ease-out duration-300"
                  onClick={() => clickHandler(4)}
                >
                  <button className="flex justify-between items-center w-full p-6">
                    <span className="text-lg md:text-2xl">How do I cancel?</span>
                    <AiOutlinePlus className={`w-4 h-4 md:w-9 md:h-9 ${rotateIcon(4)}`} />
                  </button>
                </div>
                <div className={`${answerClass} ${toggleAccordion(4)}`}>
                  Netflix is flexible. There are no pesky contracts and no commitments. You can easily cancel your account online in two clicks. There are no cancellation fees - start or stop your account anytime.
                </div>
              </li>
              <li className="mb-2">
                <div
                  className="relative flex items-center mb-0.5 bg-[#2d2d2d] hover:bg-[#4e4e4e] ease-out duration-300"
                  onClick={() => clickHandler(5)}
                >
                  <button className="flex justify-between items-center w-full p-6">
                    <span className="text-lg md:text-2xl">What can I watch on Netflix?</span>
                    <AiOutlinePlus className={`w-4 h-4 md:w-9 md:h-9 ${rotateIcon(5)}`} />
                  </button>
                </div>
                <div className={`${answerClass} ${toggleAccordion(5)}`}>
                  Netflix has an extensive library of feature films, documentaries, TV shows, anime, award-winning Netflix originals, and more. Watch as much as you want, anytime you want.
                </div>
              </li>
              <li className="mb-2">
                <div
                  className="relative flex items-center mb-0.5 bg-[#2d2d2d] hover:bg-[#4e4e4e] ease-out duration-300"
                  onClick={() => clickHandler(6)}
                >
                  <button className="flex justify-between items-center w-full p-6">
                    <span className="text-lg md:text-2xl">Is Netflix good for kids?</span>
                    <AiOutlinePlus className={`w-4 h-4 md:w-9 md:h-9 ${rotateIcon(6)}`} />
                  </button>
                </div>
                <div className={`${answerClass} ${toggleAccordion(6)}`}>
                  The Netflix Kids experience is included in your membership to give parents control while kids enjoy family-friendly TV shows and movies in their own space.
                  <br /><br />
                  Kids profiles come with PIN-protected parental controls that let you restrict the maturity rating of content kids can watch and block specific titles you don't want kids to see.
                </div>
              </li>
            </ul>
            <div className="mt-11">
              <p className="text-lg sm:text-xl">Ready to watch? Press the button below to create your membership.</p>
              <Link to="/signup">
                <button className="bg-red-600 mt-4 py-3 px-6 rounded text-lg sm:text-xl font-bold">Sign Up Now</button>
              </Link>
            </div>
          </div>
        </div>
        <div className="absolute -bottom-2 w-full h-2 bg-[#232323]"></div>
      </div>

      <footer className="p-0 bg-transparent text-white/70">
        <div className="py-5 lg:py-[3.75rem] w-[90%] xl:w-[80%] m-auto">
          <div className="py-3 cursor-pointer underline decoration-1">
            <span>Questions? Contact us.</span>
          </div>
          <div className="py-6 text-sm">
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-3 gap-3">
              <div className="cursor-pointer underline decoration-1">
                <p>FAQ</p>
              </div>
              <div className="cursor-pointer underline decoration-1">
                <p>Help Center</p>
              </div>
              <div className="cursor-pointer underline decoration-1">
                <p>Account</p>
              </div>
              <div className="cursor-pointer underline decoration-1">
                <p>Media Center</p>
              </div>
              <div className="cursor-pointer underline decoration-1">
                <p>Investor Relations</p>
              </div>
              <div className="cursor-pointer underline decoration-1">
                <p>Jobs</p>
              </div>
              <div className="cursor-pointer underline decoration-1">
                <p>Ways to Watch</p>
              </div>
              <div className="cursor-pointer underline decoration-1">
                <p>Terms of Use</p>
              </div>
              <div className="cursor-pointer underline decoration-1">
                <p>Privacy</p>
              </div>
              <div className="cursor-pointer underline decoration-1">
                <p>Cookie Preferences</p>
              </div>
              <div className="cursor-pointer underline decoration-1">
                <p>Corporate Information</p>
              </div>
              <div className="cursor-pointer underline decoration-1">
                <p>Contact Us</p>
              </div>
              <div className="cursor-pointer underline decoration-1">
                <p>Speed Test</p>
              </div>
              <div className="cursor-pointer underline decoration-1">
                <p>Legal Notices</p>
              </div>
              <div className="cursor-pointer underline decoration-1">
                <p>Only on Netflix</p>
              </div>
            </div>
          </div>
          <p className="py-3 text-sm">Netflix Clone - This is not  the official page of Netflix</p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;