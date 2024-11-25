import Button from "./Button";
import { FaArrowLeft } from "react-icons/fa";

interface NavigationButtonsProps {
  formStep: number;
  onPrevious: () => void;
}

const NavigationButtons: React.FC<NavigationButtonsProps> = ({
  formStep,
  onPrevious,
}) => {
  return (
    <div className="flex justify-between mt-4">
      {formStep > 1 && (
        <Button
          onClick={onPrevious}
          className="p-0 bg-transparent hover:bg-transparent focus:outline-none"
        >
          <FaArrowLeft
            className="text-black hover:text-green-500 cursor-pointer mb-6"
            style={{ fontSize: "24px" }}
          />
        </Button>
      )}
    </div>
  );
};

export default NavigationButtons;
