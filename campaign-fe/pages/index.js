import { Container, Header, Button, Card } from 'semantic-ui-react'
import campaignFactory from '../utils/ethereum/campaignFactory'
import HeadComps from '../components/Head/HeadComps'
import Layout from '../components/Layout/Layout'

export default function Home({ campaigns }) {
  console.log(campaigns)

  const renderCampaigns = () => {
    const items = campaigns.map(address => {
      return {
        header: <Header as='h3' style={{ wordBreak: 'break-all' }}>{address}</Header>,
        description: <a href="#">View Campaign</a>,
        fluid: true
      }
    })

    return <Card.Group centered items={items} />
  }
  
  return (
    <Layout>
      <HeadComps />
      <Container>
        <Header as='h3'>Open Campaigns</Header>
        <Button primary content='Create Campaign' icon='add circle' floated="right" />
        {renderCampaigns()}
      </Container>
    </Layout>
  )
}

export async function getServerSideProps() {
  const campaigns = await campaignFactory.methods.getDeployedCampaigns().call()
  return {
    props: {
      campaigns
    }
  }
}
