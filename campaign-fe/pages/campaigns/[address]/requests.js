import Link from 'next/link'
import { Container, Header, Button } from 'semantic-ui-react'
import HeadComps from 'components/Head/HeadComps'
import Layout from 'components/Layout/Layout'

export default function Requests({ address }) {  
  return (
    <Layout>
      <HeadComps title="requests"/>
      <Container>
        <Header as='h3'>Request List</Header>
        <Link href={`/campaigns/${address}/requests/new`}>
          <a><Button primary>Add Request</Button></a>
        </Link>
      </Container>
    </Layout>
  )
}

export async function getServerSideProps(context) {
  try {
    const { address } = context.params
    return {
      props: {
        address,
      }
    }
  } catch (err) {
    console.log('error message:', err.message)
  }

  return {
    props: {}
  }
}
