import { NextStudio } from 'next-sanity/studio'
import config from '../../../../sanity.config'

export default function StudioPage() {
    // Force HMR reload
    return <NextStudio config={config} />
}
