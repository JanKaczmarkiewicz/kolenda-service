import * as yup from "yup";

export const addEntranceValidation = yup.object().shape({
  house: yup.string().required(),
  pastoralVisit: yup.string().required(),
});

export const updateEntranceValidation = yup.object().shape({
  house: yup.string().required(),
  pastoralVisit: yup.string().required(),
});
