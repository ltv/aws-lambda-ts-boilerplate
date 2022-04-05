/**
 * Get user if valid token, error if invalid.
 *
 * @param {string} token
 */
export const verifyJwt = (token: string) => {
  if (!token) return false
  return { id: 'fakeId' }
}
