import { useMutation, useQuery } from "react-query";
import { projectService } from "../services/projects/project.service";

class ProjectsStore {
    getAll() {
        return useQuery(["projects"], () => projectService.fetchAll());
    }

    create() {
        return useMutation(projectService.create);
    }

    update() {
        return useMutation(projectService.update);
    }

    getById(id?: string) {
        return useQuery(
            ["projectsById", id],
            () => projectService.fetchById(id || ""),
            {
                enabled: !!id,
            }
        );
    }

    removeById() {
        return useMutation(projectService.removeById);
    }
}

export const projectsStore = new ProjectsStore();