import React, { useEffect, useState, useMemo } from "react";
import { Header2 } from "../../components/User/Header/Header";
import { IResort } from "../../interface/resort.interface";
import { getAllResortDetailsApi } from "../../api/resort.api";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { updateCurrentResort } from "../../store/slices/currentResortUserSlice";
import { toastMessage } from "../../helpers/toast";

function ResortsListPage() {
  // style for background image
  const [image, setImage] = useState(
    "https://res.cloudinary.com/dhcvbjebj/image/upload/v1681805628/photo-1582719508461-905c673771fd_onodbc.jpg"
  );
  const style = {
    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.9),rgba(0, 0, 0, 0.3)), url(${image})`,
  };
  const [allResorts, setAllResorts] = useState<IResort[] | null>(null);
  // fetching all the resorts from backend and storing the value in to state
  useEffect(() => {
    getAllResortDetailsApi()
      .then((res) => setAllResorts(res.data.data))
      .catch((err) => toastMessage("error", err.response.data.message));
  }, []);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [searchInput, setSearchInput] = useState("");

  const filteredNotes = useMemo(
    () =>
      allResorts?.filter(
        (resort) =>
          searchInput === "" ||
          resort.resortDetails.name
            .toLowerCase()
            .includes(searchInput.toLowerCase()) ||
          resort.location.toLowerCase().includes(searchInput.toLowerCase())
      ),
    [allResorts, searchInput]
  );

  const resortList = filteredNotes?.map((item, i) => (
    <div
      key={i}
      className="flex py-5 justify-between items-center md:px-9 cursor-pointer"
      onMouseEnter={() => setImage(item.resortDetails.image)}
      onClick={() => {
        dispatch(
          updateCurrentResort({
            resortId: item._id,
            resortName: item.resortDetails.name,
          })
        );
        navigate(`/${item.resortDetails.name}`, {
          state: { resortDetails: item },
        });
      }}
    >
      <div className="uppercase font-sans tracking-wide px-2">
        {item.resortDetails.name}
      </div>
      <div className="text-sm">{item.location}</div>
    </div>
  ));
  return (
    <>
      <Header2 />
      <div
        className="w-full h-screen bg-no-repeat bg-cover  bg-center  saturate-150 flex justify-center "
        style={style}
      >
        <div className={`mt-32 w-full text-center text-white p-2`}>
          <div className="text-2xl md:text-4xl uppercase tracking-wider text-center">
            Luxury Redefined
          </div>
          <div className="text-center tracking-wide text-lg md:text-2xl my-4">
            Discover the Ultimate Vacation Experience.
          </div>
          <div><input type="search" className="text-black rounded min-w-[300px]" placeholder="Search Resort / Location" value={searchInput} onChange={(e) => setSearchInput(e.target.value)}/></div>
          <div className="divide-y bg-[#1E1E1E] opacity-70 px-3 mt-10 w-full md:w-1/2 mx-auto max-h-96 overflow-y-auto">
            {resortList}
          </div>
        </div>
        <div className="bg-gradient-to-b from-transparent to-black absolute w-full bottom-0 h-24"></div>
      </div>
    </>
  );
}

export default ResortsListPage;
