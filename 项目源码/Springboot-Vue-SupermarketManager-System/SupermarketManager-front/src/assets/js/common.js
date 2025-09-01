/*
 * @Description: 
 * @Author: cow.horse
 * @Date: 2023-09-07 20:58:35
 */
import { getToken } from "@/assets/js/auth";
import axios from "axios";
import { Message } from "element-ui";
import Cookies from "js-cookie";
import qs from 'qs';

// const prefix_url = "http://localhost:9291"
const prefix_url = "http://127.0.0.1:9291"

/*刷新Cooke的存活时间*/
function refreshCookies() {
    var token=getToken()
    if (token){
        //刷新cookie
        axios({
            url:prefix_url+"/checkedToken",
            method:"GET",
            params:{token:token}
        }).then(res=>{
            res=res.data

            if (res.code==200){
                Cookies.set("token", res.data.token, {expires: 1/48})
                Cookies.set("employee", JSON.stringify(res.data.employee), {expires: 1/48})
            }

        }).catch((e)=>{
            console.log(e)
        })
    }
    return token;

}

/*post请求*/
export function ajaxPost(url, param) {
    return axios({
        url: prefix_url + url,
        method: "POST",
        headers:{
            'token': refreshCookies() //设置token 其中K名要和后端协调好
        },
        data: qs.stringify(param)
    }).catch((e) => {
        
        console.log(e);
        if (
            e.response == undefined ||
            e.response.data == undefined
        ) {
            popup(e, "error")
        } else {
            popup(e.response.data, "error")
        }

    })
}
/*json请求*/
export function ajaxJson(url, param) {
    return axios({
        url: prefix_url + url,
        method: "POST",
        headers:{
            'Content-Type':'application/json',
            'token': refreshCookies() //设置token 其中K名要和后端协调好
        },
        data: param
    }).catch((e) => {
        console.log(e);
        if (
            e.response == undefined ||
            e.response.data == undefined
        ) {
            popup(e, "error")
        } else {
            popup(e.response.data, "error")
        }

    })
}

/*GET请求*/
export function ajaxGet(url, param) {
    return axios({
        url: prefix_url + url,
        method: "GET",
        headers: {
            'token': refreshCookies() //设置token 其中K名要和后端协调好
        },
        params:param
    }).catch((e) => {
        console.log(e);
        if (
            e.response == undefined ||
            e.response.data == undefined
        ) {
            popup(e, "error")
        } else {
            popup(e.response.data, "error")
        }

    })
}
/*给用户弹出相应的提示*/
export function popup(msg, type) {
    switch (type) {
        case "warning":
            Message.warning(msg);
            break;
        case "error":
            Message.error({message: msg, duration: 5000, showClose: true});
            break;
        case "info":
            Message.info(msg);
            break;
        default:
            Message.success(msg);
    }

}
