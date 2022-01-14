import { useQuery } from "react-query";
import { api } from "../api";

type UserProps = {
  id: string;
  name: string;
  email: string;
  createdAt: string;
};

type Users = {
  users: UserProps[];
};

export function useUsers(currentPage: number) {
  return useQuery(["users", currentPage], () => getUsers(currentPage), {
    staleTime: 1000 * 5,
  });
}

export async function getUsers(currentPage: number) {
  const { data, headers } = await api.get<Users>("users", {
    params: {
      page: currentPage,
    },
  });

  const totalCount = Number(headers["x-total-count"]);

  const users = data.users.map((user) => ({
    id: user.id,
    name: user.name,
    email: user.email,
    createdAt: new Date(user.createdAt).toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    }),
  }));

  return { users, totalCount };
}
