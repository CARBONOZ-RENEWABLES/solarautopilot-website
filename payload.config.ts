import { buildConfig } from 'payload/config'
import { webpackBundler } from '@payloadcms/bundler-webpack'
import { mongooseAdapter } from '@payloadcms/db-mongoose'
import { slateEditor } from '@payloadcms/richtext-slate'

export default buildConfig({
  admin: {
    user: 'users',
    bundler: webpackBundler(),
  },
  editor: slateEditor({}),
  db: mongooseAdapter({
    url: process.env.DATABASE_URI || 'mongodb://localhost/solarautopilot',
  }),
  collections: [
    {
      slug: 'users',
      auth: true,
      admin: { useAsTitle: 'email' },
      fields: [
        { name: 'role', type: 'select', options: ['admin', 'editor'], defaultValue: 'editor' }
      ],
    },
    {
      slug: 'pages',
      admin: { useAsTitle: 'title' },
      fields: [
        { name: 'title', type: 'text', required: true },
        { name: 'slug', type: 'text', required: true, unique: true },
        { name: 'hero', type: 'group', fields: [
          { name: 'title', type: 'text' },
          { name: 'subtitle', type: 'textarea' },
          { name: 'primaryCTA', type: 'text' },
          { name: 'secondaryCTA', type: 'text' },
        ]},
        { name: 'sections', type: 'array', fields: [
          { name: 'type', type: 'select', options: ['features', 'downloads', 'testimonials'] },
          { name: 'title', type: 'text' },
          { name: 'content', type: 'richText' },
        ]},
      ],
    },
    {
      slug: 'features',
      admin: { useAsTitle: 'title' },
      fields: [
        { name: 'title', type: 'text', required: true },
        { name: 'description', type: 'textarea' },
        { name: 'icon', type: 'text' },
        { name: 'order', type: 'number', defaultValue: 0 },
        { name: 'enabled', type: 'checkbox', defaultValue: true },
      ],
    },
    {
      slug: 'downloads',
      admin: { useAsTitle: 'platform' },
      fields: [
        { name: 'platform', type: 'select', options: ['windows', 'macos', 'linux', 'docker'] },
        { name: 'version', type: 'text', required: true },
        { name: 'filename', type: 'text' },
        { name: 'downloadUrl', type: 'text', required: true },
        { name: 'size', type: 'text' },
        { name: 'enabled', type: 'checkbox', defaultValue: true },
      ],
    },
    {
      slug: 'settings',
      admin: { useAsTitle: 'siteName' },
      fields: [
        { name: 'siteName', type: 'text', defaultValue: 'SolarAutopilot' },
        { name: 'tagline', type: 'text' },
        { name: 'contactEmail', type: 'email' },
        { name: 'socialLinks', type: 'group', fields: [
          { name: 'twitter', type: 'text' },
          { name: 'linkedin', type: 'text' },
        ]},
      ],
    },
  ],
})