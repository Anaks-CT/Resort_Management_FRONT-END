import className from "classnames";

type props = {
  children: React.ReactNode;
  color: "transparent" | "white" | "premium" | "black" | "success" | "danger" | "primary";
  outline?: boolean;
  rounded?: boolean;
  disable?: boolean;
  onClick?: () => void;
  class: string;
};

function Button({
  children,
  color,
  outline,
  rounded,
  disable,
  onClick,
  ...rest
}: props) {
  ////////////////// doubt how to give type to the return
  function colorType() {
    switch (color) {
      case "premium":
        return "bg-premium px-3 py-2";
      case "transparent":
        return "bg-black bg-opacity-50 px-3 py-2";
      case "white":
        return "bg-white";
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
    "d-flex items-center text-white",
    rest.class,
    colorType(),
    {
      rounded: rounded,
      "border-2 border-outline": outline,
    }
  );

  return (
    <button {...rest} type="button" onClick={onClick} className={classes}>
      {children}
    </button>
  );
}

export default Button;
