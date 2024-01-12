import { useForm, SubmitHandler, Controller } from "react-hook-form";
import toast from "react-hot-toast";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { OrderDetailsInterface } from "../../interfaces/CartInterfaces";
import { PlacingOrderServices } from "../../services/PlacingOrderServices";

const PlacingOrderModal = ({
  showModal,
  setShowModal,
  showOrderModal,
  setShowOrderModal,
  price,
}: {
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  showOrderModal: boolean;
  setShowOrderModal: React.Dispatch<React.SetStateAction<boolean>>;
  price: number;
}) => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<OrderDetailsInterface>();

  const navigate = useNavigate();

  const onSubmit: SubmitHandler<OrderDetailsInterface> = async (orderData) => {
    try {
      const response = await PlacingOrderServices.sendOrder(orderData, price);
      if (response.success === true) {
        toast.success(response.message);
        setShowModal(!showModal);
        setShowOrderModal(!showOrderModal);

        setTimeout(() => {
          setShowOrderModal(false);
          navigate("/account");
        }, 5000);
      }
    } catch (error: any) {
      const errorMessage: string = error.toString();
      toast.error(errorMessage);
    }
  };

  return (
    <div>
      <div
        style={{ backgroundColor: " rgba(0, 0, 0, 0.5)" }}
        className=" fixed inset-0 flex justify-center items-center"
      >
        <div className="flex flex-col justify-center items-center mt-20 min-h-[700px] min-w-[400px] bg-[#ffffff] p-8  rounded-xl ">
          <button onClick={() => setShowModal(!showModal)} className=" relative left-36 bottom-5">
            <IoIosCloseCircleOutline size={30} color="gray" />
          </button>

          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
            <div>
              <input
                {...register("name", {
                  required: "name is required",
                  pattern: {
                    value: /^[A-Za-z]+$/,
                    message: "Please enter a valid name with only letters",
                  },
                })}
                type="text"
                placeholder="name"
                className="border-[2px] rounded-lg p-2 min-w-[300px] "
              />
              <p className="text-red-500 text-sm">{errors.name?.message}</p>
            </div>

            <div>
              <input
                {...register("surname", {
                  required: "surname is required",
                  pattern: {
                    value: /^[A-Za-z]+$/,
                    message: "Please enter a valid surname with only letters",
                  },
                })}
                type="text"
                placeholder="surname"
                className="border-[2px] rounded-lg p-2 min-w-[300px]"
              />
              <p className="text-red-500 text-sm">{errors.surname?.message}</p>
            </div>

            <div>
              <input
                {...register("phoneNumber", {
                  required: "phone number is required",
                  pattern: {
                    value: /^(\d{9}|\d{3}\s\d{3}\s\d{3})\s*$/,
                    message: "Please enter a valid 9-digit phone number or format it as 'xxx xxx xxx'",
                  },
                })}
                type="text"
                placeholder="phone number"
                className="border-[2px] rounded-lg p-2 min-w-[300px]"
              />
              <p className="text-red-500 text-sm">{errors.phoneNumber?.message}</p>
            </div>

            <div>
              <input
                {...register("street", {
                  required: "street is required",
                  pattern: {
                    value: /^[A-Za-z\s]+$/,
                    message: "Please enter a valid street with only letters and spaces",
                  },
                })}
                type="text"
                placeholder="street"
                className="border-[2px] rounded-lg p-2 min-w-[300px]"
              />
              <p className="text-red-500 text-sm">{errors.street?.message}</p>
            </div>

            <div>
              <input
                {...register("houseNumber", {
                  required: "house number is required",
                  pattern: {
                    value: /^[A-Za-z0-9\s/]+$/,
                    message: "Please enter a valid house number with letters, digits, spaces, or slashes",
                  },
                })}
                type="text"
                placeholder="house number"
                className="border-[2px] rounded-lg p-2 min-w-[300px]"
              />
              <p className="text-red-500 text-sm">{errors.houseNumber?.message}</p>
            </div>

            <div>
              <input
                {...register("city", {
                  required: "city is required",
                  pattern: {
                    value: /^[A-Za-z\s]+$/,
                    message: "Only letters and spaces are allowed",
                  },
                })}
                type="text"
                placeholder="city"
                className="border-[2px] rounded-lg p-2 min-w-[300px]"
              />
              <p className="text-red-500 text-sm">{errors.city?.message}</p>
            </div>

            <Controller
              name="paymentMethod"
              control={control}
              defaultValue="card"
              rules={{ required: "This filed is required" }}
              render={({ field }) => (
                <div>
                  <label>
                    <div className="flex gap-1">
                      <input
                        type="radio"
                        value="card"
                        onChange={() => field.onChange("card")}
                        checked={field.value === "card"}
                      />
                      <p>Card</p>
                    </div>
                  </label>

                  <label>
                    <div className="flex gap-1 mt-4">
                      <input
                        type="radio"
                        value="cash"
                        onChange={() => field.onChange("cash")}
                        checked={field.value === "cash"}
                      />
                      <p>Cash</p>
                    </div>
                  </label>
                </div>
              )}
            />

            <button
              type="submit"
              className=" mt-4 bg-[#ff8f34] py-2 rounded-lg min-w-[300px] font-semibold hover:bg-[#fc9e52] hover:scale-95"
            >
              Send Order
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
export default PlacingOrderModal;
