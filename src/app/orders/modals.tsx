import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { DialogDescription } from "@radix-ui/react-dialog";
import FormOrder from "./form-order";
import { postOrder, putListOrder } from "./api";

interface ModalListOrdersProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  selectedOrder?: string | null;
  fetchOrders?: () => void;
}

interface PostOrder {
  car_id: string;
  car_name: string;
  order_date: string;
  pickup_date: string;
  dropoff_date: string;
  pickup_location: string;
  dropoff_location: string;
  image: string;
  month_rate: string;
  day_rate: string;
}

export default function ModalListOrders({
  isOpen,
  setIsOpen,
  selectedOrder,
  fetchOrders,
}: ModalListOrdersProps) {
  const handleSubmitForm = async (data: PostOrder) => {
    const orderData = {
      car_name: data.car_name,
      car_id: data.car_id,
      order_date: data.order_date,
      pickup_date: data.pickup_date,
      dropoff_date: data.dropoff_date,
      pickup_location: data.pickup_location,
      dropoff_location: data.dropoff_location,
      day_rate: data.day_rate,
      month_rate: data.month_rate,
      image: data.image,
    };

    if (selectedOrder) {
      putListOrder(orderData, selectedOrder)
        .then(() => {
          setIsOpen(false);
          if (fetchOrders) {
            fetchOrders();
          }
        })
        .catch((error: string) => {
          console.error("Error:", error);
        });
    } else {
      postOrder(orderData)
        .then(() => {
          setIsOpen(false);
          if (fetchOrders) {
            fetchOrders();
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
          <DialogTitle>
            {selectedOrder ? "Edit Order" : "Add Order"}
          </DialogTitle>
          <DialogDescription>
            {`You can ${
              selectedOrder ? "edit" : "add"
            } order here. Please fill in the form below.`}
          </DialogDescription>
        </DialogHeader>
        <FormOrder formSubmit={handleSubmitForm} id={selectedOrder || ""} />
      </DialogContent>
    </Dialog>
  );
}
