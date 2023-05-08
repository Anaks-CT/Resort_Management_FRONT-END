import Button from "../../UI/Button";

type props = {
  singlePackage: any;
  roomDetail: any;
  handleViewRateToggle: () => void;
  setBookingOverViewRoomDetails: React.Dispatch<any>;
  setRoomListArrayNumber: React.Dispatch<React.SetStateAction<number>>;
  userType: "member" | "platinum" | "diamond"
};

function RoomPackage({
  singlePackage,
  setRoomListArrayNumber,
  roomDetail,
  handleViewRateToggle,
  setBookingOverViewRoomDetails,
  userType
}: props) {
  
  const features = singlePackage.features.map((feature: string, i: number) => (
    <div className="flex" key={feature}>
      <span>{i + 1}.</span>
      {feature}
    </div>
  ));

  let packageCost: number
  if(userType==="member"){
    packageCost = singlePackage.cost
  }else if(userType === "platinum"){
    packageCost = Math.floor(singlePackage.cost - singlePackage.cost*5/100)
  }else if(userType === "diamond"){
    packageCost = Math.floor(singlePackage.cost - singlePackage.cost*15/100)
  }else{
    packageCost = 0
  }
  const handleSelectRate = () => {
    handleViewRateToggle();
    setBookingOverViewRoomDetails((state: any) => [
      ...state,
      {
        roomName: roomDetail.name,
        roomId: roomDetail._id,
        packageName: singlePackage.packageName,
        packageId: singlePackage._id,
        packageCost: packageCost,
      },
    ]);
    setRoomListArrayNumber((state) => state + 1);
  };

  return (
    <div className="bg-[#D9D9D9] p-8 flex flex-col gap-6 mb-10 rounded">
      <div className="text-center lg:text-left text-xl lg:text-3xl">
        {singlePackage.packageName}
      </div>
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="flex flex-col text-xs lg:text-sm gap-2 lg:w-3/5">
          {features}
        </div>
        <div className="text-center lg:w-2/5">
          <div className="flex gap-4 justify-center items-center">
            <div className="font-sans">INR</div>
            <div className="text-4xl flex gap-4 items-center">
              <span className={`${packageCost < singlePackage.cost && "line-through text-2xl "}`}>
                {singlePackage.cost.toLocaleString("en-IN")}
              </span>
              {packageCost < singlePackage.cost && <span>{packageCost.toLocaleString("en-IN")}</span>}
            </div>
          </div>
          <div className="text-xs">exc. taxes and fees</div>
          <Button
            class="w-full lg:w-52 my-5 text-sm"
            color="transparent"
            onClick={handleSelectRate}
          >
            SELECT THIS RATE
          </Button>
        </div>
      </div>
    </div>
  );
}

export default RoomPackage;
