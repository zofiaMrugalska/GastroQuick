import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { MealServices } from "../../services/mealServices/Meal";

interface menuInterface {
  _id: number;
  name: string;
  price: number;
  description: string;
  jpg: string;
}
//do interfejsow
const Menu = () => {
  const [mainMenu, setMainMenu] = useState<menuInterface[]>([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await MealServices.getMealsData();
        setMainMenu(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    getData(); //popraw to
  }, []);

  return (
    <div className="grid grid-cols-3">
      {mainMenu.map((meal) => {
        return (
          <div key={meal._id} className="p-7 ">
            <Link to={`/meal/${meal.name}/${meal._id}`}>
              <li className=" p-6 flex flex-col place-items-center border-[1px] rounded-2xl shadow-inner md:shadow md:inset md:ml-5 md:mt-8 md:mr-27 md:mb-19 hover:bg-[#bbbbbb23]">
                <p>{meal.name}</p>
                <p>{meal.price}$</p>
                <p>{meal.description}</p>
                <img src={meal.jpg} alt="photo of the meal" />
              </li>
            </Link>
          </div>
        );
      })}
    </div>
  );
};
export default Menu;
