import { describe, it, expect } from 'vitest'
import * as axios from 'axios'
import Utils from './utils'

describe('get auth token', () => {
  it('fetches successfully data from an API', async () => {
    const data = {
      data: {
        access_token: '608344fc-ba71-4b95-8f99-a525ded17707',
        scope: 'account:write trading data',
        token_type: 'Bearer',
      },
    }
    await expect(Utils.getAuthToken('test')).resolves.toEqual(data)
  })
})
