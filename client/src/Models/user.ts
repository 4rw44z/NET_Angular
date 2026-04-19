export interface IUser  {
    id: string;
    displayName: string;
    email: string;
    token: string;
    imageUrl: string
}

export type RegisterCreds = {
    email: string;
    displayName: string;
    passowrd: string;
    gender: string;
    dateOfBirth: string;
    city: string;
    country: string;
}
// type is same as interfaces but interfaces can be extended and implemented while types cannot be extended or implemented but can be intersected with other types.
export type LoginCreds = {
    email: string;
    password: string;
}