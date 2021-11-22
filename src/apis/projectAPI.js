import axiosClient from "./axios";

const projectAPI = {
    getALl: (params) => {
        const url = '/project';
        return axiosClient.get(url, { params })
    },
    createProject: (params) => {
        const url = '/project';
        return axiosClient.post(url, params);
    },
    submitHomework: (params) => {
        const url = "/project/submithomework";
        return axiosClient.post(url, params)
    },
    deleteProject: (params) => {
        const url = "/project/delete";
        return axiosClient.delete(url, { params });
    },
    configproject: (params) => {
        const url = "/project/configproject";
        return axiosClient.get(url, {params});
    },
    downloadProject: (params) => {
        const url = "/project/download";
        return axiosClient.get(url, {params});
    },
    modifyProject: (params) => {
        const url = "/project/modify";
        return axiosClient.put(url, {params});
    }
}

export default projectAPI;

