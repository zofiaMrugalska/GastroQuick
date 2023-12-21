import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { MealServices } from "../../services/MealServices";
import { menuInterface, responseMealInterface } from "../../interfaces/MenuInterfaces";
import Loading from "../../components/Loading";

const Menu = () => {
  const [mainMenu, setMainMenu] = useState<menuInterface[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const getData = async () => {
    try {
      const response: responseMealInterface = await MealServices.getMealsData();
      setMainMenu(response.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      {loading ? (
        <Loading />
      ) : (
        <div
          className="mt-14 max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2
    lg:grid-cols-3 xl:grid-cols-4 "
        >
          {/* <p data-testid="test">testowe </p> */}

          {mainMenu.map((meal: menuInterface) => {
            return (
              <div key={meal._id} className="p-7 flex justify-center ">
                <Link to={`/meal/${meal.name}/${meal._id}`} className="">
                  <li className=" bg-white max-w-[240px] max-h-[270px] pt-6 flex flex-col place-items-center border-[1px] rounded-2xl shadow-inner md:shadow md:inset  hover:scale-95 hover:shadow-2xl">
                    <p data-testid="name" className="text-lg text-center ">
                      {meal.name}
                    </p>
                    {/* <p data-testid="testOne">test1</p> */}

                    <p className=" text-lg font-semibold mt-1">${meal.price}</p>

                    <img
                      src={meal.jpg}
                      alt="photo of the meal"
                      className="mt-4 object-cover min-h-[150px] min-w-[240px] rounded-b-lg"
                    />
                  </li>
                </Link>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
export default Menu;
