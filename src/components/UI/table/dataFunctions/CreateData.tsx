import { Idataa } from "../../../../interface/gallary.interface";

export default function CreateData(item: Idataa) {
  const { _id, image, description1, description2 } = item;

  ////// makind a cancel and delete function here and passing tablecell
  const handleClick = () => {
    // console.log(inputEl.current.value);
  };
  return {
    image: (
      <div className="h-32 w-32 mx-auto object-contain">
        <img src={image} alt="" />
      </div>
    ),
    description1: <div className="w-[300px] mx-auto">{description1}</div>,
    description2: <div className="w-[300px] mx-auto">{description2}</div>,
    makeChanges: _id,
  };
}
