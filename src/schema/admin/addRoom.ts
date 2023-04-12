
import * as yup from "yup";

const SUPPORTED_FORMATS = ["image/jpg", "image/jpeg", "image/png"];


const addRoomSchema = yup.object().shape({
  images: yup.array().of(
    yup
      .mixed()
      .nullable()
      .test(
        "FILE_FORMAT",
        "Choose a valid file format (jpg, jpeg, png)",
        (value: any) =>
          !value || (value && SUPPORTED_FORMATS.includes(value?.type))
      )
  ).max(4, "You can add a maximum of 4 images"),
  name: yup.string().trim().matches(/^(?!\d)[a-zA-Z0-9 ]*$/, 'Invalid input').required('Name is required'),
  description: yup.string().trim().required('Description is required'),
  area: yup.number().max(500, "Invalid Area").min(1, "Invalid Area").required('Area is required'),
  packages: yup.array()
    .of(
      yup.object().shape({
        packageName: yup.string().trim().required('Package name is required'),
        cost: yup.number().min(1, "Invalid cost").required('Cost is required'),
        features: yup.array().of(yup.string().trim().required('Feature is required')),
      })
    ),
  maxPeople: yup.number().max(10, "Maximum no. of People must be less than 10").min(1, "Minimum atleast 1 person required").required('Max people is required'),
  noOfRooms: yup.number().max(899, "Rooms should be less than 900 ").required('Number of rooms is required'),
  highlights: yup.array()
    .of(yup.string().trim().required('Highlight is required')),
  amenities: yup.array()
    .of(yup.string().trim().required('Amenity is required')),
  facilities: yup.array()
    .of(yup.string().trim().required('Facility is required')),
});

export default addRoomSchema;


