import React from "react"
import "./Memory.css"
import { Link } from "react-router-dom"
import Card from 'react-bootstrap/Card'

//when you click on one memory title, a memory detail component will render
export const MemoryCard = ({ memory }) => (
    <Card className="text-center" style={{ width: '15rem' }} >
    <section className="memory">
      <Card.Body>
        <Card.Title><h3 className="memory_title">
          {/* reacts way of doing atags= <link> */}
          <Link to={`/memories/detail/${memory.id}`}>
            { memory.title }
          </Link>
        </h3></Card.Title>

        <Card.Text>
        <div className="memory_category">Category: {memory.category?.name}</div>
        </Card.Text>

        <footer className="blockquote-footer"><div className="memory_author">Written by: {memory.user?.name}</div>
        </footer>
        </Card.Body>
    </section>
    </Card>
)