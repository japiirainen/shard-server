import { Magic } from '@magic-sdk/admin'
import express from 'express'
import { SDKError as MagicSDKError } from '@magic-sdk/admin'
import { UserModel } from 'src/qql-schema/user/user.model'
import { ForbiddenError, ApolloError } from 'apollo-server'

const magic = new Magic(process.env.MAGIC_SECRET_KEY)

export const didTokenCheck = function (req: express.Request, res: express.Response, next: express.NextFunction) {
  if (!!req.headers.authorization) {
    try {
      const didToken = magic.utils.parseAuthorizationHeader(req.headers.authorization)
      magic.token.validate(didToken)

      req.user = {
        issuer: magic.token.getIssuer(didToken),
        publicAddress: magic.token.getPublicAddress(didToken),
        claim: magic.token.decode(didToken)[1],
      }
    } catch (error) {
      res.status(401).send()

      return error instanceof MagicSDKError ? next(error) : next({ message: 'Invalid DID token' })
    }
  }
  next()
}

export const login = async (_: any, __: any, { user }: { user: any }) => {
  const existingUser = await UserModel.findOne({ issuer: user.issuer })

  if (!existingUser) {
    const userMetadata = await magic.users.getMetadataByIssuer(user.issuer)
    const newUser: any = {
      issuer: user.issuer,
      email: userMetadata.email,
      lastLoginAt: user.claim.iat,
    }
    const doc = await UserModel.create(newUser)
    return { user: doc }
  } else {
    if (user.claim.iat <= user.lastLoginAt) {
      throw new ForbiddenError(`Replay attack detected for user ${user.issuer}}.`)
    }
    const doc = await UserModel.update(
      { issuer: user.issuer },
      { $set: { lastLoginAt: user.claim.iat } },
      { returnUpdatedDocs: true }
    )

    return { user: doc }
  }
}

export const logout = async (_: any, __: any, { user }: { user: any }) => {
  try {
    await magic.users.logoutByIssuer(user.issuer)
    return true
  } catch (error) {
    throw new ApolloError(error.data[0].message)
  }
}
