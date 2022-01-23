import Head from 'next/head'
import { Button } from 'semantic-ui-react'
import styles from '../styles/Home.module.css'
import campaignFactory from '../utils/ethereum/campaignFactory'

export default function Home({ campaigns }) {
  console.log(campaigns)
  return (
    <div className={styles.container}>
      <Head>
        <title>Web3 Campaigns</title>
        <meta name="description" content="Web3 Campaigns" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Web3 Campaigns</h1>
        <Button color="black" onClick={() => console.log('click')}>
          Nope
        </Button>
        <div className={styles.description}>Open Campaigns</div>
        <div className={styles.grid}>
          {campaigns.map(camps => (<div className={styles.card} key={camps}>{camps}</div>))}
        </div>
      </main>
    </div>
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
