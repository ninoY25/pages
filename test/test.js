
//ajax jquery
function checkIsExist(input){
    if (input.value!=""){
        var errorid = input.id + "-error";
        $.ajax({
            type: "POST",
            url: "${ctx}/screen/bizScreen/checkLiftCodeNotExist",
            data: "liftCode="+input.value,
            dataType : "json",
            success : function (data) {
                if (data){
                    var error = document.getElementById(errorid);
                    $(error).css("display","none");
                } else {
                    $(input).after("<label id="+errorid+" class='error'>该电梯注册码已存在</label>")
                }
            }
        })
    }
}