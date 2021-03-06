/** 基于fetch 封装的网络请求工具类 **/

import {Component} from "react";
import {showToast} from "../configs";

/**
 * GET 请求时，拼接请求URL
 * @param url 请求URL
 * @param params 请求参数
 * @returns {*}
 */
const handleUrl = (url) => (params) => {
    if (params) {
        let paramsArray = [];
        Object.keys(params).forEach((key) =>
            paramsArray.push(key + "=" + encodeURIComponent(params[key]))
        );
        if (url.search(/\?/) === -1) {
            typeof params === "object" ? (url += "?" + paramsArray.join("&")) : url;
        } else {
            url += "&" + paramsArray.join("&");
        }
    }
    return url;
};

/**
 * fetch 网络请求超时处理
 * @param originalFetch 原始的fetch
 * @param timeout 超时时间 10s
 * @returns {Promise.<*>}
 */
const timeoutFetch = (originalFetch, timeout = 10000) => {
    let timeoutBlock = () => {
    };
    let timeoutPromise = new Promise((resolve, reject) => {
        timeoutBlock = () => {
            // 请求超时处理
            reject("timeout promise");
        };
    });

    // Promise.race(iterable)方法返回一个promise
    // 这个promise在iterable中的任意一个promise被解决或拒绝后，立刻以相同的解决值被解决或以相同的拒绝原因被拒绝。
    let abortablePromise = Promise.race([originalFetch, timeoutPromise]);

    setTimeout(() => {
        timeoutBlock();
    }, timeout);

    return abortablePromise;
};

/**
 * 网络请求工具类
 */
export default class HttpUtils extends Component {
    /**
     * 基于fetch 封装的GET 网络请求
     * @param url 请求URL
     * @param params 请求参数
     * @param cookie
     * @returns {Promise}
     */
    static getRequest = (url, params = {}, cookie = "") => {
        return timeoutFetch(
            fetch(handleUrl(url)(params), {
                method: "GET",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                    "Cookie": cookie
                }
            })
        ).then((response) => {
            if (response.ok) {
                return response.json();
            } else {
                showToast('服务器繁忙，请稍后再试！')
            }
        }).then((response) => {
            if (url.startsWith('https://www.wanandroid.com/')) {
                if (response.errorCode !== 0) {
                    showToast(response.errorMsg);
                    return response;
                } else {
                    return response;
                }
            } else {
                if (response.code === 0) {
                    return response;
                } else {
                    return JSON.parse(qqData);
                }
            }
        }).catch((error) => {
            if (url.startsWith('https://www.wanandroid.com/')) {
                showToast('当前网络不可用，请检查网络设置！')
            } else {
                return JSON.parse(qqData);
            }
        });
    };

    /**
     * 基于fetch 的 POST 请求
     * @param url 请求的URL
     * @param params 请求参数
     * @param cookie
     * @returns {Promise}
     */
    static postRequest = (url, params = {}, cookie = "") => {
        let formData = new FormData();
        Object.keys(params).forEach((key) => {
            if (!key.startsWith("_")) {
                formData.append(key, params[key])
            }
        });
        return timeoutFetch(
            fetch(url, {
                method: "POST",
                body: formData,
                headers: {"Cookie": cookie}
            })
        ).then((response) => {
            if (response.ok) {
                return response.json();
            } else {
                showToast('服务器繁忙，请稍后再试！')
            }
        }).then((response) => {
            if (response.errorCode !== 0) {
                showToast(response.errorMsg);
                return response;
            } else {
                return response;
            }
        }).catch((error) => {
            showToast('当前网络不可用，请检查网络设置！')
        });
    };
}

const qqData = "{" +
    "    \"code\": 0," +
    "    \"data\": {" +
    "        \"slider\": [" +
    "            {" +
    "                \"linkUrl\": \"http://y.qq.com/w/album.html?albummid=001yK59e03vJw8\"," +
    "                \"picUrl\": \"http://y.gtimg.cn/music/common/upload/MUSIC_FOCUS/1211744.jpg\"," +
    "                \"id\": 20243" +
    "            }," +
    "            {" +
    "                \"linkUrl\": \"https://y.qq.com/portal/headline/detail.html?zid=1188682\"," +
    "                \"picUrl\": \"http://y.gtimg.cn/music/common/upload/MUSIC_FOCUS/1211809.jpg\"," +
    "                \"id\": 20219" +
    "            }," +
    "            {" +
    "                \"linkUrl\": \"https://y.qq.com/msa/362/190_6978.html?openinqqmusic=1\"," +
    "                \"picUrl\": \"http://y.gtimg.cn/music/common/upload/MUSIC_FOCUS/1208359.jpg\"," +
    "                \"id\": 20199" +
    "            }," +
    "            {" +
    "                \"linkUrl\": \"https://y.qq.com/apg/zssphy/index.html?mbref=978.20117&openinqqmusic=1\"," +
    "                \"picUrl\": \"http://y.gtimg.cn/music/common/upload/MUSIC_FOCUS/1207125.jpg\"," +
    "                \"id\": 20149" +
    "            }," +
    "            {" +
    "                \"linkUrl\": \"http://y.qq.com/w/taoge.html?id=6701831734\"," +
    "                \"picUrl\": \"http://y.gtimg.cn/music/common/upload/MUSIC_FOCUS/1207484.jpg\"," +
    "                \"id\": 20189" +
    "            }" +
    "        ]" +
    "    }" +
    "}";