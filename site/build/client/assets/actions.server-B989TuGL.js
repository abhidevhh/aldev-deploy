import { data } from "react-router";
import { k as getNonNull, i as getErrorMessage } from "./misc-CQO4K9rH.js";
async function handleFormSubmission({
  form,
  request,
  validators,
  // @ts-expect-error ts(2322) 🤷‍♂️
  actionData = { fields: {}, errors: {} },
  handleFormValues
}) {
  try {
    if (!form) {
      const contentType = request.headers.get("content-type") ?? "";
      if (contentType.includes("application/x-www-form-urlencoded")) {
        const requestText = await request.text();
        form = new URLSearchParams(requestText);
      } else {
        const formData = await request.formData();
        form = new URLSearchParams();
        for (const [key, value] of formData.entries()) {
          if (typeof value === "string") {
            form.append(key, value);
          }
        }
      }
    }
    for (const fieldName of Object.keys(validators)) {
      const formValue = form.get(fieldName);
      actionData.fields[fieldName] = formValue ?? "";
    }
    await Promise.all(
      Object.entries(validators).map(async ([fieldName, validator]) => {
        const formValue = form.get(fieldName);
        actionData.errors[fieldName] = await validator(
          formValue,
          actionData.fields
        );
      })
    );
    if (Object.values(actionData.errors).some((err) => err !== null)) {
      return data({ ...actionData, status: "error" }, 400);
    }
    const nonNullFields = getNonNull(actionData.fields);
    const response = await handleFormValues(
      nonNullFields
    );
    return response;
  } catch (error) {
    actionData.errors.generalError = getErrorMessage(error);
    return data(actionData, 500);
  }
}
export {
  handleFormSubmission as h
};
