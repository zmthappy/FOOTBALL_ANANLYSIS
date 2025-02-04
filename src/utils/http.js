
import axios from "axios";
let api_base_url = ''
if (import.meta.env.MODE === 'development') {
    api_base_url = import.meta.env.VITE_APP_APIBASE
} else if (import.meta.env.MODE === 'production') {
    api_base_url = import.meta.env.VITE_APP_APIBASE
}
axios.defaults.baseURL = api_base_url;

const http = axios.create({
    headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36",
        "Accept-Language": "zh-CN,zh;q=0.9",
        "Accept-Encoding": "gzip, deflate, br",
        'Accept': "application/json, text/plain, */*",
        "Content-Type": "application/json;charset=utf-8",
        "Connection": "keep-alive",
        "Cookie": 'VUID=VUID1660971514734693048; Hm_lvt_2f681cc061628030f35b9c0e56b9b06c=1686139220; NAGENTID=2335205; JSESSIONID=591827C421454A34F95908777819D37C.c219; jcobroute=39c10c70202ef73cb885a1d700f518f5; firstStart=true; Hm_lvt_f081063fc7e101407949a8005a9b3e56=1687364012,1687397231,1687493950,1687519963; Hm_lpvt_f081063fc7e101407949a8005a9b3e56=1687520042'
    }
});

const Post = (url, params, options = {}) => {
    return axios.post(
        url,
        params,
        {
            'Content-Type': 'multipart/form-data'
        }
    ).then((data = {}) => {
        return Promise.resolve(data.data ? data.data : false);
    });
};

const Get = (url, params) => {
    return get(
        url,
        params,
    ).then((data = {}) => {
        return Promise.resolve(data.data ? data.data : false);
    });
};

// 请求拦截器
http.interceptors.request.use(
    config => {
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

// 响应拦截器
http.interceptors.response.use(
    response => {
    },
    error => {
        return Promise.reject(error);
    }
);

export default {
    Post,
    Get,
};



