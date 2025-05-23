Page({
  data: {
    customerID:"",
    authority:"",
    token:"",
    managerID:"",
    managerName:"",
    name:"",
    historyData:{},
    haveData:false,
    allData:{},
    time:"无",
    theChoose:"未选择客户经理",
    customerList:[],
    filteredcustomerList:[],
    customerChoose:false,
    theChooseId:"",
    delta2:"delta",
    date1Text:"选择起始日期",
    date2Text:"选择截止日期",
    uploadFrequency:0,
    photoSum:0,
    details:false,
    detailsList:[],
    chooseType:-1,
  },
  onLoad(query) {
    this.setData({
      customerID: query["customerID"],
      authority: query["authority"],
      token: query["token"],
      name:query["name"]
      
    })
    if(query["authority"] == 1){
      this.setData({
        theChooseId: query["customerID"],
        theChoose:query["name"]
      })
    }else if(query["authority"] == 2 || query["authority"] == 3){
      
      dd.getStorage({
        key: `list2`,
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
        items: ['客户经理名称', '客户经理编码'],
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
        customerList.name_manager.includes(keyword)
      );
      this.setData({
        filteredcustomerList: filteredcustomerList
      });
    }else if(this.data.chooseType === 1){
      const filteredcustomerList = this.data.customerList.filter(customerList =>
        customerList.Id_manager.includes(keyword)
      );
      this.setData({
        filteredcustomerList: filteredcustomerList
      });
    }
  },

  shaixuanliebiao(event) {
    const { id } = event.currentTarget.dataset;
    const selectedOption = this.data.customerList.find(customerList => new RegExp(id, 'i').test(customerList.Id_manager));
    if (selectedOption) {
      // 这里可以根据需求处理选中选项后的逻辑，比如将选中的选项存入数据或执行其他操作
      console.log('选中的选项：', selectedOption);
      let name = this.truncateString(selectedOption.name_manager,10)
      this.setData({
        delta2:"delta",
        needChange2:false,
        theChoose:name,
        theChooseId:selectedOption.Id_manager,
        customerChoose:false,
      })
    }
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

  compareDates(date1,date2){
    let d1 = new Date(date1);
    let d2 = new Date(date2);
    if (d1 > d2){
      return false
    }else{
      return true
    }
  },

  chooseDate(id){
    id = id.currentTarget.dataset["index"]
    if(id === "1"){
      dd.datePicker({
        format: 'yyyy-MM-dd',
        success: (res) => {
          const { date } = res;
          if(this.compareDates(date,this.data.date2Text)){
            this.setData({
              date1Text:date
            })
          }else{
            dd.alert({
              title: '错误的日期',
              content: '起始日期不能晚于截止日期',
              buttonText: '我知道了',
            });
          }
        },
        fail: () => {},
        complete: () => {},
      });
    }else if(id === "2"){
      dd.datePicker({
        format: 'yyyy-MM-dd',
        success: (res) => {
          const { date } = res;
          if(this.compareDates(this.data.date1Text,date)){
            this.setData({
              date2Text:date
            })
          }else{
            dd.alert({
              title: '错误的日期',
              content: '截止日期不能早于起始日期',
              buttonText: '我知道了',
            });
          }
        
        },
        fail: () => {},
        complete: () => {},
      });
    }
  },

  query(){
    let d1 = this.data.date1Text;
    let d2 = this.data.date2Text;
    this.setData({
      haveData: false,
    })
    if(this.data.authority != 0 && this.data.theChoose == "未选择客户经理"){
      dd.alert({ 
        content: `请先选择一个下辖的客户`,
        buttonText: "好",
        success: () => {
          this.checkMenu2();
        },
      });
     return;
    }
    if(!d1.includes("选择") && !d2.includes("选择")){
      d1 = new Date(d1);
      d2 = new Date(d2);
      console.log(d1.getMonth())
      let m1 = d1.getMonth()+1;
      let m2 = d2.getMonth()+1;
      let id = this.data.theChooseId;
      let token = this.data.token;

      dd.httpRequest({
        url:  'https://yz-znpk.966599.com/getManagerInventoryRecords/?earliest_year=' + d1.getFullYear()+'&earliest_mon=' + m1 +"&earliest_day=" + d1.getDate() + "&latest_year=" + d2.getFullYear() + "&latest_mon=" + m2 + "&latest_day=" + d2.getDate() +"&Id_manager=" + id,
        method: 'GET',
        headers:{ 'Authorization' : 'Bearer ' + token },
        timeout: 30000,
        dataType: 'json',
        success: (res) => {
          console.log(res)
          
          let array = res.data.data
          let uniqueArray = this.getKeyValuesMapping(array,'time_record','sum','Id_dealer');
          this.setData({
            historyData: uniqueArray,
            allData:array
          });
          if(array.length > 0){
            dd.showToast({
              type: 'success',
              content: '查询成功',
              duration: 1000,
              success: () => {
              },
              fail: () => {},
              complete: () => {},
            });
            setTimeout(() => {
              this.setData({
                haveData: true,
              });
            }, 500);
          }else{
            dd.alert({
              title: '查询失败',
              content: "记录不存在",
              buttonText: '我知道了',
            });
          }
        },
        fail: (res) => {
          if(res.data["code"] === 1001){
            dd.alert({
              title: '查询失败',
              content: "记录不存在",
              buttonText: '我知道了',
            });
          }
        },
        complete: () => {},
      });

    }else{
      dd.alert({
        title: '未选择日期',
        content: '请先选择要查寻的日期范围',
        buttonText: '我知道了',
      });
    }
      
  },

  getKeyValuesMapping(array, key1, key2, key3) {
    const result = [];
    const seenKeys = new Set();
    let count = 0;
    let sum = 0;

    // 遍历字典数组
    array.forEach(obj => {
        // 从字典中提取指定键的值
        const value1 = obj[key1].replace('T', ' ');
        const value2 = obj[key2];
        const value3 = obj[key3];

        // 检查 key1 的值是否已经存在
        if (!seenKeys.has(value1)) {
            // 如果不存在，添加到 Set 和结果数组
            seenKeys.add(value1);
            result.push([value1, value2]);
            sum+=value2;
            count++;
        }
    });

    this.setData({
      photoSum:sum,
      uploadFrequency:count,
    })

    // 返回结果数组
    return result;
  },

  sumDictionaryValues(obj) {
    const values = Object.values(obj);

    const totalSum = values.reduce((acc, curr) => {
        
        if (typeof curr === 'number') {
            return acc + curr;
        }
        
        return acc;
    }, 0);
    return totalSum;
  },
  details(date){
    let array = this.data.allData;
    array = array.filter(item => item["time_record"] === date.currentTarget.dataset.date.replace(' ', 'T'));
    this.setData({
      detailsList:array,
      details:true
    })
  },
  exitDetail(){
    this.setData({
      details:false
    })
  }

});
