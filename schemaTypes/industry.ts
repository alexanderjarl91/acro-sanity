// schemas/industry.js
import {Rule} from '@sanity/types'

export default {
  name: 'industry',
  type: 'document',
  title: 'Industry',
  fields: [
    {
      name: 'name',
      type: 'string',
      title: 'Name',
      validation: (Rule: Rule) => Rule.required(),
    },
    {
      name: 'createdAt',
      type: 'datetime',
      title: 'Created At',
      options: {
        defaultValue: () => new Date().toISOString(),
      },
    },
    {
      name: 'updatedAt',
      type: 'datetime',
      title: 'Updated At',
    },
  ],
}
