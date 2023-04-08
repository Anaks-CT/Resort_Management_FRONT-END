import { AiFillCaretDown, AiFillCaretUp } from "react-icons/ai";
import { useState, useRef, useEffect } from "react";

type props = {
  faq: {
    Q: String;
    A: String;
  };
};

function SingleFaq({ faq }: props) {
  const divEl = useRef<HTMLDivElement>(null)!;
  const [toggleShowAns, settoggleShowAns] = useState(false);
  const handleClick = () => {
    settoggleShowAns((prev) => !prev);
  };
  useEffect(() => {
    const handleOuterClick = (e: MouseEvent) => {
      if (!divEl.current?.contains(e.target as Node)) {
        settoggleShowAns(false);
        // setEditInput(todo.title)
      }
    };
    document.addEventListener("click", handleOuterClick, true);
    return () => {
      document.removeEventListener("click", handleOuterClick);
    };
    // eslint-disable-next-line
  }, []);
  return (
    <div className="border-b w-full py-2 mt-5">
      <div className="flex justify-between" onClick={handleClick} ref={divEl}>
        <h2 className=" md:text-2xl text-sm text-white">{faq.Q}</h2>
        {toggleShowAns ? (
          <AiFillCaretUp className="text-white md:mr-14" />
        ) : (
          <AiFillCaretDown className="text-white md:mr-14" />
        )}
      </div>
      {toggleShowAns && (
        <h2 className="text-white text-sm md:text-lg font-sans tracking-wide mt-10 mb-20">
          {faq.A}
        </h2>
      )}
    </div>
  );
}

export default SingleFaq;
