import * as React from "react";
import {Fragment, useState, useEffect} from "react";
import {Dialog, Transition} from "@headlessui/react";
import {XMarkIcon} from "@heroicons/react/24/outline";
import {DocumentDuplicateIcon} from "@heroicons/react/24/outline";
import bird from "./assets/twitter.png";
import iMessage from "./assets/iMessage.svg";
import checkBadge from "./assets/checkBadge.svg";
import {CopyToClipboard} from "react-copy-to-clipboard";
type Props = {
  show: boolean;
  tweet: string;
  shareUrl: string;
};
/** modal that shows after a song is uploaded to encourage people
 *  to share the link with friends and to their social media
 */
const ShareModal: React.FC<Props> = ({show, tweet, shareUrl}) => {
  const [open, setOpen] = useState(show);
  const [copied, setCopied] = useState(false);
  const share = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          url: shareUrl,
          title: "Share song",
        });
      } else {
        navigator.clipboard.writeText(shareUrl);
      }
    } catch (err) {
      if (err instanceof Error) {
        console.log(err.message);
      }
    }
    setOpen(false);
  };
  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
      setOpen(false);
    }, 2500);
  };

  useEffect(() => {
    setOpen(show);
  }, [show]);
  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 flex items-center justify-center z-10"
        onClose={setOpen}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="absolute inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform md:ml-20 lg:ml-0 w-full max-w-md xl:max-w-xl p-4 bg-white rounded-lg shadow-xl transition-all sm:mx-4 sm:p-6">
                <div className="absolute right-0 top-0 pr-4 pt-4 sm:block">
                  <button
                    type="button"
                    className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    onClick={() => setOpen(false)}
                  >
                    <span className="sr-only">Close</span>
                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>
                <div className="sm:flex text-center flex-col items-center align-center h-96">
                  <div className="mt-6 text-center flex-col space-y-10 sm:ml-4 sm:text-left">
                    <div>
                      <Dialog.Title
                        as="h3"
                        className="text-xl font-bold tracking-tight text-gray-900"
                      >
                        Remind your friends how great your music taste is
                      </Dialog.Title>
                      <p className="mt-1 text-sm sm:text-base font-semibold text-gray-600">
                        share the song in your group chat or on social
                        platforms.
                      </p>
                    </div>
                    <div>
                      <div className="flex flex-row mt-2 justify-center lg:mb-6">
                        <div className="flex flex-col items-center mr-2 lg:hidden">
                          <img
                            className="relative bottom-1.5"
                            onClick={share}
                            src={iMessage}
                            alt="iMesasge icon"
                          />
                          <div className="text-[#9ca3af] font-semibold text-sm font-sans relative bottom-3">
                            Message
                          </div>
                        </div>

                        <div className="flex flex-col items-center mr-2">
                          <div onClick={() => setOpen(false)}>
                            <a
                              href={tweet}
                              data-size="large"
                              target="_blank"
                              rel="noreferrer"
                              className="inline-flex items-center justify-center bg-[#1da1f2] hover:bg-blue-400 text-white h-9 rounded-lg px-3 py-1.5 border-0 no-underline font-sans text-sm whitespace-nowrap"
                            >
                              <img src={bird} className="w-5" alt="Tweet" />
                            </a>
                          </div>
                          <div className="text-[#9ca3af] font-semibold text-sm font-sans">
                            Twitter
                          </div>
                        </div>

                        <CopyToClipboard text={shareUrl}>
                          <div className="flex flex-col items-center mr-2">
                            <div
                              className="ml-1.5 w-11 h-9 bg-slate-200 rounded-md items-center justify-center flex flex-col  hover:cursor-pointer"
                              onClick={handleCopy}
                            >
                              <DocumentDuplicateIcon
                                className="h-6 w-6"
                                aria-hidden="true"
                              />
                            </div>
                            <div className="text-[#9ca3af] font-semibold text-sm font-sans">
                              Copy
                            </div>
                          </div>
                        </CopyToClipboard>
                      </div>
                      {copied && (
                        <div className="flex flex-row mt-2">
                          <img
                            alt="checkBadge"
                            src={checkBadge}
                            className="h-6 w-5 flex-none"
                          />
                          <span className="ml-0.5">copied to clipboard</span>
                        </div>
                      )}
                      <p className="mt-2 text-sm md:text-md items-center flex flex-col font-semibold text-gray-600">
                        thank you for sharing your great music
                      </p>
                    </div>
                    <div className="mt-5 sm:mt-6">
                      <button
                        type="button"
                        className="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-[#5d5dff] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        onClick={() => setOpen(false)}
                      >
                        Continue discovering music
                      </button>
                    </div>
                  </div>
                </div>
                <div className="mt-5 sm:mt-4 sm:flex flex-row"></div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};
export default ShareModal;
