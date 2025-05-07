export const getListOrders = async () => {
  try {
    const response: Response = await fetch(
      "https://67037f39bd7c8c1ccd41a62e.mockapi.io/rent-car/api/v1/orders",
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

export const getDetailListOrders = async (id: string) => {
  try {
    const response: Response = await fetch(
      `https://67037f39bd7c8c1ccd41a62e.mockapi.io/rent-car/api/v1/orders/${id}`,
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

interface PostOrder {
  car_id: string;
  order_date: string;
  pickup_date: string;
  dropoff_date: string;
  pickup_location: string;
  dropoff_location: string;
  image: string;
  month_rate: string;
  day_rate: string;
}

export const postOrder = async (data: PostOrder) => {
  try {
    const response: Response = await fetch(
      "https://67037f39bd7c8c1ccd41a62e.mockapi.io/rent-car/api/v1/orders",
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

export const putListOrder = async (data: PostOrder, id: string) => {
  try {
    const response: Response = await fetch(
      `https://67037f39bd7c8c1ccd41a62e.mockapi.io/rent-car/api/v1/orders/${id}`,
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

export const deleteListOrder = async (id: string) => {
  try {
    const response: Response = await fetch(
      `https://67037f39bd7c8c1ccd41a62e.mockapi.io/rent-car/api/v1/orders/${id}`,
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
