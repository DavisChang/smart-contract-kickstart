import Link from 'next/link'
import { Container, Header, Button, Table } from 'semantic-ui-react'
import HeadComps from 'components/Head/HeadComps'
import Layout from 'components/Layout/Layout'
import RequestRow from 'components/RequestRow'
import Campaign from 'utils/ethereum/campaign'

export default function Requests({ address, approversCount, requestsCount, requests }) {
  const renderRows = () => {
    return requests.map((request, index) => {
      return <RequestRow
        key={index}
        id={index}
        address={address}
        request={request}
        requestsCount={requestsCount}
        approversCount={approversCount}
      />
    })
  }
  return (
    <Layout>
      <HeadComps title="requests"/>
      <Container>
        <Header as='h3'>Request List</Header>
        <Link href={`/campaigns/${address}/requests/new`}>
          <a><Button primary>Add Request</Button></a>
        </Link>
        <Link href={`/campaigns/${address}`}>
          <a><Button primary>Back</Button></a>
        </Link>
        <Table>
          <Table.Header>
            <Table.Row>
            <Table.HeaderCell>ID</Table.HeaderCell>
            <Table.HeaderCell>Description</Table.HeaderCell>
            <Table.HeaderCell>Amount</Table.HeaderCell>
            <Table.HeaderCell>Recipient</Table.HeaderCell>
            <Table.HeaderCell>Approval Count</Table.HeaderCell>
            <Table.HeaderCell>Approve</Table.HeaderCell>
            <Table.HeaderCell>Finalize</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {renderRows()}
          </Table.Body>   
        </Table>
        <div>Found {requestsCount} request.</div>
      </Container>
    </Layout>
  )
}

export async function getServerSideProps(context) {
  try {
    const { address } = context.params
    const campaign = Campaign(address)
    const approversCount = await campaign.methods.approversCount().call()
    const requestsCount = await campaign.methods.getRequestsCount().call()

    /*
    * get requests one by one
    * fetch all different requests, but it is not yet supported in Solidity
    * fetch total number of request, retrieve all them one by one
    */
    let requests = await Promise.all(
      Array(Number(requestsCount)).fill().map((ele, index) => {
        return campaign.methods.requests(index).call()
      })
    )
    
    requests = requests.map(item => ({
      description: item[0],
      value: item[1],
      recipient: item[2],
      complete: item[3],
      approvalCount: item[4],
    }))

    return {
      props: {
        address,
        approversCount,
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
