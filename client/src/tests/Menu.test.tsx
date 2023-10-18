import { getByText, render, waitFor, screen, getByTestId, act } from "@testing-library/react";
import { menuInterface } from "../interfaces/MenuInterfaces";
import Menu from "../pages/home/Menu";
import { MealServices } from "../services/MealServices";

// jest.mock("../services/MealServices");
// it("asddasasddsa", async () => {
//   const mockResults: menuInterface[] = [
//     {
//       _id: "1",
//       name: "Danie",
//       price: 10,
//       description: "Opis dania 1",
//       jpg: "url_do_obrazka1.jpg",
//     },
//   ];

//   (MealServices.getMealsData as jest.Mock).mockResolvedValue({
//     data: mockResults,
//   });

//   const test = await screen.findByTestId("test");
// });

jest.mock("../services/MealServices");
it("asddasasddsa", async () => {
  const mockResults: menuInterface[] = [
    {
      _id: "1",
      name: "Danie",
      price: 10,
      description: "Opis dania 1",
      jpg: "url_do_obrazka1.jpg",
    },
  ];
  (MealServices.getMealsData as jest.Mock).mockResolvedValue({
    data: mockResults,
  });

  render(<Menu />);

  const test = await screen.findByTestId("test");
  expect(test).toHaveTextContent("testowe");

  await waitFor(
    () => {
      const testOne = screen.findByTestId("testOne");
      const mealTest = screen.findByTestId("name");

      expect(testOne).toHaveTextContent("test1");
    },
    { timeout: 5000 }
  ); // Zwiększenie czasu oczekiwania na 5 sekund
});

// test("renders Menu component", () => {
//   const { getByText } = render(<Menu />);
//   const menuElement = getByText("test");
//   expect(menuElement).toBeInTheDocument();
// });
