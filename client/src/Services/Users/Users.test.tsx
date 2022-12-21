import { expect, jest, test } from "@jest/globals";
import * as react from "react";
import axios from "axios";


import * as UserFuntions from "./Users";

jest.mock("axios");

describe("Testing Login",()=>{
    it("returns an object on successfull  login", async () => {
        jest.spyOn(UserFuntions, "Login").mockImplementation(() =>
          Promise.resolve({
            auth: true,
            user: {
              username: "ren",
              userid: 1,
            },
          })
        );
        const response = await UserFuntions.Login("ren", "password");
       
      
        expect(response).toStrictEqual({
          auth: true,
          user: {
            username: "ren",
            userid: 1,
          },
        });
      });
})



describe("Testing login status",  () => {
  it("Return an object", async () => {
    jest.spyOn(UserFuntions, "getLoginStatus").mockImplementation(() => {
      return Promise.resolve({ isLoggedIn: true });
    });

    const response = await UserFuntions.getLoginStatus()
   

    expect(response).toStrictEqual({ isLoggedIn: true })
    
  });
});


