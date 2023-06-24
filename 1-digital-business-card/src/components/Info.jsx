import React from 'react'
import profilePhoto from '../images/profile-photo.jpg'

export default function Info() {
    const profileName = 'Theresa Johnson';
    const profileRole = 'Frontend Developer';
    const profileWebsite = 'theresajohnson.dev';

    return (
        <div>
            <div className="card__img-wrapper">
                <img src={profilePhoto} alt={`Profile picture of ${profileName}`} />
            </div>

            <div className="card__info">
                <h1>{profileName}</h1>
                <p className='card__info-role'>{profileRole}</p>
                <p className='card__info-website'>{profileWebsite}</p>

                <div className="card__btn-wrapper">
                    <button className='email-btn'>
                        <i class="fas fa-envelope"></i> Email
                    </button>
                    <button className='linkedin-btn'>
                        <i class="fab fa-linkedin"></i> LinkedIn
                        </button>
                </div>
            </div>
        </div>
    )
}