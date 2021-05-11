interface TokenResponse {
    accessToken: string;
    expiresIn: number;
    idToken: string | undefined;
    issuedAt: number;
    refreshToken: string;
    scope: string;
    state: string | undefined;
    tokenType: string;
}