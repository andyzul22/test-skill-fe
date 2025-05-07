"use client";

import { useEffect, useState } from "react";
import { deleteListOrder, getListOrders } from "./api";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ImageOff } from "lucide-react";
import ModalListOrders from "./modals";
import Link from "next/link";

interface Order {
  car_id: string;
  car_name: string;
  order_date: string;
  pickup_date: string;
  dropoff_date: string;
  pickup_location: string;
  dropoff_location: string;
  id: string;
  name: string;
  image: string;
  month_rate: string;
  day_rate: string;
}

export default function Orders() {
  const [listOrders, setListOrders] = useState<Order[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<Order | string>("");

  const fetchData = async () => {
    const response = await getListOrders();
    setListOrders(response);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDeleteOrder = async (id: string) => {
    deleteListOrder(id);
    fetchData();
  };

  return (
    <div className=" flex flex-col items-center justify-center gap-3. w-fit p-10 gap-8">
      <h1>Orders</h1>
      <p>This is the list of orders.</p>
      <Button
        onClick={() => {
          setIsOpen(true);
          setSelectedOrder("");
        }}
      >
        Add Order
      </Button>
      <Link href="/">Back To List Cars</Link>
      <ModalListOrders
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        selectedOrder={selectedOrder.toString() || ""}
        fetchOrders={fetchData}
      />
      <table className="p-40 w-full">
        <thead>
          <tr>
            <th className="border px-4 py-2">No</th>
            <th className="border px-4 py-2">Car ID</th>
            <th className="border px-4 py-2">Car Name</th>
            <th className="border px-4 py-2">Order Date</th>
            <th className="border px-4 py-2">Pickup Date</th>
            <th className="border px-4 py-2">Dropoff Date</th>
            <th className="border px-4 py-2">Pickup Location</th>
            <th className="border px-4 py-2">Dropoff Location</th>
            <th className="border px-4 py-2">image</th>
            <th className="border px-4 py-2">month_rate</th>
            <th className="border px-4 py-2">day_rate</th>
            <th className="border px-4 py-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {listOrders.map((order, i) => (
            <tr key={order.id}>
              <td className="border px-4 py-2">{i + 1}</td>
              <td className="border px-4 py-2">{order.car_id}</td>
              <td className="border px-4 py-2">{order.car_name}</td>
              <td className="border px-4 py-2">{order.order_date}</td>
              <td className="border px-4 py-2">{order.pickup_date}</td>
              <td className="border px-4 py-2">{order.dropoff_date}</td>
              <td className="border px-4 py-2">{order.pickup_location}</td>
              <td className="border px-4 py-2">{order.dropoff_location}</td>
              <td className="border px-4 py-2 flex justify-center items-center h-full">
                {typeof order.image === "string" &&
                order.image?.includes("https") ? (
                  <Image
                    src={order.image}
                    alt={order.name || "Car Image"}
                    width={100}
                    height={50}
                  />
                ) : (
                  <ImageOff width={"100%"} height={"100%"} />
                )}
              </td>
              <td className="border px-4 py-2">{order.day_rate}</td>
              <td className="border px-4 py-2">{order.month_rate}</td>
              <td className="border px-4 py-2">
                <div className="flex justify-center items-center gap-2 p-2">
                  <Button
                    className="w-24 text-center bg-blue-500"
                    onClick={() => {
                      setIsOpen(true);
                      setSelectedOrder(order.id);
                    }}
                  >
                    Edit
                  </Button>
                  <Button
                    className="w-24 text-center bg-red-500"
                    onClick={() => handleDeleteOrder(order.id)}
                  >
                    Delete
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
