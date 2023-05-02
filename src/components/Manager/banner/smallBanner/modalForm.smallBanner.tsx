import Button from "../../../UI/Button";
import Input from "../../../UI/Input";
import PreviewImage from "../../../UI/PreviewImage";
type user = "nothingClicked" | "editDescription" | "editImage";

export const modalForm = (
  error: string,
  loading: boolean,
  editButtonClicked: user,
  formik: any,
  setOpen: any,
  seteditButtonClicked: any,
  setformikInitialValues: any
) => {
    return (
      <div className="flex flex-col justify-center items-center p-10">
        {error && <div className="text-red-500">{error}</div>}
        {loading && (
          <img
            width={50}
            src="https://res.cloudinary.com/dhcvbjebj/image/upload/v1679738426/Spinner-1s-200px_1_twv42p.gif"
            alt=""
          />
        )}
        <form className="w-full bg-black bg-opacity-70">
          <h1 className="text-center mb-10">ADD BANNER</h1>

          {(editButtonClicked === "nothingClicked" || "editImage") &&
            editButtonClicked !== "editDescription" &&
            formik.values.image && <PreviewImage file={formik.values.image} />}
          {(editButtonClicked === "nothingClicked" || "editImage") &&
            editButtonClicked !== "editDescription" && (
              <Input
                type="file"
                class="bg-black "
                onChange={(event) => {
                  event.target.files &&
                    formik.setFieldValue("image", event.target.files[0]);
                }}
                placeholder="Choose File"
                required
                name="image"
                value={undefined}
              />
            )}
          {(editButtonClicked === "nothingClicked" || "editImage") &&
            editButtonClicked !== "editDescription" &&
            formik.touched.image &&
            formik.errors.image && (
              <div className="text-red-500">{formik.errors.image}</div>
            )}

          {editButtonClicked === "editImage" || (
            <>
               <div className="relative py-2">
              {formik.values.description1 && <span className='absolute top-0 text-[12px] text-[#636c72] left-3 tracking-wider'>Description1</span>}
              <Input
                type="text"
                class="bg-black"
                onChange={formik.handleChange}
                placeholder="Description1"
                required
                name="description1"
                value={formik.values.description1}
              />
              {formik.touched.description1 && formik.errors.description1 && (
                <div className="text-red-500">{formik.errors.description1}</div>
              )}
              </div>
              <div className="relative py-2">
              {formik.values.description2 && <span className='absolute top-0 text-[12px] text-[#636c72] left-3 tracking-wider'>Description2</span>}
              <Input
                type="text"
                class="bg-black"
                onChange={formik.handleChange}
                placeholder="Description2"
                required
                name="description2"
                value={formik.values.description2}
              />
              {formik.touched.description2 && formik.errors.description2 && (
                <div className="text-red-500">{formik.errors.description2}</div>
              )}
              </div>
            </>
          )}

          <div className="flex w-full justify-around mt-10">
            <Button
              color="success"
              onClick={formik.handleSubmit}
              class="px-10 py-3"
            >
              {editButtonClicked==="nothingClicked" ? "ADD" : "EDIT" }
            </Button>
            <Button
              color="danger"
              class="px-10 py-3"
              onClick={() => {
                setOpen(false);
                seteditButtonClicked("nothingClicked");
                setformikInitialValues({
                  image: "",
                  description1: "",
                  description2: "",
                });
                formik.resetForm();
              }}
            >
              CANCEL
            </Button>
          </div>
        </form>
      </div>
    );
  };