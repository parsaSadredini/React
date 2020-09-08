import { Redirect } from "react-router-dom";
import React from 'react'

export const ExceprionHandler = (response,history,onSuccessCallBack)=> {
    if(response.isSuccess == true){
        onSuccessCallBack()
    }else{
        if(response.apiResultStatusCode == 6){
            history.push("/manager/login")
            // alert("You are not Authorized")
        }
    }
    
}
