Page({
  data:{
    account:"/pages/image/account-circle-line.png",
    code:"/pages/image/lock.png",
    protocolWindow:false,
    agree:false,
    loginButtonText:"登录",
    rejrsterText:"没有账号，我要注册",
    rejrsterTap: "changeRejrster",
    loginType: "login",
    rejrsterWindow:false,
    isPassword:true,
    accountValue:"",
    codeValue:"",
    haveHistory:false,
    nodes: [{
      name: 'div',
      attrs: {
        
      },
      children: [
        {
          type: 'text',
          text: '\u3000\u3000',
        },
        {
          type: 'text',
          text: '在账号栏中输入你的客户编码或客户经理编码。他将作为账号使用。',
        },
        {
          name: 'br',
        },
        {
          name: 'br',
        },
        {
          type: 'text',
          text: '\u3000\u3000',
        },
        {
          type: 'text',
          text: '在密码栏中输入任意长度的由字母与数字组成的密码。',
        },
        {
          name: 'br',
        },
        {
          name: 'br',
        },
        {
          type: 'text',
          text: '\u3000\u3000',
        },
        {
          type: 'text',
          text: '点击下方按钮提交你的注册申请，如果通过，你将会以你刚刚注册的账号登录本程序。',
        },
      ],
    }],

  },
  onLoad(){
    let currentTime = new Date();
    dd.getStorage({
      key: "time",
      
      success:(res) => {
        // console.log(res)
        var timeDiff = currentTime.getTime() - res.data;
        // console.log(timeDiff)
        if(timeDiff/(1000 * 60 * 60 * 24) > 30){
        // if(timeDiff/1000 > 10){
          dd.removeStorage({
            key: 'account',
          });
          dd.removeStorage({
            key: 'code',
          });
          
        }else{
          // console.log(1234)
          dd.getStorage({
            key: "account",
            success: (res) => {
              if(res.data !== null){
                this.setData({
                  accountValue:res.data,
                  haveHistory:true,
                })
                dd.getStorage({
                  key: "code",
                  success: (res) => {
                    if(res.data !== null){
                      this.setData({
                        codeValue:res.data,
                        haveHistory:true,
                      })
                    }else{
                      this.setData({
                        haveHistory:false,
                      })
                    }
                    if(this.data.haveHistory){
                      this.setData({
                        agree:true
                      })
                    }
                  },
                  fail: () => {},
                  complete: () => {},
                });
              }else{
                this.setData({
                  haveHistory:false,
                })
              }
            },
            fail: () => {},
            complete: () => {},
          });
          // dd.clearStorageSync({});
        }
        
      },
      fail:() =>{
        
      }
    });

    
  },

  

  protocol:function(){
    this.setData({
      protocolWindow:true
    })
  },

  closeProtocolWindow:function(){
    this.setData({
      protocolWindow:false
    })
  },

  closeRejrsterWindow:function(){
    this.setData({
      rejrsterWindow:false
    })
  },

  agree:function(e){
    if(e.detail.value[0] == 'agree'){
      this.setData({
        agree: true
      })
    }else{
      this.setData({
        agree: false
      })
    }
  },
  changeRejrster:function(){
    this.setData({
      loginButtonText:"注册并登录",
      rejrsterText:"已有账号，我要登录",
      rejrsterTap: "changeLogin",
      loginType:"rejrsterAndLogin",
      rejrsterWindow:true,
      isPassword:false,
    })  
  },
  changeLogin:function(){
    this.setData({
      loginType: "login",
      loginButtonText:"登录",
      rejrsterText:"没有账号，我要注册",
      rejrsterTap: "changeRejrster",
      isPassword:true,
    })
  },

  rejrsterAndLogin:function(e){
    let isAgree = this.data.agree;
    if(!isAgree){
      this.setData({
        protocolWindow: true
      })
      return
    }

    let acc = e.detail.value["account"];
    let cod = e.detail.value["code"];

    dd.showLoading({
      content: '注册中...',
      success: () => {},
      fail: () => {},
      complete: () => {},
    });
    dd.httpRequest({
      url: 'https://yz-znpk.966599.com/register/',
      data: JSON.stringify({ Id_status: acc, password: cod }),
      method: 'POST',
      headers: {  'Content-Type': 'application/json'  },
      timeout: 30000,
      dataType: 'json',

      success: (res) => {
        dd.showLoading({
          content: '登录中...',
        });
        let id = acc;
        dd.httpRequest({
          url: 'https://yz-znpk.966599.com/sign/',
          data: JSON.stringify({ username: acc, password: cod }),
          
          method: 'POST',
          headers: {  'Content-Type': 'application/json'  },
          timeout: 30000,
          dataType: 'json',
          success: (res) => {
            // console.log(res)
            // console.log(res.data.data["authority"])
            let name = "&name=" + res.data.data["username"];
            let m = "&authority=" + res.data.data["authority"];
            let token = "&token=" + res.data["token"];
            if(res.data["code"] === 0){
              if(res.data.data["authority"] <= 0){
                dd.httpRequest({
                  url: 'https://yz-znpk.966599.com/getManagerInfo/',
                  method: 'GET',
                  headers: { 'Authorization' : 'Bearer ' + res.data["token"] },
                  timeout: 30000,
                  dataType: 'json',
                  success: (res) => {
                    
                    let managerName = "&managerName=" + res.data.data["name_manager"];
                    let managerID = "&managerID=" + res.data.data["Id_manager"];
                    
                    let url = "/pages/workbench/workbench?customerID="+id+m+token+managerName+managerID+name;
                    // console.log(url)
                    dd.redirectTo({
                  
                      url: url,
                      
                      success: () => {
                        let currentTime = new Date();
                        // console.log(1234)
                        this.saveUserToStorage(acc,cod,currentTime.getTime());
                      },
                      fail: () => {},
                      complete: () => {},
                    });
                  },
                  fail: (res) => {
                    
                  },
                  complete: () => {},
                });
              }else if(res.data.data["authority"] == 1){
                // console.log(99)
                dd.httpRequest({
                  url: 'https://yz-znpk.966599.com/getDealerList/',
                  method: 'GET',
                  headers: { 'Authorization' : 'Bearer ' + res.data["token"] },
                  timeout: 30000,
                  dataType: 'json',
                  success: (res) => {

                    // let m = "&authority=" + res.data.data["authority"];
                    // let token = "&token=" + res.data["token"];
                    let list = res.data.data
                    let url = "/pages/workbench/workbench?customerID="+id+m+token+name;
                    dd.setStorage({
                      key: 'list',
                      data: list
                    });
                    let currentTime = new Date();
                    this.saveUserToStorage(acc,cod,currentTime.getTime());
                    dd.redirectTo({
                  
                      url: url,
                      
                      success: () => {
                        
                      },
                      fail: () => {},
                      complete: () => {},
                    });
                  },
                  fail: (res) => {
                    switch(res.data["code"]){
                      case 1000:
                        dd.alert({
                          title: '参数错误',
                          content: res.data["error"],
                          buttonText: '我知道了',
                        });
                        break;
                      case 1001:
                        dd.alert({
                          title: '客户经理信息缺失',
                          content: res.data["error"],
                          buttonText: '我知道了',
                        });
                        let m = "&authority=" + res.data.data["authority"];
                        let token = "&token=" + res.data["token"];
                        let url = "/pages/workbench/workbench?customerID="+id+m+token;
                        dd.redirectTo({
                      
                          url: url,
                          
                          success: () => {},
                          fail: () => {},
                          complete: () => {},
                        });
                        break;
                      case 1002:
                        dd.alert({
                          title: '客户经理不存在',
                          content: res.data["error"],
                          buttonText: '我知道了',
                        });
                        break;
                    }
                    // dd.alert({
                    //   title: '用户名或密码不正确',
                    //   content: res.data["msg"],
                    //   buttonText: '我知道了',
                    //   success: () => {},
                    //   fail: () => {},
                    //   complete: () => {},
                    // });
                    console.log(res)
                  },
                  complete: () => {},
                });
              }else if(res.data.data["authority"] == 2){
                let ManagerList ;
                dd.httpRequest({
                  url: 'https://yz-znpk.966599.com/getAreaManagerList/',
                  method: 'GET',
                  headers: { 'Authorization' : 'Bearer ' + res.data["token"] },
                  timeout: 30000,
                  dataType: 'json',
                  success: (res) => {
                    ManagerList = res.data.data
                  }
                });
                dd.httpRequest({
                  url: 'https://yz-znpk.966599.com/getAreaDealerList/',
                  method: 'GET',
                  headers: { 'Authorization' : 'Bearer ' + res.data["token"] },
                  timeout: 30000,
                  dataType: 'json',
                  success: (res) => {

                    // let m = "&authority=" + res.data.data["authority"];
                    // let token = "&token=" + res.data["token"];
                    let list = res.data.data
                    let url = "/pages/workbench/workbench?customerID="+id+m+token+name;
                    dd.setStorage({
                      key: 'list',
                      data: list
                    });
                    dd.setStorage({
                      key: 'list2',
                      data: ManagerList
                    });
                    let currentTime = new Date();
                    this.saveUserToStorage(acc,cod,currentTime.getTime());
                    dd.redirectTo({
                  
                      url: url,
                      
                      success: () => {
                        
                      },
                      fail: () => {},
                      complete: () => {},
                    });
                  },
                  fail: (res) => {
                    switch(res.data["code"]){
                      case 1000:
                        dd.alert({
                          title: '参数错误',
                          content: res.data["error"],
                          buttonText: '我知道了',
                        });
                        break;
                      case 1001:
                        dd.alert({
                          title: '客户经理信息缺失',
                          content: res.data["error"],
                          buttonText: '我知道了',
                        });
                        let m = "&authority=" + res.data.data["authority"];
                        let token = "&token=" + res.data["token"];
                        let url = "/pages/workbench/workbench?customerID="+id+m+token;
                        dd.redirectTo({
                      
                          url: url,
                          
                          success: () => {},
                          fail: () => {},
                          complete: () => {},
                        });
                        break;
                      case 1002:
                        dd.alert({
                          title: '客户经理不存在',
                          content: res.data["error"],
                          buttonText: '我知道了',
                        });
                        break;
                    }
                    // dd.alert({
                    //   title: '用户名或密码不正确',
                    //   content: res.data["msg"],
                    //   buttonText: '我知道了',
                    //   success: () => {},
                    //   fail: () => {},
                    //   complete: () => {},
                    // });
                    console.log(res)
                  },
                  complete: () => {},
                });
              }else if(res.data.data["authority"] == 3){
                let ManagerList ;
                dd.httpRequest({
                  url: 'https://yz-znpk.966599.com/getAllManagerList/',
                  method: 'GET',
                  headers: { 'Authorization' : 'Bearer ' + res.data["token"] },
                  timeout: 30000,
                  dataType: 'json',
                  success: (res) => {
                    ManagerList = res.data.data
                  }
                });
                dd.httpRequest({
                  url: 'https://yz-znpk.966599.com/getAllDealerList/',
                  method: 'GET',
                  headers: { 'Authorization' : 'Bearer ' + res.data["token"] },
                  timeout: 30000,
                  dataType: 'json',
                  success: (res) => {

                    // let m = "&authority=" + res.data.data["authority"];
                    // let token = "&token=" + res.data["token"];
                    let list = res.data.data
                    let url = "/pages/workbench/workbench?customerID="+id+m+token+name;
                    dd.setStorage({
                      key: 'list',
                      data: list
                    });
                    dd.setStorage({
                      key: 'list2',
                      data: ManagerList
                    });
                    let currentTime = new Date();
                    this.saveUserToStorage(acc,cod,currentTime.getTime());
                    dd.redirectTo({
                  
                      url: url,
                      
                      success: () => {
                        
                      },
                      fail: () => {},
                      complete: () => {},
                    });
                  },
                  fail: (res) => {
                    switch(res.data["code"]){
                      case 1000:
                        dd.alert({
                          title: '参数错误',
                          content: res.data["error"],
                          buttonText: '我知道了',
                        });
                        break;
                      case 1001:
                        dd.alert({
                          title: '客户经理信息缺失',
                          content: res.data["error"],
                          buttonText: '我知道了',
                        });
                        let m = "&authority=" + res.data.data["authority"];
                        let token = "&token=" + res.data["token"];
                        let url = "/pages/workbench/workbench?customerID="+id+m+token;
                        dd.redirectTo({
                      
                          url: url,
                          
                          success: () => {},
                          fail: () => {},
                          complete: () => {},
                        });
                        break;
                      case 1002:
                        dd.alert({
                          title: '客户经理不存在',
                          content: res.data["error"],
                          buttonText: '我知道了',
                        });
                        break;
                    }
                    // dd.alert({
                    //   title: '用户名或密码不正确',
                    //   content: res.data["msg"],
                    //   buttonText: '我知道了',
                    //   success: () => {},
                    //   fail: () => {},
                    //   complete: () => {},
                    // });
                    console.log(res)
                  },
                  complete: () => {},
                });
              }
              
              
            }else if(res.data["code"] == 1000){
              dd.alert({
                title: '用户名或密码不正确',
                content: res.data["msg"],
                buttonText: '我知道了',
              });
            }
          },
          fail: (e) => {
            dd.alert({
              title: '登录请求发送失败',
              content: '错误原因：' + e.errorMessage,
              buttonText: '我知道了',
            });
          },
          complete: () => {
            dd.hideLoading({
            });
          },
        });

      },
      fail: (res) => {
        switch(res.data["code"]){
          case 1000:
            dd.alert({
              title: '参数错误',
              content: res.data["error"],
              buttonText: '我知道了',
            });

            break;
          case 1001:
            dd.alert({
              title: '填写的账号不存在',
              content: res.data["error"],
              buttonText: '我知道了',
            });
            break;
          case 1002:
            dd.alert({
              title: '填写的账号已注册',
              content: res.data["error"],
              buttonText: '我知道了',
            });
            break;
        }
      },
      complete: () => {
        dd.hideLoading({
        });
      },
    });
  },

  login:function(e){
    let isAgree = this.data.agree;
    if(!isAgree){
      this.setData({
        protocolWindow: true
      })
      return
    }

    let acc = e.detail.value["account"];
    let cod = e.detail.value["code"];
    
    let currentTime = new Date();
    let id = acc;
    
    dd.showLoading({
      content: '登录中...',
      success: () => {

      },
      fail: () => {

      },
      complete: () => {},
    });
    dd.httpRequest({
      // url: 'http://10.11.0.63:8080/sign/',
      url: 'https://yz-znpk.966599.com/sign/',
      //url: 'https://ql.966599.com/api/qsource/9616d09b-f4e1-4078-ad03-9d4fe4967d0a',

      data: JSON.stringify({ username: acc, password: cod }),
      
      method: 'POST',
      headers: {  'Content-Type': 'application/json'  },
      timeout: 30000,
      dataType: 'json',
      success: (res) => {
        
        // console.log(res.data.data["authority"])
        // console.log(res.data["token"])
        if(res.data["code"] == 1000){
          dd.hideLoading({
          });
          dd.alert({
            title: '此客户或客户经理不存在',
            content: res.data["msg"],
            buttonText: '我知道了',
          });

        }else if(res.data["code"] === 0){
          // console.log(res)
          let name = "&name=" + res.data.data["username"];
          let m = "&authority=" + res.data.data["authority"];
          let token = "&token=" + res.data["token"];
          if(res.data.data["authority"] == 0){
            dd.httpRequest({
              url: 'https://yz-znpk.966599.com/getManagerInfo/',
              method: 'GET',
              headers: { 'Authorization' : 'Bearer ' + res.data["token"] },
              timeout: 30000,
              dataType: 'json',
              success: (res) => {
                let managerName = "&managerName=" + res.data.data["name_manager"];
                let managerID = "&managerID=" + res.data.data["Id_manager"];
                // let name = "&name=" + res.data.data["name_dealer"];
                let url = "/pages/workbench/workbench?customerID="+id+m+token+managerName+managerID+name;
                // console.log(url)
                dd.redirectTo({
                  url: url,
                  success: () => {
                    let currentTime = new Date();
                    // console.log(1234)
                    this.saveUserToStorage(acc,cod,currentTime.getTime());
                    dd.hideLoading({
                    });
                  },
                  fail: () => {
                    
                  },
                  complete: (res) => {
                    
                  },
                });
              },
              fail: (res) => {
                // console.log(res)
              },
              complete: () => {},
            });
          }else if(res.data.data["authority"] == 1){
            // console.log(99)
            dd.httpRequest({
              url: 'https://yz-znpk.966599.com/getDealerList/',
              method: 'GET',
              headers: { 'Authorization' : 'Bearer ' + res.data["token"] },
              timeout: 30000,
              dataType: 'json',
              success: (res) => {
                // console.log(res)
                // let m = "&authority=" + res.data.data["authority"];
                // let token = "&token=" + res.data["token"];
                let list = res.data.data
                // console.log(res.data.data)
                let url = "/pages/workbench/workbench?customerID="+id+m+token+name;
                // console.log(url)
                dd.setStorage({
                  key: 'list',
                  data: list
                });
                let currentTime = new Date();
                this.saveUserToStorage(acc,cod,currentTime.getTime());
                dd.redirectTo({
              
                  url: url,
                  
                  success: () => {
                    dd.hideLoading({
                    });
                  },
                  fail: (res) => {

                  },
                  complete: (res) => {
                    
                    // dd.alert({
                    //   title: '网络链接情况',
                    //   content: res.status,
                    //   buttonText: '我知道了',
                    // });
                    // print(status)
                  },
                });
                if(res.data["code"] == 1001 && res.data.data["authority"] != -1){
                  dd.alert({
                    title: '客户经理信息缺失',
                    content: res.data["msg"],
                    buttonText: '我知道了',
                  });
                }
              },
              fail: (res) => {
                dd.hideLoading({
                });
                switch(res.data["code"]){
                  case 1000:
                    dd.alert({
                      title: '参数错误',
                      content: res.data["error"],
                      buttonText: '我知道了',
                    });
                    break;
                  case 1001:
                    // dd.alert({
                    //   title: '客户经理信息缺失',
                    //   content: res.data["error"],
                    //   buttonText: '我知道了',
                    // });
                    break;
                  case 1002:
                    dd.alert({
                      title: '客户经理不存在',
                      content: res.data["error"],
                      buttonText: '我知道了',
                    });
                    break;
                    
                }
                // dd.alert({
                //   title: '用户名或密码不正确',
                //   content: res.data["msg"],
                //   buttonText: '我知道了',
                //   success: () => {},
                //   fail: () => {},
                //   complete: () => {},
                // });
                // console.log(res)
              },
              complete: () => {},
            });
          }else if(res.data.data["authority"] == 2){
            let ManagerList ;
            dd.httpRequest({
              url: 'https://yz-znpk.966599.com/getAreaManagerList/',
              method: 'GET',
              headers: { 'Authorization' : 'Bearer ' + res.data["token"] },
              timeout: 30000,
              dataType: 'json',
              success: (res) => {
                ManagerList = res.data.data
              }
            });
            dd.httpRequest({
              url: 'https://yz-znpk.966599.com/getAreaDealerList/',
              method: 'GET',
              headers: { 'Authorization' : 'Bearer ' + res.data["token"] },
              timeout: 30000,
              dataType: 'json',
              success: (res) => {

                // let m = "&authority=" + res.data.data["authority"];
                // let token = "&token=" + res.data["token"];
                let list = res.data.data
                let url = "/pages/workbench/workbench?customerID="+id+m+token+name;
                dd.setStorage({
                  key: 'list',
                  data: list
                });
                dd.setStorage({
                  key: 'list2',
                  data: ManagerList
                });
                let currentTime = new Date();
                this.saveUserToStorage(acc,cod,currentTime.getTime());
                dd.redirectTo({
              
                  url: url,
                  
                  success: () => {
                    dd.hideLoading({
                    });
                  },
                  fail: () => {},
                  complete: () => {},
                });
              },
              fail: (res) => {
                dd.hideLoading({
                });
                switch(res.data["code"]){
                  case 1000:
                    dd.alert({
                      title: '参数错误',
                      content: res.data["error"],
                      buttonText: '我知道了',
                    });
                    break;
                  case 1001:
                    dd.alert({
                      title: '客户经理信息缺失',
                      content: res.data["error"],
                      buttonText: '我知道了',
                    });
                    let m = "&authority=" + res.data.data["authority"];
                    let token = "&token=" + res.data["token"];
                    let url = "/pages/workbench/workbench?customerID="+id+m+token;
                    dd.redirectTo({
                  
                      url: url,
                      
                      success: () => {},
                      fail: () => {},
                      complete: () => {},
                    });
                    break;
                  case 1002:
                    dd.alert({
                      title: '客户经理不存在',
                      content: res.data["error"],
                      buttonText: '我知道了',
                    });
                    break;
                }
                
                // console.log(res)
              },
              complete: () => {},
            });
          }else if(res.data.data["authority"] == 3 || res.data.data["authority"] == -1){
            let ManagerList ;
            dd.httpRequest({
              url: 'https://yz-znpk.966599.com/getAllManagerList/',
              method: 'GET',
              headers: { 'Authorization' : 'Bearer ' + res.data["token"] },
              timeout: 30000,
              dataType: 'json',
              success: (res) => {
                // console.log(res)
                ManagerList = res.data.data
              }
            });
            dd.httpRequest({
              url: 'https://yz-znpk.966599.com/getAllDealerList/',
              method: 'GET',
              headers: { 'Authorization' : 'Bearer ' + res.data["token"] },
              timeout: 30000,
              dataType: 'json',
              success: (res) => {
                console.log(res)
                // let m = "&authority=" + res.data.data["authority"];
                // let token = "&token=" + res.data["token"];
                let list = res.data.data
                let url = "/pages/workbench/workbench?customerID="+id+m+token+name;
                dd.setStorage({
                  key: 'list',
                  data: list
                });
                dd.setStorage({
                  key: 'list2',
                  data: ManagerList,
                });
                let currentTime = new Date();
                this.saveUserToStorage(acc,cod,currentTime.getTime());
                dd.redirectTo({
              
                  url: url,
                  
                  success: () => {
                    dd.hideLoading({
                    });
                  },
                  fail: () => {},
                  complete: () => {},
                });
              },
              fail: (res) => {
                dd.hideLoading({
                });
                switch(res.data["code"]){
                  case 1000:
                    dd.alert({
                      title: '参数错误',
                      content: res.data["error"],
                      buttonText: '我知道了',
                    });
                    break;
                  case 1001:
                    dd.alert({
                      title: '客户经理信息缺失',
                      content: res.data["error"],
                      buttonText: '我知道了',
                    });
                    let m = "&authority=" + res.data.data["authority"];
                    let token = "&token=" + res.data["token"];
                    let url = "/pages/workbench/workbench?customerID="+id+m+token;
                    dd.redirectTo({
                  
                      url: url,
                      
                      success: () => {},
                      fail: () => {},
                      complete: () => {},
                    });
                    break;
                  case 1002:
                    dd.alert({
                      title: '客户经理不存在',
                      content: res.data["error"],
                      buttonText: '我知道了',
                    });
                    break;
                }
                
                // console.log(res)
              },
              complete: () => {},
            });
          }

          
        }else if(res.data["code"] === 1001){
          dd.hideLoading({
          });
          dd.confirm({
            title: '未注册的账号',
            content: '是否使用你填写的账号密码信息为您自动注册并登录？',
            cancelButtonText: '不',
            confirmButtonText: '帮我注册',
            success: (res) => {
              const { confirm } = res;
              if(confirm){
                this.rejrsterAndLogin(e)
              }else{
                this.changeRejrster()
              }
            },
            fail: () => {},
            complete: () => {},
          });
        }else if(res.data["code"] === 1002){
          dd.hideLoading({
          });
          dd.alert({
            title: '用户名或密码不正确',
            content: res.data["msg"],
            buttonText: '我知道了',
            success: () => {},
            fail: () => {},
            complete: () => {},
          });
        }
      },
      fail: (e) => {


        dd.hideLoading({
        });
      },
      complete: () => {

      },
    });
    
  },
  lostFocus:function(e){
    if(e.currentTarget["id"] == "accountInput"){
      this.setData({
        accountValue:e.detail.value
      })
    }else if(e.currentTarget["id"] == "codeInput"){
      this.setData({
        codeValue:e.detail.value
      })
    }
  },

  saveUserToStorage(acc,cod,time){
    // console.log(acc)
    // console.log(cod)

    dd.setStorage({
      key: 'account',
      data: acc,
    });

    dd.setStorage({
      key: 'code',
      data: cod,
    });

    dd.setStorage({
      key: 'time',
      data: time,
    });
  },

  unAgreeButton:function(){
    this.setData({
      agree:false,
      protocolWindow:false
    })
  },

  agreeButton:function(){
    this.setData({
      agree:true,
      protocolWindow:false
    })
  }
})