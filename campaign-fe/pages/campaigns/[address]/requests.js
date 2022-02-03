import Link from 'next/link'
import { Container, Header, Button } from 'semantic-ui-react'
import HeadComps from 'components/Head/HeadComps'
import Layout from 'components/Layout/Layout'
import Campaign from 'utils/ethereum/campaign'
import web3 from 'utils/ethereum/web3'

export default function Requests({ address, requestsCount, requests }) {  
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
    const campaign = Campaign(address)
    const requestsCount = await campaign.methods.getRequestsCount().call()

    /*
    * get requests one by one
    * fetch all different requests, but it is not yet supported in Solidity
    * fetch total number of request, retrieve all them one by one
    */
    const requests = await Promise.all(
      Array(Number(requestsCount)).fill().map((ele, index) => {
        return campaign.methods.requests(index).call()
      })
    )

    console.log({ requestsCount, requests })

    return {
      props: {
        address,
        requestsCount,
        requests,
      }
    }
  } catch (err) {
    console.log('error message:', err.message)
  }

  return {
    props: {}
  }
}
