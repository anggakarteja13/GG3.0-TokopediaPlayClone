export type CreateUser = {
    role: string,
    email: string,
    userName: string,
    password: string,
    imgUrl: string
}

export type LoginUser = {
    email: string,
    password: string
}