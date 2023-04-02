import Button from "../../../UI/Button";
import Input from "../../../UI/Input";
import PreviewImage from "../../../UI/PreviewImage";
type user = "nothingClicked" | "editDescription" | "editImage";

export const modalForm = (
  error: string,
  loading: boolean,
  formik: any,
  setOpen: any,
  closeModal: () => void
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

            {formik.values.image && <PreviewImage file={formik.values.image} />}

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

            {formik.touched.image &&
            formik.errors.image && (
              <div className="text-red-500">{formik.errors.image}</div>
            )}


          <div className="flex w-full justify-around mt-10">
            <Button
              color="success"
              onClick={formik.handleSubmit}
              class="px-10 py-3"
            >
              ADD
            </Button>
            <Button
              color="danger"
              class="px-10 py-3"
              onClick={() => {
                setOpen(false);
                formik.resetForm()
                closeModal()
              }}
            >
              CANCEL
            </Button>
          </div>
        </form>
      </div>
    );
  };