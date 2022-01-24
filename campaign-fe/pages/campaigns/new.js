import { Container, Header, Button } from 'semantic-ui-react'
import HeadComps from '../../components/Head/HeadComps'
import Layout from '../../components/Layout/Layout'

export default function New() {
  console.log('News')
  
  return (
    <Layout>
      <HeadComps title="Create A Campaign"/>
      <Container>
        <Header as='h3'>Create A Campaign</Header>
        <Button primary content='Create' icon='add circle' />
      </Container>
    </Layout>
  )
}
