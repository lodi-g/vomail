import React from 'react'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import { FaEye, FaEyeSlash, FaTrash } from 'react-icons/fa'
import { MdRefresh } from 'react-icons/md'

const ActionBar = ({ onRefresh, onMarkUnread, onMarkRead, onDelete }) => (
  <>
    <Col>
      <Button variant="secondary" onClick={onRefresh}>
        <MdRefresh /> Refresh
      </Button>
    </Col>
    <Col className="text-right">
      <ButtonGroup>
        <Button variant="outline-primary" onClick={onMarkUnread}>
          <FaEyeSlash className="mb-1 mr-1" />
          Mark as unread
        </Button>
        <Button variant="outline-primary" onClick={onMarkRead}>
          <FaEye className="mb-1 mr-1" />
          Mark as read
        </Button>
      </ButtonGroup>
      <Button variant="outline-danger" className="ml-2" onClick={onDelete}>
        <FaTrash className="mb-1 mr-1" />
        Delete
        </Button>
    </Col>
  </>
)

export default ActionBar
