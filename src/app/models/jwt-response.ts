export interface JwtResponse {
    dataUser: {
        id: number,
        name: string,
        emai: string,
        accessToken: string,
        expiresIn: string
    }
}
