import React from "react"
import "./Memory.css"
import { Link } from "react-router-dom"


//when you click on one memory title, a memory detail component will render
export const MemoryCard = ({ memory }) => (
    <section className="memory">
        <h3 className="memory_title">
          {/* reacts way of doing atags= <link> */}
          <Link to={`/memories/detail/${memory.id}`}>
            { memory.title }
          </Link>
        </h3>
        <div className="memory_category">Category: {memory.category?.name}</div>
        <div className="memory_author">Written by: {memory.user?.name}</div>
    </section>
)