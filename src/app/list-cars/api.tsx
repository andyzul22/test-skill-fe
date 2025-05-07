export const getListCars = async () => {
  try {
    const response: Response = await fetch(
      "https://67037f39bd7c8c1ccd41a62e.mockapi.io/rent-car/api/v1/cars",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
};

interface CarData {
  name: string;
  day_rate: number;
  month_rate: number;
  image: string;
  // Add other fields as needed
}

export const postListCars = async (data: CarData) => {
  try {
    const response: Response = await fetch(
      "https://67037f39bd7c8c1ccd41a62e.mockapi.io/rent-car/api/v1/cars",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
};

export const getDetailListCars = async (id: string) => {
  try {
    const response: Response = await fetch(
      `https://67037f39bd7c8c1ccd41a62e.mockapi.io/rent-car/api/v1/cars/${id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
};

export const putListCars = async (data: CarData, id: string) => {
  try {
    const response: Response = await fetch(
      `https://67037f39bd7c8c1ccd41a62e.mockapi.io/rent-car/api/v1/cars/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
};

export const deleteListCars = async (id: string) => {
  try {
    const response: Response = await fetch(
      `https://67037f39bd7c8c1ccd41a62e.mockapi.io/rent-car/api/v1/cars/${id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
};
