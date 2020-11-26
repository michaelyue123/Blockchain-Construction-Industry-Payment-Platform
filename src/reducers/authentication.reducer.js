import { alertConstants, authConstants } from '../constants';

// user info for three different roles. you can toggle these roles to display different user pages. 
const initialState = {
    // user: {
    //     role: "owner",
    //     userId: "o0001",
    //     firstName: "Lucy",
    //     lastName: "Lisa",
    //     email: "project@gmail.com",
    //     password: "c4318372f98f4c46ed3a32c16ee4d7a76c832886d887631c0294b3314f34edf1",
    //     status: true,
    //     companyId: "b0016"
    // },
    // user: {
    //     role: "lead",
    //     userId: "c0003",
    //     firstName: "Lucia",
    //     lastName: "Mia",
    //     email: "lead@gmail.com",
    //     password: "",
    //     status: true,
    //     companyId: "b0008"
    // },
    // user: {
    //     role: "contractor",
    //     userId: "c0011",
    //     firstName: "Pengfei",
    //     lastName: "Yue",
    //     email: "michaelyue123@gmail.com",
    //     password: "",
    //     status: false,
    //     companyId: "b0008"
    // }
};


export function authentication (state = initialState, action) {
    switch (action.type) {
        case authConstants.REGISTER_SUCCESS:
            return {
                user: action.user
            };
        case authConstants.LOGIN_SUCCESS:
            return {
                user: action.user
            };
        case authConstants.LOGOUT:
            return {};
        case alertConstants.IS_CONFIRMED:
            return {
                user: state.user,
                isConfirmed: action.status
            }
        case authConstants.UPDATE_SUCCESS:
            return {
                user: action.user,
                isConfirmed: action.user.status
            }
        default:
            return state;
    }
}