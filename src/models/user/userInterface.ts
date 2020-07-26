enum Role {
    Athlete,
    Coach,
}

export interface userInterface {
    username: string
    email: string
    role: Role
    friends?: string[]
}
