//c分析
function insertCTable(data){
    var content = '<table>';
    //c结果
    var cClasResult = data.cClasResult; //节点list

    if(cClasResult != null && cClasResult.length > 0){
        content += '<tr><td style="width: 60px;font-size: 15px;font-weight:bold;" align="center">分类</td><td style="background-color:#fff;">';
        for(var i = 0;i<cClasResult.length;i++){
            var cResult = cClasResult[i]; //节点
            var name = cResult.name;
            var namePath = cResult.name_path;
            var weight = cResult.weight.toFixed(4);
            //td里面的tr
            content += '<table style="border-collapse: collapse;width: 100%;line-height: 30px;" cellspacing="0" cellpadding="0">';
            content += '<tr><td colSpan="3" style="font-size: 14px;font-weight:bold;"><span style="margin-right: 60px;">分类路径:'+namePath+'</span>权重:'+weight+'</td>';
            content += '<tr style="background-color: #f0f3f7;"><td style="width: 10%;border-top: 0px;">原始表达式</td><td style="width: 10%;border-top: 0px;">匹配表达式</td>';
            content += '<td style="width: 20%;border-top: 0px;border-right:0px;">句式表达式</td></tr>';

            var clasExpList = cResult.clas_exp_list; //节点上表达式列表
            var srcNameExpList = cResult.srcNameExpList;
            for(var j=0;j<srcNameExpList.length;j++){
                var num = 0;
                var table2 = "";
                for(var k = 0;k<clasExpList.length;k++){
                    var clasExp = clasExpList[k];
                    var nameExps = clasExp.nameExp;
                    var srcNameExp = clasExp.srcNameExp;
                    var synAnalyExp = clasExp.synAnalyExp;
                    if(srcNameExp == srcNameExpList[j]){
                        num ++ ;
                        if(num == 1){
                            table2 += '<td>'+nameExps+'</td><td>'+synAnalyExp+'</td></tr>';
                        }else{
                            table2 += '<tr><td>'+nameExps+'</td><td>'+synAnalyExp+'</td></tr>';
                        }
                    }
                    var nameExps = clasExp.nameExp;
                    var clasExps = clasExp.synAnalyExp;
                }
                content += '<tr><td rowspan="'+num+'">'+srcNameExpList[j]+'</td>'+table2;
            }
            content += '</table>';
        }
        content += '</td></tr>';
    }
    //分词
    if(false){
        content += '<tr><td style="width: 60px;" align="center">分词</td>';
        content += '<td style="padding-left: 23px;background-color:#fff;">[分词结果]</td></tr>';
    }
    //概念
    var conceptList = data.matchConceptInfo;
    if(conceptList != null && conceptList.length > 0){
        content += '<tr><td style="width: 60px;font-size: 15px;font-weight:bold;" align="center">概念</td><td style="background-color:#fff;">';
        content += '<table style="border-collapse: collapse;width: 100%;" cellspacing="0" cellpadding="0">';
        content += '<tr style="background-color: #F0F3F7;"><td style="width: 20%;border-top: 0px;">概念名称</td>';
        content += '<td style="width: 20%;border-top: 0px;">概念名称路径</td><td style="width: 60%;border-top: 0px;">概念值</td></tr>';
        for(var i =0;i<conceptList.length;i++){
            var name = conceptList[i].name;
            var namePath = conceptList[i].name_path;
            content += '<tr><td style="width: 20%;border-top: 0px;">'+name+'</td><td style="width: 20%;border-top: 0px;">'+namePath+'</td>';
            var valueList = conceptList[i].valueList;
            var valueRess = '';
            for(var j = 0;j<valueList.length;j++){
                var innerStr = valueList[j].value;
                if(j == valueList.length - 1){
                    if(valueList[j].value.indexOf('<!')>=0){
                        innerStr = valueList[j].value.replace(/<!/g,'&lt!')
                    }
                    valueRess += innerStr;
                }else{
                    if(valueList[j].value.indexOf('<!')>=0){
                        innerStr = valueList[j].value.replace(/<!/g,'&lt!')
                    }

                    valueRess += innerStr +" , ";
                }
            }
            content += '<td style="width:60%;border-top: 0px;">'+valueRess+'</td></tr>';
        }
        content += '</table></td></tr>';
    }
    //要素
    var elementList = data.matchElementInfo;
    if(elementList != null && elementList.length > 0){
        content += '<tr><td style="width: 60px;font-size: 15px;font-weight:bold;" align="center">要素</td><td style="background-color:#fff;">';
        content += '<table style="border-collapse: collapse;width: 100%;" cellspacing="0" cellpadding="0">';
        content += '<tr style="background-color: #F0F3F7;"><td style="width: 20%;border-top: 0px;">要素名称</td>';
        content += '<td style="width: 20%;border-top: 0px;">要素名称路径</td><td style="width: 60%;border-top: 0px;">要素值</td></tr>';
        for(var i =0;i<elementList.length;i++){
            var name = elementList[i].name;
            var namePath = elementList[i].name_path;
            content += '<tr><td style="width: 20%;border-top: 0px;">'+name+'</td><td style="width: 20%;border-top: 0px;">'+namePath+'</td>';
            var valueList = elementList[i].valueList;
            var valueRess = '';
            for(var j = 0;j<valueList.length;j++){
                var innerStr = valueList[j].value;
                if(j == valueList.length - 1){
                    if(valueList[j].value.indexOf('<!')>=0){
                        innerStr = valueList[j].value.replace(/<!/g,'&lt!')
                    }
                    valueRess += innerStr;
                }else{
                    if(valueList[j].value.indexOf('<!')>=0){
                        innerStr = valueList[j].value.replace(/<!/g,'&lt!')
                    }

                    valueRess += innerStr +" , ";
                }


            }
            content += '<td style="width: 60%;border-top: 0px;">'+valueRess+'</td></tr>';
        }
        content += '</table></td></tr>';
    }
    content += '</table>';
    return content;
}
export default {insertCTable}