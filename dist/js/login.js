"use strict";function Expenses(){}Expenses.prototype={get_ddUserID:function(){if(-1==window.location.href.indexOf("ddUserID"))throw $my.messageInfo.html("url错误").fadeIn("fast").delay("1000").fadeOut("slow"),new Error("url错误");var e=window.location.search;e=e.split("=")[1],$my.ddUserID=e},verification:function(e){if(null==e||"null"==e)return void $my.messageInfo.html("用户ID丢失").fadeIn("fast").delay("1000").fadeOut("slow");$.ajax({url:getRoothPath+"/ddExpenses/userController/login",data:{ddUserID:e},success:function(e){if("{}"===JSON.stringify(e))return $my.messageInfo.html("暂无数据").fadeIn("fast").delay("1000").fadeOut("slow"),!1;switch(e.status){case"true":var s,n;if(s=e.info,!s.length)return void $my.messageInfo.html("返回信息为空").fadeIn("fast").delay("1000").fadeOut("slow");n=s[0].userID,sessionStorage.setItem("ddUserID",n),window.location.href="./src/html/index.html";break;case"failure":$my.messageInfo.html("登录错误").fadeIn("fast").delay("1000").fadeOut("slow")}}})}};var expenses=new Expenses;$(function(){window.$my={messageInfo:$(".messageInfo")},expenses.get_ddUserID(),expenses.verification($my.ddUserID)});