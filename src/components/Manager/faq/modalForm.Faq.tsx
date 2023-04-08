import Button from "../../UI/Button";
import Input from "../../UI/Input";


export const modalForm = (
  error: string,
  loading: boolean,
  formik: any,
  closeModal: any,
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
          <h1 className="text-center mb-10">ADD FAQ</h1>


              <Input
                type="text"
                class="bg-black "
                onChange={formik.handleChange}
                placeholder="Question"
                required
                name="question"
                value={formik.values.question}
              />
              {formik.touched.question && formik.errors.question && (
                <div className="text-red-500">{formik.errors.question}</div>
              )}
              <Input
                type="text"
                class="bg-black "
                onChange={formik.handleChange}
                placeholder="Answer"
                required
                name="answer"
                value={formik.values.answer}
              />
              {formik.touched.answer && formik.errors.answer && (
                <div className="text-red-500">{formik.errors.answer}</div>
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
                closeModal()
                setformikInitialValues({
                  question: "",
                  answer: "",
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