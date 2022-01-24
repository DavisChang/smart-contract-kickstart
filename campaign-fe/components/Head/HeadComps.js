import Head from 'next/head'

function HeadComps({
  title = 'Web3 Campaigns',
  desc = 'Web3 Campaigns',
}) {
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={desc} />
      <link rel="icon" href="/favicon.ico" />
    </Head>
  )
}

export default HeadComps