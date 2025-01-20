import {File, Rule} from '@sanity/types'

export default {
  name: 'report',
  type: 'document',
  title: 'Report',
  fields: [
    // {
    //   name: 'id',
    //   type: 'number',
    //   title: 'ID',
    //   validation: (Rule: Rule) => Rule.required(),
    // },
    // {
    //   name: 'date',
    //   type: 'datetime',
    //   title: 'Date',
    //   validation: (Rule: Rule) => Rule.required(),
    // },
    {
      name: 'title',
      type: 'string',
      title: 'Title',
      validation: (Rule: Rule) => Rule.required(),
    },
    // {
    //   name: 'ticker',
    //   type: 'string',
    //   title: 'Ticker',
    //   validation: (Rule: Rule) => Rule.required(),
    // },
    {
      name: 'tag',
      type: 'string',
      title: 'Tag',
    },
    {
      name: 'company',
      type: 'reference',
      to: [{type: 'company'}],
      title: 'Company',
    },
    {
      name: 'category',
      type: 'string',
      title: 'Category',
      options: {
        list: [
          {title: 'Hlutabref', value: 'hlutabref'},
          {title: 'Skuldabref', value: 'skuldabref'},
          {title: 'Hagkerfi', value: 'hagkerfi'},
        ],
      },
      validation: (Rule: Rule) => Rule.required(),
    },
    {
      name: 'file',
      type: 'file',
      title: 'PDF File',
      description: 'Upload the PDF file associated with the report.',
      options: {
        accept: 'application/pdf', // Restricts file uploads to PDF files
      },
      validation: (Rule: Rule) =>
        Rule.required().custom(async (file: File, context) => {
          if (!file || !file.asset) return 'A file is required.'
          const client = context.getClient({apiVersion: '2023-01-01'})
          const asset = await client.getDocument(file.asset._ref) // Fetch the asset document
          if (asset?.mimeType !== 'application/pdf') {
            return 'Only PDF files are allowed.'
          }
          return true
        }),
    },
  ],
}
