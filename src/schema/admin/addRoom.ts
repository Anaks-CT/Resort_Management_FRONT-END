
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
  name: yup.string().trim().required('Name is required'),
  description: yup.string().trim().required('Description is required'),
  area: yup.string().trim().required('Area is required'),
  packages: yup.array()
    .of(
      yup.object().shape({
        packageName: yup.string().trim().required('Package name is required'),
        cost: yup.string().trim().required('Cost is required'),
        features: yup.array().of(yup.string().trim().required('Feature is required')),
      })
    ),
  maxPeople: yup.string().trim().matches(/^[0-9]{1}$/, "max People should be less than 10 ").required('Max people is required'),
  noOfRooms: yup.number().max(899, "Rooms should be less than 900 ").required('Number of rooms is required'),
  highlights: yup.array()
    .of(yup.string().trim().required('Highlight is required')),
  amenities: yup.array()
    .of(yup.string().trim().required('Amenity is required')),
  facilities: yup.array()
    .of(yup.string().trim().required('Facility is required')),
});

export default addRoomSchema;


