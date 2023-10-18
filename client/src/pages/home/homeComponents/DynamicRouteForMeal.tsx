import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { menuInterface, responseOneMealInterface } from "../../../interfaces/MenuInterfaces";
import { MealServices } from "../../../services/MealServices";
import Loading from "../../../components/Loading";
import GetComments from "./GetComments";

const DynamicRouteForMeal = () => {
  const [oneMeal, setOneMeal] = useState<menuInterface>();
  const params = useParams();

  useEffect(() => {
    if (params.id !== undefined) {
      const getData = async (MealId: string) => {
        try {
          const response: responseOneMealInterface = await MealServices.getOneMealData(MealId);
          setOneMeal(response.data);
        } catch (error) {
          console.log(error);
        }
      };
      getData(params.id);
    }
  }, [params.id]);

  return (
    <div>
      {oneMeal ? (
        <div>
          <div className="flex flex-col justify-center items-center">
            <div className="flex flex-col justify-center items-center">
              <h1 className=" text-xl">{oneMeal.name}</h1>
              <img
                src={oneMeal.jpg}
                alt="photo of the meal"
                className=" min-h-[250px] min-w-[250px] max-h-[250px] max-w-[250px] object-cover"
              />
              <p className=" mt-8 text-lg">{oneMeal.description}</p>
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
