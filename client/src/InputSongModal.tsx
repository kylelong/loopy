import * as React from "react";
import {Fragment, useState, useEffect} from "react";
import {Dialog, Transition} from "@headlessui/react";
import {XMarkIcon} from "@heroicons/react/24/outline";
import {ExclamationTriangleIcon} from "@heroicons/react/20/solid";
import spotify from "./assets/spotify.png";
import youtube from "./assets/youtube.jpeg";
type Props = {
  show: boolean;
  onClose: () => void;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDown: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  value: string;
  processUrl: () => void;
  errors: string[];
};
/** modal that shows after a song is uploaded to encourage people
 *  to share the link with friends and to their social media
 */
const InputSongModal: React.FC<Props> = ({
  show,
  onClose,
  onChange,
  onKeyDown,
  value,
  processUrl,
  errors,
}) => {
  const [open, setOpen] = useState(show);

  useEffect(() => {
    setOpen(show);
  }, [show]);

  const closeModal = () => {
    setOpen(false);
    onClose(); // Call the onClose callback
  };

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 flex items-center justify-center z-10"
        onClose={closeModal}
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
                    onClick={closeModal}
                  >
                    <span className="sr-only">Close</span>
                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>
                <div className="sm:flex relative top-2 lg:top-4 text-center flex-col items-center align-center h-96">
                  <div className="mt-6 flex-col space-y-10 sm:ml-4 sm:text-left">
                    <div>
                      <Dialog.Title
                        as="h3"
                        className="text-xl font-bold tracking-tight text-gray-900"
                      >
                        Share a song
                      </Dialog.Title>
                      <p className="mt-1 text-sm sm:text-base font-semibold text-gray-600">
                        share a song that is a favorite of yours &#128522;
                      </p>
                    </div>
                    <div>
                      <label
                        htmlFor="company-website"
                        className="block text-sm sm:text-base font-medium leading-6 text-gray-900"
                      >
                        Enter a link from Spotify or Youtube
                      </label>
                      <div className="relative mt-2 rounded-md shadow-sm">
                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                          <img
                            src={spotify}
                            alt="spotify"
                            className="w-5 h-5 mr-1.5"
                          />
                          <img
                            src={youtube}
                            alt="youtube"
                            className="w-6 h-5"
                          />
                        </div>
                        <input
                          type="text"
                          name="url"
                          id="url"
                          value={value}
                          onChange={onChange}
                          onKeyDown={onKeyDown}
                          className="block w-full rounded-md border-2 border-indigo-300  py-1.5 pl-20 text-gray-900 ring-1 ring-inset ring-gray-100 placeholder:text-gray-400 focus:ring-2 focus:ring-inset  sm:text-sm sm:leading-6"
                          placeholder="https://spotify.link/bCj45cg67Cb"
                        />
                      </div>
                    </div>

                    <div className="">
                      <button
                        type="button"
                        className="inline-flex w-full relative bottom-3.5 justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-[#5d5dff] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        onClick={processUrl}
                      >
                        Search
                      </button>
                    </div>
                    {errors && errors.length > 0 && (
                      <div className="border-l-4 relative bottom-6 border-yellow-400 bg-yellow-50 p-4">
                        <div className="flex">
                          <div className="flex-shrink-0">
                            <ExclamationTriangleIcon
                              className="h-5 w-5 text-yellow-400"
                              aria-hidden="true"
                            />
                          </div>
                          <div className="ml-3">
                            <p className="text-sm text-yellow-700">
                              {errors[0]}
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
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
export default InputSongModal;
