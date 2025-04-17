import { PropsWithChildren } from 'react'

interface Props {
  params: Promise<{ documentId: string }>
}

export default async function layout({ children }: PropsWithChildren<Props>) {
  return <>{children}</>
}
