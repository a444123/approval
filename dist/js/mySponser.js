function Approval(){this.dataCount="",this.sessionArr_mySponser=[]}Approval.prototype={throttle:function(a,e){clearTimeout(a.tId),a.tId=setTimeout(function(){a.call(e)},200)},touchThrottle:function(a,e,t){var s=null,n=new Date;return function(){var o=this,l=arguments,i=new Date;clearTimeout(s),i-n>=t?(a.apply(o,l),n=i):s=setTimeout(function(){a.apply(o,l)},e)}},getData:function(a,e,t){var s=this;$.ajax({url:getRoothPath+"/ddExpenses/expenseInfo/mySponsoredList",data:{userID:a,pageNum:e,pageSize:t},success:function(a){if("{}"===JSON.stringify(a))return $my.messageInfo.html("暂无数据").fadeIn("fast").delay("1000").fadeOut("slow"),!1;switch(a.status){case"true":var e=a.info;if(s.dataCount=e.dataCount,localStorage.setItem("dataCount_mySponser",e.dataCount),"{}"===JSON.stringify(e))return void $my.messageInfo.html("返回信息为空").fadeIn("fast").delay("1000").fadeOut("slow");var n=e.data;if(!n.length)return $(".loading").hide(),void $my.messageInfo.html("暂无信息").fadeIn("fast").delay("1000").fadeOut("slow");n.length<t&&($(".loading").hide(),$my.lodingText.classList.add("lodingText_show")),Array.prototype.push.apply(s.sessionArr_mySponser,n),localStorage.setItem("sessionTouchData_mySponser",JSON.stringify(s.sessionArr_mySponser)),s.renderElement(n);break;case"failure":$my.messageInfo.html("查询错误").fadeIn("fast").delay("1000").fadeOut("slow")}}})},renderElement:function(a){for(var e="",t="",s="",n=0;n<a.length;n++){var o=a[n].expenseState;switch(o){case"审核中":t='<li class="underReview" data-detailid='+a[n].id+" data-status=0>",s='<p class="status"><span class="glyphicon glyphicon-exclamation-sign my-icon"></span>&nbsp;&nbsp;<span>'+o+"</span></p>";break;case"已通过":t='<li class="passed" data-detailid='+a[n].id+" data-status=1>",s='<p class="status"><span class="iconfont icon-tongguo my-icon"></span>&nbsp;&nbsp;<span>'+o+"</span></p>";break;case"已拒绝":t='<li class="refused" data-detailid='+a[n].id+" data-status=2>",s='<p class="status"><span class="iconfont icon-ttpodicon my-icon"></span>&nbsp;&nbsp;<span>'+o+"</span></p>"}e+=""+t,e+='<div class="container-fluid myContainer">',e+='<div class="row my-row">',e+='<div class="col-xs-3 col-sm-3 col-md-3 my-col ">',e+='<span class="peopleName nowrap text-center">'+a[n].ExpenseUserName+"</span>",e+="</div>",e+='<div class="col-xs-6 col-sm-6 col-md-6 my-col">',e+='<div class="inTop">',e+='<p class="nowrap">'+a[n].itemName+"&nbsp;</p>",e+="</div>",e+='<div class="inBottom">',e+='<p class="count">￥<span>'+a[n].expenseTotal+"</span></p>",e+="</div>",e+="</div>",e+='<div class="col-xs-3 col-sm-3 col-md-3 my-col text-right">',e+='<div class="inTop">',e+=""+s,e+="</div>",e+='<div class="inBottom">',e+="<span>"+a[n].updateTime.substring(6)+" <span></span></span>",e+="</div></div></div></div></li>"}$($my.inWrap).append(e),$my.flag=!1},scrollEvent:function(){var a=$my.loadingWrap.getBoundingClientRect();if(!$my.flag){if(!(a.top<$my.vpHeight&&a.bottom>=0))return;if($my.flag=!0,++$my.num>parseInt(approval.dataCount/pageSize)||$my.num==parseInt(approval.dataCount/pageSize)&&approval.dataCount%pageSize==0)return $(".loading").hide(),$my.lodingText.classList.add("lodingText_show"),!1;localStorage.setItem("pageNum_mySponser",$my.num),approval.getData($my.userID,$my.num,pageSize)}},viewDetail:function(){var a=function(){var a=this.dataset.detailid,e=this.dataset.status;window.location.href="detail_approval.html?detailid="+a+"#status="+e};$($my.inWrap).on("click","li",function(e){e.preventDefault(),e.stopPropagation(),approval.throttle(a,this)})}};var approval=new Approval;$(function(){window.$my={messageInfo:$(".messageInfo"),userID:sessionStorage.getItem("ddUserID"),loadingWrap:document.querySelector("#loadingWrap"),lodingText:document.querySelector("#lodingText"),inWrap:document.querySelector(".inWrap"),wrap:document.querySelector(".wrap"),vpHeight:document.documentElement.clientHeight,num:0,flag:!1};var a=localStorage.getItem("sessionTouchData_mySponser"),e=localStorage.getItem("pageNum_mySponser"),t=localStorage.getItem("dataCount_mySponser");null!=a&&"null"!=a&&null!=e&&"null"!=e&&null!=t&&"null"!=t?(a=JSON.parse(a),$my.num=e,approval.dataCount=t,approval.sessionArr_mySponser=a,approval.renderElement(a)):(approval.getData($my.userID,0,pageSize),localStorage.setItem("pageNum_mySponser",$my.num)),window.addEventListener("touchmove",approval.touchThrottle(approval.scrollEvent,500,1e3)),approval.viewDetail()});