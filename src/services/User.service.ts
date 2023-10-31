import { IUser } from "./../types/user";
import { AxiosError } from "axios";
import httpClient from "../utils/httpClient";
import { string } from "zod";
import React from "react";

export class UserService {
  async create(
    name: string,
    email: string,
    income: number,
    setSuccess: (value: boolean) => void,
    setError: (value: boolean) => void
  ) {
    try {
      const { data } = await httpClient.post("/user", {
        nome: name,
        email: email,
        renda_mensal: income,
      });

      setSuccess(true);

      return data;
    } catch (error) {
      setError(true);
      if (error instanceof AxiosError) {
        throw new Error(error.message);
      }
      throw new Error("Error whiile creating user");
    }
  }

  async getAll(): Promise<IUser[]> {
    try {
      const { data } = await httpClient.get<IUser[]>("/user");

      return data;
    } catch (err) {
      throw new Error("Error while fetching users");
    }
  }

  async update(
    id: string,
    setSuccess: (value: boolean) => void,
    setError: (value: boolean) => void,
    nome?: string,
    email?: string,
    renda_mensal?: number
  ): Promise<IUser> {
    try {
      const userEmail = email.length > 0 ? email : null;
      const userName = nome.length > 0 ? nome : null;
      const userIncome = renda_mensal > 0 ? renda_mensal : null;

      type IBody = {
        nome?: string;
        email?: string;
        renda_mensal?: number;
      };

      const body: IBody = {};

      if (userEmail) {
        body.email = userEmail;
      }

      if (userName) {
        body.nome = userName;
      }

      if (userIncome) {
        body.renda_mensal = userIncome;
      }

      const { data } = await httpClient.put(`/user/${id}`, body);

      setSuccess(true);

      return data;
    } catch (error) {
      setError(true);
      console.log(error.response.data);
      throw new Error("Error while updating user");
    }
  }

  async delete(
    id: string,
    setSuccess: (value: boolean) => void,
    setError: (value: boolean) => void
  ) {
    try {
      await httpClient.delete(`/user/${id}`);

      setSuccess(true);

    } catch (err) {
      setError(true);
      throw new Error("Error while deleting user");
    }
  }
}
