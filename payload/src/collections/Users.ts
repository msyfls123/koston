import type { CollectionConfig } from 'payload'
import { label } from '../libs/utils'

export const Users: CollectionConfig = {
  slug: 'users',
  labels: label('管理用户'),
  admin: {
    useAsTitle: 'email',
  },
  auth: true,
  fields: [
    // Email added by default
    // Add more fields as needed
  ],
}
