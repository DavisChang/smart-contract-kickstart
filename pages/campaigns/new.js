import React, { Component } from 'react';
import { Button, Form } from 'semantic-ui-react';
import Layout from '../../components/Layout';

class CampaignNew extends Component {
  render() {
    return (
      <Layout>
        <h3>Create a Campaign</h3>
        <Form>
          <Form.Field>
            <label>First Name</label>
            <input placeholder='First Name' />
          </Form.Field>
          <Button primary type='submit'>Submit</Button>
        </Form>
      </Layout>
    );
  }
}

export default CampaignNew;
