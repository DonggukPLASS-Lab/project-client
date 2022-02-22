import axiosClient from "./axios";

const userAPI = {
    loginUser: (params) => {
        const url = '/users/login';
        return axiosClient.post(url, params);
    },
    auth: (params) => {
        const url = '/users/auth';
        return axiosClient.post(url, params );
    },
    createUserFolder: (params) => {
        const url = '/users/createfolder';
        return axiosClient.post(url, params);
    },
    runDocker: (params) => {
        const url = '/users/dockerrun';
        return axiosClient.post(url, params);
    },
    getTimeCreated: (params) => {
        const url = '/users/gettimecreated';
        return axiosClient.post(url, params)
    },
    getMyCourses: (params) => {
        const url ='/users/getmycourses';
        return axiosClient.get(url, params);
    },
    createContainer: (params) => {
        const url = '/users/createcontainer';
        return axiosClient.post(url, params );
    },
    getContainer: (params) => {
        const url = '/users/getcontainer';
        return axiosClient.get(url, params)
    },
    setStatusContainer: (params) => {
        const url = '/users/setstatuscontainer';
        return axiosClient.get(url, params);
    }
}

export default userAPI;