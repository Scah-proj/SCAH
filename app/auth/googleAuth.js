
import { jwtDecode} from "jwt-decode";

export const handleGoogleSuccess = (credentialResponse, users, setUser, router) => {
        const token = credentialResponse.credential;
        const profile = jwtDecode(token);

        const existingUser = users.find((u) => u.email === profile.email);

        if(existingUser) {
            router.push('/userfeed/feed');
        }
        else{
            const addUser = [...users, profile];
            setUser(addUser);
            localStorage.setItem("users", JSON.stringify(addUser));
            localStorage.setItem("currentUser", JSON.stringify(profile));
            router.push('/onboarding');
        }
    };

