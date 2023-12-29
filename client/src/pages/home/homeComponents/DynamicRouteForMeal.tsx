import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { menuInterface, responseOneMealInterface } from "../../../interfaces/MenuInterfaces";
import { MealServices } from "../../../services/MealServices";
import Loading from "../../../components/Loading";
import GetComments from "./GetComments";
import AddToCart from "../../order/AddToCart";

const DynamicRouteForMeal = () => {
  const [oneMeal, setOneMeal] = useState<menuInterface>();
  const params = useParams();

  const getData = async (MealId: string) => {
    try {
      const response: responseOneMealInterface = await MealServices.getOneMealData(MealId);
      setOneMeal(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (params.mealId !== undefined) {
      getData(params.mealId);
    }
  }, [params.mealId]);

  return (
    <div>
      {oneMeal ? (
        <div className="mt-14 max-w-6xl mx-auto ">
          <div className="flex flex-col items-center md:flex-row md:justify-center md:gap-[50px] lg:gap-[200px]">
            <img
              src={`http://localhost:5000/images/${oneMeal.jpg}`}
              alt="Delicious meal"
              className=" mb-10 md:mb-0 min-h-[350px] min-w-[350px] max-h-[350px] max-w-[350px] object-cover rounded-lg"
            />
            <div className="flex flex-col justify-center  max-w-[350px]">
              <h1 className=" text-3xl font-semibold">{oneMeal.name}</h1>
              <p className=" mt-8 mb-10 text-xl">{oneMeal.description}</p>
              <AddToCart oneMeal={oneMeal} />
            </div>
          </div>
          <GetComments />
        </div>
      ) : (
        <Loading />
      )}
    </div>
  );
};
export default DynamicRouteForMeal;
