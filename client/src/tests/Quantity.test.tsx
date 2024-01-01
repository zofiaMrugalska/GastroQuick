import { render, fireEvent, waitFor } from "@testing-library/react";
import { menuInterface } from "../interfaces/MenuInterfaces";
import AddToCart from "../pages/order/AddToCart";

const oneMeal: menuInterface = {
  _id: "123",
  name: "Meal",
  price: 13,
  description: "delicious meal",
  jpg: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT9ipzwhPbzW66MPDVBL3B9qGSsZfI-8SFTxA&usqp=CAU",
};

test("increaseQuantity should increase the quantity", () => {
  const { getByTestId } = render(<AddToCart oneMeal={oneMeal} />);

  const increaseButton = getByTestId("increaseButton");

  fireEvent.click(increaseButton);

  expect(getByTestId("quantityDisplay")).toHaveTextContent("2");

  fireEvent.click(increaseButton);

  expect(getByTestId("quantityDisplay")).toHaveTextContent("3");
});
