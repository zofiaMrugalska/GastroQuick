import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { MealServices } from "../../services/MealServices";
import { menuInterface, responseMealInterface } from "../../interfaces/MenuInterfaces";
import { BsCartPlus } from "react-icons/bs";

const Menu = () => {
  const [mainMenu, setMainMenu] = useState<menuInterface[]>([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const response: responseMealInterface = await MealServices.getMealsData();
        setMainMenu(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, []);

  return (
    <div
      className="grid grid-cols-1
    sm:grid-cols-2 xl:grid-cols-3 "
    >
      {/* <p data-testid="test">testowe </p> */}

      {mainMenu.map((meal: menuInterface) => {
        return (
          <div key={meal._id} className="p-7 flex justify-center ">
            <Link to={`/meal/${meal.name}/${meal._id}`} className="">
              <li className=" max-w-[350px] max-h-[350px] p-6 flex flex-col place-items-center border-[1px] rounded-2xl shadow-inner md:shadow md:inset md:ml-5 md:mt-8 md:mr-27 md:mb-19 hover:bg-[#bbbbbb23]">
                <div className="flex flex-row-reverse items-center gap-2">
                  <p data-testid="name">{meal.name}</p>
                  {/* <p data-testid="testOne">test1</p> */}
                </div>

                <p>{meal.price}$</p>
                <p>{meal.description}</p>
                <img
                  src={meal.jpg}
                  alt="photo of the meal"
                  className=" mt-2  min-h-[100px] min-w-[100px] max-h-[100px] max-w-[100px] md:min-h-[150px] md:min-w-[150px] md:max-h-[150px] md:max-w-[150px] object-cover"
                />
              </li>
            </Link>
          </div>
        );
      })}
    </div>
  );
};
export default Menu;
