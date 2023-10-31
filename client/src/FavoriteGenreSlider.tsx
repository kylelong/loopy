import {useState} from "react";
import {Switch} from "@headlessui/react";
import star from "./assets/star.svg";

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}
type Props = {
  toggle: any;
};
const FavoriteGenreSlider: React.FC<Props> = ({toggle}) => {
  const [enabled, setEnabled] = useState(false);

  return (
    <Switch.Group as="div" className="flex items-center">
      <Switch
        checked={enabled}
        onChange={() => {
          setEnabled(!enabled);
          toggle();
        }}
        className={classNames(
          enabled ? "bg-indigo-600" : "bg-gray-200",
          "relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2"
        )}
      >
        <span
          aria-hidden="true"
          className={classNames(
            enabled ? "translate-x-5" : "translate-x-0",
            "pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out"
          )}
        />
      </Switch>
      <Switch.Label as="span" className="ml-3 text-sm">
        <div className="flex flex-row">
          <img src={star} alt="star" className="mr-1 w-5" />
          <span className="text-base text-gray-900">Favorite Genre</span>{" "}
        </div>
      </Switch.Label>
    </Switch.Group>
  );
};

export default FavoriteGenreSlider;
