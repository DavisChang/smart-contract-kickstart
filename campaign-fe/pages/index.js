import Link from 'next/link'
import { Container, Header, Button, Card } from 'semantic-ui-react'
import { useRouter } from 'next/router'
import campaignFactory from 'utils/ethereum/campaignFactory'
import HeadComps from 'components/Head/HeadComps'
import Layout from 'components/Layout/Layout'

export default function Home({ campaigns }) {
  const router = useRouter()

  const handleCreateCampaign = (e) => {
    e.preventDefault()
    router.push('/campaigns/new')
  }

  const renderCampaigns = () => {
    const items = campaigns.map(address => {
      return {
        key: address,
        header: <Header as='h3' style={{ wordBreak: 'break-all' }}>{address}</Header>,
        description: <Link href={`/campaigns/${address}`}><a>View Campaign</a></Link>,
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
        <Button primary content='Create Campaign' icon='add circle' floated="right" onClick={handleCreateCampaign} />
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
