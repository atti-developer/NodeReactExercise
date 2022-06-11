import axios from "axios";
import { BASE_URL } from "./baseURL";
axios.defaults.baseURL = BASE_URL;




export const GET_GLOSSORY_LIST = async (currentPage, itemPerPage, searchData) => {
    try {
        const res = await axios.get(`customer/grossaries`, { params: { currentPage, itemPerPage, searchData } });
        console.log(res.data)
        let { status, data } = res.data;
        console.log(data)

        if (status === true) {
            return { data };
        }
    } catch (error) {
        return { error };
    }
}

export const POST_GLOSSORY = async (FormData) => {
    try {
        const res = await axios.post(`customer/grossaries`, FormData);
        let { status, msg } = res.data;
        return { status, msg }
    } catch (error) {
        return { error };
    }
}
export const GET_GLOSSARY_DETAIL = async (_id) => {
    try {
        const res = await axios.get(`customer/grossaries/${_id}`);
        let { status, data } = res.data;
        if (status === true) {
            return { data };
        }
    } catch (error) {
        return { error };
    }
}


export const UPDATE_GLOSSORY = async (FormData) => {
    try {
        console.log("UPDATE_GLOSSORY : ", FormData)
        const res = await axios.put(`customer/grossaries/${FormData._id}`, FormData);
        let { status, msg } = res.data;
        return { status, msg }
    } catch (error) {
        return { error };
    }
}


export const DELETE_GLOSSARY = async (_id) => {
    try {
        const res = await axios.delete(`customer/grossaries/${_id}`);
        let { status, data } = res.data;
        if (status === true) {
            return { data };
        }
    } catch (error) {
        return { error };
    }
}
