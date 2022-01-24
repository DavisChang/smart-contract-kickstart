import { useRouter } from 'next/router'
import { Menu} from 'semantic-ui-react'

function Header() {
  const router = useRouter()

  const handleCampaignsClick = (e) => {
    e.preventDefault()
    router.push('/')
  }

  const handlePlusClick = (e) => {
    e.preventDefault()
    router.push('/campaigns/new')
  }
  return (
    <Menu style={{ margin: '20px 0'}}>
      <Menu.Item name='crowdcoin'>
        CrowdCoin
      </Menu.Item>
      <Menu.Menu position='right'>
        <Menu.Item
          name='campaigns'
          onClick={handleCampaignsClick}
        >
          Campaigns
        </Menu.Item>

        <Menu.Item
          name='+'
          onClick={handlePlusClick}
        >
          +
        </Menu.Item>
      </Menu.Menu>
    </Menu>
  )
}

export default Header