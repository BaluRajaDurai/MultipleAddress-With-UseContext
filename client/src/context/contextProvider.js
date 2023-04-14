import React,{createContext,useReducer} from "react";

import { initialState as profileInitialState,reducer as profileReducer} from "./profileData"

export const Context =createContext(null)

const ContextProvider = Context.Provider;

const ContextProviderWrapper=({children})=>{
    const [profileData, profileDateDispatch] = useReducer(profileReducer , profileInitialState)

    const store = {
        ProfileData:{state: profileData, dispatch: profileDateDispatch}
    }

    return <ContextProvider value={store}>{children}</ContextProvider>


}

export default ContextProviderWrapper;
