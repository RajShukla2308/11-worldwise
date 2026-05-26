import { createContext, useContext, useReducer } from "react";


const AuthContext = createContext();


const initialState = {
    user: null,
    isAuthenticated: false,
}

function reducer(state, action){
    switch(action.type){
        case 'loggedin': 
            return {...state, 
                user: action.payload, 
                isAuthenticated: true
            }

        case 'loggedout':
            return {
                ...state, 
                user: null, 
                isAuthenticated: false
            }

        case 'error':
            return {...state, error: action.payload}

        default: 
            throw new Error('no state found')
    }
}

const FAKE_USER = {
  name: "Jack",
  email: "jack@example.com",
  password: "qwerty",
  avatar: "https://i.pravatar.cc/100?u=zz",
};

// eslint-disable-next-line react/prop-types
function AuthProvider({children}){

    const [{user,isAuthenticated},dispatch] = useReducer(reducer, initialState) 


    function login(email,password){
        if(email === FAKE_USER.email && password===FAKE_USER.password){
            console.log('login successfull');
            dispatch({type: 'loggedin',payload: FAKE_USER })
        }
    }

    function logout(){
        dispatch({type:'loggedout'})
    }

    return <AuthContext.Provider value={{login, logout, user,isAuthenticated}}>{children}</AuthContext.Provider>

}

function useAuth(){
    const context = useContext(AuthContext);
    if(context === undefined) throw new Error('Trying to access outside context');
    return context;
}

// eslint-disable-next-line react-refresh/only-export-components
export {useAuth, AuthProvider}