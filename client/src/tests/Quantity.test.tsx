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

// test("reduceQuantity powinno zmniejszyć ilość", async () => {
//   const poczatkowaIlosc = 3; // Ustaw początkową ilość na potrzeby testu

//   const { getByTestId } = render(<AddToCart oneMeal={oneMeal} />);

//   console.log(poczatkowaIlosc, "XD");
//   // Sprawdź, czy ilość początkowa jest poprawnie wyświetlana
//   let quantityDisplay = getByTestId("quantityDisplay");
//   console.log(quantityDisplay.textContent);

//   expect(quantityDisplay).toHaveTextContent("2");
//   console.log(quantityDisplay.textContent);

//   // Pobierz przycisk redukcji i kliknij go
//   const reduceButton = getByTestId("reduceButton");
//   fireEvent.click(reduceButton);

//   // Sprawdź, czy ilość została zmniejszona
//   expect(quantityDisplay).toHaveTextContent((poczatkowaIlosc - 1).toString());
// });

// // test("reduceQuantity should not decrease the quantity below 1", () => {
// //   const { getByTestId } = render(<AddToCart oneMeal={oneMeal} />);
// //   const reduceButton = getByTestId("reduceButton");

// //   fireEvent.click(reduceButton);
// //   fireEvent.click(reduceButton);

// //   expect(getByTestId("quantityDisplay")).toHaveTextContent("1");
// // });
