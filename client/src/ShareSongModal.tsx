import * as React from "react";
import {Fragment, useState, useEffect} from "react";
import {Dialog, Transition} from "@headlessui/react";
import {XMarkIcon} from "@heroicons/react/24/outline";
import ReactSearchBox from "react-search-box";
type Props = {
  show: boolean;
  embededUrl: string;
  genres: any;
  genre: string;
  handleSearch: any;
  handleGenreChange: (value: string) => void;
  handleCaptionChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleSharing: () => void;
  error: boolean;
};
/** modal that shows after a song is uploaded to encourage people
 *  to share the link with friends and to their social media
 */
const ShareSongModal: React.FC<Props> = ({
  show,
  embededUrl,
  genres,
  genre,
  handleSearch,
  handleGenreChange,
  handleCaptionChange,
  handleSharing,
  error,
}) => {
  const [open, setOpen] = useState(show);

  useEffect(() => {
    setOpen(show);
  }, [show]);

  const closeModal = () => {
    setOpen(false);
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

        <div className="fixed z-10 w-screen overflow-y-hidden">
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
              <Dialog.Panel className="relative transform md:ml-20 lg:ml-0 w-full h-[630px] max-w-[560px] xl:max-w-xl p-4 bg-white rounded-lg shadow-xl transition-all sm:mx-4 sm:p-6">
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
                <div className="sm:flex relative top-16 lg:top-12 text-center flex-col align-center h-96">
                  <div className="sm:mt-4 sm:flex sm:flex-col sm:items-center sm:justify-center">
                    {/* Add your iframe here with the correct Tailwind CSS height class or inline style */}
                    <iframe
                      className="w-full sm:w-[560px] h-[355px] sm:px-4" // Use Tailwind's arbitrary value syntax for height
                      // or use inline styles as below if the above doesn't work
                      // style={{ height: '560px' }}\
                      // h-[355px] w-full max-w-md md:w-[560px]
                      src={embededUrl}
                      title="YouTube video player"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                    ></iframe>
                  </div>

                  <div className="relative z-10 h-10 w-full max-w-[560px] mt-2">
                    <ReactSearchBox
                      placeholder={
                        genre.length > 0 ? genre : "What's the genre?"
                      }
                      data={genres}
                      onSelect={handleSearch}
                      onChange={handleGenreChange}
                      autoFocus
                    />
                  </div>
                  <input
                    type="text"
                    className="relative z-0 block w-full max-w-[560px] mt-4 rounded-md border-[1px] border-[#cacaca96] py-1.5 pl-5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    placeholder="Caption (optional)"
                    onChange={handleCaptionChange}
                  />
                  <div className="flex justify-start items-start">
                    <button
                      type="button"
                      className="disabled:bg-[lightgrey] disabled:cursor-not-allowed inline-flex w-1/4 my-4 justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-[#5d5dff] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                      onClick={() => {
                        handleSharing();
                        setOpen(false);
                      }}
                      disabled={genre === "" || error}
                    >
                      Share
                    </button>
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
export default ShareSongModal;
