import { useState } from "react";
import { Link } from "react-router-dom";

interface menuInterface {
  id: number;
  meal: string;
  price: number;
  description: string;
  linkToImg: string;
}

const Menu = () => {
  const [mainMenu, setMainMenu] = useState<menuInterface[]>([
    {
      id: 1,
      meal: "pizza",
      price: 12,
      description: " good pizza with cheese and mushrooms",
      linkToImg:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTIibPbOeDQQscm9g-fDNdCvROokQJukg8nYQ&usqp=CAU",
    },
    {
      id: 2,
      meal: "laznia",
      price: 13.5,
      description: " good laznia with a lot of cheese",
      linkToImg:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1-akwUeImUcmM3fco11-gEr0mHvIYb9Ckzg&usqp=CAU",
    },
    {
      id: 3,
      meal: "pasta",
      price: 10,
      description: "delicious italiano pasta",
      linkToImg:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRu4Qu_uXnlX6hm8qTK2bkyQMLUC8HUKswcMQ&usqp=CAU",
    },
  ]);

  return (
    <div>
      {mainMenu.map((meal) => {
        return (
          <div key={meal.id}>
            <Link to={`/meal/${meal.meal}/${meal.id}`}>
              <li className=" p-6 flex flex-col place-items-center border-[1px] rounded-2xl shadow-inner md:shadow md:inset md:ml-5 md:mt-8 md:mr-27 md:mb-19 hover:bg-[#bbbbbb23]">
                <p>{meal.meal}</p>
                <p>{meal.price}$</p>
                <p>{meal.description}</p>
                <img src={meal.linkToImg} alt="photo of the meal" />
              </li>
            </Link>
          </div>
        );
      })}
    </div>
  );
};
export default Menu;
