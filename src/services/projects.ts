import { ProjectCreate, ProjectCreated, ProjectInfo, ProjectList } from '../models';
import { AxiosResponse } from 'axios';
import { BaseService } from '.';


export class Projects extends BaseService {
    public getAll(limit?: number, offset?: number): Promise<AxiosResponse<ProjectList>> {
        return this.api
            .get('/project', {params: {limit, offset}})
            .then(this.validateResponse<ProjectList>());
    }

    public get(code: string): Promise<AxiosResponse<ProjectInfo>> {
        return this.api
            .get(`/project/${code}`)
            .then(this.validateResponse<ProjectInfo>());
    }

    public create(data: ProjectCreate): Promise<AxiosResponse<ProjectCreated>> {
        return this.api
            .post('/project', data)
            .then(this.validateResponse<ProjectCreated>());
    }

    public exists(code: string): Promise<boolean> {
        return this.api
            .get(`/project/${code}`)
            .then(this.validateResponse<ProjectInfo>())
            .then((resp: AxiosResponse<ProjectInfo>) => Boolean(resp.data.code))
            .catch(() => false);
    }
}