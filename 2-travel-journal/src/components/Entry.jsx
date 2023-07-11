import React from "react";

export default function Entries(props) {
    return (
        <article className="entry">
            <img
                className="entry__image"
                src={`/images/${props.imageURL}`}
                alt={`Photo of ${props.title}`}
            />

            <section className="entry__box">
                <div className="entry__info">
                    <p className="entry__location">
                        <i className="fas fa-map-marker-alt"></i> {props.location}
                    </p>
                    <a href={props.googleMaps} className="entry__google-maps" target="_blank">
                        View on Google Maps
                    </a>
                </div>
                <h2 className="entry__title">{props.title}</h2>
                <p className="entry__date">{props.startDate} - {props.endDate}</p>
                <p className="entry__desc">
                    {props.description}
                </p>
            </section>
        </article>
    )
}