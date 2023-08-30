export interface UserData{
    bio?: String;
    name: String;
    username: String;
    email: String;
    emailVerfied: String | null;
    id: String;
    image: String;
    password?: String;
    createdAt: Date;
    updatedAt: Date;
    hasNotifications?: Boolean | null;
    onboarded: Boolean;
    coverImage: String | null;
    profileImage: String | null;
    followersIds: any;
    followingIds: any;
}