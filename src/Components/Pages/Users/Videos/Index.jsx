
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { FETCH_URL } from '../../../../Assets/Variables/const';
import { getItemWithExpiration } from '../../../../Assets/Variables/functions';


function MyVideos() {

    const params = useParams();

    
    const [videos, SetVideos] = useState([]);
    const myuserid = getItemWithExpiration("myuserid");
    const TOKEN = getItemWithExpiration('auth');

    useEffect(() => {
        async function getData() {
            try {
                let id = "";
                if (!myuserid) {
                    return
                } else {
                    id = myuserid;
                }
                const videos = await fetch(FETCH_URL + "videos/" + params.id, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authentication': `Bearer ${TOKEN}`
                    }
                });

                if (videos.status === 200) {
                    const json = await videos.json();
                    SetVideos(json);
                    console.log(videos);
                }
            } catch (error) {
                throw Error(error);
            }
        }
        getData();
    }, []);



    return (
        <>
            <h3>Mes vidéos</h3>

            {!videos ? (
                <>
                </>
            ) : (videos.map(video =>
                <>
                    <video className='myvideo' controls>
                        <source src={`/Videos/${video.title}`} controls type="video/mp4" />
                    </video>
                </>
            ))}
        </>
    )
};

export default MyVideos;