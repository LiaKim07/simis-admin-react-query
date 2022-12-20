import { useMutation, useQuery } from "react-query";

import { accessLevelsService } from "../services/accesslevels/accesslevels.service";

class AccessLevelsStore {
    create() {
        return useMutation(accessLevelsService.create);
    }
    update() {
        return useMutation(accessLevelsService.update);
    }
    getAll() {
        return useQuery(["accessLevels"], () => accessLevelsService.fetchAll());
    }
    getById(id?: string) {
        return useQuery(
            ["accessLevelsById", id],
            () => accessLevelsService.fetchById(id || ""),
            {
                enabled: !!id,
            }
        );
    }

    removeById() {
        return useMutation(accessLevelsService.removeById);
    }
}

export const accessLevelsStore = new AccessLevelsStore();
