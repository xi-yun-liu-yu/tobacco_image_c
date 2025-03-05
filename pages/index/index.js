Page({
  data:{
    path_01: [],
    path_02: [],
    path_03: [],
    path_04: [],
    indicatorDots: true,
    autoplay: false,
    vertical: false,
    interval: 0,
    circular: true,
    aspectRatio: 16/9,
    loader: false,
    imageSrc: [],
    table_01: false,
    table_02: false,
    table_03: false,
    table_04: true,
    table_05: false,
    datanum: 0,
    result: [],
    dicArray_01: [], 
    dicArray_02: [],
    dicArray_03: [],
    dicArray_04: [],
    current_01: 0,
    current_02: 0,
    current_03: 0,
    current_04: 0,
    bt_index: 0,
    Text_01: "识别",
    Text_02: "识别",
    Text_03: "识别",
    Text_04: "识别",
    Text: '统计',
    showList_01: [],
    showList_02: [],
    showList_03: [],
    showList_04: [],
    resultsList: [],
    displayClass_01: "unShow",
    displayClass_02: "unShow",
    displayClass_03: "unShow",
    displayClass_04: "unShow",
    editing_01: false,
    editing_02: false,
    editing_03: false,
    editing_04: false,
    backColoer:"",
    inputValue: -1,
    intervalId: null,
    vName:"这里是品规名称",
    prooductUnit:"条",
    index1: -1,
    index2: -1,
    ThouchStop: false,
    hasMask: false,
    columArray: [],
    value: [20],
    inputFocus: true,
    customerID: "",
    authority: "",
    token:"",
    managerID:"",
    managerName:"",
    name:"",
    authorityText: "",
    qian:true,
    bei:false,
    di:false,
    tui:false,
    zong:false,
    delta:"delta",
    delta2:"delta",
    coloer1:"coloer",
    coloer2:"",
    coloer3:"",
    coloer4:"",
    coloer5:"",
    menuText:"处理前柜",
    needChange:false,
    needChange2:false,
    rowNum01:0,
    rowNum02:0,
    rowNum03:0,
    rowNum04:0,
    addRecord:false,
    theChoose:"未选择客户",
    customerList:[],
    filteredcustomerList:[],
    customerChoose:false,
    theChooseId:"",
    sum:0,
    options: [],
    filteredOptions: [],
    addNameChoose:false,
    addNameText:"点此选择",
    addNameId:"",
    chooseType:-1,
    canExit:false,
  },

  onLoad(query) {
    // 页面加载
    // console.info(`Page onLoad with query: ${JSON.stringify(query)}`);
    const colorScheme = dd.canIUse("getColorSchemeSync") ? dd.getColorSchemeSync() : "light";
    if(colorScheme == "light"){
      this.setData({
        backColoer: "white",
      })
    }else{
      this.setData({
        backColoer: "black",
      })
    }
    if(query["authority"] == 0){
      this.setData({
        customerID: query["customerID"],
        authority: query["authority"],
        token: query["token"],
        managerID:query["managerID"],
        managerName:query["managerName"],
        name:query["name"]
      })
    }else if(query["authority"] > 0 || query["authority"] == -1){
      this.setData({
        customerID: query["customerID"],
        authority: query["authority"],
        token: query["token"],
        name:query["name"]
        
      })
      dd.getStorage({
        key: `list`,
        success: (res) => {
          // console.log(res)
          this.setData({
            customerList: res.data,
            filteredcustomerList: res.data
          })
        },
        fail: () => {},
        complete: () => {},
      });
    }
    let temp = "";
    switch(query["authority"]){
      case '0':
        temp = "客户";
        break;
      case '1':
        temp = this.data.name+"的客户";
        break;
      case '2':
        temp = this.data.name+"的客户";
        break;
      case '3':
        temp = this.data.name+"的客户";
        break;
    }
    this.setData({
      authorityText:temp
    })
    dd.alert({
      title: '注意！注意！',
      content: '完成所有图片识别后，务必进入"查看总计"界面，点击"上传结果"按钮',
      buttonText: '我知道了',
      success: () => {},
      fail: () => {},
      complete: () => {},
    });
  },
  
  onReady() {
    // 页面加载完成
    dd.httpRequest({
      url:  'https://localhost:8080/getAllProducts/',
      data: {},
      method: 'GET',
      headers:{ 'Authorization' : 'Bearer ' + this.data.token },
      timeout: 30000,
      dataType: 'json',
      success: (res) => {
        const { data, status, headers } = res;
        // console.log(data.data)
        this.setData({
          options: data.data,
          filteredOptions: data.data
        })
      },
      fail: () => {},
      complete: () => {},
    });
  },
  onShow() {
    // 页面显示
  },
  onHide() {
    // 页面隐藏
    // console.log(2)
    // if(!this.data.canExit && this.data.showList_01.length != 0 && this.data.showList_02.length != 0 && this.data.showList_03.length != 0 && this.data.showList_04.length != 0){
    //   dd.confirm({
    //     title: '有未提交的结果',
    //     content: '您有未提交的识别结果，是否自动帮您提交',
    //     cancelButtonText: '不',
    //     confirmButtonText: '好',
    //     success: (res) => {
    //       const { confirm } = res;
    //       console.log(confirm)
    //     },
    //     fail: () => {},
    //     complete: () => {},
    //   });
    // }
  },
  onUnload() {
    // console.log(1)
    // if(!this.data.canExit && this.data.showList_01 != null && this.data.showList_02 != null && this.data.showList_03 != null && this.data.showList_04 != null){
    //   dd.confirm({
    //     title: '有未提交的结果',
    //     content: '您有未提交的识别结果，是否自动帮您提交',
    //     cancelButtonText: '不',
    //     confirmButtonText: '好',
    //     success: (res) => {
    //       const { confirm } = res;
    //       console.log(confirm)
    //     },
    //     fail: () => {},
    //     complete: () => {},
    //   });
    // }
  },
  onTitleClick() {
    // 标题被点击
  },
  onPullDownRefresh() {
    // 页面被下拉
  },
  onReachBottom() {
    // 页面被拉到底部
  },
  onShareAppMessage() {
    // 返回自定义分享信息
    return {
      title: 'My App',
      desc: 'My App description',
      path: 'pages/index/index',
    };
  },

  // exit:function(){
  //   dd.navigateBack({
  //   })
  // },

  // 处理每个柜台展示的数据
  tackleData: function(arr, type, idx) {
    let resultMap = new Map();
    if (type === '识别') {
      // 遍历每个数组vbggbv 
      for (let subArray of arr) {
        for (let item of subArray) {
          if (resultMap.has(item.key)) {
            let existingValues = resultMap.get(item.key);
            let newValues = item.value.map((val, index) => val + existingValues[index]);
            resultMap.set(item.key, newValues);
          } else {
            resultMap.set(item.key, item.value);
          }
        }
      }
    } else {
      for (let item of arr) {
        if (resultMap.has(item.key)) {
          let existingValues = resultMap.get(item.key);
          let newValues = item.value.map((val, index) => val + existingValues[index]);
          resultMap.set(item.key, newValues);
        } else {
          resultMap.set(item.key, item.value);
        }
      }
    }
    
    // 将结果转换为数组格式
    let resultArray = [];
    for (let [key, value] of resultMap.entries()) {
      resultArray.push({ key: key, value: value });
    }
    if (idx === 1) {
      this.setData({
        showList_01: resultArray
      });
    }
    if (idx === 2) {
      this.setData({
        showList_02: resultArray
      });
    }
    if (idx === 3) {
      this.setData({
        showList_03: resultArray
      });
    }
    if (idx === 4){
      this.setData({
        showList_04: resultArray
      });
    }
  },
  // 识别
  getResults_01: function () {
    if(this.data.authority > 0 && this.data.theChoose == "未选择"){
      dd.alert({ 
        content: `请先选择一个下辖的客户`,
        buttonText: "好",
        success: () => {
          this.checkMenu2();
        },
     });
      return;
    }
    if (this.data.dicArray_01.length === 0) {
      dd.alert({ content: '请先上传图片' });
      return;
    }
    if (this.data.Text_01 === '识别' || this.data.Text_01 === '展示') {
      let Tx = this.data.Text_01;
      var newdicArray = this.deepCopy(this.data.dicArray_01);
      this.setData({
        Text_01: '收起',
        table_01: true
      })
      if (Tx === '展示') {
        newdicArray = this.deepCopy(this.data.showList_01);
      }
      this.tackleData(newdicArray, Tx, 1);
    } else {
      this.setData({
        Text_01: '展示',
        table_01: false
      })
    }
    let rowNum = this.data.showList_01.length;
    this.setData({
      rowNum01: rowNum
    })
    // console.log("identifying...")
  },

  getResults_02: function () {
    if(this.data.authority > 0 && this.data.theChoose == "未选择"){
      dd.alert({ 
        content: `请先选择一个下辖的客户`,
        buttonText: "好",
        success: () => {
          this.checkMenu2();
        },
     });
      return;
    }
    if (this.data.dicArray_02.length === 0) {
      dd.alert({ content: '请先上传图片' });
      return;
    }
    if (this.data.Text_02 === '识别' || this.data.Text_02 === '展示') {
      let Tx = this.data.Text_02;
      var newdicArray = this.deepCopy(this.data.dicArray_02);
      this.setData({
        Text_02: '收起',
        table_02: true
      })
      if (Tx === '展示') {
        newdicArray = this.deepCopy(this.data.showList_02);
      }
      this.tackleData(newdicArray, Tx, 2);
    } else {
      this.setData({
        Text_02: '展示',
        table_02: false
      })
    }
    let rowNum = this.data.showList_02.length;
    this.setData({
      rowNum02: rowNum
    })
    // console.log("identifying...")
  },
  getResults_03: function () {
    if(this.data.authority > 0 && this.data.theChoose == "未选择"){
      dd.alert({ 
        content: `请先选择一个下辖的客户`,
        buttonText: "好",
        success: () => {
          this.checkMenu2();
        },
     });
      return;
    }
    if (this.data.dicArray_03.length === 0) {
      dd.alert({ content: '请先上传图片' });
      return;
    }
    if (this.data.Text_03 === '识别' || this.data.Text_03 === '展示') {
      let Tx = this.data.Text_03;
      var newdicArray = this.deepCopy(this.data.dicArray_03);
      this.setData({
        Text_03: '收起',
        table_03: true
      })
      if (Tx === '展示') {
        newdicArray = this.deepCopy(this.data.showList_03);
      }
      this.tackleData(newdicArray, Tx, 3);
    } else {
      this.setData({
        Text_03: '展示',
        table_03: false
      })
    }
    let rowNum = this.data.showList_03.length;
    this.setData({
      rowNum03: rowNum
    })
    // console.log("identifying...")
  },
  getResults_04: function () {
    if(this.data.authority > 0 && this.data.theChoose == "未选择"){
      dd.alert({ 
        content: `请先选择一个下辖的客户`,
        buttonText: "好",
        success: () => {
          this.checkMenu2();
        },
     });
      return;
    }
    if (this.data.dicArray_04.length === 0) {
      dd.alert({ content: '请先上传图片' });
      return;
    }
    if (this.data.Text_04 === '识别' || this.data.Text_04 === '展示') {
      let Tx = this.data.Text_04;
      var newdicArray = this.deepCopy(this.data.dicArray_04);
      this.setData({
        Text_04: '收起',
        table_05: true
      })
      if (Tx === '展示') {
        newdicArray = this.deepCopy(this.data.showList_04);
      }
      this.tackleData(newdicArray, Tx, 4);
    } else {
      this.setData({
        Text_04: '展示',
        table_05: false
      })
    }
    let rowNum = this.data.showList_04.length;
    this.setData({
      rowNum04: rowNum
    })
    // console.log("identifying...")
  },

  // 统计结果
  getallResult: function () {
    if (this.data.rowNum01 === 0 && this.data.rowNum02 === 0 && this.data.rowNum03 === 0 && this.data.rowNum04 === 0) {
      dd.alert({ content: '图片识别结果为空' });
    }
    if (this.data.Text === '统计') {
      let resultMap = new Map();
      for (let item of this.data.showList_01) {
        if (resultMap.has(item.key)) {
          let existingValues = resultMap.get(item.key);
          let newValues = item.value.map((val, index) => val + existingValues[index]);
          resultMap.set(item.key, newValues);
        } else {
          resultMap.set(item.key, item.value);
        }
      }
      for (let item of this.data.showList_02) {
        if (resultMap.has(item.key)) {
          let existingValues = resultMap.get(item.key);
          let newValues = item.value.map((val, index) => val + existingValues[index]);
          resultMap.set(item.key, newValues);
        } else {
          resultMap.set(item.key, item.value);
        }
      }
      for (let item of this.data.showList_03) {
        if (resultMap.has(item.key)) {
          let existingValues = resultMap.get(item.key);
          let newValues = item.value.map((val, index) => val + existingValues[index]);
          resultMap.set(item.key, newValues);
        } else {
          resultMap.set(item.key, item.value);
        }
      }
      for (let item of this.data.showList_04) {
        if (resultMap.has(item.key)) {
          let existingValues = resultMap.get(item.key);
          let newValues = item.value.map((val, index) => val + existingValues[index]);
          resultMap.set(item.key, newValues);
        } else {
          resultMap.set(item.key, item.value);
        }
      }
      // 将结果转换为数组格式
      let resultArray = [];
      for (let [key, value] of resultMap.entries()) {
        resultArray.push({ key: key, value: value });
      }
      this.setData({
        resultsList: resultArray,
        // Text: '收起',
        table_04: true
      });
    } else {
      // this.setData({
      //   Text: '统计',
      //   table_04: false
      // })
    }
    
  },

  // 上传
  chooseAndPreviewImage: function(e) {
    if(this.data.authority > 0 && this.data.theChoose == "未选择客户"){
      dd.alert({ 
        content: `请先选择一个下辖的客户`,
        buttonText: "好",
        success: () => {
          this.checkMenu2();
        },
     });
      return;
    }
    var buttonId = e.currentTarget.dataset.buttonId;
    this.setData({
      bt_index: buttonId,
      Text: '统计',
      table_04: false
    });
    let temp = [];
    if(buttonId == 1){
      let table = this.data.table_01;
      if(table == true || this.data.Text_01 == '展示'){
        temp = this.data.showList_01;
        this.setData({
          Text_01: '识别',
          table_01: false,
          showList_01: []
        })
      }
    }
    if(buttonId == 2){
      let table = this.data.table_02;
      if(table == true || this.data.Text_02 == '展示'){
        temp = this.data.showList_02;
        this.setData({
          Text_02: '识别',
          table_02: false,
          showList_02: []
        })
      }
    }
    if(buttonId == 3){
      let table = this.data.table_03;
      if(table == true || this.data.Text_03 == '展示'){
        temp = this.data.showList_03;
        this.setData({
          Text_03: '识别',
          table_03: false,
          showList_03: []
        })
      }
    }
    if(buttonId == 4){
      let table = this.data.table_05;
      if(table == true || this.data.Text_04 == '展示'){
        temp = this.data.showList_04;
        this.setData({
          Text_04: '识别',
          table_05: false,
          showList_04: []
        })
      }
    }
    if(this.data.authority > 0 || this.data.authority == -1){
      dd.chooseImage({
        count: 10,
        success: (res) =>{  
          this.setData({
            imageSrc: res.filePaths
          });
          dd.showLoading({
            content: '正在上传',
          });                         
          this.uploadImages();
          if(buttonId == 1){
            this.setData({
              showList_01: temp
            })
          }else if(buttonId == 2){
            this.setData({
              showList_02: temp
            })
          }else if(buttonId == 3){
            this.setData({
              showList_03: temp
            })
          }else if(buttonId == 4){
            this.setData({
              showList_04: temp
            })
          }
        },
        fail: () =>{
        }
      })
    }else{
      dd.chooseImage({
        count: 10,
        sourceType: ['camera'],
        success: (res) =>{  
          this.setData({
            imageSrc: res.filePaths
          });
          dd.showLoading({
            content: '正在上传',
          });                         
          this.uploadImages();
          if(buttonId == 1){
            this.setData({
              showList_01: temp
            })
          }else if(buttonId == 2){
            this.setData({
              showList_02: temp
            })
          }else if(buttonId == 3){
            this.setData({
              showList_03: temp
            })
          }else if(buttonId == 4){
            this.setData({
              showList_04: temp
            })
          }
        },
        fail: () =>{
        }
      })
    }
    
  },

  // 上传成功
  uploadSuccess_01(){
    this.setData({
      displayClass_01: "show"
    })
  },
  uploadSuccess_02(){
    this.setData({
      displayClass_02: "show"
    })
  },
  uploadSuccess_03(){
    this.setData({
      displayClass_03: "show"
    })
  },
  uploadSuccess_04(){
    this.setData({
      displayClass_04: "show"
    })
  },

  // 图片滑动事件
  swiperChange_01: function(e) {
    this.setData({
      current_01: e.detail.current
    });
  },

  swiperChange_02: function(e) {
    this.setData({
      current_02: e.detail.current
    });
  },

  swiperChange_03: function(e) {
    this.setData({
      current_03: e.detail.current
    });
  },
  swiperChange_04: function(e) {
    this.setData({
      current_04: e.detail.current
    });
  },

  // 删除图片，这里根据current来修改dicAarray的内容
  deleteImage_01: function(){
    let temp = this.data.sum;
    temp--;
    this.setData({
      sum:temp
    })
    let newArray = this.data.path_01;
    let newdicArray = this.data.dicArray_01;
    let index = this.data.current_01;
    newArray.splice(index, 1);
    newdicArray.splice(index, 1);
    if(index != 0)
      index--;
    this.setData({
      showList_01: [],
      current_01: index,
      path_01: newArray,
      dicArray_01: newdicArray,
      Text: '统计',
      table_04: false
    })
    this.setData({
      Text_01: '识别',
      table_01: false
    });
    if(newArray.length == 0){
      this.setData({
        showList_01: [],
        current_01: 0,
        displayClass_01: "unShow"
      });
    }
  },

  deleteImage_02: function(){
    let temp = this.data.sum;
    temp--;
    this.setData({
      sum:temp
    })
    let newArray = this.data.path_02;
    let newdicArray = this.data.dicArray_02;
    let index = this.data.current_02;
    newArray.splice(index, 1);
    newdicArray.splice(index, 1);
    if(index != 0)
      index--;
    this.setData({
      showList_02: [],
      current_02: index,
      path_02: newArray,
      dicArray_02: newdicArray,
      Text: '统计',
      table_04: false
    })
    this.setData({
      Text_02: '识别',
      table_02: false
    });
    if(newArray.length == 0){
      this.setData({
        showList_02: [],
        current_02: 0,
        displayClass_02: "unShow",
      })
    }
  },

  deleteImage_03: function(){
    let temp = this.data.sum;
    temp--;
    this.setData({
      sum:temp
    })
    let newArray = this.data.path_03;
    let newdicArray = this.data.dicArray_03;
    let index = this.data.current_03;
    newArray.splice(index, 1);
    newdicArray.splice(index, 1);
    if(index != 0)
      index--;
    this.setData({
      showList_03: [],
      current_03: index,
      path_03: newArray,
      dicArray_03: newdicArray,
      Text: '统计',
      table_03: false
    })
    this.setData({
      Text_03: '识别',
      table_03: false
    });
    if(newArray.length == 0){
      this.setData({
        showList_03: [],
        current_03: 0,
        displayClass_03: "unShow",
      })
    }
  },

  deleteImage_04: function(){
    let temp = this.data.sum;
    temp--;
    this.setData({
      sum:temp
    })
    let newArray = this.data.path_04;
    let newdicArray = this.data.dicArray_04;
    let index = this.data.current_04;
    newArray.splice(index, 1);
    newdicArray.splice(index, 1);
    if(index != 0)
      index--;
    this.setData({
      showList_04: [],
      current_04: index,
      path_04: newArray,
      dicArray_04: newdicArray,
      Text: '统计',
      table_05: false
    })
    this.setData({
      Text_04: '识别',
      table_05: false
    });
    if(newArray.length == 0){
      this.setData({
        showList_04: [],
        current_04: 0,
        displayClass_04: "unShow",
      })
    }
  },

  uploadImages() {
    const that = this;
    // 假设你已经修改了 uploadToServer 方法，以处理结果数组
    let uploadPromises = this.data.imageSrc.map((filePath) => {
      return that.uploadToServer(filePath);
    });

    Promise.all(uploadPromises)
    .then((results) => {
      dd.hideLoading({
        success: () => {
          dd.showToast({
            type: 'success',
            duration: 500,
          });
        },
      });
    })
    .catch((error) => {
      dd.hideLoading({
      });
      dd.alert({ content: `上传或识别失败：${error}` });
               
    });
    
  },

  deepCopy(obj) {
    if (obj === null || typeof obj !== 'object') {
        return obj;
    }
    if (Array.isArray(obj)) {
        const arrCopy = [];
        obj.forEach((item, index) => {
            arrCopy[index] = this.deepCopy(item);
        });
        return arrCopy;
    }
    const objCopy = {};
    Object.keys(obj).forEach((key) => {
        objCopy[key] = this.deepCopy(obj[key]);
    });
    return objCopy;
  },

  uploadToServer(filePath) {
    return new Promise((resolve, reject) => {
      dd.uploadFile({
        url: 'https://localhost:8080/upload/', // 确保URL是正确的
        headers: { 'Authorization' : 'Bearer ' + this.data.token },
        fileType: 'image',
        fileName: 'file',
        filePath: filePath,
        success: (res) => {
          try {
            let temp = this.data.sum;
            temp++;
            this.setData({
              sum:temp
            })
            var data = JSON.parse(res.data);

            // console.log(data);
            this.setData({
              result: data
            });
            var infoArray = [];
            // for (var key in data.info) {
            //   infoArray.push({
            //     key: key,
            //     value: data.info[key]
            //   });
            // }

            for (let id in data.info) {
              let innerObj = data.info[id];
              for (let key in innerObj) {
                let valueArray = innerObj[key];
                let newEntry = {
                    key: key,
                    value: [...valueArray, id] 
                  };
                  infoArray.push(newEntry);  
              }
            }

            // 更新 data 中的 dicArray, 扩展后根据bt_index来选择dicArray01, dicArray02...
            if (this.data.bt_index == 1) {
              var tobacco = this.data.dicArray_01.slice();
              tobacco.push(infoArray);
              this.setData({
                dicArray_01: tobacco
              });
            }
            if (this.data.bt_index == 2) {
              var tobacco = this.data.dicArray_02.slice();
              tobacco.push(infoArray);
              this.setData({
                dicArray_02: tobacco
              });
            }
            if (this.data.bt_index == 3) {
              var tobacco = this.data.dicArray_03.slice();
              tobacco.push(infoArray);
              this.setData({
                dicArray_03: tobacco
              });
            }
            if (this.data.bt_index == 4) {
              var tobacco = this.data.dicArray_04.slice();
              tobacco.push(infoArray);
              this.setData({
                dicArray_04: tobacco
              });
            }

            this.setData({
              datanum: this.data.datanum + 1
            })
            resolve(data);
            
            // 更新 path, 扩展后根据bt_index来选择path01, path02...
            if (this.data.bt_index == 1) {
              let newArray = this.data.path_01.slice();
              newArray.push(filePath);
              this.setData({
                path_01: newArray
              });
              this.uploadSuccess_01();
            }
            if (this.data.bt_index == 2) {
              let newArray = this.data.path_02.slice();
              newArray.push(filePath);
              this.setData({
                path_02: newArray
              });
              this.uploadSuccess_02();
            }
            if (this.data.bt_index == 3) {
              let newArray = this.data.path_03.slice();
              newArray.push(filePath);
              this.setData({
                path_03: newArray
              });
              this.uploadSuccess_03();
            }
            if (this.data.bt_index == 4) {
              let newArray = this.data.path_04.slice();
              newArray.push(filePath);
              this.setData({
                path_04: newArray
              });
              this.uploadSuccess_03();
            }

          } catch (e) {
            reject(new Error('服务器返回格式错误，无法解析JSON'));
          }
        },
        fail: (err) => {
          // console.log(err)
          reject(new Error(`上传失败：${err.errorMessage}`));
        }
      });
    });
  },
  
  unEdit_01: function(){
    this.setData({
      editing_01: false,
      hasMask:false
    })
  },

  unEdit_02: function(){
    this.setData({
      editing_02: false,
      hasMask:false
    })
  },

  unEdit_03: function(){
    this.setData({
      editing_03: false,
      hasMask:false
    })
  },

  unEdit_04: function(){
    this.setData({
      editing_04: false,
      hasMask:false
    })
  },
  
  edit_01: function(event){
    let button = event.currentTarget;
    let index1 = button.dataset.index1;
    let index2 = button.dataset.index2;
    let name = this.data.showList_01[index1].key;
    let value = this.data.showList_01[index1].value[index2];

    if(index2 == 0){
      value = parseInt(value);
      let ColumArray = [];
      for(let i = value+20; i > value-20 && i >= 0;i--){
        ColumArray.push(i);
      }      
      this.setData({
        prooductUnit: "包",
        inputFocus: true,
        columArray: ColumArray,
      })
    }else if(index2 == 1){
      value = parseInt(value);
      let ColumArray = [];
      for(let i = value+20; i > value-20 && i >= 0;i--){
        ColumArray.push(i);
      }        
      this.setData({
        inputFocus: true,
        prooductUnit: "条",
        columArray: ColumArray,
      })
    }else if(index2 == -1){
      value = name;
      this.setData({
        inputFocus: false,
        prooductUnit: ""
      })
    }
    this.setData({
      index1: index1,
      index2: index2,
      vName:name,
      inputValue: value,
      editing_01: true,
      hasMask:true,
    })

  },

  edit_02: function(event){
    let button = event.currentTarget;
    let index1 = button.dataset.index1;
    let index2 = button.dataset.index2;
    let name = this.data.showList_02[index1].key;
    let value = this.data.showList_02[index1].value[index2];

    if(index2 == 0){
      value = parseInt(value);
      let ColumArray = [];
      for(let i = value+20; i > value-20 && i >= 0;i--){
        ColumArray.push(i);
      }      
      this.setData({
        prooductUnit: "包",
        inputFocus: true,
        columArray: ColumArray,
      })
    }else if(index2 == 1){
      value = parseInt(value);
      let ColumArray = [];
      for(let i = value+20; i > value-20 && i >= 0;i--){
        ColumArray.push(i);
      }      
      this.setData({
        inputFocus: true,
        prooductUnit: "条",
        columArray: ColumArray,
      })
    }else if(index2 == -1){
      value = name;
      this.setData({
        inputFocus: false,
        prooductUnit: ""
      })
    }
    this.setData({
      index1: index1,
      index2: index2,
      vName:name,
      inputValue: value,
      editing_02: true,
      hasMask:true,
    })

  },

  edit_03: function(event){
    let button = event.currentTarget;
    let index1 = button.dataset.index1;
    let index2 = button.dataset.index2;
    let name = this.data.showList_03[index1].key;
    let value = this.data.showList_03[index1].value[index2];

    if(index2 == 0){
      value = parseInt(value);
      let ColumArray = [];
      for(let i = value+20; i > value-20 && i >= 0;i--){
        ColumArray.push(i);
      }      
      this.setData({
        prooductUnit: "包",
        inputFocus: true,
        columArray: ColumArray,
      })
    }else if(index2 == 1){
      value = parseInt(value);
      let ColumArray = [];
      for(let i = value+20; i > value-20 && i >= 0;i--){
        ColumArray.push(i);
      }      
      this.setData({
        inputFocus: true,
        prooductUnit: "条",
        columArray: ColumArray,
      })
    }else if(index2 == -1){
      value = name;
      this.setData({
        inputFocus: false,
        prooductUnit: ""
      })
    }
    this.setData({
      index1: index1,
      index2: index2,
      vName:name,
      inputValue: value,
      editing_03: true,
      hasMask:true,
    })

  },

  edit_04: function(event){
    let button = event.currentTarget;
    let index1 = button.dataset.index1;
    let index2 = button.dataset.index2;
    let name = this.data.showList_04[index1].key;
    let value = this.data.showList_04[index1].value[index2];

    if(index2 == 0){
      value = parseInt(value);
      let ColumArray = [];
      for(let i = value+20; i > value-20 && i >= 0;i--){
        ColumArray.push(i);
      }      
      this.setData({
        prooductUnit: "包",
        inputFocus: true,
        columArray: ColumArray,
      })
    }else if(index2 == 1){
      value = parseInt(value);
      let ColumArray = [];
      for(let i = value+20; i > value-20 && i >= 0;i--){
        ColumArray.push(i);
      }      
      this.setData({
        inputFocus: true,
        prooductUnit: "条",
        columArray: ColumArray,
      })
    }else if(index2 == -1){
      value = name;
      this.setData({
        inputFocus: false,
        prooductUnit: ""
      })
    }
    this.setData({
      index1: index1,
      index2: index2,
      vName:name,
      inputValue: value,
      editing_04: true,
      hasMask:true,
    })

  },

  isNumeric(str) {
    return /^[0-9]+$/.test(str);
  },

  saveChange_01: function(e){
    let index1 = this.data.index1;
    let index2 = this.data.index2;
    let value = e.detail.value["num"];
    let s1 = this.data.showList_01;
    if(index2 == -1){
      s1[index1].key = value;
      this.setData({
        showList_01: s1,
      })
      return
    }
    if(!this.isNumeric(value)){
      dd.alert({ content: `请输入正确的数字！` });
      return;
    };
    s1[index1].value[index2] = parseInt(value);
    
    
    this.setData({
      showList_01: s1
    })
    if (this.data.Text === '收起') {
      this.setData({
        Text: '统计',
        table_04: false
      })
    }
  },

  saveChange_02: function(e){
    let index1 = this.data.index1;
    let index2 = this.data.index2;
    let value = e.detail.value["num"];
    let s1 = this.data.showList_02;
    if(index2 == -1){
      s1[index1].key = value;
      this.setData({
        showList_02: s1
      })
      return
    }
    if(!this.isNumeric(value)){
      dd.alert({ content: `请输入正确的数字！` });
      return;
    };
    s1[index1].value[index2] = parseInt(value);
    
    
    this.setData({
      showList_02: s1
    })
    if (this.data.Text === '收起') {
      this.setData({
        Text: '统计',
        table_04: false
      })
    }
  },

  saveChange_03: function(e){
    let index1 = this.data.index1;
    let index2 = this.data.index2;
    let value = e.detail.value["num"];
    let s1 = this.data.showList_03;
    if(index2 == -1){
      s1[index1].key = value;
      this.setData({
        showList_03: s1
      })
      return
    }
    if(!this.isNumeric(value)){
      dd.alert({ content: `请输入正确的数字！` });
      return;
    };
    s1[index1].value[index2] = parseInt(value);
    
    
    this.setData({
      showList_03: s1
    })
    if (this.data.Text === '收起') {
      this.setData({
        Text: '统计',
        table_04: false
      })
    }
  },

  saveChange_04: function(e){
    let index1 = this.data.index1;
    let index2 = this.data.index2;
    let value = e.detail.value["num"];
    let s1 = this.data.showList_04;
    if(index2 == -1){
      s1[index1].key = value;
      this.setData({
        showList_04: s1
      })
      return
    }
    if(!this.isNumeric(value)){
      dd.alert({ content: `请输入正确的数字！` });
      return;
    };
    s1[index1].value[index2] = parseInt(value);
    
    
    this.setData({
      showList_04: s1
    })
    if (this.data.Text === '收起') {
      this.setData({
        Text: '统计',
        table_04: false
      })
    }
  },
  

  pickerOnChange: function(e){
    let tempArray = this.data.columArray;
    let value = tempArray[e.detail.value[0]];
    
    this.setData({
      inputValue: value,
    })
  },

  // inputNum: function(e){
  //   this.setData({
  //     inputFocus: false
  //   })
  // },
  padZero(num) {
    return (num < 10 ? '0' : '') + num;
  },


  getCurrentDateTime() {
    let date = new Date();

    let year = date.getFullYear();
    let month = this.padZero(date.getMonth() + 1);  
    let day = this.padZero(date.getDate());
    let hours = this.padZero(date.getHours());
    let minutes = this.padZero(date.getMinutes());
    let seconds = this.padZero(date.getSeconds());


    let formattedDateTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

    return formattedDateTime;
  },

  uploaddata:function(){
    let time = this.getCurrentDateTime();
    if(this.data.resultsList.length == 0){
      dd.alert({ 
        content: `总计为空，请先识别图片`,
     });
      return;
    }
    this.setData({
      canExit:true
    })
    let array = this.data.resultsList;
    // console.log(array)
    let dataArray = {};
    if(this.data.authority == 0){
      let n = this.data.name;
      let id = this.data.customerID;
      let mn = this.data.managerName;
      let mid = this.data.managerID
      let sum =  this.data.sum;
      let i = 0;
      // if(this.data.authority == -1){
      //   mn = "无";
      //   mid = "无"
      // }
      
      array.forEach(element => {
        let dataPart = {};
        dataPart["Id_dealer"] = id;
        dataPart["name_dealer"] = n;
        dataPart["Id_manager"] = mid;
        dataPart["name_manager"] = mn;
        dataPart["Id_type"] = element.value[2];
        dataPart["name_type"] = element.key;
        dataPart["packets"] = element.value[0];
        dataPart["bars"] = element.value[1];
        dataPart["record_type"] = 0;
        dataPart["time_record"] = time;
        dataPart["sum"] = sum;
        
        
        // JSON.stringify(dataPart)
        dataArray[i] = dataPart;
        i++;
      });
      console.log(dataArray)
    }else if(this.data.authority > 0 || this.data.authority == -1){
      let n = this.data.theChoose;
      let id = this.data.theChooseId;
      let mn = this.data.name;
      let mid = this.data.customerID;
      let sum =  this.data.sum;
      let i = 0;
      
      array.forEach(element => {
        let dataPart = {};
        dataPart["manager_chosen_dealer"] = this.data.theChooseId;
        dataPart["Id_dealer"] = id;
        dataPart["name_dealer"] = n;
        dataPart["Id_manager"] = mid;
        dataPart["name_manager"] = mn;
        dataPart["Id_type"] = element.value[2];
        dataPart["name_type"] = element.key;
        dataPart["packets"] = element.value[0];
        dataPart["bars"] = element.value[1];
        dataPart["record_type"] = 0;
        dataPart["time_record"] = time;
        dataPart["sum"] = sum;

        dataArray[i] = dataPart;
        i++;
      });
    }
    // console.log(dataArray)
    // console.log(JSON.stringify(dataArray))
    
    dd.confirm({
      title: '上传确认',
      content: '请确认统计结果正确',
      cancelButtonText: '我再想想',
      confirmButtonText: '上传',
      success: (res) => {
        const { confirm } = res;
        console.log(res)
        if(confirm){
          dd.httpRequest({
            url: 'https://localhost:8080/upRecord/',
            method: 'post',
            data: JSON.stringify(dataArray),
            headers: { 'Authorization' : 'Bearer ' + this.data.token },
            timeout: 30000,
            dataType: 'json',
            success: (res) => {
              // console.log(res)
              switch(res.data["code"]){
                case 0:
                  dd.alert({
                    type: 'success',
                    content: '上传成功',
                    buttonText: '我知道了',
                    duration: 800,
                    success: () => {
                      dd.alert({
                        type: 'success',
                        content: '上传成功',
                        buttonText: '我知道了',
                        duration: 800,
                        success: () => {
                          dd.navigateBack({
                            delta: 1,
                            success: () => {},
                            fail: () => {},
                            complete: () => {},
                          });
                        },
                        fail: () => {},
                        complete: () => {},
                      });
                    },
                    fail: () => {},
                    complete: () => {},
                  });
                  
                  break;
                case 1001:
                  dd.alert({
                    title: '上传失败',
                    content: '失败',
                    buttonText: '我知道了',
                  });
                  break;
                }
              },
          
              
            
          fail: (res) => {
            dd.alert({
              title: '上传失败',
              content: res,
              buttonText: '我知道了',
            });
            // console.log(res)
            // console.log(1)
          },
          complete: () => {},
        });
        } 
      },
      fail: () => {},
      complete: () => {},
    });
  },
  arrayToDictionary(array) {
    
    let newArray = [];

    for (let i = 0; i < array.length; i++) {
      let dictionary = {};
      let key = array[i]["name_dealer"];
      let value = array[i]["Id_dealer"];
      dictionary["key"] = key;
      dictionary["value"] = value;
      newArray.push(dictionary)
    }
    return newArray;
  },

  truncateString(str, maxLength) {
    if (str.length > maxLength) {
        return str.slice(0, maxLength) + '...';
    } else {
        return str;
    }
  },

  checkMenu:function(){
    if(this.data.authority > 0 && this.data.theChoose == "未选择客户"){
      dd.alert({ 
        content: `请先选择一个下辖的客户`,
        buttonText: "好",
        success: () => {
          this.checkMenu2();
        },
     });
      return;
    }
    if(this.data.delta == "delta"){
      this.setData({
        delta:"delta2",
        // needChange:true,
      })
      dd.showActionSheet({
        items: ['处理前柜', '处理背柜', '处理底柜','处理推烟器','查看总计'],
        title: '选择',
        cancelButtonText: '取消',
        success: (res) => {
          const { index } = res;
          this.chooseMenu(index);
        },
        fail: () => {},
        complete: () => {},
      });
      
    }else if(this.data.delta == "delta2"){
      this.setData({
        delta:"delta",
        // needChange:false,
      })
    }
  },

  checkMenu2:function(){
    if(this.data.delta2 == "delta"){
      this.setData({
        customerChoose:true,
        delta2:"delta2",
        needChange2:true,
      })
    }else if(this.data.delta2 == "delta2"){
      this.setData({
        customerChoose:false,
        delta2:"delta",
        needChange2:false,
      })
    }
  },

  chooseMenu:function(index){
    console.log(index)
    // let index = e.target.dataset["index"];
    switch(index){
      case 0:
        // console.log(1)
        this.setData({
          coloer1:"coloer",
          coloer2:"",
          coloer3:"",
          coloer4:"",
          coloer5:"",
          qian:true,
          bei:false,
          di:false,
          tui:false,
          zong:false,
          delta:"delta",
          needChange:false,
          menuText: '处理前柜'
        })
        break;
      case 1:
        this.setData({
          coloer1:"",
          coloer2:"coloer",
          coloer3:"",
          coloer4:"",
          coloer5:"",
          qian:false,
          bei:true,
          di:false,
          tui:false,
          zong:false,
          delta:"delta",
          needChange:false,
          menuText: '处理背柜'
        })
        break;
      case 2:
        this.setData({
          coloer1:"",
          coloer2:"",
          coloer3:"coloer",
          coloer4:"",
          coloer5:"",
          qian:false,
          bei:false,
          di:true,
          tui:false,
          zong:false,
          delta:"delta",
          needChange:false,
          menuText: '处理底柜'
        })
        break;
      case 3:
        this.setData({
          coloer1:"",
          coloer2:"",
          coloer3:"",
          coloer4:"coloer",
          coloer5:"",
          qian:false,
          bei:false,
          di:false,
          tui:true,
          zong:false,
          delta:"delta",
          needChange:false, 
          menuText: '处理推烟器',
          table_04: true
        })
        break;
      case 4:
        if(this.data.path_01.length != 0){
          this.getResults_01();
        }
        if(this.data.path_02.length != 0){
          this.getResults_02();
        }
        if(this.data.path_03.length != 0){
          this.getResults_03();
        }
        if(this.data.path_04.length != 0){
          this.getResults_04();
        }
        
        this.getallResult();
        this.setData({
          coloer1:"",
          coloer2:"",
          coloer3:"",
          coloer4:"",
          coloer5:"coloer",
          qian:false,
          bei:false,
          di:false,
          tui:false,
          zong:true,
          delta:"delta",
          needChange:false, 
          menuText: '查看总计',
          table_04: true
        })
        break;
      case -1:
        this.setData({
          delta:"delta",
        })
    }
  },

  needAdd:function(event){
    if(this.data.qian){
      this.setData({
        addRecord:true,
        table_01:false
      })
    }else if(this.data.bei){
      this.setData({
        addRecord:true,
        table_02:false
      })
    }else if(this.data.di){
      this.setData({
        addRecord:true,
        table_03:false
      })
    }else if(this.data.tui){
      this.setData({
        addRecord:true,
        table_05:false
      })
    }
  },

  exitAdd:function(){
    if(this.data.qian){
      this.setData({
        addRecord:false,
        table_01:true
      })
    }else if(this.data.bei){
      this.setData({
        addRecord:false,
        table_02:true
      })
    }else if(this.data.di){
      this.setData({
        addRecord:false,
        table_03:true
      })
    }else if(this.data.tui){
      this.setData({
        addRecord:false,
        table_05:true
      })
    }
  },
  add:function(e){
    let name = this.data.addNameText;
    let bars = parseInt(e.detail.value.bars);
    let packet = parseInt(e.detail.value.packet);
    let id = this.data.addNameId;
    let array = [packet,bars,id]
    console.log(array)
    if(this.data.qian){
      let temp = this.data.showList_01;
      temp.unshift({key : name , value : array})
      this.setData({
        showList_01:temp,
      })
    }else if(this.data.bei){
      let temp = this.data.showList_02;
      temp.unshift({key : name , value : array})
      this.setData({
        showList_02:temp,
      })
    }else if(this.data.di){
      let temp = this.data.showList_03;
      temp.unshift({key : name , value : array})
      this.setData({
        showList_03:temp,
      })
    }else if(this.data.tui){
      let temp = this.data.showList_04;
      temp.unshift({key : name , value : array})
      this.setData({
        showList_04:temp,
      })
    }

  },
  closeCustomerMenu(){
    this.setData({
      delta2:"delta",
      needChange2:false,
      customerChoose:false,
      chooseType:-1
    })
  },
  chooseType(){
    if(this.data.chooseType === -1){
      dd.showActionSheet({
        items: ['客户名称', '客户编码'],
        title: '使用什么进行搜索？',
        cancelButtonText: '关闭',
        success: (res) => {
          const { index } = res;
          this.setData({
            chooseType:index
          })
        },
        fail: () => {},
        complete: () => {},
      });
    }
  },

  kaishixuanzekehu(event) {
    const keyword = event.detail.value.trim(); // 获取输入框的值，并去除首尾空格
    if(this.data.chooseType === 0){
      const filteredcustomerList = this.data.customerList.filter(customerList =>
        customerList.name_dealer.includes(keyword)
      );
      this.setData({
        filteredcustomerList: filteredcustomerList
      });
    }if(this.data.chooseType === 1){
      const filteredcustomerList = this.data.customerList.filter(customerList =>
        customerList.Id_dealer.includes(keyword)
      );
      this.setData({
        filteredcustomerList: filteredcustomerList
      });
    }
  },

  shaixuanliebiao(event) {
    const { id } = event.currentTarget.dataset;
    const selectedOption = this.data.customerList.find(customerList => customerList.Id_dealer === id);
    if (selectedOption) {
      // 这里可以根据需求处理选中选项后的逻辑，比如将选中的选项存入数据或执行其他操作
      console.log('选中的选项：', selectedOption);
      let name = this.truncateString(selectedOption.name_dealer,12)
      this.setData({
        delta2:"delta",
        needChange2:false,
        theChoose:name,
        theChooseId:selectedOption.Id_dealer,
        customerChoose:false,
      })
    }
  },
  addNameShow(){
    this.setData({
      addNameChoose:true
    })
  },

  addNameClose(){
    this.setData({
      addNameChoose:false
    })
  },

  addName(event) {
    const keyword = event.detail.value.trim(); // 获取输入框的值，并去除首尾空格
    const filteredOptions = this.data.options.filter(options =>
      options.name_type.includes(keyword)
    );
    
    this.setData({
      filteredOptions: filteredOptions
    });
  },

  addNameNeed(event) {
    const { id } = event.currentTarget.dataset;
    const selectedOption = this.data.options.find(options => options.Id_type === id);
    if (selectedOption) {
      // 这里可以根据需求处理选中选项后的逻辑，比如将选中的选项存入数据或执行其他操作
      console.log('选中的选项：', selectedOption);
      // let name = this.truncateString(selectedOption.name_type,12)
      this.setData({
        addNameText:selectedOption.name_type,
        addNameId:selectedOption.Id_type,
        addNameChoose:false,
      })
    }
  }
})