import { Container, Header } from 'semantic-ui-react'
import HeadComps from 'components/Head/HeadComps'
import Layout from 'components/Layout/Layout'

export default function Request() {  
  return (
    <Layout>
      <HeadComps title="request"/>
      <Container>
        <Header as='h3'>request</Header>
      </Container>
    </Layout>
  )
}
