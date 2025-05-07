import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import FormAdd from "./form-add";
import { postListCars, putListCars } from "./api";

interface DrawerListCarsProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  selectedCar?: string | null;
  fetchCars?: () => void;
}

export default function ModalListCars({
  isOpen,
  setIsOpen,
  selectedCar,
  fetchCars,
}: DrawerListCarsProps) {
  const handleSubmitForm = async (data: {
    name: string;
    day_rate: number;
    month_rate: number;
    image: string;
  }) => {
    const carData = {
      name: data.name,
      day_rate: data.day_rate,
      month_rate: data.month_rate,
      image: data.image,
    };

    if (selectedCar) {
      putListCars(carData, selectedCar)
        .then(() => {
          setIsOpen(false);
          if (fetchCars) {
            fetchCars();
          }
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    } else {
      postListCars(carData)
        .then(() => {
          setIsOpen(false);
          if (fetchCars) {
            fetchCars();
          }
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  };
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{selectedCar ? "Edit Cars" : "Add Cars"}</DialogTitle>
          <DialogDescription>
            You can add cars here. Please fill in the form below.
          </DialogDescription>
        </DialogHeader>
        <FormAdd addForm={handleSubmitForm} id={selectedCar ?? ""} />
      </DialogContent>
    </Dialog>
  );
}
