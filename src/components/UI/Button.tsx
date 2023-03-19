import className from "classnames";

type props = {
  children: React.ReactNode;
  color: "transparent" | "white" | "premium";
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
        return "bg-premium";
      case "transparent":
        return "bg-black bg-opacity-50";
      case "white":
        return "bg-white";
      default:
        return "bg-white";
    }
  }

  const classes = className(
    rest.class,
    "d-flex items-center px-3 py-2 text-white",
    colorType(),
    {
      "rounded": rounded,
      "border-2 border-outline": outline,
    }
  );

  return (
    <button {...rest} type='button' onClick={onClick} className={classes}>
      {children}
    </button>
  );
}

export default Button;
