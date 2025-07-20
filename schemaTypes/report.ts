import {File, Rule} from '@sanity/types'

export default {
  name: 'report',
  type: 'document',
  title: 'Report',
  fields: [
    {
      name: 'title',
      type: 'string',
      title: 'Title',
      validation: (Rule: Rule) => Rule.required(),
    },
    {
      name: 'companies',
      type: 'array',
      title: 'Companies',
      of: [{type: 'reference', to: [{type: 'company'}]}],
      validation: (Rule: Rule) => Rule.min(1).error('At least one company is required'),
    },
    {
      name: 'categories',
      type: 'array',
      title: 'Categories',
      of: [{type: 'string'}],
      options: {
        list: [
          {title: 'Hlutabréf', value: 'hlutabref'},
          {title: 'Skuldabréf', value: 'skuldabref'},
          {title: 'Hagkerfi', value: 'hagkerfi'},
        ],
      },
      validation: (Rule: Rule) => Rule.min(1).error('At least one category is required'),
    },
    {
      name: 'releaseDate',
      type: 'datetime',
      title: 'Release Date',
      description: 'The date when the report is/was released',
      options: {
        dateFormat: 'YYYY-MM-DD',
        timeFormat: 'HH:mm',
        timeStep: 15,
      },
      initialValue: () => new Date().toISOString(),
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
