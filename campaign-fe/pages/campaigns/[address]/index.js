import { Container, Header, Card, Grid } from 'semantic-ui-react'
import HeadComps from 'components/Head/HeadComps'
import Layout from 'components/Layout/Layout'
import Campaign from 'utils/ethereum/campaign'
import web3 from 'utils/ethereum/web3'
import ContributeForm from 'components/ContributeForm'

export default function Address({
  address,
  minimumContribution,
  balance,
  requestsCount,
  approversCount,
  managerAddress
}) {
  console.log({
    address,
    minimumContribution,
    balance,
    requestsCount,
    approversCount,
    managerAddress
  })

  const renderCards = () => {
    const items = [
      {
        header: managerAddress,
        meta: 'Address of manager',
        description:
          'The manager created this campaign and can create requests to withdrew money',
        style: { overflowWrap: 'break-word' }
      },
      {
        header: minimumContribution,
        meta: 'Minimum contribution (wei)',
        description:
          'You must contribute at least this much wei to become an approver',
        style: { overflowWrap: 'break-word' }
      },
      {
        header: requestsCount,
        meta: 'Number of requests',
        description:
          'A request tries to withdraw money from the contract. Requests must be approved by approvers',
        style: { overflowWrap: 'break-word' }
      },
      {
        header: approversCount,
        meta: 'Number of approvers',
        description:
          'Number of people who have already donated to this campaign',
        style: { overflowWrap: 'break-word' }
      },
      {
        header: web3.utils.fromWei(balance, 'ether'),
        meta: 'Campaign balance (ether)',
        description:
          'The balance is how much money this campaign has left to spand',
        style: { overflowWrap: 'break-word' }
      },
    ]

    return <Card.Group items={items} />
  }
  return (
    <Layout>
      <HeadComps title="Address"/>
      <Container>
        <Header as='h3'>Campaign Details</Header>
        <Grid>
          <Grid.Column width={10}>
            {renderCards()}
          </Grid.Column>
          <Grid.Column width={6}>
              <ContributeForm address={address} />
          </Grid.Column>
        </Grid>
      </Container>
    </Layout>
  )
}

export async function getServerSideProps(context) {
  try {
    const { address } = context.params
    const campaign = Campaign(address)
    const summary = await campaign.methods.getSummary().call()
    return {
      props: {
        address,
        minimumContribution: summary[0],
        balance: summary[1],
        requestsCount: summary[2],
        approversCount: summary[3],
        managerAddress: summary[4],
      }
    }
  } catch (err) {
    console.log('error message:', err.message)
  }

  return {
    props: {}
  }
}
