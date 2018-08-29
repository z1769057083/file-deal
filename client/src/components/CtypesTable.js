import React,{Component} from 'react'
import PropTypes from 'prop-types'
class CtypesTable extends Component{
    constructor(props){
        super(props)
    }
    render(){
        const {data} = this.props;
      const  cClasResult = data.cClasResult;
        return(
                <table width="100%">
                    <tbody>
                    <tr>
                        <td style={{width: '60px',fontSize: '15px',fontWeight:'bold'}} align="center">分类</td>
                        <td style={{backgroundColor:'#fff'}}>
                            {
                                cClasResult.map((row,index)=>{
                                    var cResult = cClasResult[index]; //节点
                                    var name = cResult.name;
                                    var namePath = cResult.name_path;
                                    var weight = cResult.weight.toFixed(4);
                                    return (
                                        <table style={{borderCollapse: 'collapse',width: '100%',lineHeight: '30px'}} cellSpacing="0" cellPadding="0" key={"in"+index}>
                                            <tbody>
                                           <tr>
                                               <td colSpan="3" style={{fontSize: '14px',fontWeight:'bold'}}>
                                                <span style={{marginRight: '60px'}}>分类路径:{namePath}</span>
                                                   权重:{weight}
                                               </td>
                                           </tr>
                                           <tr style={{backgroundColor: '#f0f3f7'}}>
                                               <td style={{width: '10%',bordeTop: '0px'}}>原始表达式</td>
                                               <td style={{width: '10%',borderTop: '0px'}}>匹配表达式</td>
                                               <td style={{width: '20%',borderTop: '0px',borderRight:'0px'}}>句式表达式</td>
                                           </tr>
                                                   {

                                                       cResult.srcNameExpList.map((item,index)=>{
                                                           var srcNameExpList = cResult.srcNameExpList;
                                                           var clasExpList = cResult.clas_exp_list; //节点上表达式列表
                                                           var num = 0;
                                                           clasExpList.map((item2,index2)=>{
                                                               var clasExp = clasExpList[index2];
                                                               var nameExps = clasExp.nameExp;
                                                               var srcNameExp = clasExp.srcNameExp;
                                                               var synAnalyExp = clasExp.synAnalyExp;
                                                               if(srcNameExp == srcNameExpList[index]){
                                                                   num ++ ;
                                                                   if(num == 1){
                                                                       return (
                                                                         <tr>
                                                                            <td rowspan={{num}}>{srcNameExpList[index]}</td>
                                                                            <td>{nameExps}</td>
                                                                            <td>{synAnalyExp}</td>
                                                                         </tr>
                                                                        )

                                                                   }else{
                                                                        return (
                                                                             <tr>
                                                                              <td>{nameExps}</td>
                                                                              <td>{synAnalyExp}</td>
                                                                            </tr>
                                                                       )
                                                                   }
                                                               }

                                                             })
                                                       })
                                                   }
                                            </tbody>
                                        </table>
                                    )
                                })

                            }
                        </td>
                    </tr>
                    {
                        data.matchConceptInfo!= null && data.matchConceptInfo.length > 0 ? (
                            <tr>
                            <td style={{width: '60px',fontSize: '15px',fontWeight:'bold'}} align="center">概念</td>
                                <td style={{backgroundColor:'#fff'}}>
                              <table style={{borderCollapse: 'collapse',width: '100%'}} cellSpacing="0" cellPadding="0">
                                <tbody>
                                  <tr style={{backgroundColor: "#F0F3F7"}}>
                                 <td style={{width: '20%',borderTop: '0px'}}>概念名称</td>
                              <td style={{width: '20%',borderTop: '0px'}}>概念名称路径</td>
                                 <td style={{width: '60%',borderTop: '0px'}}>概念值</td></tr>
                                  {
                                      data.matchConceptInfo.map((item,index)=>{
                                          var name = item.name;
                                          var namePath = item.name_path;
                                          var valueList = item.valueList;
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
                                          return(
                                              <tr key={"con"+index}>
                                                  <td style={{width: '20%',borderTop: '0px'}}>{name}</td>
                                                  <td style={{width: '20%',borderTop: '0px'}}>{namePath}</td>
                                                  <td style={{width:'60%',borderTop: '0px'}}>{valueRess}</td>
                                                  </tr>
                                                )
                                              })
                                  }
                                </tbody>
                              </table>
                                </td>
                            </tr>
                        ):null
                    }
                    {
                        data.matchElementInfo!= null &&  data.matchElementInfo.length > 0 ? (
                            <tr>
                                <td style={{width: '60px',fontSize: '15px',fontWeight:'bold'}} align="center">要素</td>
                                <td style={{backgroundColor:'#fff'}}>
                             <table style={{borderCollapse: 'collapse',width: '100%'}} cellSpacing="0" cellPadding="0">
                                 <tbody>
                                 <tr style={{backgroundColor: '#F0F3F7'}}>
                                     <td style={{width: '20%',borderTop: '0px'}}>要素名称</td>
                                     <td style={{width: '20%',borderTop: '0px'}}>要素名称路径</td>
                                     <td style={{width: '60%',borderTop: '0px'}}>要素值</td>
                                 </tr>
                                 {
                                     data.matchElementInfo.map((item, index) => {
                                         var name = item.name;
                                         var namePath = item.name_path;
                                         var valueList = item.valueList;
                                         var valueRess = '';
                                         for (var j = 0; j < valueList.length; j++) {
                                             var innerStr = valueList[j].value;
                                             if (j == valueList.length - 1) {
                                                 if (valueList[j].value.indexOf('<!') >= 0) {
                                                     innerStr = valueList[j].value.replace(/<!/g, '&lt!')
                                                 }
                                                 valueRess += innerStr;
                                             } else {
                                                 if (valueList[j].value.indexOf('<!') >= 0) {
                                                     innerStr = valueList[j].value.replace(/<!/g, '&lt!')
                                                 }

                                                 valueRess += innerStr + " , ";
                                             }
                                         }
                                         return (
                                             <tr key={"ele" + index}>
                                                 <td style={{width: '20%', borderTop: '0px'}}>{name}</td>
                                                 <td style={{width: '20%', borderTop: '0px'}}>{namePath}</td>
                                                 <td style={{width: '60%', borderTop: '0px'}}>{valueRess}</td>
                                             </tr>
                                         )
                                     })
                                 }
                                     </tbody>
                                     </table>
                                     </td>
                                     </tr>
                        ):null
                    }
                    </tbody>
                </table>
        )
    }
}
CtypesTable.propTypes = {
    data: PropTypes.object.isRequired
}
export default CtypesTable;