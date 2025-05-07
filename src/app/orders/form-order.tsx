"use client";

import { useEffect, useState } from "react";
import { getListCars } from "../list-cars/api";
import { useForm } from "react-hook-form";
import { getDetailListOrders } from "./api";

interface Car {
  id: string;
  name: string;
  image: string;
  month_rate: string;
  day_rate: string;
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

interface FormOrderProps {
  formSubmit: (data: PostOrder) => void;
  id?: string;
}

export default function FormOrder({ formSubmit, id }: FormOrderProps) {
  const [listCars, setListCars] = useState<Car[] | null>(null);

  const { register, setValue, handleSubmit } = useForm({
    defaultValues: {
      car_id: "",
      car_name: "",
      order_date: "",
      pickup_date: "",
      dropoff_date: "",
      pickup_location: "",
      dropoff_location: "",
      day_rate: "",
      month_rate: "",
      image: "",
    },
  });

  const fetchCars = async () => {
    const response = await getListCars();
    setListCars(response);
  };

  useEffect(() => {
    fetchCars();
  }, []);

  useEffect(() => {
    if (id) {
      getDetailListOrders(id)
        .then((response) => {
          setValue("car_id", response.car_id);
          setValue("car_name", response.car_name);
          setValue("order_date", response.order_date);
          setValue("pickup_date", response.pickup_date);
          setValue("dropoff_date", response.dropoff_date);
          setValue("pickup_location", response.pickup_location);
          setValue("dropoff_location", response.dropoff_location);
          setValue("pickup_location", response.pickup_location);
          setValue("day_rate", response.day_rate);
          setValue("month_rate", response.month_rate);
          setValue("image", response.image);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  }, [id, setValue]);

  return (
    <form
      onSubmit={handleSubmit(formSubmit)}
      className="w-full flex flex-col gap-3"
    >
      <div className="flex flex-col gap-4">
        <select
          className="border-2 p-2"
          {...register("car_id", {
            onChange: (e: React.ChangeEvent<HTMLSelectElement>) => {
              setValue("car_id", e.target.value);
              setValue(
                "car_name",
                e.target.selectedOptions[0].getAttribute("data-name") || ""
              );
            },
          })}
        >
          {listCars?.map((item: Car) => (
            <option key={item.id} value={item.id} data-name={item.name}>
              {item.name}
            </option>
          ))}
        </select>
        <input
          className="border-2 p-2"
          type="date"
          {...register("order_date")}
          placeholder="Order Date"
        />
        <input
          className="border-2 p-2"
          type="date"
          {...register("pickup_date")}
          placeholder="Pickup Date"
        />
        <input
          className="border-2 p-2"
          type="date"
          {...register("dropoff_date")}
          placeholder="Dropoff Date"
        />
        <input
          className="border-2 p-2"
          type="input"
          {...register("pickup_location")}
          placeholder="Pickup Location"
        />

        <input
          className="border-2 p-2"
          type="input"
          {...register("dropoff_location")}
          placeholder="Dropoff Location"
        />
        <input
          type="number"
          placeholder="Day Rate"
          className="border p-2"
          {...register("day_rate")}
        />
        <input
          type="number"
          placeholder="Month Rate"
          className="border p-2"
          {...register("month_rate")}
        />
        <input
          type="text"
          className="border p-2"
          {...register("image")}
          placeholder="Masukan Link Image"
        />
        <button type="submit" className="bg-blue-500 text-white p-2">
          Add Order
        </button>
      </div>
    </form>
  );
}
