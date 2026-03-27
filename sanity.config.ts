'use client'

import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schema } from './src/sanity/schemaTypes'

// Use fallbacks for project configuration
const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '14uc7z0c'
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'

export default defineConfig({
    basePath: '/studio',
    projectId,
    dataset,
    // Add and edit the content schema in the './sanity/schemaTypes' folder
    schema,
    plugins: [
        structureTool({
            structure: (S) =>
                S.list()
                    .title('İçerik Yönetimi')
                    .items([
                        S.listItem()
                            .title('Site Ayarları')
                            .id('siteSettings')
                            .child(
                                S.document()
                                    .schemaType('siteSettings')
                                    .documentId('siteSettings')
                                    .title('Site Ayarları')
                            ),
                        S.divider(),
                        ...S.documentTypeListItems().filter(
                            (listItem) => !['siteSettings', 'solutionCategory', 'contactLead'].includes(listItem.getId() as string)
                        ),
                    ]),
        }),
        // Vision is a tool that lets you query your content with GROQ in the studio
        // https://www.sanity.io/docs/the-vision-plugin
        visionTool({ defaultApiVersion: '2025-01-01' }),
    ],
})
