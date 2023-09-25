import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { MealServices } from "../../services/MealServices";
import { menuInterface } from "../../interfaces/MenuInterfaces";
import { BsCartPlus } from "react-icons/bs";

const Menu = () => {
  const [mainMenu, setMainMenu] = useState<menuInterface[]>([]);

  console.log(mainMenu);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await MealServices.getMealsData();
        setMainMenu(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, []);

  return (
    <div className="grid grid-cols-3">
      {mainMenu.map((meal) => {
        return (
          <div key={meal._id} className="p-7 ">
            <Link to={`/meal/${meal.name}/${meal._id}`} className="">
              <li className=" max-w-[350px] max-h-[350px]  p-6 flex flex-col place-items-center border-[1px] rounded-2xl shadow-inner md:shadow md:inset md:ml-5 md:mt-8 md:mr-27 md:mb-19 hover:bg-[#bbbbbb23]">
                <div className="flex flex-row-reverse items-center gap-2">
                  <button className=" bg-[#bbbbbb6e] p-1 rounded-full border-[1px] border-black">
                    <BsCartPlus size={20} />
                  </button>
                  <p>{meal.name}</p>
                </div>

                <p>{meal.price}$</p>
                <p>{meal.description}</p>
                <img
                  src={meal.jpg}
                  alt="photo of the meal"
                  className="min-h-[150px] min-w-[150px] max-h-[150px] max-w-[150px] object-cover"
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
