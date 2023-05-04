import className from "classnames";

type props = {
  children: React.ReactNode;
  color: "transparent" | "white" | "premium" | "black" | "success" | "danger" | "primary" | "grey";
  outline?: boolean;
  rounded?: boolean;
  disable?: boolean;
  hidden?: boolean;
  onClick?: any;
  class: string;
  OnClickItem?: any,
  type?: "button" | "submit"
};

function Button({
  children,
  color,
  outline,
  hidden,
  rounded,
  disable,
  onClick,
  OnClickItem,
  type,
  ...rest
}: props) {
  ////////////////// doubt how to give type to the return
  function colorType() {
    switch (color) {
      case "premium":
        return "bg-premium px-3 py-2 text-white";
      case "grey":
        return "bg-black bg-opacity-20"
      case "transparent":
        return "bg-black bg-opacity-50 px-3 py-2 text-white";
      case "white":
        return "bg-white text-black";
      case "black":
        return "hover:bg-slate-600 text-white bg-black px-3 py-2";
      case "success":
        return "bg-green-600 text-white";
      case "danger":
        return "bg-red-600 text-white";
      case "primary":
        return "bg-blue-600 text-white"
      default:
        return "bg-white";
    }
  }

  const classes = className(
    "d-flex items-center",
    rest.class,
    colorType(),
    {
      rounded: rounded,
      "border-2 border-outline": outline,
    }
  );

  return (
    <button {...rest} hidden={hidden} disabled={disable ? true : false} type={type === "submit" ? "submit" : "button"} onClick={() => onClick && onClick(OnClickItem && OnClickItem)} className={classes}>
      {children}
    </button>
  );
}
 
export default Button;
