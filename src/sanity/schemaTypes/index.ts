import { type SchemaTypeDefinition } from 'sanity'

import siteSettings from './siteSettings'
import solutionCategory from './solutionCategory'
import project from './project'
import tool from './tool'
import post from './post'
import legalPage from './legalPage'
import contactLead from './contactLead'

export const schema: { types: SchemaTypeDefinition[] } = {
    types: [
        siteSettings,
        solutionCategory,
        project,
        tool,
        post,
        legalPage,
        contactLead
    ],
}
