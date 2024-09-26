import { domailUrl } from "./domainUrl";

const EndPoints = {
    SignUp: domailUrl+'/api/signup',
    AllUser: domailUrl+'/api/all/users',
    GetSingleUser:domailUrl+'/api/User/',
    DeleteUser: domailUrl+'/api/User/',
    EditUser: domailUrl+'/api/User/',
    Login: domailUrl+'/api/login',
    AddRestaurant: domailUrl+'/api/add',
    AllRestaurant: domailUrl+'/api/all/restaurants',
    DeleteRestaurant: domailUrl+'/api/restaurant/',
    EditRestaurant: domailUrl+'/api/restaurant/',
    AddMenu: domailUrl+'/api/add/menu',
    GetMenu: domailUrl+'/api/menu/restaurant/',
    DeleteMenu: domailUrl+'/api/menu/',
    EditMenu: domailUrl+'/api/menu/',
    UserPreferencer: domailUrl+'/api/restaurant/',
    AddFeedBack: domailUrl+'/api/add/feedback',
}

export default EndPoints;