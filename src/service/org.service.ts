import { orgInterface } from "../interfaces/org.interface";
import Org from "../models/org.model";

export const createNewOrg = async (data: orgInterface) => {
  return await Org.create(data);
};
