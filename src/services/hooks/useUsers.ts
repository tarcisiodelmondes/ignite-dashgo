import { UseQueryOptions, useQuery } from "react-query";
import { api } from "../api";

type UserProps = {
  id: string;
  name: string;
  email: string;
  created_at: string;
};

type Users = {
  totalCount: number;
  users: UserProps[];
};

export function useUsers(currentPage: number, props) {
  return useQuery(["users", currentPage], () => getUsers(currentPage), {
    staleTime: 1000 * 60 * 10,
    ...props,
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
    created_at: new Date(user.created_at).toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    }),
  }));

  return { users, totalCount };
}
