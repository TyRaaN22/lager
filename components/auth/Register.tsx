import Auth from '../../interfaces/auth.ts';
import { useState } from 'react';
import { showMessage } from 'react-native-flash-message';
import AuthModel from '../../models/auths.ts';
import AuthFields from './AuthFields.tsx';

export default function Register({ navigation }) {
    const [auth, setAuth ] = useState<Partial<Auth>>({});

    async function doRegister() {
        if (auth.email && auth.password) {
            const result = await AuthModel.register(auth.email, auth.password);
            if (result.type === "success") {
                navigation.navigate("Login");
            }
            showMessage({
                message: result.title,
                description: result.message,
                type: result.type,
            });
        } else {
            showMessage({
                message: "Saknas",
                description: "E-post och/eller lösenord saknas",
                type: "warning",
            });
        }
    }

    return (
        <AuthFields
            auth={auth}
            setAuth={setAuth}
            submit={doRegister}
            title="Registrera"
            navigation={navigation}
        />
    )
};