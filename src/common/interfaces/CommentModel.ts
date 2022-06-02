import * as Yup from "yup";

export interface IComment {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
}

export interface ICommentWithoutId {
  postId: number;
  name: string;
  email: string;
  body: string;
}

class ValidateInterfaces {
  private validateIsNumberRegEx =
    /^\s*[+-]?(\d+|\d*\.\d+|\d+\.\d*)([Ee][+-]?\d+)?\s*$/;
  private validateIsNullRegEx = /^(?!\s*$).+/;
  public commentSchema;

  constructor() {
    this.commentSchema = Yup.object().shape({
      postId: Yup.string()
        .required("This field can not be empty")
        .matches(
          this.validateIsNumberRegEx,
          "This field must only exist number"
        ),
      name: Yup.string()
        .required("This field can not be empty")
        .matches(
          this.validateIsNullRegEx,
          "This field must exist text or number"
        ),
      email: Yup.string()
        .email()
        .min(16, "Your email is too short")
        .max(40, "Your email is too long")
        .required("This field can not be empty")
        .matches(
          this.validateIsNullRegEx,
          "This field must exist text or number"
        ),
      body: Yup.string()
        .required("This field can not be empty")
        .matches(
          this.validateIsNullRegEx,
          "This field must exist text or number"
        ),
    });
  }
}

export default new ValidateInterfaces();
