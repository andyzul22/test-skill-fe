"use client";

import { useEffect, useState } from "react";
import { deleteListCars, getListCars } from "./api";
import Image from "next/image";
import { ImageOff } from "lucide-react";
import ModalListCars from "./modals";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface Car {
  id: number;
  name: string;
  day_rate: number;
  month_rate: number;
  image: string;
}

export default function ListCars() {
  const [listCars, setListCars] = useState<Car[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCar, setSelectedCar] = useState<Car | string>("");

  const fetchCars = async () => {
    const data = await getListCars();
    setListCars(data);
  };

  useEffect(() => {
    fetchCars();
  }, []);

  const handleDeleteCar = async (id: string) => {
    deleteListCars(id);
    fetchCars();
  };
  return (
    <div className="w-full flex flex-col items-center justify-center gap-3.5">
      <h1>List Cars</h1>
      <p>This is the list of cars.</p>
      <Button
        onClick={() => {
          setIsOpen(true);
          setSelectedCar("");
        }}
      >
        Add Car
      </Button>
      <Link href={"/orders"}>Go to List Order</Link>
      <ModalListCars
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        fetchCars={fetchCars}
        selectedCar={
          typeof selectedCar === "string"
            ? selectedCar
            : selectedCar?.id.toString() ?? ""
        }
      />
      <table className="p-6">
        <thead>
          <tr>
            <th className="border px-4 py-2">No</th>
            <th className="border px-4 py-2">ID</th>
            <th className="border px-4 py-2">Name</th>
            <th className="border px-4 py-2">Day Rate</th>
            <th className="border px-4 py-2">Month Rate</th>
            <th className="border px-4 py-2">Image</th>
            <th className="border px-4 py-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {listCars.map((car, index) => {
            return (
              <tr key={car.id}>
                <td className="border px-4 py-2">{index + 1}</td>
                <td className="border px-4 py-2">{car.id}</td>
                <td className="border px-4 py-2">{car.name || "-"}</td>
                <td className="border px-4 py-2">{car.day_rate}</td>
                <td className="border px-4 py-2">{car.month_rate}</td>
                <td className="border px-4 py-2 flex justify-center items-center">
                  {typeof car.image === "string" &&
                  car.image?.includes("https") ? (
                    <Image
                      src={car.image}
                      alt={car.name || "Car Image"}
                      width={100}
                      height={50}
                    />
                  ) : (
                    <ImageOff />
                  )}
                </td>
                <td className="border p-2 ">
                  <>
                    <button
                      className="bg-blue-500 text-white p-2 rounded w-24 mr-2.5"
                      onClick={() => {
                        setIsOpen(true);
                        setSelectedCar(car.id.toString());
                      }}
                    >
                      Edit
                    </button>
                    <button
                      className="bg-red-500 text-white p-2 rounded  w-24"
                      onClick={() => {
                        handleDeleteCar(car.id.toString());
                        fetchCars();
                      }}
                    >
                      Delete
                    </button>
                  </>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
