export default interface authInterface{
    name: string;
    isLoggedIn: Boolean;
    user: {
        id: string;
        name: string;
        email: string;
        avatar: string;
        verified: Boolean;
    }
};
