import React from 'react'
import moment from 'moment'
import Card from 'react-bootstrap/Card'
import Form from 'react-bootstrap/Form'

const MailCard = ({ id, subject, receivedOn, from, className, read, selected, onSelect }) => (
  <Card className={className}>
    <Card.Body>
      <div className="d-flex h-100">
        <label className="d-flex h-100" htmlFor={`checkbox-${id}`}>
          <span className="mr-3 align-self-center">
            <Form.Group className="mb-0" controlId="formBasicCheckbox">
              <Form.Check
                checked={selected}
                type="checkbox"
                id={`checkbox-${id}`}
                onChange={() => onSelect(id)}
              />
            </Form.Group>
          </span>
        </label>
        <div className="w-100">
          {!read ? (
            <Card.Title>
              <span>Subject: {subject}</span>
            </Card.Title>
          ) : (
            <Card.Text>
              <span>Subject: {subject}</span>
            </Card.Text>
          )}
          <Card.Text className="d-flex justify-content-between">
            <span>
              From: {from.name} &lt;{from.address}&gt;
            </span>
            <span>{moment(receivedOn).format('DD MMM YYYY')}</span>
          </Card.Text>
        </div>
      </div>
    </Card.Body>
  </Card>
)

export default MailCard
