import * as Yup from "yup";

export interface IUser {
  id: number;
  name: string;
  username: string;
  email: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    };
  };
  phone: string;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
}

export interface IUserInputAttributes {
  name: string;
  username: string;
  email: string;
  addressStreet: string;
  addressSuite: string;
  addressCity: string;
  addressZipcode: string;
  geoLat: string;
  geoLng: string;
  phone: string;
  website: string;
  companyName: string;
  companyCatchPhrase: string;
  companyBs: string;
}

class ValidateInterfaces {
  private validateRegEx = /^(?!\s*$).+/;
  public userSchema;

  constructor() {
    this.userSchema = Yup.object().shape({
      name: Yup.string()
        .required("This field can not be empty")
        .matches(this.validateRegEx, "This field must exist text or number"),
      username: Yup.string()
        .required("This field can not be empty")
        .matches(this.validateRegEx, "This field must exist text or number"),
      email: Yup.string()
        .email()
        .min(16, "Your email is too short")
        .max(40, "Your email is too long")
        .required("This field can not be empty")
        .matches(this.validateRegEx, "This field must exist text or number"),
      addressStreet: Yup.string()
        .required("This field can not be empty")
        .matches(this.validateRegEx, "This field must exist text or number"),
      addressSuite: Yup.string()
        .required("This field can not be empty")
        .matches(this.validateRegEx, "This field must exist text or number"),
      addressCity: Yup.string()
        .required("This field can not be empty")
        .matches(this.validateRegEx, "This field must exist text or number"),
      addressZipcode: Yup.string()
        .required("This field can not be empty")
        .matches(this.validateRegEx, "This field must exist text or number"),
      geoLat: Yup.string()
        .required("This field can not be empty")
        .matches(this.validateRegEx, "This field must exist text or number"),
      geoLng: Yup.string()
        .required("This field can not be empty")
        .matches(this.validateRegEx, "This field must exist text or number"),
      phone: Yup.string()
        .required("This field can not be empty")
        .matches(this.validateRegEx, "This field must exist text or number"),
      website: Yup.string()
        .required("This field can not be empty")
        .matches(this.validateRegEx, "This field must exist text or number"),
      companyName: Yup.string()
        .required("This field can not be empty")
        .matches(this.validateRegEx, "This field must exist text or number"),
      companyCatchPhrase: Yup.string()
        .required("This field can not be empty")
        .matches(this.validateRegEx, "This field must exist text or number"),
      companyBs: Yup.string()
        .required("This field can not be empty")
        .matches(this.validateRegEx, "This field must exist text or number"),
    });
  }
}

export default new ValidateInterfaces();
