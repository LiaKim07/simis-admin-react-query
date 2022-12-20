import { useMutation, useQuery } from "react-query";
import { userService } from '../services/users/user.service';

class UserStore {
  getCurrentUser() {
    return useQuery(['getCurrentUser'], () => userService.fetchCurrentUser());
  }

  getAll() {
    return useQuery(["users"], () => userService.fetchAll());
  }

  create() {
    return useMutation(userService.create);
  }

  getrole() {
    return useQuery(["usersrole"], () => userService.getrole());
  }

  getById(id?: string) {
    return useQuery(
      ["usersById", id],
      () => userService.fetchById(id || ""),
      {
        enabled: !!id,
      }
    );
  }
}

export const userStore = new UserStore();
