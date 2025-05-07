"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { getDetailListCars } from "./api";

interface FormAddProps {
  addForm: (data: {
    name: string;
    day_rate: number;
    month_rate: number;
    image: string;
  }) => void;
  id?: string;
}

export default function FormAdd({ addForm, id }: FormAddProps) {
  const [isLoading, setIsLoading] = useState(false);
  const { register, handleSubmit, setValue, formState } = useForm({
    defaultValues: {
      name: "",
      day_rate: 0,
      month_rate: 0,
      image: "",
    },
  });

  useEffect(() => {
    if (id) {
      setIsLoading(true);
      getDetailListCars(id)
        .then((response) => {
          setValue("name", response.name);
          setValue("day_rate", response.day_rate);
          setValue("month_rate", response.month_rate);
          setValue("image", response.image);
          setIsLoading(false);
        })
        .catch((error) => {
          console.error("Error:", error);
          setIsLoading(false);
        });
    }
  }, [id, setValue]);

  return (
    <div className="w-full flex flex-col items-center justify-center gap-3.5">
      <form className="flex flex-col gap-4" onSubmit={handleSubmit(addForm)}>
        <input
          type="text"
          placeholder="Car Name"
          className="border p-2"
          {...register("name")}
          disabled={isLoading}
        />
        <input
          type="number"
          placeholder="Day Rate"
          className="border p-2"
          {...register("day_rate")}
          disabled={isLoading}
        />
        <input
          type="number"
          placeholder="Month Rate"
          className="border p-2"
          {...register("month_rate")}
          disabled={isLoading}
        />
        <input
          type="text"
          className="border p-2"
          {...register("image")}
          disabled={isLoading}
        />
        <button
          type="submit"
          className="bg-blue-500 text-white p-2"
          disabled={isLoading || formState.isSubmitting || !formState.isDirty}
        >
          Add Car
        </button>
      </form>
    </div>
  );
}
