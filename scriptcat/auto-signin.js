// ==UserScript==
// @name         自动签到
// @namespace    https://bbs.tampermonkey.net.cn/
// @version      0.1.0
// @description  try to take over the world!
// @author       You
// @crontab      * * once * *
// @grant        GM_xmlhttpRequest
// @grant        GM_notification
// @grant        GM_log
// @grant        GM_cookie
// @connect      bbs.tampermonkey.net.cn
// @connect      api.live.bilibili.com
// ==/UserScript==

const getNewDate = (type = 1) => {
  var date = new Date();
  var pad = (num) => num.toString().padStart(2, "0");

  var month = pad(date.getMonth() + 1);
  var day = pad(date.getDate());
  var hour = pad(date.getHours());
  var minute = pad(date.getMinutes());
  var second = pad(date.getSeconds());

  var baseDate = month + "-" + day;
  return type ? baseDate + " " + hour + ":" + minute + ":" + second : baseDate;
};

const request = (params, type = 0) =>
  new Promise((resolve, reject) => {
    GM_xmlhttpRequest(
      Object.assign(
        {
          onload: function (xhr) {
            switch (type) {
              case 1:
                resolve(xhr.response);
                break;
              default:
                resolve(JSON.parse(xhr.responseText));
            }
            // GM_log(xhr.response, "warn");
          },
        },
        params
      )
    );
  });

return new Promise((resolve, reject) => {
  const squirrelGPT = async (
    title = "松鼠GPT",
    url = "https://songshugpt.com/api/signin/sign"
  ) => {
    let myHeaders = {
      Authorization: "",
      // private
      Referer: "https://songshugpt.com/chat",
      "X-Website-Domain": "songshugpt.com",
    };
    const params = {
      method: "POST",
      url,
      headers: myHeaders,
      data: JSON.stringify({}),
    };
    const response = await request(params);
    return Promise.resolve({ title, text: response.message });
  };

  const tampermonkeyChinese = async (
    title = "油猴中文",
    url = "https://bbs.tampermonkey.net.cn/plugin.php?id=dsu_paulsign:sign&operation=qiandao&infloat=1&inajax=1"
  ) => {
    let formobj = new FormData();
    formobj.append("formhash", ""); // private
    formobj.append("qdmode", 3);
    formobj.append("todaysay", `${getNewDate()}签到咯！！！`);
    formobj.append("fastreply", 0);
    formobj.append("qdxq", "kx");

    const params = {
      method: "POST",
      url,
      data: formobj,
    };
    const response = await request(params, 1);
    if (response.indexOf("您今日已经签到，请明天再来") !== -1) {
      return Promise.resolve({ title, text: "已签到" });
    } else if (response.indexOf("恭喜你签到成功") !== -1) {
      return Promise.resolve({ title, text: "签到成功" });
    } else {
      return Promise.resolve({ title, text: "签到失败" });
    }
  };

  const bilibili = async (
    title = "哔哩哔哩",
    urlLogin = "https://api.bilibili.com/x/web-interface/nav",
    url = "https://api.live.bilibili.com/sign/doSign"
  ) => {
    let params = {
      method: "GET",
      url: urlLogin,
      responseType: "json",
    };
    let response = await request(params);
    let { code } = response;
    if (code == 0) {
      params = {
        method: "GET",
        url,
        responseType: "json",
      };
      response = await request(params);
      let { code, data } = response;
      let text = code == 0 ? data.text + data.specialText : response.message;
      return Promise.resolve({ title, text });
    } else if (code == -101) {
      return Promise.resolve({
        title,
        text: "未登录",
      });
    }
  };

  const quark = async (
    title = "夸克网盘",
    urlAccount = "https://pan.quark.cn/account/info",
    url = "https://drive-m.quark.cn/1/clouddrive/capacity/growth/sign?pr=ucpro&fr=pc&uc_param_str="
  ) => {
    let params = {
      method: "GET",
      url: urlAccount,
    };

    let response = await request(params);
    const nickname = response.data.nickname;
    if (nickname) {
      params = {
        method: "POST",
        url,
        data: JSON.stringify({
          sign_cyclic: true,
        }),
      };
      response = await request(params);
      let { code } = response;
      if (code == 0) {
        return Promise.resolve({
          title,
          text: `今日签到${response.data.sign_daily_reward / 1024 / 1024}MB`,
        });
      } else if (code == 44210) {
        return Promise.resolve({ title, text: `${nickname}已签到` });
      }
    } else {
      return Promise.resolve({ title, text: `未获取到账号信息` });
    }
  };

  const funcArr = [squirrelGPT, tampermonkeyChinese, bilibili, quark];
  Promise.all(funcArr.map((func) => func())).then((results) => {
    let notificationText = "";
    results.forEach(({ title, text }) => {
      notificationText += `${title.padEnd(8)}\t:  ${text}\n`;
    });
    GM_notification({
      title: "自动签到" + getNewDate(),
      text: notificationText,
    });
    console.log(notificationText);
  });
});
