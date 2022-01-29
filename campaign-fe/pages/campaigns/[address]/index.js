import { useRouter } from 'next/router'
import { Container, Header } from 'semantic-ui-react'
import HeadComps from 'components/Head/HeadComps'
import Layout from 'components/Layout/Layout'

export default function Address() {
  const router = useRouter()
  const { address } = router.query
  
  return (
    <Layout>
      <HeadComps title="Address"/>
      <Container>
        <Header as='h3'>Campaign Details</Header>
      </Container>
    </Layout>
  )
}
