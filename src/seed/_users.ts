import User from "../models/User";
import { Role } from "../types/types";
import * as bcrypt from "bcryptjs";
import * as fs from "fs";
import * as path from "path";

export const readFromCSV = (fileName: string): string =>
  fs.readFileSync(path.join(__dirname, `${fileName}.csv`), {
    encoding: "utf8",
  });

export const createUsers = async () => {
  // Admin
  new User({
    username: "admin",
    role: Role.Admin,
    confirmed: true,
    email: `admin@koleda.com`,
    password: await bcrypt.hash("adminadmin", 10),
  }).save();

  // Priests
  const priests = Promise.all(
    readFromCSV("priests")
      .split("\n")
      .map((username, i) =>
        new User({
          username,
          role: Role.Priest,
          confirmed: true,
          email: `examplea${i}@koleda.com`,
          password: "124njrkgf8y%$!873y1jbhfa:A:sd",
        }).save()
      )
  );

  // Acolytes
  const acolytes = Promise.all(
    readFromCSV("acolytes")
      .split("\n")
      .map((username, i) =>
        new User({
          username,
          role: Role.Acolyte,
          confirmed: true,
          email: `examplep${i}@koleda.com`,
          password: "124njrkgf8y%$!873y1jbhfa:A:sd",
        }).save()
      )
  );
  const res = await Promise.all([acolytes, priests]);

  return { acolytes: res[0], priests: res[1] };
};
