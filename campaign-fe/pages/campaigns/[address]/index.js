import { useRouter } from 'next/router'
import { Container, Header } from 'semantic-ui-react'
import HeadComps from 'components/Head/HeadComps'
import Layout from 'components/Layout/Layout'
import Campaign from 'utils/ethereum/campaign'

export default function Address({
  minimumContribution,
  balance,
  requestsCount,
  approversCount,
  managerAddress
}) {
  const router = useRouter()
  const { address } = router.query
  console.log({
    address,
    minimumContribution,
    balance,
    requestsCount,
    approversCount,
    managerAddress
  })
  return (
    <Layout>
      <HeadComps title="Address"/>
      <Container>
        <Header as='h3'>Campaign Details</Header>
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
