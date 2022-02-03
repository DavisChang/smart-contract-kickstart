import { Container, Header, Form, Input, Button, Message } from 'semantic-ui-react'
import HeadComps from 'components/Head/HeadComps'
import Layout from 'components/Layout/Layout'
import { useState } from 'react'
import { useRouter } from 'next/router'
import Campaign from 'utils/ethereum/campaign'
import web3 from 'utils/ethereum/web3'

export default function New({ address }) {
  const router = useRouter()
  const [desc, setDesc] = useState('')
  const [value, setValue] = useState(0)
  const [recipient, setRecipient] = useState('')
  const [loading, setLoading] = useState(false)
  const [errorMag, setErrorMag] = useState('')

  const handleOnChange = (e) => {
    setValue(e.target.value)
  }

  const handleOnChangeDesc = (e) => {
    setDesc(e.target.value)
  }
  
  const handleOnChangeRecipient = (e) => {
    setRecipient(e.target.value)
  }

  const handleOnSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setErrorMag('')

    try {
      const campaign = Campaign(address)
      const accounts = await web3.eth.getAccounts()
      await campaign.methods.createRequest(
        desc,
        web3.utils.toWei(value, 'ether'),
        recipient
      ).send({from: accounts[0] })
      afterSubmit()
    } catch(err) {
      console.log(err)
      setErrorMag(err.message)
    } finally {
      setLoading(false)
      setValue(0)
    }
  }

  const afterSubmit = () => {
    router.replace(`/campaigns/${address}/requests`)
  }

  const handleOnClickBack = (e) => {
    e.preventDefault()
    router.push(`/campaigns/${address}/requests`)
  }
  return (
    <Layout>
      <HeadComps title="Create a Request"/>
      <Container>
        <Header as='h3'>Create a Request</Header>
        <Form onSubmit={handleOnSubmit} loading={loading} error={!!errorMag}>
          <Form.Field>
            <label>Description</label>
            <Input
              type="text"
              label="description"
              labelPosition="right"
              placeholder="description"
              value={desc}
              onChange={handleOnChangeDesc}
            />
          </Form.Field>
          <Form.Field>
            <label>Amount in Ether</label>
            <Input
              type="number"
              label="ether"
              labelPosition="right"
              placeholder="Amount in Ether"
              value={value}
              onChange={handleOnChange}
            />
          </Form.Field>
          <Form.Field>
            <label>Recipient</label>
            <Input
              type="text"
              label="recipient"
              labelPosition="right"
              placeholder="Recipient Address"
              value={recipient}
              onChange={handleOnChangeRecipient}
            />
          </Form.Field>
          <Message error header="Oops!" content={errorMag} />
          <Button loading={loading} primary type='submit'>Create!</Button>
          <Button loading={loading} primary onClick={handleOnClickBack} type='button'>Back</Button>
        </Form>
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