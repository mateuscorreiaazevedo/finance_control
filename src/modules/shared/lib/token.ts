import * as jwt from 'jose'

const key = new TextEncoder().encode(process.env.JWT_SECRET)

export class TokenHelper {
  /**
   * Português: Cria um token JWT com base no payload e tempo de expiração fornecidos.
   * English: Creates a JWT token based on the provided payload and expiration time.
   *
   *@param payload -  Português: O payload do token, que pode ser qualquer objeto.
   * @param payload - English: The token payload, which can be any object.
   * @param expiresIn - Português: O tempo de expiração do token em segundos.
   * @param expiresIn - English: The token expiration time in seconds.
   * @returns Português: O token JWT criado.
   * @returns English: The created JWT token.
   */
  static create<K extends jwt.JWTPayload>(payload: K): Promise<string> {
    const token = new jwt.SignJWT(payload)
      .setProtectedHeader({ alg: 'HS256' })
      .setIssuedAt()
      .sign(key)

    return token
  }

  /**
   * Português: Verifica a autenticidade de um token JWT com base na chave secreta.
   * English: Verifies the authenticity of a JWT token based on the secret key.
   *
   * @param token - Português: O token JWT a ser verificado.
   * @param token - English: The JWT token to be verified.
   * @returns Português: O payload do token verificado.
   * @returns English: The verified token payload.
   */
  static async verify<K = unknown>(token: string): Promise<K> {
    const payload = await jwt.jwtVerify(token, key)

    return payload as K
  }
  /**
   * Português: Decodifica a autenticidade de um token JWT com base na chave secreta.
   * English: Decode the authenticity of a JWT token based on the secret key.
   *
   * @param token - Português: O token JWT a ser decodificado.
   * @param token - English: The JWT token to be decoded.
   * @returns Português: O payload do token decodificado.
   * @returns English: The decoded token payload.
   */
  static decode<K extends object>(token: string): K {
    const payload = jwt.decodeJwt(token) as K

    return payload
  }
}
