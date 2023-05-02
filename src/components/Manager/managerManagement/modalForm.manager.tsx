import Button from "../../UI/Button";
import Input from "../../UI/Input";
import { IResort } from "../../../interface/resort.interface";


export const modalForm = (
  error: string,
  loading: boolean,
  formik: any,
  closeModal: any,
  resortDetails?: IResort[] | null
) => {

    console.log(formik.values);
    const resortNames = resortDetails?.map(item => ({name:item.resortDetails.name, _id: item._id}))
    const renderData = resortNames?.map((item, i) => (
        <option value={item._id}>{item.name}</option>
    ))
    return (
      <div className="flex flex-col justify-center items-center p-5 rounded">
        {error && <div className="text-red-500">{error}</div>}
        {loading && (
          <img
            width={50}
            src="https://res.cloudinary.com/dhcvbjebj/image/upload/v1679738426/Spinner-1s-200px_1_twv42p.gif"
            alt=""
          />
        )}
          <h2 className="text-center mb-10 text-white text-3xl tracking-wide ">ADD MANAGER</h2>
        <form className="w-full bg-black bg-opacity-70 px-28">
          <div className="relative py-2">
              {formik.values.name && <span className='absolute top-0  text-[12px] text-[#636c72] left-3 tracking-wider'>Name</span>}
            <Input onChange={formik.handleChange} value={formik.values.name} required placeholder="NAME" class="text-sm bg-black" name='name' type="text"/>
            {formik.touched.name && formik.errors.name && <div className="text-red-500">{formik.errors.name}</div>}
          </div>
          <div className="relative py-2">
              {formik.values.email && <span className='absolute top-0  text-[12px] text-[#636c72] left-3 tracking-wider'>Email Address</span>}
            <Input onChange={formik.handleChange} value={formik.values.email} required placeholder="EMAIL ADDRESS" class="text-sm bg-black" name='email' type="text"/>
            {formik.touched.email && formik.errors.email && <div className="text-red-500">{formik.errors.email}</div>}
          </div>
          <div className="relative py-2">
              {formik.values.phone && <span className='absolute top-0  text-[12px] text-[#636c72] left-3 tracking-wider'>Phone</span>}
            <Input onChange={formik.handleChange} value={formik.values.phone} required placeholder="PHONE" class="text-sm bg-black" name='phone' type="number"/>
            {formik.touched.phone && formik.errors.phone && <div className="text-red-500">{formik.errors.phone}</div>}
          </div>
          <div className="relative py-2">
              {formik.values.password && <span className='absolute top-0  text-[12px] text-[#636c72] left-3 tracking-wider'>Password</span>}
            <Input onChange={formik.handleChange} value={formik.values.password} required placeholder="PASSWORD" class="text-sm bg-black" name='password' type="password"/>
            {formik.touched.password && formik.errors.password && <div className="text-red-500">{formik.errors.password}</div>}
          </div>
          <div className="relative py-2">
              {formik.values.cPassword && <span className='absolute top-0  text-[12px] text-[#636c72] left-3 tracking-wider'>Confirm Password</span>}
            <Input onChange={formik.handleChange} value={formik.values.cPassword} required placeholder="CONFIRM PASSWORD" class="text-sm bg-black" name='cPassword' type="password"/>
            {formik.touched.cPassword && formik.errors.cPassword && <div className="text-red-500">{formik.errors.cPassword}</div>}
          </div>
            <select name='resortId' value={formik.values.resortId} onChange={formik.handleChange} className='my-select border-0 border-b-2 w-full border-white box-border p-[16px] block bg-opacity-70 text-white tracking-wide bg-black'>
                <option value="" selected disabled>--select Resorts--</option>
                {renderData}
            </select>
          {formik.touched.resortId && formik.errors.resortId && <div className="text-red-500">{formik.errors.resortId}</div>}
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