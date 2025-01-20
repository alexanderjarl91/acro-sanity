// schemas/company.js
import {File, Rule} from '@sanity/types'

export default {
  name: 'company',
  type: 'document',
  title: 'Company',
  fields: [
    {
      name: 'name',
      type: 'string',
      title: 'Name',
      validation: (Rule: Rule) => Rule.required(),
    },
    {
      name: 'slug',
      type: 'slug',
      title: 'Slug',
      description:
        'A URL-friendly version of the company name. Automatically generated from the name but can be edited manually.',
      options: {
        source: 'name', // Automatically generates the slug from the "name" field
        maxLength: 200, // Optional: Limit the length of the slug
        slugify: (input: string) =>
          input
            .toLowerCase()
            .replace(/\s+/g, '-') // Replace spaces with dashes
            .replace(/[^a-z0-9-]/g, '') // Remove non-alphanumeric characters
            .slice(0, 200), // Limit the length to 200 characters
      },
      validation: (Rule: Rule) => Rule.required(),
    },
    {
      name: 'ticker',
      type: 'string',
      title: 'Ticker',
      validation: (Rule: Rule) => Rule.required(),
    },
    {
      name: 'industry',
      type: 'reference',
      to: [{type: 'industry'}],
      title: 'Industry',
    },
    {
      name: 'description',
      type: 'text',
      title: 'Description',
    },
    {
      name: 'image',
      type: 'image',
      title: 'Image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'informationPdf',
      type: 'file',
      title: 'Upplýsingablað',
      description: 'Upload a PDF with detailed information about the company.',
      options: {
        accept: 'application/pdf', // Only accept PDF files
      },
      validation: (Rule: Rule) =>
        Rule.custom((file: File) => {
          if (!file || !file.asset) return 'A PDF file is required.'
          return true
        }),
    },
  ],
}
