export const initialState = {
    name : "",
    empNo:"",
    countries : [],
    states : {},
    cities : {},
    address : [],
    url : null
}

export const reducer =(state,action)=> {
    switch(action.type){
        case "set-name":
            return {...state,name : action.value}
        case "set-empNo":
            return {...state,empNo : action.value}    
        case "set-countries":
            return {...state,countries : action.value}
        case "set-states":
            return {...state,states : action.value}
        case "set-cities":
            return {...state,cities : action.value}
        case "set-address":
            return {...state,address : action.value}
        case "set-url":
            return {...state,url : action.value}
        default :
            return state
    }
}