import { ROLES } from "../constants/roles";

export const getDashboardRoute = (user) => {
    if(!user) return "/login";
    
    switch(user.role){
        case ROLES.ADMIN :
            return "/admin";
        case ROLES.STUDENT :
            return "/student";
        case ROLES.TEACHER :
            return "/teacher";
        case ROLES.USER :
            return "/user";
        default :
            return "/";
    }
}
