export const generatePolicy = (principalId: string, Effect: string, resource: string) => ({
  principalId,
  policyDocument: {
    Version: '2012-10-17',
    Statement: [{ Action: 'execute-api:Invoke', Effect, Resource: resource || '*' }],
  },
  context: {
    userId: principalId,
    scope: 'profile',
  },
})
