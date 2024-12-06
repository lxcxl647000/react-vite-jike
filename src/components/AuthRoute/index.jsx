import { GET_TOKEN } from "@/utils";
import { Navigate } from "react-router-dom";

const AuthRoute = ({ children }) => {
    let token = GET_TOKEN();
    // 有token跳转到children组件//
    if (token) {
        return <>{children}</>
    }
    else {// 无token返回登录//
        return <Navigate to="/login" replace />
    }
};

export default AuthRoute;