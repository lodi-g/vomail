import React from 'react'
import moment from 'moment'
import Form from 'react-bootstrap/Form'
import ListGroup from 'react-bootstrap/ListGroup'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

const MailItem = ({ id, subject, receivedOn, from, read, selected, onSelect, onClick }) => (
  <ListGroup.Item active={selected && 'secondary'} className={read && !selected && 'bg-light'}>
    <div className="d-flex">
      <Form.Check
        inline
        checked={selected}
        type="checkbox"
        id={`checkbox-${id}`}
        onChange={() => onSelect(id)}
      />
      <Row
        onClick={() => onClick(id)}
        className={{
          'text-secondary': read && !selected,
        }}
        style={{ cursor: 'pointer' }}
      >
        <Col md="auto">
          <span>{`${from.name} <${from.address}>`}</span>
        </Col>
        <Col md="auto" mr="auto">
          <span>{read ? subject : <b>{subject}</b>}</span>
        </Col>
        <Col md="auto">
          <span>{moment(receivedOn).format('DD MMM YYYY HH:mm')}</span>
        </Col>
      </Row>
    </div>
  </ListGroup.Item>
)

export default MailItem
