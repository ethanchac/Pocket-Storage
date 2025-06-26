import { useState } from "react"
import { supabase } from "../../database/supabase-client";

function Auth(){
    const [isSignUp, setisSignUp] = useState(true);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent form reload
        
        if(isSignUp){
            const {error} = await supabase.auth.signUp({email, password});
            if(error){
                console.error("Error signing up", error.message)
                return
            }
        }else{
            const {error} = await supabase.auth.signInWithPassword({email, password});
            if(error){
                console.error("Error signing in", error.message);
            }
        }
    }

    const switchSignup = () => {
        setisSignUp(!isSignUp);
    }

    return(
        <div>
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    required
                />
                <button type="submit">
                    {isSignUp ? "Sign up" : "Sign in"}    
                </button> 
            </form>
            <button onClick={switchSignup}>
                {isSignUp ? "Login" : "Create an account"}
            </button>
        </div>
    )
}

export default Auth