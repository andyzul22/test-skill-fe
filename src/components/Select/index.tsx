import * as React from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface selectItemsProps {
  data: Car[];
  placeholder: string;
  label: string;
}

interface Car {
  id: string;
  name: string;
  image: string;
  month_rate: string;
  day_rate: string;
}

export function SelectInput({ data, placeholder, label }: selectItemsProps) {
  return (
    <Select>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>{label}</SelectLabel>
          {data.map((item, index) => (
            <SelectItem key={index} value={item.id}>
              {item.name}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
