import { Container, Header } from 'semantic-ui-react'
import HeadComps from 'components/Head/HeadComps'
import Layout from 'components/Layout/Layout'

export default function New() {  
  return (
    <Layout>
      <HeadComps title="Request New"/>
      <Container>
        <Header as='h3'>Request New</Header>
      </Container>
    </Layout>
  )
}
