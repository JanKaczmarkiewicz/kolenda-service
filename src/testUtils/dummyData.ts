export const dummyUserData = {
  email: "test@testdomain.com",

  password: "Sdasdasdafa",
  username: "TestUser",
};

export const dummyAcolytesData = ["a", "b", "c"].map((el) => ({
  email: `${el}${dummyUserData.email}`,
  password: `${dummyUserData.password}${el}`,
  username: `${el}${dummyUserData.username}`,
}));

export const dummySeasonData = {
  year: 2020,
};

export const dummyStreetData = {
  name: "Main st",
};

export const badToken = "bad_token";
export const badId = "bad_id";
