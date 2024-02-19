import { readFileSync } from 'fs'
import { resolve } from 'path'

// export async function getStaticPaths() {
//   return {
//     paths: [{ params: { id: '1' } }, { params: { id: '2' } }],
//   }
// }

export async function generateStaticParams() {
  const jsonData = JSON.parse(
    readFileSync(resolve(process.cwd(), 'markdown/index.json'), {
      encoding: 'utf-8',
    }),
  )

  const sectionsText = [] as string[]

  const sections = [] as {
    path: string

    text: string
  }[]

  for (const path of jsonData) {
    const file = readFileSync(resolve(process.cwd(), 'markdown', path), {
      encoding: 'utf-8',
    })

    // sectionsText.push(file)
    sections.push({
      path: path.replace('.md', '').replace('./sections/', ''),
      text: file,
    })
  }

  console.log(sections, 'sections-page')

  return sections
}

export default (props: any) => {
  return <pre>{JSON.stringify(props, null, 2)}</pre>
}
