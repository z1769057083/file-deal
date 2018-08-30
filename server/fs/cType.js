const fs = require("fs");
const xlsx = require("node-xlsx");
function dealcText(lines,name){
    // 通过第一条数据取excel标题
    const titleArr = [...Object.keys(lines[0][0].commonObj),"","OEC分类","本体值","要素名称","概念名称"];
    //创建excel对象
    var sheetName = '';
    const xlsxArr = [];
    const xlsxObj = {};
    //遍历所有数据取出value
    lines.forEach((item,index)=>{
        //单元格中的所有数据
        var dataArr = [];
        item.forEach((cValue,cIndex)=>{
            cObj = Object.values(cValue.cObj);
            sheetName = Object.keys(cValue.cObj)[0];
            if(!xlsxObj[sheetName]){
                xlsxObj[sheetName] = [];
            }
            //处理数据组装部分
            let cDataArr = cObj[0].cClasResult;
            cDataArr.forEach((citem,cindex)=>{
                //本体值 clas_exp_list 中取nameExp
                citem.clas_exp_list.forEach((citem2,cindex2)=>{
                    let matchArr = [];
                    let commonValue = Object.values(cValue.commonObj);
                    let tmpValue = [...commonValue];
                    //matchConinfo 中遍历取name_path --要素名称
                    let eleStr = '';
                    citem2.matchEleinfo.forEach((citem3,cindex3)=>{
                        citem3.valueList.forEach((citem4,cindex4)=>{
                            eleStr += `${citem3.name_path}\n${citem4.value}`
                            citem4.matchInfo.forEach((citem5,cindex5)=>{
                                matchArr.push(citem5);
                            });
                        })
                    });

                    //matchConinfo 中遍历取name_path --概念名称
                    let conStr = '';
                    citem2.matchConinfo.forEach((citem3,cindex3)=>{
                        citem3.valueList.forEach((citem4,cindex4)=>{
                            conStr += `${citem3.name_path}\n${citem4.value}`
                            citem4.matchInfo.forEach((citem5,cindex5)=>{
                                matchArr.push(citem5);
                            });
                        })
                    });
                    citem2.matchKeyword.forEach((citem3,cindex3)=>{
                       citem3.matchInfo.forEach((citem4,cindex4)=>{
                           matchArr.push(citem4);
                       })
                    });
                    let resArr = [];
                    commonValue.forEach((citem3,cindex3)=>{
                        let posArr = [];
                        let tmpStr = citem3;
                        matchArr.forEach((citem4,cindex4)=>{
                            let { content,position } = citem4;
                            let reg = new RegExp(content,"ig");
                            if(citem3.indexOf(content) === position){
                                let tmpObj = {};
                                tmpObj.start = position;
                                tmpObj.end = position + content.length;
                                posArr.push(tmpObj);
                            }
                        });
                        posArr.forEach((citem5,cindex5)=>{
                            let startLen = 0,containLen = 0;
                           let start = citem5.start;
                           let end = citem5.end;
                           let str = tmpStr.slice(0,start);
                            let reg = /[【】]/ig;
                            if(str.match(reg)){
                                startLen = str.match(reg).length
                            }
                            start += startLen;
                            end += startLen;
                           let tmpArr = tmpStr.split("");
                            tmpArr.splice(start,0,"【");
                            tmpStr = tmpArr.join("");
                            let containStr =  tmpStr.slice(start,end);
                            if(containStr.match(reg)){
                                containLen = containStr.match(reg).length;
                            }
                            end+=containLen;
                            let tmpArrEnd = tmpStr.split("");
                            tmpArrEnd.splice(end,0,"】");
                            tmpStr = tmpArrEnd.join("");
                        });
                        if(tmpStr !== citem3){
                            resArr.push(tmpStr);
                        }
                    });
                    resArr.forEach((citem3,cindex3)=>{
                        tmpValue.push(citem3);
                        tmpValue.push(citem.name_path);
                        tmpValue.push(citem2.nameExp);
                        tmpValue.push(eleStr);
                        tmpValue.push(conStr);
                    })

                    //将一条处理好的记录存到数组中
                    xlsxObj[sheetName].push(tmpValue);
                });

            });

        });

    });
    // var ss = [{"name": "Groups", "data": datas}]
    //将处理好的全部数据分类存到excel中
    Object.keys(xlsxObj).forEach((item,index)=>{
        let data = [titleArr,...xlsxObj[item]];
        xlsxArr.push({"name":item,"data":data})
    })
    var buffer = xlsx.build(xlsxArr);
    fs.writeFileSync(__dirname+`/../static/download/${name}.xlsx`, buffer, 'binary');



}

module.exports = {
    dealcText
}







