import {
  Field,
  FieldArray,
  Form,
  FormikErrors,
  FormikTouched,
} from "formik";
import React, { useEffect, useRef } from "react";
import { IResort } from "../../../interface/resort.interface";
import Button from "../../UI/Button";
import { format } from "date-fns";
import { IoMdClose } from "react-icons/io";
import { DateRange } from "react-date-range";
import { IBookingForm1 } from "../../../interface/booking.interface";

function BookingForm1({
  destinationClick,
  values,
  touched,
  errors,
  allResorts,
  destinationOpen,
  setDestinationOpen,
  setFieldValue,
  handleRoomDetailsClick,
  date,
  handleDateClick,
  roomDetailsOpen,
  setDate,
  openDate,
  closeAll,
}: props) {
  console.log(errors.roomDetail);
  // variable for repeating classnames
  const classname =
    "my-select border-0 border-b-2 w-full border-white box-border p-[16px] bg-transparent text-[10px] md:text-[15px] text-white text-opacity-80 tracking-wide lg:font-light";

  // useRef hook for select Fields
  const divEl = useRef<HTMLDivElement>(null);

  // closing all the drop down fields when clicked outside of the useref div
  useEffect(() => {
    const handleOuterClick = (e: Event) => {
      const target = e.target;
      if (!divEl.current?.contains(target as Node | null)) closeAll();
    };
    document.addEventListener("click", handleOuterClick, true);
    return () => {
      document.removeEventListener("click", handleOuterClick);
    };
    // eslint-disable-next-line
  }, []);

  return (
    <Form>
      <div className="text-white px-20 py-10 md:p-10 font-black items-center tracking-wide text-center flex flex-col gap-7 lg:flex-row lg:items-center">
        <span className="text-2xl w-80 flex justify-center">
          Tell us your plan
        </span>
        <div className="flex flex-col gap-3 lg:gap-12 lg:flex-row w-full">
          <div className="lg:w-1/4 relative">
            <div className="w-full">
              <Field
                name="destination"
                className={`${classname} text-left lg:tracking-widest grow p-4 `}
                onClick={destinationClick}
                placeholder="--DESTINATION--"
                readOnly
                value={values.destination.name}
              />
              {touched.destination?.name && errors.destination?.name && (
                <div className="text-red-500 text-left text-[10px]">
                  {errors.destination.name as FormikErrors<"">}
                </div>
              )}
            </div>
            {destinationOpen && (
              <div
                ref={divEl}
                className="text-white absolute top-12 md:top-14 z-40 opacity-90 bg-black p-5 text-[10px] rounded-md w-full flex flex-col divide-y max-h-44 md:max-h-80 overflow-y-scroll md:overflow-auto"
              >
                {allResorts?.map((item) => (
                  <div
                    ref={divEl}
                    className="py-2"
                    key={item._id}
                    onClick={() => {
                      setFieldValue("destination", {
                        name: item.resortDetails.name,
                        id: item._id,
                      });
                      setDestinationOpen(false);
                    }}
                  >
                    <div ref={divEl}>{item.resortDetails.name}</div>
                    <div ref={divEl}>{item.location}</div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="lg:w-2/4 relative flex justify-center">
            <div className="w-full flex flex-col">
              <span
                className={`${classname} text-left grow lg:tracking-widest p-4`}
                onClick={handleRoomDetailsClick}
              >
                {values.roomDetail[0]
                  ? `${values.roomDetail.length} ROOMS AND ${values.roomDetail
                      .reduce((sum, item) => (sum += item ? +item : 0), 0)
                      .toString()} GUESTS`
                  : "--ROOMS AND GUESTS--"}
              </span>
              {touched.roomDetail && errors.roomDetail && (
                <div className="text-red-500 z-30 text-left text-[10px]">
                  {
                    errors.roomDetail[
                      errors.roomDetail.length - 1
                    ] as FormikErrors<"">
                  }
                </div>
              )}
            </div>

            {roomDetailsOpen && (
              <FieldArray name="roomDetail">
                {(fieldArrayProps) => {
                  const { push, remove, form } = fieldArrayProps;
                  const { values } = form;
                  const { roomDetail } = values;
                  return (
                    <div
                      ref={divEl}
                      key={roomDetail}
                      className="text-white absolute top-12 md:top-14 z-20 opacity-90 bg-black p-5 text-[10px] rounded-md w-screen md:w-full flex flex-col divide-y max-h-80 md:max-h-80 overflow-y-auto"
                    >
                      <div
                        onClick={handleRoomDetailsClick}
                        className="flex cursor-pointer justify-end items-center"
                      >
                        <span>Close</span>
                        <IoMdClose
                          className="text-red-500 w-8 h-8"
                          onClick={handleDateClick}
                        />
                      </div>
                      {roomDetail?.map((item: any, index: number) => (
                        <>
                          <div key={index} className="flex w-full py-2">
                            <div className="w-2/5 flex items-center">
                              ROOM {index + 1}
                            </div>
                            <Field
                              class="w-3/5 text-[10px] bg-black"
                              name={`roomDetail[${index}]`}
                              placeholder="No. of People"
                              type="number"
                            />

                            {index > 0 && (
                              <Button
                                class="px-3 border"
                                color="danger"
                                onClick={remove}
                                OnClickItem={index}
                              >
                                X
                              </Button>
                            )}
                          </div>
                        </>
                      ))}
                      <Button
                        class="border w-full"
                        color="premium"
                        onClick={push}
                        disable={false}
                      >
                        Add Room
                      </Button>
                    </div>
                  );
                }}
              </FieldArray>
            )}
          </div>
          <div className="lg:w-1/4 md:relative flex justify-center">
            <div className="w-full flex flex-col">
              <span
                className={`${classname} text-left grow p-4 lg:tracking-tight`}
                onClick={handleDateClick}
              >
                {format(date[0].startDate, "MM/dd/yyyy")} to{" "}
                {format(date[0].endDate, "MM/dd/yyyy")}
              </span>
              {touched.date && errors.date && (
                <div className="text-red-500 text-left text-[10px]">
                  {errors.date.startDate as string}
                </div>
              )}
            </div>
            {openDate && (
              <div
                ref={divEl}
                className="absolute z-50 top-52 md:top-16 bg-white"
              >
                <div className="flex items-center justify-end">
                  <span className="text-black" onClick={handleDateClick}>
                    close
                  </span>
                  <IoMdClose
                    className="text-red-500 w-8 h-8"
                    onClick={handleDateClick}
                  />
                </div>
                <DateRange
                  className=""
                  editableDateInputs={true}
                  onChange={(item: any) => {
                    setFieldValue("date", item.selection);
                    setDate([item.selection]);
                  }}
                  moveRangeOnFirstSelection={false}
                  ranges={date}
                />
              </div>
            )}
          </div>
        </div>
        <Button
          type="submit"
          class="text-white mt-10 lg:mt-0 w-48 text-sm"
          color="transparent"
          outline
        >
          Discover stay
        </Button>
      </div>
    </Form>
  );
}

export default BookingForm1;
type props = {
  destinationClick: () => void;
  values: IBookingForm1;
  touched: FormikTouched<IBookingForm1>;
  errors: FormikErrors<IBookingForm1>;
  destinationOpen: boolean;
  allResorts: IResort[] | null;
  setFieldValue: (
    field: string,
    value: any,
    shouldValidate?: boolean | undefined
  ) => void;
  setDestinationOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handleRoomDetailsClick: () => void;
  roomDetailsOpen: boolean;
  handleDateClick: () => void;
  date: {
    startDate: Date;
    endDate: Date;
    key: string;
  }[];
  setDate: React.Dispatch<
    React.SetStateAction<
      {
        startDate: Date;
        endDate: Date;
        key: string;
      }[]
    >
  >;
  openDate: boolean;
  closeAll: () => void;
};
