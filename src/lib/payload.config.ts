import { buildConfig } from 'payload/config'
import { webpackBundler } from '@payloadcms/bundler-webpack'
import { jsonAdapter } from '@payloadcms/db-json'
import { lexicalEditor } from '@payloadcms/richtext-lexical'

export default buildConfig({
  admin: {
    user: 'users',
    bundler: webpackBundler(),
  },
  editor: lexicalEditor({}),
  db: jsonAdapter({
    path: './content/database.json',
  }),
  collections: [
    {
      slug: 'pages',
      fields: [
        { name: 'title', type: 'text', required: true },
        { name: 'slug', type: 'text', required: true },
        { name: 'content', type: 'richText' },
      ],
    },
    {
      slug: 'features',
      fields: [
        { name: 'title', type: 'text', required: true },
        { name: 'description', type: 'textarea' },
        { name: 'icon', type: 'text' },
      ],
    },
    {
      slug: 'downloads',
      fields: [
        { name: 'platform', type: 'text', required: true },
        { name: 'version', type: 'text', required: true },
        { name: 'downloadUrl', type: 'text', required: true },
      ],
    },
  ],
})